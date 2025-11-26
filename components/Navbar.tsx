import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/90 backdrop-blur-md py-4 shadow-lg border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group logo-twin">
          <div className="relative">
            <Cpu className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight">
            TWINS DIGITAL<span className="text-primary">.IA</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#problema" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Problema</a>
          <a href="#motor" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Motor IA</a>
          <a href="#equipo" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Equipo IA</a>
          <a href="#servicios" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Servicios</a>
          <a href="#demo-ia" className="text-primary hover:text-white transition-colors text-sm font-bold">Probar Demo</a>
          <a href="#portafolio" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Portafolio</a>
          <button 
            id="btn-form-nav"
            onClick={onOpenModal}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border border-white/10 hover:border-primary/50 hover:scale-105"
          >
            Agendar Demo
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
          <a href="#problema" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-primary">Problema</a>
          <a href="#motor" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-primary">Motor IA</a>
          <a href="#equipo" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-primary">Equipo IA</a>
          <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-primary">Servicios</a>
          <a href="#demo-ia" onClick={() => setIsMenuOpen(false)} className="text-primary font-bold">Probar Demo</a>
          <a href="#portafolio" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-primary">Portafolio</a>
          <button 
            onClick={() => {
              setIsMenuOpen(false);
              onOpenModal();
            }}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium mt-4"
          >
            Agendar Demo Gratis
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;