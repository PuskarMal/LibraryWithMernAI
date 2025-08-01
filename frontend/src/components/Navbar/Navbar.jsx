import React, { useState } from "react";
import {Link} from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
const Navbar = () => {
    const links = [
        {
            title:"Home",
            link:"/"
        },
        {
            title:"All Books",
            link:"/all-books"
        },
        {
            title:"Profile",
            link:"/profile"
        },
        {
            title:"Admin Profile",
            link:"/profile"
        }
    ];
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const role = useSelector((state)=>state.auth.role);
    if(isLoggedIn === false)
    {
        links.splice(2, 3);
    }
    if(isLoggedIn === true && role=== "admin")
    {
        links.splice(2, 1);
    }
    if(isLoggedIn === true && role=== "user")
    {
        links.splice(3, 1);
    }

    const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
  <nav className="relative z-50 flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
    <div className="flex items-center">
        <img className="h-10 me-4"
            src ="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
        />
        <h1 className="text-2xl font-semibold">BookVenture</h1>
    </div>
    <div className="nav-links block md:flex items-center gap-4">
        <div className="hidden md:flex gap-4">
        {links.map((items,i) => (
            <div className="flex items-center">
            {items.title === "Profile" || items.title === "Admin Profile" ? (
                <Link to={items.link} className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300" key={i}>{items.title}{" "}</Link>
            ) : items.title === "Favorites"  && role== "admin"? (
                items.title = "Requests") : (
                <Link to={items.link}
                className="hover:text-blue-500 transition-all duration-300" key2={i}>
                    {items.title}{" "}
                    
                </Link>
            )}
            </div>))}
            </div>
        {isLoggedIn === false && (
        
            <div className="hidden md:flex gap-4">
            <Link to="/login" 
            className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-500 transition-all duration-300">

            Login
            </Link>
            <Link to="/signup" 
            className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">SignUp
            </Link>

        </div>
        )}
        
        <button className="block md:hidden text-white text-2xl hover:text-zinc-400" 
            onClick={()=> 
            MobileNav === "hidden" ? 
            setMobileNav("block") : setMobileNav("hidden")
        }>
            <IoMenu/>
        </button>
    </div>
</nav>
    <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
    {links.map((items,i) => (
            <Link to=
                {items.link} className={`${MobileNav} text-white text-3xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300`}
                key1={i}
                onClick={()=> 
                setMobileNav("hidden")}>
                {items.title}{" "}
            </Link>
        ))}
        {isLoggedIn === false && (
            <>
                <Link to="/login" 
                className={`${MobileNav} px-8 mb-8 py-2 text-3xl font-semibold text-white border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
                 onClick={()=>setMobileNav("hidden")}>Login
                </Link>
                <Link to="/signup" 
                className={`${MobileNav} px-8 mb-8 py-2 text-3xl font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`} 
                onClick={()=>setMobileNav("hidden")}>SignUp
                </Link>
            </>

        )}
    </div>
    </>
  )
};

export default Navbar;