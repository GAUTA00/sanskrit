import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase/config"; // Firestore configuration
import { collection, getDocs } from "firebase/firestore";

const Geet = () => {
  const [geets, setGeets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeets = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "geet"));
        const geetList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGeets(geetList);
      } catch (error) {
        console.error("Error fetching Geet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeets();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Bhakti Geet</h1>

        {/* Show "Loading Geets..." while fetching data */}
        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {geets.length > 0 ? (
              geets.map((geet) => (
                <Link
                  to={`/geet/${geet.id}`}
                  key={geet.id}
                  className="block border border-gray-700 p-4 rounded shadow-lg bg-gray-800 hover:bg-gray-700 transition"
                >
                  <img
                    src={geet.imageData}
                    alt="Geet"
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">{geet.text}</h2>
                  <p className="text-gray-300">{geet.explanation}</p>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-400">No Geets available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Geet;
