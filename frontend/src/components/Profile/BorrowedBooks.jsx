import React, {useState, useEffect} from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { AiTwotoneDelete } from "react-icons/ai";
const BorrowedBooks = () => {
    const [BorrowedBook,setBorrowedBook] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
  };
  useEffect (() => {
    const fetch = async () => {
        const response = await axios.get("http://localhost:1000/api/auth/get-borrowed-books",{headers});
        setBorrowedBook(response.data.data);
    }
    fetch();
},[]);
const deleteItem = async (bookid) => {
    const response = await axios.put(`http://localhost:1000/api/auth/book-return`,{},{headers});
    alert(response.data.message);
    setBorrowedBook(BorrowedBook.filter(book => book.book._id !== bookid));
}
    return (
    <>
        {!BorrowedBook && 
            <div className="h-screen flex items-center justify-center"><Loader/></div>
        }
        {BorrowedBook && BorrowedBook.length==0 && (
            <div className="h-screen p-4">
                <div className="h-[100%] flex flex-col items-center lg:justify-center">
                    <h1 className="text-2xl lg:text-6xl font-semibold text-zinc-400">
                        No books borrowed
                    </h1>
                </div>
            </div>
        )}
        {BorrowedBook && BorrowedBook.length > 0 && (
            <>
                {BorrowedBook.map((item,i) => (
                    (<div key={i}>
                        {item.status === "Book is borrowed" &&
                        (
                        <div className="w-full my-4 rounded flex flex-row p-4 bg-zinc-800 justify-between items-center">
                        <img src={item.book.url} alt="/" className="h-[10vh] md:h-[10vh] object-cover"/>
                        <div className="w-full md:w-auto">
                            <h1 className="md:text-2xl text-zinc-100 ml-5 md:ml-0 font-semibold text-start mt-2 md:mt-0">
                                {item.book.title}
                            </h1>
                            <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                                {item.book.desc.slice(0,100)}...
                            </p>
                            <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden ">
                                {item.book.desc.slice(0,65)}...
                            </p>
                            <p className="text-normal text-zinc-300 mt-2 ml-5 block md:hidden">
                                {item.book.desc.slice(0,100)}...
                            </p>
                            </div>
                            <div className="flex mt-4 md:w-auto items-center justify-between">
                            <button className="bg-red-100 text-red-700 border-red-700 rounded p-2 text-3xl ms-12 md:text-xl"
                            onClick={() => deleteItem(item.book._id)}><AiTwotoneDelete/></button>
                            </div>
                        </div>
                        )}
                        </div>)))}
            </>
        )}
    </>)
}
export default BorrowedBooks;