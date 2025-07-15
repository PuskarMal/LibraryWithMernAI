import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ViewBookDetails from "../components/ViewBookDetails/ViewBookDetails";
import SearchIcon from "@mui/icons-material/Search";
import Search from "../components/Searchbar/Search";
const Results = () => {
    const location = useLocation();
    
    const [searchResults, setSearchResults] = useState([]);
    const searchQuery = location.state?.search || "";
    
    useEffect(() => {
        if (searchQuery) {
            const fetchSearchResults = async () => {
                try {
                    const response = await axios.get(`https://librarybackend-3-73l4.onrender.com/api/auth/get-allbooks?search=${searchQuery}`);
                    const advancedResponse = await axios.get(`https://librarybackend-3-73l4.onrender.com/api/auth/advanced-search?q=${searchQuery}`);
                    if(response.data.length === 0)
                    setSearchResults(advancedResponse.data);
                    else
                    setSearchResults(response.data)
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            };
            fetchSearchResults();
        }
    }, [searchQuery]);

    return (
        
        <div className="bg-zinc-900 h-auto min-h-screen">
            <div className="pt-5 pr-80 outline-none"><Search/></div>
            <div className="lg:ml-60 pt-5">
                <h1 className="text-xl lg:mt-0 mt-20 text-zinc-300 pl-5 mb-3 lg:ml-0">Search Results for "{searchQuery}"</h1>
            {searchResults.length >= 0 ? (
                <ul className="pb-4 px-2 lg:ml-30">
                    {searchResults.map((item, i) => (
                        <div key={i} className="ml-0 p-5 lg:w-[80%] bg-zinc-800 rounded-md flex flex-col lg:flex-row text-zinc-200">
                            <Link to={`/view-book-details/${item._id}`}>
                            <img src={item.url} alt="cover" className="h-[30vh] w-[50%] lg:w-[20vh] lg:h-[30vh] ml-20 justify-between"/>
                            </Link>
                            <div className="pl-20 flex flex-col">
                            <Link to={`/view-book-details/${item._id}`} className="text-xl font-semibold text-zinc-200">{item.title}</Link>
                            <p className="text-base text-zinc-400">{item.author}</p>
                            <p className="text-base text-zinc-400">{item.publication}</p>
                            <p className="text-base text-zinc-400">ISBN: {item.isbn}</p>
                            <p className="text-base text-zinc-400">Price {item.price}</p>
                            </div>
                        </div>
                    ))}
                </ul>
            ) : (
                <p className="text-zinc-600">No results found for your search.</p>
            )}
        </div>
  </div>
    );
};

export default Results;
