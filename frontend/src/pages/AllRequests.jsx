import React, { useEffect, useState } from 'react'
import { FaCheck, FaUserLarge } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Loader from "../components/Loader/Loader";
import axios from 'axios';
import SeeUserData from './SeeUserData';
const AllRequests = () => {
  const [Allrequest, setAllrequest] = useState();
  const [Options, setOptions]= useState(-1);
  const [userDiv, setUserDiv]= useState("hidden");
  const [userDivData, setUserDivData]= useState("hidden");
  const [Values, setValues] = useState({status: ""});
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  const change = (e) => {
    const {value} = e.target;
    setValues({ status: value });
  }
  
  const submitChanges = async (i) => {
    const bookid = Allrequest[i]._id;
    const response = await axios.put(`http://localhost:1000/api/auth/update-status/${bookid}`,Values,{headers});
    alert(response.data.message);
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`http://localhost:1000/api/auth/get-all-requested-books`,{headers});
      setAllrequest(response.data.data);
    };
    fetch();
  }, [Allrequest]);
  //Allrequest && Allrequest.splice(Allrequest.length - 1, 1);
  return (
  <>
    {!Allrequest ? (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    ) : Allrequest.length > 0 ? (
      <>
        <div className="min-h-screen px-2 md:px-6 py-8 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-blue-400 mb-6 text-center md:text-left">
            All Requests
          </h1>

          {/* Header Row - Hidden on small screens */}
          <div className="hidden sm:grid grid-cols-12 bg-zinc-800 rounded-lg py-3 px-4 font-bold text-sm mb-2">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-3">Book</div>
            <div className="col-span-3">Author</div>
            <div className="col-span-3">Timestamp</div>
            <div className="col-span-1 text-center"><FaUserLarge /></div>
            <div className="col-span-1 text-center">Status</div>
          </div>

          {/* Data Rows */}
          <div className="space-y-4">
            {Allrequest.map((item, i) => (
              <div
                key={i}
                className="bg-zinc-900 rounded-lg p-4 flex flex-col gap-2 sm:grid sm:grid-cols-12 sm:items-center sm:gap-4"
              >
                {/* Row for Mobile */}
                <div className="sm:hidden">
                  <p className="text-sm text-gray-400">Request #{i + 1}</p>
                  <p className="font-semibold text-blue-300 mt-1">{item.book.title}</p>
                  <p className="text-sm text-gray-300">by {item.book.author}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(item.updatedAt).toLocaleString()}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span
                      className={
                        item.status === 'Book is borrowed'
                          ? 'text-green-400 text-sm'
                          : item.status === 'Access Denied'
                          ? 'text-blue-400 text-sm'
                          : item.status === 'Cancelled'
                          ? 'text-red-400 text-sm'
                          : 'text-yellow-400 text-sm'
                      }
                    >
                      {item.status}
                    </span>
                    <button
                      className="text-orange-400 text-xl"
                      onClick={() => {
                        setUserDiv('fixed');
                        setUserDivData(item.user);
                      }}
                    >
                      <IoOpenOutline />
                    </button>
                  </div>

                  {/* Dropdown for Mobile */}
                  {Options === i && (
                    <div className="mt-3 flex items-center gap-2">
                      <select
                        name="status"
                        className="bg-zinc-700 px-2 py-1 rounded text-white text-sm w-full"
                        value={Values.status}
                        onChange={change}
                      >
                        {['', 'Book is borrowed', 'Access Denied', 'Cancelled'].map(
                          (statusOption, idx) => (
                            <option key={idx} value={statusOption}>
                              {statusOption}
                            </option>
                          )
                        )}
                      </select>
                      <button
                        className="text-green-400 text-lg"
                        onClick={() => {
                          if (Values.status === '') return;
                          setOptions(-1);
                          submitChanges(i);
                        }}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  )}

                  <button
                    className="text-blue-400 text-sm mt-2 underline"
                    onClick={() => setOptions(i)}
                  >
                    Change Status
                  </button>
                </div>

                {/* Row for Desktop */}
                <div className="hidden sm:flex sm:col-span-1 justify-center font-semibold">
                  {i + 1}
                </div>
                <div className="hidden sm:block sm:col-span-3 truncate hover:text-blue-300">
                  <Link to={`/view-book-details/${item.book._id}`}>
                    {item.book.title}
                  </Link>
                </div>
                <div className="hidden sm:block sm:col-span-3 truncate text-zinc-300">
                  {item.book.author}
                </div>
                <div className="hidden sm:block sm:col-span-3 text-xs text-gray-400">
                  {new Date(item.updatedAt).toLocaleString()}
                </div>
                <div className="hidden sm:flex sm:col-span-1 justify-center">
                  <button
                    className="text-xl hover:text-orange-500"
                    onClick={() => {
                      setUserDiv('fixed');
                      setUserDivData(item.user);
                    }}
                  >
                    <IoOpenOutline />
                  </button>
                </div>
                <div className="hidden sm:block sm:col-span-1 text-sm">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => setOptions(i)}
                  >
                    <span
                      className={
                        item.status === 'Book is borrowed'
                          ? 'text-green-400'
                          : item.status === 'Access Denied'
                          ? 'text-blue-400'
                          : item.status === 'Cancelled'
                          ? 'text-red-400'
                          : 'text-yellow-400'
                      }
                    >
                      {item.status}
                    </span>
                  </button>

                  {/* Desktop Dropdown */}
                  {Options === i && (
                    <div className="mt-2 flex items-center">
                      <select
                        name="status"
                        className="bg-gray-700 text-white px-2 py-1 rounded w-full"
                        value={Values.status}
                        onChange={change}
                      >
                        {['', 'Book is borrowed', 'Access Denied', 'Cancelled'].map(
                          (statusOption, idx) => (
                            <option key={idx} value={statusOption}>
                              {statusOption}
                            </option>
                          )
                        )}
                      </select>
                      <button
                        className="text-green-400 ml-2"
                        onClick={() => {
                          if (Values.status === '') return;
                          setOptions(-1);
                          submitChanges(i);
                        }}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile Modal */}
        {userDivData && (
          <SeeUserData
            userDivData={userDivData}
            userDiv={userDiv}
            setUserDiv={setUserDiv}
          />
        )}
      </>
    ) : (
      <div className="text-center text-white py-20 text-xl">No requests found.</div>
    )}
  </>
);
}
export default AllRequests;