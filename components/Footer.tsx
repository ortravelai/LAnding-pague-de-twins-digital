import React from 'react';
import { Instagram, Linkedin, Facebook, Cpu } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Cpu className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-display font-bold tracking-tight">
                TWINS DIGITAL<span className="text-primary animate-pulse">.IA</span>
                </h3>
            </div>
            <p className="text-gray-500 text-sm">Automatiza tu Negocio. Multiplica tus Resultados.</p>
          </div>

          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/automatizaconlostwins/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-[#E1306C] transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=100093798041164" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-[#1877F2] transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/orlando-miguel-pacheco-v%C3%A1squez-771051157/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-[#0077b5] transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; 2024 Twins Digital.IA. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="https://wa.me/573024310220" className="hover:text-gray-400">Contacto Directo</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;