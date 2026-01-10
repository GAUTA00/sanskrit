import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { addContactDataToDatabase } from '../firebase/config';
import { FaPaperPlane, FaUser, FaEnvelope, FaCommentAlt } from 'react-icons/fa';

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
      await addContactDataToDatabase(formData);

      // Then send email via EmailJS
      await emailjs.sendForm(
        'service_leer61p',
        'template_h4ock4p',
        form.current,
        't2XGIb34pk9mS7fUC'
      );

      setSubmitStatus({ type: 'success', message: "Namaste! Your message has been sent successfully." });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus({ type: 'error', message: "There was an error sending your message. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side - Info */}
        <div className="bg-[#2F5D71] p-8 md:p-12 md:w-5/12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold font-khand mb-4">Get in Touch</h2>
            <p className="font-khand text-[#E3DBC2] mb-8 leading-relaxed">
              Have questions about Sanskrit, our content, or suggestions for improvement? We'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#F18056]/20 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-[#F18056]" />
                </div>
                <div>
                  <h3 className="font-bold font-khand text-lg">Email Us</h3>
                  <p className="font-khand text-white/80">contact@sanskrit-a.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#F18056] rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#E3DBC2] rounded-full opacity-10 blur-3xl"></div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 md:w-7/12">
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`mb-6 p-4 rounded-lg border-l-4 ${submitStatus.type === 'success'
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'bg-red-50 border-red-500 text-red-700'
                }`}
            >
              <p className="font-khand font-medium">{submitStatus.message}</p>
            </motion.div>
          )}

          <form ref={form} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-[#2F5D71] font-bold font-khand mb-2">Your Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-b-2 border-gray-200 focus:border-[#F18056] bg-gray-50 focus:bg-white transition-colors rounded-t-md outline-none font-khand text-[#2F5D71]"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[#2F5D71] font-bold font-khand mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-b-2 border-gray-200 focus:border-[#F18056] bg-gray-50 focus:bg-white transition-colors rounded-t-md outline-none font-khand text-[#2F5D71]"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-[#2F5D71] font-bold font-khand mb-2">Message</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FaCommentAlt className="text-gray-400 mt-1" />
                </div>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-b-2 border-gray-200 focus:border-[#F18056] bg-gray-50 focus:bg-white transition-colors rounded-t-md outline-none font-khand text-[#2F5D71] h-32 resize-none"
                  placeholder="How can we help you?"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-lg shadow-lg text-white font-bold font-khand tracking-wider uppercase transition-all transform hover:-translate-y-1 ${isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#F18056] hover:bg-[#F18056]/90 hover:shadow-xl'
                }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Send Message <FaPaperPlane className="ml-2" />
                </span>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;