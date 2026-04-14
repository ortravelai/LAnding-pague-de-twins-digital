import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-grid bg-[#0d1117]">

      {/* Radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-spot w-[700px] h-[400px] bg-[rgba(124,58,237,0.12)] -top-[60px] left-1/2 -translate-x-1/2" />
        <div className="glow-spot w-[400px] h-[300px] bg-[rgba(34,197,94,0.06)] bottom-[5%] right-[5%]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

        {/* Badge */}
        <div className="flex justify-center mb-8 opacity-0 animate-fade-in-up [animation-delay:0s]">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/40 text-[#22c55e] text-xs font-bold uppercase tracking-widest animate-pulse">
            🎁 PRIMERA CONSULTA GRATIS
          </span>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-5xl md:text-[68px] font-display font-bold leading-[1.08] tracking-tight mb-6">
            <span className="block text-gradient opacity-0 animate-fade-in-up [animation-delay:0.1s]">
              Domina Claude AI y
            </span>
            <span className="block opacity-0 animate-fade-in-up [animation-delay:0.25s]">
              Automatiza tu
            </span>
            <span className="block animate-shine opacity-0 animate-fade-in-up [animation-delay:0.4s]">
              Negocio Completo
            </span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-0 animate-fade-in-up [animation-delay:0.55s]">
            Consultoría especializada y Master Classes para empresas en LATAM.
            Aprende a usar Claude Chat, Claude Code, y todo el ecosistema Claude&nbsp;+&nbsp;n8n, Make y GoHighLevel.
          </p>
        </div>

        {/* Single CTA */}
        <div className="flex flex-col items-center gap-3 opacity-0 animate-fade-in-up [animation-delay:0.7s]">
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-base transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(34,197,94,0.35)]"
          >
            Agendar Mi Consulta Gratuita
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-xs text-zinc-500">
            Sin compromiso · 30 minutos · 100% personalizada para tu negocio
          </p>
        </div>

        {/* Social proof */}
        <div className="mt-16 flex flex-col items-center gap-3 opacity-0 animate-fade-in-up [animation-delay:0.9s]">
          <div className="flex -space-x-2">
            {['men/32', 'women/44', 'men/85', 'men/12', 'women/68'].map((p, i) => (
              <img
                key={i}
                src={`https://randomuser.me/api/portraits/${p}.jpg`}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-[#0d1117] object-cover"
              />
            ))}
          </div>
          <p className="text-sm text-zinc-500">
            +<span className="text-zinc-300 font-semibold">500</span> empresas asesoradas en LATAM
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;
