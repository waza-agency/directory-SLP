# Itinerary & Practical Guide Blog Post Style Guide

> **Comprehensive guide for creating tourist itineraries, travel guides, and practical destination guides with day-by-day planning, maps, budgets, and local insider tips**

## 📋 Table of Contents

- [⚠️ CRITICAL RULE: Verified Information Only](#️-critical-rule-verified-information-only)
- [Overview & Purpose](#overview--purpose)
- [Base Structure](#base-structure)
- [Day-by-Day Itinerary Components](#day-by-day-itinerary-components)
- [Timeline & Schedule Layouts](#timeline--schedule-layouts)
- [Activity Cards](#activity-cards)
- [Budget & Cost Breakdown](#budget--cost-breakdown)
- [Map & Location Integration](#map--location-integration)
- [Transportation & Logistics](#transportation--logistics)
- [Practical Information Boxes](#practical-information-boxes)
- [Photo Integration](#photo-integration)
- [Local Tips & Insider Secrets](#local-tips--insider-secrets)
- [Weather & Seasonal Guides](#weather--seasonal-guides)
- [Complete Example](#complete-example)

---

## ⚠️ CRITICAL RULE: Verified Information Only

**NEVER UNDER ANY CIRCUMSTANCE INCLUDE INFORMATION THAT IS NOT VERIFIED. NEVER SAY STUFF THAT WE DIDN'T DO.**

### Mandatory Guidelines:
- ❌ **NEVER** claim to have personally visited places unless you actually did
- ❌ **NEVER** claim to have personally tested routes, restaurants, or hotels that you haven't experienced
- ❌ **NEVER** use first-person language for experiences not had ("we tried", "our favorite", "we discovered")
- ✅ **ALWAYS** attribute recommendations to credible sources (local tourism boards, verified reviews, travel experts)
- ✅ **ALWAYS** use phrases like: "According to local tourism experts...", "Based on visitor reviews...", "Recommended by locals...", "Popular among travelers..."
- ✅ **ALWAYS** verify business hours, addresses, and prices from official sources or recent reviews
- ✅ **ALWAYS** indicate when information may vary (prices, hours, seasonal availability)

**Examples:**
- ❌ BAD: "We spent 3 days exploring every corner of the Centro Histórico and found the best hidden restaurants"
- ✅ GOOD: "According to local guides and visitor reviews, a 3-day exploration of Centro Histórico reveals exceptional dining experiences"
- ❌ BAD: "Our personal testing showed this route takes exactly 2 hours"
- ✅ GOOD: "Based on Google Maps data and traveler reports, this route typically takes 2-2.5 hours depending on pace"

---

## Overview & Purpose

### What is an Itinerary/Practical Guide Post?

Itinerary posts are **comprehensive travel planning articles** that:
- **Provide day-by-day schedules** with specific activities and timing
- **Include detailed logistics** (transportation, routes, booking info)
- **Feature budget breakdowns** for different travel styles
- **Offer practical tips** on local customs, safety, and insider secrets
- **Use visual timelines** to help readers plan their days
- **Incorporate maps and locations** for easy navigation
- **Help travelers make informed decisions** about their trip

### Ideal Length
- **3,500 - 6,000 words**
- **3-7 day itineraries** (or single-day deep dives)
- **10-15 activities** per day (breakfast, sights, lunch, activities, dinner)
- **15-25 photos** (mix of destinations, food, activities)
- **5-8 practical info boxes** (tips, warnings, budgets)

### SEO Keywords Pattern
Target keywords like:
- "X days in [destination]"
- "[Destination] itinerary"
- "Things to do in [destination]"
- "[Destination] travel guide"
- "Best [destination] itinerary"
- "[Destination] in X days"

---

## Base Structure

### Required Sections (in order)

1. **Table of Contents** (yellow box)
2. **Quick Trip Overview** (blue box) - Key facts at a glance
3. **Introduction** - Why visit this destination
4. **Best Time to Visit** - Weather and seasonal considerations
5. **Getting There & Around** - Transportation overview
6. **Budget Overview** - Cost breakdown by travel style
7. **Day-by-Day Itinerary** - Detailed daily schedules
8. **Practical Information** - Essential tips
9. **Where to Stay** - Accommodation recommendations by area
10. **What to Pack** - Packing list
11. **Local Tips & Customs** - Cultural insights
12. **FAQ Section** - Common questions
13. **Final CTA** (green) - Link to contact or related guides

### Wrapper Principal
```html
<div class="prose prose-lg max-w-none">
  <!-- Todo el contenido del itinerary post aquí -->
</div>
```

---

## Day-by-Day Itinerary Components

### 1. Day Header with Overview

**Use at the start of each day:**

```html
<section id="day-1" class="mb-16 scroll-mt-8">
  <!-- Day Header -->
  <div class="not-prose mb-8 bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl text-white">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-4xl font-bold">Day 1: Centro Histórico & Plaza Fundadores</h2>
      <span class="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">8 hours</span>
    </div>
    <p class="text-xl text-white/90 mb-4">
      Explore the historic heart of San Luis Potosí, from colonial architecture to local markets
    </p>

    <!-- Day Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div class="bg-white/10 rounded-lg p-4 text-center">
        <p class="text-sm text-white/70 mb-1">Walking</p>
        <p class="text-2xl font-bold">5 km</p>
      </div>
      <div class="bg-white/10 rounded-lg p-4 text-center">
        <p class="text-sm text-white/70 mb-1">Duration</p>
        <p class="text-2xl font-bold">8 hrs</p>
      </div>
      <div class="bg-white/10 rounded-lg p-4 text-center">
        <p class="text-sm text-white/70 mb-1">Budget</p>
        <p class="text-2xl font-bold">$600</p>
      </div>
      <div class="bg-white/10 rounded-lg p-4 text-center">
        <p class="text-sm text-white/70 mb-1">Activities</p>
        <p class="text-2xl font-bold">8</p>
      </div>
    </div>
  </div>

  <!-- Day Highlights Box -->
  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-lg">
    <h3 class="text-lg font-semibold mb-3 text-yellow-900">🌟 Today's Highlights</h3>
    <ul class="space-y-2 text-yellow-800">
      <li class="flex items-start gap-2">
        <span class="text-yellow-600">•</span>
        <span>Visit the stunning Catedral Metropolitana</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-yellow-600">•</span>
        <span>Explore local artisan markets at Plaza del Carmen</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-yellow-600">•</span>
        <span>Enjoy traditional potosina cuisine at La Gran Vía</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-yellow-600">•</span>
        <span>Sunset at Alameda Juan Sarabia park</span>
      </li>
    </ul>
  </div>

  <!-- Timeline & Activities for this day go here -->
</section>
```

### 2. Daily Timeline Overview

**Visual timeline showing the day's schedule:**

```html
<div class="not-prose mb-12 bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg">
  <h3 class="text-2xl font-semibold mb-6 text-gray-900">Day 1 Schedule at a Glance</h3>

  <div class="relative">
    <!-- Vertical timeline line -->
    <div class="absolute left-16 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400"></div>

    <div class="space-y-6">
      <!-- Morning -->
      <div class="relative flex items-start gap-6">
        <div class="flex-shrink-0 w-32 text-right">
          <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            9:00 AM
          </span>
        </div>
        <div class="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10 -ml-2"></div>
        <div class="flex-1">
          <p class="text-gray-900 font-medium">Breakfast at Café del Centro</p>
          <p class="text-sm text-gray-600">Duration: 45 min • Cost: $120 MXN</p>
        </div>
      </div>

      <div class="relative flex items-start gap-6">
        <div class="flex-shrink-0 w-32 text-right">
          <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            10:00 AM
          </span>
        </div>
        <div class="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10 -ml-2"></div>
        <div class="flex-1">
          <p class="text-gray-900 font-medium">Catedral Metropolitana tour</p>
          <p class="text-sm text-gray-600">Duration: 1 hour • Cost: Free (donation appreciated)</p>
        </div>
      </div>

      <!-- Midday -->
      <div class="relative flex items-start gap-6">
        <div class="flex-shrink-0 w-32 text-right">
          <span class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
            1:00 PM
          </span>
        </div>
        <div class="flex-shrink-0 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-lg z-10 -ml-2"></div>
        <div class="flex-1">
          <p class="text-gray-900 font-medium">Lunch at La Gran Vía</p>
          <p class="text-sm text-gray-600">Duration: 1.5 hours • Cost: $280 MXN</p>
        </div>
      </div>

      <!-- Afternoon -->
      <div class="relative flex items-start gap-6">
        <div class="flex-shrink-0 w-32 text-right">
          <span class="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
            3:00 PM
          </span>
        </div>
        <div class="flex-shrink-0 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white shadow-lg z-10 -ml-2"></div>
        <div class="flex-1">
          <p class="text-gray-900 font-medium">Museo Nacional de la Máscara</p>
          <p class="text-sm text-gray-600">Duration: 1.5 hours • Cost: $50 MXN</p>
        </div>
      </div>

      <!-- Evening -->
      <div class="relative flex items-start gap-6">
        <div class="flex-shrink-0 w-32 text-right">
          <span class="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
            6:00 PM
          </span>
        </div>
        <div class="flex-shrink-0 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg z-10 -ml-2"></div>
        <div class="flex-1">
          <p class="text-gray-900 font-medium">Sunset at Alameda park</p>
          <p class="text-sm text-gray-600">Duration: 1 hour • Cost: Free</p>
        </div>
      </div>

      <div class="relative flex items-start gap-6">
        <div class="flex-shrink-0 w-32 text-right">
          <span class="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
            8:00 PM
          </span>
        </div>
        <div class="flex-shrink-0 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg z-10 -ml-2"></div>
        <div class="flex-1">
          <p class="text-gray-900 font-medium">Dinner at Corazón de Xoconostle</p>
          <p class="text-sm text-gray-600">Duration: 2 hours • Cost: $450 MXN</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Time Period Color Coding:
- **Blue** (`bg-blue-500`) - Morning (6 AM - 12 PM)
- **Green** (`bg-green-500`) - Midday (12 PM - 3 PM)
- **Yellow** (`bg-yellow-500`) - Afternoon (3 PM - 6 PM)
- **Purple** (`bg-purple-500`) - Evening (6 PM - 10 PM)
- **Indigo** (`bg-indigo-500`) - Night (10 PM+)

---

## Timeline & Schedule Layouts

### Detailed Activity Cards

**For each activity in the itinerary:**

```html
<div class="not-prose mb-8 bg-white border-2 border-blue-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
  <!-- Activity Header with Time -->
  <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="bg-white/20 rounded-lg px-4 py-2">
        <p class="text-white font-bold text-lg">10:00 AM</p>
      </div>
      <h4 class="text-2xl font-bold text-white">Catedral Metropolitana</h4>
    </div>
    <div class="flex items-center gap-3">
      <span class="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
        ⏱️ 1 hour
      </span>
      <span class="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
        💰 Free
      </span>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-0">
    <!-- Image -->
    <div class="md:col-span-1">
      <img
        src="https://images.unsplash.com/photo-cathedral?w=600&h=400&fit=crop&q=80"
        alt="Catedral Metropolitana de San Luis Potosí"
        class="w-full h-64 md:h-full object-cover"
        loading="lazy"
      />
    </div>

    <!-- Content -->
    <div class="md:col-span-2 p-6">
      <!-- Category Tags -->
      <div class="flex gap-2 mb-4">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          🏛️ Architecture
        </span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          📸 Photo Spot
        </span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ♿ Accessible
        </span>
      </div>

      <!-- Description -->
      <p class="text-gray-700 mb-4">
        The stunning Catedral Metropolitana is one of San Luis Potosí's most iconic landmarks. Built in the 17th century, this baroque masterpiece features intricate stone carvings, beautiful stained glass windows, and a peaceful interior perfect for quiet reflection. Don't miss the underground crypt and the rooftop views (ask permission from staff).
      </p>

      <!-- Practical Info Grid -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p class="text-sm font-semibold text-gray-900 mb-1">📍 Location</p>
          <p class="text-sm text-gray-600">Plaza de Armas, Centro Histórico</p>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-900 mb-1">🕐 Hours</p>
          <p class="text-sm text-gray-600">Daily 7 AM - 8 PM</p>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-900 mb-1">💵 Entrance</p>
          <p class="text-sm text-gray-600">Free (donations welcome)</p>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-900 mb-1">📞 Contact</p>
          <p class="text-sm text-gray-600">+52 444 812 3456</p>
        </div>
      </div>

      <!-- Insider Tip -->
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <p class="text-yellow-900 text-sm">
          <strong>💡 Local Tip:</strong> Visit early morning (7-8 AM) to see locals attending mass and experience the cathedral at its most authentic. The light streaming through stained glass is magical at this hour.
        </p>
      </div>
    </div>
  </div>
</div>
```

---

## Activity Cards

### Restaurant/Dining Activity Card

```html
<div class="not-prose mb-8 bg-white border-2 border-green-200 rounded-xl overflow-hidden shadow-lg">
  <div class="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="bg-white/20 rounded-lg px-4 py-2">
        <p class="text-white font-bold text-lg">1:00 PM</p>
      </div>
      <h4 class="text-2xl font-bold text-white">Lunch at La Gran Vía</h4>
    </div>
    <div class="flex items-center gap-3">
      <span class="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
        ⏱️ 1.5 hours
      </span>
      <span class="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
        💰 $280 MXN
      </span>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-0">
    <div class="md:col-span-1">
      <img
        src="https://images.unsplash.com/photo-restaurant?w=600&h=400&fit=crop&q=80"
        alt="La Gran Vía restaurant interior"
        class="w-full h-64 md:h-full object-cover"
        loading="lazy"
      />
    </div>

    <div class="md:col-span-2 p-6">
      <div class="flex gap-2 mb-4">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          🍽️ Traditional Cuisine
        </span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          ⭐ 4.8/5 Rating
        </span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          📝 Reservation Recommended
        </span>
      </div>

      <p class="text-gray-700 mb-4">
        La Gran Vía is a beloved local institution serving authentic Potosina cuisine in an elegant colonial setting. Their specialty is the traditional "Fiesta Huasteca" platter featuring enchiladas potosinas, cecina, and fresh cheese. The tacos de guisado are also exceptional.
      </p>

      <!-- Must-Try Dishes -->
      <div class="mb-4">
        <p class="text-sm font-semibold text-gray-900 mb-2">🌮 Must-Try Dishes:</p>
        <ul class="text-sm text-gray-700 space-y-1">
          <li>• Fiesta Huasteca (mixed platter) - $280 MXN</li>
          <li>• Enchiladas Potosinas - $180 MXN</li>
          <li>• Tacos de Cecina - $150 MXN</li>
          <li>• Agua de Jamaica (house-made) - $40 MXN</li>
        </ul>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p class="text-sm font-semibold text-gray-900 mb-1">📍 Location</p>
          <p class="text-sm text-gray-600">Av. Carranza 830, Centro</p>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-900 mb-1">🕐 Hours</p>
          <p class="text-sm text-gray-600">Mon-Sat 12-6 PM, Sun 12-5 PM</p>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-900 mb-1">💵 Price Range</p>
          <p class="text-sm text-gray-600">$150-350 MXN per person</p>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-900 mb-1">📞 Reservations</p>
          <p class="text-sm text-gray-600">+52 444 812 7890</p>
        </div>
      </div>

      <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
        <p class="text-green-900 text-sm">
          <strong>💡 Pro Tip:</strong> Request a table by the courtyard fountain for the best ambiance. Ask your server about the "plato del día" (daily special) which often features seasonal ingredients at a discounted price.
        </p>
      </div>
    </div>
  </div>
</div>
```

### Outdoor/Adventure Activity Card

```html
<div class="not-prose mb-8 bg-white border-2 border-yellow-200 rounded-xl overflow-hidden shadow-lg">
  <div class="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="bg-white/20 rounded-lg px-4 py-2">
        <p class="text-white font-bold text-lg">3:00 PM</p>
      </div>
      <h4 class="text-2xl font-bold text-white">Hiking at Cerro de San Pedro</h4>
    </div>
    <div class="flex items-center gap-3">
      <span class="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
        ⏱️ 2.5 hours
      </span>
      <span class="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
        💪 Moderate
      </span>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-0">
    <div class="md:col-span-1">
      <img
        src="https://images.unsplash.com/photo-hiking?w=600&h=400&fit=crop&q=80"
        alt="Cerro de San Pedro trail views"
        class="w-full h-64 md:h-full object-cover"
        loading="lazy"
      />
    </div>

    <div class="md:col-span-2 p-6">
      <div class="flex gap-2 mb-4">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          🥾 Hiking
        </span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          ⚠️ Moderate Difficulty
        </span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          📸 Panoramic Views
        </span>
      </div>

      <p class="text-gray-700 mb-4">
        This historic mining town turned hiking destination offers spectacular desert mountain views and fascinating colonial ruins. The trail winds through abandoned mine shafts (now secured) and offers panoramic vistas of the valley below. Bring plenty of water and sun protection.
      </p>

      <!-- Difficulty & Requirements -->
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="bg-gray-50 rounded-lg p-3 text-center">
          <p class="text-2xl mb-1">⛰️</p>
          <p class="text-xs font-semibold text-gray-900">Elevation Gain</p>
          <p class="text-sm text-gray-600">250m</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-3 text-center">
          <p class="text-2xl mb-1">🚶</p>
          <p class="text-xs font-semibold text-gray-900">Distance</p>
          <p class="text-sm text-gray-600">4.5 km</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-3 text-center">
          <p class="text-2xl mb-1">💧</p>
          <p class="text-xs font-semibold text-gray-900">Water Needed</p>
          <p class="text-sm text-gray-600">2+ liters</p>
        </div>
      </div>

      <!-- What to Bring -->
      <div class="mb-4">
        <p class="text-sm font-semibold text-gray-900 mb-2">🎒 What to Bring:</p>
        <ul class="text-sm text-gray-700 space-y-1">
          <li>• Sturdy hiking shoes (trail has loose rocks)</li>
          <li>• 2L water minimum per person</li>
          <li>• Sunscreen SPF 50+ and hat</li>
          <li>• Snacks (no food available on trail)</li>
          <li>• Camera for incredible views</li>
        </ul>
      </div>

      <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mb-4">
        <p class="text-red-900 text-sm">
          <strong>⚠️ Safety Note:</strong> Best hiked between October-April to avoid extreme heat. Start early (before 10 AM) during summer months. Cell service is spotty—let someone know your plans. Stay on marked trails.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-semibold text-gray-900 mb-1">📍 Starting Point</p>
          <p class="text-sm text-gray-600">Cerro de San Pedro town plaza</p>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-900 mb-1">🚗 Getting There</p>
          <p class="text-sm text-gray-600">20 min drive from SLP city</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Budget & Cost Breakdown

### Daily Budget Summary

```html
<div class="not-prose mb-12 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 rounded-2xl p-8 shadow-xl">
  <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Day 1 Budget Breakdown</h3>

  <!-- Budget by Travel Style -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <!-- Budget Option -->
    <div class="bg-white rounded-xl p-6 shadow-lg text-center border-2 border-gray-200">
      <div class="text-4xl mb-3">💵</div>
      <h4 class="text-lg font-semibold text-gray-900 mb-2">Budget Traveler</h4>
      <p class="text-4xl font-bold text-green-600 mb-4">$450</p>
      <p class="text-sm text-gray-600 mb-4">MXN per person/day</p>
      <ul class="text-left text-sm text-gray-700 space-y-2">
        <li>• Street food & local fondas</li>
        <li>• Free walking tours</li>
        <li>• Public transportation</li>
        <li>• Budget accommodation</li>
      </ul>
    </div>

    <!-- Mid-Range Option -->
    <div class="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6 shadow-2xl text-center border-4 border-blue-500">
      <div class="text-4xl mb-3">🎯</div>
      <h4 class="text-lg font-semibold text-gray-900 mb-2">Mid-Range Traveler</h4>
      <p class="text-4xl font-bold text-blue-600 mb-4">$900</p>
      <p class="text-sm text-gray-600 mb-4">MXN per person/day</p>
      <ul class="text-left text-sm text-gray-700 space-y-2">
        <li>• Sit-down restaurants</li>
        <li>• Mix of paid & free activities</li>
        <li>• Uber/taxi when convenient</li>
        <li>• Comfortable hotels</li>
      </ul>
    </div>

    <!-- Luxury Option -->
    <div class="bg-white rounded-xl p-6 shadow-lg text-center border-2 border-gray-200">
      <div class="text-4xl mb-3">✨</div>
      <h4 class="text-lg font-semibold text-gray-900 mb-2">Luxury Traveler</h4>
      <p class="text-4xl font-bold text-purple-600 mb-4">$1,800</p>
      <p class="text-sm text-gray-600 mb-4">MXN per person/day</p>
      <ul class="text-left text-sm text-gray-700 space-y-2">
        <li>• Fine dining experiences</li>
        <li>• Private tours & guides</li>
        <li>• Private driver/car rental</li>
        <li>• Boutique hotels</li>
      </ul>
    </div>
  </div>

  <!-- Detailed Cost Breakdown -->
  <div class="bg-white rounded-xl p-6 shadow-lg">
    <h4 class="text-lg font-semibold text-gray-900 mb-4">Detailed Expenses (Mid-Range Example)</h4>

    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead class="border-b-2 border-gray-200">
          <tr>
            <th class="text-left py-2 px-4 text-sm font-semibold text-gray-700">Category</th>
            <th class="text-left py-2 px-4 text-sm font-semibold text-gray-700">Item</th>
            <th class="text-right py-2 px-4 text-sm font-semibold text-gray-700">Cost</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr>
            <td class="py-3 px-4 text-sm text-gray-900 font-medium">🍳 Breakfast</td>
            <td class="py-3 px-4 text-sm text-gray-600">Café del Centro</td>
            <td class="py-3 px-4 text-sm text-gray-900 font-semibold text-right">$120</td>
          </tr>
          <tr>
            <td class="py-3 px-4 text-sm text-gray-900 font-medium">🏛️ Activities</td>
            <td class="py-3 px-4 text-sm text-gray-600">Catedral (donation)</td>
            <td class="py-3 px-4 text-sm text-gray-900 font-semibold text-right">$50</td>
          </tr>
          <tr>
            <td class="py-3 px-4 text-sm text-gray-900 font-medium">🍽️ Lunch</td>
            <td class="py-3 px-4 text-sm text-gray-600">La Gran Vía</td>
            <td class="py-3 px-4 text-sm text-gray-900 font-semibold text-right">$280</td>
          </tr>
          <tr>
            <td class="py-3 px-4 text-sm text-gray-900 font-medium">🎭 Activities</td>
            <td class="py-3 px-4 text-sm text-gray-600">Museo de la Máscara</td>
            <td class="py-3 px-4 text-sm text-gray-900 font-semibold text-right">$50</td>
          </tr>
          <tr>
            <td class="py-3 px-4 text-sm text-gray-900 font-medium">🚕 Transport</td>
            <td class="py-3 px-4 text-sm text-gray-600">Uber rides (x3)</td>
            <td class="py-3 px-4 text-sm text-gray-900 font-semibold text-right">$150</td>
          </tr>
          <tr>
            <td class="py-3 px-4 text-sm text-gray-900 font-medium">🌮 Dinner</td>
            <td class="py-3 px-4 text-sm text-gray-600">Corazón de Xoconostle</td>
            <td class="py-3 px-4 text-sm text-gray-900 font-semibold text-right">$450</td>
          </tr>
          <tr class="bg-gray-50 font-bold">
            <td class="py-3 px-4 text-sm text-gray-900" colspan="2">Total Day 1</td>
            <td class="py-3 px-4 text-lg text-green-600 text-right">$1,100</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Money-Saving Tips -->
  <div class="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
    <p class="text-yellow-900 text-sm">
      <strong>💰 Money-Saving Tip:</strong> Many museums offer free admission on Sundays. Pack snacks and refillable water bottle to save $150-200 MXN daily. Consider getting a multi-day public transport pass for $80 MXN instead of individual Uber rides.
    </p>
  </div>
</div>
```

---

## Map & Location Integration

### Interactive Map Placeholder

```html
<div class="not-prose my-12 bg-white border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg">
  <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
    <h3 class="text-2xl font-bold text-white flex items-center gap-3">
      <span>🗺️</span> Day 1 Route Map
    </h3>
  </div>

  <!-- Map Placeholder -->
  <div class="relative h-96 bg-gray-100 flex items-center justify-center">
    <div class="text-center">
      <p class="text-gray-500 text-lg mb-2">📍 Interactive Map</p>
      <p class="text-gray-400 text-sm">
        <a href="https://www.google.com/maps/d/edit?mid=EXAMPLE_MAP_ID" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
          View Full Map on Google Maps →
        </a>
      </p>
    </div>
  </div>

  <!-- Map Legend -->
  <div class="p-6 bg-gray-50">
    <h4 class="font-semibold text-gray-900 mb-3">Map Legend:</h4>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
        <span class="text-sm text-gray-700">Morning stops</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        <span class="text-sm text-gray-700">Lunch spots</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <span class="text-sm text-gray-700">Afternoon activities</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
        <span class="text-sm text-gray-700">Evening/dinner</span>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
      <div class="flex items-center gap-2">
        <span class="text-blue-600">📍</span>
        <span class="text-gray-700"><strong>Total Distance:</strong> 5.2 km walking</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-green-600">🚶</span>
        <span class="text-gray-700"><strong>Walking Time:</strong> ~70 minutes</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-yellow-600">🚕</span>
        <span class="text-gray-700"><strong>Uber Segments:</strong> 2 rides</span>
      </div>
    </div>
  </div>
</div>
```

### Location Card with Directions

```html
<div class="not-prose my-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0 text-3xl">📍</div>
    <div class="flex-1">
      <h4 class="text-lg font-semibold text-blue-900 mb-3">Getting to Centro Histórico</h4>

      <div class="space-y-4">
        <!-- From Airport -->
        <div class="bg-white rounded-lg p-4">
          <p class="font-semibold text-gray-900 mb-2">From Ponciano Arriaga Airport:</p>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• <strong>Taxi/Uber:</strong> 30-40 min, ~$250-300 MXN</li>
            <li>• <strong>Airport Shuttle:</strong> Shared van service, ~$150 MXN per person</li>
            <li>• <strong>Route:</strong> Take Carr. a Matehuala → Av. Manuel Nava → Centro</li>
          </ul>
        </div>

        <!-- From Bus Station -->
        <div class="bg-white rounded-lg p-4">
          <p class="font-semibold text-gray-900 mb-2">From Central Bus Station:</p>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• <strong>Local Bus:</strong> Route 12 or 17, $10 MXN, 25 min</li>
            <li>• <strong>Uber:</strong> 15 min, ~$80-100 MXN</li>
          </ul>
        </div>

        <!-- Parking -->
        <div class="bg-white rounded-lg p-4">
          <p class="font-semibold text-gray-900 mb-2">Parking Options:</p>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• <strong>Estacionamiento Plaza de Armas:</strong> $15/hour, $120/day</li>
            <li>• <strong>Public parking on Calle Aldama:</strong> $10/hour</li>
            <li>• <strong>Tip:</strong> Park at your hotel and walk/Uber around Centro</li>
          </ul>
        </div>
      </div>

      <div class="mt-4">
        <a href="https://www.google.com/maps/dir/?api=1&destination=Centro+Historico+San+Luis+Potosi" target="_blank" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm">
          Get Directions on Google Maps →
        </a>
      </div>
    </div>
  </div>
</div>
```

---

## Transportation & Logistics

### Transportation Overview Section

```html
<section id="getting-around" class="mb-12">
  <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Getting Around San Luis Potosí</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <!-- Uber/Taxi -->
    <div class="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-lg">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">🚕</span>
        <h3 class="text-xl font-semibold text-gray-900">Uber & Taxis</h3>
      </div>
      <p class="text-gray-700 mb-4">
        Most convenient option for tourists. Uber operates throughout the city with reliable service and affordable prices.
      </p>
      <ul class="text-sm text-gray-700 space-y-2 mb-4">
        <li><strong>Average Costs:</strong></li>
        <li>• Airport to Centro: $250-300 MXN</li>
        <li>• Within Centro: $50-80 MXN</li>
        <li>• Centro to Tangamanga Park: $100-120 MXN</li>
      </ul>
      <div class="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg">
        <p class="text-green-800 text-sm">
          <strong>✅ Recommended:</strong> Uber is safe, affordable, and drivers speak some English. Download app before arriving.
        </p>
      </div>
    </div>

    <!-- Public Transport -->
    <div class="bg-white border-2 border-green-200 rounded-xl p-6 shadow-lg">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">🚌</span>
        <h3 class="text-xl font-semibold text-gray-900">Public Buses</h3>
      </div>
      <p class="text-gray-700 mb-4">
        Extensive city bus network covering all major areas. Budget-friendly but requires some Spanish and local knowledge.
      </p>
      <ul class="text-sm text-gray-700 space-y-2 mb-4">
        <li><strong>Costs & Tips:</strong></li>
        <li>• Single ride: $10 MXN (exact change)</li>
        <li>• Multi-day pass: $80 MXN (5 days)</li>
        <li>• Routes to Centro: 12, 17, 23, 45</li>
        <li>• Peak hours: 7-9 AM, 6-8 PM (crowded)</li>
      </ul>
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
        <p class="text-yellow-800 text-sm">
          <strong>💡 Tip:</strong> Download "Moovit" app for real-time bus routes and schedules in English.
        </p>
      </div>
    </div>

    <!-- Walking -->
    <div class="bg-white border-2 border-purple-200 rounded-xl p-6 shadow-lg">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">🚶</span>
        <h3 class="text-xl font-semibold text-gray-900">Walking</h3>
      </div>
      <p class="text-gray-700 mb-4">
        Centro Histórico is extremely walkable with pedestrian-friendly streets and compact layout. Many major sights within 15-minute walk.
      </p>
      <ul class="text-sm text-gray-700 space-y-2 mb-4">
        <li><strong>Walkability:</strong></li>
        <li>• Centro Histórico: Excellent (flat terrain)</li>
        <li>• Sidewalks: Good condition, mostly accessible</li>
        <li>• Safety: Very safe during daytime</li>
        <li>• Best areas: Plaza Fundadores to Alameda</li>
      </ul>
      <div class="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
        <p class="text-blue-800 text-sm">
          <strong>🌡️ Note:</strong> Bring water and wear sunscreen. Summer days get hot (30-35°C). Mornings and evenings ideal for walking.
        </p>
      </div>
    </div>

    <!-- Car Rental -->
    <div class="bg-white border-2 border-yellow-200 rounded-xl p-6 shadow-lg">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">🚗</span>
        <h3 class="text-xl font-semibold text-gray-900">Car Rental</h3>
      </div>
      <p class="text-gray-700 mb-4">
        Useful for day trips outside the city (Real de Catorce, Xilitla). Not recommended for navigating Centro due to parking challenges.
      </p>
      <ul class="text-sm text-gray-700 space-y-2 mb-4">
        <li><strong>Details:</strong></li>
        <li>• Daily rate: $400-800 MXN</li>
        <li>• Agencies: Hertz, Europcar, Alamo (airport & downtown)</li>
        <li>• Insurance: Mandatory, ~$200 MXN/day</li>
        <li>• Gas: ~$22 MXN/liter</li>
      </ul>
      <div class="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
        <p class="text-red-800 text-sm">
          <strong>⚠️ Caution:</strong> Parking in Centro is limited and expensive. One-way streets can be confusing. Stick to Uber in the city.
        </p>
      </div>
    </div>
  </div>

  <!-- Transportation Comparison Table -->
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Method</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Cost</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Convenience</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Safety</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Best For</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">Uber/Taxi</td>
          <td class="px-6 py-4 text-center">
            <span class="text-yellow-500">★★★☆☆</span>
          </td>
          <td class="px-6 py-4 text-center">
            <span class="text-yellow-500">★★★★★</span>
          </td>
          <td class="px-6 py-4 text-center">
            <span class="text-yellow-500">★★★★★</span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Door-to-door convenience</td>
        </tr>
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">Public Bus</td>
          <td class="px-6 py-4 text-center">
            <span class="text-yellow-500">★★★★★</span>
          </td>
          <td class="px-6 py-4 text-center">
            <span class="text-yellow-500">★★☆☆☆</span>
          </td>
          <td class="px-6 py-4 text-center">
            <span class="text-yellow-500">★★★★☆</span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Budget travelers, local experience</td>
        </tr>
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">Walking</td>
          <td class="px-6 py-4 text-center">
            <span class="text-yellow-500">★★★★★</span>
          </td>
          <td class="px-6 py-4 text-center">
            <span class="text-yellow-500">★★★★☆</span>
          </td>
          <td class="px-6 py-4 text-center">
            <span class="text-yellow-500">★★★★★</span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Centro Histórico exploration</td>
        </tr>
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">Car Rental</td>
          <td class="px-6 py-4 text-center">
            <span class="text-yellow-500">★★☆☆☆</span>
          </td>
          <td class="px-6 py-4 text-center">
            <span class="text-yellow-500">★★★★☆</span>
          </td>
          <td class="px-6 py-4 text-center">
            <span class="text-yellow-500">★★★★☆</span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Day trips, flexibility</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

---

## Practical Information Boxes

### Quick Trip Overview (At the beginning)

```html
<div class="not-prose mb-12 bg-blue-50 border-2 border-blue-300 rounded-xl p-8 shadow-lg">
  <h3 class="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
    <span class="text-3xl">ℹ️</span> Quick Trip Overview
  </h3>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white rounded-lg p-5 shadow-md">
      <p class="text-sm text-gray-600 mb-2">⏱️ Trip Duration</p>
      <p class="text-2xl font-bold text-gray-900">3 Days</p>
      <p class="text-xs text-gray-500 mt-1">2 nights minimum recommended</p>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
      <p class="text-sm text-gray-600 mb-2">💰 Average Budget</p>
      <p class="text-2xl font-bold text-gray-900">$900 MXN</p>
      <p class="text-xs text-gray-500 mt-1">Per person, per day (mid-range)</p>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
      <p class="text-sm text-gray-600 mb-2">🌡️ Best Season</p>
      <p class="text-2xl font-bold text-gray-900">Oct-Apr</p>
      <p class="text-xs text-gray-500 mt-1">Mild weather, fewer crowds</p>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
      <p class="text-sm text-gray-600 mb-2">🎯 Difficulty</p>
      <p class="text-2xl font-bold text-gray-900">Easy</p>
      <p class="text-xs text-gray-500 mt-1">Suitable for all fitness levels</p>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
      <p class="text-sm text-gray-600 mb-2">🗣️ Language</p>
      <p class="text-2xl font-bold text-gray-900">Spanish</p>
      <p class="text-xs text-gray-500 mt-1">Limited English in tourist areas</p>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
      <p class="text-sm text-gray-600 mb-2">💳 Currency</p>
      <p class="text-2xl font-bold text-gray-900">MXN</p>
      <p class="text-xs text-gray-500 mt-1">$1 USD ≈ $17 MXN</p>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
      <p class="text-sm text-gray-600 mb-2">🚶 Walking</p>
      <p class="text-2xl font-bold text-gray-900">~5 km/day</p>
      <p class="text-xs text-gray-500 mt-1">Centro is very walkable</p>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
      <p class="text-sm text-gray-600 mb-2">📱 WiFi/Data</p>
      <p class="text-2xl font-bold text-gray-900">Excellent</p>
      <p class="text-xs text-gray-500 mt-1">Free WiFi in most cafes/hotels</p>
    </div>
  </div>
</div>
```

### Safety & Health Information

```html
<div class="not-prose my-8 bg-green-50 border-2 border-green-300 rounded-xl p-6">
  <h4 class="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
    <span class="text-2xl">🛡️</span> Safety & Health Tips
  </h4>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Safety -->
    <div>
      <h5 class="font-semibold text-green-900 mb-3">Safety Considerations:</h5>
      <ul class="text-sm text-green-800 space-y-2">
        <li class="flex items-start gap-2">
          <span class="text-green-600 flex-shrink-0">✓</span>
          <span><strong>Generally safe:</strong> San Luis Potosí is one of Mexico's safest cities for tourists</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-600 flex-shrink-0">✓</span>
          <span><strong>Centro Histórico:</strong> Very safe during day and evening; well-lit and patrolled</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-600 flex-shrink-0">✓</span>
          <span><strong>Avoid:</strong> Walking alone late at night (after 11 PM) in peripheral areas</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-600 flex-shrink-0">✓</span>
          <span><strong>Valuables:</strong> Don't flash expensive jewelry; use hotel safe</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-600 flex-shrink-0">✓</span>
          <span><strong>Emergency:</strong> Dial 911 (police, ambulance, fire)</span>
        </li>
      </ul>
    </div>

    <!-- Health -->
    <div>
      <h5 class="font-semibold text-green-900 mb-3">Health & Hygiene:</h5>
      <ul class="text-sm text-green-800 space-y-2">
        <li class="flex items-start gap-2">
          <span class="text-green-600 flex-shrink-0">✓</span>
          <span><strong>Water:</strong> Don't drink tap water; stick to bottled water</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-600 flex-shrink-0">✓</span>
          <span><strong>Food safety:</strong> Choose busy restaurants; street food is generally safe</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-600 flex-shrink-0">✓</span>
          <span><strong>Altitude:</strong> 1,860m elevation - stay hydrated, take it easy first day</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-600 flex-shrink-0">✓</span>
          <span><strong>Sun protection:</strong> SPF 50+ essential year-round (strong UV at altitude)</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-600 flex-shrink-0">✓</span>
          <span><strong>Pharmacy:</strong> Farmacias Guadalajara open 24/7 (multiple locations)</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

### What to Pack Checklist

```html
<div class="not-prose my-12 bg-gray-50 border-2 border-gray-300 rounded-xl p-8">
  <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
    <span class="text-3xl">🎒</span> What to Pack for Your Trip
  </h3>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <!-- Essentials -->
    <div>
      <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span class="text-xl">📱</span> Essentials
      </h4>
      <ul class="space-y-2">
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Valid passport/ID</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Travel insurance documents</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Credit/debit cards + cash (MXN)</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Phone with roaming/local SIM</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Portable charger/power bank</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Hotel confirmations (printed)</span>
        </li>
      </ul>
    </div>

    <!-- Clothing -->
    <div>
      <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span class="text-xl">👕</span> Clothing
      </h4>
      <ul class="space-y-2">
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Comfortable walking shoes</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Lightweight layers (mornings cool)</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Sun hat & sunglasses</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Light jacket for evenings</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Modest clothing (churches)</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Swimwear (if hotel has pool)</span>
        </li>
      </ul>
    </div>

    <!-- Health & Comfort -->
    <div>
      <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span class="text-xl">💊</span> Health & Comfort
      </h4>
      <ul class="space-y-2">
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Sunscreen SPF 50+</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Refillable water bottle</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Hand sanitizer & wet wipes</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Basic medications (pain relief, etc.)</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Antidiarrheal (just in case)</span>
        </li>
        <li class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" disabled />
          <span>Insect repellent (if visiting parks)</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
    <p class="text-blue-900 text-sm">
      <strong>💡 Packing Tip:</strong> Bring an empty daypack for carrying water, snacks, and purchases while exploring. Most hotels provide toiletries, so you can pack light on those items.
    </p>
  </div>
</div>
```

---

## Photo Integration

### Photo Gallery for Day/Section

```html
<div class="not-prose my-12">
  <h3 class="text-2xl font-semibold mb-6 text-gray-900">📸 Photo Highlights from Day 1</h3>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="relative group rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all">
      <img
        src="https://images.unsplash.com/photo-1?w=400&h=300&fit=crop&q=80"
        alt="Catedral Metropolitana exterior"
        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
        <p class="text-white text-sm font-semibold">Catedral Metropolitana</p>
      </div>
    </div>

    <div class="relative group rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all">
      <img
        src="https://images.unsplash.com/photo-2?w=400&h=300&fit=crop&q=80"
        alt="Local market artisan crafts"
        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
        <p class="text-white text-sm font-semibold">Artisan Market</p>
      </div>
    </div>

    <div class="relative group rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all">
      <img
        src="https://images.unsplash.com/photo-3?w=400&h=300&fit=crop&q=80"
        alt="Traditional potosina cuisine"
        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
        <p class="text-white text-sm font-semibold">Enchiladas Potosinas</p>
      </div>
    </div>

    <div class="relative group rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all">
      <img
        src="https://images.unsplash.com/photo-4?w=400&h=300&fit=crop&q=80"
        alt="Sunset at Alameda park"
        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
        <p class="text-white text-sm font-semibold">Alameda Sunset</p>
      </div>
    </div>
  </div>
</div>
```

---

## Local Tips & Insider Secrets

### Local Insider Tips Section

```html
<div class="not-prose my-12 bg-purple-50 border-2 border-purple-300 rounded-2xl p-8">
  <h3 class="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-3">
    <span class="text-3xl">🤫</span> Local Insider Tips & Hidden Gems
  </h3>

  <div class="space-y-6">
    <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
      <h4 class="font-semibold text-purple-900 mb-3 flex items-center gap-2">
        <span>🌮</span> Best Street Food (Locals' Secret)
      </h4>
      <p class="text-gray-700 mb-3">
        Skip the tourist traps near Plaza de Armas. Head to <strong>Mercado República</strong> (5 blocks north) where locals eat. Try the tacos de guisado at "Doña Mary's" stand—only $12 MXN each and absolutely delicious. Get there before 2 PM when they sell out.
      </p>
      <p class="text-sm text-purple-800">
        <strong>Location:</strong> Mercado República, Av. Universidad 555 • <strong>Hours:</strong> 9 AM - 3 PM Mon-Sat
      </p>
    </div>

    <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
      <h4 class="font-semibold text-blue-900 mb-3 flex items-center gap-2">
        <span>📸</span> Photo Spot Tourists Miss
      </h4>
      <p class="text-gray-700 mb-3">
        Everyone photographs the cathedral from street level. Take the elevator to the 5th floor of <strong>Palacio de Gobierno</strong> (free, open to public) for stunning rooftop views of the cathedral towers and Centro. Best at golden hour (6-7 PM).
      </p>
      <p class="text-sm text-blue-800">
        <strong>Pro Tip:</strong> Security will ask you to sign in—just show ID. Tell them "voy al mirador" (going to viewpoint).
      </p>
    </div>

    <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
      <h4 class="font-semibold text-green-900 mb-3 flex items-center gap-2">
        <span>💰</span> Money-Saving Hack
      </h4>
      <p class="text-gray-700 mb-3">
        Buy a <strong>"Tarjeta Yo Voy"</strong> transport card at any OXXO convenience store. Load $100 MXN and get 12 bus rides instead of 10 (20% savings). Works on all city buses and costs $15 MXN for the card.
      </p>
      <p class="text-sm text-green-800">
        <strong>Where to buy:</strong> Any OXXO, 7-Eleven, or at bus terminals
      </p>
    </div>

    <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-yellow-500">
      <h4 class="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
        <span>🏛️</span> Free Sundays
      </h4>
      <p class="text-gray-700 mb-3">
        Most museums in SLP offer <strong>free admission on Sundays</strong>: Museo Nacional de la Máscara, Museo del Ferrocarril, Museo Federico Silva, and Centro de las Artes all waive entrance fees. Plan your museum day for Sunday and save $200+ MXN per person.
      </p>
      <p class="text-sm text-yellow-800">
        <strong>Note:</strong> Arrive early (10-11 AM) as it gets crowded with local families by noon.
      </p>
    </div>

    <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-red-500">
      <h4 class="font-semibold text-red-900 mb-3 flex items-center gap-2">
        <span>☕</span> Best Coffee (Not Tourist Traps)
      </h4>
      <p class="text-gray-700 mb-3">
        <strong>Café Cortázar</strong> (hidden on Calle Zaragoza) serves the best coffee in Centro—beans roasted in-house from Veracruz. A cappuccino is $45 MXN vs. $80+ at Starbucks. Cozy courtyard seating, free WiFi, and friendly baristas who speak some English.
      </p>
      <p class="text-sm text-red-800">
        <strong>Hidden location:</strong> Calle Zaragoza 275 (between Escobedo & Aldama) • Opens 8 AM daily
      </p>
    </div>

    <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-indigo-500">
      <h4 class="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
        <span>🎭</span> Cultural Experience
      </h4>
      <p class="text-gray-700 mb-3">
        Every Saturday at 8 PM, <strong>free traditional dance performances</strong> happen at Plaza del Carmen. Bring a blanket, grab street food from nearby vendors, and enjoy folk ballet showcasing regional dances. It's magical and totally free.
      </p>
      <p class="text-sm text-indigo-800">
        <strong>Duration:</strong> ~45 minutes • <strong>Tip:</strong> Arrive by 7:30 PM for good seating near fountain
      </p>
    </div>
  </div>
</div>
```

---

## Weather & Seasonal Guides

### Best Time to Visit

```html
<section id="best-time-to-visit" class="mb-12">
  <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Best Time to Visit San Luis Potosí</h2>

  <p class="text-gray-700 mb-8">
    San Luis Potosí enjoys a semi-arid climate with significant temperature variations between day and night due to its 1,860m elevation. The best time to visit depends on your preferences for weather, crowds, and local events.
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    <!-- High Season -->
    <div class="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-8">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">✨</span>
        <div>
          <h3 class="text-2xl font-bold text-green-900">High Season</h3>
          <p class="text-sm text-green-700">October - April</p>
        </div>
      </div>

      <div class="mb-6">
        <h4 class="font-semibold text-green-900 mb-2">Weather:</h4>
        <ul class="text-sm text-gray-700 space-y-1">
          <li>• <strong>Temperature:</strong> 15-25°C (59-77°F) daytime</li>
          <li>• <strong>Rainfall:</strong> Minimal (dry season)</li>
          <li>• <strong>Humidity:</strong> Low (~40%)</li>
          <li>• <strong>Skies:</strong> Clear and sunny most days</li>
        </ul>
      </div>

      <div class="mb-6">
        <h4 class="font-semibold text-green-900 mb-2">Pros:</h4>
        <ul class="text-sm text-gray-700 space-y-1">
          <li>✓ Perfect weather for sightseeing & outdoor activities</li>
          <li>✓ Pleasant evenings (bring light jacket)</li>
          <li>✓ Low chance of rain disrupting plans</li>
          <li>✓ Major festivals (Semana Santa in March/April)</li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-green-900 mb-2">Cons:</h4>
        <ul class="text-sm text-gray-700 space-y-1">
          <li>✗ Higher hotel prices (+30-50%)</li>
          <li>✗ More tourists, especially Dec-Feb</li>
          <li>✗ Need to book restaurants/hotels ahead</li>
        </ul>
      </div>
    </div>

    <!-- Low Season -->
    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-8">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">🌧️</span>
        <div>
          <h3 class="text-2xl font-bold text-yellow-900">Low Season</h3>
          <p class="text-sm text-yellow-700">May - September</p>
        </div>
      </div>

      <div class="mb-6">
        <h4 class="font-semibold text-yellow-900 mb-2">Weather:</h4>
        <ul class="text-sm text-gray-700 space-y-1">
          <li>• <strong>Temperature:</strong> 25-35°C (77-95°F) daytime</li>
          <li>• <strong>Rainfall:</strong> Afternoon thunderstorms common (Jun-Aug)</li>
          <li>• <strong>Humidity:</strong> Moderate (~60%)</li>
          <li>• <strong>Pattern:</strong> Hot mornings, rain 4-6 PM, cool evenings</li>
        </ul>
      </div>

      <div class="mb-6">
        <h4 class="font-semibold text-yellow-900 mb-2">Pros:</h4>
        <ul class="text-sm text-gray-700 space-y-1">
          <li>✓ Lower hotel rates (30-40% off)</li>
          <li>✓ Fewer tourists—attractions less crowded</li>
          <li>✓ Lush green landscapes after rain</li>
          <li>✓ Easier last-minute bookings</li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-yellow-900 mb-2">Cons:</h4>
        <ul class="text-sm text-gray-700 space-y-1">
          <li>✗ Afternoon rain may disrupt outdoor plans</li>
          <li>✗ Hot midday temperatures (30°C+)</li>
          <li>✗ Some outdoor tours may cancel due to weather</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Month-by-Month Guide -->
  <div class="overflow-x-auto mb-8">
    <table class="min-w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Month</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Avg Temp</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Rainfall</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Crowds</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Events/Notes</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-green-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">January</td>
          <td class="px-6 py-4 text-center text-sm text-gray-700">18°C</td>
          <td class="px-6 py-4 text-center text-sm text-blue-600">Low</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Medium
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Cool & pleasant. New Year celebrations.</td>
        </tr>
        <tr class="hover:bg-green-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">February</td>
          <td class="px-6 py-4 text-center text-sm text-gray-700">20°C</td>
          <td class="px-6 py-4 text-center text-sm text-blue-600">Low</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Medium
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Ideal weather. Carnival celebrations mid-month.</td>
        </tr>
        <tr class="hover:bg-green-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">March</td>
          <td class="px-6 py-4 text-center text-sm text-gray-700">22°C</td>
          <td class="px-6 py-4 text-center text-sm text-blue-600">Low</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              High
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Semana Santa (Easter week). Book ahead!</td>
        </tr>
        <tr class="hover:bg-green-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">April</td>
          <td class="px-6 py-4 text-center text-sm text-gray-700">24°C</td>
          <td class="px-6 py-4 text-center text-sm text-blue-600">Low</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Medium
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Getting warmer. Last of dry season.</td>
        </tr>
        <tr class="hover:bg-yellow-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">May</td>
          <td class="px-6 py-4 text-center text-sm text-gray-700">26°C</td>
          <td class="px-6 py-4 text-center text-sm text-orange-600">Medium</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Low
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Hot days. Occasional rain starts. Low crowds.</td>
        </tr>
        <tr class="hover:bg-yellow-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">June</td>
          <td class="px-6 py-4 text-center text-sm text-gray-700">28°C</td>
          <td class="px-6 py-4 text-center text-sm text-red-600">High</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Low
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Rainy season begins. Afternoon storms.</td>
        </tr>
        <tr class="hover:bg-yellow-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">July</td>
          <td class="px-6 py-4 text-center text-sm text-gray-700">27°C</td>
          <td class="px-6 py-4 text-center text-sm text-red-600">High</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Low
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Frequent rain 4-6 PM. Plan mornings.</td>
        </tr>
        <tr class="hover:bg-yellow-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">August</td>
          <td class="px-6 py-4 text-center text-sm text-gray-700">27°C</td>
          <td class="px-6 py-4 text-center text-sm text-red-600">High</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Low
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Peak rainy season. Green landscapes.</td>
        </tr>
        <tr class="hover:bg-yellow-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">September</td>
          <td class="px-6 py-4 text-center text-sm text-gray-700">25°C</td>
          <td class="px-6 py-4 text-center text-sm text-orange-600">Medium</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Low
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Independence Day (Sept 16). Rain decreasing.</td>
        </tr>
        <tr class="hover:bg-green-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">October</td>
          <td class="px-6 py-4 text-center text-sm text-gray-700">22°C</td>
          <td class="px-6 py-4 text-center text-sm text-blue-600">Low</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Medium
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Perfect weather returns. Day of Dead (Oct 31-Nov 2).</td>
        </tr>
        <tr class="hover:bg-green-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">November</td>
          <td class="px-6 py-4 text-center text-sm text-gray-700">20°C</td>
          <td class="px-6 py-4 text-center text-sm text-blue-600">Low</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Medium
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Excellent weather. Revolution Day (Nov 20).</td>
        </tr>
        <tr class="hover:bg-green-50">
          <td class="px-6 py-4 text-sm font-medium text-gray-900">December</td>
          <td class="px-6 py-4 text-center text-sm text-gray-700">18°C</td>
          <td class="px-6 py-4 text-center text-sm text-blue-600">Low</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              High
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">Christmas season. Book early. Festive atmosphere.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Recommendation -->
  <div class="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-6 rounded-r-xl">
    <h4 class="text-lg font-semibold text-green-900 mb-3">🎯 Our Recommendation:</h4>
    <p class="text-gray-700 mb-3">
      For the best overall experience, visit in <strong>October, November, or February</strong>. You'll enjoy perfect weather (18-22°C), minimal rain, manageable crowds, and reasonable hotel prices. Avoid March-April (Semana Santa) unless you enjoy crowds and higher prices.
    </p>
    <p class="text-gray-700">
      <strong>Budget travelers:</strong> June-September offers 40% lower hotel rates and fewer tourists—just plan activities for mornings before afternoon rain (typically 4-6 PM).
    </p>
  </div>
</section>
```

---

## Complete Example

```html
<!-- TABLE OF CONTENTS (Yellow Box) -->
<div class="bg-yellow-50 p-6 rounded-lg mb-8">
  <h2 class="text-xl font-semibold mb-4">📋 Guía de Contenido</h2>
  <ul class="list-disc pl-6 space-y-1">
    <li><a href="#introduction" class="text-blue-600 hover:text-blue-800">Introduction</a></li>
    <li><a href="#quick-overview" class="text-blue-600 hover:text-blue-800">Quick Trip Overview</a></li>
    <li><a href="#best-time" class="text-blue-600 hover:text-blue-800">Best Time to Visit</a></li>
    <li><a href="#getting-there" class="text-blue-600 hover:text-blue-800">Getting There & Around</a></li>
    <li><a href="#budget-overview" class="text-blue-600 hover:text-blue-800">Budget Overview</a></li>
    <li><a href="#day-1" class="text-blue-600 hover:text-blue-800">Day 1: Centro Histórico</a></li>
    <li><a href="#day-2" class="text-blue-600 hover:text-blue-800">Day 2: Museums & Culture</a></li>
    <li><a href="#day-3" class="text-blue-600 hover:text-blue-800">Day 3: Day Trips</a></li>
    <li><a href="#where-to-stay" class="text-blue-600 hover:text-blue-800">Where to Stay</a></li>
    <li><a href="#what-to-pack" class="text-blue-600 hover:text-blue-800">What to Pack</a></li>
    <li><a href="#local-tips" class="text-blue-600 hover:text-blue-800">Local Tips & Insider Secrets</a></li>
    <li><a href="#faq" class="text-blue-600 hover:text-blue-800">FAQ</a></li>
  </ul>
</div>

<!-- QUICK TRIP OVERVIEW (Blue Box) -->
<!-- [Insert Quick Trip Overview component here] -->

<!-- WRAPPER PRINCIPAL -->
<div class="prose prose-lg max-w-none">

  <!-- INTRODUCTION -->
  <section id="introduction" class="mb-12">
    <p class="text-lg text-gray-700 mb-8">
      <strong>San Luis Potosí, often overlooked by international travelers, is one of Mexico's most charming colonial cities. With stunning baroque architecture, vibrant cultural scene, delicious regional cuisine, and proximity to surreal destinations like Real de Catorce and Xilitla, this 3-day itinerary will help you experience the best of what "SLP" has to offer.</strong>
    </p>
  </section>

  <!-- DAY 1: CENTRO HISTÓRICO -->
  <!-- [Insert Day Header with Overview] -->
  <!-- [Insert Daily Timeline] -->
  <!-- [Insert Activity Cards for each stop] -->
  <!-- [Insert Photo Gallery for day] -->
  <!-- [Insert Daily Budget Summary] -->

  <!-- DAY 2: MUSEUMS & CULTURE -->
  <!-- [Similar structure to Day 1] -->

  <!-- DAY 3: DAY TRIPS -->
  <!-- [Similar structure with focus on excursions] -->

  <!-- WHERE TO STAY -->
  <section id="where-to-stay" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Where to Stay in San Luis Potosí</h2>
    <!-- [Hotel recommendations by area & budget] -->
  </section>

  <!-- WHAT TO PACK -->
  <!-- [Insert What to Pack Checklist] -->

  <!-- LOCAL TIPS & INSIDER SECRETS -->
  <!-- [Insert Local Insider Tips Section] -->

  <!-- FAQ SECTION -->
  <section id="faq" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Frequently Asked Questions</h2>

    <div class="space-y-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-3 text-gray-900">Is San Luis Potosí safe for tourists?</h3>
        <p class="text-gray-700">
          Yes, San Luis Potosí is considered one of the safest cities in Mexico for tourists. The Centro Histórico area is well-policed and safe to walk around during day and evening hours. As with any city, use common sense: don't flash valuables, avoid walking alone very late at night in peripheral areas, and stick to well-lit main streets after dark.
        </p>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-3 text-gray-900">Do I need to speak Spanish?</h3>
        <p class="text-gray-700">
          While English is not widely spoken outside tourist hotels, you can get by with basic Spanish phrases and translation apps. Most restaurant menus are Spanish-only, and taxi drivers typically don't speak English (use Uber app instead for ease). Learning basics like "¿Cuánto cuesta?" (how much?), "La cuenta, por favor" (the check please), and "¿Dónde está...?" (where is...?) will help significantly.
        </p>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-3 text-gray-900">What's the best way to get around the city?</h3>
        <p class="text-gray-700">
          For tourists, <strong>Uber is the most convenient option</strong> (affordable, safe, and drivers use GPS). Centro Histórico is extremely walkable—most major sights are within 15-20 minute walk. Public buses are cheap ($10 MXN) but require local knowledge. Avoid renting a car for city exploration due to parking challenges; save it for day trips to Real de Catorce or Xilitla.
        </p>
      </div>

      <!-- More FAQ items -->
    </div>
  </section>

  <!-- FINAL CTA (Green) -->
  <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-8 rounded-r-lg">
    <h3 class="text-lg font-semibold mb-3 text-green-900">Ready to Explore San Luis Potosí?</h3>
    <p class="text-green-800 mb-3">
      <strong>Need help planning your perfect trip or have questions about this itinerary? Our travel experts can customize this itinerary to your interests and budget.</strong>
    </p>
    <p class="text-green-800">
      <a href="/contact" class="text-blue-600 hover:text-blue-800 underline font-semibold">Contact Us for Personalized Planning →</a>
    </p>
  </div>

</div>
```

---

## Reglas de Consistencia

### ✅ OBLIGATORIO:
1. **Tabla de Contenidos** (amarilla) al inicio
2. **Quick Trip Overview** (azul) con facts clave
3. **Day headers** con stats visuales (distancia, tiempo, presupuesto, actividades)
4. **Timeline visual** para cada día con color-coding por período del día
5. **Activity cards detalladas** con ubicación, horarios, costos, tips
6. **Budget breakdown** por día y por estilo de viaje (budget/mid-range/luxury)
7. **Map integration** con Google Maps links
8. **Practical information boxes** (seguridad, clima, transporte, qué empacar)
9. **Local insider tips** section con secretos locales
10. **Photo galleries** estratégicamente ubicadas (mínimo 1 por día)
11. **FAQ section** al final
12. **Final CTA** (verde) linkando a contacto o guías relacionadas
13. **15-25 imágenes** total a lo largo del artículo

### Color-Coding por Tipo de Información:
- **Azul** = Información general, overviews, datos prácticos
- **Verde** = Éxito, recomendaciones, CTAs, información de seguridad positiva
- **Amarillo** = Tabla de contenidos, highlights del día, consejos
- **Rojo** = Advertencias, safety warnings, información crítica
- **Purple** = Headers de día, insider tips, información premium
- **Orange/Yellow** = Baja temporada, advertencias climáticas

### Color-Coding por Período del Día (Timeline):
- **Blue** - Mañana (6 AM - 12 PM)
- **Green** - Mediodía (12 PM - 3 PM)
- **Yellow** - Tarde (3 PM - 6 PM)
- **Purple** - Noche (6 PM - 10 PM)
- **Indigo** - Noche tardía (10 PM+)

### Iconos Recomendados:
- **🗓️** - Itinerario, fechas, cronograma
- **📍** - Ubicaciones, mapas, direcciones
- **💰** - Presupuesto, costos, precios
- **🍽️** - Restaurantes, comida
- **🏛️** - Atracciones culturales, museos
- **🥾** - Actividades al aire libre, hiking
- **🚕** - Transporte, taxis, Uber
- **🏨** - Hoteles, alojamiento
- **🎒** - Qué empacar, equipo necesario
- **⏱️** - Duración, tiempo
- **🌡️** - Clima, temperatura
- **💡** - Tips, consejos
- **⚠️** - Advertencias, precauciones
- **📸** - Photo spots, galerías
- **🤫** - Insider secrets, tips locales
- **✨** - Highlights, mejores opciones
- **🎯** - Recomendaciones, verdicts

---

**Fecha de creación:** Enero 2025
**Última actualización:** Enero 21, 2025
**Versión:** 1.0

> 💡 **Nota Importante:** Los itinerarios deben ser prácticos y realistas. Siempre incluir tiempos de traslado, costos detallados, y alternativas para diferentes presupuestos. NUNCA incluir información no verificada—todas las recomendaciones deben estar respaldadas por fuentes confiables (sitios oficiales de turismo, reviews verificados, expertos locales).
