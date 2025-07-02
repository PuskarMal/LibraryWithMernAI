import React from 'react';
import { motion } from 'framer-motion';

const dummyReviews = [
  {
    username: "Soubhik Dey",
    avatar: "https://i.pravatar.cc/150?img=11",
    bookTitle: "Student, ECS, GNIT",
    comment: "Absolutely love this library website! Easy to use and so many great reads.",
    rating: 5
  },
  {
    username: "Sujit Mondal",
    avatar: "https://i.pravatar.cc/150?img=52",
    bookTitle: "Student, ECS, GNIT",
    comment: "The recommendations are spot on. Found my new favorite book here!",
    rating: 4
  },
  {
    username: "Md. Shahid Alam",
    avatar: "https://i.pravatar.cc/150?img=12",
    bookTitle: "Student, ECS, GNIT",
    comment: "Helpful search, vibrant UI, and quick links to trending titles.",
    rating: 5
  },
    {
    username: "Tanmoy Santra",
    avatar: "https://i.pravatar.cc/150?img=1",
    bookTitle: "Student, CSE, BIT",
    comment: "Love the dark theme and how fast everything loads.",
    rating: 5
  },
  {
    username: "Dishani Ghosh",
    avatar: "https://i.pravatar.cc/150?img=32",
    bookTitle: "TCS",
    comment: "A great platform to find tech and fiction books. Highly recommended!",
    rating: 4
  },
  {
    username: "Diptangshu Roy",
    avatar: "https://i.pravatar.cc/150?img=13",
    bookTitle: "Student, BU",
    comment: "Would love to see more Indian authors featured. But overall great UI!",
    rating: 4
  }
];

function getRandomReviews(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const Review = () => {
  const reviewsToShow = getRandomReviews(dummyReviews, 3);

  return (
    <div className="px-6 py-12 bg-gray-950 text-white shadow-2xl">
      <h2 className="text-4xl font-bold mb-10 text-yellow-300 text-center">User Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviewsToShow.map((review, i) => (
          <motion.div
            key={i}
            className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-yellow-400 transition"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center mb-3">
              <img src={review.avatar} alt="user" className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-semibold text-yellow-100">{review.username}</p>
                <p className="text-sm text-gray-400">{review.bookTitle}</p>
              </div>
            </div>
            <p className="text-gray-200 italic">"{review.comment}"</p>
            <p className="text-yellow-400 mt-2">⭐ {review.rating}/5</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Review;
