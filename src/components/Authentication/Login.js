import React, { useState, useEffect, useContext } from "react";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.js";
import SignUp from "./SignUp.js";

const Login = () => {
  const [state, setState] = useState("Login");
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setShowLogin, setUser } = useContext(AppContext);

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

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      const mockUser = {
        email,
        name: "User",
      };
      setUser(mockUser);
      setShowLogin(false);
    } else {
      alert("Please enter email and password");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none text-sm w-full"
            placeholder="Email id"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none text-sm w-full"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer text-right">
          Forgot password ?
        </p>

        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full"
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
