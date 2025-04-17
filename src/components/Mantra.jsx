import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { firestore } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const Mantra = () => {
  const [mantras, setMantras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMantras = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "mantra"));
        const mantraList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMantras(mantraList);
      } catch (error) {
        console.error("Error fetching Mantra data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMantras();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Hero section */}
      <div className="bg-[#2F5D71] text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-khand mb-4">Sacred Mantras</h1>
            <p className="text-xl md:text-2xl font-khand text-[#E3DBC2]">
              Spiritual sounds that resonate with the universe
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content section */}
      <div className="container mx-auto max-w-6xl p-4 md:p-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-24 h-24">
              <div className="absolute top-0 w-full h-full border-4 border-[#E3DBC2] rounded-full animate-ping opacity-75"></div>
              <div className="w-full h-full border-4 border-t-[#F18056] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <p className="absolute inset-0 flex items-center justify-center font-khand text-[#2F5D71]">Loading</p>
            </div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6"
          >
            {mantras.length > 0 ? (
              mantras.map((mantra) => (
                <motion.div
                  key={mantra.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Link
                    to={`/mantra/${mantra.id}`}
                    className="block overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={mantra.imageData}
                        alt="Mantra"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2F5D71]/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-6">
                      <div className="w-12 h-1 bg-[#F18056] mb-4"></div>
                      <h2 className="text-xl font-bold text-[#2F5D71] mb-3 font-khand leading-relaxed">
                        {mantra.text}
                      </h2>
                      <p className="text-[#2F5D71]/70 font-khand line-clamp-3">
                        {mantra.explanation}
                      </p>
                      <div className="mt-4 pt-4 border-t border-[#E3DBC2]">
                        <span className="inline-block text-sm text-white bg-[#F18056] px-3 py-1 rounded-full font-khand">
                          Explore mantra
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center p-8 bg-white/50 rounded-lg"
              >
                <p className="text-xl text-[#2F5D71]/80 font-khand">No mantras available yet.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Mantra;