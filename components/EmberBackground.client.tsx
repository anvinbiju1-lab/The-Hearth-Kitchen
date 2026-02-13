'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    life: number;
}

export default function EmberBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles
        const particleCount = 50;
        particlesRef.current = Array.from({ length: particleCount }, () => createParticle(canvas));

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle, index) => {
                // Update particle
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life -= 0.003;

                // Reset particle if it's out of bounds or dead
                if (particle.life <= 0 || particle.y < -10 || particle.x < -10 || particle.x > canvas.width + 10) {
                    particlesRef.current[index] = createParticle(canvas);
                    return;
                }

                // Draw particle with glow
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 2
                );

                const alpha = particle.opacity * particle.life;
                gradient.addColorStop(0, `rgba(251, 146, 60, ${alpha})`); // ember-400
                gradient.addColorStop(0.5, `rgba(234, 88, 12, ${alpha * 0.5})`); // ember-600
                gradient.addColorStop(1, 'rgba(234, 88, 12, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1a1a)' }}
        />
    );
}

function createParticle(canvas: HTMLCanvasElement): Particle {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 1.5 + 0.5),
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        life: 1,
    };
}
