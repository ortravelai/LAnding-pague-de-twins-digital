import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-[#7C3AED]/30 rounded-full mix-blend-screen filter blur-[80px] opacity-60 animate-blob"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#06B6D4]/30 rounded-full mix-blend-screen filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Headline */}
          <h1 className="text-5xl md:text-[80px] font-display font-bold leading-[1.1] mb-12 text-white">
            <span className="block opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Automatiza el 80% de tu Operación.
            </span>
            <span className="block opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <span className="animate-shine font-extrabold">
                Duplica tus Ingresos.
              </span>
            </span>
          </h1>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/573024310220?text=Hola%20Twins,%20quiero%20mi%20demo%20IA%20personalizada"
              target="_blank"
              rel="noopener noreferrer"
              id="btn-whatsapp"
              className="group relative px-8 py-5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
              <span>📱 WhatsApp Demo Gratis</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            {/* Form Button */}
            <button 
              onClick={onOpenModal}
              id="btn-form"
              className="group flex items-center justify-center gap-2 px-8 py-5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium text-lg transition-all border border-white/10 hover:border-primary/50 w-full sm:w-auto backdrop-blur-sm"
            >
              Ver Diagnóstico IA Personalizado <Zap className="w-5 h-5 text-primary group-hover:text-yellow-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;