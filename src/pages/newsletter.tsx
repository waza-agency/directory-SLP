import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function NewsletterStyleGuidePage() {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedKey = localStorage.getItem('newsletter_admin_key');
    if (savedKey) {
      verifyKey(savedKey);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyKey = async (key: string) => {
    try {
      const res = await fetch('/api/newsletter/subscribers?limit=1', {
        headers: { 'x-admin-key': key }
      });
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('newsletter_admin_key', key);
      }
    } catch {
      // Key invalid
    }
    setIsLoading(false);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await verifyKey(adminKey);
    if (!isAuthenticated) {
      alert('Invalid admin key');
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Newsletter Style Guide | San Luis Way</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold mb-2">Newsletter Style Guide</h1>
            <p className="text-gray-600 mb-6 text-sm">This page is protected. Enter admin key to access.</p>
            <form onSubmit={handleAuth}>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter admin key"
                className="w-full px-4 py-3 border rounded-lg mb-4 focus:ring-2 focus:ring-terracotta focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-terracotta text-white py-3 rounded-lg font-semibold hover:bg-terracotta/90 transition"
              >
                Access Style Guide
              </button>
            </form>
            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-gray-500 text-sm mb-2">Looking to subscribe?</p>
              <Link href="/subscribe" className="text-terracotta hover:underline font-medium">
                Go to subscription page →
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Newsletter Style Guide | San Luis Way</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary-dark to-primary py-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-responsive relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-4">
              <span className="mr-2">🔒</span> Internal Document
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Newsletter Style Guide
            </h1>
            <p className="text-xl opacity-90">
              Complete guidelines for creating the San Luis Way weekly newsletter
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-6 bg-white border-b sticky top-0 z-40">
        <div className="container-responsive">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#overview" className="text-gray-600 hover:text-terracotta">Overview</a>
            <a href="#categories" className="text-gray-600 hover:text-terracotta">Categories</a>
            <a href="#prompt" className="text-gray-600 hover:text-terracotta">Search Prompt</a>
            <a href="#writing" className="text-gray-600 hover:text-terracotta">Writing Guide</a>
            <a href="#seo" className="text-gray-600 hover:text-terracotta">SEO Rules</a>
            <a href="#template" className="text-gray-600 hover:text-terracotta">Template</a>
            <Link href="/admin/newsletter" className="text-terracotta font-medium hover:underline">
              → Admin Panel
            </Link>
          </div>
        </div>
      </section>

      {/* Style Guide Content */}
      <section className="py-12 bg-gray-50">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: Overview */}
            <div id="overview" className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center">
                <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                Newsletter Overview
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <ul className="space-y-3">
                  <li><strong>Name:</strong> San Luis Way Weekly</li>
                  <li><strong>Frequency:</strong> Weekly (sent every Monday morning)</li>
                  <li><strong>Target Audience:</strong> Expats, tourists, and locals interested in San Luis Potosí events and culture</li>
                  <li><strong>Primary Goal:</strong> Inform readers about current and upcoming events while promoting www.sanluisway.com</li>
                  <li><strong>Tone:</strong> Friendly, informative, enthusiastic but not overly promotional</li>
                  <li><strong>Language:</strong> English (primary), with Spanish terms where culturally appropriate</li>
                </ul>
              </div>
            </div>

            {/* Section 2: Content Categories */}
            <div id="categories" className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center">
                <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                Content Categories (Cover All Weekly)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { cat: 'Culture', examples: 'Traditional festivals, cultural exhibitions, heritage events, religious celebrations' },
                  { cat: 'Food', examples: 'Restaurant openings, food festivals, culinary events, market highlights' },
                  { cat: 'Sports', examples: 'Atlético San Luis games, marathons, cycling events, fitness competitions' },
                  { cat: 'Educational', examples: 'Workshops, university events, conferences, language exchanges' },
                  { cat: 'Health', examples: 'Health fairs, wellness events, medical conferences, fitness classes' },
                  { cat: 'Entertainment', examples: 'Concerts, theater shows, comedy nights, club events' },
                  { cat: 'Arts', examples: 'Art exhibitions, gallery openings, craft markets, creative workshops' },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-primary mb-2">{item.cat}</h4>
                    <p className="text-sm text-gray-600">{item.examples}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Deep Search Prompt */}
            <div id="prompt" className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center">
                <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                Deep Search Prompt Template
              </h2>
              <div className="bg-gray-900 text-green-400 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap">{`Search for events and happenings in San Luis Potosí, Mexico for the week of [DATE RANGE].

SEARCH PARAMETERS:
- Location: San Luis Potosí city and surrounding areas (including Huasteca Potosina for major events)
- Time Frame: Current week + next 2 weeks preview
- Languages: Search in both English AND Spanish

CATEGORIES TO SEARCH:
1. CULTURE: festivals, traditions, religious events, cultural celebrations, museum exhibitions
2. FOOD: restaurant events, food festivals, culinary workshops, market specials, new openings
3. SPORTS: Atlético de San Luis games, marathons, cycling, fitness events, tournaments
4. EDUCATIONAL: workshops, conferences, university events, language exchanges, seminars
5. HEALTH: health fairs, wellness events, medical conferences, yoga/fitness classes
6. ENTERTAINMENT: concerts, theater, comedy, nightlife, family entertainment
7. ARTS: gallery exhibitions, art shows, craft markets, creative workshops, performances

SOURCES TO CHECK:
- Local news: El Sol de San Luis, Pulso SLP, La Jornada SLP
- Social media: Facebook events in SLP, Instagram hashtags #sanluispotosi #slp
- Official sources: Gobierno del Estado SLP, Secretaría de Cultura SLP
- Venue pages: Teatro de la Paz, Centro de las Artes, FENAPO, Arena Potosí
- University calendars: UASLP, Tec de Monterrey SLP

FOR EACH EVENT FOUND, EXTRACT:
- Event name (Spanish and English if available)
- Date and time
- Location/venue with address
- Brief description (2-3 sentences)
- Ticket info or cost (if applicable)
- Website or social media link
- Category classification`}</pre>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Search for events and happenings in San Luis Potosí, Mexico for the week of [DATE RANGE].

SEARCH PARAMETERS:
- Location: San Luis Potosí city and surrounding areas (including Huasteca Potosina for major events)
- Time Frame: Current week + next 2 weeks preview
- Languages: Search in both English AND Spanish

CATEGORIES TO SEARCH:
1. CULTURE: festivals, traditions, religious events, cultural celebrations, museum exhibitions
2. FOOD: restaurant events, food festivals, culinary workshops, market specials, new openings
3. SPORTS: Atlético de San Luis games, marathons, cycling, fitness events, tournaments
4. EDUCATIONAL: workshops, conferences, university events, language exchanges, seminars
5. HEALTH: health fairs, wellness events, medical conferences, yoga/fitness classes
6. ENTERTAINMENT: concerts, theater, comedy, nightlife, family entertainment
7. ARTS: gallery exhibitions, art shows, craft markets, creative workshops, performances

SOURCES TO CHECK:
- Local news: El Sol de San Luis, Pulso SLP, La Jornada SLP
- Social media: Facebook events in SLP, Instagram hashtags #sanluispotosi #slp
- Official sources: Gobierno del Estado SLP, Secretaría de Cultura SLP
- Venue pages: Teatro de la Paz, Centro de las Artes, FENAPO, Arena Potosí
- University calendars: UASLP, Tec de Monterrey SLP

FOR EACH EVENT FOUND, EXTRACT:
- Event name (Spanish and English if available)
- Date and time
- Location/venue with address
- Brief description (2-3 sentences)
- Ticket info or cost (if applicable)
- Website or social media link
- Category classification`);
                  alert('Prompt copied to clipboard!');
                }}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
              >
                Copy Prompt
              </button>
            </div>

            {/* Section 4: Writing Instructions */}
            <div id="writing" className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center">
                <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                Writing Instructions
              </h2>
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h4 className="font-bold mb-2">Newsletter Structure</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li><strong>Opening Hook:</strong> Start with the most exciting event or a compelling question</li>
                    <li><strong>This Week&apos;s Highlights:</strong> 3-5 must-attend events with full details</li>
                    <li><strong>Category Sections:</strong> Brief mentions organized by category</li>
                    <li><strong>Coming Soon:</strong> Preview of next 2 weeks&apos; major events</li>
                    <li><strong>Pro Tip:</strong> One insider tip for expats/visitors</li>
                    <li><strong>CTA:</strong> Drive traffic to sanluisway.com</li>
                  </ol>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <h4 className="font-bold mb-2">Writing Style Guidelines</h4>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Use <strong>active voice</strong> and present tense when possible</li>
                    <li>✓ Keep sentences <strong>short and punchy</strong> (15-20 words max)</li>
                    <li>✓ Include <strong>specific dates, times, and locations</strong></li>
                    <li>✓ Use <strong>bullet points</strong> for quick scanning</li>
                    <li>✓ Add <strong>emojis sparingly</strong> to highlight categories</li>
                    <li>✓ Include <strong>Spanish terms</strong> with brief translations for authenticity</li>
                    <li>✓ Write for <strong>5th-grade reading level</strong> for international accessibility</li>
                    <li>✗ Avoid jargon, complex sentences, or walls of text</li>
                    <li>✗ Don&apos;t assume knowledge of local customs - explain briefly</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <h4 className="font-bold mb-2">Event Summary Template</h4>
                  <div className="bg-white rounded p-4 text-sm font-mono">
                    <p><strong>[EMOJI] EVENT NAME</strong></p>
                    <p>📅 Date & Time | 📍 Location</p>
                    <p>[2-3 sentence description answering: What is it? Why should I go? What&apos;s special?]</p>
                    <p>💰 [Cost/Free] | 🔗 [Link to more info on sanluisway.com]</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: SEO & Marketing Rules */}
            <div id="seo" className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center">
                <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">5</span>
                SEO & Marketing Optimization
              </h2>
              <div className="space-y-6">
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <h4 className="font-bold mb-2">Subject Line Optimization</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Keep subject lines <strong>under 50 characters</strong></li>
                    <li>• Include the <strong>week/date range</strong></li>
                    <li>• Use <strong>power words</strong>: Discover, Don&apos;t Miss, This Week, Exclusive</li>
                    <li>• Add <strong>one emoji</strong> at the start for visibility</li>
                    <li>• Create <strong>urgency</strong> when appropriate: &quot;This Weekend Only&quot;</li>
                  </ul>
                  <div className="mt-3 bg-white rounded p-3">
                    <p className="text-xs text-gray-500 mb-1">Example subject lines:</p>
                    <p className="text-sm">🎭 This Week in SLP: Festival Season Begins!</p>
                    <p className="text-sm">⚽ Don&apos;t Miss: Atlético vs América + 5 More Events</p>
                    <p className="text-sm">🍽️ SLP Weekly: New Restaurants & Weekend Plans</p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <h4 className="font-bold mb-2">Call-to-Action (CTA) Rules</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Include <strong>at least 3 links</strong> to sanluisway.com per newsletter</li>
                    <li>• Use <strong>action verbs</strong>: Explore, Discover, Find, Plan, Book</li>
                    <li>• Link to <strong>specific pages</strong>: /events, /places, /blog articles</li>
                    <li>• Add a <strong>primary CTA button</strong> near the top</li>
                    <li>• Include a <strong>footer CTA</strong>: &quot;Explore more at sanluisway.com&quot;</li>
                  </ul>
                </div>

                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
                  <h4 className="font-bold mb-2">SEO Keywords to Include</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      'San Luis Potosí events',
                      'SLP things to do',
                      'expat Mexico',
                      'San Luis Potosí weekend',
                      'Huasteca Potosina',
                      'SLP restaurants',
                      'San Luis Potosí culture',
                      'Mexico expat life',
                      'SLP nightlife',
                      'San Luis Potosí festivals',
                    ].map((keyword, index) => (
                      <span key={index} className="bg-white px-3 py-1 rounded-full text-xs border">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-teal-50 border-l-4 border-teal-500 p-4">
                  <h4 className="font-bold mb-2">Brand Promotion Guidelines</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Always mention</strong> &quot;San Luis Way&quot; or &quot;sanluisway.com&quot; at least 3 times</li>
                    <li>• Position as <strong>&quot;your trusted local guide&quot;</strong></li>
                    <li>• Highlight <strong>unique value</strong>: &quot;curated for expats and visitors&quot;</li>
                    <li>• Promote <strong>other content</strong>: blog posts, guides, place reviews</li>
                    <li>• Encourage <strong>social follows</strong>: Instagram @sanluisway</li>
                    <li>• Ask for <strong>referrals</strong>: &quot;Know someone moving to SLP? Forward this!&quot;</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 6: Newsletter Template */}
            <div id="template" className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center">
                <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">6</span>
                Complete Newsletter Template
              </h2>
              <div className="bg-gray-100 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap text-gray-800">{`========================================
SAN LUIS WAY WEEKLY
[Week of DATE - DATE, YEAR]
========================================

Hey there, SLP explorer! 👋

[Opening hook - 1-2 sentences about the week's theme or most exciting event]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌟 THIS WEEK'S TOP PICKS

1. [HIGHLIGHT EVENT #1]
   📅 Day, Date | Time
   📍 Venue, Address
   [2-3 sentence description]
   💰 Cost | 🔗 sanluisway.com/events/[event-id]

2. [HIGHLIGHT EVENT #2]
   ...

3. [HIGHLIGHT EVENT #3]
   ...

→ See all [X] events this week: sanluisway.com/events

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎭 CULTURE & ARTS
• [Event name] - [Date] at [Venue]
• [Event name] - [Date] at [Venue]

🍽️ FOOD & DINING
• [Event name] - [Date] at [Venue]
• [Event name] - [Date] at [Venue]

⚽ SPORTS
• [Event name] - [Date] at [Venue]

🎵 ENTERTAINMENT
• [Event name] - [Date] at [Venue]

🎓 EDUCATIONAL & HEALTH
• [Event name] - [Date] at [Venue]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 COMING UP (Next 2 Weeks)

[DATE]: [Major upcoming event]
[DATE]: [Major upcoming event]
[DATE]: [Major upcoming event]

Plan ahead → sanluisway.com/events

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 EXPAT PRO TIP

[One practical tip for navigating life in SLP - transportation,
cultural etiquette, money-saving hack, or insider recommendation]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 FROM THE BLOG

[Title of recent blog post]
[One sentence teaser]
→ Read more: sanluisway.com/blog/[slug]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thanks for being part of the San Luis Way community!

Have an event to share? Reply to this email.
Love this newsletter? Forward it to a friend!

Explore more → sanluisway.com
Follow us → @sanluisway on Instagram

Until next week,
The San Luis Way Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
San Luis Way | sanluisway.com
Your guide to life in San Luis Potosí
[Unsubscribe link]
========================================`}</pre>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`========================================
SAN LUIS WAY WEEKLY
[Week of DATE - DATE, YEAR]
========================================

Hey there, SLP explorer! 👋

[Opening hook - 1-2 sentences about the week's theme or most exciting event]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌟 THIS WEEK'S TOP PICKS

1. [HIGHLIGHT EVENT #1]
   📅 Day, Date | Time
   📍 Venue, Address
   [2-3 sentence description]
   💰 Cost | 🔗 sanluisway.com/events/[event-id]

→ See all [X] events this week: sanluisway.com/events

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thanks for being part of the San Luis Way community!

Until next week,
The San Luis Way Team
========================================`);
                  alert('Template copied to clipboard!');
                }}
                className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition text-sm"
              >
                Copy Template
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Actions */}
      <section className="py-8 bg-gray-100">
        <div className="container-responsive">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admin/newsletter"
              className="px-6 py-3 bg-terracotta text-white rounded-lg font-semibold hover:bg-terracotta/90 transition"
            >
              Go to Admin Panel →
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('newsletter_admin_key');
                window.location.reload();
              }}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
