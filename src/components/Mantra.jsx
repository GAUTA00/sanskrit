// src/components/Mantra.js
import React from 'react';

const dummyImage = "https://i.pinimg.com/originals/a1/97/4e/a1974ed93678beaf9a2edd90d6893909.jpg";

const mantras = [
  {
    id: 1,
    image: dummyImage,
    text: "ॐ भूर् भुवः स्वः। तत्सवितुर्वरेण्यं। भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥",
    explanation: "हम उस दिव्य तेजस्वी सविता देवता का ध्यान करते हैं, जो हमारी बुद्धि को सही मार्ग में प्रेरित करे।"
  },
  {
    id: 2,
    image: dummyImage,
    text: "शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं। विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्॥",
    explanation: "शांत स्वरूप वाले, सर्प शैया पर विराजमान, कमल से उत्पन्न, देवताओं के स्वामी, विश्व के आधार, आकाश के समान, मेघ के रंग वाले और शुभ अंगों वाले।"
  },
  {
    id: 3,
    image: dummyImage,
    text: "शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं। विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्॥",
    explanation: "शांत स्वरूप वाले, सर्प शैया पर विराजमान, कमल से उत्पन्न, देवताओं के स्वामी, विश्व के आधार, आकाश के समान, मेघ के रंग वाले और शुभ अंगों वाले।"
  }
];

const Mantra = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-black text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Mantra</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-11/12 max-w-screen-lg">
        {mantras.map((mantra) => (
          <div key={mantra.id} className="border border-gray-700 p-4 rounded-lg shadow-lg bg-gray-900">
            <img src={mantra.image} alt="Mantra" className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold mb-2">{mantra.text}</h2>
            <p className="text-gray-400">{mantra.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mantra;
