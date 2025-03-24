import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase/config"; // Firestore configuration
import { collection, getDocs } from "firebase/firestore";

const Shlok = () => {
  const [shlokas, setShlokas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShlokas = async () => {
      try {
        const shlokCollection = collection(firestore, "shlok");
        const snapshot = await getDocs(shlokCollection);
        const shlokList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setShlokas(shlokList);
      } catch (error) {
        console.error("Error fetching shlokas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShlokas();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Sarvam Shlok</h1>

        {loading ? (
          <p className="text-center text-gray-300">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {shlokas.map((shlok) => (
              <Link
                to={`/shlok/${shlok.id}`}
                key={shlok.id}
                className="block border border-gray-700 p-4 rounded shadow-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                <img
                  src={shlok.imageData} // Fetching from Firestore
                  alt="Shlok"
                  className="w-full h-48 object-cover mb-4"
                />
                <h2 className="text-xl font-khand font-semibold mb-2">
                  {shlok.text}
                </h2>
                <p className="text-gray-300 font-khand">{shlok.explanation}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shlok;
