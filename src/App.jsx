import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/home/Hero.jsx';
import Marquee from './components/home/Marquee.jsx';
import Industries from './components/home/Industries.jsx';
import Services from './components/home/Services.jsx';
import Process from './components/home/Process.jsx';
import FeaturedWork from './components/home/FeaturedWork.jsx';
import WhyUs from './components/home/WhyUs.jsx';
import Testimonials from './components/home/Testimonials.jsx';
import Pricing from './components/home/Pricing.jsx';
import FAQ from './components/home/FAQ.jsx';
import FinalCTA from './components/home/FinalCTA.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Industries />
        <Services />
        <Process />
        <FeaturedWork />
        <WhyUs />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
