import { Star, MapPin, IndianRupee, Clock, ChevronDown } from 'lucide-react';
import EmberBackground from './EmberBackground.client';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <EmberBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-scroll="hero">
                {/* Badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                    <div className="flex items-center gap-2 px-4 py-2 bg-charcoal-900/80 backdrop-blur-sm rounded-full border border-charcoal-700">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-medium">4.5/5</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-charcoal-900/80 backdrop-blur-sm rounded-full border border-charcoal-700">
                        <IndianRupee className="w-4 h-4 text-ember-400" />
                        <span className="text-white font-medium">₹400-600</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-900/30 backdrop-blur-sm rounded-full border border-green-700">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">Open · Closes 12:00 AM</span>
                    </div>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                    Wood-Fired <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember-400 to-ember-600">Perfection</span>
                </h1>

                <p className="text-xl sm:text-2xl text-charcoal-200 mb-4 max-w-3xl mx-auto">
                    Premium casual dining in the heart of Kochi
                </p>

                <p className="text-charcoal-300 mb-12 max-w-2xl mx-auto flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4 text-ember-400" />
                    Panampilly Nagar, Kochi
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <a
                        href="#menu"
                        className="px-8 py-4 bg-ember-600 hover:bg-ember-700 text-white font-bold rounded-lg transition-all hover:scale-105 shadow-lg shadow-ember-600/50"
                    >
                        View Menu
                    </a>
                    <a
                        href="tel:+918075620640"
                        className="px-8 py-4 bg-charcoal-800 hover:bg-charcoal-700 text-white font-bold rounded-lg transition-all hover:scale-105 border border-charcoal-600"
                    >
                        Call to Reserve
                    </a>
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center animate-bounce">
                    <ChevronDown className="w-8 h-8 text-ember-400" strokeWidth={2.5} />
                </div>
            </div>
        </section>
    );
}
