// TopGenres.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, FlameIcon, StarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const genres = [
  { name: 'Mystery & Thriller', icon: <FlameIcon className="text-red-500" size={24} /> },
  { name: 'Fiction', icon: <StarIcon className="text-blue-400" size={24} /> },
  { name: 'Romance', icon: <BookOpenIcon className="text-pink-400" size={24} /> },
  { name: 'Biography', icon: <BookOpenIcon className="text-green-400" size={24} /> },
  { name: 'Self-help', icon: <StarIcon className="text-yellow-400" size={24} /> },
  { name: 'Fantasy', icon: <FlameIcon className="text-purple-400" size={24} /> },
  { name: 'Historical Fiction', icon: <BookOpenIcon className="text-orange-400" size={24} /> },
  { name: 'Non-Fiction', icon: <StarIcon className="text-indigo-400" size={24} /> },
  { name: 'Horror', icon: <FlameIcon className="text-rose-500" size={24} /> },
  { name: 'Adventure', icon: <BookOpenIcon className="text-lime-500" size={24} /> }
];

const Categories = () => {
  return (
    <div className="px-6 py-12 bg-gradient-to-b from-gray-900 to-black text-white">
      <h2 className="text-4xl font-bold mb-10 text-yellow-300 text-center">📚 Explore Top Genres</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {genres.map((genre, index) => (
          <motion.div 
            key={index}
            className="bg-gray-800 rounded-xl p-5 flex flex-col items-center text-center shadow-lg hover:shadow-yellow-400 transition"
            whileHover={{ scale: 1.1, rotate: [0, 2, -2, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Link to={`/genre/${genre.name}`}>
            <div className="mb-3">{genre.icon}</div>
            <p className="text-lg font-medium text-yellow-100">{genre.name}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
