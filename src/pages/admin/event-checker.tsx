import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Event } from '@/types';
import { withAdminPageAuth } from '@/lib/admin-auth';

function EventChecker() {
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [culturalEvents, setCulturalEvents] = useState<Event[]>([]);
  const [artsCultureEvents, setArtsCultureEvents] = useState<Event[]>([]);
  const [musicEvents, setMusicEvents] = useState<Event[]>([]);
  const [sportsEvents, setSportsEvents] = useState<Event[]>([]);
  const [otherEvents, setOtherEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);

        // Fetch all events
        const { data, error } = await supabase
          .from('events')
          .select("*")
          .order('start_date', { ascending: true });

        if (error) throw error;

        setAllEvents(data || []);

        // Filter events by category
        setCulturalEvents(data?.filter(event => event.category === 'cultural') || []);
        setArtsCultureEvents(data?.filter(event => event.category === 'arts-culture') || []);
        setMusicEvents(data?.filter(event => event.category === 'music') || []);
        setSportsEvents(data?.filter(event => event.category === 'sports') || []);
        setOtherEvents(data?.filter(event =>
          event.category !== 'cultural' &&
          event.category !== 'arts-culture' &&
          event.category !== 'music' &&
          event.category !== 'sports'
        ) || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading events...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Event Checker</h1>
      <p className="mb-4">This is a development-only page to check what events are currently in the database.</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <ul className="list-disc pl-5">
          <li>Total events: {allEvents.length}</li>
          <li>Cultural events: {culturalEvents.length}</li>
          <li>Arts-Culture events: {artsCultureEvents.length}</li>
          <li>Music events: {musicEvents.length}</li>
          <li>Sports events: {sportsEvents.length}</li>
          <li>Other events: {otherEvents.length}</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cultural Events</h2>
        {culturalEvents.length > 0 ? (
          <ul className="border rounded-lg divide-y">
            {culturalEvents.map(event => (
              <li key={event.id} className="p-3">
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-gray-500">
                  Dates: {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
                </div>
                <div className="text-sm">{event.location}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No cultural events found.</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Arts-Culture Events</h2>
        {artsCultureEvents.length > 0 ? (
          <ul className="border rounded-lg divide-y">
            {artsCultureEvents.map(event => (
              <li key={event.id} className="p-3">
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-gray-500">
                  Dates: {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
                </div>
                <div className="text-sm">{event.location}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No arts-culture events found.</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Music Events</h2>
        {musicEvents.length > 0 ? (
          <ul className="border rounded-lg divide-y">
            {musicEvents.map(event => (
              <li key={event.id} className="p-3">
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-gray-500">
                  Dates: {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
                </div>
                <div className="text-sm">{event.location}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No music events found.</p>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = withAdminPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    return { props: {} };
  },
});

export default withAdminPageAuth(EventChecker);