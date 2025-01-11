import userModel from "../models/userModel.js"
import FormData from 'form-data'
import axios from "axios"


export const generateImage = async(req, res)=> {
  try {
    
    const {userId, prompt} = req.body
    const user = await userModel.findById(userId)
    
    if(!user || !prompt){
      return res.json({success: false, message: 'Missing Details'})
    }
    if(user.creditBalance === 0 || user.creditBalance < 0){
      return res.json({success: false, message: 'No Credit Balance', creditBalance: user.creditBalance})
    }
    
    const formData = new FormData()
    formData.append('prompt', prompt)
   
    
    try {
      console.log('Attempting Clipdrop API call with key:', process.env.CLIPDROP_API ? 'Key exists' : 'No key found');
    
      const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', 
        formData, 
        {
          headers: {
            'x-api-key': process.env.CLIPDROP_API,
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'arraybuffer'
        }
      );
    
      const base64Image = Buffer.from(response.data, 'binary').toString('base64')
      const resultImage = `data:image/png;base64,${base64Image}`
   
      user.generatedImages.push({
        image: resultImage,
        prompt: prompt,
        createdAt: new Date()
      });
      await user.save();

      const newBalance = user.creditBalance - 1;
      await userModel.findByIdAndUpdate(user._id, {creditBalance: newBalance})

      res.json({success: true, message: "Image Generated", creditBalance: newBalance, resultImage})

    } catch (apiError) {
      console.error('Clipdrop API Error:', {
        status: apiError.response?.status,
        statusText: apiError.response?.statusText,
        data: apiError.response?.data ? apiError.response.data.toString() : null
      });

      return res.status(apiError.response?.status || 500).json({
        success: false,
        message: 'Error calling image generation API',
        error: apiError.response?.statusText || apiError.message
      });
    }
    
  } catch(error) {
    console.error('Server Error:', error);
    res.status(500).json({success: false, message: error.message})
  }
}

export const getUserGallery = async(req, res)=> {
  try {
    const {userId} = req.params;
    
    const user = await userModel.findById(userId);
    if(!user) {
      return res.json({success: false, message: 'User not found'});
    }

    const galleryImages = user.generatedImages
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4)
      .map(item => ({
        image_url: item.image,
        creation_date: item.createdAt,
        prompt: item.prompt
      }));

    res.json({
      success: true,
      images: galleryImages
    });
  } catch(error) {
    console.log(error.message);
    res.status(500).json({success: false, message: error.message});
  }
}