import { FC } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import Footer from '@/components/Footer';
import { getAllProducts } from '@/lib/api';

interface HomePageProps {
  featuredProducts: any[];
}

const HomePage: FC<HomePageProps> = ({ featuredProducts }) => {
  return (
    <>
      <Head>
        <title>MI Evening Dresses - Exclusive Fashion Shop</title>
        <meta name="description" content="Exclusive evening dresses from MI. Premium quality fashion for special occasions." />
        <meta name="og:title" content="MI Evening Dresses" />
        <meta name="og:image" content="/og-image.jpg" />
      </Head>
      <Header />
      <Hero />
      <ProductShowcase products={featuredProducts} />
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const products = await getAllProducts({ limit: 8 });
  return {
    props: { featuredProducts: products },
    revalidate: 3600,
  };
};

export default HomePage;
