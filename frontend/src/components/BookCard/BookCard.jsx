import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite }) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: data._id
    };

    const handleRemove = async () => {
        const response = await axios.put(`https://librarybackend-3-73l4.onrender.com/api/auth/remove-favourites`, {}, { headers });
        alert(response.data.message);
    };
    const handleClick = async () => {
        await axios.post(`https://librarybackend-3-73l4.onrender.com/api/auth/book-click`, {}, { headers })
    }
    return (
        <div
  className="bg-zinc-800 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center cursor-pointer w-full max-w-full"
  onClick={handleClick}
>
  <Link
    to={`/view-book-details/${data._id}`}
    className="w-full h-full flex flex-col items-center"
  >
    {/* Book Cover */}
    <div className="bg-zinc-900 rounded-lg flex items-center justify-center w-full h-[25vh] overflow-hidden">
      <img
        src={data.url}
        alt={data.title}
        className="h-full object-cover rounded"
      />
    </div>

    {/* Title */}
    <h2 className="text-white text-lg font-semibold text-center truncate w-full whitespace-nowrap px-2 pt-4">
      {data.title.length > 18 ? `${data.title.slice(0, 18)}...` : data.title}
    </h2>

    {/* Author */}
    <p className="pt-1 text-slate-300 text-base font-serif text-center truncate w-full whitespace-nowrap px-2">
      by {data.author.length > 18 ? `${data.author.slice(0, 18)}...` : data.author}
    </p>

    {/* Favorite Button */}
    {favourite && (
      <button
        className="bg-yellow-50 px-3 mt-3 py-2 text-sm rounded border font-semibold border-yellow-500 text-red-500 w-full transition hover:bg-yellow-100"
        onClick={(e) => {
          e.stopPropagation(); // prevent card click
          handleRemove();
        }}
      >
        Remove from Favorites
      </button>
    )}
  </Link>
</div>

    );
};

export default BookCard;
