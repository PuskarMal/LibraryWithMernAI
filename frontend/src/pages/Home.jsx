import React from "react";
import Hero from "../components/Home/Hero";
import RecentBooks from "../components/Home/RecentBooks";
import Recommended from "../components/Home/recommended";
import Trending from "../components/Home/trending";
import Events from "../components/Home/Events";
import AuthorSpotlight from "../components/Home/AuthorSpotlight";
import Categories from "../components/Home/Categories";
import TopRatedBooks from "../components/Home/TopRatedBooks";
import Wall from "../components/Home/Wall";
import Review from "../components/Home/Review";
const Home = () => {
  return <div className="bg-zinc-900 text-white lg:py-5 sm:py-[200px]">
  <div className="px-10">
  <Hero/>
  <RecentBooks/>
  <Recommended/>
  <Trending/>
  <TopRatedBooks/>
  </div>
  <div>
  <Categories/>
  <Events/>
  <AuthorSpotlight/>
  <Wall/>
  <Review/>

  <div className="bg-blue-200 p-6 rounded-xl text-black text-center">
  <h3 className="text-2xl font-bold">📱 Download Our App</h3>
  <p className="mt-2">Get our library on your fingertips. Coming soon on Play Store!</p>
  <button className="mt-4 px-6 py-2 bg-black text-white rounded-full">Notify Me</button>
</div>
  <div className=" p-6 rounded-xl text-white text-center mt-10">
  <h3 className="text-2xl font-bold">Join Our Reader's Community</h3>
  <p className="my-2">Connect with other book lovers, exchange ideas, and participate in contests!</p>
  <input placeholder="Your email" className="px-4 py-2 lg:mt-0 mt-5 rounded-l-md" />
  <button className="bg-blue-400 px-4 py-2 rounded-r-md mt-5  text-black">Subscribe</button>
</div>

  </div>
  </div>
};

export default Home;