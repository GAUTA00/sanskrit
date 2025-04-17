import React, { useState } from "react";
import { motion } from "framer-motion";
import { firestore } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { FaCloudUploadAlt, FaImage } from "react-icons/fa";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center text-[#2F5D71] mb-6 font-khand">
        Upload Image and Description
      </h2>

      <div className="space-y-6">
        {/* Image preview area */}
        <div className="mb-4">
          <div
            onClick={() => document.getElementById('fileInput').click()}
            className={`w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${image ? 'border-[#F18056]/50' : 'border-[#E3DBC2] hover:border-[#F18056]/30'
              }`}
          >
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="h-full object-contain"
              />
            ) : (
              <div className="text-center p-4">
                <FaImage className="mx-auto text-4xl text-[#E3DBC2]" />
                <p className="mt-2 text-[#2F5D71]/70 font-khand">
                  Click to select an image
                </p>
              </div>
            )}
          </div>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        {/* Text input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[#2F5D71] mb-1 font-khand">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter Title Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="block w-full p-3 bg-white border border-[#E3DBC2] rounded-md focus:ring-2 focus:ring-[#F18056]/50 focus:border-transparent transition-all focus:outline-none font-khand"
          />
        </div>

        {/* Explanation textarea */}
        <div>
          <label htmlFor="explanation" className="block text-sm font-medium text-[#2F5D71] mb-1 font-khand">Explanation</label>
          <textarea
            id="explanation"
            placeholder="Enter explanation Text"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            rows="4"
            className="block w-full p-3 bg-white border border-[#E3DBC2] rounded-md focus:ring-2 focus:ring-[#F18056]/50 focus:border-transparent transition-all focus:outline-none font-khand"
          />
        </div>

        {/* Category dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-[#2F5D71] mb-1 font-khand">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full p-3 bg-white border border-[#E3DBC2] rounded-md focus:ring-2 focus:ring-[#F18056]/50 focus:border-transparent transition-all focus:outline-none font-khand"
          >
            <option value="">Select Category</option>
            <option value="shlok">Shlok</option>
            <option value="mantra">Mantra</option>
            <option value="katha">Katha</option>
            <option value="geet">Geet</option>
            <option value="hasyakanika">Hasyakanika</option>
            <option value="sentencewords">Sentence Words</option>
          </select>
        </div>

        {/* Upload button */}
        <motion.button
          onClick={handleUpload}
          disabled={uploading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full p-3 text-white rounded-md transition-all flex items-center justify-center font-khand text-lg ${uploading ? 'bg-[#2F5D71]/50 cursor-not-allowed' : 'bg-[#F18056] hover:bg-[#F18056]/90 shadow-md'
            }`}
        >
          <FaCloudUploadAlt className="mr-2" />
          {uploading ? "Uploading..." : "Upload"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ImageUploader;