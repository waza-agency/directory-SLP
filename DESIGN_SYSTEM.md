# San Luis Way Design System

## Quick Reference for the Elegant Travel & Living Lifestyle Aesthetic

---

## Color Palette

### Primary Colors
```css
Primary Yellow: #FFCB05 (--color-primary)
Primary Dark: #E6B800
Primary Light: #FFD633

Secondary Blue: #00007A (--color-secondary)
Secondary Light: #0000B3
```

### Neutral Palette
```css
White: #FFFFFF
Gray 50: #FAFAFA (backgrounds)
Gray 100: #F5F5F5
Gray 200: #E5E5E5
Gray 300: #D4D4D4
Gray 400: #A3A3A3
Gray 500: #737373
Gray 600: #525252
Gray 700: #404040
Gray 800: #262626
Gray 900: #171717 (dark text/backgrounds)
```

### Usage Guidelines
- **Primary Yellow:** CTAs, accents, badges, highlights
- **Secondary Blue:** Alternative CTAs, icons, links
- **Gray 900:** Primary text, dark backgrounds
- **Gray 600:** Secondary text
- **Gray 50-100:** Section backgrounds
- **White:** Card backgrounds, light text on dark

---

## Typography

### Font Families
```css
Serif (Headings): 'Crimson Pro', Georgia, serif
Sans-serif (Body): 'Inter', system-ui, sans-serif
```

### Size Scale
```css
9xl: 8rem (128px) - Rare, hero only
8xl: 6rem (96px) - Hero headlines
7xl: 4.5rem (72px) - Major headlines
6xl: 3.75rem (60px) - Section headlines
5xl: 3rem (48px) - Large headlines
4xl: 2.25rem (36px) - Subsection headlines
3xl: 1.875rem (30px) - Card headlines
2xl: 1.5rem (24px) - Small headlines
xl: 1.25rem (20px) - Large body
lg: 1.125rem (18px) - Default body
base: 1rem (16px) - Small body
sm: 0.875rem (14px) - Captions, labels
xs: 0.75rem (12px) - Tiny text
```

### Font Weights
```css
Light: 300 - Hero subtitles, descriptive text
Normal: 400 - Body text, paragraphs
Medium: 500 - Labels, emphasis
Semibold: 600 - Subheadings, strong
Bold: 700 - Main headings, CTAs
```

### Line Heights
```css
Tight: 1.1 - Large headings
Snug: 1.2 - Medium headings
Normal: 1.5 - Default
Relaxed: 1.65 - Body paragraphs
Loose: 1.75 - Long-form content
```

### Usage Examples
```tsx
// Hero heading
<h1 className="font-serif text-7xl md:text-8xl font-bold leading-tight">

// Section heading
<h2 className="font-serif text-5xl md:text-6xl font-bold leading-tight">

// Card heading
<h3 className="font-serif text-2xl font-bold">

// Body text
<p className="text-lg text-gray-600 leading-relaxed">

// Label/Badge
<span className="text-sm font-semibold uppercase tracking-widest">
```

---

## Spacing System

### Padding Scale
```css
px-4: 16px
px-6: 24px (mobile containers)
px-8: 32px
px-12: 48px (tablet containers)
px-16: 64px
px-20: 80px (desktop containers)

py-16: 64px (small sections)
py-24: 96px (standard sections)
py-32: 128px (large sections)
```

### Margin Scale
```css
mb-2: 8px (tight)
mb-4: 16px (default)
mb-6: 24px (comfortable)
mb-8: 32px (generous)
mb-12: 48px (section gaps)
mb-16: 64px (major gaps)
mb-20: 80px (large section gaps)
```

### Grid Gaps
```css
gap-4: 16px (tight cards)
gap-6: 24px (default cards)
gap-8: 32px (comfortable cards)
gap-12: 48px (generous cards)
```

### Usage Guidelines
- Section vertical: py-32 (desktop), py-24 (tablet), py-16 (mobile)
- Container horizontal: px-20 (desktop), px-12 (tablet), px-6 (mobile)
- Card grid gaps: gap-8 (desktop), gap-6 (mobile)

---

## Border Radius

### Scale
```css
rounded-none: 0
rounded-sm: 0.125rem (2px)
rounded: 0.25rem (4px)
rounded-md: 0.375rem (6px)
rounded-lg: 0.5rem (8px)
rounded-xl: 0.75rem (12px)
rounded-2xl: 1rem (16px)
rounded-3xl: 1.5rem (24px)
rounded-full: 9999px (circle/pill)
```

### Usage
```tsx
// Cards
<div className="rounded-2xl md:rounded-3xl">

// Buttons
<button className="rounded-full"> // Pills
<button className="rounded-xl">  // Standard

// Badges
<span className="rounded-full">

// Images
<div className="rounded-2xl overflow-hidden">
```

---

## Shadows

### Shadow Scale
```css
shadow-card: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)
shadow-card-hover: 0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.06)
shadow-elegant: 0 4px 20px rgba(0,0,0,0.08)
shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1)
shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1)
shadow-2xl: 0 25px 50px -12px rgba(0,0,0,0.25)
```

### Usage
```tsx
// Default card
<div className="shadow-card">

// Card on hover
<div className="shadow-card hover:shadow-card-hover">

// Premium elements
<div className="shadow-elegant">

// Floating elements
<div className="shadow-xl">
```

---

## Animation & Transitions

### Duration
```css
duration-200: 200ms (fast)
duration-300: 300ms (standard)
duration-500: 500ms (smooth)
duration-700: 700ms (slow)
```

### Easing
```css
ease-in: acceleration
ease-out: deceleration (default)
ease-in-out: smooth both ends
```

### Hover Effects
```tsx
// Card lift
<div className="transition-all duration-500 hover:-translate-y-2">

// Image zoom
<img className="transition-transform duration-700 group-hover:scale-110">

// Color change
<h3 className="transition-colors group-hover:text-primary">

// Shadow enhancement
<div className="transition-shadow hover:shadow-card-hover">

// Button scale
<button className="transition-all hover:scale-105">

// Arrow movement
<svg className="transition-transform group-hover:translate-x-1">
```

### Built-in Animations
```tsx
// Fade in
<div className="animate-fade-in">

// Slide up
<div className="animate-slide-up">

// Float (decorative)
<div className="animate-float">

// Pulse (subtle)
<div className="animate-pulse-slow">

// Bounce (scroll indicator)
<div className="animate-bounce">
```

---

## Component Patterns

### Hero Section
```tsx
<section className="relative h-screen min-h-[700px] max-h-[1000px] flex items-center overflow-hidden bg-gray-900">
  {/* Background image */}
  {/* Gradient overlays */}
  {/* Content container */}
  {/* Decorative elements */}
  {/* Scroll indicator */}
</section>
```

### Section Container
```tsx
<section className="py-32 bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto px-6 md:px-12 lg:px-20">
    {/* Section header */}
    {/* Content */}
  </div>
</section>
```

### Section Header
```tsx
<div className="text-center max-w-3xl mx-auto mb-20">
  <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
    Badge Text
  </span>
  <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
    Section Headline
  </h2>
  <p className="text-xl text-gray-600 leading-relaxed">
    Description text
  </p>
</div>
```

### Card (Editorial Style)
```tsx
<article className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
  {/* Image container */}
  <div className="relative h-72 overflow-hidden">
    <Image
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />
  </div>

  {/* Content */}
  <div className="p-6">
    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
      Headline
    </h3>
    <p className="text-gray-600 leading-relaxed mb-4">
      Description
    </p>
    <Link className="inline-flex items-center gap-2 text-primary font-semibold">
      Learn More
      <svg>→</svg>
    </Link>
  </div>
</article>
```

### Button (Primary)
```tsx
<button className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-2xl">
  Button Text
  <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1">
    {/* Arrow */}
  </svg>
</button>
```

### Button (Secondary)
```tsx
<button className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-gray-900 hover:border-white">
  Button Text
</button>
```

### Badge
```tsx
<span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
  <Icon className="w-5 h-5 text-primary" />
  <span className="text-white font-medium text-sm tracking-wider uppercase">
    Badge Text
  </span>
</span>
```

---

## Responsive Breakpoints

### Tailwind Defaults
```css
sm: 640px   (small tablets)
md: 768px   (tablets)
lg: 1024px  (small desktops)
xl: 1280px  (desktops)
2xl: 1536px (large desktops)
```

### Usage Pattern
```tsx
// Mobile-first approach
<div className="
  text-4xl      // mobile (< 640px)
  md:text-6xl   // tablet (≥ 768px)
  lg:text-7xl   // desktop (≥ 1024px)
">
```

### Grid Responsive
```tsx
<div className="
  grid
  grid-cols-1      // mobile
  md:grid-cols-2   // tablet
  lg:grid-cols-3   // desktop
  gap-6 lg:gap-8   // responsive gaps
">
```

---

## Icon Usage

### Heroicons
```tsx
import {
  CalendarIcon,
  MapPinIcon,
  SparklesIcon,
  HeartIcon,
  UserGroupIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline';

// Standard size
<Icon className="w-6 h-6 text-primary" />

// Large size
<Icon className="w-8 h-8 text-primary" />

// With stroke width
<Icon className="w-6 h-6" strokeWidth={2} />
```

---

## Image Optimization

### Next.js Image
```tsx
<Image
  src="/images/hero-bg.jpg"
  alt="Descriptive alt text"
  fill                    // Fills parent
  className="object-cover" // Maintain aspect ratio
  priority               // Load immediately (hero)
  sizes="100vw"          // Responsive sizes
/>

// Or with fixed dimensions
<Image
  src="/path/to/image.jpg"
  alt="Alt text"
  width={800}
  height={600}
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

---

## Gradient Patterns

### Background Gradients
```tsx
// Subtle section backgrounds
<div className="bg-gradient-to-b from-gray-50 to-white">

// Alternating sections
<div className="bg-gradient-to-b from-white to-gray-50">

// Dark sections
<div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

// Accent backgrounds
<div className="bg-gradient-to-r from-primary/10 to-secondary/10">
```

### Overlay Gradients
```tsx
// Dark overlay on images
<div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent" />

// Bottom fade
<div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
```

### Icon Backgrounds
```tsx
<div className="bg-gradient-to-br from-amber-400 to-orange-500">
<div className="bg-gradient-to-br from-blue-500 to-indigo-600">
<div className="bg-gradient-to-br from-emerald-500 to-teal-600">
```

---

## Accessibility Guidelines

### Color Contrast
- Large text (≥18pt): Minimum 3:1 ratio
- Normal text: Minimum 4.5:1 ratio
- Interactive elements: Minimum 3:1 ratio

### Semantic HTML
```tsx
// Use appropriate tags
<article> // For content cards
<section> // For page sections
<nav>     // For navigation
<aside>   // For sidebars
<header>  // For page/section headers
<footer>  // For page/section footers
```

### ARIA Labels
```tsx
// For icon buttons
<button aria-label="Close modal">
  <XIcon />
</button>

// For decorative images
<img alt="" role="presentation" />

// For meaningful images
<img alt="San Luis Potosí cathedral at sunset" />
```

---

## Performance Best Practices

### Images
- Use WebP format with fallbacks
- Implement lazy loading for below-fold images
- Use `priority` prop for LCP images
- Provide appropriate `sizes` attribute
- Compress images before upload

### CSS
- Use Tailwind's JIT mode
- Purge unused styles in production
- Minimize custom CSS
- Use CSS-only animations when possible

### JavaScript
- Lazy load heavy components
- Use dynamic imports for routes
- Minimize third-party scripts
- Defer non-critical scripts

---

## Common Pitfalls to Avoid

1. **Don't** use too many font sizes (stick to the scale)
2. **Don't** mix border-radius styles (be consistent)
3. **Don't** use arbitrary colors (use the palette)
4. **Don't** forget hover states on interactive elements
5. **Don't** neglect mobile responsive design
6. **Don't** skip semantic HTML
7. **Don't** use animations that block user interaction
8. **Don't** forget alt text on images
9. **Don't** mix animation durations inconsistently
10. **Don't** overuse shadows (subtlety is key)

---

## Quick Start Template

```tsx
export default function NewPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-gray-900">
        {/* Background */}
        <div className="absolute inset-0">
          <Image src="/image.jpg" alt="" fill className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <h1 className="font-serif text-7xl md:text-8xl font-bold text-white mb-8">
            Headline
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl">
            Description
          </p>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-primary transition-all">
            CTA Button
          </button>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
              Badge
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Section Headline
            </h2>
            <p className="text-xl text-gray-600">
              Description
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cards */}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

**Last Updated:** October 21, 2025
**Version:** 2.0.0
**Maintained by:** San Luis Way Development Team
