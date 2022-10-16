import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Features from '../components/home/Features';
import Hero from '../components/home/Hero';
import Layout from '../components/layout/Layout';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale!, ['common', 'home'])) },
});

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
    </Layout>
  );
}
