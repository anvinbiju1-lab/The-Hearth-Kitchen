import ReviewsCarousel from './ReviewsCarousel.client';
import reviewsData from '@/lib/reviews.json';

export default function ReviewsSection() {
    return (
        <section
            id="reviews"
            className="relative py-24 bg-charcoal-900"
            data-scroll="fade-in"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        Reviews
                    </h2>
                    <p className="text-charcoal-300 text-lg">
                        What guests say about The Hearth Kitchen
                    </p>
                </div>

                {/* Server-rendered semantic list for SEO */}
                <noscript>
                    <div className="space-y-6">
                        {reviewsData.items.map((review) => (
                            <div
                                key={review.id}
                                className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-xl p-8 border border-charcoal-700"
                            >
                                <p className="text-white text-lg mb-4 leading-relaxed">
                                    &quot;{review.text}&quot;
                                </p>
                                <p className="text-charcoal-400 font-medium">
                                    — {review.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </noscript>

                {/* Interactive carousel for JS-enabled browsers */}
                <ReviewsCarousel reviews={reviewsData.items} />
            </div>
        </section>
    );
}
