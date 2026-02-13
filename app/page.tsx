import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Chef from "@/components/Chef";
import ReviewsSection from "@/components/ReviewsSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MenuTabs from "@/components/MenuTabs.client";

export default function Home() {
    return (
        <>
            {/* JSON-LD Structured Data for Restaurant */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Restaurant",
                        name: "The Hearth Kitchen",
                        image: "https://thehearthkitchen.com/og-image.jpg",
                        "@id": "https://thehearthkitchen.com",
                        url: "https://thehearthkitchen.com",
                        telephone: "+918075620640",
                        priceRange: "₹400-600",
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "4th Cross Rd, Ramaswamy Colony",
                            addressLocality: "Panampilly Nagar, Kochi",
                            addressRegion: "Kerala",
                            postalCode: "682036",
                            addressCountry: "IN",
                        },
                        geo: {
                            "@type": "GeoCoordinates",
                            latitude: 9.9674,
                            longitude: 76.2826,
                        },
                        openingHoursSpecification: [
                            {
                                "@type": "OpeningHoursSpecification",
                                dayOfWeek: [
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                    "Saturday",
                                    "Sunday",
                                ],
                                opens: "11:00",
                                closes: "00:00",
                            },
                        ],
                        servesCuisine: ["Italian", "Pizza"],
                        acceptsReservations: "True",
                        aggregateRating: {
                            "@type": "AggregateRating",
                            ratingValue: "4.5",
                            ratingCount: "100",
                        },
                    }),
                }}
            />

            <main>
                <Hero />
                <Story />

                {/* Menu Section */}
                <section id="menu" className="relative py-24 bg-charcoal-900" data-scroll="fade-in">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                                Our Menu
                            </h2>
                            <p className="text-charcoal-300 text-lg">
                                Wood-fired perfection in every bite
                            </p>
                        </div>
                        <MenuTabs />
                    </div>
                </section>

                <Chef />
                <ReviewsSection />
                <Contact />
                <Footer />
            </main>
        </>
    );
}
