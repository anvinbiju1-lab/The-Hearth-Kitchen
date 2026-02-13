import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar.client";
import ScrollEffects from "@/components/ScrollEffects.client";

export const metadata: Metadata = {
    title: {
        default: "The Hearth Kitchen | Wood-Fired Pizza in Kochi",
        template: "%s | The Hearth Kitchen",
    },
    description:
        "Premium wood-fired pizzas and authentic Italian cuisine in Panampilly Nagar, Kochi. Experience rustic charm meets modern sophistication. Rated 4.5/5. Open until 12:00 AM.",
    keywords: [
        "pizza",
        "wood-fired pizza",
        "Italian restaurant",
        "Kochi restaurants",
        "Panampilly Nagar",
        "Kerala pizza",
        "authentic Italian",
        "casual dining",
    ],
    authors: [{ name: "The Hearth Kitchen" }],
    creator: "The Hearth Kitchen",
    publisher: "The Hearth Kitchen",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://thehearthkitchen.com",
        siteName: "The Hearth Kitchen",
        title: "The Hearth Kitchen | Wood-Fired Pizza in Kochi",
        description:
            "Premium wood-fired pizzas and authentic Italian cuisine in Panampilly Nagar, Kochi. Experience rustic charm meets modern sophistication.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "The Hearth Kitchen - Wood-Fired Pizza",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "The Hearth Kitchen | Wood-Fired Pizza in Kochi",
        description:
            "Premium wood-fired pizzas and authentic Italian cuisine in Panampilly Nagar, Kochi.",
        images: ["/og-image.jpg"],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    themeColor: "#ea580c",
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 5,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased bg-charcoal-950 text-white font-sans">
                <Navbar />
                <ScrollEffects />
                {children}
            </body>
        </html>
    );
}
