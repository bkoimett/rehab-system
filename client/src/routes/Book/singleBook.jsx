import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function SingleBook() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const baseUrl = `http://localhost:8000/api/books/${slug}`;

  const [data, setData] = useState(null); // object or null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(baseUrl);
        if (!response.ok)
          throw new Error(`Failed to fetch data (${response.status})`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, baseUrl]);

  function StarRating({ numberOfStars = 0 }) {
    const stars = [];
    const n = Math.max(0, Math.floor(numberOfStars || 0));
    for (let i = 0; i < n; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return <div>Rating: {stars.length ? stars : "No rating"}</div>;
  }

  const removeBook = async (e) => {
    e.preventDefault();
    if (!data) return;
    // prefer to delete by id if available, otherwise slug
    const idOrSlug = data._id ?? data.slug ?? slug;
    if (!idOrSlug) {
      console.error("No identifier available to delete the book.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/books/${idOrSlug}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Book removed.");
        navigate("/books");
      } else {
        const text = await response.text();
        console.error("Delete failed:", response.status, text);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) return <p>Loading book...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No book found.</p>;

  return (
    <div>
      <Link to={"/books"}>🔙 Books</Link>

      <div className="bookdetails">
        <div className="col-1">
          <img
            src={
              data?.thumbnail
                ? `http://localhost:8000/uploads/${data.thumbnail}`
                : "/path/to/no-image.jpg"
            }
            alt={data?.title ?? "book thumbnail"}
            style={{ maxWidth: 220 }}
          />

          <br />
          <button type="button">
            <Link to={`/editbook/${data.slug ?? slug}`}>Edit</Link>
          </button>
          <br />

          <button onClick={removeBook} className="delete">
            Delete Book
          </button>
        </div>

        <div className="col-2">
          <h1>{data?.title}</h1>
          <p>{data?.description}</p>
          <StarRating numberOfStars={data?.stars} />

          <p>Category</p>
          <ul>
            {Array.isArray(data?.category) && data.category.length > 0 ? (
              data.category.map((item, index) => <li key={index}>{item}</li>)
            ) : (
              <li>No categories</li>
            )}
          </ul>

          {/* debug / raw JSON if you need it */}
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
