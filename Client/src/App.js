import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import LandingPage from "./pages/LandingPage";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import Navbar from "./components/Landing/Navbar";
import { AppContext } from "./context/AppContext";
import Login from "./components/Authentication/Login";
import GalleryPage from "./pages/GalleryPage";
import Imagegenerationpage from "./pages/Imagegenerationpage";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";

function App() {
  const { showLogin } = useContext(AppContext);

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <ToastContainer position="bottom-right"/>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/generate" 
          element={
            <ProtectedRoute>
              <Imagegenerationpage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/result" 
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          } 
        />
        <Route path="/BuyCredit" element={<BuyCredit />}/>
        <Route path="/gallery" element={<GalleryPage/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

      {showLogin && <Login />}
    </div>
  );
}

export default App;