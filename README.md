# The Hearth Kitchen

A premium, highly-animated restaurant website built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## 🔥 Features

- **Cinematic Animations**: Ember particle background, GSAP scroll effects, and Framer Motion UI transitions
- **Real-time Business Hours**: Live open/closed indicator with Asia/Kolkata timezone
- **Interactive Menu**: Searchable, filterable menu with modal details and two-size pricing for pizzas
- **SEO Optimized**: Next.js Metadata API, JSON-LD structured data, Open Graph, and Twitter cards
- **Fully Responsive**: Mobile-first design with thumb-friendly interactions
- **Accessibility**: Keyboard navigation, reduced motion support, and semantic HTML
- **Performance**: Server Components for SEO, isolated Client Components for interactivity

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Navigate to project directory
cd "c:\Users\anvin\OneDrive\Desktop\The Hearth Kitchen"

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📝 Customization

### Edit Menu

The menu is defined in `lib/menu.ts`. To add, edit, or remove items:

1. Open `lib/menu.ts`
2. Find the relevant category in the `menuData` array
3. Add/edit items following the `MenuItem` interface:

```typescript
{
  id: 'unique-id',
  name: 'Item Name',
  description: 'Ingredients or description',
  priceSmall: 359,  // For pizzas (optional)
  priceLarge: 505,  // For pizzas (optional)
  price: 120,       // For single-price items
  veg: true,        // true/false
  tags: ['bestseller', 'fusion-hit'],  // Optional
  category: 'pizzas',
  subcategory: 'veg',  // Optional
}
```

### Edit Business Hours

Business hours are configured in `lib/businessHours.ts`:

1. Open `lib/businessHours.ts`
2. Edit the `businessHours` array:

```typescript
export const businessHours: BusinessHours[] = [
  { day: 0, open: '11:00', close: '00:00' }, // Sunday
  { day: 1, open: '11:00', close: '00:00' }, // Monday
  // ... etc
];
```

- `day`: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
- `open`/`close`: 24-hour format (HH:mm)
- Use `'00:00'` for midnight

The open/closed indicator updates automatically every minute.

## 🏗️ Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles
├── components/
│   ├── EmberBackground.client.tsx    # Canvas particle system
│   ├── ScrollEffects.client.tsx      # GSAP scroll effects
│   ├── MenuTabs.client.tsx           # Interactive menu
│   ├── Navbar.client.tsx             # Sticky navbar
│   ├── Hero.tsx                      # Hero section
│   ├── Story.tsx                     # Brand story
│   ├── Chef.tsx                      # Chef credibility
│   ├── Testimonials.tsx              # Customer reviews
│   ├── Contact.tsx                   # Contact form
│   └── Footer.tsx                    # Footer
├── lib/
│   ├── menu.ts             # Menu data
│   └── businessHours.ts    # Hours logic
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + GSAP
- **Icons**: Lucide React
- **Date/Time**: date-fns + date-fns-tz

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- `prefers-reduced-motion` support
- Color contrast compliance

## 🔍 SEO Features

- Next.js Metadata API for meta tags
- JSON-LD structured data (Restaurant schema)
- Open Graph tags for social sharing
- Twitter Card metadata
- Semantic HTML for crawlability
- Mobile-friendly design

## 📞 Contact Information

- **Address**: 4th Cross Rd, Ramaswamy Colony, Panampilly Nagar, Kochi, Kerala 682036
- **Phone**: +91 80756 20640
- **Email**: info@thehearthkitchen.com

## 👨‍🍳 Chef

**Chef Rajeev Upadhyay** - Master Pastry Chef with 20+ years of experience

## ⭐ Rating

4.5/5 stars | ₹400-600 price range

---

Built with 🔥 and passion for authentic Italian cuisine.
