import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { addContactDataToDatabase } from '../firebase/config';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      // First save to Firebase
      const response = await addContactDataToDatabase(formData);

      // Then send email via EmailJS
      await emailjs.sendForm(
        'service_leer61p', // Replace with your EmailJS service ID
        'template_h4ock4p', // Replace with your EmailJS template ID
        form.current,
        't2XGIb34pk9mS7fUC' // Replace with your EmailJS public key
      );

      setSubmitStatus("Thank you! Your message has been sent successfully.");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("There was an error sending your message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl text-center font-semibold text-amber-800 mb-6">Contact Us</h2>
      {submitStatus && (
        <p className={`text-center font-medium p-3 rounded-md mb-4 ${submitStatus.includes("error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}>
          {submitStatus}
        </p>
      )}
      <form ref={form} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-600 font-semibold mb-2">Message</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 h-32"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-500 text-white py-2 rounded-md font-semibold hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;