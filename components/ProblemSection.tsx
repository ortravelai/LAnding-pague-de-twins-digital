import React, { useRef } from 'react';
import Section from './ui/Section';
import { XCircle, CheckCircle2, Clock, Flame, Zap } from 'lucide-react';

const ProblemSection: React.FC = () => {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card  = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;
    const r       = card.getBoundingClientRect();
    const rotateX = (((e.clientY - r.top)  / r.height) - 0.5) * -10;
    const rotateY = (((e.clientX - r.left) / r.width)  - 0.5) *  10;
    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    if (glare) glare.style.setProperty('--glare-deg', `${115 + rotateY * 2}deg`);
  };

  const handleMouseEnter = () => {
    cardRef.current?.style.setProperty('--trs', 'none');
    glareRef.current?.style.setProperty('--glare-op', '1');
  };

  const handleMouseLeave = () => {
    const card  = cardRef.current;
    const glare = glareRef.current;
    if (card) {
      card.style.setProperty('--rx',  '0deg');
      card.style.setProperty('--ry',  '0deg');
      card.style.setProperty('--trs', 'transform 0.5s ease-out');
    }
    glare?.style.setProperty('--glare-op', '0');
  };

  return (
    <Section id="problema" className="bg-[#09090b] section-divider overflow-hidden">

      {/* Section header */}
      <div className="text-center mb-16">
        <span className="pill mb-5 inline-flex">Diagnóstico</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
          ¿Por qué los cursos genéricos
          <br />
          <span className="text-gradient-purple">no te dan resultados?</span>
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          La diferencia entre «saber usar la herramienta» y{' '}
          <span className="text-zinc-200 font-medium">tener un negocio automatizado</span>.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 max-w-6xl mx-auto">

        {/* LEFT — The trap */}
        <div className="surface-card rounded-2xl p-8 flex-1 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-red-500/8 border border-red-500/15 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Cursos / DIY</h3>
              <p className="text-xs text-red-400 font-mono uppercase tracking-widest mt-0.5">La trampa</p>
            </div>
          </div>
          <ul className="space-y-5">
            {[
              'Semanas aprendiendo prompt engineering en lugar de vender.',
              'Templates genéricos que alucinan y queman a tus leads.',
              'Cuando la API falla, estás completamente solo.',
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500/50 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-400">{t}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* CENTER — Twins solution (elevated) */}
        {/*
          CSS variables set imperatively via style.setProperty() in event handlers.
          No style={} attribute needed — satisfies no-inline-styles rule.
        */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative flex-1 lg:flex-[1.25] rounded-2xl cursor-default overflow-hidden [transform:perspective(1000px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_scale3d(1.04,1.04,1.04)] [transition:var(--trs,transform_0.5s_ease-out)]"
        >
          {/* Border gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/30 to-primary/5 p-px">
            <div className="absolute inset-0 rounded-2xl bg-[#111113]" />
          </div>

          {/* Glare — CSS vars updated imperatively */}
          <div
            ref={glareRef}
            className="absolute inset-0 rounded-2xl pointer-events-none z-10 [transition:opacity_0.3s] [background:linear-gradient(var(--glare-deg,115deg),transparent_35%,rgba(255,255,255,0.06)_50%,transparent_65%)] [opacity:var(--glare-op,0)]"
          />

          <div className="relative z-20 p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Twins Digital.IA</h3>
                  <p className="text-xs text-primary font-mono uppercase tracking-widest mt-0.5">Partner de crecimiento</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary uppercase tracking-wider">
                Done-For-You
              </span>
            </div>

            <div className="space-y-3 flex-grow">
              {[
                'Implementación más segura y rápida.',
                'Facturación desde el Día 1. Nosotros configuramos, tú cobras.',
                'Soporte técnico VIP por WhatsApp con ingenieros reales.',
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-primary/20 hover:bg-white/5 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <p className="text-sm text-zinc-200">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Cost of waiting */}
        <div className="surface-card rounded-2xl p-8 flex-1 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-amber-500/8 border border-amber-500/15 flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Costo de Esperar</h3>
              <p className="text-xs text-amber-400 font-mono uppercase tracking-widest mt-0.5">La realidad</p>
            </div>
          </div>
          <ul className="space-y-5 mb-8">
            {[
              { icon: Clock, text: 'Sigues perdiendo 15+ horas/semana en tareas de «copy-paste».' },
              { icon: Flame, text: 'Tu competencia responde en segundos con IA. Tú tardas horas.' },
            ].map(({ icon: Icon, text }, i) => (
              <li key={i} className="flex items-start gap-3">
                <Icon className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-400">{text}</p>
              </li>
            ))}
          </ul>
          <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/15">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 font-mono">Dinero dejado en la mesa</p>
            <p className="text-2xl font-display font-bold text-red-400 tracking-tight">−$20,000 USD/año</p>
          </div>
        </div>

      </div>
    </Section>
  );
};

export default ProblemSection;
