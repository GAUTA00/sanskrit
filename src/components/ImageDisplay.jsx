import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Ensure firestore import
import { firestore } from "../firebase/config"; // Assuming firestore is correctly initialized in firebase/config

const ImageDisplay = ({ path }) => {
  const [imageData, setImageData] = useState(null);
  const [text, setText] = useState("");
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        // Reference to the dynamic path where the document is stored
        const docRef = doc(firestore, "images", path);

        // Fetch the document from Firestore
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Extract data from the document snapshot and set it to state
          const data = docSnap.data();
          setImageData(data.imageData);
          setText(data.text);
          setExplanation(data.explanation);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (path) {
      fetchImageData();
    }
  }, [path]);

  return (
    <div className="image-display-container max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10">
      {imageData ? (
        <>
          <img src={imageData} alt="Uploaded" className="w-full h-auto rounded-md" />
          <h3 className="mt-4 text-lg font-bold">{text}</h3>
          <p className="mt-2 text-gray-700">{explanation}</p>
        </>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ImageDisplay;
