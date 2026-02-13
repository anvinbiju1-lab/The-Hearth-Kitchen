'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { getOpenStatus, getFormattedHours } from '@/lib/businessHours';

export default function Footer() {
    const [openStatus, setOpenStatus] = useState<ReturnType<typeof getOpenStatus> | null>(null);
    const hours = getFormattedHours();

    useEffect(() => {
        // Set initial status on client side only
        setOpenStatus(getOpenStatus());
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setOpenStatus(getOpenStatus());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="relative bg-charcoal-950 border-t border-charcoal-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/logo.png"
                                alt="The Hearth Kitchen Logo"
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                            <h3 className="text-white font-serif text-xl font-bold">
                                The Hearth Kitchen
                            </h3>
                        </div>
                        <p className="text-charcoal-400 mb-4">
                            Premium wood-fired pizzas and Italian cuisine in the heart of Kochi.
                        </p>
                        {openStatus && (
                            <>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                                    <span className={`text-sm font-medium ${openStatus.isOpen ? 'text-green-400' : 'text-red-400'}`}>
                                        {openStatus.message}
                                    </span>
                                </div>
                                <p className="text-charcoal-400 text-sm mt-1">
                                    {openStatus.nextChange}
                                </p>
                            </>
                        )}
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-ember-400" />
                            Business Hours
                        </h4>
                        <ul className="space-y-2 text-charcoal-400 text-sm">
                            {hours.map((hour, index) => (
                                <li key={index}>{hour}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Contact</h4>
                        <ul className="space-y-3 text-charcoal-400 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-5 h-5 text-ember-400 flex-shrink-0 mt-0.5" />
                                <span>
                                    4th Cross Rd, Ramaswamy Colony,<br />
                                    Panampilly Nagar, Kochi,<br />
                                    Kerala 682036
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-ember-400 flex-shrink-0" />
                                <a href="tel:+918075620640" className="hover:text-ember-400 transition-colors">
                                    +91 80756 20640
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-ember-400 flex-shrink-0" />
                                <a href="mailto:info@thehearthkitchen.com" className="hover:text-ember-400 transition-colors">
                                    info@thehearthkitchen.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-charcoal-800 pt-8 text-center text-charcoal-500 text-sm">
                    <p>© {new Date().getFullYear()} The Hearth Kitchen. All rights reserved.</p>
                    <p className="mt-2">Crafted with 🔥 and passion for authentic Italian cuisine.</p>
                </div>
            </div>
        </footer>
    );
}
