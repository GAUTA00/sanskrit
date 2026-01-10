import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { firestore } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import Card, { CardContent, CardImage } from "./common/Card";
import Loader from "./common/Loader";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <div className="bg-primary text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-khand mb-4">भक्ति गीत</h1>
            <p className="text-xl md:text-2xl font-khand text-accent">
              Sacred melodies that elevate the soul
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content section */}
      <div className="container mx-auto max-w-6xl p-4 md:p-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader size="large" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6"
          >
            {geets.length > 0 ? (
              geets.map((geet) => (
                <motion.div key={geet.id} variants={itemVariants}>
                  <Link to={`/geet/${geet.id}`}>
                    <Card className="h-full flex flex-col">
                      <CardImage src={geet.imageData} alt="Geet" />
                      <CardContent className="flex flex-col flex-grow">
                        <div className="w-12 h-1 bg-secondary mb-4"></div>
                        <h2 className="text-xl font-bold text-primary mb-3 font-khand leading-relaxed">
                          {geet.text}
                        </h2>
                        <p className="text-primary/70 font-khand line-clamp-3 mb-4 flex-grow">
                          {geet.explanation}
                        </p>
                        <div className="mt-auto pt-4 border-t border-accent">
                          <span className="inline-block text-sm text-white bg-secondary px-3 py-1 rounded-full font-khand">
                            Listen & Read
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center p-8 bg-white/50 rounded-lg"
              >
                <p className="text-xl text-primary/80 font-khand">No Geet content available yet.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Geet;