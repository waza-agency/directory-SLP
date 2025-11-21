# Checklist Blog Post Style Guide

> **Complete guide for creating practical, actionable checklist articles for expats and residents in San Luis Potosí**

## 📋 Table of Contents

- [⚠️ CRITICAL RULE: Verified Information Only](#️-critical-rule-verified-information-only)
- [Overview & Philosophy](#overview--philosophy)
- [Base Structure](#base-structure)
- [Checklist Components](#checklist-components)
- [Progress Tracking](#progress-tracking)
- [Category Organization](#category-organization)
- [Information Boxes](#information-boxes)
- [Timeline Integration](#timeline-integration)
- [Resource Links](#resource-links)
- [Complete Example](#complete-example)

---

## ⚠️ CRITICAL RULE: Verified Information Only

**NEVER UNDER ANY CIRCUMSTANCE INCLUDE INFORMATION THAT IS NOT VERIFIED.**

### Mandatory Guidelines:
- ❌ **NEVER** include requirements or steps you haven't verified with official sources
- ❌ **NEVER** claim personal experience with processes you haven't completed
- ❌ **NEVER** provide specific costs without citing current sources
- ✅ **ALWAYS** link to official government websites for requirements
- ✅ **ALWAYS** cite sources for prices, timelines, and processes
- ✅ **ALWAYS** include disclaimer that requirements may change
- ✅ **ALWAYS** provide last-updated dates for critical information

**Examples:**
- ❌ BAD: "We completed this process in 3 weeks"
- ✅ GOOD: "According to the official INM website and recent expat reports, this typically takes 4-6 weeks"
- ❌ BAD: "The fee is $50"
- ✅ GOOD: "As of January 2025, the official fee listed on the government site is $50 USD (verify current rate)"

---

## Overview & Philosophy

### What is a Checklist Post?

Checklist posts are **practical, action-oriented guides** that:
- **Break down complex processes** into step-by-step tasks
- **Provide clear checkboxes** that readers can mark off
- **Include specific timelines** for each step
- **Link to official resources** and required documents
- **Organize by categories** (documents, costs, timeline, contacts)
- **Offer practical tips** based on real experiences
- **Help readers avoid common mistakes**

### Ideal Length
- **2,000 - 4,000 words**
- **15-30 checklist items** organized in 3-5 categories
- **4-6 main sections**
- **3-5 information boxes** with tips/warnings
- **Multiple resource links** throughout

### Best Topics for Checklists
- Moving/relocation checklists
- Visa/immigration processes
- Setting up utilities and services
- Finding housing step-by-step
- Starting a business requirements
- Emergency preparation
- Monthly/seasonal maintenance
- Event planning guides

---

## Base Structure

### Required Sections (in order)

1. **Hero Introduction** - What this checklist covers
2. **Table of Contents** (yellow box)
3. **Quick Overview** (blue box) - Timeline and key stats
4. **Checklist Categories** - Main content organized by category
5. **Timeline Visualization** - When to do each step
6. **Common Mistakes to Avoid** (red/yellow box)
7. **Resources & Contacts** (blue box)
8. **FAQ Section**
9. **Final CTA** (green) - Offer expert help

### Wrapper Principal
```html
<div class="prose prose-lg max-w-none">
  <!-- Todo el contenido del checklist post aquí -->
</div>
```

---

## Checklist Components

### 1. Master Checklist with Categories (Obligatorio)

**Use this as the main structure:**

```html
<div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg mb-12">
  <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">Complete Checklist: [Process Name]</h2>
  <p class="text-center text-gray-600 mb-8 italic">Check off each item as you complete it</p>

  <!-- Category 1: Documents -->
  <div class="bg-white rounded-xl p-6 mb-6 shadow-md">
    <h3 class="text-2xl font-semibold text-blue-900 mb-4 flex items-center gap-3">
      <span class="text-3xl">📄</span> Documents to Gather
    </h3>

    <div class="space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-blue-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Passport (valid for at least 6 months)</p>
          <p class="text-sm text-gray-600 mt-1">Make 3 copies - keep one with you, one at home, one with trusted contact</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-blue-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Birth certificate with apostille</p>
          <p class="text-sm text-gray-600 mt-1">Must be official and translated to Spanish by certified translator</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-blue-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Proof of address</p>
          <p class="text-sm text-gray-600 mt-1">Utility bill, lease agreement, or bank statement (less than 3 months old)</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-blue-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Bank statements</p>
          <p class="text-sm text-gray-600 mt-1">Last 3 months showing minimum balance of $2,000 USD per month</p>
        </div>
      </label>
    </div>
  </div>

  <!-- Category 2: Administrative Steps -->
  <div class="bg-white rounded-xl p-6 mb-6 shadow-md">
    <h3 class="text-2xl font-semibold text-green-900 mb-4 flex items-center gap-3">
      <span class="text-3xl">🏛️</span> Administrative Steps
    </h3>

    <div class="space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-green-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Make appointment at INM (Immigration office)</p>
          <p class="text-sm text-gray-600 mt-1">Book online at <a href="https://citas.inm.gob.mx/" target="_blank" class="text-blue-600 hover:underline">citas.inm.gob.mx</a> - appointments fill up 2-3 weeks in advance</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-green-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Pay application fee at bank</p>
          <p class="text-sm text-gray-600 mt-1">Current fee: $4,910 MXN (approximately $280 USD) - verify current rate</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-green-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Attend INM appointment</p>
          <p class="text-sm text-gray-600 mt-1">Arrive 15 minutes early with all documents organized in a folder</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-green-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Submit biometric data</p>
          <p class="text-sm text-gray-600 mt-1">Photos and fingerprints will be taken at the office</p>
        </div>
      </label>
    </div>
  </div>

  <!-- Category 3: Follow-up -->
  <div class="bg-white rounded-xl p-6 shadow-md">
    <h3 class="text-2xl font-semibold text-purple-900 mb-4 flex items-center gap-3">
      <span class="text-3xl">📬</span> Follow-up & Collection
    </h3>

    <div class="space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-purple-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Wait for notification (typically 2-4 weeks)</p>
          <p class="text-sm text-gray-600 mt-1">Check email daily and monitor INM tracking system</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-purple-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Pick up your document</p>
          <p class="text-sm text-gray-600 mt-1">Bring original passport and pickup notification</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-purple-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Verify all information is correct</p>
          <p class="text-sm text-gray-600 mt-1">Check name spelling, dates, and photo before leaving the office</p>
        </div>
      </label>
    </div>
  </div>

  <!-- Summary Progress Bar -->
  <div class="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl text-center">
    <p class="text-lg font-semibold mb-2">Track Your Progress</p>
    <p class="text-sm opacity-90">Check off items above to visualize your completion</p>
    <div class="mt-4 bg-white/20 rounded-full h-4 overflow-hidden">
      <div class="bg-white h-full rounded-full transition-all" style="width: 0%" id="progress-bar"></div>
    </div>
    <p class="text-sm mt-2 opacity-90" id="progress-text">0 of 12 items completed (0%)</p>
  </div>
</div>
```

### 2. Simple Checklist (For shorter lists)

```html
<div class="bg-blue-50 p-6 rounded-lg mb-8">
  <h3 class="text-xl font-semibold mb-4 text-blue-900 flex items-center gap-2">
    <span>✅</span> Quick Checklist: [Topic]
  </h3>
  <ul class="space-y-2">
    <li class="flex items-center gap-3">
      <input type="checkbox" class="w-5 h-5 text-blue-600 rounded" />
      <span class="text-gray-800">First essential step or item</span>
    </li>
    <li class="flex items-center gap-3">
      <input type="checkbox" class="w-5 h-5 text-blue-600 rounded" />
      <span class="text-gray-800">Second important task</span>
    </li>
    <li class="flex items-center gap-3">
      <input type="checkbox" class="w-5 h-5 text-blue-600 rounded" />
      <span class="text-gray-800">Third critical action</span>
    </li>
  </ul>
</div>
```

### 3. Priority Checklist (By Urgency)

```html
<div class="space-y-6 mb-12">
  <!-- High Priority -->
  <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
    <h4 class="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
      <span class="text-2xl">🔴</span> High Priority - Complete First
    </h4>
    <div class="space-y-3">
      <label class="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" class="mt-1 w-5 h-5 text-red-600 rounded" />
        <span class="text-red-900">Critical task that must be done immediately (e.g., visa expiration approaching)</span>
      </label>
      <label class="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" class="mt-1 w-5 h-5 text-red-600 rounded" />
        <span class="text-red-900">Another urgent item with deadline within 1 week</span>
      </label>
    </div>
  </div>

  <!-- Medium Priority -->
  <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
    <h4 class="text-lg font-semibold text-yellow-900 mb-4 flex items-center gap-2">
      <span class="text-2xl">🟡</span> Medium Priority - Complete Within 2 Weeks
    </h4>
    <div class="space-y-3">
      <label class="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" class="mt-1 w-5 h-5 text-yellow-600 rounded" />
        <span class="text-yellow-900">Important task but not urgent (e.g., register at consulate)</span>
      </label>
      <label class="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" class="mt-1 w-5 h-5 text-yellow-600 rounded" />
        <span class="text-yellow-900">Another medium priority item</span>
      </label>
    </div>
  </div>

  <!-- Low Priority -->
  <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
    <h4 class="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
      <span class="text-2xl">🟢</span> Low Priority - Complete When Possible
    </h4>
    <div class="space-y-3">
      <label class="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" class="mt-1 w-5 h-5 text-green-600 rounded" />
        <span class="text-green-900">Nice-to-have task (e.g., join expat Facebook groups)</span>
      </label>
      <label class="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" class="mt-1 w-5 h-5 text-green-600 rounded" />
        <span class="text-green-900">Optional but recommended activity</span>
      </label>
    </div>
  </div>
</div>
```

---

## Progress Tracking

### Visual Progress Indicator

```html
<div class="bg-white border-2 border-gray-200 rounded-xl p-8 mb-12">
  <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Your Progress Through The Process</h3>

  <div class="relative">
    <!-- Progress Line -->
    <div class="absolute left-1/2 transform -translate-x-1/2 top-8 bottom-8 w-1 bg-gray-200"></div>

    <div class="space-y-12">
      <!-- Stage 1 -->
      <div class="relative flex items-center">
        <div class="flex-1 text-right pr-8">
          <h4 class="text-lg font-semibold text-gray-900">Week 1: Preparation</h4>
          <p class="text-sm text-gray-600">Gather all required documents</p>
        </div>
        <div class="relative z-10 flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white">
          ✓
        </div>
        <div class="flex-1 pl-8">
          <p class="text-sm text-gray-600">Status: <span class="font-semibold text-green-600">Completed</span></p>
        </div>
      </div>

      <!-- Stage 2 -->
      <div class="relative flex items-center">
        <div class="flex-1 text-right pr-8">
          <h4 class="text-lg font-semibold text-gray-900">Week 2-3: Application</h4>
          <p class="text-sm text-gray-600">Submit application and attend appointment</p>
        </div>
        <div class="relative z-10 flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white animate-pulse">
          2
        </div>
        <div class="flex-1 pl-8">
          <p class="text-sm text-gray-600">Status: <span class="font-semibold text-blue-600">In Progress</span></p>
        </div>
      </div>

      <!-- Stage 3 -->
      <div class="relative flex items-center">
        <div class="flex-1 text-right pr-8">
          <h4 class="text-lg font-semibold text-gray-400">Week 4-6: Processing</h4>
          <p class="text-sm text-gray-400">Wait for approval notification</p>
        </div>
        <div class="relative z-10 flex-shrink-0 w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white">
          3
        </div>
        <div class="flex-1 pl-8">
          <p class="text-sm text-gray-400">Status: <span class="font-semibold">Pending</span></p>
        </div>
      </div>

      <!-- Stage 4 -->
      <div class="relative flex items-center">
        <div class="flex-1 text-right pr-8">
          <h4 class="text-lg font-semibold text-gray-400">Week 7: Collection</h4>
          <p class="text-sm text-gray-400">Pick up your approved document</p>
        </div>
        <div class="relative z-10 flex-shrink-0 w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white">
          4
        </div>
        <div class="flex-1 pl-8">
          <p class="text-sm text-gray-400">Status: <span class="font-semibold">Pending</span></p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Completion Summary Box

```html
<div class="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 p-6 rounded-xl mb-8">
  <div class="flex items-center justify-between">
    <div>
      <h4 class="text-xl font-semibold text-gray-900 mb-2">Checklist Summary</h4>
      <p class="text-sm text-gray-600">Track your overall progress</p>
    </div>
    <div class="text-center">
      <div class="text-4xl font-bold text-green-600">65%</div>
      <p class="text-sm text-gray-600">Complete</p>
    </div>
  </div>
  <div class="mt-4 grid grid-cols-3 gap-4">
    <div class="bg-white p-4 rounded-lg text-center">
      <p class="text-2xl font-bold text-green-600">18</p>
      <p class="text-xs text-gray-600">Completed</p>
    </div>
    <div class="bg-white p-4 rounded-lg text-center">
      <p class="text-2xl font-bold text-blue-600">5</p>
      <p class="text-xs text-gray-600">In Progress</p>
    </div>
    <div class="bg-white p-4 rounded-lg text-center">
      <p class="text-2xl font-bold text-gray-400">7</p>
      <p class="text-xs text-gray-600">Remaining</p>
    </div>
  </div>
</div>
```

---

## Category Organization

### Timeline-Based Categories

```html
<section class="mb-12">
  <h2 class="text-3xl font-bold mb-8 text-gray-900 border-b-2 border-blue-200 pb-2">Checklist by Timeline</h2>

  <!-- 1 Month Before -->
  <div class="mb-8">
    <div class="bg-red-100 border-l-4 border-red-600 p-4 mb-4">
      <h3 class="text-xl font-bold text-red-900 flex items-center gap-2">
        <span>📅</span> 1 Month Before Moving
      </h3>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <ul class="space-y-3">
        <li class="flex items-start gap-3">
          <input type="checkbox" class="mt-1 w-5 h-5 rounded" />
          <div>
            <p class="font-medium text-gray-900">Research neighborhoods in San Luis Potosí</p>
            <p class="text-sm text-gray-600">Focus on Centro, Lomas, or Valle de San Angel depending on budget</p>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <input type="checkbox" class="mt-1 w-5 h-5 rounded" />
          <div>
            <p class="font-medium text-gray-900">Book temporary accommodation for first week</p>
            <p class="text-sm text-gray-600">Airbnb or hotel near Centro to explore before committing to rental</p>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- 2 Weeks Before -->
  <div class="mb-8">
    <div class="bg-yellow-100 border-l-4 border-yellow-600 p-4 mb-4">
      <h3 class="text-xl font-bold text-yellow-900 flex items-center gap-2">
        <span>📅</span> 2 Weeks Before Moving
      </h3>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <!-- Checklist items -->
    </div>
  </div>

  <!-- 1 Week Before -->
  <div class="mb-8">
    <div class="bg-orange-100 border-l-4 border-orange-600 p-4 mb-4">
      <h3 class="text-xl font-bold text-orange-900 flex items-center gap-2">
        <span>📅</span> 1 Week Before Moving
      </h3>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <!-- Checklist items -->
    </div>
  </div>

  <!-- First Week After Arrival -->
  <div class="mb-8">
    <div class="bg-green-100 border-l-4 border-green-600 p-4 mb-4">
      <h3 class="text-xl font-bold text-green-900 flex items-center gap-2">
        <span>📅</span> First Week After Arrival
      </h3>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <!-- Checklist items -->
    </div>
  </div>
</section>
```

---

## Information Boxes

### Cost Breakdown Box

```html
<div class="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-8">
  <h3 class="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
    <span class="text-2xl">💰</span> Total Cost Breakdown
  </h3>

  <div class="space-y-3">
    <div class="flex justify-between items-center p-3 bg-white rounded-lg">
      <span class="text-gray-700">Application fee</span>
      <span class="font-bold text-gray-900">$280 USD</span>
    </div>
    <div class="flex justify-between items-center p-3 bg-white rounded-lg">
      <span class="text-gray-700">Document translation</span>
      <span class="font-bold text-gray-900">$150 USD</span>
    </div>
    <div class="flex justify-between items-center p-3 bg-white rounded-lg">
      <span class="text-gray-700">Apostille service</span>
      <span class="font-bold text-gray-900">$75 USD</span>
    </div>
    <div class="flex justify-between items-center p-3 bg-white rounded-lg">
      <span class="text-gray-700">Passport photos</span>
      <span class="font-bold text-gray-900">$10 USD</span>
    </div>
    <div class="flex justify-between items-center p-4 bg-green-100 rounded-lg border-2 border-green-400 mt-4">
      <span class="text-lg font-semibold text-green-900">TOTAL ESTIMATED COST</span>
      <span class="text-2xl font-bold text-green-900">$515 USD</span>
    </div>
  </div>

  <p class="text-sm text-green-800 mt-4 italic">
    💡 Costs are estimates as of January 2025. Always verify current fees on official websites.
  </p>
</div>
```

### Common Mistakes Warning

```html
<div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
  <h3 class="text-xl font-semibold text-red-900 mb-4 flex items-center gap-2">
    <span class="text-2xl">⚠️</span> Common Mistakes to Avoid
  </h3>

  <ul class="space-y-3 text-red-900">
    <li class="flex items-start gap-3">
      <span class="text-red-600 font-bold">❌</span>
      <div>
        <p class="font-semibold">Not booking appointment early enough</p>
        <p class="text-sm text-red-800 mt-1">INM appointments fill up 2-3 weeks in advance. Book immediately once you have your documents.</p>
      </div>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-red-600 font-bold">❌</span>
      <div>
        <p class="font-semibold">Using uncertified translators</p>
        <p class="text-sm text-red-800 mt-1">Only translations from certified/authorized translators ("perito traductor") are accepted.</p>
      </div>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-red-600 font-bold">❌</span>
      <div>
        <p class="font-semibold">Forgetting to make copies</p>
        <p class="text-sm text-red-800 mt-1">Bring originals AND copies of EVERY document. They will keep the copies.</p>
      </div>
    </li>
  </ul>
</div>
```

### Pro Tips Box

```html
<div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
  <h3 class="text-xl font-semibold text-yellow-900 mb-4 flex items-center gap-2">
    <span class="text-2xl">💡</span> Pro Tips from Experienced Expats
  </h3>

  <div class="space-y-4">
    <div class="bg-white p-4 rounded-lg">
      <p class="font-semibold text-gray-900 mb-2">Tip #1: Make a "document wallet"</p>
      <p class="text-sm text-gray-700">Keep all originals and copies organized in a dedicated folder. You'll reference these documents multiple times.</p>
    </div>

    <div class="bg-white p-4 rounded-lg">
      <p class="font-semibold text-gray-900 mb-2">Tip #2: Join local expat WhatsApp groups</p>
      <p class="text-sm text-gray-700">Current residents can warn you about recent changes in requirements or recommend helpful services.</p>
    </div>

    <div class="bg-white p-4 rounded-lg">
      <p class="font-semibold text-gray-900 mb-2">Tip #3: Start the process early</p>
      <p class="text-sm text-gray-700">Even if your current visa isn't expiring soon, starting 3-4 months early reduces stress and gives buffer for delays.</p>
    </div>
  </div>
</div>
```

---

## Timeline Integration

### Overall Process Timeline

```html
<div class="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl mb-12">
  <h2 class="text-3xl font-bold text-center text-gray-900 mb-8">Complete Process Timeline</h2>

  <div class="max-w-4xl mx-auto">
    <div class="relative">
      <!-- Horizontal Timeline Line -->
      <div class="absolute top-1/2 left-0 right-0 h-1 bg-blue-300 transform -translate-y-1/2"></div>

      <div class="relative grid grid-cols-4 gap-4">
        <!-- Week 1 -->
        <div class="text-center">
          <div class="relative z-10 w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3 shadow-lg">
            Week<br/>1
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md">
            <p class="font-semibold text-sm text-gray-900 mb-2">Preparation</p>
            <p class="text-xs text-gray-600">Gather documents<br/>Get translations</p>
          </div>
        </div>

        <!-- Week 2-3 -->
        <div class="text-center">
          <div class="relative z-10 w-20 h-20 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3 shadow-lg">
            Week<br/>2-3
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md">
            <p class="font-semibold text-sm text-gray-900 mb-2">Application</p>
            <p class="text-xs text-gray-600">Book appointment<br/>Submit application</p>
          </div>
        </div>

        <!-- Week 4-6 -->
        <div class="text-center">
          <div class="relative z-10 w-20 h-20 mx-auto bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3 shadow-lg">
            Week<br/>4-6
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md">
            <p class="font-semibold text-sm text-gray-900 mb-2">Processing</p>
            <p class="text-xs text-gray-600">Wait for review<br/>Check status</p>
          </div>
        </div>

        <!-- Week 7 -->
        <div class="text-center">
          <div class="relative z-10 w-20 h-20 mx-auto bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3 shadow-lg">
            Week<br/>7
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md">
            <p class="font-semibold text-sm text-gray-900 mb-2">Collection</p>
            <p class="text-xs text-gray-600">Get notification<br/>Pick up card</p>
          </div>
        </div>
      </div>
    </div>

    <p class="text-center text-sm text-gray-600 mt-6 italic">
      ⏱️ Total estimated time: 6-8 weeks from start to finish
    </p>
  </div>
</div>
```

---

## Resource Links

### Official Resources Box

```html
<div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
  <h3 class="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
    <span class="text-2xl">🔗</span> Official Resources & Contacts
  </h3>

  <div class="space-y-4">
    <div>
      <h4 class="font-semibold text-blue-900 mb-2">Government Offices</h4>
      <ul class="space-y-2 text-blue-800 text-sm">
        <li>
          <a href="https://www.inm.gob.mx/" target="_blank" class="hover:underline flex items-center gap-2">
            <span>📄</span> INM (Immigration) Official Website
          </a>
        </li>
        <li>
          <a href="https://citas.inm.gob.mx/" target="_blank" class="hover:underline flex items-center gap-2">
            <span>📅</span> INM Appointment Booking System
          </a>
        </li>
        <li>
          <p class="flex items-center gap-2">
            <span>📞</span> INM San Luis Potosí: +52 444 123 4567
          </p>
        </li>
        <li>
          <p class="flex items-center gap-2">
            <span>📍</span> Address: Av. Cordillera de los Andes 240, Lomas 4a Secc, 78216 San Luis Potosí
          </p>
        </li>
      </ul>
    </div>

    <div>
      <h4 class="font-semibold text-blue-900 mb-2">Helpful Services</h4>
      <ul class="space-y-2 text-blue-800 text-sm">
        <li>
          <a href="/services" class="hover:underline flex items-center gap-2">
            <span>🤝</span> San Luis Way Service Directory (relocation assistance)
          </a>
        </li>
        <li>
          <p class="flex items-center gap-2">
            <span>🌐</span> Expat Facebook Group: "Expats in San Luis Potosí"
          </p>
        </li>
      </ul>
    </div>

    <div>
      <h4 class="font-semibold text-blue-900 mb-2">Document Services</h4>
      <ul class="space-y-2 text-blue-800 text-sm">
        <li>
          <p class="flex items-center gap-2">
            <span>📝</span> Certified Translator: María González - +52 444 987 6543
          </p>
        </li>
        <li>
          <p class="flex items-center gap-2">
            <span>📋</span> Apostille Service: Notaría Pública #5 - Centro Histórico
          </p>
        </li>
      </ul>
    </div>
  </div>

  <div class="mt-4 p-4 bg-blue-100 rounded-lg">
    <p class="text-sm text-blue-900">
      <strong>💡 Need help navigating this process?</strong> Our local experts can guide you through every step.
      <a href="/contact" class="font-semibold underline hover:no-underline">Contact us for assistance →</a>
    </p>
  </div>
</div>
```

---

## Complete Example

```html
<!-- TABLE OF CONTENTS -->
<div class="bg-yellow-50 p-6 rounded-lg mb-8">
  <h2 class="text-xl font-semibold mb-4">Guía de Contenido</h2>
  <ul class="list-disc pl-6">
    <li><a href="#overview" class="text-blue-600 hover:text-blue-800">Overview & Timeline</a></li>
    <li><a href="#checklist" class="text-blue-600 hover:text-blue-800">Complete Checklist</a></li>
    <li><a href="#timeline" class="text-blue-600 hover:text-blue-800">Process Timeline</a></li>
    <li><a href="#costs" class="text-blue-600 hover:text-blue-800">Cost Breakdown</a></li>
    <li><a href="#mistakes" class="text-blue-600 hover:text-blue-800">Common Mistakes</a></li>
    <li><a href="#resources" class="text-blue-600 hover:text-blue-800">Resources & Contacts</a></li>
    <li><a href="#faq" class="text-blue-600 hover:text-blue-800">FAQ</a></li>
  </ul>
</div>

<!-- QUICK OVERVIEW -->
<div class="bg-blue-50 p-6 rounded-lg mb-8">
  <h3 class="text-lg font-semibold mb-4 text-blue-900">Quick Overview</h3>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="text-center">
      <p class="text-3xl font-bold text-blue-700">6-8</p>
      <p class="text-sm text-blue-800">Weeks Total</p>
    </div>
    <div class="text-center">
      <p class="text-3xl font-bold text-blue-700">$515</p>
      <p class="text-sm text-blue-800">Est. Cost (USD)</p>
    </div>
    <div class="text-center">
      <p class="text-3xl font-bold text-blue-700">25</p>
      <p class="text-sm text-blue-800">Checklist Items</p>
    </div>
    <div class="text-center">
      <p class="text-3xl font-bold text-blue-700">3</p>
      <p class="text-sm text-blue-800">Office Visits</p>
    </div>
  </div>
</div>

<!-- MAIN CONTENT WRAPPER -->
<div class="prose prose-lg max-w-none">

  <!-- INTRODUCTION -->
  <p class="text-lg text-gray-700 mb-8">
    <strong>Applying for temporary residency in San Luis Potosí can seem overwhelming, but this comprehensive checklist breaks down every step of the process. Follow this guide to ensure you don't miss any important documents or deadlines.</strong>
  </p>

  <!-- MASTER CHECKLIST -->
  <section id="checklist" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Complete Checklist</h2>

    <!-- Insert Master Checklist Component -->
  </section>

  <!-- TIMELINE -->
  <section id="timeline" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Process Timeline</h2>

    <!-- Insert Timeline Component -->
  </section>

  <!-- COST BREAKDOWN -->
  <section id="costs" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Total Cost Breakdown</h2>

    <!-- Insert Cost Breakdown Box -->
  </section>

  <!-- COMMON MISTAKES -->
  <section id="mistakes" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Common Mistakes to Avoid</h2>

    <!-- Insert Common Mistakes Warning -->
    <!-- Insert Pro Tips Box -->
  </section>

  <!-- RESOURCES -->
  <section id="resources" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Resources & Contacts</h2>

    <!-- Insert Official Resources Box -->
  </section>

  <!-- FAQ -->
  <section id="faq" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Frequently Asked Questions</h2>

    <div class="space-y-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-3 text-gray-900">How long does the entire process take?</h3>
        <p class="text-gray-700">The complete process typically takes 6-8 weeks from gathering documents to receiving your temporary resident card. Plan for up to 10 weeks to allow buffer for potential delays.</p>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-3 text-gray-900">Can I work while my application is being processed?</h3>
        <p class="text-gray-700">If you have a valid tourist visa or temporary resident status, you cannot work legally until you receive your temporary resident card with work authorization. Make sure to apply for work permission if needed.</p>
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <div class="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg mb-8">
    <h3 class="text-lg font-semibold mb-3 text-green-900">Need Expert Help?</h3>
    <p class="text-green-800 mb-3">
      <strong>Navigating Mexican immigration can be complex. Our local experts have helped hundreds of expats successfully relocate to San Luis Potosí.</strong>
    </p>
    <p class="text-green-800">
      <a href="/contact" class="text-blue-600 hover:text-blue-800 underline font-semibold">Get Personalized Assistance →</a>
    </p>
  </div>

</div>
```

---

## Reglas de Consistencia

### ✅ HACER:
1. **Organizar checklist en 3-5 categorías** lógicas
2. **Incluir checkboxes interactivos** en todos los items
3. **Proporcionar contexto** para cada checklist item (no solo "Get passport")
4. **Agregar costos específicos** con disclaimer de verificación
5. **Incluir timeline visual** mostrando duración esperada
6. **Listar recursos oficiales** con enlaces y contactos
7. **Advertir sobre errores comunes** específicos del proceso
8. **Incluir progress indicators** para motivar completación
9. **Citar fuentes oficiales** para requisitos y costos
10. **Actualizar fechas** regularmente en información crítica

### ❌ NO HACER:
1. No crear checklists vagos sin detalles específicos
2. No olvidar agregar sub-información bajo cada item
3. No omitir costos o timelines cuando son relevantes
4. No usar información desactualizada sin disclaimer
5. No hacer claims de experiencia personal no verificada
6. No omitir enlaces a recursos oficiales
7. No crear categorías con menos de 3 items (consolidar)
8. No usar colores inconsistentes para prioridades

---

## Iconos Recomendados

### Por Categoría:
- **📄** - Documentos
- **🏛️** - Oficinas gubernamentales
- **💰** - Costos y pagos
- **📅** - Fechas y timelines
- **📞** - Contactos
- **🔗** - Enlaces y recursos
- **⚠️** - Advertencias importantes
- **💡** - Tips y consejos
- **✅** - Completado/éxito
- **📬** - Follow-up y notificaciones
- **🏠** - Vivienda y hogar
- **🚗** - Transporte
- **🏥** - Salud
- **🔧** - Servicios e instalaciones

---

**Fecha de creación:** Enero 2025
**Última actualización:** Enero 21, 2025
**Versión:** 1.0

> 💡 **Nota:** Los checklist posts son más efectivos cuando son específicos y accionables. Cada item debe ser algo que el lector pueda marcar como "completado" de manera clara. Evita items vagos o subjetivos.
