import React from 'react';

// ── SVG icons (simple, inline) ────────────────────────────────────────────────

const IconClaude = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
  </svg>
);

const IconCode = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
  </svg>
);

const IconApi = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5v-3h-2v3H11v-7h2v2h2v-2h2v7h-2zm-6-5.5c0 .83-.67 1.5-1.5 1.5S6 10.83 6 10s.67-1.5 1.5-1.5S9 9.17 9 10zm-3 5h3v-2.75c-.41.17-.83.25-1.5.25-.67 0-1.09-.08-1.5-.25V15z" />
  </svg>
);

const IconN8n = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3a2 2 0 110 4 2 2 0 010-4zm-4 9a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4zm-4 4a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

const IconMake = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
  </svg>
);

const IconGHL = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93V18h-2v1.93C7.06 19.44 4.56 16.94 4.07 14H6v-2H4.07C4.56 9.06 7.06 6.56 10 6.07V8h2V6.07C14.94 6.56 17.44 9.06 17.93 12H16v2h1.93c-.49 2.94-2.99 5.44-5.93 5.93z" />
  </svg>
);

// ── Badge pill ────────────────────────────────────────────────────────────────

interface BadgePillProps {
  label: string;
  icon: React.ReactNode;
  color: string;
}

const BadgePill: React.FC<BadgePillProps> = ({ label, icon, color }) => (
  <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-200 cursor-default`}>
    <span className={color}>{icon}</span>
    <span className="text-sm font-semibold text-zinc-200 whitespace-nowrap">{label}</span>
  </div>
);

// ── Metric ────────────────────────────────────────────────────────────────────

interface MetricProps {
  value: string;
  label: string;
}

const Metric: React.FC<MetricProps> = ({ value, label }) => (
  <div className="text-center px-6 py-4">
    <p className="text-2xl md:text-3xl font-display font-bold text-white mb-1">{value}</p>
    <p className="text-xs text-zinc-500 uppercase tracking-wider">{label}</p>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────

const TrustBadges: React.FC = () => {
  const primary: BadgePillProps[] = [
    { label: 'Claude AI', icon: <IconClaude />, color: 'text-violet-400' },
    { label: 'Claude Code', icon: <IconCode />, color: 'text-cyan-400' },
    { label: 'Claude API', icon: <IconApi />, color: 'text-blue-400' },
  ];

  const complementary: BadgePillProps[] = [
    { label: 'n8n', icon: <IconN8n />, color: 'text-orange-400' },
    { label: 'Make', icon: <IconMake />, color: 'text-pink-400' },
    { label: 'GoHighLevel', icon: <IconGHL />, color: 'text-green-400' },
  ];

  const metrics: MetricProps[] = [
    { value: '+200', label: 'proyectos' },
    { value: '+500', label: 'empresas asesoradas' },
    { value: 'LATAM', label: 'presencia regional' },
  ];

  return (
    <section className="py-16 bg-[#0d1117] border-y border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6">

        {/* Title */}
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-8">
          Tecnologías que dominamos
        </p>

        {/* Row 1 — Primary */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {primary.map((b) => (
            <BadgePill key={b.label} {...b} />
          ))}
        </div>

        {/* Row 2 — Complementary */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {complementary.map((b) => (
            <BadgePill key={b.label} {...b} />
          ))}
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap justify-center divide-x divide-white/10">
          {metrics.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustBadges;
