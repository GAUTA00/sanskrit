import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { firestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const WordSentenceDetail = () => {
    const { id } = useParams(); // get ID from URL
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

    if (loading) return <p className="text-center text-white">Loading...</p>;

    if (!data) return <p className="text-center text-red-400">Data not found!</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-8">
            <div className="max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6 w-full">
                <img
                    src={data.imageData}
                    alt="Detail"
                    className="w-full h-64 object-cover rounded mb-6"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.png";
                    }}
                />
                <h2 className="text-3xl font-bold font-khand mb-4">{data.text}</h2>
                <p className="text-lg font-khand text-gray-300">{data.explanation}</p>

            </div>
        </div>
    );
};

export default WordSentenceDetail;
