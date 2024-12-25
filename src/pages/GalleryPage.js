import React, { useEffect, useState, useCallback } from "react";
import GalleryItem from "../components/GalleryComponents/GalleryItem";
import Loading from "../components/GalleryComponents/Loading";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = "user123";

  const backHandler = useCallback(() => {
    console.log("Going back");
    // Implement actual back navigation logic here
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Simulating API call with mock data
        const mockImages = [
          { image_url: "images/pexels-helloaesthe-16471876.jpg", creation_date: "2024-12-14T10:00:00" },
          { image_url: "/images/pexels-kris-shambir-2147748720-29741645.jpg", creation_date: "2024-12-14T10:00:00" },
          { image_url: "/images/pexels-serra-nur-cevikdal-2147703100-29743804.jpg", creation_date: "2024-12-14T10:00:00" },
          { image_url: "/images/pexels-serra-nur-cevikdal-2147703100-29743804.jpg", creation_date: "2024-12-14T10:00:00" },
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

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Gallery</h1>
        <button
          onClick={backHandler}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <img src="images/back-button.png" alt="Back" className="w-5 h-5 mr-2" />
          Go Back
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
