import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 p-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">BookVenture</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Your smart library for discovering and enjoying books with AI-powered recommendations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-yellow-300 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link to="/explore" className="hover:text-yellow-400 transition">Explore Books</Link></li>
            <li><Link to="/login" className="hover:text-yellow-400 transition">Login</Link></li>
            <li><Link to="/signup" className="hover:text-yellow-400 transition">Sign Up</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-yellow-300 mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-yellow-400 transition">FAQs</Link></li>
            <li><Link to="/privacy" className="hover:text-yellow-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-yellow-400 transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3 className="font-semibold text-yellow-300 mb-3">Stay Connected</h3>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4 text-xl mb-4">
            <a href="mailto:info@bookventure.com" className="hover:text-yellow-400" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>

          {/* Newsletter Form */}
          <form className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none text-sm text-black focus:outline-none w-full"
            />
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-md sm:rounded-l-none sm:rounded-r-md text-sm font-semibold hover:bg-yellow-300 transition">
              Subscribe
            </button>
          </form>
          
        </div>
        <div className="text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} BookVenture. All rights reserved.
      </div>
      </div>

      {/* Copyright */}
      
    </footer>
  );
};
export default Footer;
