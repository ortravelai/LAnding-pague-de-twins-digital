import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import ConceptSection from './components/ConceptSection';
import AIEmployeesSection from './components/AIEmployeesSection';
import ServicesSection from './components/ServicesSection';
import RealEstateDemoSection from './components/RealEstateDemoSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Modal from './components/ui/Modal';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Smooth scroll implementation and script loading
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
    
    // Load external script for forms
    const script = document.createElement('script');
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-white">
      <Navbar onOpenModal={openModal} />
      
      <main>
        <Hero onOpenModal={openModal} />
        <ProblemSection />
        <ConceptSection />
        <AIEmployeesSection />
        <ServicesSection />
        <RealEstateDemoSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
      
      {/* Virtual Assistant Widget */}
      <ChatWidget />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="w-full bg-white rounded-lg overflow-hidden">
             <iframe 
                src="https://api.leadconnectorhq.com/widget/form/iHf7I37YHEIJNvomTjhA" 
                style={{ width: '100%', height: '518px', border: 'none', borderRadius: '12px' }}
                id="popup-iHf7I37YHEIJNvomTjhA" 
                title="Web- Cliente potencial OR"
            ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default App;