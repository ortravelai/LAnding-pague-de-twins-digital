import React, { useEffect, useState } from 'react';
import Section from './ui/Section';
import { Bot, MessageCircle, Zap, TrendingUp, ArrowRight } from 'lucide-react';

const ConceptSection: React.FC = () => {
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);
  const [c3, setC3] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setC1(p => p < 200 ? p + 4 : 200);
      setC2(p => p < 85  ? p + 1 : 85);
      setC3(p => p < 2   ? +(p + 0.08).toFixed(2) : 2);
    }, 40);
    return () => clearInterval(iv);
  }, []);

  const steps = [
    { icon: MessageCircle, label: 'Entrada',        sub: 'WhatsApp / Email / API',     dim: false },
    { icon: Bot,           label: 'Twin Engine IA', sub: 'Cerebro Digital',            dim: false, highlight: true },
    { icon: Zap,           label: 'Automatización', sub: 'Ejecución 24/7',             dim: false },
    { icon: TrendingUp,    label: 'Dashboard ROI',  sub: 'Ventas & Ahorro',            dim: false },
  ];

  const tools = [
    { label: 'GoHighLevel', className: 'text-[#1877F2] border-[#1877F2]/20 bg-[#1877F2]/07' },
    { label: 'N8N',         className: 'text-[#EA4B71] border-[#EA4B71]/20 bg-[#EA4B71]/07' },
    { label: 'Make',        className: 'text-[#9b59b6] border-[#9b59b6]/20 bg-[#9b59b6]/07' },
    { label: 'WhatsApp API',className: 'text-[#25D366] border-[#25D366]/20 bg-[#25D366]/07' },
  ];

  const stats = [
    { value: `+${c1}`,      label: 'Procesos Automatizados', color: 'text-primary' },
    { value: `${c2}%`,      label: 'Reducción Operativa',    color: 'text-secondary' },
    { value: `+$${c3.toFixed(1)}M`, label: 'Ahorrados a Clientes', color: 'text-emerald-400' },
  ];

  return (
    <Section id="motor" className="section-divider bg-[#09090b]">
      <div className="text-center mb-14">
        <span className="pill mb-5 inline-flex">Tecnología</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
          Cómo Nuestra IA Twin
          <br />
          <span className="text-gradient-purple">Clona tu Mejor Ejecutivo</span>
        </h2>
        <div className="flex justify-center flex-wrap gap-2 mt-6">
          {tools.map(t => (
            <span
              key={t.label}
              className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono border transition-all hover:scale-105 ${t.className}`}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Flow diagram */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-gradient-to-r from-zinc-800 via-primary/40 to-zinc-800 z-0" />

          {steps.map(({ icon: Icon, label, sub, highlight }, i) => (
            <div
              key={i}
              className={`relative z-10 flex flex-col items-center p-6 rounded-2xl text-center transition-all ${
                highlight
                  ? 'bg-primary/10 border border-primary/30 shadow-[0_0_24px_rgba(139,92,246,0.12)]'
                  : 'surface-card hover:-translate-y-1'
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                highlight ? 'bg-primary' : 'bg-white/5 border border-white/8'
              }`}>
                <Icon className={`w-5 h-5 ${highlight ? 'text-white' : 'text-zinc-400'}`} />
              </div>
              <p className="font-semibold text-white text-sm">{label}</p>
              <p className="text-xs text-zinc-500 mt-1">{sub}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 z-20" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#09090b] p-10 text-center">
            <span className={`block text-5xl font-display font-bold ${s.color} mb-2 tracking-tight`}>
              {s.value}
            </span>
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">{s.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ConceptSection;