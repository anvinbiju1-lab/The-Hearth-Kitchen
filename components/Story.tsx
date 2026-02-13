import { Flame } from 'lucide-react';

export default function Story() {
    return (
        <section id="hearth" className="relative py-24 bg-charcoal-950 scroll-mt-24" data-scroll="fade-in">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    {/* Text Content */}
                    <div className="lg:col-span-5 min-w-0">
                        <div className="flex items-center gap-3 mb-6">
                            <Flame className="w-8 h-8 text-ember-500" />
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                                The Hearth
                            </h2>
                        </div>

                        <p className="text-lg text-charcoal-200 mb-6 leading-relaxed">
                            At The Hearth Kitchen, we believe in the magic of fire. Our wood-fired oven isn&apos;t just a cooking tool—it&apos;s the heart of our restaurant, infusing every pizza with smoky warmth and authentic Italian flavor.
                        </p>

                        <p className="text-lg text-charcoal-200 mb-6 leading-relaxed">
                            Nestled in Panampilly Nagar, we&apos;re a hidden gem where rustic charm meets modern sophistication. Dark wood textures, warm lighting, and the mesmerizing glow of our open kitchen create an atmosphere that&apos;s both cozy and premium.
                        </p>

                        <p className="text-lg text-charcoal-200 leading-relaxed">
                            Every dish tells a story—from our signature Kerala Beef Fry pizza that celebrates local flavors, to our classic Italian favorites crafted with imported ingredients and local passion.
                        </p>
                    </div>

                    {/* Visual Element - Using CSS sticky instead of GSAP pin */}
                    <div className="lg:col-span-7 min-w-0 flex lg:justify-end">
                        <div className="lg:sticky lg:top-28 w-full max-w-md">
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-ember-900 to-charcoal-900 p-8 flex items-center justify-center border border-ember-800/50">
                                <div className="text-center">
                                    <div className="text-8xl mb-4">🔥</div>
                                    <h3 className="text-2xl font-serif font-bold text-white mb-2">
                                        Wood-Fired Oven
                                    </h3>
                                    <p className="text-charcoal-300">
                                        The soul of our kitchen
                                    </p>
                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                        <div className="bg-charcoal-800/50 rounded-lg p-4">
                                            <div className="text-3xl font-bold text-ember-400">450°C</div>
                                            <div className="text-sm text-charcoal-400">Peak Heat</div>
                                        </div>
                                        <div className="bg-charcoal-800/50 rounded-lg p-4">
                                            <div className="text-3xl font-bold text-ember-400">90sec</div>
                                            <div className="text-sm text-charcoal-400">Cook Time</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
