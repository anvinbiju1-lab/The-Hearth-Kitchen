'use client';

import { useEffect, useState } from 'react';

interface SectionLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function SectionLink({ href, children, className, onClick }: SectionLinkProps) {
    const [navbarHeight, setNavbarHeight] = useState(80);

    useEffect(() => {
        // Dynamically get navbar height
        const navbar = document.querySelector('nav');
        if (navbar) {
            setNavbarHeight(navbar.offsetHeight);
        }
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Close mobile menu if callback provided
        if (onClick) {
            onClick();
        }

        // Get target section
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Calculate position with offset for navbar
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            // Smooth scroll to position
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <button
            onClick={handleClick}
            className={className}
        >
            {children}
        </button>
    );
}
