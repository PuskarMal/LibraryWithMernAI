import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';
const Genre = () => {
    const {id} =useParams();
    const [Data, setData] = useState();
    useEffect(() => {
        
        const fetch = async () => {
            const response = await axios.get(
              `https://librarybackend-3-73l4.onrender.com/api/auth/get-books-of-same-genre/${id}`
            );
            setData(response.data.data);
          };
          fetch();
        }, []);
  return (
    <div className="pt-8 px-10 h-auto min-h-screen bg-zinc-900">
        <h1 className='text-4xl text-yellow-200 font-semibold'>Genre:&emsp;{id}</h1>
      {!Data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="mt-12 my-8 grid grid-cols-5">
        {Data &&
          Data.map((item, i) => (
            <div key={i} className="shadow-lg rounded-lg flex text-center mb-5 justify-center">
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Genre
