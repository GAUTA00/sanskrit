import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const HasyakanikaDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const docRef = doc(firestore, "hasyakanika", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStory(docSnap.data());
        } else {
          console.error("No such Hasyakanika found!");
        }
      } catch (error) {
        console.error("Error fetching Hasyakanika details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-4">
      {loading ? (
        <p className="text-lg text-gray-400">Loading Hasyakanika Details...</p>
      ) : story ? (
        <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          <img
            src={story.imageData}
            alt="Hasyakanika"
            className="w-full h-64 object-cover mb-4 rounded-lg"
          />
          <h1 className="text-3xl font-bold mb-4">{story.text}</h1>
          <p className="text-lg text-gray-300">{story.explanation}</p>
        </div>
      ) : (
        <p className="text-lg text-red-500">Hasyakanika not found.</p>
      )}
    </div>
  );
};

export default HasyakanikaDetail;
