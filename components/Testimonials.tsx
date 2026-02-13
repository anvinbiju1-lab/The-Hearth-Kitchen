import { Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        text: "Best authentic Italian thin-crust pizza in Kochi.",
        author: "Food Enthusiast",
    },
    {
        id: 2,
        text: "The crust is perfectly thin and crispy.",
        author: "Pizza Lover",
    },
    {
        id: 3,
        text: "Hidden gem in Panampilly Nagar.",
        author: "Local Resident",
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="relative py-24 bg-charcoal-900" data-scroll="fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        What People Say
                    </h2>
                    <p className="text-charcoal-300 text-lg">
                        Loved by locals and visitors alike
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-xl p-8 border border-charcoal-700 hover:border-ember-600 transition-all"
                        >
                            <Quote className="w-10 h-10 text-ember-500 mb-4" />
                            <p className="text-white text-lg mb-6 leading-relaxed">
                                &quot;{testimonial.text}&quot;
                            </p>
                            <p className="text-charcoal-400 font-medium">
                                — {testimonial.author}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
