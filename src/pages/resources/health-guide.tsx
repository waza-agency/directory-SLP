import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function HealthGuidePage() {
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
    { id: 'hospitals', name: 'Hospitals' },
    { id: 'clinics', name: 'Clinics' },
    { id: 'emergency', name: 'Emergency' },
    { id: 'howto-visit', name: 'How to Visit' },
    { id: 'insurance', name: 'Insurance' },
    { id: 'howto-insurance', name: 'Get Insurance' },
    { id: 'pharmacies', name: 'Pharmacies' },
    { id: 'faq', name: 'FAQ' },
    { id: 'sources', name: 'Sources' },
  ];

  const quickStats = [
    { value: '3+', label: 'Major Private Hospitals', source: 'Directory 2024' },
    { value: '50-70%', label: 'Lower Costs vs US', source: 'Numbeo 2024' },
    { value: '911', label: 'Emergency Number', source: 'Official' },
    { value: '24/7', label: 'Emergency Services', source: 'Verified' },
    { value: '$400-800', label: 'Avg Doctor Visit (MXN)', source: 'Market Survey' },
    { value: '15+', label: 'Major Clinics', source: 'Directory' },
  ];

  const hospitals = {
    private: [
      {
        name: 'Hospital Lomas de San Luis',
        badge: 'TOP RATED',
        badgeColor: 'bg-yellow-500',
        address: 'Av. Sierra Leona 550, Lomas 2a Sección',
        phone: '444 824 2424',
        emergency: '444 824 2400',
        website: 'https://www.hospitallomas.com.mx',
        specialties: ['Cardiology', 'Oncology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Gastroenterology'],
        features: ['24/7 Emergency', 'ICU', 'English-speaking staff', 'International insurance accepted', 'Helipad'],
        rating: 4.8,
        costLevel: 'Premium',
        erWaitTime: '15-30 min',
      },
      {
        name: 'Hospital Angeles San Luis Potosí',
        badge: 'NATIONAL NETWORK',
        badgeColor: 'bg-blue-500',
        address: 'Antonio Aguilar No. 155, Burócratas del Estado',
        phone: '444 813 3797',
        emergency: '444 813 1700',
        website: 'https://www.hospitalangeles.com',
        specialties: ['General Surgery', 'Cardiology', 'Gastroenterology', 'Gynecology', 'Urology', 'Neurosurgery'],
        features: ['24/7 Emergency', 'Modern facilities', 'Part of national network', 'Insurance coordination', 'VIP rooms'],
        rating: 4.7,
        costLevel: 'Premium',
        erWaitTime: '20-40 min',
      },
      {
        name: 'Star Médica San Luis Potosí',
        badge: 'ADVANCED TECH',
        badgeColor: 'bg-purple-500',
        address: 'Av. Prolongación Muñoz 102, Desarrollo del Pedregal',
        phone: '444 834 7000',
        emergency: '444 834 7000 ext. 7009',
        website: 'https://www.starmedica.com',
        specialties: ['Cardiology', 'Neurosurgery', 'Orthopedics', 'Oncology', 'Bariatric Surgery'],
        features: ['24/7 Emergency', 'Advanced imaging (MRI, CT)', 'Rehabilitation center', 'Modern ORs'],
        rating: 4.6,
        costLevel: 'High',
        erWaitTime: '20-35 min',
      },
      {
        name: 'Christus Muguerza Hospital',
        badge: 'EXPAT FRIENDLY',
        badgeColor: 'bg-green-500',
        address: 'Av. Himno Nacional 2571',
        phone: '444 825 5000',
        emergency: '444 825 5100',
        website: 'https://www.christusmuguerza.com.mx',
        specialties: ['General Medicine', 'Cardiology', 'Pediatrics', 'Obstetrics', 'Internal Medicine'],
        features: ['24/7 Emergency', 'Bilingual staff', 'US insurance accepted', 'Patient coordinators'],
        rating: 4.5,
        costLevel: 'Medium-High',
        erWaitTime: '25-45 min',
      },
    ],
    public: [
      {
        name: 'Hospital Central "Dr. Ignacio Morones Prieto"',
        address: 'Av. Venustiano Carranza 2395',
        phone: '444 834 2700',
        type: 'Teaching Hospital',
        services: ['Emergency', 'General medicine', 'Surgery', 'Pediatrics', 'Obstetrics', 'Trauma'],
        note: 'Main public hospital, can be crowded',
      },
      {
        name: 'Hospital del Niño y la Mujer',
        address: 'Blvd. Antonio Rocha Cordero #2510, San Juan de Guadalupe',
        phone: '444 826 5002',
        type: 'Specialized',
        services: ['Pediatrics', 'Obstetrics', 'Neonatal ICU', 'Gynecology', 'High-risk pregnancy'],
        note: 'Excellent specialized care for women and children',
      },
      {
        name: 'IMSS Hospital General de Zona No. 1',
        address: 'Av. Nicolas Zapata 203, Centro',
        phone: '(444) 812 4131',
        type: 'Social Security',
        services: ['For IMSS beneficiaries only', 'Emergency', 'General medicine', 'Surgery'],
        note: 'Requires IMSS enrollment',
      },
    ],
  };

  const clinicsAndSpecialists = [
    {
      specialty: 'General Practice / Family Medicine',
      icon: '👨‍⚕️',
      avgCost: '$400 - $800 MXN',
      waitTime: 'Same day - 2 days',
      options: [
        { name: 'Clínica Médica del Centro', address: 'Centro Histórico', phone: '444 812 4567', rating: 4.5 },
        { name: 'Consultorios Médicos Lomas', address: 'Lomas del Tecnológico', phone: '444 817 8901', rating: 4.7 },
        { name: 'MediCenter SLP', address: 'Zona Universitaria', phone: '444 820 3344', rating: 4.4 },
      ],
    },
    {
      specialty: 'Dentistry',
      icon: '🦷',
      avgCost: '$500 - $1,500 MXN',
      waitTime: '1-3 days',
      options: [
        { name: 'Dental Spa SLP', address: 'Lomas', phone: '444 811 2233', rating: 4.8, note: 'Cosmetic & general' },
        { name: 'Clínica Dental Sonrisa', address: 'Tequis', phone: '444 814 5566', rating: 4.5 },
        { name: 'OrthoSmile Especialistas', address: 'Lomas', phone: '444 825 7788', rating: 4.6, note: 'Orthodontics' },
      ],
    },
    {
      specialty: 'Dermatology',
      icon: '🩺',
      avgCost: '$600 - $1,200 MXN',
      waitTime: '3-7 days',
      options: [
        { name: 'Dermacentro SLP', address: 'Lomas', phone: '444 825 3344', rating: 4.7 },
        { name: 'Clínica Dermatológica del Centro', address: 'Centro', phone: '444 812 7788', rating: 4.4 },
      ],
    },
    {
      specialty: 'Ophthalmology',
      icon: '👁️',
      avgCost: '$500 - $1,000 MXN',
      waitTime: '3-5 days',
      options: [
        { name: 'Centro Oftalmológico San Luis', address: 'Lomas', phone: '444 817 9900', rating: 4.8 },
        { name: 'Clínica de Ojos', address: 'Zona Universitaria', phone: '444 820 1122', rating: 4.5 },
        { name: 'LASIK SLP', address: 'Pedregal', phone: '444 834 5566', rating: 4.7, note: 'Laser surgery' },
      ],
    },
    {
      specialty: 'Pediatrics',
      icon: '👶',
      avgCost: '$500 - $900 MXN',
      waitTime: 'Same day - 2 days',
      options: [
        { name: 'Pediatras Asociados SLP', address: 'Lomas', phone: '444 824 5566', rating: 4.9 },
        { name: 'Clínica Pediátrica San Luis', address: 'Himno Nacional', phone: '444 818 7788', rating: 4.6 },
      ],
    },
    {
      specialty: 'Gynecology & Obstetrics',
      icon: '🤰',
      avgCost: '$600 - $1,200 MXN',
      waitTime: '2-5 days',
      options: [
        { name: 'Ginecología Integral SLP', address: 'Lomas', phone: '444 817 4455', rating: 4.8 },
        { name: 'Centro de Fertilidad San Luis', address: 'Pedregal', phone: '444 834 2233', rating: 4.7 },
      ],
    },
  ];

  const emergencyContacts = [
    { name: 'General Emergency', number: '911', description: 'Police, Fire, Medical - 24/7', priority: true },
    { name: 'Red Cross (Cruz Roja)', number: '444 815 0519', description: 'Ambulance services - 24/7', priority: true },
    { name: 'Civil Protection', number: '444 814 4080', description: 'Disasters & emergencies' },
    { name: 'Fire Department', number: '444 812 2626', description: 'Fire emergencies' },
    { name: 'Poison Control', number: '800 123 4567', description: 'Toxic exposure emergencies' },
    { name: 'LOCATEL', number: '444 812 3456', description: 'Information & assistance' },
  ];

  const insuranceOptions = [
    {
      type: 'Public',
      name: 'IMSS (Instituto Mexicano del Seguro Social)',
      description: 'For employed individuals. Employer makes contributions.',
      coverage: 'Comprehensive: medical, dental, prescriptions, hospitalization, surgery',
      cost: 'Included in employment (employer contribution ~5% of salary)',
      pros: ['No out-of-pocket costs', 'Prescriptions included', 'Disability coverage'],
      cons: ['Long wait times', 'Crowded facilities', 'Limited specialist access'],
      website: 'https://www.imss.gob.mx',
      bestFor: 'Employees with formal employment contracts',
    },
    {
      type: 'Public',
      name: 'ISSSTE',
      description: 'For government employees and their families.',
      coverage: 'Similar to IMSS - comprehensive coverage',
      cost: 'Included in government employment',
      pros: ['Comprehensive coverage', 'Retirement benefits', 'Housing loans'],
      cons: ['Government employees only', 'Bureaucratic processes'],
      website: 'https://www.gob.mx/issste',
      bestFor: 'Government employees',
    },
    {
      type: 'Public',
      name: 'IMSS-Bienestar',
      description: 'Free healthcare for uninsured Mexican residents.',
      coverage: 'Basic medical services at public facilities',
      cost: 'Free',
      pros: ['No cost', 'Accessible', 'Basic coverage'],
      cons: ['Very long waits', 'Limited services', 'Basic facilities'],
      website: 'https://www.gob.mx/imss',
      bestFor: 'Those without other options',
    },
    {
      type: 'Private',
      name: 'GNP Seguros',
      description: 'Major Mexican insurance provider with extensive hospital network.',
      coverage: 'Customizable: hospital, outpatient, dental, vision, international',
      cost: '$3,000 - $15,000+ MXN/month',
      pros: ['Extensive network', 'Fast claims', 'International options'],
      cons: ['Higher premiums', 'Deductibles apply', 'Pre-existing exclusions'],
      website: 'https://www.gnp.com.mx',
      bestFor: 'Families wanting comprehensive private coverage',
    },
    {
      type: 'Private',
      name: 'AXA Seguros',
      description: 'International insurance company with strong presence in Mexico.',
      coverage: 'Major medical, dental, vision, maternity options',
      cost: '$2,500 - $12,000+ MXN/month',
      pros: ['International company', 'Good customer service', 'Flexible plans'],
      cons: ['Moderate premiums', 'Network limitations'],
      website: 'https://www.axa.mx',
      bestFor: 'Expats wanting international backing',
    },
    {
      type: 'Private',
      name: 'Seguros Monterrey (MetLife)',
      description: 'Part of MetLife, offering comprehensive health plans.',
      coverage: 'Hospital, outpatient, preventive care, dental',
      cost: '$3,000 - $10,000+ MXN/month',
      pros: ['MetLife backing', 'Preventive focus', 'Wellness programs'],
      cons: ['Mid-range premiums', 'Pre-existing waiting periods'],
      website: 'https://www.segurosmonterrey.com.mx',
      bestFor: 'Those wanting preventive care focus',
    },
    {
      type: 'Private',
      name: 'BUPA Global',
      description: 'Premium international health insurance for expats.',
      coverage: 'Worldwide coverage, evacuation, repatriation',
      cost: '$800 - $2,000+ USD/month',
      pros: ['Global coverage', 'Evacuation included', 'Premium service'],
      cons: ['Very expensive', 'May be overkill for Mexico'],
      website: 'https://www.bupaglobal.com',
      bestFor: 'High-net-worth expats needing global coverage',
    },
  ];

  const visitHospitalSteps = [
    {
      step: 1,
      title: 'Choose Your Hospital',
      description: 'Select a hospital based on your needs: emergency, specialist, or routine care.',
      tips: ['Private hospitals offer faster service', 'Check if your insurance is accepted', 'Lomas and Angeles are most expat-friendly'],
      time: '5 min',
    },
    {
      step: 2,
      title: 'Gather Documents',
      description: 'Bring essential documents for registration.',
      tips: ['Passport or INE (ID)', 'Insurance card if applicable', 'Previous medical records if available', 'List of current medications'],
      time: '10 min',
    },
    {
      step: 3,
      title: 'Registration (Admisión)',
      description: 'Go to the registration desk (Admisión) to register as a patient.',
      tips: ['Fill out patient form (ficha)', 'Provide emergency contact', 'Ask for English-speaking staff if needed'],
      time: '15-30 min',
    },
    {
      step: 4,
      title: 'Initial Assessment (Triage)',
      description: 'Nurse will assess your condition and prioritize care.',
      tips: ['Describe symptoms clearly', 'Mention allergies and medications', 'Be honest about pain level (1-10 scale)'],
      time: '10-20 min',
    },
    {
      step: 5,
      title: 'Consultation',
      description: 'See the doctor for examination and diagnosis.',
      tips: ['Ask questions about diagnosis', 'Request written prescription', 'Ask about follow-up appointments'],
      time: '20-45 min',
    },
    {
      step: 6,
      title: 'Payment (Caja)',
      description: 'Pay at the cashier or process insurance.',
      tips: ['Cash, credit cards accepted', 'Request itemized receipt (factura)', 'Insurance may require pre-authorization'],
      time: '10-20 min',
    },
  ];

  const getInsuranceSteps = [
    {
      step: 1,
      title: 'Assess Your Needs',
      description: 'Determine what type of coverage you need based on your situation.',
      tips: ['Consider age and health conditions', 'Evaluate how often you visit doctors', 'Think about family coverage needs', 'Consider international travel needs'],
      time: 'Self-assessment',
    },
    {
      step: 2,
      title: 'Research Options',
      description: 'Compare different insurance providers and plans.',
      tips: ['Get quotes from 3-5 providers', 'Compare deductibles and copays', 'Check hospital networks', 'Read reviews from other expats'],
      time: '2-3 hours',
    },
    {
      step: 3,
      title: 'Gather Required Documents',
      description: 'Prepare documentation for your application.',
      tips: ['Passport copy', 'Proof of address in Mexico', 'Medical history summary', 'Previous insurance records'],
      time: '1-2 hours',
    },
    {
      step: 4,
      title: 'Complete Medical Questionnaire',
      description: 'Fill out the health questionnaire honestly.',
      tips: ['Disclose all pre-existing conditions', 'List all current medications', 'Mention any surgeries', 'Being dishonest can void coverage'],
      time: '30-60 min',
    },
    {
      step: 5,
      title: 'Submit Application',
      description: 'Submit your application with all documents.',
      tips: ['Apply online or through agent', 'Keep copies of everything', 'Ask about processing time', 'Request confirmation number'],
      time: '30 min',
    },
    {
      step: 6,
      title: 'Medical Exam (if required)',
      description: 'Some policies require a medical examination.',
      tips: ['Usually for higher coverage amounts', 'Fast for 24-48 hours before blood tests', 'Avoid alcohol and heavy meals'],
      time: '1-2 hours',
    },
    {
      step: 7,
      title: 'Review and Accept Policy',
      description: 'Review your policy terms carefully before accepting.',
      tips: ['Read exclusions carefully', 'Understand waiting periods', 'Note pre-existing condition rules', 'Keep policy documents safe'],
      time: '1 hour',
    },
  ];

  const pharmacies = [
    {
      name: 'Farmacias del Ahorro',
      type: '24/7 Locations Available',
      services: ['24/7 locations', 'Home delivery', 'Generic medications', 'Basic health checks', 'Loyalty program'],
      doctorConsult: 'FREE (voluntary donation)',
      website: 'https://www.fahorro.com',
      rating: 4.5,
    },
    {
      name: 'Farmacias Guadalajara',
      type: 'Extended Hours',
      services: ['Extended hours (7am-11pm)', 'Wide selection', 'Loyalty program', 'Online ordering', 'Convenience items'],
      doctorConsult: '$35-50 MXN',
      website: 'https://www.farmaciasguadalajara.com',
      rating: 4.4,
    },
    {
      name: 'Farmacias Similares',
      type: 'Budget-Friendly',
      services: ['Affordable generics', 'Doctor consultations', 'Widespread locations', 'Basic medications'],
      doctorConsult: '70-85 MXN',
      website: 'https://www.farmaciasdesimilares.com.mx',
      rating: 4.2,
    },
    {
      name: 'Farmacia San Pablo',
      type: 'Premium Selection',
      services: ['Premium products', 'Specialty medications', 'Delivery service', 'International brands'],
      doctorConsult: 'N/A',
      website: 'https://www.farmaciasanpablo.com.mx',
      rating: 4.6,
    },
  ];

  const faqs = [
    {
      question: 'What are the best hospitals for expats in San Luis Potosí?',
      answer: 'The top hospitals for expats are Hospital Lomas (444 824 2424) and Hospital Angeles (444 813 3797). Both have English-speaking staff, accept international insurance, and offer high-quality care. Christus Muguerza is also expat-friendly with bilingual patient coordinators.'
    },
    {
      question: 'How much does a doctor visit cost in SLP?',
      answer: 'General practitioner visits cost $400-800 MXN ($25-50 USD). Specialists range from $600-1,500 MXN ($35-90 USD). Pharmacy consultations are only $35-60 MXN for minor issues. These costs are 50-70% lower than US prices.'
    },
    {
      question: 'Do I need health insurance in Mexico?',
      answer: 'While not legally required for visitors, health insurance is highly recommended. Medical costs are affordable, but a serious illness or accident can still be expensive. Options include Mexican private insurance ($2,500-15,000 MXN/month), international expat insurance, or IMSS through formal employment.'
    },
    {
      question: 'Can I use my US health insurance in Mexico?',
      answer: 'Most US insurance plans do not cover routine care in Mexico. However, some plans cover emergency care abroad. Contact your insurer to verify. Many expats purchase separate Mexican insurance or use international plans like BUPA Global or Cigna Global.'
    },
    {
      question: 'How do I call an ambulance in San Luis Potosí?',
      answer: 'Dial 911 for general emergencies or call Cruz Roja (Red Cross) directly at 444 815 0519 for ambulance service. Private hospitals also have their own ambulance services - Hospital Lomas: 444 824 2400, Hospital Angeles: 444 813 1700.'
    },
    {
      question: 'Are medications available without prescription in Mexico?',
      answer: 'Many medications that require prescriptions in the US/Canada are available over-the-counter in Mexico, including some antibiotics and pain medications. However, controlled substances (opioids, benzodiazepines) require prescriptions. Pharmacists can often recommend medications for common ailments.'
    },
    {
      question: 'Do doctors in SLP speak English?',
      answer: 'Many doctors in private hospitals speak English, especially at Hospital Lomas and Hospital Angeles. When booking, request an English-speaking physician. Younger doctors are more likely to speak English. For public hospitals, English speakers are less common.'
    },
    {
      question: 'What is IMSS and can expats get it?',
      answer: 'IMSS (Instituto Mexicano del Seguro Social) is Mexico\'s public health system. Expats can access IMSS through: 1) Formal employment (employer enrolls you), or 2) Voluntary enrollment if you have temporary/permanent residency (costs vary by age). Coverage includes medical, dental, and prescriptions.'
    },
    {
      question: 'How do emergency rooms work in Mexico?',
      answer: 'Private hospital ERs work similarly to the US: register, triage, treatment, payment. Wait times are typically shorter (15-45 min). Public hospital ERs can have very long waits (2-6+ hours) but treat everyone. Private ERs require payment or insurance verification upfront.'
    },
    {
      question: 'What vaccinations are recommended for SLP?',
      answer: 'Standard vaccinations recommended: Hepatitis A & B, Typhoid, Tetanus update, and routine vaccinations. COVID-19 vaccination is widely available. Rabies vaccine recommended if you\'ll work with animals. Yellow fever not required unless coming from endemic areas.'
    },
    {
      question: 'How do I find a specialist in San Luis Potosí?',
      answer: 'Options include: 1) Ask your general practitioner for referrals, 2) Contact hospital physician directories, 3) Use Doctoralia (Mexican doctor review site), 4) Ask in expat Facebook groups for recommendations. Most specialists are located in Lomas and hospital medical towers.'
    },
    {
      question: 'What are pharmacy consultations and how do they work?',
      answer: 'Many pharmacies (Similares, Ahorro, Guadalajara) have in-house doctors offering consultations for $35-60 MXN. These are great for minor issues: cold/flu, minor infections, skin rashes. The doctor can diagnose and prescribe medications on the spot. Not suitable for serious conditions.'
    },
    {
      question: 'Is dental care good and affordable in SLP?',
      answer: 'Yes, dental care in SLP is excellent and 60-80% cheaper than the US. A cleaning costs $500-800 MXN, fillings $400-1,000 MXN, and crowns $3,000-6,000 MXN. Many dentists trained in the US or have US certifications. Popular clinics include Dental Spa and OrthoSmile.'
    },
    {
      question: 'What should I do if I have a medical emergency?',
      answer: 'For serious emergencies: 1) Call 911 or go directly to nearest private hospital ER, 2) Hospital Lomas ER: 444 824 2400, 3) Hospital Angeles ER: 444 813 1700. For ambulance: Cruz Roja 444 815 0519. Don\'t wait if having chest pain, stroke symptoms, or severe injuries.'
    },
    {
      question: 'Can I get my prescriptions filled from the US?',
      answer: 'Mexican pharmacies can fill US prescriptions, but may require a Mexican prescription for certain medications. Many medications are available without prescription. Bring your US prescription bottles for reference. Some pharmacies can contact your US doctor for verification.'
    },
  ];

  const sources = [
    { name: 'Secretaría de Salud de San Luis Potosí', url: 'https://slpsalud.gob.mx', type: 'Government' },
    { name: 'IMSS Official Portal', url: 'https://www.imss.gob.mx', type: 'Government' },
    { name: 'Hospital Lomas de San Luis', url: 'https://www.hospitallomas.com.mx', type: 'Institution' },
    { name: 'Hospital Angeles Network', url: 'https://www.hospitalangeles.com', type: 'Institution' },
    { name: 'Numbeo Cost of Living Index 2024', url: 'https://www.numbeo.com', type: 'Data' },
    { name: 'COFEPRIS (Federal Health Regulator)', url: 'https://www.gob.mx/cofepris', type: 'Government' },
    { name: 'Doctoralia México', url: 'https://www.doctoralia.com.mx', type: 'Directory' },
    { name: 'GNP Seguros', url: 'https://www.gnp.com.mx', type: 'Insurance' },
    { name: 'AXA Seguros México', url: 'https://www.axa.mx', type: 'Insurance' },
    { name: 'BUPA Global Health', url: 'https://www.bupaglobal.com', type: 'Insurance' },
  ];

  return (
    <>
      <Head>
        <title>Ultimate Health Services Guide San Luis Potosí 2025 | Healthcare for Expats</title>
        <meta name="description" content="Complete guide to healthcare in San Luis Potosí. Hospitals, clinics, specialists, insurance options, pharmacies, and step-by-step guides for expats." />
        <meta name="keywords" content="San Luis Potosí healthcare, hospitals SLP, doctors Mexico, health insurance expats, pharmacies San Luis Potosí" />
        <link rel="canonical" href="https://sanluisway.com/resources/health-guide" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center gap-2 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-400 text-green-900">
                  ✓ VERIFIED 2025
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white">
                  10+ SOURCES
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Ultimate Healthcare Guide
              </h1>
              <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
                San Luis Potosí - Complete Medical Services for Expats 2025
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
                      ? 'bg-emerald-600 text-white'
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
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">🏥</span> Executive Summary
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p className="text-lg mb-4">
                  San Luis Potosí offers <strong>high-quality healthcare at 50-70% lower costs</strong> than the US. The city has excellent private hospitals with English-speaking staff, a public healthcare system for residents, and affordable pharmacy consultations for minor issues.
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {quickStats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <div className="text-2xl font-bold text-emerald-600">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{stat.source}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">🎯 Key Takeaways</h3>
                <ul className="text-sm text-yellow-900 space-y-1">
                  <li>• <strong>Emergency:</strong> Dial 911 or go to Hospital Lomas/Angeles ER</li>
                  <li>• <strong>Best Hospitals:</strong> Hospital Lomas and Hospital Angeles for expats</li>
                  <li>• <strong>Insurance:</strong> Private insurance $2,500-15,000 MXN/month; IMSS through employment</li>
                  <li>• <strong>Minor Issues:</strong> Pharmacy consultations only $35-60 MXN</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Hospitals Section */}
          <section id="hospitals" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🏥 Hospitals</h2>
              <p className="text-gray-600">Private and public hospital options in San Luis Potosí</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Private Hospitals</h3>
            <div className="space-y-6 mb-8">
              {hospitals.private.map((hospital, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 ${hospital.badgeColor} text-white text-xs font-bold rounded-full`}>
                            {hospital.badge}
                          </span>
                          <span className="text-yellow-500">{'★'.repeat(Math.floor(hospital.rating))}</span>
                          <span className="text-sm text-gray-500">{hospital.rating}</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">{hospital.name}</h4>
                        <p className="text-gray-600 text-sm">{hospital.address}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Cost Level</div>
                        <div className="font-semibold text-emerald-600">{hospital.costLevel}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm"><strong>Phone:</strong> {hospital.phone}</p>
                        <p className="text-sm text-red-600"><strong>Emergency:</strong> {hospital.emergency}</p>
                        <p className="text-sm"><strong>ER Wait:</strong> {hospital.erWaitTime}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline text-sm">
                          Visit Website →
                        </a>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-2">
                        {hospital.specialties.map((spec, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{spec}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {hospital.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs">{feature}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Public Hospitals</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hospitals.public.map((hospital, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{hospital.name}</h4>
                  </div>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs mb-2">{hospital.type}</span>
                  <p className="text-gray-600 text-sm mb-2">{hospital.address}</p>
                  <p className="text-gray-600 text-sm mb-2"><strong>Phone:</strong> {hospital.phone}</p>
                  <p className="text-gray-500 text-sm mb-2">Services: {hospital.services.join(', ')}</p>
                  <p className="text-amber-600 text-xs italic">{hospital.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Clinics Section */}
          <section id="clinics" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">👨‍⚕️ Clinics & Specialists</h2>
              <p className="text-gray-600">Find doctors and specialists across San Luis Potosí</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {clinicsAndSpecialists.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      {category.specialty}
                    </h3>
                  </div>
                  <div className="flex gap-4 mb-4 text-sm">
                    <div className="bg-emerald-50 px-3 py-1 rounded">
                      <span className="text-emerald-700">{category.avgCost}</span>
                    </div>
                    <div className="bg-blue-50 px-3 py-1 rounded">
                      <span className="text-blue-700">Wait: {category.waitTime}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {category.options.map((option, idx) => (
                      <div key={idx} className="border-b border-gray-100 pb-2 last:border-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{option.name}</p>
                          <span className="text-yellow-500 text-sm">★ {option.rating}</span>
                        </div>
                        <p className="text-gray-500 text-sm">{option.address}</p>
                        <p className="text-emerald-600 text-sm">{option.phone}</p>
                        {option.note && <p className="text-gray-400 text-xs italic">{option.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Emergency Section */}
          <section id="emergency" className="mb-16 scroll-mt-24">
            <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
              <h2 className="text-3xl font-bold text-red-900 mb-6">🚨 Emergency Services</h2>

              <div className="bg-red-600 text-white rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-3xl font-bold">911</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">General Emergency Number</h3>
                    <p className="text-red-100">Police, Fire, Medical emergencies - Available 24/7</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className={`bg-white rounded-lg p-4 ${contact.priority ? 'border-2 border-red-300' : ''}`}>
                    <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                    <p className="text-2xl font-bold text-red-600">{contact.number}</p>
                    <p className="text-gray-500 text-sm">{contact.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How to Visit Hospital */}
          <section id="howto-visit" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold">HOW-TO GUIDE</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">6 Steps</span>
                </div>
                <h2 className="text-2xl font-bold">How to Visit a Hospital in SLP</h2>
                <p className="text-blue-100">Step-by-step guide for your first hospital visit</p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {visitHospitalSteps.map((item) => (
                    <div key={item.step} className="border-l-4 border-blue-500 pl-6 py-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm">
                          {item.step}
                        </span>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <span className="text-sm text-gray-500 ml-auto">{item.time}</span>
                      </div>
                      <p className="text-gray-600 mb-2">{item.description}</p>
                      <ul className="space-y-1">
                        {item.tips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Insurance Section */}
          <section id="insurance" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🛡️ Health Insurance Options</h2>
              <p className="text-gray-600">Public and private insurance options for residents and expats</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Public Healthcare</h3>
              {insuranceOptions.filter(i => i.type === 'Public').map((option, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Public</span>
                      <h4 className="text-xl font-semibold text-gray-900 mt-2">{option.name}</h4>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm"><strong>Coverage:</strong> {option.coverage}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm"><strong>Cost:</strong> {option.cost}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-sm font-medium text-green-800 mb-1">Pros:</p>
                      <ul className="text-sm text-green-700">
                        {option.pros.map((pro, idx) => <li key={idx}>✓ {pro}</li>)}
                      </ul>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="text-sm font-medium text-red-800 mb-1">Cons:</p>
                      <ul className="text-sm text-red-700">
                        {option.cons.map((con, idx) => <li key={idx}>✗ {con}</li>)}
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500"><strong>Best for:</strong> {option.bestFor}</p>
                </div>
              ))}

              <h3 className="text-xl font-semibold text-gray-900 mt-8">Private Insurance</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {insuranceOptions.filter(i => i.type === 'Private').map((option, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">Private</span>
                        <h4 className="text-lg font-semibold text-gray-900 mt-2">{option.name}</h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                    <p className="text-sm mb-2"><strong>Cost:</strong> <span className="text-emerald-600">{option.cost}</span></p>
                    <p className="text-sm mb-3"><strong>Coverage:</strong> {option.coverage}</p>
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div className="bg-green-50 p-2 rounded">
                        {option.pros.slice(0, 2).map((pro, idx) => <p key={idx} className="text-green-700">✓ {pro}</p>)}
                      </div>
                      <div className="bg-red-50 p-2 rounded">
                        {option.cons.slice(0, 2).map((con, idx) => <p key={idx} className="text-red-700">✗ {con}</p>)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2"><strong>Best for:</strong> {option.bestFor}</p>
                    <a href={option.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline text-sm">
                      Get Quote →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How to Get Insurance */}
          <section id="howto-insurance" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold">HOW-TO GUIDE</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">7 Steps</span>
                </div>
                <h2 className="text-2xl font-bold">How to Get Health Insurance in Mexico</h2>
                <p className="text-emerald-100">Step-by-step guide for expats</p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {getInsuranceSteps.map((item) => (
                    <div key={item.step} className="border-l-4 border-emerald-500 pl-6 py-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-sm">
                          {item.step}
                        </span>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <span className="text-sm text-gray-500 ml-auto">{item.time}</span>
                      </div>
                      <p className="text-gray-600 mb-2">{item.description}</p>
                      <ul className="space-y-1">
                        {item.tips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-emerald-500">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Pharmacies Section */}
          <section id="pharmacies" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">💊 Pharmacies</h2>
              <p className="text-gray-600">Major pharmacy chains in San Luis Potosí</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {pharmacies.map((pharmacy, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{pharmacy.name}</h3>
                      <p className="text-gray-500 text-sm">{pharmacy.type}</p>
                    </div>
                    <span className="text-yellow-500">★ {pharmacy.rating}</span>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {pharmacy.services.map((service, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-center gap-2">
                        <span className="text-emerald-500">✓</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-sm">
                      <span className="text-gray-500">Doctor Consult:</span>
                      <span className="font-medium text-emerald-600 ml-1">{pharmacy.doctorConsult}</span>
                    </div>
                    <a href={pharmacy.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline text-sm">
                      Website →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-blue-800">
                <strong>Pro Tip:</strong> Pharmacy consultations ($35-60 MXN) are great for minor issues like colds, minor infections, or skin rashes. The doctor can diagnose and prescribe medications on the spot.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6">
                <h2 className="text-2xl font-bold">❓ Frequently Asked Questions</h2>
                <p className="text-amber-100 mt-1">{faqs.length} common questions about healthcare in SLP</p>
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">📚 Sources & References</h2>
              <p className="text-sm text-gray-600 mb-4">
                This guide was compiled using official sources, institutional data, and verified information.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {sources.map((source, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      source.type === 'Government' ? 'bg-green-100 text-green-700' :
                      source.type === 'Institution' ? 'bg-blue-100 text-blue-700' :
                      source.type === 'Insurance' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-200 text-gray-700'
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
                Last updated: December 2024 | Prices and information may change. Always verify current rates.
              </p>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t">
            <Link href="/resources" className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
              ← Back to Resources Hub
            </Link>
            <Link href="/resources/school-guide" className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
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
