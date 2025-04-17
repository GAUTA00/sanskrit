import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Home = () => {
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
            className="text-center max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white font-khand">संस्कृतं वद आधुनिको भव
            </h1>
            <p className="text-2xl text-white mb-8 font-khand font-semibold">Speak Sanskrit and be modern</p>
          </motion.div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6 font-khand text-amber-800">Our Sanskrit Mission</h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-700">
            Sanskrit is not merely a language; it is the key to unlocking millennia of wisdom, spirituality, and cultural heritage.
            Our mission is to make this divine language accessible to all, preserving its timeless beauty while connecting it with modern hearts and minds.
            Through this journey of learning, we aim to create a bridge between ancient knowledge and contemporary understanding,
            allowing the profound insights of Sanskrit literature to illuminate our path forward.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto my-8"></div>
        </motion.div>
      </div>

      {/* Navigation Section */}
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
                <div className="text-center p-6 bg-white/70 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
                  <div className="text-4xl mb-4 text-amber-600 group-hover:text-amber-700">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 font-khand text-amber-800 group-hover:text-amber-900">{item.title}</h3>
                  <div className="w-12 h-0.5 bg-amber-300 mx-auto my-3 group-hover:w-16 transition-all duration-300"></div>
                  <p className="text-gray-600 font-khand">{item.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Quote */}
      <div className="container mx-auto px-4 py-16 text-center">
        <blockquote className="italic text-lg text-gray-700 max-w-2xl mx-auto font-khand">
          "भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती" <br />
          <span className="not-italic block mt-2 font-semibold">
            "Among languages, the sweet and divine speech of the gods (Sanskrit) is supreme."
          </span>
        </blockquote>
      </div>

      {/* Footer */}
      <footer className="bg-amber-900/10 mt-16 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:justify-center justify-between items-center">
            {/* <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-amber-800 mb-2">Sanskrit Learning</h3>
              <p className="text-gray-700">Preserving ancient wisdom for modern minds</p>
            </div> */}
            <div className="flex flex-col items-center md:items-center">
              <div className="flex space-x-4 mb-4 items-center">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-900 transition-colors">
                  <FaFacebook size={35} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-900 transition-colors">
                  <FaTwitter size={35} />
                </a>
                <a href="https://www.instagram.com/mission_sanskrit?igsh=MTE5MWZ5bzlyd2UxYQ==" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-900 transition-colors">
                  <FaInstagram size={35} />
                </a>
                <a href="https://youtube.com/channel/UCY0l-Wx0tEW8XOlpz7P6vyQ?si=6-KECPN9VHTK51CW" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-900 transition-colors">
                  <FaYoutube size={35} />
                </a>
                <a href="https://whatsapp.com/channel/0029Vb1AsmV9hXF5iupoGI3d" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-900 transition-colors">
                  <FaWhatsapp size={35} />
                </a>
                <Link to="/contact" className="text-amber-900 font-bold hover:text-amber-700 transition-colors underline ">
                  Contact Us
                </Link>
              </div>

            </div>
          </div>
          <div className="w-full h-px bg-amber-300/50 my-6"></div>
          <div className="text-center text-gray-700">
            <p>© {new Date().getFullYear()} Sanskrit Learning. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;