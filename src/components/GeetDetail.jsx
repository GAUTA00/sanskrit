import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase/config"; // Import Firestore config
import { doc, getDoc } from "firebase/firestore";

const GeetDetail = () => {
  const { id } = useParams();
  const [geet, setGeet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeet = async () => {
      try {
        const docRef = doc(firestore, "geet", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setGeet(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching Geet details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeet();
  }, [id]);

  if (loading) {
    return <div className="text-center text-white">Loading Geet details...</div>;
  }

  if (!geet) {
    return <div className="text-center text-white">Geet not found</div>;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center">{geet.text}</h1>
        <img
          src={geet.imageData}
          alt="Geet"
          className="w-full h-64 object-cover rounded mb-8 shadow-lg"
        />
        <p className="text-xl leading-relaxed">{geet.explanation}</p>
      </div>
    </div>
  );
};

export default GeetDetail;
