import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";
import axios from "axios";
const RecentBooks = () => {
  const [Data, setData] = useState();
  useEffect(() => { 
    
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/auth/get-recentbooks");
      setData(response.data.data);
    }
    fetch();
  }, []);
  
  return (
  <div className="mt-16 px-4">
    <h4 className="text-3xl text-yellow-100">New Arrivals</h4>
    { !Data && (
    <div className="flex items-center justify-center my-8">
      <Loader />{" "}
    </div>)}
    <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8">
      {Data && Data.map((items,i) => (
      <div key={i} className="shadow-lg rounded-lg flex text-center justify-center">
        <BookCard data={items} />{" "} 
      </div>
    ))}
    </div>
  </div>
  );
};

export default RecentBooks;