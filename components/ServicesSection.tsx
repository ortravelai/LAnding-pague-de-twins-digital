import React from 'react';
import { ArrowRight, Search, Workflow, Bot, Code2, BookOpen, ExternalLink } from 'lucide-react';
import Section from './ui/Section';

// ── Consulting Card ───────────────────────────────────────────────────────────

interface ConsultingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
  onBook: () => void;
}

const ConsultingCard: React.FC<ConsultingCardProps> = ({ icon, title, description, accent, onBook }) => (
  <div className="group flex flex-col h-full p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#7c3aed]/40 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${accent} group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-base font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-5">{description}</p>
    <button
      type="button"
      onClick={onBook}
      className="inline-flex items-center gap-1.5 text-sm text-[#22c55e] font-semibold hover:gap-2.5 transition-all duration-200"
    >
      Agendar Consulta <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

// ── Master Class Card ─────────────────────────────────────────────────────────

interface MasterClassCardProps {
  title: string;
  duration: string;
  level: string;
  description: string;
  color: string;
}

const MasterClassCard: React.FC<MasterClassCardProps> = ({ title, duration, level, description, color }) => (
  <div className={`group flex flex-col h-full p-6 rounded-2xl bg-white/[0.04] border ${color} hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1`}>
    <h3 className="text-base font-bold text-white mb-3">{title}</h3>
    <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-5">{description}</p>
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-zinc-400 font-medium">
          {duration}
        </span>
        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-zinc-400 font-medium">
          {level}
        </span>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 text-xs text-violet-400 font-semibold hover:text-violet-300 transition-colors"
      >
        Ver Programa <ExternalLink className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

// ── Main Section ──────────────────────────────────────────────────────────────

interface ServicesSectionProps {
  onOpenBooking: () => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {

  const consultingServices: ConsultingCardProps[] = [
    {
      icon: <Search className="w-5 h-5 text-cyan-300" />,
      title: 'Diagnóstico y Estrategia IA',
      description: 'Auditamos tu operación actual e identificamos exactamente qué procesos automatizar con Claude AI para máximo impacto.',
      accent: 'bg-cyan-500/15 border border-cyan-500/20',
      onBook: onOpenBooking,
    },
    {
      icon: <Workflow className="w-5 h-5 text-orange-300" />,
      title: 'Automatización con n8n + Make + GHL',
      description: 'Diseñamos e implementamos flujos automatizados que conectan tus herramientas y eliminan el trabajo manual repetitivo.',
      accent: 'bg-orange-500/15 border border-orange-500/20',
      onBook: onOpenBooking,
    },
    {
      icon: <Bot className="w-5 h-5 text-violet-300" />,
      title: 'Agentes con Claude API',
      description: 'Construimos agentes de IA personalizados entrenados con tu información para automatizar decisiones y tareas complejas.',
      accent: 'bg-violet-500/15 border border-violet-500/20',
      onBook: onOpenBooking,
    },
    {
      icon: <Code2 className="w-5 h-5 text-blue-300" />,
      title: 'Implementación Claude Code para Equipos',
      description: 'Onboarding completo de Claude Code en tu equipo técnico: setup, flujos de trabajo y mejores prácticas de desarrollo con IA.',
      accent: 'bg-blue-500/15 border border-blue-500/20',
      onBook: onOpenBooking,
    },
  ];

  const masterClasses: MasterClassCardProps[] = [
    {
      title: 'Master Claude AI Completo',
      duration: '8 semanas',
      level: 'Todos los niveles',
      description: 'Domina Claude Chat, Claude Code y todas las extensiones del ecosistema. Metodología "Aprende IA con la misma IA".',
      color: 'border-violet-500/30 hover:border-violet-500/50',
    },
    {
      title: 'Automatización con n8n + Make',
      duration: '4 semanas',
      level: 'Intermedio',
      description: 'Construye flujos de automatización reales desde cero. Conecta APIs, procesa datos y elimina tareas manuales en tu negocio.',
      color: 'border-orange-500/30 hover:border-orange-500/50',
    },
    {
      title: 'CRM Inteligente con GoHighLevel',
      duration: '3 semanas',
      level: 'Básico-Intermedio',
      description: 'Implementa un CRM completo con automatizaciones de ventas, seguimiento de leads y campañas de marketing integradas con IA.',
      color: 'border-green-500/30 hover:border-green-500/50',
    },
  ];

  return (
    <Section id="servicios" className="bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Línea 1: Consultoría ─────────────────────── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              Línea 1
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              Consultoría IA con Claude
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Implementamos Claude AI en tu empresa de forma personalizada — desde el diagnóstico hasta la puesta en marcha.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {consultingServices.map((s, i) => (
              <ConsultingCard key={i} {...s} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] mb-20" />

        {/* ── Línea 2: Master Classes ──────────────────── */}
        <div id="master-classes">
          <div className="text-center mb-12">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#7c3aed]/15 border border-[#7c3aed]/40 text-violet-300 text-xs font-bold uppercase tracking-widest animate-pulse">
              APRENDE IA CON LA MISMA IA
            </span>
            <div className="inline-block mb-3">
              <span className="block mt-1 text-[10px] text-zinc-600 uppercase tracking-widest font-semibold">Línea 2</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              Master Classes
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Formación práctica y aplicada — aprenderás haciendo, con herramientas reales y casos de negocio concretos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {masterClasses.map((mc, i) => (
              <MasterClassCard key={i} {...mc} />
            ))}
          </div>

          {/* CTA footer */}
          <div className="text-center">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold text-base transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)]"
            >
              <BookOpen className="w-5 h-5" />
              Conoce todos los programas
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </Section>
  );
};

export default ServicesSection;
