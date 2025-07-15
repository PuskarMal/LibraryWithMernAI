import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";

const Books = () => {
  const { id } = useParams();
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://librarybackend-3-73l4.onrender.com/api/auth/get-authored-books/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  return (
    <div className="mt-8 px-4 min-h-screen ">
      {!Data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid lg:grid-cols-3 gap-10 ">
        {Data &&
          Data.map((item, i) => (
            <div key={i} className="shadow-lg rounded-lg text-center">
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Books;
