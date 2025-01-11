import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";


const GallerySkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-square w-full bg-gray-200 rounded-lg"></div>
  </div>
);

const GalleryItem = ({ image }) => {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <div className="aspect-square w-full overflow-hidden">
        <img 
          src={image.image_url} 
          alt={`AI Generated - ${image.prompt}`}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 transform transition-transform duration-300 translate-y-full group-hover:translate-y-0">
        <p className="text-sm font-medium mb-2">
          {new Date(image.creation_date).toLocaleDateString()} at{' '}
          {new Date(image.creation_date).toLocaleTimeString()}
        </p>
        {image.prompt && (
          <p className="text-sm line-clamp-2 hover:line-clamp-none transition-all duration-300">
            <span className="font-semibold">Prompt:</span> {image.prompt}
          </p>
        )}
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const navigate = useNavigate();

  

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl, token, user } = useContext(AppContext);
  const userId = user?._id || localStorage.getItem('userId');

  useEffect(() => {
    const fetchImages = async () => {
      if (!userId || !token) {
        setError("Please log in to view your gallery");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${backendUrl}/api/image/gallery/${userId}`, {
          headers: { token }
        });
        
        if (response.data.success) {
          setImages(response.data.images);
        } else {
          setError(response.data.message || "Failed to load images");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || 
          "Unable to load gallery. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [userId, backendUrl, token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Gallery</h1>
            <p className="text-gray-600 mt-2">
              Your last {images.length} generated images
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/generate')}
            className="px-6 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            Generate New Image
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <GallerySkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 inline-block">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => navigate('/generate')}
                className="px-6 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-colors duration-300"
              >
                Back to Generator
              </button>
            </div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 inline-block">
              <p className="text-gray-600 mb-4">
                Your gallery is empty. Generate some images to get started!
              </p>
              <button 
                onClick={() => navigate('/generate')}
                className="px-6 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-colors duration-300"
              >
                Generate Your First Image
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <GalleryItem key={index} image={image} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;