import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import ServicesSection from './components/ServicesSection';
import ClaudeEcosystem from './components/ClaudeEcosystem';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import BookingModal, { useBooking } from './components/BookingModal';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const { isOpen, openBooking, closeBooking } = useBooking();

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans selection:bg-primary selection:text-white">
      <Navbar onOpenModal={openBooking} />

      <main>
        {/* Hero con badge de consulta gratis */}
        <Hero onOpenModal={openBooking} />

        {/* Trust badges y métricas */}
        <TrustBadges />

        {/* Servicios: Consultoría + Master Classes */}
        <ServicesSection onOpenBooking={openBooking} />

        {/* Ecosistema Claude AI */}
        <ClaudeEcosystem onOpenBooking={openBooking} />

        {/* Casos de éxito */}
        <PortfolioSection />

        {/* Testimonios */}
        <TestimonialsSection />
      </main>

      <Footer onOpenBooking={openBooking} />

      {/* Asistente virtual */}
      <ChatWidget />

      {/* Modal de booking */}
      <BookingModal isOpen={isOpen} onClose={closeBooking} />
    </div>
  );
};

export default App;
