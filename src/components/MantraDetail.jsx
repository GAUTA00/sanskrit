import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { firestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { FaArrowLeft, FaMusic } from "react-icons/fa";
import Loader from "./common/Loader";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  if (!mantra) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="text-[#2F5D71] text-5xl mb-4">🕉️</div>
          <h2 className="text-2xl font-bold text-[#2F5D71] mb-3 font-khand">Mantra Not Found</h2>
          <p className="text-[#2F5D71]/70 mb-6 font-khand">
            The requested mantra could not be found. It may have been removed or relocated.
          </p>
          <Link
            to="/mantra"
            className="inline-flex items-center px-4 py-2 bg-[#F18056] text-white rounded-md font-khand hover:bg-[#F18056]/90 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Mantras
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Hero header with mantra image */}
      <div className="relative h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mantra.imageData})` }}
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
              <span className="text-[#E3DBC2] uppercase tracking-wider text-sm font-khand">Sacred Mantra</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-khand leading-tight">
              {mantra.text}
            </h1>
          </motion.div>
        </div>

        <Link
          to="/mantra"
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
              src={mantra.imageData}
              alt={mantra.text}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-30"></div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="w-16 h-1 bg-secondary mb-6"></div>

            {/* Mantra text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 font-khand leading-tight">
                {mantra.text}
              </h2>
              {mantra.translation && (
                <p className="text-xl text-primary/80 italic text-center font-mukta text-secondary">
                  "{mantra.translation}"
                </p>
              )}
            </motion.div>

            {/* Explanation / Purport */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="prose prose-lg max-w-none text-primary/80 font-khand"
            >
              <h3 className="text-xl font-bold text-primary mb-4 font-khand border-l-4 border-secondary pl-3">Purport</h3>
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {mantra.explanation}
              </p>
            </motion.div>

            {/* Benefits section (if available) */}
            {mantra.benefits && (
              <div className="mt-8 p-6 bg-accent/20 rounded-xl border border-accent/50">
                <h3 className="text-primary font-bold mb-3 font-khand flex items-center">
                  Benefits
                </h3>
                <p className="text-primary/90 font-khand leading-relaxed">{mantra.benefits}</p>
              </div>
            )}

            {/* How to chant section (if available) */}
            {mantra.howToChant && (
              <div className="mt-6 p-6 bg-secondary/5 rounded-xl border-l-4 border-secondary">
                <h3 className="text-primary font-bold mb-2 font-khand">How to Chant</h3>
                <p className="text-primary/80 font-khand">{mantra.howToChant}</p>
              </div>
            )}

            {/* Audio player (if available) */}
            {mantra.audioUrl && (
              <div className="mt-8 p-4 bg-accent/30 rounded-lg">
                <h3 className="text-primary font-bold mb-2 font-khand">Listen to the Chant</h3>
                <audio controls className="w-full rounded-md shadow-sm">
                  <source src={mantra.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {/* Metadata */}
            <div className="mt-8 pt-6 border-t border-accent">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-khand">
                  Sacred Mantra
                </span>
                {mantra.category && (
                  <span className="px-3 py-1 bg-accent text-primary rounded-full text-sm font-khand">
                    {mantra.category}
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

export default MantraDetail;