import React, { useEffect } from "react";
import { useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { GrLanguage } from "react-icons/gr";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { FaHeart } from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { MdOutlineArrowOutward } from "react-icons/md";
const ViewBookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id
  };
  const handleFavorite = async () => {
    const response = await axios.put(`https://librarybackend-3-73l4.onrender.com/api/auth/add-favourites`, {}, { headers });
    alert(response.data.message);
  }
  const handleRequest = async () => {
    const response = await axios.post(`https://librarybackend-3-73l4.onrender.com/api/auth/request-a-book`, {}, { headers });
    alert(response.data.message);
  }
  const deleteBook = async () => {
    const response = await axios.delete("https://librarybackend-3-73l4.onrender.com/api/auth/delete-book", { headers });
    alert(response.data.message);
    navigate("/all-books");
  }
  useEffect(() => {

    const fetch = async () => {
      const response = await axios.get(`https://librarybackend-3-73l4.onrender.com/api/auth/get-bookbyid/${id}`);
      setData(response.data.data);
    }
    fetch();
  }, []);


return (
  <>
    {Data ? (
      <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
        {/* Left Section: Image + Buttons */}
        <div className="w-full lg:w-2/5">
          <div className="bg-zinc-800 p-6 lg:p-10 rounded-2xl shadow-lg flex flex-col lg:flex-row items-center gap-6">
            <img
              src={Data.url}
              alt={Data.title}
              className="w-full lg:w-auto md:h-[60vh] lg:h-[70vh] object-cover rounded-xl"
            />

            {/* Buttons */}
            {isLoggedIn && role === "user" && (
              <div className="flex lg:flex-col flex-row gap-4 lg:gap-6 items-center justify-center">
                <button
                  className="bg-white rounded-full text-red-500 text-3xl p-3 flex items-center justify-center hover:bg-red-100 transition-all"
                  onClick={handleFavorite}
                >
                  <FaHeart />
                  <span className="ms-2 text-sm block lg:hidden">Favorites</span>
                </button>
                <button
                  className="bg-blue-500 rounded-full text-transperant text-3xl p-3 flex items-center justify-center hover:bg-blue-600 transition-all"
                  onClick={handleRequest}
                >
                  <GrSend />
                  <span className="ms-2 text-sm block lg:hidden">Borrow</span>
                </button>
              </div>
            )}

            {isLoggedIn && role === "admin" && (
              <div className="flex lg:flex-col flex-row gap-4 lg:gap-6 items-center justify-center">
                <Link
                  to={`/updateBook/${id}`}
                  className="bg-white rounded-full text-blue-500 text-3xl p-3 flex items-center justify-center hover:bg-blue-100 transition-all"
                >
                  <FiEdit />
                  <span className="ms-2 text-sm block lg:hidden">Edit</span>
                </Link>
                <button
                  className="bg-white rounded-full text-red-500 text-3xl p-3 flex items-center justify-center hover:bg-red-100 transition-all"
                  onClick={deleteBook}
                >
                  <MdDelete />
                  <span className="ms-2 text-sm block lg:hidden">Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Book Info */}
        <div className="p-4 w-full lg:w-3/5 rounded-2xl shadow-lg">
          <h1 className="text-4xl text-white font-bold mb-4">{Data.title}</h1>

          {/* Author */}
          <p className="text-blue-400 text-md flex flex-wrap gap-2 mb-4">
            {Data.author.split(",").map((author, index, arr) => (
              <span key={index} className="flex items-center">
                <Link
                  to={`/author-information/${encodeURIComponent(author.trim())}`}
                  className="flex items-center hover:underline"
                >
                  {author.trim()}
                  <MdOutlineArrowOutward className="ml-1 text-base text-sky-300 hover:text-lg bg-slate-600 rounded-full" />
                </Link>
                {index < arr.length - 1 && <span className="text-white ml-1">,</span>}
              </span>
            ))}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <Rating
              name="half-rating-read"
              value={Data.rating}
              precision={0.1}
              readOnly
            />
            <p className="text-white">{Data.rating.toFixed(1)}</p>
          </div>

          {/* Description */}
          <p className="text-zinc-300 text-justify leading-relaxed mb-4">
            {Data.desc}
          </p>

          {/* Language */}
          <p className="flex items-center text-zinc-300 mb-2">
            <GrLanguage className="mr-2" />
            {Data.lang}
          </p>

          {/* Genre */}
          <p className="text-green-200 mb-4">
            Genre:&ensp;
            <Link
              to={`/genre/${Data.genre}`}
              className="underline hover:text-green-100"
            >
              #{Data.genre}
            </Link>
          </p>

          {/* Book Details */}
          <div className="text-yellow-200">
            <p className="font-semibold text-xl underline mb-4">Book Details</p>
            <table className="w-full border-collapse text-zinc-200">
              <tbody>
                <tr className="border-b border-slate-600">
                  <td className="py-2 font-medium w-1/3">ISBN No.</td>
                  <td className="py-2">{Data.isbn}</td>
                </tr>
                <tr className="border-b border-slate-600">
                  <td className="py-2 font-medium">Publication</td>
                  <td className="py-2">{Data.publication}</td>
                </tr>
                <tr className="border-b border-slate-600">
                  <td className="py-2 font-medium">Print Length</td>
                  <td className="py-2">{Data.pages} pages</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Price</td>
                  <td className="py-2">Rs. {Data.price}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) : (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <Loader />
      </div>
    )}
  </>
);
}
      export default ViewBookDetails;
