import React from 'react';
import { motion } from 'framer-motion';

const dummyEvents = [
  {
    title: "Library Book Fair 2025",
    location: "Main Campus Hall",
    date: "2025-07-15",
    description: "Explore rare collections, meet authors, and enjoy exciting literary games."
  },
  {
    title: "Reading Marathon",
    location: "Library Ground Floor",
    date: "2025-08-05",
    description: "Join fellow readers in a 12-hour book reading challenge."
  },
  {
    title: "Author Q&A with Ravi Subramanian",
    location: "Online Zoom Event",
    date: "2025-09-01",
    description: "A virtual discussion with the popular author on thriller writing."
  }
];

const EventPage = () => {
  return (
    <div className="px-6 py-12 bg-gradient-to-b from-gray-900 to-black text-white">
      <h2 className="text-4xl font-bold mb-10 text-yellow-300 text-center">📅 Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyEvents.map((event, i) => (
          <motion.div
            key={i}
            className="bg-gray-800 rounded-2xl p-6 shadow-lg transition"
            
          >
            <h3 className="text-2xl font-semibold text-yellow-100 mb-2">{event.title}</h3>
            <p className="text-sm text-gray-300">📍 {event.location}</p>
            <p className="text-sm text-gray-400 mb-3">🗓️ {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-200">{event.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;