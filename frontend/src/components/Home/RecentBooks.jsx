import React, { useState, useEffect } from 'react';
import Loader from "../Loader/Loader";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import TopRatedBooks from "./TopRatedBooks";
const RecentBooks = () => {
  const [Data, setData] = useState(null); // initial null

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get(`https://librarybackend-3-73l4.onrender.com/api/auth/get-recentbooks`);
        setData(response.data); // 💡 this was missing!
        
      } catch (error) {
        console.error("Error fetching recommendations", error);
      }
    };

    fetchRecentBooks();
  }, []);

  return (
  <div className="mt-16 ">
    
    {!Data ? (
      <div></div>
    ) : (
      <div>
        <h4 className="text-3xl text-yellow-100 mb-6">New Arrivals</h4>
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

export default RecentBooks;
