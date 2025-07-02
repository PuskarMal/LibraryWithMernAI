import { useState } from "react";
import { Link } from "react-router-dom";
const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
function ResetPassword(){
    const [password, setPawword]=useState()

    const handleSubmit=(e)=>{
        e.preventDefault()
        fetch("http://localhost:5173/forgot-password", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email }),
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(res.statusText);
          }
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          alert(error);
        });         
    }
    return(
<div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
    <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full mb-50 md:w-3/6 lg:w-2/6">
      <p className="text-zinc-200 text-xl">Reset Password</p>
      <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">New Password</label> 
          <input type="password" 
          className="w-full mt-2 bg-zinc-900 text-zinc-700 p-2 outline-none focus:bg-zinc-300"
          placeholder="password" name="password" required />
        </div>
          <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">Check Password</label> 
          <input type="password" 
          className="w-full mt-2 bg-zinc-900 text-zinc-700 p-2 outline-none focus:bg-zinc-300"
          placeholder="password" name="password" required/>
          </div>
        
        <div className="mt-4">
          <button className="w-full bg-blue-800 text-white font-semibold py-2 rounded hover:bg-zinc-100 hover:text-zinc-900" 
          onClick={handleSubmit}>Reset</button>
        </div>
      </div>
      

    </div>
    )
};

export default ResetPassword;