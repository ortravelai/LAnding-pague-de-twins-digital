import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#inicio',        label: 'Inicio' },
    { href: '#servicios',     label: 'Servicios' },
    { href: '#master-classes',label: 'Master Classes' },
    { href: '#portafolio',    label: 'Portafolio' },
    { href: '#testimonios',   label: 'Testimonios' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled
        ? 'border-b border-white/[0.06] bg-[#0d1117]/90 [backdrop-filter:blur(24px)] [-webkit-backdrop-filter:blur(24px)] py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 logo-twin group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Cpu className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[15px] font-display font-bold tracking-tight">
            TWINS DIGITAL<span className="text-primary">.IA</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white text-sm font-bold transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(34,197,94,0.35)]"
          >
            🎁 Consulta Gratis
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-white/5 text-zinc-300 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0d1117]/95 [backdrop-filter:blur(24px)] [-webkit-backdrop-filter:blur(24px)] px-6 py-4 flex flex-col gap-1">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => { setIsMenuOpen(false); onOpenModal(); }}
            className="mt-3 w-full py-3 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white text-sm font-bold transition-colors"
          >
            🎁 Consulta Gratis
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
