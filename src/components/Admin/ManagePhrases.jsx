import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { FaEdit, FaTrash, FaPlus, FaQuoteLeft } from 'react-icons/fa';
import Button from '../common/Button';
import Input from '../common/Input';
import Card, { CardContent } from '../common/Card';
import Loader from '../common/Loader';

const ManagePhrases = () => {
    const [phrases, setPhrases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPhrase, setCurrentPhrase] = useState(null);

    const [formData, setFormData] = useState({
        sanskrit: '',
        english: ''
    });

    const collectionRef = collection(firestore, 'phrases');

    useEffect(() => {
        fetchPhrases();
    }, []);

    const fetchPhrases = async () => {
        try {
            const q = query(collectionRef, orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPhrases(list);
        } catch (error) {
            console.error("Error fetching phrases:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (currentPhrase) {
                const docRef = doc(firestore, 'phrases', currentPhrase.id);
                await updateDoc(docRef, {
                    sanskrit: formData.sanskrit,
                    english: formData.english,
                });
            } else {
                await addDoc(collectionRef, {
                    sanskrit: formData.sanskrit,
                    english: formData.english,
                    createdAt: serverTimestamp(),
                    active: true
                });
            }
            setIsModalOpen(false);
            resetForm();
            fetchPhrases();
        } catch (error) {
            console.error("Error saving phrase:", error);
            alert("Failed to save. Check console.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Phrase?")) {
            try {
                await deleteDoc(doc(firestore, 'phrases', id));
                fetchPhrases();
            } catch (error) {
                console.error("Error deleting phrase:", error);
            }
        }
    };

    const openEditModal = (phrase) => {
        setCurrentPhrase(phrase);
        setFormData({
            sanskrit: phrase.sanskrit,
            english: phrase.english
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setCurrentPhrase(null);
        setFormData({ sanskrit: '', english: '' });
    };

    if (loading && !isModalOpen) return <div className="flex justify-center mt-10"><Loader /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-khand font-bold text-primary">Manage Daily Phrases</h2>
                <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
                    <FaPlus className="mr-2" /> Add Phrase
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {phrases.map(phrase => (
                    <Card key={phrase.id} className="relative group hover:shadow-lg transition-shadow">
                        <CardContent className="flex flex-col h-full p-6">
                            <FaQuoteLeft className="text-4xl text-accent/30 mb-4" />
                            <h3 className="text-2xl font-bold text-primary font-khand mb-3">{phrase.sanskrit}</h3>
                            <p className="text-gray-600 font-khand text-lg mb-6 flex-grow italic">"{phrase.english}"</p>

                            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
                                <Button variant="outline" className="text-sm px-3 py-1" onClick={() => openEditModal(phrase)}>
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" className="text-sm px-3 py-1" onClick={() => handleDelete(phrase.id)}>
                                    <FaTrash />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {phrases.length === 0 && !loading && (
                    <div className="col-span-full text-center text-gray-500 py-10 font-khand text-xl bg-white rounded-lg border border-dashed border-gray-300">
                        No phrases added yet. Add one to display on the Home page.
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                        <div className="p-6">
                            <h3 className="text-2xl font-khand font-bold text-primary mb-6">
                                {currentPhrase ? 'Edit Phrase' : 'Add New Phrase'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label="Sanskrit Phrase"
                                    value={formData.sanskrit}
                                    onChange={(e) => setFormData({ ...formData, sanskrit: e.target.value })}
                                    placeholder="e.g. संस्कृतं वद आधुनिको भव"
                                    required
                                />

                                <Input
                                    label="English Translation"
                                    rows={3}
                                    value={formData.english}
                                    onChange={(e) => setFormData({ ...formData, english: e.target.value })}
                                    placeholder="e.g. Speak Sanskrit and be modern"
                                    required
                                />

                                <div className="flex space-x-4 pt-4">
                                    <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="flex-1">
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="primary" className="flex-1" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Phrase'}
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

export default ManagePhrases;
