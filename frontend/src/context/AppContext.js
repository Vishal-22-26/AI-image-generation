import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const backendUrl = "https://ai-image-generation-backend-qb5v.onrender.com";

  const navigate = useNavigate();

  const loadCreditsData = async () => {
    try {
      console.log("Loading credits with token:", token); 
      
      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { token },
      });
  
      console.log("Credits response data:", data); 
  
      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
        
        
        if (data.user && data.user._id) {
          localStorage.setItem('userId', data.user._id);
          console.log("Stored userId:", data.user._id);
        } else {
          console.log("No user._id in response:", data);
        }
      }
    } catch (error) {
      
      console.log("Credits loading error:", error);
      toast.error(error.message);
    }
  };

  const generateImage = async (prompt) => {
    try {

      console.log("Sending generate request with:", {
        token,
        userId: localStorage.getItem('userId'),
        prompt
      });
      

      const { data } = await axios.post(
        backendUrl + '/api/image/generate-image', 
        { 
          prompt,
          userId: localStorage.getItem('userId')
        }, 
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        
        toast.error(data.message);
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate('/BuyCredit');
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
