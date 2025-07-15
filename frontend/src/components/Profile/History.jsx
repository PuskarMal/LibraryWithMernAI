import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useParams } from "react-router-dom";

const History = () => {
    const [bookInHistory, setbookInHistory] = useState([]); 
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("https://librarybackend-3-73l4.onrender.com/api/auth/get-history", { headers });
            setbookInHistory(response.data.data);
        };
        fetch();
    }, []);

    return (
        <>
            {!bookInHistory.length && (
                <div className="h-screen flex items-center justify-center"><Loader /></div>
            )}
            {bookInHistory.length === 0 && (
                <div className="h-[80vh] p-4 text-zinc-100">
                    <div className="h-[100%] flex flex-col items-center justify-center">
                        <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
                            No request History
                        </h1>
                    </div>
                </div>
            )}
            {bookInHistory.length > 0 && (
                <div className="h-[100%] p-0 md:p-4 text-zinc-100">
                    <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                        Your request History
                    </h1>
                    <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 font-bold flex gap-2">
                        <div className="w-[6%]">
                            <h1 className="text-center">Sl. No.</h1>
                        </div>
                        <div className="w-[22%]">
                            <h1>Book</h1>
                        </div>
                        <div className="w-[22%]">
                            <h1>Author</h1>
                        </div>
                        <div className="w-[45%]">
                            <h1>Description</h1>
                        </div>
                        <div className="w-[16%]">
                            <h1>Status</h1>
                        </div>
                    </div>
                    {bookInHistory.map((item, i) => (
                        <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer">
                            <div className="w-[6%]">
                                <h1 className="text-center">{i + 1}</h1>
                            </div>
                            <div className="w-[22%]">
                                <Link to={`/view-book-details/${item._id}`} className="hover:text-blue-300">
                                    {item.book.title.slice(0,20)}...
                                </Link>
                            </div>
                            <div className="w-[22%]">
                                <h1>{item.book.author.slice(0,20)}...</h1>
                            </div>
                            <div className="w-[45%]">
                                <h1 className="">{item.book.desc.slice(0,50)} ...</h1>
                            </div>
                            <div className="w-[16%]">
                                <h1 className="font-semibold text-green-500">
                                    {item.status === "Request Sent" ? (<div className="text-yellow-500">{item.status}</div>) : 
                                    item.status === "Cancelled" ? (<div className="text-red-500">{item.status}</div>) :
                                    (<div className="text-green-500">{item.status}</div>)}   
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default History;
