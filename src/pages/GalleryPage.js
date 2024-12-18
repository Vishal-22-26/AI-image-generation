import React, { useEffect, useState } from "react";
import GalleryItem from "../components/GalleryComponents/GalleryItem";
import Loading from "../components/GalleryComponents/Loading"
const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = "user123";

  function backHandler() {
    console.log("piche ja");
  }

  useEffect(() => {

    const fetchImages = () => {
      try {

        const mockImages = [
          {
            image_url: "images/pexels-helloaesthe-16471876.jpg",
            creation_date: "2024-12-14T10:00:00",
          },
          {
            image_url: "/images/pexels-kris-shambir-2147748720-29741645.jpg",
            creation_date: "2024-12-14T10:00:00",
          },
          {
            image_url: "/images/pexels-serra-nur-cevikdal-2147703100-29743804.jpg",
            creation_date: "2024-12-14T10:00:00",
          },
          {
            image_url: "/images/pexels-serra-nur-cevikdal-2147703100-29743804.jpg",
            creation_date: "2024-12-14T10:00:00",
          },


        ];

        setImages(mockImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [userId]);

  if (loading) {
    return (
      <div><Loading/></div>
    );

  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="gallery-container">
      
      <div className="flex flex-row  justify-between items-center">
        <h1>My Gallery</h1>

        <div className=" flex flex-row border border-black border-solid rounded-xl px-3 py-1 gap-1">
          <label id="go_back" onClick={backHandler} className=" flex items-center justify-center"><img className="h-5 w-5 " src="images/back-button.png"></img></label>
          <button id="go_back" onClick={backHandler}>Go Back</button>
        </div>

      </div>

      <div className="gallery">
        {images.map((image, index) => (
          <GalleryItem key={index} image={image} />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
