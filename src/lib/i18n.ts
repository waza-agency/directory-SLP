import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext, GetServerSidePropsContext } from 'next';

export const getI18nProps = async (
  context: GetStaticPropsContext | GetServerSidePropsContext,
  namespaces: string[] = ['common']
) => {
  const locale = context.locale ?? 'es';
  return serverSideTranslations(locale, namespaces);
};

export const makeStaticProps = (namespaces: string[] = ['common']) => {
  return async (context: GetStaticPropsContext) => ({
    props: {
      ...(await getI18nProps(context, namespaces)),
    },
  });
};
