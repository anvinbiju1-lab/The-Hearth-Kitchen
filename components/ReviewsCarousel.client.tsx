'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Review {
    id: string;
    name: string;
    text: string;
    rating?: number;
}

interface ReviewsCarouselProps {
    reviews: Review[];
}

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const goToNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, [reviews.length]);

    const goToPrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }, [reviews.length]);

    const goToSlide = useCallback((index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    }, [currentIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goToPrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrev]);

    const variants = prefersReducedMotion
        ? {
            enter: { opacity: 1 },
            center: { opacity: 1 },
            exit: { opacity: 0.5 },
        }
        : {
            enter: (direction: number) => ({
                x: direction > 0 ? 300 : -300,
                opacity: 0,
            }),
            center: {
                x: 0,
                opacity: 1,
            },
            exit: (direction: number) => ({
                x: direction < 0 ? 300 : -300,
                opacity: 0,
            }),
        };

    const transition = prefersReducedMotion
        ? { duration: 0.1 }
        : { duration: 0.5, ease: [0.32, 0.72, 0, 1] };

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Guest reviews carousel"
            className="relative"
        >
            {/* Carousel container */}
            <div className="relative overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={transition}
                        drag={prefersReducedMotion ? false : "x"}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = Math.abs(offset.x) * velocity.x;
                            if (swipe < -10000) {
                                goToNext();
                            } else if (swipe > 10000) {
                                goToPrev();
                            }
                        }}
                        className="w-full"
                        aria-roledescription="slide"
                        aria-label={`Review ${currentIndex + 1} of ${reviews.length}`}
                    >
                        <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-2xl p-8 md:p-12 border border-charcoal-700 shadow-2xl shadow-ember-900/20 hover:border-ember-600/50 transition-all">
                            {/* Quote icon */}
                            <Quote className="w-12 h-12 text-ember-500 mb-6 opacity-50" />

                            {/* Review text */}
                            <p className="text-white text-xl md:text-2xl mb-8 leading-relaxed font-light">
                                "{reviews[currentIndex].text}"
                            </p>

                            {/* Rating stars */}
                            {reviews[currentIndex].rating && (
                                <div className="flex gap-1 mb-4" aria-label={`Rating: ${reviews[currentIndex].rating} out of 5 stars`}>
                                    {Array.from({ length: reviews[currentIndex].rating || 0 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 fill-ember-500 text-ember-500"
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Author */}
                            <p className="text-charcoal-300 font-medium text-lg">
                                — {reviews[currentIndex].name}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
                <button
                    onClick={goToPrev}
                    aria-label="Previous review"
                    className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-charcoal-800 border border-charcoal-700 hover:bg-charcoal-700 hover:border-ember-600 active:bg-charcoal-600 transition-all group"
                    style={{ touchAction: 'manipulation' }}
                >
                    <ChevronLeft className="w-6 h-6 text-charcoal-300 group-hover:text-ember-400 transition-colors" />
                </button>

                {/* Dots indicator */}
                <div className="flex gap-2" role="tablist" aria-label="Review navigation">
                    {reviews.map((review, index) => (
                        <button
                            key={review.id}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to review ${index + 1}`}
                            aria-current={index === currentIndex ? 'true' : 'false'}
                            role="tab"
                            aria-selected={index === currentIndex}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-ember-600 w-8 shadow-lg shadow-ember-600/50'
                                    : 'bg-charcoal-700 hover:bg-charcoal-600'
                                }`}
                            style={{ touchAction: 'manipulation' }}
                        />
                    ))}
                </div>

                <button
                    onClick={goToNext}
                    aria-label="Next review"
                    className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-charcoal-800 border border-charcoal-700 hover:bg-charcoal-700 hover:border-ember-600 active:bg-charcoal-600 transition-all group"
                    style={{ touchAction: 'manipulation' }}
                >
                    <ChevronRight className="w-6 h-6 text-charcoal-300 group-hover:text-ember-400 transition-colors" />
                </button>
            </div>

            {/* Screen reader announcement for current slide */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                Showing review {currentIndex + 1} of {reviews.length}
            </div>
        </div>
    );
}
