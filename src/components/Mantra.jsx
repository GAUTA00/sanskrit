import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase/config"; // Firestore configuration
import { collection, getDocs } from "firebase/firestore";

const Mantra = () => {
  const [mantras, setMantras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMantras = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "mantra"));
        const mantraList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMantras(mantraList);
      } catch (error) {
        console.error("Error fetching Mantra data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMantras();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Sacred Mantras</h1>

        {/* Show "Loading Mantras..." while fetching data */}
        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading Mantras...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mantras.length > 0 ? (
              mantras.map((mantra) => (
                <Link
                  to={`/mantra/${mantra.id}`}
                  key={mantra.id}
                  className="block border border-gray-700 p-4 rounded shadow-lg bg-gray-800 hover:bg-gray-700 transition"
                >
                  <img
                    src={mantra.imageData}
                    alt="Mantra"
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">{mantra.text}</h2>
                  <p className="text-gray-300">{mantra.explanation}</p>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-400">No Mantras available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mantra;
