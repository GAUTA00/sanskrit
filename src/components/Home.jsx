import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FFCC99] text-white flex flex-col items-center">
      {/* This is the new background color #FFCC99 */}
      
      <div className="w-full flex flex-col items-center mt-8">
        <h1 className="text-4xl font-bold text-center mb-4 font-khand text-gray-800">Welcome to Sanskrit Learning</h1>
        <p className="text-lg text-center mb-8 font-khand text-gray-700">
          Explore the beauty of Sanskrit through Shloks, Mantras, Kathas, Geet, and Hasyakanika.
        </p>
      </div>

      <div className="flex-grow flex justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 w-11/12 max-w-screen-lg">
          <Link to="/shlok" className="block w-64 h-64 p-6 border border-gray-700 rounded-lg shadow-xl text-center bg-[#444444] hover:bg-[#333333] transition">
            <h2 className="text-2xl font-semibold mb-4 text-white">Sarvam Shlok</h2>
            <p className="text-gray-300">Dive into the world of powerful Shloks with detailed explanations.</p>
          </Link>
          <Link to="/mantra" className="block w-64 h-64 p-6 border border-gray-700 rounded-lg shadow-xl text-center bg-[#444444] hover:bg-[#333333] transition">
            <h2 className="text-2xl font-semibold mb-4 text-white">Mantra</h2>
            <p className="text-gray-300">Discover sacred Mantras and their profound meanings.</p>
          </Link>
          <Link to="/katha" className="block w-64 h-64 p-6 border border-gray-700 rounded-lg shadow-xl text-center bg-[#444444] hover:bg-[#333333] transition">
            <h2 className="text-2xl font-semibold mb-4 text-white">Katha</h2>
            <p className="text-gray-300">Read timeless stories from the great epics of India.</p>
          </Link>
          <Link to="/geet" className="block w-64 h-64 p-6 border border-gray-700 rounded-lg shadow-xl text-center bg-[#444444] hover:bg-[#333333] transition">
            <h2 className="text-2xl font-semibold mb-4 text-white">Geet</h2>
            <p className="text-gray-300">Listen to and understand the lyrics of beautiful Sanskrit songs.</p>
          </Link>
          <Link to="/hasyakanika" className="block w-64 h-64 p-6 border border-gray-700 rounded-lg shadow-xl text-center bg-[#444444] hover:bg-[#333333] transition">
            <h2 className="text-2xl font-semibold mb-4 text-white">Hasyakanika</h2>
            <p className="text-gray-300">Enjoy humorous stories and light-hearted Sanskrit content.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
