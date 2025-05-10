import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Certifications />
      <Contact />
      <Gallery /> 
      <Footer />
    </div>
  );
}

export default Home;