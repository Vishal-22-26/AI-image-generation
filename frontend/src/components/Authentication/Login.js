import React, { useState, useEffect, useContext } from "react";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.js";
import SignUp from "./SignUp.js";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setShowLogin, setUser, backendUrl, setToken } =
    useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSignUpToggle = () => {
    setIsSignUp(true);
  };

  const handleBackToLogin = () => {
    setIsSignUp(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid credentials";
      toast.error(errorMessage);
    }
  };
  if (isSignUp) {
    return <SignUp onBackToLogin={handleBackToLogin} />;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-96 max-w-[90%]"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Login
        </h1>
        <p className="text-sm text-center mb-4">
          Welcome back! Please sign in to continue
        </p>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="outline-none text-sm w-full"
            placeholder="Email id"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="outline-none text-sm w-full"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-black w-full text-white py-2 rounded-full mt-4"
        >
          Login
        </button>

        <p className="mt-5 text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={handleSignUpToggle}
          >
            Sign up
          </span>
        </p>

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
          alt="Close"
        />
      </form>
    </div>
  );
};

export default Login;
