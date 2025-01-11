import React from "react";

const GalleryItem = ({ image }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-square w-full overflow-hidden">
        <img 
          src={image.image_url} 
          alt={`Generated image - ${image.prompt || 'AI Generated'}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3 transform transition-transform duration-300 translate-y-full group-hover:translate-y-0">
        <p className="text-sm">
          Created: {new Date(image.creation_date).toLocaleString()}
        </p>
        {image.prompt && (
          <p className="text-sm mt-1 truncate">
            Prompt: {image.prompt}
          </p>
        )}
      </div>
    </div>
  );
};

export default GalleryItem;
