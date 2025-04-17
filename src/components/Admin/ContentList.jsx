// New component: ContentList.jsx
import { useState, useEffect } from "react";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/config";

const ContentList = () => {
    const [selectedCategory, setSelectedCategory] = useState("shlok");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        fetchItems(selectedCategory);
    }, [selectedCategory]);

    const fetchItems = async (category) => {
        setLoading(true);
        try {
            const q = query(collection(firestore, category));
            const snapshot = await getDocs(q);
            const itemsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setItems(itemsList);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;

        try {
            await deleteDoc(doc(firestore, selectedCategory, itemToDelete));
            setItems(items.filter(item => item.id !== itemToDelete));
            setShowDeleteModal(false);
            setItemToDelete(null);
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-[#2F5D71] font-khand mb-6">Manage Content</h2>

            {/* Category selector */}
            <div className="flex overflow-x-auto mb-6 pb-2">
                {["shlok", "mantra", "katha", "geet", "sentencewords"].map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 mx-1 rounded-full whitespace-nowrap ${selectedCategory === category
                                ? "bg-[#F18056] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            } font-khand transition-colors`}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content list */}
            {loading ? (
                <div className="flex justify-center p-10">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {items.map(item => (
                        <div key={item.id} className="border rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-[#2F5D71] truncate max-w-md">
                                    {item.text || "No title"}
                                </h3>
                                {item.explanation && (
                                    <p className="text-gray-500 truncate max-w-lg mt-1">
                                        {item.explanation.substring(0, 100)}...
                                    </p>
                                )}
                            </div>
                            <div className="flex space-x-2">
                                <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setItemToDelete(item.id);
                                        setShowDeleteModal(true);
                                    }}
                                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="text-center p-10 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">No items found in this category.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Delete confirmation modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                        <p className="mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 border rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentList;