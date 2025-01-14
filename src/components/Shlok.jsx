// src/components/Shlok.js
import React from 'react';
import { Link } from 'react-router-dom';
import { shlokas } from '../data/shlokas'; // Import the shlokas data

const Shlok = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Sarvam Shlok</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shlokas.map((shlok) => (
            <Link to={`/shlok/${shlok.id}`} key={shlok.id} className="block border border-gray-700 p-4 rounded shadow-lg bg-gray-800 hover:bg-gray-700 transition">
              <img src={shlok.image} alt="Shlok" className="w-full h-48 object-cover mb-4" />
              <h2 className="text-xl font-khand font-semibold mb-2">{shlok.text}</h2>
              <p className="text-gray-300 font-khand">{shlok.explanation}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shlok;
