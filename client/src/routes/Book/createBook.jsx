import React, { useState } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpg";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  return (
    <div>
      <h1>Create Book</h1>
      <p>
        This is where we use NodeJs, Express & MongoDB to grab some data. The
        data below is pulled from a MongoDB database.
      </p>

      <form className="bookdetails" >
        <div className="col-1">
          <label htmlFor="">Upload Thumbnail</label>
          <img src={NoImageSelected} alt="preview image" />
          <input type="file" accept="image/gif, image/jpeg, image/png" />

        </div>
        <div className="col-2">
            <div>
                <label htmlFor="">Title</label>
                <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">Slug</label>
                <input 
                type="text" 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)} />
            </div>


            <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default CreateBook;
