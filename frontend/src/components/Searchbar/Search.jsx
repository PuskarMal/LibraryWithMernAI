import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search"

import { useNavigate } from "react-router-dom";
const Search = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(true); // State to control the visibility of suggestions

    const onChange = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
        setShowSuggestions(true); // Show suggestions when the user starts typing
    }
    const onClick = () => {
        navigate("/results", { state: { search } });
    }
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            navigate("/results", { state: { search }});
        }
    }
    
    

  useEffect(() => {
    if (search !== "") {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/auth/get-allbooks?search=${search}`);
                const advancedResponse = await axios.get(`http://localhost:1000/api/auth/advanced-search?q=${search}`);

                if (response.data.length === 0) {
                    console.log("Fallback to advanced NLP search");
                    console.log(advancedResponse.data);
                    setSearchData(advancedResponse.data);
                } else {
                    console.log(response.data);
                    setSearchData(response.data);
                }

            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        fetchBooks();
    } else {
        setSearchData([]);
    }
}, [search]);


    return (
        <section className="lg:mb-40 lg:mt-6">
        <div>
            <div className=" flex flex-row">
            &ensp;&ensp;
                <input
                    type="text"
                    className="bg-zinc-900 w-[30vh] lg:ml-80 lg:w-[70%] rounded-lg border border-b-2-red-500 mt-5 text-zinc-100 text-base p-2 outline-none"
                    placeholder="Search your book"
                    name="search"
                    autoComplete="off"
                    required
                    value={search}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                /><SearchIcon className=" m-2 mt-7 text-zinc-100" onClick={onClick}/>
            </div>
            {showSuggestions && searchData.length < 3 && (
                    <div className="lg:ml-80 absolute text-sm text-zinc-300 flex flex-col mt-2">
                    {searchData.map((item, i) => (
                        <div
                            key={i}
                            className={`${selectedItem === i ? "bg-zinc-900" : ""}`}
                            onMouseEnter={() => setSelectedItem(i)}
                            onClick={() => {
                                setSearch(item.title);
                                navigate("/results", {state: {search}});
                                setShowSuggestions(false); // Hide suggestions after clicking an item
                            }}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
                
            )}
        </div>
        </section>
    );
}

export default Search;
