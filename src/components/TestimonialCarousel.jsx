import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
    {
        id: 1,
        name: "Arjun Sharma",
        role: "Student",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "Learning Sanskrit has opened my mind to a whole new world of ancient wisdom. The course structure made it easy to understand complex concepts.",
    },
    {
        id: 2,
        name: "Meera Patel",
        role: "Yoga Instructor",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "As a yoga instructor, understanding Sanskrit has deepened my practice immensely. I can now explain the true meaning behind mantras to my students.",
    },
    {
        id: 3,
        name: "Dr. Vikram Acharya",
        role: "Professor",
        image: "https://randomuser.me/api/portraits/men/68.jpg",
        text: "The resources provided here are exceptional. Sanskrit isn't just a language, it's a doorway to our cultural heritage and philosophical treasures.",
    },
    {
        id: 4,
        name: "Priya Krishnan",
        role: "Spiritual Seeker",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        text: "I've tried many platforms, but none have made Sanskrit as accessible as this one. The audio pronunciations and everyday phrases were particularly helpful.",
    },
    {
        id: 5,
        name: "Rahul Desai",
        role: "Software Engineer",
        image: "https://randomuser.me/api/portraits/men/92.jpg",
        text: "Even as someone working in tech, learning Sanskrit has been a refreshing journey. The logical structure of the language appeals to my analytical mind.",
    }
];

const TestimonialCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const visibleCount = isMobile ? 1 : 3;
    const maxIndex = testimonials.length - visibleCount;

    const nextSlide = () => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Auto-rotate every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    // Get visible testimonials
    const getVisibleTestimonials = () => {
        const visible = [];
        for (let i = 0; i < visibleCount; i++) {
            const index = (currentIndex + i) % testimonials.length;
            visible.push(testimonials[index]);
        }
        return visible;
    };

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <motion.div
                    className="flex gap-6"
                    animate={{ x: isMobile ? 0 : `-${currentIndex * (100 / visibleCount)}%` }}
                    transition={{ duration: 0.5 }}
                >
                    {isMobile ? (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="w-full px-2"
                            >
                                <SingleTestimonial testimonial={testimonials[currentIndex]} />
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        getVisibleTestimonials().map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                className="w-1/3 px-2 flex-shrink-0"
                            >
                                <SingleTestimonial testimonial={testimonial} />
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-amber-500 hover:bg-amber-600 p-3 rounded-full text-white transition-colors z-10 shadow-lg"
                aria-label="Previous testimonial"
            >
                <FaChevronLeft />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-amber-500 hover:bg-amber-600 p-3 rounded-full text-white transition-colors z-10 shadow-lg"
                aria-label="Next testimonial"
            >
                <FaChevronRight />
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i > testimonials.length - visibleCount ? testimonials.length - visibleCount : i)}
                        className={`h-2 rounded-full transition-all ${i >= currentIndex && i < currentIndex + visibleCount ? "w-8 bg-amber-500" : "w-2 bg-amber-300 hover:bg-amber-400"
                            }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const SingleTestimonial = ({ testimonial }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
            <div className="text-amber-500 mb-4">
                <FaQuoteLeft size={24} />
            </div>
            <p className="text-gray-700 font-khand flex-grow mb-6">
                "{testimonial.text}"
            </p>
            <div className="flex items-center mt-auto">
                <div className="ml-3">
                    <h4 className="font-bold text-amber-800 font-khand">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm font-khand">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCarousel;