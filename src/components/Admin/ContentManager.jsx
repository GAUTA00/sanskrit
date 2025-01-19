import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { ref, set, get, remove } from "firebase/database";

const ContentManager = () => {
  const [content, setContent] = useState({});
  const [editingKey, setEditingKey] = useState("");
  const [newValue, setNewValue] = useState("");

  // Fetch content
  const fetchContent = async () => {
    const contentRef = ref(db, "content/");
    const snapshot = await get(contentRef);
    if (snapshot.exists()) {
      setContent(snapshot.val());
    } else {
      setContent({});
    }
  };

  // Add or Update Content
  const saveContent = async () => {
    if (!editingKey || !newValue) return alert("Both key and value are required!");
    try {
      await set(ref(db, `content/${editingKey}`), newValue);
      alert("Content saved successfully!");
      fetchContent();
      setEditingKey("");
      setNewValue("");
    } catch (error) {
      alert("Failed to save content: " + error.message);
    }
  };

  // Delete Content
  const deleteContent = async (key) => {
    try {
      await remove(ref(db, `content/${key}`));
      alert("Content deleted successfully!");
      fetchContent();
    } catch (error) {
      alert("Failed to delete content: " + error.message);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Content Manager</h2>
      <div>
        <input
          type="text"
          placeholder="Key"
          value={editingKey}
          onChange={(e) => setEditingKey(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button onClick={saveContent} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold">Existing Content</h3>
        {Object.entries(content).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between border p-2 mb-2">
            <span className="font-bold">{key}:</span> <span>{value}</span>
            <button
              onClick={() => deleteContent(key)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManager;
