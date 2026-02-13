'use client';

interface SectionLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function SectionLink({ href, children, className, onClick }: SectionLinkProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // Close mobile menu FIRST if callback provided
        if (onClick) {
            onClick();
        }

        // Small delay to let menu close animation start
        setTimeout(() => {
            // Get target section ID
            const targetId = href.replace('#', '');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Get navbar height dynamically
                const navbar = document.querySelector('nav');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;

                // Calculate position with offset for sticky navbar
                const rect = targetElement.getBoundingClientRect();
                const offset = 96; // Extra offset for safety
                const y = window.scrollY + rect.top - offset;

                // Smooth scroll to position
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        }, 100);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={className}
            style={{
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
            }}
        >
            {children}
        </button>
    );
}
