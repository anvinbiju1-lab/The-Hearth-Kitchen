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
    const swiggyButtonRef = useRef<HTMLButtonElement>(null);

    // Focus management
    useEffect(() => {
        if (open) {
            // Small delay to allow animation to start/DOM to mount
            const timer = setTimeout(() => {
                swiggyButtonRef.current?.focus();
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

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
                        aria-hidden="true"
                    />

                    {/* Modal/Bottom Sheet */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Choose ordering platform"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 sm:relative z-[70] w-full max-w-md bg-charcoal-900 border-t sm:border border-charcoal-700 rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl"
                    >
                        {/* Handle bar for mobile feel */}
                        <div className="w-12 h-1.5 bg-charcoal-700 rounded-full mx-auto mb-6 sm:hidden" />

                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Order via</h3>
                            <button
                                onClick={onClose}
                                className="p-2 -mr-2 text-charcoal-400 hover:text-white transition-colors rounded-full hover:bg-charcoal-800"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <button
                                ref={swiggyButtonRef}
                                onClick={() => onSelect('swiggy')}
                                className="w-full group flex items-center justify-between p-4 rounded-xl bg-[#FC8019]/10 border border-[#FC8019]/20 hover:bg-[#FC8019] hover:text-white transition-all duration-300"
                            >
                                <span className="font-bold text-[#FC8019] group-hover:text-white text-lg">Swiggy</span>
                                <ExternalLink className="w-5 h-5 text-[#FC8019] group-hover:text-white" />
                            </button>

                            <button
                                onClick={() => onSelect('zomato')}
                                className="w-full group flex items-center justify-between p-4 rounded-xl bg-[#CB202D]/10 border border-[#CB202D]/20 hover:bg-[#CB202D] hover:text-white transition-all duration-300"
                            >
                                <span className="font-bold text-[#CB202D] group-hover:text-white text-lg">Zomato</span>
                                <ExternalLink className="w-5 h-5 text-[#CB202D] group-hover:text-white" />
                            </button>
                        </div>

                        <p className="text-center text-charcoal-400 text-sm mt-6">
                            You'll be redirected to the selected platform
                        </p>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
