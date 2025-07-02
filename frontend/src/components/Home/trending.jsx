// Recommended.jsx
import React, {useState, useEffect} from 'react';
import Loader from "../Loader/Loader"
import axios from "axios"
import BookCard from "../BookCard/BookCard"
const Trending = () => {
  const [Data, setData] = useState();
    useEffect(() => { 
      
      const fetch = async () => {
        const response = await axios.get("http://localhost:1000/api/auth/get-trending-books");
        setData(response.data);
      }
      fetch();
    }, []);
  return (
    <div className="mt-16 px-">
    <h4 className="text-3xl text-yellow-100">Trending Now</h4>
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
}
export default Trending

