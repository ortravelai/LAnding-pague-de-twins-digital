import React, { useState, useEffect, useCallback } from 'react';
import { X, Check } from 'lucide-react';

// ── Hook ─────────────────────────────────────────────────────────────────────

interface UseBookingReturn {
  isOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

export function useBooking(): UseBookingReturn {
  const [isOpen, setIsOpen] = useState(false);
  const openBooking = useCallback(() => setIsOpen(true), []);
  const closeBooking = useCallback(() => setIsOpen(false), []);
  return { isOpen, openBooking, closeBooking };
}

// ── Modal ─────────────────────────────────────────────────────────────────────

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const bullets = [
    'Analizamos tu operación actual',
    'Identificamos dónde Claude AI puede ayudarte más',
    'Te entregamos un plan de acción concreto',
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 [backdrop-filter:blur(4px)] [-webkit-backdrop-filter:blur(4px)]"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[95vh]">

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          {/* Green pulsing badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/40 text-[#22c55e] text-xs font-bold uppercase tracking-widest animate-pulse">
              <span>🎁</span> PRIMERA CONSULTA GRATIS
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
            Agenda tu Asesoría de IA Gratuita
          </h2>
          <p className="text-sm text-zinc-400">
            30 minutos · Sin compromiso · Diagnóstico personalizado
          </p>
        </div>

        {/* Bullets */}
        <div className="px-8 pb-4">
          <ul className="space-y-2">
            {bullets.map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#22c55e]" />
                </span>
                <span className="text-sm text-zinc-300">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Booking iframe */}
        <div className="flex-1 overflow-auto px-2 pb-2">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/o2wUnr9zbu53jSejKfXY"
            width="100%"
            height="650"
            frameBorder={0}
            loading="lazy"
            title="Agenda tu consulta gratuita"
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
