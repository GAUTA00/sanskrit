import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-10 pb-6 border-t-4 border-secondary">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-khand font-bold mb-4">Sanskrit<span className="text-secondary">Mission</span></h3>
                        <p className="font-khand text-accent/80 leading-relaxed mb-4">
                            Preserving and promoting the ancient wisdom of Sanskrit literature for the modern world.
                            Join us in this journey of enlightenment.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <h4 className="text-xl font-khand font-bold mb-4 text-accent">Quick Links</h4>
                        <div className="flex flex-col space-y-2 font-khand">
                            <Link to="/shlok" className="hover:text-secondary transition-colors">Shlokas</Link>
                            <Link to="/mantra" className="hover:text-secondary transition-colors">Mantras</Link>
                            <Link to="/katha" className="hover:text-secondary transition-colors">Kathas</Link>
                            <Link to="/contact" className="hover:text-secondary transition-colors">Contact Us</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-khand font-bold mb-4 text-accent">Connect With Us</h4>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors">
                                <FaFacebook />
                            </a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors">
                                <FaYoutube />
                            </a>
                        </div>
                        <p className="text-sm font-mukta text-accent/60">
                            © {new Date().getFullYear()} Sanskrit Mission. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
