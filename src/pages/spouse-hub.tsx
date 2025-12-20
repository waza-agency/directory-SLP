import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const activities = [
  { category: 'fitnessWellness', icon: '🧘', items: [
    { name: 'Yoga Classes', location: 'Casa Tibet SLP, Lomas studios', schedule: 'Morning & evening classes', note: 'Many instructors speak English' },
    { name: 'Pilates', location: 'Multiple studios in Lomas', schedule: 'Flexible schedules', note: 'Private sessions available' },
    { name: 'CrossFit', location: 'CrossFit Lomas, CrossFit Potosí', schedule: 'Various time slots', note: 'Great expat community' },
    { name: 'Swimming', location: 'Club Campestre, La Loma', schedule: 'Open access with membership', note: 'Year-round pools' },
  ]},
  { category: 'artsCreativity', icon: '🎨', items: [
    { name: 'Painting & Art Classes', location: 'Centro de las Artes, private studios', schedule: 'Weekly sessions', note: 'Beginner-friendly' },
    { name: 'Pottery & Ceramics', location: 'Talleres in Centro', schedule: 'Flexible', note: 'Traditional Mexican techniques' },
    { name: 'Photography Workshops', location: 'Various locations', schedule: 'Weekend intensives', note: 'Explore beautiful SLP' },
    { name: 'Cooking Classes', location: 'Private kitchens, cooking schools', schedule: 'By appointment', note: 'Learn Mexican cuisine' },
  ]},
  { category: 'languageCulture', icon: '📚', items: [
    { name: 'Spanish Classes', location: 'Berlitz, private tutors, online', schedule: 'Customizable', note: 'Essential for integration' },
    { name: 'Language Exchange', location: 'Cafes, online groups', schedule: 'Weekly meetups', note: 'Practice with locals' },
    { name: 'Cultural Tours', location: 'Centro Histórico, Huasteca', schedule: 'Weekends', note: 'Deep dive into history' },
    { name: 'Book Clubs', location: 'English-speaking groups', schedule: 'Monthly', note: 'Connect over literature' },
  ]},
];

const volunteerOpportunities = [
  { org: 'Casa Hogar Para Niños', cause: 'Children\'s Home', description: 'Support orphaned and vulnerable children through activities, tutoring, and care.', commitment: '4-8 hrs/week', englishFriendly: true },
  { org: 'Banco de Alimentos', cause: 'Food Bank', description: 'Help sort and distribute food to families in need across San Luis Potosí.', commitment: '2-4 hrs/week', englishFriendly: false },
  { org: 'Cruz Roja SLP', cause: 'Red Cross', description: 'Various programs from disaster relief to community health initiatives.', commitment: 'Flexible', englishFriendly: true },
  { org: 'Animal Shelters', cause: 'Animal Welfare', description: 'Help care for rescued animals, organize adoption events, foster pets.', commitment: 'Flexible', englishFriendly: true },
  { org: 'English Teaching', cause: 'Education', description: 'Volunteer to teach English at public schools or community centers.', commitment: '2-6 hrs/week', englishFriendly: true },
  { org: 'Environmental Groups', cause: 'Conservation', description: 'Tree planting, cleanup events, and sustainability education.', commitment: 'Monthly events', englishFriendly: true },
];

const momGroups = [
  { name: 'SLP International Moms', platform: 'WhatsApp/Facebook', members: '150+', description: 'The main group for expat mothers. Playdates, school advice, recommendations, and emotional support.', languages: ['English', 'Spanish'] },
  { name: 'German-Speaking Families', platform: 'WhatsApp', members: '80+', description: 'German, Austrian, and Swiss families. Cultural events, language playgroups, holiday celebrations.', languages: ['German', 'English'] },
  { name: 'Japanese Community SLP', platform: 'Private', members: '60+', description: 'Japanese families connected through companies. Cultural activities and support network.', languages: ['Japanese', 'English'] },
  { name: 'Terranova Parent Community', platform: 'School-based', members: '200+', description: 'Parents of Colegio Terranova students. School events, carpooling, social activities.', languages: ['English', 'Spanish'] },
];

const workIdeas = [
  { category: 'remoteWork', icon: '💻', ideas: [
    { title: 'Freelance Writing/Editing', description: 'Content creation, copywriting, translation services for global clients.', platforms: 'Upwork, Fiverr, LinkedIn' },
    { title: 'Virtual Assistant', description: 'Administrative support, scheduling, email management for entrepreneurs.', platforms: 'Belay, Time Etc, direct clients' },
    { title: 'Online Teaching', description: 'Teach English, your native language, or professional skills online.', platforms: 'VIPKid, iTalki, Outschool' },
    { title: 'Graphic Design', description: 'Create designs for businesses, social media, marketing materials.', platforms: 'Canva, 99designs, direct clients' },
  ]},
  { category: 'localOpportunities', icon: '🏪', ideas: [
    { title: 'Language Tutoring', description: 'Private English, German, or other language lessons to locals and their children.', platforms: 'Word of mouth, Facebook groups' },
    { title: 'Expat Consulting', description: 'Help newcomers navigate SLP: housing, schools, services. You\'ve learned it all!', platforms: 'Your own business' },
    { title: 'Import/Export', description: 'Bring products from your home country or export Mexican crafts.', platforms: 'E-commerce, local markets' },
    { title: 'Photography Services', description: 'Family portraits, events, real estate photography for the expat community.', platforms: 'Social media, referrals' },
  ]},
  { category: 'entrepreneurship', icon: '🚀', ideas: [
    { title: 'Online Coaching', description: 'Life coaching, career coaching, wellness coaching for expats globally.', platforms: 'Your website, social media' },
    { title: 'E-commerce Store', description: 'Sell products online - Mexican artisan goods, curated expat essentials, etc.', platforms: 'Shopify, Etsy, Amazon' },
    { title: 'Content Creation', description: 'Blog, YouTube, Instagram about expat life in Mexico. Monetize your experience.', platforms: 'All social platforms' },
    { title: 'Consulting in Your Field', description: 'Continue your career remotely as a consultant in your area of expertise.', platforms: 'LinkedIn, industry networks' },
  ]},
];

const successStories = [
  {
    name: 'Sarah M.',
    country: '🇺🇸 USA',
    years: 3,
    quote: 'I went from crying in my apartment to running a thriving expat consulting business. The key was saying yes to every coffee invitation and joining a Spanish class. Now I help other newcomers avoid my early mistakes.',
    now: 'Founder, SLP Expat Services',
  },
  {
    name: 'Anna K.',
    country: '🇩🇪 Germany',
    years: 4,
    quote: 'The first year was brutal. I missed my career, my friends, everything. Then I started volunteering at a children\'s home. It gave me purpose. I found my community. My Spanish improved. Now I can\'t imagine leaving.',
    now: 'Volunteer coordinator & Spanish teacher',
  },
  {
    name: 'Yuki T.',
    country: '🇯🇵 Japan',
    years: 2,
    quote: 'I was terrified of the language barrier. But Mexican people are so warm. I started a small Japanese cooking class for expats and locals. It became my social life, my income, and my identity here.',
    now: 'Cooking instructor & food blogger',
  },
  {
    name: 'María José R.',
    country: '🇪🇸 Spain',
    years: 5,
    quote: 'Even speaking Spanish, it was hard. The culture is different. I found my tribe through the mom groups and yoga. Now my kids are bilingual, I have deep friendships, and SLP feels like home.',
    now: 'Yoga instructor & mom of 3',
  },
];

export default function SpouseHubPage() {
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = useState('activities');

  const tabs = [
    { id: 'activities', label: t('spouseHub.tabs.activities'), icon: '🎯' },
    { id: 'volunteer', label: t('spouseHub.tabs.volunteer'), icon: '💝' },
    { id: 'moms', label: t('spouseHub.tabs.moms'), icon: '👩‍👧‍👦' },
    { id: 'work', label: t('spouseHub.tabs.work'), icon: '💼' },
    { id: 'stories', label: t('spouseHub.tabs.stories'), icon: '⭐' },
  ];

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      fitnessWellness: t('spouseHub.activities.fitnessWellness'),
      artsCreativity: t('spouseHub.activities.artsCreativity'),
      languageCulture: t('spouseHub.activities.languageCulture'),
      remoteWork: t('spouseHub.work.remoteWork'),
      localOpportunities: t('spouseHub.work.localOpportunities'),
      entrepreneurship: t('spouseHub.work.entrepreneurship'),
    };
    return labels[category] || category;
  };

  return (
    <>
      <Head>
        <title>{t('spouseHub.seo.title')}</title>
        <meta name="description" content={t('spouseHub.seo.description')} />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-purple-50">
        {/* Hero - Empathetic Welcome */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-600 via-purple-600 to-indigo-700"></div>
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>

          <div className="relative container mx-auto px-4 py-20 max-w-4xl text-center">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
              {t('spouseHub.badge')}
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('spouseHub.hero.title')}
            </h1>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-left max-w-2xl mx-auto">
              <p className="text-xl text-white/95 leading-relaxed mb-4">
                {t('spouseHub.hero.greeting')}
              </p>
              <p className="text-lg text-white/90 leading-relaxed mb-4">
                {t('spouseHub.hero.paragraph1')} <em>&ldquo;{t('spouseHub.hero.question')}&rdquo;</em>
              </p>
              <p className="text-lg text-white/90 leading-relaxed mb-4">
                {t('spouseHub.hero.paragraph2')}
              </p>
              <p className="text-lg text-white/90 leading-relaxed mb-4">
                {t('spouseHub.hero.paragraph3')} <strong className="text-white">{t('spouseHub.hero.highlight')}</strong> {t('spouseHub.hero.paragraph4')}
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                {t('spouseHub.hero.closing')}
              </p>
              <p className="text-right text-white/80 mt-6 italic">
                {t('spouseHub.hero.signature')}
              </p>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-2 py-3 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-rose-500 to-purple-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Activities & Classes */}
          {activeTab === 'activities' && (
            <section className="animate-fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('spouseHub.activities.title')}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('spouseHub.activities.subtitle')}
                </p>
              </div>

              <div className="space-y-8">
                {activities.map((category) => (
                  <div key={category.category} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-rose-500 to-purple-500 px-6 py-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        {getCategoryLabel(category.category)}
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {category.items.map((item) => (
                          <div key={item.name} className="border border-gray-200 rounded-xl p-4 hover:border-rose-300 hover:shadow-md transition-all">
                            <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p><span className="text-rose-500">📍</span> {item.location}</p>
                              <p><span className="text-purple-500">🕐</span> {item.schedule}</p>
                              <p className="text-gray-500 italic">{item.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <span>💡</span> {t('spouseHub.activities.proTipTitle')}
                </h3>
                <p className="text-amber-800">
                  &ldquo;{t('spouseHub.activities.proTip')}&rdquo;
                </p>
                <p className="text-right text-amber-700 mt-3 italic">{t('spouseHub.activities.proTipAuthor')}</p>
              </div>
            </section>
          )}

          {/* Volunteering */}
          {activeTab === 'volunteer' && (
            <section className="animate-fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('spouseHub.volunteer.title')}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('spouseHub.volunteer.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {volunteerOpportunities.map((opp) => (
                  <div key={opp.org} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{opp.org}</h3>
                          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium mt-1">
                            {opp.cause}
                          </span>
                        </div>
                        {opp.englishFriendly && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            {t('spouseHub.volunteer.englishOk')}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{opp.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="text-rose-500 mr-2">⏱️</span>
                        {t('spouseHub.volunteer.timeCommitment')}: {opp.commitment}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-rose-50 border-2 border-rose-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-rose-900 mb-3 flex items-center gap-2">
                  <span>❤️</span> {t('spouseHub.volunteer.whyTitle')}
                </h3>
                <ul className="space-y-2 text-rose-800">
                  <li className="flex items-start gap-2"><span>✓</span> {t('spouseHub.volunteer.why1')}</li>
                  <li className="flex items-start gap-2"><span>✓</span> {t('spouseHub.volunteer.why2')}</li>
                  <li className="flex items-start gap-2"><span>✓</span> {t('spouseHub.volunteer.why3')}</li>
                  <li className="flex items-start gap-2"><span>✓</span> {t('spouseHub.volunteer.why4')}</li>
                  <li className="flex items-start gap-2"><span>✓</span> {t('spouseHub.volunteer.why5')}</li>
                </ul>
              </div>
            </section>
          )}

          {/* Mom Groups */}
          {activeTab === 'moms' && (
            <section className="animate-fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('spouseHub.momGroups.title')}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('spouseHub.momGroups.subtitle')}
                </p>
              </div>

              <div className="space-y-6">
                {momGroups.map((group) => (
                  <div key={group.name} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl mb-2">{group.name}</h3>
                        <p className="text-gray-600 mb-3">{group.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {group.languages.map((lang) => (
                            <span key={lang} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-center md:text-right">
                        <p className="text-3xl font-bold text-rose-600">{group.members}</p>
                        <p className="text-sm text-gray-500">{t('spouseHub.momGroups.members')}</p>
                        <p className="text-xs text-gray-400 mt-1">{group.platform}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                  <span>🤝</span> {t('spouseHub.momGroups.howToJoinTitle')}
                </h3>
                <p className="text-purple-800 mb-4">
                  {t('spouseHub.momGroups.howToJoinIntro')}
                </p>
                <ol className="space-y-2 text-purple-800 list-decimal list-inside">
                  <li>{t('spouseHub.momGroups.join1')}</li>
                  <li>{t('spouseHub.momGroups.join2')}</li>
                  <li>{t('spouseHub.momGroups.join3')}</li>
                  <li>{t('spouseHub.momGroups.join4')}</li>
                </ol>
              </div>
            </section>
          )}

          {/* Work & Business */}
          {activeTab === 'work' && (
            <section className="animate-fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('spouseHub.work.title')}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('spouseHub.work.subtitle')}
                </p>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <span>⚠️</span> {t('spouseHub.work.visaWarningTitle')}
                </h3>
                <p className="text-amber-800">
                  {t('spouseHub.work.visaWarning')}
                </p>
              </div>

              <div className="space-y-8">
                {workIdeas.map((category) => (
                  <div key={category.category} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        {getCategoryLabel(category.category)}
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {category.ideas.map((idea) => (
                          <div key={idea.title} className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all">
                            <h4 className="font-semibold text-gray-900 mb-2">{idea.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{idea.description}</p>
                            <p className="text-xs text-indigo-600"><strong>{t('spouseHub.work.where')}:</strong> {idea.platforms}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Success Stories */}
          {activeTab === 'stories' && (
            <section className="animate-fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('spouseHub.stories.title')}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('spouseHub.stories.subtitle')}
                </p>
              </div>

              <div className="space-y-8">
                {successStories.map((story, index) => (
                  <div key={story.name} className={`bg-white rounded-2xl shadow-lg overflow-hidden ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:flex`}>
                    <div className={`md:w-1/3 p-8 flex flex-col justify-center items-center text-center ${
                      index % 4 === 0 ? 'bg-gradient-to-br from-rose-500 to-pink-500' :
                      index % 4 === 1 ? 'bg-gradient-to-br from-purple-500 to-indigo-500' :
                      index % 4 === 2 ? 'bg-gradient-to-br from-amber-500 to-orange-500' :
                      'bg-gradient-to-br from-teal-500 to-emerald-500'
                    }`}>
                      <div className="text-5xl mb-3">{story.country}</div>
                      <h3 className="text-2xl font-bold text-white mb-1">{story.name}</h3>
                      <p className="text-white/80 text-sm">{story.years} {t('spouseHub.stories.yearsInSLP')}</p>
                      <p className="text-white/90 font-medium mt-3">{story.now}</p>
                    </div>
                    <div className="md:w-2/3 p-8 flex items-center">
                      <div>
                        <svg className="w-10 h-10 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                        <p className="text-gray-700 text-lg leading-relaxed italic">
                          {story.quote}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-gradient-to-r from-rose-500 to-purple-500 rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">{t('spouseHub.stories.ctaTitle')}</h3>
                <p className="text-white/90 mb-6 max-w-xl mx-auto">
                  {t('spouseHub.stories.ctaText')}
                </p>
                <Link href="/contact" className="inline-block bg-white text-rose-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  {t('spouseHub.stories.shareStory')}
                </Link>
              </div>
            </section>
          )}
        </div>

        {/* Final CTA */}
        <section className="bg-gray-900 py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white mb-6">{t('spouseHub.cta.title')}</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              {t('spouseHub.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-block bg-gradient-to-r from-rose-500 to-purple-500 text-white font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity">
                {t('spouseHub.cta.connect')}
              </Link>
              <Link href="/community" className="inline-block bg-white/10 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition-colors">
                {t('spouseHub.cta.community')}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};
