'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { ORDER_LINKS } from '@/lib/orderLinks';

interface OrderPlatformChooserProps {
    open: boolean;
    onClose: () => void;
    onSelect: (platform: keyof typeof ORDER_LINKS) => void;
}

export default function OrderPlatformChooser({
    open,
    onClose,
    onSelect
}: OrderPlatformChooserProps) {
    const swiggyLinkRef = useRef<HTMLAnchorElement>(null);

    // Scroll lock when modal is open
    useEffect(() => {
        if (open) {
            document.documentElement.style.overflow = 'hidden';
            return () => {
                document.documentElement.style.overflow = '';
            };
        }
    }, [open]);

    // Focus management
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                swiggyLinkRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [open]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    const handleLinkClick = (platform: keyof typeof ORDER_LINKS) => {
        // Close modal after a brief delay to allow navigation to start
        setTimeout(() => {
            onSelect(platform);
        }, 100);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
                    aria-hidden="true"
                >
                    {/* Modal Card */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Choose ordering platform"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-[10000] w-full max-w-md bg-charcoal-900/90 backdrop-blur border border-charcoal-700 rounded-2xl p-6 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Order via</h3>
                            <button
                                onClick={onClose}
                                className="p-2 -mr-2 text-charcoal-400 hover:text-white transition-colors rounded-full hover:bg-charcoal-800"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <a
                                ref={swiggyLinkRef}
                                href={ORDER_LINKS.swiggy}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleLinkClick('swiggy')}
                                className="w-full group flex items-center justify-between p-4 rounded-xl bg-[#FC8019]/10 border border-[#FC8019]/20 hover:bg-[#FC8019] hover:text-white transition-all duration-300"
                            >
                                <span className="font-bold text-[#FC8019] group-hover:text-white text-lg">Swiggy</span>
                                <ExternalLink className="w-5 h-5 text-[#FC8019] group-hover:text-white" />
                            </a>

                            <a
                                href={ORDER_LINKS.zomato}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleLinkClick('zomato')}
                                className="w-full group flex items-center justify-between p-4 rounded-xl bg-[#CB202D]/10 border border-[#CB202D]/20 hover:bg-[#CB202D] hover:text-white transition-all duration-300"
                            >
                                <span className="font-bold text-[#CB202D] group-hover:text-white text-lg">Zomato</span>
                                <ExternalLink className="w-5 h-5 text-[#CB202D] group-hover:text-white" />
                            </a>
                        </div>

                        <p className="text-center text-charcoal-400 text-sm mt-6">
                            You&apos;ll be redirected to the selected platform
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
