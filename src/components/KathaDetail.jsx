import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { firestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { FaArrowLeft, FaBookOpen } from "react-icons/fa";

const KathaDetail = () => {
  const { id } = useParams();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 w-full h-full border-4 border-[#E3DBC2] rounded-full animate-ping opacity-75"></div>
          <div className="w-full h-full border-4 border-t-[#F18056] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <p className="absolute inset-0 flex items-center justify-center font-khand text-[#2F5D71]">Loading</p>
        </div>
      </div>
    );
  }

  if (!katha) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="text-[#2F5D71] text-5xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-[#2F5D71] mb-3 font-khand">Katha Not Found</h2>
          <p className="text-[#2F5D71]/70 mb-6 font-khand">
            The requested story could not be found. It may have been removed or relocated.
          </p>
          <Link
            to="/katha"
            className="inline-flex items-center px-4 py-2 bg-[#F18056] text-white rounded-md font-khand hover:bg-[#F18056]/90 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to All Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Hero header with story image */}
      <div className="relative h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${katha.imageData})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2F5D71]/80 to-[#2F5D71]/90"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <FaBookOpen className="text-[#F18056] text-xl mr-2" />
              <span className="text-[#E3DBC2] uppercase tracking-wider text-sm font-khand">Sanskrit Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-khand leading-tight">
              {katha.text}
            </h1>
          </motion.div>
        </div>

        <Link
          to="/katha"
          className="absolute top-4 left-4 flex items-center px-3 py-2 bg-white/20 backdrop-blur-sm rounded-md text-white hover:bg-white/30 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span className="font-khand">Back</span>
        </Link>
      </div>

      {/* Content area */}
      <div className="container mx-auto max-w-4xl px-4 -mt-16 relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* Main image */}
          <div className="relative">
            <img
              src={katha.imageData}
              alt={katha.text}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-30"></div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="w-16 h-1 bg-[#F18056] mb-6"></div>

            {/* Story title */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-[#2F5D71] mb-6 font-khand leading-tight"
            >
              {katha.text}
            </motion.h2>

            {/* Story content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-lg text-[#2F5D71]/80 font-khand leading-relaxed whitespace-pre-line">
                {katha.explanation}
              </p>
            </motion.div>

            {/* Moral of the story (if available) */}
            {katha.moral && (
              <div className="mt-8 p-4 bg-[#E3DBC2]/30 rounded-lg">
                <h3 className="text-[#2F5D71] font-bold mb-2 font-khand">Moral of the Story</h3>
                <p className="text-[#2F5D71]/80 font-khand">{katha.moral}</p>
              </div>
            )}

            {/* Metadata */}
            <div className="mt-8 pt-6 border-t border-[#E3DBC2]">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#F18056]/10 text-[#F18056] rounded-full text-sm font-khand">
                  Sanskrit Katha
                </span>
                {katha.category && (
                  <span className="px-3 py-1 bg-[#E3DBC2] text-[#2F5D71] rounded-full text-sm font-khand">
                    {katha.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KathaDetail;