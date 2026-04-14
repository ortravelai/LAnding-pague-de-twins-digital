import React from 'react';
import { ArrowRight, Cpu, Instagram, Linkedin, Facebook } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const navLinks = [
    { href: '#servicios',      label: 'Servicios' },
    { href: '#master-classes', label: 'Master Classes' },
    { href: '#portafolio',     label: 'Portafolio' },
  ];

  return (
    <footer className="bg-[#0d1117] border-t border-white/[0.06]">

      {/* CTA band */}
      <div className="border-b border-white/[0.06] py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">
            ¿Listo para dar el siguiente paso?
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Domina la IA. Automatiza tu Negocio.
            <span className="block text-[#22c55e]">Multiplica tus Resultados.</span>
          </h2>
          <p className="text-zinc-400 mb-8">
            Primera consulta 100% gratuita · Sin compromiso · 30 minutos
          </p>
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-base transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(34,197,94,0.35)]"
          >
            Agenda tu Consulta Gratuita
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">

          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Cpu className="w-5 h-5 text-primary" />
              <span className="text-lg font-display font-bold tracking-tight">
                TWINS DIGITAL<span className="text-primary">.IA</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 max-w-xs">
              Consultoría especializada en Claude AI y automatización para empresas en LATAM.
            </p>
          </div>

          {/* Links */}
          <nav className="flex gap-6">
            {navLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/automatizaconlostwins/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-[#E1306C] hover:border-[#E1306C]/30 transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100093798041164"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-[#1877F2] hover:border-[#1877F2]/30 transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/orlando-miguel-pacheco-v%C3%A1squez-771051157/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-[#0077b5] hover:border-[#0077b5]/30 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 text-center">
          <p className="text-xs text-zinc-600">
            &copy; 2025 Twins Digital IA · LATAM
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
