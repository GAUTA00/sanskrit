import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/config"; // Firestore configuration
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const SentecesAndWords = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWordsAndSentences = async () => {
            try {
                const ref = collection(firestore, "sentencewords");
                const snapshot = await getDocs(ref);
                const list = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItems(list);
            } catch (error) {
                console.error("Error fetching sentence words:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWordsAndSentences();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-8">Sentence & Word</h1>
                {loading ? (
                    <p className="text-center text-gray-300">Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <Link
                                to={`/sentencewords/${item.id}`}
                                key={item.id}
                                className="block border border-gray-700 p-4 rounded shadow-lg bg-gray-800 hover:bg-gray-700 transition"
                            >
                                <img
                                    src={item.imageData}
                                    alt={item.text}
                                    className="w-full h-48 object-cover mb-4 rounded"
                                />
                                <h2 className="text-xl font-khand font-semibold mb-2">{item.text}</h2>
                                <p className="text-gray-300 font-khand">{item.explanation}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SentecesAndWords;
