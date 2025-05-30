import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useState } from 'react';

// --- PAGE TEMPORARILY HIDDEN ---
export const getStaticProps = async () => ({ props: {} });
export default function HiddenCommunityPage() { return null; }
// --- END HIDE ---

// export default function CommunityPage() {
// ... (rest of the file remains, but commented out)
// }
// export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//     },
//   };
// };