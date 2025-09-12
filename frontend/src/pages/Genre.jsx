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
      <div className="my-8 grid grid-cols-1 text-white sm:grid-cols-3 md:grid-cols-5 gap-8">
      {Data && Data.map((items,i) => (
      <div key={i}>
        <BookCard data={items} />{" "} 
      </div>
    ))}
    </div>
    </div>
  )
}

export default Genre
