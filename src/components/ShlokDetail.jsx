import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { firestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "./common/Loader";

const ShlokDetail = () => {
  const { id } = useParams();
  const [shlok, setShlok] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShlok = async () => {
      try {
        const docRef = doc(firestore, "shlok", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setShlok(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching shlok:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShlok();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  if (!shlok) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="text-[#2F5D71] text-5xl mb-4">📜</div>
          <h2 className="text-2xl font-bold text-[#2F5D71] mb-3 font-khand">Shlok Not Found</h2>
          <p className="text-[#2F5D71]/70 mb-6 font-khand">
            The requested verse could not be found. It may have been removed or relocated.
          </p>
          <Link
            to="/shlok"
            className="inline-flex items-center px-4 py-2 bg-[#F18056] text-white rounded-md font-khand hover:bg-[#F18056]/90 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to All Shlokas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Hero header with image background */}
      <div className="relative h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${shlok.imageData})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2F5D71]/80 to-[#2F5D71]/90"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <span className="text-[#E3DBC2] uppercase tracking-wider text-sm font-khand">Sanskrit Verse</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-khand leading-tight">
              {shlok.text && shlok.text.length > 60
                ? shlok.text.substring(0, 60) + "..."
                : shlok.text}
            </h1>
          </motion.div>
        </div>

        <Link
          to="/shlok"
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
              src={shlok.imageData}
              alt={shlok.text}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-30"></div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="w-16 h-1 bg-secondary mb-6"></div>

            {/* Full shlok text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <div className="p-6 bg-accent/20 rounded-lg border-l-4 border-secondary">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 font-khand leading-relaxed text-center">
                  {shlok.text}
                </h2>
                {shlok.translation && (
                  <p className="text-lg text-primary/80 italic text-center border-t border-accent pt-4 mt-2">
                    "{shlok.translation}"
                  </p>
                )}
              </div>
            </motion.div>

            {/* Purport / Explanation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="prose prose-lg max-w-none text-primary/80 font-khand"
            >
              <h3 className="text-xl font-bold text-primary mb-4 font-khand">Purport</h3>
              <div className="whitespace-pre-line leading-relaxed">
                {shlok.explanation}
              </div>
            </motion.div>

            {/* Additional interpretation (if available) */}
            {shlok.interpretation && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-primary mb-4 font-khand">Interpretation</h3>
                <p className="text-lg text-primary/80 font-khand leading-relaxed whitespace-pre-line">
                  {shlok.interpretation}
                </p>
              </div>
            )}

            {/* Source (if available) - checking both 'source' and 'reference' fields */}
            {(shlok.source || shlok.reference) && (
              <div className="mt-8 p-4 bg-accent/30 rounded-lg">
                <h3 className="text-primary font-bold mb-2 font-khand">Source</h3>
                <p className="text-primary/80 font-khand">{shlok.source || shlok.reference}</p>
              </div>
            )}

            {/* Category tags */}
            <div className="mt-8 pt-6 border-t border-accent">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-khand">
                  Sanskrit Shlok
                </span>
                {shlok.category && (
                  <span className="px-3 py-1 bg-accent text-primary rounded-full text-sm font-khand">
                    {shlok.category}
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

export default ShlokDetail;