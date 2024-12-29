import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import GalleryItem from "../components/GalleryComponents/GalleryItem";
import Loading from "../components/GalleryComponents/Loading"

const GalleryPage = () => {
  const navigate = useNavigate(); 
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = "user123";

  const backHandler = () => {
    navigate('/generate');
  };

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
    return <div><Loading/></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Gallery</h1>

        <button 
          onClick={backHandler}
          className="flex items-center gap-2 px-4 py-2 border border-black rounded-xl hover:bg-gray-100 transition-colors"
        >
          <img 
            className="h-5 w-5" 
            src="images/back-button.png" 
            alt="Back"
          />
          <span>Go Back</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <GalleryItem key={index} image={image} />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;