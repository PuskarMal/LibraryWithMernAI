import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector} from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";
const Profile = () => {
  //const isLoggedIn = useSelector();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, 
    
  };  
  const [Profile, setProfile] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://librarybackend-3-73l4.onrender.com/api/auth/get-userinfo",{headers});
      setProfile(response.data);
    };
    fetch();
  },[]);
  return (<div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white overflow-x-hidden">
    {!Profile && 
      (<div className="w-full h-auto flex items-center justify-center">
        <Loader />
      </div>)}
    {Profile && (
      <>
        <div className="w-full lg:w-1/6 ">
        <Sidebar data={Profile}/>
        <MobileNav/>
        </div>
        <div className="w-full h-auto lg:h-screen lg:w-5/6"><Outlet /></div>
      </>)}
  </div>);
};

export default Profile;
