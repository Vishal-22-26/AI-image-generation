
import jwt from 'jsonwebtoken'
const userAuth = async (req, res, next) => {
  try {
   
    
    const {token} = req.headers;
    
    if(!token){
      console.log("No token provided");
      return res.status(403).json({success: false, message: 'Not Authorized. Login Again'});
    }

    try {
      const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", tokenDecode);

      if(tokenDecode.id){
        req.body.userId = tokenDecode.id;
        console.log("User ID set in request:", req.body.userId);
        next();
      } else {
        console.log("No ID in token");
        return res.status(403).json({success: false, message: 'Not Authorized. Login Again'});
      }
    } catch (error) {
      console.log("Token verification error:", error);
      return res.status(403).json({success: false, message: 'Invalid token'});
    }
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(500).json({success: false, message: error.message});
  }
};

export default userAuth