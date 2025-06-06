import { GetServerSideProps } from 'next';

// This page redirects /events to /events/all
export default function EventsIndex() {
  return null; // This component will never render due to the redirect
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/events/all',
      permanent: true,
    },
  };
};