import React, { useState } from "react";
import { firestore } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!image || !text || !explanation || !category) {
      alert("Please fill in all fields and select an image!");
      return;
    }

    try {
      setUploading(true);
      const collectionRef = collection(firestore, category);

      const docRef = await addDoc(collectionRef, {
        imageData: image,
        text,
        explanation,
        timestamp: new Date(),
      });

      console.log(`Document added in '${category}' with ID: ${docRef.id}`);
      alert("Upload successful!");

      // Reset form
      setImage(null);
      setText("");
      setExplanation("");
      setCategory("");
    } catch (error) {
      console.error("Error uploading image to Firestore: ", error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-40">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Upload Image and Description
      </h2>

      <div>
        {/* File input */}
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full p-3 mb-4 bg-white border border-gray-300 rounded-md"
        />

        {/* Text input */}
        <input
          type="text"
          placeholder="Enter Title Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="block w-full p-3 mb-4 bg-white border border-gray-300 rounded-md"
        />

        {/* Explanation textarea */}
        <textarea
          placeholder="Enter explanation Text"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className="block w-full p-3 mb-4 bg-white border border-gray-300 rounded-md"
        />

        {/* Category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full p-3 mb-6 bg-white border border-gray-300 rounded-md"
        >
          <option value="">Select Category</option>
          <option value="shlok">Shlok</option>
          <option value="mantra">Mantra</option>
          <option value="katha">Katha</option>
          <option value="geet">Geet</option>
          <option value="hasyakanika">Hasyakanika</option>
          <option value="sentencewords">Sentence Words</option>
        </select>

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full p-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
