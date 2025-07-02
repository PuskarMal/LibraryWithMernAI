import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Wall = () => {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:1000/api/auth/get-allbooks'); // Replace with your actual endpoint
        setBooks(res.data);
      } catch (error) {
        console.error('Error fetching book wall data:', error);
      }
    };

    fetchBooks();
  }, []);
  
  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-4 shadow-2xl">
      <div className="max-w-7xl mx-auto text-center mb-8 shadow-2xl">
        <h2 className="lg:text-3xl text-2xl  font-bold text-gray-800 dark:text-yellow-200">📚 Visual Book Wall</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Dive into the wall of covers. Explore titles by just browsing.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {books.slice(0, 48).map((book, index) => (
          <Link to={`/view-book-details/${book._id}`} key={index} className="overflow-hidden rounded-md shadow hover:scale-105 transition-transform">
            <img
              src={book.url}
              alt={book.title}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Wall;
