import React from "react";

const GalleryItem = ({ image }) => {
  console.log({image})
  return (
    <div className="gallery-item ">
      
      <img src={image.image_url} alt="Generated"/>
      <div className="image-info">
        <p>{new Date(image.creation_date).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default GalleryItem;
