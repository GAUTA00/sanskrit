// Admin component to add new phrases
import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../firebase/config';

const AddPhrase = () => {
  const [phrase, setPhrase] = useState({ sanskrit: '', english: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setPhrase({
      ...phrase,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      await addDoc(collection(firestore, 'phrases'), {
        sanskrit: phrase.sanskrit,
        english: phrase.english,
        createdAt: serverTimestamp(),
        active: true
      });

      setStatus('Phrase added successfully!');
      setPhrase({ sanskrit: '', english: '' });
    } catch (error) {
      console.error('Error adding phrase:', error);
      setStatus('Failed to add phrase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-amber-800">Add Daily Phrase</h2>

      {status && (
        <div className={`p-3 mb-4 rounded ${status.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="sanskrit" className="block text-gray-700 font-medium mb-2">
            Sanskrit Phrase
          </label>
          <input
            type="text"
            id="sanskrit"
            name="sanskrit"
            value={phrase.sanskrit}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="english" className="block text-gray-700 font-medium mb-2">
            English Translation
          </label>
          <input
            type="text"
            id="english"
            name="english"
            value={phrase.english}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 transition-colors disabled:bg-gray-300"
        >
          {loading ? 'Adding...' : 'Add Phrase'}
        </button>
      </form>
    </div>
  );
};


export default AddPhrase;
