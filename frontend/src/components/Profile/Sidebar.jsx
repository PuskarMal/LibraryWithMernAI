import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRightFromBracket} from "react-icons/fa6";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import Favorite from "./Favorites";

const Sidebar = ({data}) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const role = useSelector((state) => state.auth.role);
    const onClick = () => {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        localStorage.clear("icon")
        history("/");
    }
    return (<div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between lg:h-[90%]">
        <div className="flex flex-col items-center justify-center">{" "}
        
            <img src={data.avatar} className="h-[12vh] rounded-full" alt="icon" />
            <p className="mt-3 text-xl text-zinc-100 font-semibold">
                {data.username}
            </p>
            <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
            <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
        </div>
        {role === "user" &&(<div className="w-full flex flex-col items-center justify-center lg:flex">
            <Link to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 hidden lg:block">
                Favorite
            </Link>
            <Link to="/profile/history"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 hidden lg:block">
                History
            </Link>
            <Link to="/profile/borrowed-books"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 hidden lg:block">
                Borrow List
            </Link>
            <Link to="/profile/settings"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 hidden lg:block">
                Settings
            </Link>
        </div>)}
        {role === "admin" &&(<div className="w-full flex flex-col items-center justify-center lg:flex">
            <Link to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 hidden lg:block">
                Requests
            </Link>
            <Link to="/profile/add-book"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 hidden lg:block">
                Add Book
            </Link>
            <Link to="/profile/add-author"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 hidden lg:block">
                Add Author
            </Link>
        </div>)}
        <Link to="/" className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-30" onClick={onClick}>
            Log Out <FaRightFromBracket className="ms-4" onClick={onClick}/>
        </Link>
    </div>)};
export default Sidebar;