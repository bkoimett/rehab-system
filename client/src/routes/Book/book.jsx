import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Book() {
  const baseUrl = "http://localhost:8000/api/books";
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Books</h1>
      <p>
        This is where we use NodeJs, Express & MongoDB to grab some data. The
        data below is pulled from a MongoDB database.
      </p>

      <h2>Fetch Example</h2>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <ul className="books">

        {data.map((item)=> (

          <li key={item._id}>
            <Link to={`/books/${item.slug}`}>

              <img src={`http://localhost:8000/uploads/${item.thumbnail}`} alt={item.title} />
              <h3>{item.title}</h3>
            
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Book;
