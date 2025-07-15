import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';
const TopRatedBooks = () => {
    const [topRated, setTopRated] = useState([]);
    useEffect (() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`https://librarybackend-3-73l4.onrender.com/api/auth/get-top-rated-books`)
                setTopRated(response.data)
            }
            catch (err) {
                console.error(err)
            }

        }
        fetchBooks()
    },
        []);
    return (
        <div className="mt-16 px-4">
    <h4 className="text-3xl text-yellow-100">Top Rated Books</h4>
    { !topRated && (
    <div className="flex items-center justify-center my-8">
      <Loader />{" "}
    </div>)}
            <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8">
                {topRated.map(book => <BookCard data={book} key={book._id} />)}
            </div></div>
    )}


    export default TopRatedBooks
