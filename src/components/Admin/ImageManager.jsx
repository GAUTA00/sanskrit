import React, { useState } from "react";
import { firestore } from "../../firebase/config"; // Firebase configuration
import { doc, setDoc } from "firebase/firestore"; // Use setDoc to define path directly

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [path, setPath] = useState(""); // The dynamic path, e.g., 'shlok/1'
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Convert to base64 string
      };
      reader.readAsDataURL(file); // Read file as a data URL
    }
  };

  const handleUpload = async () => {
    if (!image || !text || !explanation || !path) {
      alert("Please fill in all fields and select an image!");
      return;
    }

    try {
      setUploading(true);

      // Document reference for a dynamic path like 'shlok/1'
      const docRef = doc(firestore, "images", path);  // Use path as the document ID

      // Save the image, text, and explanation under the specific path
      await setDoc(docRef, {
        imageData: image,
        text: text,
        explanation: explanation,
        timestamp: new Date(),
      });

      console.log("Document successfully written to:", docRef.id);
      alert("Image successfully uploaded to Firestore!");
    } catch (error) {
      console.error("Error uploading image to Firestore: ", error);
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

        {/* Path input (e.g., shlok/1) */}
        <input
          type="text"
          placeholder="Enter Path (e.g., 'shlok/1')"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className="block w-full p-3 mb-6 bg-white border border-gray-300 rounded-md"
        />

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
