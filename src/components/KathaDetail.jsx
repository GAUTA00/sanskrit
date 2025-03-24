import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const KathaDetail = () => {
  const { id } = useParams(); // Get the Katha ID from the URL
  const [katha, setKatha] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKatha = async () => {
      try {
        const docRef = doc(firestore, "katha", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setKatha(docSnap.data());
        } else {
          console.error("No such Katha found!");
        }
      } catch (error) {
        console.error("Error fetching Katha details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKatha();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-4">
      {loading ? (
        <p className="text-lg text-gray-400">Loading Katha Details...</p>
      ) : katha ? (
        <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          <img
            src={katha.imageData}
            alt="Katha"
            className="w-full h-64 object-cover mb-4 rounded-lg"
          />
          <h1 className="text-3xl font-bold mb-4">{katha.text}</h1>
          <p className="text-lg text-gray-300">{katha.explanation}</p>
        </div>
      ) : (
        <p className="text-lg text-red-500">Katha not found.</p>
      )}
    </div>
  );
};

export default KathaDetail;
