import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { firestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { FaArrowLeft } from "react-icons/fa";

const WordSentenceDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const docRef = doc(firestore, "sentencewords", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
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

    if (!data) {
        return (
            <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
                    <div className="text-[#F18056] text-5xl mb-4">🔎</div>
                    <h2 className="text-2xl font-bold text-[#2F5D71] mb-3 font-khand">Content Not Found</h2>
                    <p className="text-[#2F5D71]/70 mb-6 font-khand">
                        The requested word or phrase could not be found. It may have been removed or relocated.
                    </p>
                    <Link
                        to="/sentencewords"
                        className="inline-flex items-center px-4 py-2 bg-[#F18056] text-white rounded-md font-khand hover:bg-[#F18056]/90 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Words & Phrases
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F7F7]">
            {/* Hero header with image background */}
            <div className="relative h-72 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${data.imageData})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#2F5D71]/80 to-[#2F5D71]/95"></div>

                <Link
                    to="/sentencewords"
                    className="absolute top-4 left-4 z-10 flex items-center px-3 py-2 bg-white/20 backdrop-blur-sm rounded-md text-white hover:bg-white/30 transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    <span className="font-khand">Back</span>
                </Link>
            </div>

            {/* Main content */}
            <div className="container mx-auto max-w-4xl px-4 -mt-24 relative z-10 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={data.imageData}
                            alt={data.text}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/placeholder.png";
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                        <div className="w-16 h-1 bg-[#F18056] mb-6"></div>

                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-3xl md:text-4xl font-bold text-[#2F5D71] mb-4 font-khand leading-tight"
                        >
                            {data.text}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="prose prose-lg max-w-none mb-6"
                        >
                            <p className="text-lg text-[#2F5D71]/80 font-khand leading-relaxed whitespace-pre-line">
                                {data.explanation}
                            </p>
                        </motion.div>

                        {/* Pronunciation section (if available) */}
                        {data.pronunciation && (
                            <div className="mt-8 p-4 bg-[#E3DBC2]/30 rounded-lg">
                                <h3 className="text-[#2F5D71] font-bold mb-2 font-khand">Pronunciation</h3>
                                <p className="text-[#2F5D71]/80 font-khand">{data.pronunciation}</p>
                            </div>
                        )}

                        {/* Usage examples section (if available) */}
                        {data.examples && data.examples.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-[#2F5D71] font-bold mb-4 font-khand">Examples</h3>
                                <div className="space-y-4">
                                    {data.examples.map((example, index) => (
                                        <div
                                            key={index}
                                            className="p-4 border-l-4 border-[#F18056] bg-[#F7F7F7] rounded-r-md"
                                        >
                                            <p className="font-khand text-[#2F5D71]">{example}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Category tags */}
                        <div className="mt-8 pt-6 border-t border-[#E3DBC2]">
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-[#F18056]/10 text-[#F18056] rounded-full text-sm font-khand">
                                    Sanskrit
                                </span>
                                <span className="px-3 py-1 bg-[#E3DBC2] text-[#2F5D71] rounded-full text-sm font-khand">
                                    {data.type || "Phrase"}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default WordSentenceDetail;