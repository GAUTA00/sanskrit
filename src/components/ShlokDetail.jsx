// src/components/ShlokDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { shlokas } from '../data/shlokas'; // Import the shlokas data

const ShlokDetail = () => {
  const { id } = useParams();
  const shlok = shlokas.find(shlok => shlok.id === parseInt(id));

  if (!shlok) {
    return <div className="text-center text-white">Shlok not found</div>;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-4xl font-bold font-khand mb-8 text-center">{shlok.text}</h1>
        <img src={shlok.image} alt="Shlok" className="w-full h-64 object-cover rounded mb-8 shadow-lg" />
        <p className="text-xl leading-relaxed font-khand">{shlok.explanation}</p>
      </div>
    </div>
  );
};

export default ShlokDetail;
