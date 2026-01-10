import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { FaEdit, FaTrash, FaPlus, FaCloudUploadAlt, FaImage } from 'react-icons/fa';
import Button from '../common/Button';
import Input from '../common/Input';
import Card, { CardContent } from '../common/Card';
import Loader from '../common/Loader';

const ManageShlok = () => {
    const [shlokas, setShlokas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentShlok, setCurrentShlok] = useState(null); // If null, we are adding. If set, we are editing.

    // Form State
    const [formData, setFormData] = useState({
        text: '',
        explanation: '',
        imageData: null
    });

    const collectionRef = collection(firestore, 'shlok');

    useEffect(() => {
        fetchShlokas();
    }, []);

    const fetchShlokas = async () => {
        try {
            const snapshot = await getDocs(collectionRef);
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setShlokas(list);
        } catch (error) {
            console.error("Error fetching shlokas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageData: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (currentShlok) {
                // Update
                const docRef = doc(firestore, 'shlok', currentShlok.id);
                await updateDoc(docRef, {
                    text: formData.text,
                    explanation: formData.explanation,
                    imageData: formData.imageData, // Update image only if changed? Logic below handles it
                    // timestamp: serverTimestamp() // Optional: update timestamp
                });
            } else {
                // Create
                await addDoc(collectionRef, {
                    text: formData.text,
                    explanation: formData.explanation,
                    imageData: formData.imageData,
                    timestamp: serverTimestamp()
                });
            }
            setIsModalOpen(false);
            resetForm();
            fetchShlokas();
        } catch (error) {
            console.error("Error saving shlok:", error);
            alert("Failed to save. Check console.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Shlok?")) {
            try {
                await deleteDoc(doc(firestore, 'shlok', id));
                fetchShlokas();
            } catch (error) {
                console.error("Error deleting shlok:", error);
            }
        }
    };

    const openEditModal = (shlok) => {
        setCurrentShlok(shlok);
        setFormData({
            text: shlok.text,
            explanation: shlok.explanation,
            imageData: shlok.imageData
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setCurrentShlok(null);
        setFormData({ text: '', explanation: '', imageData: null });
    };

    if (loading && !isModalOpen) return <div className="flex justify-center mt-10"><Loader /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-khand font-bold text-primary">Manage Shlokas</h2>
                <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
                    <FaPlus className="mr-2" /> Add Shlok
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shlokas.map(shlok => (
                    <Card key={shlok.id} className="relative group">
                        <div className="h-48 overflow-hidden bg-gray-100">
                            {shlok.imageData ? (
                                <img src={shlok.imageData} alt={shlok.text} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400"><FaImage size={40} /></div>
                            )}
                        </div>
                        <CardContent>
                            <h3 className="text-xl font-bold text-primary font-khand mb-2 truncate">{shlok.text}</h3>
                            <p className="text-gray-600 text-sm font-khand line-clamp-3 mb-4">{shlok.explanation}</p>

                            <div className="flex space-x-2 mt-auto">
                                <Button variant="outline" className="text-sm px-3 py-1" onClick={() => openEditModal(shlok)}>
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" className="text-sm px-3 py-1" onClick={() => handleDelete(shlok.id)}>
                                    <FaTrash />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-2xl font-khand font-bold text-primary mb-6">
                                {currentShlok ? 'Edit Shlok' : 'Add New Shlok'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Image Upload */}
                                <div
                                    onClick={() => document.getElementById('shlokImageInput').click()}
                                    className={`w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${formData.imageData ? 'border-secondary/50' : 'border-gray-300 hover:border-secondary'}`}
                                >
                                    {formData.imageData ? (
                                        <img src={formData.imageData} alt="Preview" className="h-full object-contain" />
                                    ) : (
                                        <>
                                            <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                                            <p className="text-gray-500 font-khand">Click to upload image</p>
                                        </>
                                    )}
                                </div>
                                <input
                                    id="shlokImageInput"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />

                                <Input
                                    label="Shlok Text"
                                    value={formData.text}
                                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                    placeholder="Enter the Sanskrit Shlok"
                                    required
                                />

                                <Input
                                    label="Explanation"
                                    rows={4}
                                    value={formData.explanation}
                                    onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                                    placeholder="Enter the meaning/explanation"
                                    required
                                />

                                <div className="flex space-x-4 pt-4">
                                    <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="flex-1">
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="primary" className="flex-1" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Shlok'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageShlok;
