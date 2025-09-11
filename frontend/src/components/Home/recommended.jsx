import React, { useState, useEffect } from 'react';
import Loader from "../Loader/Loader";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Recommended = () => {
  const [Data, setData] = useState(null); // initial null

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        };
        const response = await axios.get(`https://librarybackend-3-73l4.onrender.com/api/auth/recommend-content`, { headers });
        setData(response.data); // 💡 this was missing!
        console.log("Recommended books:", response.data);
      } catch (error) {
        console.error("Error fetching recommendations", error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
  <div className="mt-16 ">
    {!Data  ? (
      <div><Loader /></div>
    ) : Data.length === 0 ? (<div>No recommendations found. Browse books. <div/>) : (
      <div>
        <h4 className="text-3xl text-yellow-100 mb-6">Recommended for you</h4>
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {Data.map((item, i) => (
            <div key={i} className="shadow-lg rounded-lg flex justify-center">
              <BookCard data={item} />
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

};

export default Recommended;
