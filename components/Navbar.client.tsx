'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { getOpenStatus } from '@/lib/businessHours';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openStatus, setOpenStatus] = useState<ReturnType<typeof getOpenStatus> | null>(null);

    useEffect(() => {
        // Set initial status on client side only
        setOpenStatus(getOpenStatus());
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Update open status every minute
        const interval = setInterval(() => {
            setOpenStatus(getOpenStatus());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
                ? 'bg-charcoal-950/95 backdrop-blur-lg border-b border-charcoal-800 shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="The Hearth Kitchen Logo"
                            className="w-12 h-12 object-contain"
                        />
                        <div>
                            <h1 className="text-white font-serif text-xl font-bold">The Hearth Kitchen</h1>
                            {openStatus && (
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                                    <span className={`text-xs ${openStatus.isOpen ? 'text-green-400' : 'text-red-400'}`}>
                                        {openStatus.message}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <button onClick={() => scrollToSection('hearth')} className="text-charcoal-300 hover:text-white transition-colors">
                            Story
                        </button>
                        <button onClick={() => scrollToSection('menu')} className="text-charcoal-300 hover:text-white transition-colors">
                            Menu
                        </button>
                        <button onClick={() => scrollToSection('chef')} className="text-charcoal-300 hover:text-white transition-colors">
                            Chef
                        </button>
                        <button onClick={() => scrollToSection('reviews')} className="text-charcoal-300 hover:text-white transition-colors">
                            Reviews
                        </button>
                        <button onClick={() => scrollToSection('contact')} className="text-charcoal-300 hover:text-white transition-colors">
                            Contact
                        </button>
                        <a
                            href="tel:+918075620640"
                            className="flex items-center gap-2 px-6 py-2 bg-ember-600 hover:bg-ember-700 text-white rounded-full transition-colors"
                        >
                            <Phone className="w-4 h-4" />
                            Call Now
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-white"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-charcoal-950/98 backdrop-blur-lg border-t border-charcoal-800"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {/* Open Status */}
                            {openStatus && (
                                <div className="flex items-center gap-3 p-4 bg-charcoal-900 rounded-lg">
                                    <Clock className="w-5 h-5 text-ember-400" />
                                    <div>
                                        <div className={`font-medium ${openStatus.isOpen ? 'text-green-400' : 'text-red-400'}`}>
                                            {openStatus.message}
                                        </div>
                                        <div className="text-sm text-charcoal-400">{openStatus.nextChange}</div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => scrollToSection('hearth')}
                                className="block w-full text-left px-4 py-3 text-white hover:bg-charcoal-800 rounded-lg transition-colors"
                            >
                                Story
                            </button>
                            <button
                                onClick={() => scrollToSection('menu')}
                                className="block w-full text-left px-4 py-3 text-white hover:bg-charcoal-800 rounded-lg transition-colors"
                            >
                                Menu
                            </button>
                            <button
                                onClick={() => scrollToSection('chef')}
                                className="block w-full text-left px-4 py-3 text-white hover:bg-charcoal-800 rounded-lg transition-colors"
                            >
                                Chef
                            </button>
                            <button
                                onClick={() => scrollToSection('reviews')}
                                className="block w-full text-left px-4 py-3 text-white hover:bg-charcoal-800 rounded-lg transition-colors"
                            >
                                Reviews
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="block w-full text-left px-4 py-3 text-white hover:bg-charcoal-800 rounded-lg transition-colors"
                            >
                                Contact
                            </button>
                            <a
                                href="tel:+918075620640"
                                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-ember-600 hover:bg-ember-700 text-white rounded-lg transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                Call Now
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
}
