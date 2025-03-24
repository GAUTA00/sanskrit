import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase/config"; // Firestore configuration
import { collection, getDocs } from "firebase/firestore";

const Katha = () => {
  const [kathas, setKathas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKathas = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "katha"));
        const kathaList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setKathas(kathaList);
      } catch (error) {
        console.error("Error fetching Katha data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKathas();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">कथा</h1>

        {/* Show "Loading Kathas..." while fetching data */}
        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {kathas.length > 0 ? (
              kathas.map((katha) => (
                <Link
                  to={`/katha/${katha.id}`}
                  key={katha.id}
                  className="block border border-gray-700 p-4 rounded shadow-lg bg-gray-800 hover:bg-gray-700 transition"
                >
                  <img
                    src={katha.imageData}
                    alt="Katha"
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">{katha.text}</h2>
                  <p className="text-gray-300">{katha.explanation}</p>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-400">No Kathas available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Katha;
