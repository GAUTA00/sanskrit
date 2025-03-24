import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const Hasyakanika = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHasyakanikas = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "hasyakanika"));
        const storyList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStories(storyList);
      } catch (error) {
        console.error("Error fetching Hasyakanika:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHasyakanikas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-center mb-8">હાસ્યકાનિકા</h1>

      {loading ? (
        <p className="text-lg text-gray-400">Loading Hasyakanika...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-11/12 max-w-screen-lg">
          {stories.length > 0 ? (
            stories.map((story) => (
              <Link
                to={`/hasyakanika/${story.id}`}
                key={story.id}
                className="border border-gray-700 p-4 rounded shadow-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                <img
                  src={story.imageData}
                  alt="Hasyakanika"
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-semibold mb-2">{story.text}</h2>
                <p className="text-gray-300">{story.explanation.slice(0, 100)}...</p>
              </Link>
            ))
          ) : (
            <p className="text-lg text-gray-400">No Hasyakanikas available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Hasyakanika;
