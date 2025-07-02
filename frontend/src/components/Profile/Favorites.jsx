
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
const Favorite = () => {
  const { id } = useParams();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, 
    bookid: id
  };
  const [Favorites, setFavorites] = useState([]);
  useEffect (() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/auth/get-favourites",{headers});
      setFavorites(response.data.data);
    }
    fetch();
  },[Favorites]);
  return (
    <>
  
    {Favorites.length == 0 && (
      <div className="h-[80vh] p-4 text-zinc-100">
      <div className="h-[100%] flex flex-col items-center lg:justify-center">
      <h1 className=" text-2xl lg:text-6xl font-semibold text-zinc-400 flex flex-col items-center justify-center w-full">No favorite books
      </h1>
      </div>
      </div>
    )}
    <div className="my-8 grid grid-cols-1 text-white sm:grid-cols-3 md:grid-cols-4 gap-8">
    {Favorites && Favorites.map((items,i) => (
    <div key={i}>
      <BookCard data={items} favourite={true}/>
    </div>))}
  </div>
  </>
  )};

export default Favorite;