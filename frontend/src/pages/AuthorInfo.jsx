import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Books from '../components/Author/Books';
import Loader from '../components/Loader/Loader';
const AuthorInfo = () => {
    const { id } = useParams();  // Use useParams to get the id from URL
    const [data, setData] = useState(null);  // Initialize data as null

    useEffect(() => { 
        const fetchAuthorData = async () => {
            try {
                const response = await axios.get(`https://librarybackend-3-73l4.onrender.com/api/auth/get-author-information/${id}`);
                setData(response.data.data);  // Set the API response data
                
            } catch (error) {
                console.error("Error fetching author data:", error);
            }
        };
        fetchAuthorData();
    }, [id]);

    if (!data) return <div><Loader/></div>;

    
  return (
    <div className="bg-zinc-900 px-4 md:px-8 lg:px-20 py-10 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Author Info */}
        <div className="w-full lg:w-1/2 p-6 rounded-2xl shadow-lg">
          <h1 className="text-yellow-200 text-xl lg:text-4xl font-semibold mb-4">{data.name}</h1>

          <div className="flex justify-center my-8">
            <img
              src={data.url}
              alt="Image not found"
              className="rounded-xl max-h-[400px] object-contain w-full md:w-4/5"
            />
          </div>

          <p className="text-zinc-300 text-justify leading-relaxed">
            {data.desc}
          </p>
        </div>

        {/* Right: Books List */}
        <div className="w-full lg:w-1/2 bg-gradient-to-b from-gray-900 to-black text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-zinc-100 text-2xl lg:text-3xl font-semibold mb-6 text-center">
            Books by the Author
          </h2>
          <Books />
        </div>
      </div>
    </div>
  );
};
export default AuthorInfo;
