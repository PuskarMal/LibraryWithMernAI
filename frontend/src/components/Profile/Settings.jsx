import React, { useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Loader from "../Loader/Loader";
import { FaUserEdit } from "react-icons/fa";

const Settings = () => {
    const [isUpdated, setisUpdated] = useState(false);
    const [value, setValue] = useState({ city: "" });
    const [values, setValues] = useState({ username: "" });
    const [data, setData] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const onChange1 = (event) => {
        const { name, value } = event.target;
        setValue({ ...value, [name]: value });
        setisUpdated(true);
    };

    const onChange2 = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setisUpdated(true);
    };


    const handleClick = async () => {
        try {
            const response = await axios.put("https://librarybackend-3-73l4.onrender.com/api/auth/update-city", value, { headers });
            const respn = await axios.put("https://librarybackend-3-73l4.onrender.com/api/auth/update-username", values, { headers });
            alert(response.data.message);
        }
        catch(error){
        alert("Error in information")
    }
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("https://librarybackend-3-73l4.onrender.com/api/auth/get-userinfo", { headers });
            setData(response.data);
            setValue({ city: response.data.city });
            setValues({ username: response.data.username });
        };
        fetch();
    }, []);

    return (
        <>
            {!data && (
                <div className="w-full h-auto flex items-center justify-center">
                    <Loader />
                </div>
            )}{" "}
            {data && (
                <div className="h-[100%] p-0 md:p-4 text-zinc-100">
                    <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-6 ">Settings</h1>
                    <FaUserEdit className="text-4xl"/>
                    <div className="flex flex-col gap-8 px-6 py-4">
                        <div>
                            <label>Email</label><br/>
                            <div className="p-2 rounded bg-zinc-800 mt-2 lg:w-[30%] font-semibold w-[70%]">{data.email}</div>
                       </div>
                    
                        <div >
                            <label>Username</label><br/>
                            <input
                                className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
                                placeholder="Username"
                                name="username"
                                value={values.username}
                                onChange={onChange2}
                            />
                        </div>
                        <div>
                            <label>City</label><br />
                            <input
                                className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
                                placeholder="City"
                                name="city"
                                value={value.city}
                                onChange={onChange1}
                            />
                        </div>
                    </div>
                    <div>
                    {isUpdated && (<div className="mt-4 flex justify-end">
                        <button
                            className="bg-yellow-500 text-zinc-900 font-semibold px-4 py-1 rounded hover:bg-yellow-400"
                            onClick={handleClick}
                            
                        >
                            Update
                        </button>
                    </div>)}
                    </div>
                    
                </div>
             
            )}
        </>
    );
};

export default Settings;
