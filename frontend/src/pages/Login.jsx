import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authActions } from "../store/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"; // Corrected import

const Login = () => {
  const [Values, setValues] = useState({ username: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.username === "" || Values.password === "")
        alert("Both fields are required");
      else {
        const response = await axios.post("https://librarybackend-3-73l4.onrender.com/api/auth/sign-in", Values);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("icon",response.data.picture)
        navigate("/");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { sub: googleId, email, name, picture } = decoded;

      // Send the Google user details to your server for verification or sign-up
      const response = await axios.post("https://librarybackend-3-73l4.onrender.com/api/auth/google-login", {
        googleId,
        email,
        name, picture      });

      // Handle server response for authentication
      dispatch(authActions.login());
      console.log(decoded)
      dispatch(authActions.changeRole(response.data.role));
      dispatch(authActions.setIcon(response.data.icon));
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("icon", response.data.icon);
      navigate("/");
    } catch (error) {
      alert("Sorry! There's no user with this email");
    }
  };

  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full mb-50 md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Login</p>
        <div className="mt-8">
          <label htmlFor="" className="text-zinc-400">Username</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="username"
            name="username"
            required
            value={Values.username}
            onChange={change}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="" className="text-zinc-400">Password</label>
          <input
            type={passwordVisible ? "text" : "password"}
            className="w-full mt-2 bg-zinc-900 text-zinc-700 p-2 outline-none focus:bg-zinc-300"
            placeholder="password"
            name="password"
            required
            value={Values.password}
            onChange={change}
          />
        </div>
        <div className="mt-8">
          <button
            className="w-full bg-blue-800 text-white font-semibold py-2 rounded hover:bg-zinc-100 hover:text-zinc-900"
            onClick={submit}
          >
            Login
          </button>
        </div>
        <div className="mt-4 mb-">
          <p className="flex mt-4 items-center justify-center text-zinc-400 font-semibold">
            Don't have an account? &nbsp;
            <Link to="/signup" className="text-red-300 hover:text-blue-500"><u>Signup</u></Link>
          </p>
          <p className="flex mt-2 items-center justify-center text-zinc-500 font-semibold">
            <Link to="/forgot-password" className="text-blue-500 hover:text-pink-600"><u>Forgot Password?</u></Link>
          </p>
        </div>
        <div className="flex justify-center mt-4">
        <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => {
        console.log("Google Signup failed");
        }}
        className="w-full" // Ensure this class is added for full width
        />
        </div>
      </div>
    </div>
  );
};

export default Login;
