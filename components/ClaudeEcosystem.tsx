import React from 'react';
import { MessageSquare, Code2, Chrome, Table2, Presentation, Puzzle, ArrowRight } from 'lucide-react';
import Section from './ui/Section';

interface EcosystemCardProps {
  icon: React.ReactNode;
  product: string;
  description: string;
  accent: string;
}

const EcosystemCard: React.FC<EcosystemCardProps> = ({ icon, product, description, accent }) => (
  <div className={`group relative p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#7c3aed]/40 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07] flex flex-col gap-3`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent} group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <div>
      <h3 className="text-base font-bold text-white mb-1">{product}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

interface ClaudeEcosystemProps {
  onOpenBooking: () => void;
}

const ClaudeEcosystem: React.FC<ClaudeEcosystemProps> = ({ onOpenBooking }) => {
  const products: EcosystemCardProps[] = [
    {
      icon: <MessageSquare className="w-5 h-5 text-violet-300" />,
      product: 'Claude Chat',
      description: 'IA conversacional avanzada para análisis, redacción y resolución de problemas complejos.',
      accent: 'bg-violet-500/15 border border-violet-500/20',
    },
    {
      icon: <Code2 className="w-5 h-5 text-cyan-300" />,
      product: 'Claude Code',
      description: 'Desarrollo y automatización con IA. Escribe, revisa y despliega código a velocidad IA.',
      accent: 'bg-cyan-500/15 border border-cyan-500/20',
    },
    {
      icon: <Chrome className="w-5 h-5 text-blue-300" />,
      product: 'Claude en Chrome',
      description: 'Browsing inteligente: resume páginas, extrae datos y responde preguntas en tiempo real.',
      accent: 'bg-blue-500/15 border border-blue-500/20',
    },
    {
      icon: <Table2 className="w-5 h-5 text-emerald-300" />,
      product: 'Claude en Excel',
      description: 'Análisis de datos con IA directamente en tus hojas de cálculo. Fórmulas y reportes automáticos.',
      accent: 'bg-emerald-500/15 border border-emerald-500/20',
    },
    {
      icon: <Presentation className="w-5 h-5 text-orange-300" />,
      product: 'Claude en PowerPoint',
      description: 'Presentaciones inteligentes generadas con IA. Estructura, contenido y diseño optimizados.',
      accent: 'bg-orange-500/15 border border-orange-500/20',
    },
    {
      icon: <Puzzle className="w-5 h-5 text-pink-300" />,
      product: 'Claude API',
      description: 'Integraciones empresariales a medida. Conecta Claude a tus sistemas, apps y flujos de trabajo.',
      accent: 'bg-pink-500/15 border border-pink-500/20',
    },
  ];

  return (
    <Section id="ecosistema-claude" className="relative overflow-hidden bg-[#111827]">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#7c3aed]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#7c3aed]/15 border border-[#7c3aed]/40 text-violet-300 text-xs font-bold uppercase tracking-widest animate-pulse">
            PARTNER ECOSYSTEM
          </span>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            La Herramienta <span className="text-gradient-purple">#1</span> que Enseñamos a Dominar
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Todo el ecosistema Claude AI, de punta a punta — te enseñamos a usarlo para transformar tu negocio.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {products.map((p, i) => (
            <EcosystemCard key={i} {...p} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold text-base transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)]"
          >
            Aprende a usar todo el ecosistema
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </Section>
  );
};

export default ClaudeEcosystem;
