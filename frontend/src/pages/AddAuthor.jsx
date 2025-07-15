import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
const AddAuthor = () => {
  const [Data, setData] = useState({
    url: "",
    name: "",
    desc: ""
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (Data.name === "" || Data.desc === "") {
        alert("Some fields are still required");
      } else {
        const payload = { name: Data.name, desc: Data.desc };
        if (Data.url.trim() !== "") {
          payload.url = Data.url;
        }

        const response = await axios.post(
          "https://librarybackend-3-73l4.onrender.com/api/auth/add-author",
          payload,
          { headers }
        );

        setData({
          url: "",
          name: "",
          desc: ""
        });

        alert(response.data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong!");
    }
  };

   return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto bg-zinc-800 rounded-2xl shadow-lg p-8 transition-all duration-300">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">Add Author</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image URL */}
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm">Cover Image URL</label>
            <input
              type="text"
              name="url"
              value={Data.url}
              onChange={change}
              placeholder="Enter author's image URL"
              className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Author Name */}
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm">Author Name *</label>
            <input
              type="text"
              name="name"
              value={Data.name}
              onChange={change}
              placeholder="Enter author's name"
              className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="text-sm">Description *</label>
          <textarea
            name="desc"
            value={Data.desc}
            onChange={change}
            placeholder="Write about the author"
            rows="5"
            className="mt-1 w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={submit}
          className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg font-semibold text-lg shadow-md"
        >
          Add Author
        </button>
      </div>
    </div>
  
  )
}

export default AddAuthor
