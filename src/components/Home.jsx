import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { collection, getDocs, query, orderBy, limit, getFirestore } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { firestore } from '../firebase/config';
import TestimonialCarousel from './TestimonialCarousel'; // Assuming you have a TestimonialCarousel component
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
    <div className="min-h-screen bg-background text-gray-800 font-khand">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605188076067-8f8bd035b0f0?q=80&w=1200')" }}>
        <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
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
                className="text-2xl text-accent mb-12 font-khand font-semibold"
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
          <h2 className="text-3xl font-bold mb-6 font-khand text-primary">Our Sanskrit Mission</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Sanskrit is not merely a language; it is the key to unlocking millennia of wisdom, spirituality, and cultural heritage...
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto my-8"></div>
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
            { path: "/sentenceandwords", title: "Shabd Sagar", desc: "Essential words for daily use", icon: "🗣️" },
          ].map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link to={item.path} className="block group">
                <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all border border-accent/20">
                  <div className="text-4xl mb-4 text-secondary">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-primary mb-2">{item.title}</h3>
                  <div className="w-12 h-0.5 bg-accent mx-auto my-3 group-hover:w-16 transition-all"></div>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-primary/5 py-16 mt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-khand text-primary">What Our Students Say</h2>
            <div className="w-24 h-1 bg-secondary mx-auto my-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Discover how Sanskrit learning has transformed the lives of our community members
            </p>
          </motion.div>

          <TestimonialCarousel />
        </div>
      </div>

      {/* Quote Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <blockquote className="italic text-lg text-primary max-w-2xl mx-auto font-khand">
          "भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती" <br />
          <span className="not-italic block mt-2 font-semibold">
            "Among languages, the sweet and divine speech of the gods (Sanskrit) is supreme."
          </span>
        </blockquote>
      </div>

      {/* Footer is now global in App.jsx, but if this Home specific footer is desired, we can keep or remove. 
          Given I added a global Footer, I will remove standard footer links here to avoid duplication. */}
    </div>
  );
};

export default Home;
