import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const MantraDetail = () => {
  const { id } = useParams();
  const [mantra, setMantra] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMantraDetail = async () => {
      try {
        const docRef = doc(firestore, "mantra", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMantra({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("Mantra not found");
        }
      } catch (error) {
        console.error("Error fetching mantra details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMantraDetail();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-black text-white p-6">
      {loading ? (
        <p className="text-lg text-gray-400">Loading Mantra Details...</p>
      ) : mantra ? (
        <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          <img
            src={mantra.imageData}
            alt="Mantra"
            className="w-full h-64 object-cover rounded mb-4"
          />
          <h1 className="text-2xl font-bold mb-4">{mantra.text}</h1>
          <p className="text-gray-300">{mantra.explanation}</p>
        </div>
      ) : (
        <p className="text-lg text-red-500">Mantra not found.</p>
      )}
    </div>
  );
};

export default MantraDetail;
