import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
        {role === "user" &&(<div className="w-full flex items-center lg:hidden justify-between mt-4">
            <Link to="/profile"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300">
                Favorite
            </Link>
            <Link to="/profile/history"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300">
                History
            </Link>
            <Link to="/profile/borrowed-books"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300">
                Borrow List
            </Link>
            <Link to="/profile/settings"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300">
                Settings
            </Link>
        </div>)}
        {role === "admin" &&(<div className="w-full flex items-center lg:hidden justify-between mt-4">
            <Link to="/profile"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300">
                Requests
            </Link>
            <Link to="/profile/add-book"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300">
                Add Book
            </Link>
            <Link to="/profile/add-author"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300">
                Add Author
            </Link>
        </div>)}
    </>
  )
}

export default MobileNav