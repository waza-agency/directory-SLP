# Design System Quick Reference

## Typography

### Fonts
- **Body Text**: `font-sans` (Inter)
- **Headings**: `font-serif` (Crimson Pro)
- **Display Text**: `font-display` (Crimson Pro)

### Typography Classes
```css
/* Headings */
.font-serif text-5xl font-bold    /* H1 */
.font-serif text-4xl font-semibold /* H2 */
.font-serif text-3xl font-medium   /* H3 */

/* Body Text */
.text-xl text-gray-700    /* Large emphasis */
.text-lg text-gray-600    /* Standard body */
.text-base text-gray-600  /* Regular content */
.text-sm text-gray-500    /* Small text */
```

## Buttons

### Button Classes
```css
.btn-primary    /* Primary action button */
.btn-secondary  /* Secondary action button */
.btn-outline    /* Outline style button */
.btn-ghost      /* Minimal ghost button */
```

### Usage Examples
```jsx
<button className="btn-primary">Save Changes</button>
<button className="btn-secondary">Cancel</button>
<button className="btn-outline">Learn More</button>
<button className="btn-ghost">Skip</button>
```

## Cards

### Card Classes
```css
.card          /* Standard card with hover effects */
.card-elevated /* Enhanced card with prominent shadows */
.slp-card      /* San Luis Potosí themed card */
```

### Usage Examples
```jsx
<div className="card p-6">
  <h3 className="font-serif text-xl font-semibold mb-3">Card Title</h3>
  <p className="text-gray-600">Card content...</p>
</div>
```

## San Luis Potosí Elements

### SLP Design Classes
```css
.slp-pattern-bg    /* Subtle grid background pattern */
.slp-accent-box    /* Themed container with gradients */
.slp-accent-border /* Left border with gradient background */
.slp-separator     /* Elegant divider line */
.slp-pleca         /* Traditional decorative element */
```

### Usage Examples
```jsx
<div className="slp-pattern-bg p-8 rounded-2xl">
  <div className="slp-accent-border">
    <h2>Section Title</h2>
    <p>Content with themed styling...</p>
  </div>
</div>
```

## Modern Effects

### Visual Effect Classes
```css
.glass-effect    /* Glass morphism with backdrop blur */
.gradient-text   /* Beautiful gradient text effect */
.hover-lift      /* Smooth hover lift animation */
.image-container /* Enhanced image container with hover */
```

### Badge Classes
```css
.badge           /* Default badge */
.badge-primary   /* Primary colored badge */
.badge-secondary /* Secondary colored badge */
```

## Colors

### Primary Colors
```css
.bg-primary-50   /* Lightest */
.bg-primary-100
.bg-primary-200
.bg-primary-300
.bg-primary-400
.bg-primary-500  /* Default primary */
.bg-primary-600
.bg-primary-700
.bg-primary-800
.bg-primary-900  /* Darkest */
```

### Secondary Colors
```css
.bg-secondary-50   /* Lightest */
.bg-secondary-100
.bg-secondary-200
.bg-secondary-300
.bg-secondary-400
.bg-secondary-500  /* Default secondary */
.bg-secondary-600
.bg-secondary-700  /* Default secondary */
.bg-secondary-800
.bg-secondary-900  /* Darkest */
```

### Background Colors
```css
.bg-background      /* Main background */
.bg-background-alt  /* Alternative background */
.bg-background-paper /* Card/paper background */
```

## Shadows

### Shadow Classes
```css
.shadow-card        /* Subtle card shadow */
.shadow-card-hover  /* Enhanced hover shadow */
.shadow-elegant     /* Elegant shadow for important elements */
.shadow-button      /* Button shadow */
.shadow-button-hover /* Button hover shadow */
```

## Links

### Link Classes
```css
.link-modern /* Modern link with underline decoration */
```

### Usage Examples
```jsx
<a href="#" className="link-modern">Modern styled link</a>
<Link href="/" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
  Primary link
</Link>
```

## Responsive Design

### Responsive Typography
- Typography automatically scales using `clamp()` functions
- Mobile-optimized font sizes and spacing
- Improved touch targets for mobile devices

### Responsive Grids
```css
.grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 /* Responsive grid */
```

## Accessibility

### Focus States
- All interactive elements have enhanced focus rings
- Keyboard navigation improvements
- Better color contrast ratios

### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy
- Accessible form elements

## Best Practices

### Do's
- Use semantic HTML elements
- Apply consistent spacing with Tailwind utilities
- Use the provided design tokens for colors
- Test on mobile devices
- Ensure proper contrast ratios

### Don'ts
- Don't use arbitrary values for colors
- Don't skip the heading hierarchy
- Don't forget hover and focus states
- Don't use fixed font sizes (use responsive classes)

## Common Patterns

### Hero Section
```jsx
<section className="py-24 px-4 bg-gradient-to-br from-secondary-50 to-primary-50">
  <div className="container mx-auto text-center">
    <h1 className="font-serif text-6xl font-bold text-gray-900 mb-6 gradient-text">
      Hero Title
    </h1>
    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Hero description text...
    </p>
    <button className="btn-primary">Call to Action</button>
  </div>
</section>
```

### Content Section
```jsx
<section className="py-16 px-4">
  <div className="container mx-auto">
    <div className="slp-accent-border mb-8">
      <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
        Section Title
      </h2>
      <p className="text-lg text-gray-600">
        Section description...
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="card p-6">
        <h3 className="font-serif text-xl font-semibold mb-3">Card Title</h3>
        <p className="text-gray-600">Card content...</p>
      </div>
    </div>
  </div>
</section>
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- Fallbacks for advanced CSS features

## Performance

- Optimized font loading
- Hardware-accelerated animations
- Efficient CSS architecture
- Minimal bundle impact