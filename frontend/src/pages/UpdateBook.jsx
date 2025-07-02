import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const UpdateBook = () => { 
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    isbn: "",
    publication: "",
    price: "",
    pages: "",
    desc: "",
    lang: "",
    genre: "",
    rating: ""
  });
  const change = (e) => {
    const {name,value} = e.target;
    setData({...Data, [name]: value});
  };
  const {id} = useParams();
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id
  };
  const submit = async() =>{
    try{
      if (Data.url === "" || Data.title === "" || Data.author === "" || Data.isbn === "" || Data.pages === "" ||
      Data.lang === "" || Data.genre === "" || Data.rating === "")
      {
        alert("Some fields are still required");
      }
      else{
        const response = await axios.put("http://localhost:1000/api/auth/update-book", Data, {headers});
        setData({
          url: "",
          title: "",
          author: "",
          isbn: "",
          publication: "",
          price: "",
          pages: "",
          desc: "",
          lang: "",
          genre: "",
          rating: ""
        }); 
        alert(response.data.message);
        navigate(`/view-book-details/${id}`);
      }
    } catch(error){
      alert(error.response.data.message);
      
    }
  };
    useEffect(() => {
      const fetch = async ()=>{
        const response = await axios.get(`http://localhost:1000/api/auth/get-bookbyid/${id}`);
        setData(response.data.data);
      };
      fetch();
    }, []);
   
  return (
      <div className="min-h-screen p-4 md:py-10 md:px-20 bg-zinc-900">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Update Book</h1>
      <div className='p-4 bg-zinc-800 rounded'>
        <div>
          <label htmlFor="" className='text-zinc-400'>Cover Image*</label>
          <input type="text" className='w-full m-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
          placeholder='URL of image' name="url" required value={Data.url} onChange={change}/>
        </div>
        <div className='mt-4'>
        <label htmlFor="" className='text-zinc-400'>Title*</label>
          <input type="text" className='w-full m-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
          placeholder='Title of the book' name="title" required value={Data.title} onChange={change}/>
        </div>
        <div className='mt-4'>
        <label htmlFor="" className='text-zinc-400'>Author*</label>
          <input type="text" className='w-full m-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
          placeholder='Name of the Author' name="author" required value={Data.author} onChange={change}/>
        </div>
        <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>Publication</label>
            <input type="text" className='w-full m-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
            placeholder='Name of Publishing House' name="publication" required value={Data.publication} onChange={change}/>
        </div>
        <div className='mt-4 flex gap-4'>
          <div className='w-4/12'>
            <label htmlFor="" className='text-zinc-400'>ISBN No. *</label>
            <input type="text" className='w-full m-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
            placeholder='ISBN No.' name="isbn" required value={Data.isbn} onChange={change}/>
          </div>
          <div className='w-4/12'>
            <label htmlFor="" className='text-zinc-400'>Language*</label>
            <input type="text" className='w-full m-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
            placeholder='Language' name="lang" required value={Data.lang} onChange={change}/>
          </div>
          <div className='w-4/12'>
            <label htmlFor="" className='text-zinc-400'>Price</label>
            <input type="text" className='w-full m-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
            placeholder='Price' name="price" required value={Data.price} onChange={change}/>
          </div>
        </div>
        <div className='mt-4 flex gap-4'>
        <div className='w-4/12'>
            <label htmlFor="" className='text-zinc-400'>Genre*</label>
            <input type="text" className='w-full m-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
            placeholder='Genre' name="genre" required value={Data.genre} onChange={change}/>
          </div>
          <div className='w-4/12'>
            <label htmlFor="" className='text-zinc-400'>Pages*</label>
            <input type="text" className='w-full m-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
            placeholder='No. of pages' name="pages" required value={Data.pages} onChange={change}/>
          </div>
          <div className='w-4/12'>
            <label htmlFor="" className='text-zinc-400'>Rating*</label>
            <input type="text" className='w-full m-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
            placeholder='Rating' name="rating" required value={Data.rating} onChange={change}/>
          </div>
        </div>
        <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>Description</label>
            <textarea className='w-full m-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
            placeholder='About the book' name="desc" rows="7" required value={Data.desc} onChange={change}/>
        </div>
        <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:nbg-blue-800' onClick={submit}>
            Update
        </button>
      </div>
    </div>
  )
}

export default UpdateBook;