import { Award, ChefHat } from 'lucide-react';

export default function Chef() {
    return (
        <section id="chef" className="relative py-24 bg-gradient-to-b from-charcoal-950 to-charcoal-900 scroll-mt-24" data-scroll="fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        Chef-Led Excellence
                    </h2>
                    <p className="text-charcoal-300 text-lg">
                        Crafted by masters of the culinary arts
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-2xl p-8 md:p-12 border border-charcoal-700">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Chef Icon */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-ember-600 to-ember-800 flex items-center justify-center">
                                <ChefHat className="w-16 h-16 text-white" />
                            </div>
                        </div>

                        {/* Chef Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-3xl font-bold text-white mb-2">
                                Chef Rajeev Upadhyay
                            </h3>
                            <p className="text-ember-400 font-medium mb-4">
                                Master Pastry Chef
                            </p>

                            <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                                <Award className="w-5 h-5 text-yellow-400" />
                                <span className="text-charcoal-200">
                                    20+ Years of Culinary Excellence
                                </span>
                            </div>

                            <p className="text-charcoal-300 leading-relaxed">
                                With over two decades of experience in the culinary world, Chef Rajeev brings unparalleled expertise to every dish. His mastery of both traditional techniques and innovative fusion creates a dining experience that honors authenticity while embracing creativity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
