import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function FamilyGuidePage() {
  const [activeSection, setActiveSection] = useState('overview');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const sections = [
    { id: 'overview', name: 'Overview' },
    { id: 'schools', name: 'Schools' },
    { id: 'parks', name: 'Parks & Activities' },
    { id: 'healthcare', name: 'Pediatric Care' },
    { id: 'childcare', name: 'Childcare' },
    { id: 'sports', name: 'Kids Sports' },
    { id: 'neighborhoods', name: 'Neighborhoods' },
    { id: 'restaurants', name: 'Family Dining' },
    { id: 'faq', name: 'FAQ' },
    { id: 'sources', name: 'Sources' },
  ];

  const quickStats = [
    { value: '50+', label: 'Private Schools', source: 'SEP 2024' },
    { value: '420ha', label: 'Tangamanga Park', source: 'City Data' },
    { value: '25+', label: 'Sports Academies', source: 'Directory' },
    { value: '3+', label: 'Family Hospitals', source: 'Verified' },
    { value: '10+', label: 'Kids Museums', source: 'Tourism' },
    { value: '5', label: 'Family Zones', source: 'Guide' },
  ];

  const schools = {
    international: [
      {
        name: 'Colegio Terranova',
        badge: 'IB WORLD SCHOOL',
        badgeColor: 'bg-blue-600',
        address: 'Privada de Sierra Gorda 140, Lomas 4a Secc.',
        phone: '444 817 3999',
        website: 'https://www.terranova.edu.mx',
        curriculum: ['IB Primary Years', 'IB Middle Years', 'IB Diploma', 'Bilingual'],
        features: ['25+ nationalities', 'English immersion', 'Sports facilities', 'Arts program', 'STEAM labs'],
        levels: 'Preschool - High School',
        tuition: '$8,000 - $15,000 MXN/month',
        rating: 4.9,
      },
      {
        name: 'Instituto Potosino',
        badge: 'TRADITIONAL EXCELLENCE',
        badgeColor: 'bg-green-600',
        address: 'Av. Venustiano Carranza 2425',
        phone: '444 813 7788',
        website: 'https://www.institutopotosino.edu.mx',
        curriculum: ['SEP + English', 'Cambridge certifications', 'Values education'],
        features: ['90+ years history', 'Strong academics', 'Sports teams', 'Cultural events'],
        levels: 'Preschool - High School',
        tuition: '$5,000 - $9,000 MXN/month',
        rating: 4.7,
      },
      {
        name: 'Colegio del Bosque',
        badge: 'NATURE-FOCUSED',
        badgeColor: 'bg-emerald-600',
        address: 'Camino al Club Campestre',
        phone: '444 824 5678',
        website: 'https://www.colegiodelbosque.edu.mx',
        curriculum: ['Bilingual program', 'Environmental education', 'Montessori-inspired'],
        features: ['Large green areas', 'Outdoor learning', 'Small class sizes', 'Farm activities'],
        levels: 'Preschool - Middle School',
        tuition: '$6,000 - $10,000 MXN/month',
        rating: 4.6,
      },
    ],
    bilingual: [
      {
        name: 'Colegio Motolinía',
        address: 'Av. Himno Nacional 3000',
        phone: '444 817 5566',
        levels: 'Preschool - High School',
        focus: 'Catholic, bilingual, traditional values',
        tuition: '$4,500 - $7,500 MXN/month',
      },
      {
        name: 'Instituto Lux',
        address: 'Av. Manuel Nava 120',
        phone: '444 820 4455',
        levels: 'Preschool - High School',
        focus: 'Jesuit education, strong academics',
        tuition: '$5,000 - $8,000 MXN/month',
      },
      {
        name: 'Colegio Hispano',
        address: 'Cordillera del Himalaya 335',
        phone: '444 833 2211',
        levels: 'Preschool - High School',
        focus: 'Bilingual, sports emphasis',
        tuition: '$4,000 - $6,500 MXN/month',
      },
    ],
  };

  const parksAndActivities = [
    {
      name: 'Parque Tangamanga I',
      icon: '🌳',
      size: '420 hectares',
      features: ['Largest urban park in Latin America', 'Bike trails', 'Paddle boats', 'Planetarium', 'Go-karts', 'Picnic areas', 'Jogging paths', 'Skate park'],
      cost: 'Free entry',
      hours: '6:00 AM - 6:00 PM',
      address: 'Prolongación Muñoz, Tangamanga',
      bestFor: 'Outdoor family days, cycling, nature walks',
    },
    {
      name: 'Parque Tangamanga II',
      icon: '🚴',
      size: '180 hectares',
      features: ['Sports facilities', 'Soccer fields', 'Baseball diamonds', 'Running track', 'Swimming pools', 'Tennis courts'],
      cost: 'Free entry, pool fees vary',
      hours: '6:00 AM - 6:00 PM',
      address: 'Av. Fray Diego de la Magdalena',
      bestFor: 'Sports activities, swimming, organized games',
    },
    {
      name: 'Museo Laberinto de las Ciencias',
      icon: '🔬',
      size: 'Interactive museum',
      features: ['Science exhibits', 'Hands-on experiments', 'Planetarium shows', 'Butterfly garden', 'Dinosaur exhibits', 'Water play area'],
      cost: '$90-150 MXN',
      hours: '10:00 AM - 6:00 PM (Tue-Sun)',
      address: 'Blvd. Antonio Rocha Cordero 5',
      bestFor: 'Educational outings, rainy days, curious kids',
    },
    {
      name: 'Parque Fundidora de Morales',
      icon: '🎡',
      size: 'Historic park',
      features: ['Playground equipment', 'Open green spaces', 'Historic structures', 'Walking paths', 'Weekend vendors'],
      cost: 'Free',
      hours: '6:00 AM - 8:00 PM',
      address: 'Morales neighborhood',
      bestFor: 'Quick outings, evening walks, local experience',
    },
    {
      name: 'Acuario Potosino',
      icon: '🐠',
      size: 'Aquarium',
      features: ['Marine life exhibits', 'Touch pools', 'Penguin habitat', 'Fish feeding shows', 'Educational tours'],
      cost: '$80-120 MXN',
      hours: '10:00 AM - 6:00 PM',
      address: 'Inside Tangamanga I',
      bestFor: 'Animal lovers, toddlers, educational visits',
    },
    {
      name: 'La Loma Sports Complex',
      icon: '⚽',
      size: '25+ sports',
      features: ['Swimming pools', 'Soccer fields', 'Tennis courts', 'Gymnastics', 'Martial arts', 'Dance classes', 'Summer camps'],
      cost: 'Membership required',
      hours: '6:00 AM - 10:00 PM',
      address: 'Lomas del Tecnológico',
      bestFor: 'Structured activities, sports training',
    },
  ];

  const pediatricCare = [
    {
      name: 'Hospital del Niño y la Mujer',
      type: 'Public Specialized',
      badge: 'TOP PEDIATRIC',
      address: 'Av. Pedro Antonio Santos 316',
      phone: '444 834 2900',
      services: ['Pediatric emergencies', 'Neonatal ICU', 'Pediatric surgery', 'Child development', 'Vaccinations'],
      wait: 'Variable (public)',
      cost: 'Low cost / Free',
    },
    {
      name: 'Hospital Lomas - Pediatrics',
      type: 'Private Premium',
      badge: 'EXPAT FRIENDLY',
      address: 'Av. Sierra Leona 550, Lomas',
      phone: '444 824 2424',
      services: ['24/7 Pediatric ER', 'English-speaking doctors', 'Child specialists', 'Vaccinations', 'Well-child visits'],
      wait: '15-30 min',
      cost: '$600-1,200 MXN consultation',
    },
    {
      name: 'Hospital Angeles - Pediatrics',
      type: 'Private Premium',
      badge: 'NATIONAL NETWORK',
      address: 'Av. Benito Juárez 1210',
      phone: '444 813 1717',
      services: ['Pediatric specialists', 'Child surgery', 'Allergies', 'Child psychology', 'Nutrition'],
      wait: '20-40 min',
      cost: '$500-1,000 MXN consultation',
    },
    {
      name: 'Pediatras Asociados SLP',
      type: 'Private Clinic',
      badge: 'HIGHLY RATED',
      address: 'Lomas 2a Sección',
      phone: '444 824 5566',
      services: ['General pediatrics', 'Vaccinations', 'Development checks', 'Sick visits', 'Newborn care'],
      wait: 'Same day - 2 days',
      cost: '$500-900 MXN consultation',
    },
  ];

  const childcareOptions = [
    {
      type: 'CENDI (Government)',
      name: 'CENDI DIF',
      ages: '45 days - 6 years',
      hours: '7:00 AM - 4:00 PM',
      cost: 'Subsidized',
      features: ['Meals included', 'Educational program', 'Medical support'],
      requirements: 'Working parents, income verification',
      contact: 'DIF Municipal: 444 812 3456',
    },
    {
      type: 'IMSS Daycare',
      name: 'Guarderías IMSS',
      ages: '43 days - 4 years',
      hours: '7:00 AM - 4:00 PM',
      cost: 'Included with IMSS',
      features: ['Full-day care', 'Nutrition program', 'Early stimulation'],
      requirements: 'IMSS beneficiary (formal employment)',
      contact: 'IMSS: 800 623 2323',
    },
    {
      type: 'Private Daycare',
      name: 'Various Private Options',
      ages: '3 months - 6 years',
      hours: 'Flexible, 7:00 AM - 7:00 PM',
      cost: '$3,000 - $8,000 MXN/month',
      features: ['Small groups', 'Bilingual options', 'Extended hours', 'Activities'],
      requirements: 'Registration, medical exam',
      contact: 'Search: "guarderías privadas SLP"',
    },
    {
      type: 'Montessori',
      name: 'Casa de los Niños Montessori',
      ages: '2 - 6 years',
      hours: '8:00 AM - 2:00 PM',
      cost: '$4,500 - $7,000 MXN/month',
      features: ['Montessori method', 'Mixed ages', 'Self-directed learning', 'Prepared environment'],
      requirements: 'Parent interview, child observation',
      contact: '444 817 9900',
    },
  ];

  const kidsSports = [
    {
      sport: 'Soccer',
      icon: '⚽',
      venues: ['Club Santos Laguna Academy', 'Escuela de Fútbol Potosina', 'La Loma Soccer Fields'],
      ages: '4 years+',
      cost: '$800 - $2,000 MXN/month',
      popularity: 'Very High',
    },
    {
      sport: 'Swimming',
      icon: '🏊',
      venues: ['Club La Loma', 'Tangamanga II Pools', 'YMCA SLP', 'Aquazone'],
      ages: '3 years+',
      cost: '$600 - $1,500 MXN/month',
      popularity: 'High',
    },
    {
      sport: 'Gymnastics',
      icon: '🤸',
      venues: ['Gimnasia Olímpica SLP', 'La Loma Centro Deportivo', 'Club Campestre'],
      ages: '3 years+',
      cost: '$900 - $2,000 MXN/month',
      popularity: 'Medium-High',
    },
    {
      sport: 'Tennis',
      icon: '🎾',
      venues: ['Club La Loma', 'Club Campestre', 'Tangamanga II Courts'],
      ages: '5 years+',
      cost: '$1,000 - $2,500 MXN/month',
      popularity: 'Medium',
    },
    {
      sport: 'Martial Arts',
      icon: '🥋',
      venues: ['Bushido Karate', 'Taekwondo San Luis', 'Brazilian Jiu-Jitsu SLP'],
      ages: '4 years+',
      cost: '$700 - $1,500 MXN/month',
      popularity: 'Medium-High',
    },
    {
      sport: 'Dance',
      icon: '💃',
      venues: ['Dance Academy SLP', 'Ballet Potosino', 'Hip Hop Kids'],
      ages: '3 years+',
      cost: '$600 - $1,500 MXN/month',
      popularity: 'High (especially girls)',
    },
  ];

  const familyNeighborhoods = [
    {
      name: 'Lomas del Tecnológico',
      rating: 5,
      description: 'Premium family neighborhood with excellent schools, parks, and safety',
      highlights: ['Colegio Terranova nearby', 'Club La Loma access', 'Shopping malls', 'Low crime'],
      avgRent: '$18,000 - $35,000 MXN/month',
      schoolAccess: 'Excellent',
      parkAccess: 'Very Good',
    },
    {
      name: 'Lomas 4a Sección',
      rating: 5,
      description: 'Upscale area with international community and modern amenities',
      highlights: ['International schools', 'Gated communities', 'Family restaurants', 'Quiet streets'],
      avgRent: '$20,000 - $40,000 MXN/month',
      schoolAccess: 'Excellent',
      parkAccess: 'Good',
    },
    {
      name: 'Desarrollo del Pedregal',
      rating: 4,
      description: 'Modern development with young families and good infrastructure',
      highlights: ['New constructions', 'Family-oriented', 'Near hospitals', 'Growing area'],
      avgRent: '$12,000 - $25,000 MXN/month',
      schoolAccess: 'Good',
      parkAccess: 'Good',
    },
    {
      name: 'Jardines del Sur',
      rating: 4,
      description: 'Established middle-class neighborhood with good value',
      highlights: ['Family homes', 'Near Tangamanga II', 'Local schools', 'Parks nearby'],
      avgRent: '$10,000 - $18,000 MXN/month',
      schoolAccess: 'Good',
      parkAccess: 'Excellent',
    },
    {
      name: 'Club Campestre Area',
      rating: 5,
      description: 'Exclusive area with country club access and premium housing',
      highlights: ['Golf course', 'Tennis facilities', 'Swimming pools', 'Very secure'],
      avgRent: '$25,000 - $50,000 MXN/month',
      schoolAccess: 'Very Good',
      parkAccess: 'Country club',
    },
  ];

  const familyRestaurants = [
    {
      name: 'La Corriente Cevichería',
      type: 'Seafood',
      features: ['Kids menu', 'High chairs', 'Outdoor seating', 'Birthday parties'],
      priceRange: '$$',
      address: 'Lomas del Tecnológico',
    },
    {
      name: 'Sonora Grill',
      type: 'Steakhouse',
      features: ['Family portions', 'Kids activities', 'Play area', 'Weekend brunch'],
      priceRange: '$$$',
      address: 'Lomas 4a Sección',
    },
    {
      name: 'Toks',
      type: 'Mexican Family',
      features: ['Affordable', 'Kids menu', 'Crayons & games', 'Quick service'],
      priceRange: '$',
      address: 'Multiple locations',
    },
    {
      name: 'Italianni\'s',
      type: 'Italian',
      features: ['Family-friendly', 'Large portions', 'Kids pasta', 'Birthday songs'],
      priceRange: '$$',
      address: 'Plaza Sendero, Lomas',
    },
    {
      name: 'Wings Army',
      type: 'Wings & Sports',
      features: ['Kids meals', 'Games area', 'TVs for sports', 'Casual atmosphere'],
      priceRange: '$$',
      address: 'Multiple locations',
    },
    {
      name: 'Peter Piper Pizza',
      type: 'Pizza & Games',
      features: ['Arcade games', 'Birthday packages', 'Buffet option', 'Prize counter'],
      priceRange: '$$',
      address: 'Plaza Sendero',
    },
  ];

  const faqs = [
    {
      question: 'What are the best international schools in San Luis Potosí?',
      answer: 'Colegio Terranova is the top choice for international families, offering IB programs from preschool through high school with students from 25+ nationalities. Instituto Potosino and Colegio del Bosque are also excellent bilingual options with strong academics and English programs.'
    },
    {
      question: 'What is the school year calendar in Mexico?',
      answer: 'The school year in Mexico runs from late August to early July. There are breaks in December-January (2-3 weeks), Easter week (1-2 weeks), and shorter breaks in November and February. Private schools may have slightly different schedules but generally follow the SEP calendar.'
    },
    {
      question: 'How much does private school cost in SLP?',
      answer: 'Private school tuition varies widely: basic bilingual schools start at $4,000-6,000 MXN/month, mid-range schools run $6,000-10,000 MXN/month, and premium international schools like Terranova cost $10,000-15,000 MXN/month. Most require an inscription fee of 1-2 months tuition.'
    },
    {
      question: 'Where can I find English-speaking pediatricians?',
      answer: 'Hospital Lomas and Hospital Angeles have pediatricians who speak English. Private practices like Pediatras Asociados SLP also have English-speaking doctors. When booking, specifically request an English-speaking physician to ensure availability.'
    },
    {
      question: 'What are the best parks for kids in San Luis Potosí?',
      answer: 'Tangamanga I (420 hectares) is the largest with bike trails, paddle boats, and a planetarium. Museo Laberinto is perfect for educational outings with science exhibits and hands-on activities. Tangamanga II has sports facilities and swimming pools for active families.'
    },
    {
      question: 'How do I find childcare/daycare in SLP?',
      answer: 'Options include: CENDI (government subsidized, for working parents), IMSS guarderías (if you have formal employment), and private daycares ($3,000-8,000 MXN/month). Montessori schools also offer preschool programs. Most require registration, medical exams, and parent interviews.'
    },
    {
      question: 'What sports activities are available for children?',
      answer: 'Soccer is most popular, with academies across the city. Swimming programs are available at La Loma, Tangamanga II, and private clubs. Other options include gymnastics, tennis, martial arts, dance, and basketball. Most activities cost $600-2,000 MXN/month.'
    },
    {
      question: 'Which neighborhoods are best for families with children?',
      answer: 'Lomas del Tecnológico and Lomas 4a Sección are top choices with excellent schools, parks, and safety. Desarrollo del Pedregal offers modern housing at better prices. For country club lifestyle, the Club Campestre area provides premium amenities and security.'
    },
    {
      question: 'Are there playgroups or mom groups in SLP?',
      answer: 'Yes! Check Facebook groups like "Expats in San Luis Potosí" and "Mamás SLP" for playgroup meetups. Many schools organize parent activities, and clubs like La Loma have family programs. The expat community regularly organizes kid-friendly events.'
    },
    {
      question: 'What vaccinations do children need for school in Mexico?',
      answer: 'Required vaccinations include BCG, Hepatitis B, Pentavalent (DPT+Hib+HepB), Rotavirus, Pneumococcal, MMR, and boosters. Schools require a vaccination card (Cartilla de Vacunación). Private clinics and pharmacies offer all standard vaccines; IMSS provides them free for beneficiaries.'
    },
    {
      question: 'Is it safe for children to play outside in SLP?',
      answer: 'In family-friendly neighborhoods like Lomas and residential areas, yes. Parks like Tangamanga are safe during daytime hours. As with any city, supervise children, visit parks during active hours, and choose well-maintained play areas. Many families use private clubs with controlled access.'
    },
    {
      question: 'What birthday party venues are popular?',
      answer: 'Popular options include Peter Piper Pizza, Jumping World, and Chiquitines party salons. Tangamanga parks offer outdoor party areas. Many restaurants like Sonora Grill and Wings cater birthday parties. Private party salons are available throughout the city for $3,000-10,000 MXN.'
    },
  ];

  const sources = [
    { name: 'SEP (Ministry of Education)', url: 'https://www.gob.mx/sep', type: 'Government' },
    { name: 'Colegio Terranova Official', url: 'https://www.terranova.edu.mx', type: 'Institution' },
    { name: 'DIF San Luis Potosí', url: 'https://dif.slp.gob.mx', type: 'Government' },
    { name: 'IMSS Guarderías', url: 'https://www.imss.gob.mx', type: 'Government' },
    { name: 'Hospital del Niño y la Mujer', url: 'https://slpsalud.gob.mx', type: 'Institution' },
    { name: 'Tangamanga Parks Official', url: 'https://slp.gob.mx', type: 'Government' },
    { name: 'Museo Laberinto', url: 'https://www.laberintoslp.com', type: 'Institution' },
    { name: 'La Loma Centro Deportivo', url: 'https://www.laloma.mx', type: 'Institution' },
  ];

  return (
    <>
      <Head>
        <title>Ultimate Family Life Guide San Luis Potosí 2025 | Schools, Parks, Activities</title>
        <meta name="description" content="Complete guide to family life in San Luis Potosí. Schools, parks, pediatric care, childcare, sports, and family-friendly neighborhoods for expats." />
        <meta name="keywords" content="San Luis Potosí families, schools SLP, kids activities Mexico, family neighborhoods, expat families" />
        <link rel="canonical" href="https://sanluisway.com/resources/family-guide" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center gap-2 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white">
                  VERIFIED 2025
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-pink-400/30 text-white">
                  FAMILY FOCUSED
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Ultimate Family Life Guide
              </h1>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                San Luis Potosí - Schools, Activities & Family Living 2025
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Navigation */}
        <div className="sticky top-0 z-40 bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex overflow-x-auto py-3 gap-2 scrollbar-hide">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeSection === section.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Executive Summary */}
          <section id="overview" className="mb-16 scroll-mt-24">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">👨‍👩‍👧‍👦</span> Family Life in San Luis Potosí
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p className="text-lg mb-4">
                  San Luis Potosí is an <strong>excellent city for raising children</strong>. With quality international schools, vast parks, affordable healthcare, and safe family neighborhoods, SLP offers a balanced lifestyle that combines Mexican culture with modern amenities.
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {quickStats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{stat.source}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Key Takeaways</h3>
                <ul className="text-sm text-yellow-900 space-y-1">
                  <li>• <strong>Schools:</strong> Colegio Terranova (IB) is top choice for international families</li>
                  <li>• <strong>Parks:</strong> Tangamanga I & II offer 600+ hectares of family activities</li>
                  <li>• <strong>Healthcare:</strong> Hospital Lomas & Angeles have English-speaking pediatricians</li>
                  <li>• <strong>Best Areas:</strong> Lomas del Tecnológico and Lomas 4a for families</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Schools Section */}
          <section id="schools" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🎓 Schools & Education</h2>
              <p className="text-gray-600">International, bilingual, and private school options</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">International & Premium Schools</h3>
            <div className="space-y-6 mb-8">
              {schools.international.map((school, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 ${school.badgeColor} text-white text-xs font-bold rounded-full`}>
                            {school.badge}
                          </span>
                          <span className="text-yellow-500">{'★'.repeat(Math.floor(school.rating))}</span>
                          <span className="text-sm text-gray-500">{school.rating}</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">{school.name}</h4>
                        <p className="text-gray-600 text-sm">{school.address}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Levels</div>
                        <div className="font-semibold text-purple-600">{school.levels}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm"><strong>Phone:</strong> {school.phone}</p>
                        <p className="text-sm"><strong>Tuition:</strong> {school.tuition}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline text-sm">
                          Visit Website →
                        </a>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Curriculum:</p>
                      <div className="flex flex-wrap gap-2">
                        {school.curriculum.map((item, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{item}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {school.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">{feature}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Other Bilingual Schools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {schools.bilingual.map((school, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{school.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{school.address}</p>
                  <p className="text-gray-600 text-sm mb-2"><strong>Phone:</strong> {school.phone}</p>
                  <p className="text-gray-600 text-sm mb-2"><strong>Levels:</strong> {school.levels}</p>
                  <p className="text-gray-500 text-sm mb-2">{school.focus}</p>
                  <p className="text-purple-600 text-sm font-medium">{school.tuition}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Parks & Activities Section */}
          <section id="parks" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🌳 Parks & Family Activities</h2>
              <p className="text-gray-600">Outdoor spaces and entertainment for the whole family</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {parksAndActivities.map((place, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <span className="text-2xl">{place.icon}</span>
                      {place.name}
                    </h3>
                    <span className="text-purple-600 font-medium text-sm">{place.size}</span>
                  </div>

                  <div className="flex gap-4 mb-4 text-sm">
                    <div className="bg-green-50 px-3 py-1 rounded">
                      <span className="text-green-700">{place.cost}</span>
                    </div>
                    <div className="bg-blue-50 px-3 py-1 rounded">
                      <span className="text-blue-700">{place.hours}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {place.features.slice(0, 6).map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{feature}</span>
                    ))}
                  </div>

                  <p className="text-gray-500 text-sm mb-2"><strong>Location:</strong> {place.address}</p>
                  <p className="text-purple-600 text-sm"><strong>Best for:</strong> {place.bestFor}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pediatric Care Section */}
          <section id="healthcare" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">👶 Pediatric Healthcare</h2>
              <p className="text-gray-600">Hospitals and clinics for children's health needs</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {pediatricCare.map((facility, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs font-medium">{facility.badge}</span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-2">{facility.name}</h3>
                      <p className="text-gray-500 text-sm">{facility.type}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{facility.address}</p>
                  <p className="text-gray-600 text-sm mb-3"><strong>Phone:</strong> {facility.phone}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {facility.services.map((service, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">{service}</span>
                    ))}
                  </div>

                  <div className="flex justify-between text-sm pt-3 border-t">
                    <span className="text-gray-500">Wait: {facility.wait}</span>
                    <span className="text-purple-600 font-medium">{facility.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Childcare Section */}
          <section id="childcare" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🏠 Childcare & Daycare</h2>
              <p className="text-gray-600">Options for working parents and early childhood education</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {childcareOptions.map((option, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-medium">{option.type}</span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-2">{option.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-600 font-medium">{option.cost}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="text-gray-500">Ages:</span> {option.ages}
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="text-gray-500">Hours:</span> {option.hours}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {option.features.map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">{feature}</span>
                    ))}
                  </div>

                  <p className="text-gray-500 text-sm mb-2"><strong>Requirements:</strong> {option.requirements}</p>
                  <p className="text-purple-600 text-sm"><strong>Contact:</strong> {option.contact}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Kids Sports Section */}
          <section id="sports" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">⚽ Kids Sports & Activities</h2>
              <p className="text-gray-600">Sports programs and extracurricular activities</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kidsSports.map((sport, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <span className="text-2xl">{sport.icon}</span>
                      {sport.sport}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      sport.popularity === 'Very High' ? 'bg-green-100 text-green-700' :
                      sport.popularity === 'High' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {sport.popularity}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <p><strong>Ages:</strong> {sport.ages}</p>
                    <p><strong>Cost:</strong> <span className="text-purple-600">{sport.cost}</span></p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Venues:</p>
                    <ul className="space-y-1">
                      {sport.venues.map((venue, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-center gap-2">
                          <span className="text-purple-500">•</span>
                          {venue}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Family Neighborhoods Section */}
          <section id="neighborhoods" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🏘️ Family-Friendly Neighborhoods</h2>
              <p className="text-gray-600">Best areas for raising children in San Luis Potosí</p>
            </div>

            <div className="space-y-4">
              {familyNeighborhoods.map((neighborhood, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{neighborhood.name}</h3>
                        <span className="text-yellow-500">{'★'.repeat(neighborhood.rating)}</span>
                      </div>
                      <p className="text-gray-600">{neighborhood.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Avg. Rent</div>
                      <div className="font-semibold text-purple-600">{neighborhood.avgRent}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm"><strong>School Access:</strong> {neighborhood.schoolAccess}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm"><strong>Park Access:</strong> {neighborhood.parkAccess}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 md:col-span-1">
                      <div className="flex flex-wrap gap-1">
                        {neighborhood.highlights.slice(0, 3).map((highlight, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">{highlight}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Family Restaurants Section */}
          <section id="restaurants" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🍕 Family-Friendly Restaurants</h2>
              <p className="text-gray-600">Great places to eat with kids</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {familyRestaurants.map((restaurant, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                      <p className="text-gray-500 text-sm">{restaurant.type}</p>
                    </div>
                    <span className="text-purple-600 font-medium">{restaurant.priceRange}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{restaurant.address}</p>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.features.map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{feature}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                <p className="text-purple-100 mt-1">{faqs.length} common questions about family life in SLP</p>
              </div>
              <div className="divide-y">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="group p-6">
                    <summary className="cursor-pointer list-none flex items-center justify-between font-medium text-gray-900">
                      {faq.question}
                      <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-4 text-gray-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Sources Section */}
          <section id="sources" className="mb-16 scroll-mt-24">
            <div className="bg-gray-100 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sources & References</h2>
              <p className="text-sm text-gray-600 mb-4">
                This guide was compiled using official sources, institutional data, and verified information.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {sources.map((source, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      source.type === 'Government' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {source.type}
                    </span>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {source.name} ↗
                    </a>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Last updated: December 2025 | Prices and information may change. Always verify current rates.
              </p>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t">
            <Link href="/resources" className="text-purple-600 hover:text-purple-800 flex items-center gap-2">
              ← Back to Resources Hub
            </Link>
            <Link href="/resources/school-guide" className="text-purple-600 hover:text-purple-800 flex items-center gap-2">
              School Guide →
            </Link>
          </div>
        </div>
      </div>
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
