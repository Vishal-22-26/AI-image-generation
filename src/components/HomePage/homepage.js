import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";  // For error or success messages
import { CreditContext } from "../context/CreditContext";  // Assuming you use React Context for credits

const ImageDownloadPage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { credits, setCredits } = useContext(CreditContext);  // Access credits from context
  const navigate = useNavigate();

  // Image generation function
  const generateImage = async () => {
    if (credits <= 0) {
      toast.error("You don't have enough credits. Please purchase more.");
      navigate("/purchase-credits");  // Redirect to purchase page if credits are insufficient
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/generate-image", {
        // Replace with actual request data (e.g., text input for image generation)
      });

      setImage(response.data.imageUrl);  // Set the generated image URL
      setCredits(credits - 1);  // Deduct one credit for the generation
      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error("Error generating image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Image download function
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "generated_image.jpg";  // Set a filename for the image
    link.click();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Generate and Download Image</h1>

      {/* Image generation button */}
      <div className="text-center">
        <button
          onClick={generateImage}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>

      {/* Show generated image if available */}
      {image && (
        <div className="mt-6 text-center">
          <img src={image} alt="Generated" className="w-1/2 mx-auto mb-4" />
          <button
            onClick={downloadImage}
            className="bg-green-500 text-white px-6 py-2 rounded-lg"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageDownloadPage;