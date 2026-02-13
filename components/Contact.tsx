'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        alert('Thank you for your enquiry! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="relative py-24 bg-gradient-to-b from-charcoal-900 to-charcoal-950 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        Visit Us
                    </h2>
                    <p className="text-charcoal-300 text-lg">
                        We&apos;d love to serve you
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-xl p-6 border border-charcoal-700">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-ember-600/20 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-ember-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-2">Address</h3>
                                    <p className="text-charcoal-300">
                                        4th Cross Rd, Ramaswamy Colony,<br />
                                        Panampilly Nagar, Kochi,<br />
                                        Kerala 682036
                                    </p>
                                    <a
                                        href="https://maps.app.goo.gl/Vya3n7GUYV5dr72C9"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-ember-400 hover:text-ember-300 transition-colors font-medium"
                                    >
                                        Get Directions →
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-xl p-6 border border-charcoal-700">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-ember-600/20 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-ember-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-2">Phone</h3>
                                    <a
                                        href="tel:+918075620640"
                                        className="text-charcoal-300 hover:text-ember-400 transition-colors"
                                    >
                                        +91 80756 20640
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-xl p-6 border border-charcoal-700">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-ember-600/20 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-ember-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-2">Email</h3>
                                    <a
                                        href="mailto:info@thehearthkitchen.com"
                                        className="text-charcoal-300 hover:text-ember-400 transition-colors"
                                    >
                                        info@thehearthkitchen.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enquiry Form */}
                    <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-xl p-8 border border-charcoal-700">
                        <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-charcoal-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-700 rounded-lg text-white focus:outline-none focus:border-ember-600"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-charcoal-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-700 rounded-lg text-white focus:outline-none focus:border-ember-600"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-charcoal-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-700 rounded-lg text-white focus:outline-none focus:border-ember-600 resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-ember-600 hover:bg-ember-700 text-white font-bold rounded-lg transition-colors"
                            >
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
