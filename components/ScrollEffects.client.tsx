'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollEffects() {
    const effectsInitialized = useRef(false);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Check if mobile device (disable GSAP on mobile to prevent scroll interference)
        const isMobile = window.innerWidth < 768;

        if (prefersReducedMotion || effectsInitialized.current || isMobile) return;

        // Register GSAP plugin
        gsap.registerPlugin(ScrollTrigger);
        effectsInitialized.current = true;

        // Hero parallax effect
        const heroElements = document.querySelectorAll('[data-scroll="hero"]');
        heroElements.forEach((el) => {
            gsap.to(el, {
                y: 100,
                opacity: 0.5,
                scrollTrigger: {
                    trigger: el,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        });

        // Section fade-in animations
        const sections = document.querySelectorAll('[data-scroll="fade-in"]');
        sections.forEach((section) => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse',
                },
            });
        });

        // Reviews section stagger animation
        const reviewsSection = document.querySelector('#reviews');
        if (reviewsSection) {
            const reviewsHeading = reviewsSection.querySelector('h2');
            const reviewsSubheading = reviewsSection.querySelector('p');
            const reviewsCarousel = reviewsSection.querySelector('[role="region"]');

            if (reviewsHeading && reviewsSubheading && reviewsCarousel) {
                gsap.from([reviewsHeading, reviewsSubheading, reviewsCarousel], {
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: reviewsSection,
                        start: 'top 75%',
                        end: 'top 40%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }
        }

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return null;
}
