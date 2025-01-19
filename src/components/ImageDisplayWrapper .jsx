import React from "react";
import { useParams } from "react-router-dom";
import ImageDisplay from "./ImageDisplay.jsx"; // Path to the ImageDisplay component

const ImageDisplayWrapper = () => {
  const { id } = useParams();  // Use URL parameter to get the dynamic path (e.g., 1, 2, etc.)
  
  // Here, "shlok/1" is the path that will be passed dynamically to ImageDisplay
  const path = `shlok/${id}`;

  return (
    <div className="image-display-container">
      <h1 className="text-center text-xl mb-6">Displaying Image for: {path}</h1>
      <ImageDisplay path={path} />
    </div>
  );
};

export default ImageDisplayWrapper;
