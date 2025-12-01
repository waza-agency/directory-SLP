import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function NewsletterPage() {
  return (
    <Layout>
      <Head>
        <title>Weekly Newsletter &amp; Style Guide | San Luis Way</title>
        <meta name="description" content="Subscribe to San Luis Way's weekly newsletter covering culture, food, sports, health, entertainment, and arts in San Luis Potosí. Plus, our complete newsletter creation guide." />
        <meta name="keywords" content="San Luis Potosí newsletter, SLP events, expat newsletter Mexico, weekly events SLP" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary-dark to-primary py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-responsive relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              San Luis Way Weekly Newsletter
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Your weekly guide to culture, events, food, and life in San Luis Potosí
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <NewsletterSignup variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-16 bg-white">
        <div className="container-responsive">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Receive Every Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎭', title: 'Culture & Arts', desc: 'Museums, exhibitions, theater, and cultural events' },
              { icon: '🍽️', title: 'Food & Dining', desc: 'Restaurant openings, food festivals, and culinary tips' },
              { icon: '⚽', title: 'Sports', desc: 'Local games, marathons, and sporting events' },
              { icon: '🎓', title: 'Educational', desc: 'Workshops, conferences, and learning opportunities' },
              { icon: '🏥', title: 'Health & Wellness', desc: 'Health fairs, fitness events, and wellness tips' },
              { icon: '🎉', title: 'Entertainment', desc: 'Concerts, festivals, and nightlife highlights' },
              { icon: '🎨', title: 'Arts & Crafts', desc: 'Art shows, craft markets, and creative workshops' },
              { icon: '📅', title: 'Upcoming Events', desc: 'Plan ahead with our events calendar preview' },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Style Guide Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Newsletter Creation Style Guide</h2>
            <p className="text-center text-gray-600 mb-12">
              Complete guidelines for creating the San Luis Way weekly newsletter
            </p>

            {/* Style Guide Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-12">

              {/* Section 1: Overview */}
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center">
                  <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Newsletter Overview
                </h3>
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
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center">
                  <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Content Categories (Cover All Weekly)
                </h3>
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
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center">
                  <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  Deep Search Prompt Template
                </h3>
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
              </div>

              {/* Section 4: Writing Instructions */}
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center">
                  <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                  Writing Instructions for Effective Summaries
                </h3>
                <div className="space-y-6">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <h4 className="font-bold mb-2">Newsletter Structure</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li><strong>Opening Hook:</strong> Start with the most exciting event or a compelling question</li>
                      <li><strong>This Week's Highlights:</strong> 3-5 must-attend events with full details</li>
                      <li><strong>Category Sections:</strong> Brief mentions organized by category</li>
                      <li><strong>Coming Soon:</strong> Preview of next 2 weeks' major events</li>
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
                      <li>✗ Don't assume knowledge of local customs - explain briefly</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                    <h4 className="font-bold mb-2">Event Summary Template</h4>
                    <div className="bg-white rounded p-4 text-sm font-mono">
                      <p><strong>[EMOJI] EVENT NAME</strong></p>
                      <p>📅 Date & Time | 📍 Location</p>
                      <p>[2-3 sentence description answering: What is it? Why should I go? What's special?]</p>
                      <p>💰 [Cost/Free] | 🔗 [Link to more info on sanluisway.com]</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: SEO & Marketing Rules */}
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center">
                  <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">5</span>
                  SEO &amp; Marketing Optimization Rules
                </h3>
                <div className="space-y-6">
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                    <h4 className="font-bold mb-2">Subject Line Optimization</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Keep subject lines <strong>under 50 characters</strong></li>
                      <li>• Include the <strong>week/date range</strong></li>
                      <li>• Use <strong>power words</strong>: Discover, Don't Miss, This Week, Exclusive</li>
                      <li>• Add <strong>one emoji</strong> at the start for visibility</li>
                      <li>• Create <strong>urgency</strong> when appropriate: "This Weekend Only"</li>
                    </ul>
                    <div className="mt-3 bg-white rounded p-3">
                      <p className="text-xs text-gray-500 mb-1">Example subject lines:</p>
                      <p className="text-sm">🎭 This Week in SLP: Festival Season Begins!</p>
                      <p className="text-sm">⚽ Don't Miss: Atlético vs América + 5 More Events</p>
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
                      <li>• Include a <strong>footer CTA</strong>: "Explore more at sanluisway.com"</li>
                    </ul>
                    <div className="mt-3 bg-white rounded p-3">
                      <p className="text-xs text-gray-500 mb-1">Example CTAs:</p>
                      <p className="text-sm">"→ See all events on San Luis Way"</p>
                      <p className="text-sm">"Discover the best restaurants in SLP →"</p>
                      <p className="text-sm">"Plan your weekend at sanluisway.com"</p>
                    </div>
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
                      <li>• <strong>Always mention</strong> "San Luis Way" or "sanluisway.com" at least 3 times</li>
                      <li>• Position as <strong>"your trusted local guide"</strong></li>
                      <li>• Highlight <strong>unique value</strong>: "curated for expats and visitors"</li>
                      <li>• Promote <strong>other content</strong>: blog posts, guides, place reviews</li>
                      <li>• Encourage <strong>social follows</strong>: Instagram @sanluisway</li>
                      <li>• Ask for <strong>referrals</strong>: "Know someone moving to SLP? Forward this!"</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 6: Newsletter Template */}
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center">
                  <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">6</span>
                  Complete Newsletter Template
                </h3>
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
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-responsive text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Stay Connected?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of expats and locals who get the best of SLP delivered weekly.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterSignup variant="compact" />
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 bg-gray-100 text-center">
        <Link href="/" className="text-primary hover:text-primary-dark font-medium">
          ← Back to San Luis Way Home
        </Link>
      </section>
    </Layout>
  );
}
