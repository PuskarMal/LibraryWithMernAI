import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"; // Corrected import

const Signup = () => {
  const [Values, setValues] = useState({ username: "", email: "", password: "", city: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.username === "" || Values.city === "" || Values.email === "" || Values.password === "")
        alert("All fields are required");
      else {
        const response = await axios.post("http://localhost:1000/api/auth/sign-up", Values);
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleGoogleSignupSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { sub: googleId, email, name, picture } = decoded;
      //console.log({sub: googleId, email, name, picture})
      // Send the Google user details to your server for Google-based sign-up
      const response = await axios.post("http://localhost:1000/api/auth/google-signup", {
        googleId,
        email,
        name,
        picture
      });

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
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
          <label htmlFor="" className="text-zinc-400">Email</label>
          <input
            type="email"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="xyz@example.com"
            name="email"
            required
            value={Values.email}
            onChange={change}
          />
        </div>
        <div className="mt-2">
          <label className="text-zinc-400">Password</label>
          <div className="text-zinc-100">
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
        </div>
        <div className="mt-2">
          <label htmlFor="" className="text-zinc-400">City</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="City"
            name="city"
            required
            value={Values.city}
            onChange={change}
          />
        </div>
        <div className="mt-8">
          <button
            className="w-full bg-blue-800 text-white font-semibold py-2 rounded hover:bg-zinc-100 hover:text-zinc-900"
            onClick={submit}
          >
            Create Account
          </button>
        </div>
        <div className="mt-4">
          <p className="flex mt-4 items-center justify-center text-zinc-400 font-semibold">
            Already have an account? &nbsp;
            <Link to="/login" className="text-red-300 hover:text-blue-500"><u>Login</u></Link>
          </p>
        </div>
        <div className="flex justify-center mt-4">
        <GoogleLogin
          onSuccess={handleGoogleSignupSuccess}
          onError={() => {
            console.log("Google Signup failed");
          }} 
        />
        </div>
      </div>
    </div>
  );
};

export default Signup;
