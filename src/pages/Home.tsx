import React from 'react';
import { Hero } from '../components/Hero';
import { WhyCreNeev } from '../components/WhyCreNeev';
import { FAQ } from '../components/FAQ';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <WhyCreNeev />
      <FAQ />
    </>
  );
};
