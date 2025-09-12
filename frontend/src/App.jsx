import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";
import Favorites from "./components/Profile/Favorites";
import Results from "./pages/results";
import History from "./components/Profile/History";
import Settings from "./components/Profile/Settings";
import AllRequests from "./pages/AllRequests";
import BorrowedBooks from "./components/Profile/BorrowedBooks";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import Forgot from "./pages/Forgot";
import AuthorInfo from "./pages/AuthorInfo";
import ResetPassword from "./pages/ResetPassword";
import Genre from "./pages/Genre";
import AddAuthor from "./pages/AddAuthor";


const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
        localStorage.getItem("id") &&
        localStorage.getItem("token") &&
        localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <div>
      
        <Navbar />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/author-information/:id" element={<AuthorInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} >
            {role === "admin" ? (<Route index element={<AllRequests/>}/>) : (<Route index element={<Favorites/>}/>)}
            {role === "admin" && (<Route path="/profile/add-book" element={<AddBook/>}/>)}
            <Route path="/profile/history" element={<History/>}/>
            <Route path="/profile/borrowed-books" element={<BorrowedBooks/>}/>
            <Route path="/profile/settings" element={<Settings/>}/>
            <Route path="/profile/add-author" element={<AddAuthor/>}/>
          </Route>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/updateBook/:id" element={<UpdateBook/>} />
          <Route path="/forgot-password/" element={<Forgot/>} />
          <Route path="/reset-password/" element={<ResetPassword/>} />
          <Route path="/view-book-details/:id" element={<ViewBookDetails/>}/>
          <Route path="/results" element={<Results />} />
          <Route path="/genre/:id" element={<Genre />} />
        </Routes>
        <Footer />
      
    </div>
  );
};

export default App;
