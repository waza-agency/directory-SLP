import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useState } from 'react';

export default function CommunityPage() {
  const { t } = useTranslation('common');
  const [activeSection, setActiveSection] = useState('events');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const sections = [
    { id: 'events', name: 'Community Events' },
    { id: 'groups', name: 'Community Groups' },
    { id: 'volunteer', name: 'Volunteer' },
    { id: 'social', name: 'Social Networks' },
    { id: 'resources', name: 'Resources' },
  ];

  const communityEvents = {
    upcoming: [
      {
        title: 'International Food Festival',
        date: 'June 15, 2024',
        time: '12:00 PM - 8:00 PM',
        location: 'Plaza de Armas',
        description: 'Share your favorite dishes from your home country and try others!',
        type: 'Food & Culture',
      },
      {
        title: 'Language Exchange Meetup',
        date: 'June 20, 2024',
        time: '6:00 PM - 8:00 PM',
        location: 'Café La Parroquia',
        description: 'Practice Spanish and English in a friendly environment',
        type: 'Language',
      },
      {
        title: 'Hiking Group Outing',
        date: 'June 25, 2024',
        time: '8:00 AM - 2:00 PM',
        location: 'Parque Tangamanga I',
        description: 'Join our monthly hiking adventure through local trails',
        type: 'Sports & Recreation',
      },
    ],
    recurring: [
      {
        title: 'Weekly Coffee Meetup',
        schedule: 'Every Tuesday',
        time: '10:00 AM',
        location: 'Starbucks Plaza San Luis',
        description: 'Casual meetup for coffee and conversation',
      },
      {
        title: 'Book Club',
        schedule: 'First Thursday of each month',
        time: '7:00 PM',
        location: 'Café La Antigua',
        description: 'Discuss books in both English and Spanish',
      },
      {
        title: 'Yoga in the Park',
        schedule: 'Every Saturday',
        time: '8:00 AM',
        location: 'Parque Tangamanga II',
        description: 'Free yoga sessions for all levels',
      },
    ],
  };

  const communityGroups = {
    cultural: [
      {
        name: 'SLP International Club',
        description: 'Regular cultural exchange events and social gatherings',
        contact: 'slp.international@gmail.com',
        activities: ['Cultural festivals', 'Food sharing', 'Language exchange'],
      },
      {
        name: 'Art & Culture Exchange',
        description: 'Group focused on sharing and experiencing different art forms',
        contact: 'artexchange.slp@gmail.com',
        activities: ['Art exhibitions', 'Workshops', 'Gallery visits'],
      },
    ],
    sports: [
      {
        name: 'SLP Runners',
        description: 'Running group for all levels',
        contact: 'slp.runners@gmail.com',
        activities: ['Weekly runs', 'Marathon training', 'Trail running'],
      },
      {
        name: 'International Sports Club',
        description: 'Various sports activities and tournaments',
        contact: 'sports.slp@gmail.com',
        activities: ['Soccer', 'Basketball', 'Tennis'],
      },
    ],
    professional: [
      {
        name: 'SLP Business Network',
        description: 'Networking events for professionals',
        contact: 'business.slp@gmail.com',
        activities: ['Networking events', 'Workshops', 'Mentorship'],
      },
      {
        name: 'Tech Meetup SLP',
        description: 'Technology and innovation community',
        contact: 'tech.slp@gmail.com',
        activities: ['Tech talks', 'Hackathons', 'Workshops'],
      },
    ],
  };

  const volunteerOpportunities = {
    organizations: [
      {
        name: 'Casa Hogar San José',
        description: 'Children\'s home providing care and education',
        needs: ['Teaching', 'Childcare', 'Administrative support'],
        contact: '444 812 3456',
        website: 'https://casahogarsanjose.org',
      },
      {
        name: 'Refugio Animal SLP',
        description: 'Animal shelter and rescue organization',
        needs: ['Animal care', 'Veterinary assistance', 'Fundraising'],
        contact: '444 823 4567',
        website: 'https://refugioanimal.slp.org',
      },
      {
        name: 'Educación para Todos',
        description: 'Educational support for underprivileged children',
        needs: ['Tutoring', 'Material donations', 'Event organization'],
        contact: '444 834 5678',
        website: 'https://educacionparatodos.slp.org',
      },
    ],
  };

  const socialNetworks = {
    facebook: [
      {
        name: 'Expats in SLP',
        description: 'Main community group for expatriates',
        members: '2.5k',
        link: 'https://facebook.com/expatsinslp',
      },
      {
        name: 'SLP Events & Activities',
        description: 'Events and activities in San Luis Potosí',
        members: '5k',
        link: 'https://facebook.com/slpevents',
      },
    ],
    whatsapp: [
      {
        name: 'SLP Community Chat',
        description: 'General community chat for announcements and quick questions',
        members: '500',
        contact: '444 812 3456',
      },
      {
        name: 'SLP Emergency Support',
        description: 'Emergency assistance and information sharing',
        members: '200',
        contact: '444 823 4567',
      },
    ],
  };

  const resources = {
    support: [
      {
        title: 'Emergency Support Network',
        description: '24/7 emergency contact list and support system',
        contact: '444 812 3456',
        services: ['Emergency contacts', 'Medical referrals', 'Legal assistance'],
      },
      {
        title: 'Mental Health Support',
        description: 'Counseling and mental health resources',
        contact: '444 823 4567',
        services: ['Individual counseling', 'Support groups', 'Crisis intervention'],
      },
    ],
    information: [
      {
        title: 'Community Resource Center',
        description: 'Information hub for community services and resources',
        location: 'Centro Histórico',
        services: ['Document translation', 'Legal advice', 'Cultural orientation'],
      },
      {
        title: 'Newcomer Welcome Program',
        description: 'Orientation program for new residents',
        contact: '444 834 5678',
        services: ['City orientation', 'Cultural adaptation', 'Resource connection'],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Community - SLP Descubre</title>
        <meta name="description" content="Connect with the expat and local community in San Luis Potosí. Find community events, groups, and ways to get involved." />
        <meta name="keywords" content="San Luis Potosí community, expat groups, community events, volunteer opportunities, social networks" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/images/cultura-3.jpg"
              alt="San Luis Potosí community"
              fill
              className="object-cover opacity-50"
              priority
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Join Our Community
              </h1>
              <p className="text-white text-lg">
                Connect, share, and grow with the SLP community
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="sticky top-0 bg-white shadow-md z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex overflow-x-auto space-x-4 pb-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeSection === section.id
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Community Events Section */}
            <section id="events" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Community Events</h2>
              <div className="space-y-6">
                {/* Upcoming Events */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                  <div className="space-y-4">
                    {communityEvents.upcoming.map((event, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {event.date}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {event.time}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {event.type}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-2">{event.location}</p>
                        <p className="text-gray-600 mt-2">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recurring Events */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recurring Events</h3>
                  <div className="space-y-4">
                    {communityEvents.recurring.map((event, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-gray-600">{event.schedule}</p>
                        <p className="text-gray-600">{event.time}</p>
                        <p className="text-gray-600">{event.location}</p>
                        <p className="text-gray-600 mt-2">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Community Groups Section */}
            <section id="groups" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Community Groups</h2>
              <div className="space-y-6">
                {/* Cultural Groups */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Cultural Groups</h3>
                  <div className="space-y-4">
                    {communityGroups.cultural.map((group, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{group.name}</h4>
                        <p className="text-gray-600">{group.description}</p>
                        <p className="text-primary">{group.contact}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {group.activities.map((activity, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sports Groups */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sports Groups</h3>
                  <div className="space-y-4">
                    {communityGroups.sports.map((group, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{group.name}</h4>
                        <p className="text-gray-600">{group.description}</p>
                        <p className="text-primary">{group.contact}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {group.activities.map((activity, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional Groups */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Groups</h3>
                  <div className="space-y-4">
                    {communityGroups.professional.map((group, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{group.name}</h4>
                        <p className="text-gray-600">{group.description}</p>
                        <p className="text-primary">{group.contact}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {group.activities.map((activity, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Volunteer Section */}
            <section id="volunteer" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Volunteer Opportunities</h2>
              <div className="space-y-6">
                {volunteerOpportunities.organizations.map((org, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-elegant p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{org.name}</h3>
                    <p className="text-gray-600">{org.description}</p>
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Current Needs:</h4>
                      <div className="flex flex-wrap gap-2">
                        {org.needs.map((need, idx) => (
                          <span key={idx} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                            {need}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-primary">Contact: {org.contact}</p>
                      <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Visit Website
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Social Networks Section */}
            <section id="social" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Social Networks</h2>
              <div className="space-y-6">
                {/* Facebook Groups */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Facebook Groups</h3>
                  <div className="space-y-4">
                    {socialNetworks.facebook.map((group, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{group.name}</h4>
                        <p className="text-gray-600">{group.description}</p>
                        <p className="text-gray-600">{group.members} members</p>
                        <a href={group.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Join Group
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Groups */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">WhatsApp Groups</h3>
                  <div className="space-y-4">
                    {socialNetworks.whatsapp.map((group, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{group.name}</h4>
                        <p className="text-gray-600">{group.description}</p>
                        <p className="text-gray-600">{group.members} members</p>
                        <p className="text-primary">Contact: {group.contact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Resources Section */}
            <section id="resources" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Community Resources</h2>
              <div className="space-y-6">
                {/* Support Services */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Support Services</h3>
                  <div className="space-y-4">
                    {resources.support.map((service, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{service.title}</h4>
                        <p className="text-gray-600">{service.description}</p>
                        <p className="text-primary">Contact: {service.contact}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {service.services.map((s, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Information Services */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Information Services</h3>
                  <div className="space-y-4">
                    {resources.information.map((service, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{service.title}</h4>
                        <p className="text-gray-600">{service.description}</p>
                        {service.location && <p className="text-gray-600">Location: {service.location}</p>}
                        {service.contact && <p className="text-primary">Contact: {service.contact}</p>}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {service.services.map((s, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}; 