
// import './ImageGenerationage.css'
import { Link } from "react-router-dom";
const ImageGenerationage=()=>{
    return(
        <div className="imagify-container">
        <div className="imagify-header">
          <div className="logo">
            <span className="logo-icon">🖼️</span> 
            <span className="logo-text">imagify</span>
          
          </div>
          <div className="credits">
            <span>Credits left : 2</span>
          </div>
          
        </div>
        <div className="imagify-body">
          <div className="image-box">
            <img
              src="https://via.placeholder.com/250" 
              alt="Generated Preview"
              className="generated-image"
            />
          </div>
          <div className="input-bar">
            <input
              type="text"
              placeholder="Describe what you want to generate"
              className="text-input"
            />
            {/* #5b5b5b */}
            <button className="generate-button">
              Generate
            </button>
          </div>
        </div>
      </div>
    )
}
export default ImageGenerationage;