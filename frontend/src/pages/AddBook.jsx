import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom" 
const AddBook = () => {
  const navigate = useNavigate()
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
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`
    };
    const change = (e) => {
      const {name,value} = e.target;
      setData({...Data, [name]: value});
    };
    const submit = async() =>{
      try{
        if (Data.url === "" || Data.title === "" || Data.author === "" || Data.isbn === "" || Data.pages === "" ||
        Data.lang === "" || Data.genre === "" || Data.rating === "")
        {
          alert("Some fields are still required");
        }
        else{
          const response = await axios.post("http://localhost:1000/api/auth/add-book", Data, {headers});
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
          if(response.data.message == "Author not found")
          navigate('/add-author')
        }
      } catch(error){
        alert(error.response.data.message);
      }
    }
     return (
    <div className="min-h-screen  text-white p-6">
      <div className="max-w-4xl mx-auto bg-zinc-800 rounded-2xl shadow-lg p-8 transition-all duration-300">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">Add a New Book</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm">Cover Image URL *</label>
            <input type="text" name="url" value={Data.url} onChange={change}
              className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="text-sm">Title *</label>
            <input type="text" name="title" value={Data.title} onChange={change}
              className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="text-sm">Author *</label>
            <input type="text" name="author" value={Data.author} onChange={change}
              className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700" />
          </div>

          <div>
            <label className="text-sm">Publication</label>
            <input type="text" name="publication" value={Data.publication} onChange={change}
              className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700" />
          </div>

          <div>
            <label className="text-sm">ISBN No. *</label>
            <input type="text" name="isbn" value={Data.isbn} onChange={change}
              className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700" />
          </div>

          <div>
            <label className="text-sm">Language *</label>
            <input type="text" name="lang" value={Data.lang} onChange={change}
              className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700" />
          </div>

          <div>
            <label className="text-sm">Price</label>
            <input type="text" name="price" value={Data.price} onChange={change}
              className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700" />
          </div>

          <div>
            <label className="text-sm">Pages *</label>
            <input type="text" name="pages" value={Data.pages} onChange={change}
              className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700" />
          </div>

          <div>
            <label className="text-sm">Genre *</label>
            <input type="text" name="genre" value={Data.genre} onChange={change}
              className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700" />
          </div>

          <div>
            <label className="text-sm">Rating *</label>
            <input type="text" name="rating" value={Data.rating} onChange={change}
              className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700" />
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm">Description</label>
          <textarea name="desc" value={Data.desc} onChange={change} rows="5"
            className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700 resize-none" />
        </div>

        <button onClick={submit}
          className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg font-semibold text-lg shadow-md">
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;