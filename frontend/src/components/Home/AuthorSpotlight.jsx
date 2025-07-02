import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AuthorSpotlight = () => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/auth/author-spotlight"); // Replace with your API
        setAuthor(res.data);
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    };
    fetchAuthor();
  }, []);

  if (!author) {
    return <div className="text-center text-white">Loading Author...</div>;
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <Link className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 " to={`/author-information/${author.name}`}>
        <motion.img
          src={author.url}
          alt={author.name}
          className="w-52 h-52 rounded-full object-cover shadow-lg border-4 border-yellow-400"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h2 className="text-3xl font-bold text-yellow-200 mb-2">Author Spotlight</h2>
          <h3 className="text-xl font-semibold">{author.name}</h3>
          <p className="mt-2 text-gray-300 leading-relaxed">
            {author.desc.length > 300 ? author.desc.slice(0, 370) + "..." : author.desc}
          </p>
          <p className="mt-4 text-sm text-yellow-500 italic">“{author.quote || "Inspiring readers with every word."}”</p>
        </motion.div>
      </Link>
    </section>
  );
};

export default AuthorSpotlight;
