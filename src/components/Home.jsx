import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { collection, getDocs, query, orderBy, limit, getFirestore } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { firestore } from '../firebase/config';

// const db = getFirestore(getApp());

const Home = () => {
  const [currentPhrase, setCurrentPhrase] = useState({
    sanskrit: "संस्कृतं वद आधुनिको भव",
    english: "Speak Sanskrit and be modern"
  });
  const [phrases, setPhrases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch phrases from Firestore
  useEffect(() => {
    const fetchPhrases = async () => {
      try {
        const phrasesRef = collection(firestore, 'phrases');
        const q = query(phrasesRef, orderBy('createdAt', 'desc'), limit(3));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (fetched.length > 0) {
          setPhrases(fetched);
          setCurrentPhrase(fetched[0]);
        }
      } catch (err) {
        console.error("Error fetching phrases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhrases();
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (phrases.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = (prev + 1) % phrases.length;
        setCurrentPhrase(phrases[nextIndex]);
        return nextIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [phrases]);

  const goToPhrase = (i) => {
    setCurrentIndex(i);
    setCurrentPhrase(phrases[i]);
  };

  const goToPrevious = () => {
    const i = currentIndex === 0 ? phrases.length - 1 : currentIndex - 1;
    goToPhrase(i);
  };

  const goToNext = () => {
    const i = (currentIndex + 1) % phrases.length;
    goToPhrase(i);
  };

  return (
    <div className="min-h-screen bg-[#FFCC99] text-gray-800 font-khand">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605188076067-8f8bd035b0f0?q=80&w=1200')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl w-full relative"
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentIndex + "-sanskrit"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-6xl font-bold mb-4 text-white font-khand"
              >
                {loading ? "Loading..." : currentPhrase.sanskrit}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex + "-english"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl text-white mb-12 font-khand font-semibold"
              >
                {loading ? "..." : currentPhrase.english}
              </motion.p>
            </AnimatePresence>

            {phrases.length > 1 && (
              <>
                <button onClick={goToPrevious} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-colors md:left-[-50px]">
                  <FaChevronLeft />
                </button>
                <button onClick={goToNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-colors md:right-[-50px]">
                  <FaChevronRight />
                </button>
                <div className="flex justify-center mt-4 space-x-2">
                  {phrases.map((_, i) => (
                    <button key={i} onClick={() => goToPhrase(i)} className={`h-2 rounded-full transition-all ${currentIndex === i ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 font-khand text-amber-800">Our Sanskrit Mission</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Sanskrit is not merely a language; it is the key to unlocking millennia of wisdom, spirituality, and cultural heritage...
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto my-8"></div>
        </motion.div>
      </div>

      {/* Navigation Tiles */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {[
            { path: "/shlok", title: "Sarvam Shlok", desc: "Ancient verses that carry eternal wisdom", icon: "✨" },
            { path: "/mantra", title: "Mantra", desc: "Sacred sounds that resonate with the universe", icon: "🕉️" },
            { path: "/katha", title: "Katha", desc: "Stories that have guided generations", icon: "📜" },
            { path: "/geet", title: "Geet", desc: "Melodies that elevate the soul", icon: "🎵" },
            { path: "/hasyakanika", title: "Hasyakanika", desc: "Humor that transcends time", icon: "😊" },
          ].map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link to={item.path} className="block group">
                <div className="text-center p-6 bg-white/70 rounded-lg shadow-md hover:scale-105 transition-all">
                  <div className="text-4xl mb-4 text-amber-600">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-amber-800 mb-2">{item.title}</h3>
                  <div className="w-12 h-0.5 bg-amber-300 mx-auto my-3 group-hover:w-16 transition-all"></div>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-16 text-center">
        <blockquote className="italic text-lg text-gray-700 max-w-2xl mx-auto font-khand">
          "भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती" <br />
          <span className="not-italic block mt-2 font-semibold">
            "Among languages, the sweet and divine speech of the gods (Sanskrit) is supreme."
          </span>
        </blockquote>
      </div>

      <footer className="bg-amber-900/10 mt-16 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook size={30} className="text-amber-700 hover:text-amber-900" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter size={30} className="text-amber-700 hover:text-amber-900" /></a>
            <a href="https://www.instagram.com/mission_sanskrit" target="_blank" rel="noreferrer"><FaInstagram size={30} className="text-amber-700 hover:text-amber-900" /></a>
            <a href="https://youtube.com/channel/UCY0l-Wx0tEW8XOlpz7P6vyQ" target="_blank" rel="noreferrer"><FaYoutube size={30} className="text-amber-700 hover:text-amber-900" /></a>
            <a href="https://whatsapp.com/channel/0029Vb1AsmV9hXF5iupoGI3d" target="_blank" rel="noreferrer"><FaWhatsapp size={30} className="text-amber-700 hover:text-amber-900" /></a>
            <Link to="/contact" className="font-bold text-amber-900 underline hover:text-amber-700">Contact Us</Link>
          </div>
          <hr className="my-6 border-amber-300/50" />
          <p className="text-gray-700">© {new Date().getFullYear()} Sanskrit Learning. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
