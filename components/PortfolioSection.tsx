import React from 'react';
import Section from './ui/Section';
import { MessageCircle, ShoppingBag, Calendar, Utensils, Scissors, Smartphone, Activity } from 'lucide-react';

const PortfolioSection: React.FC = () => {
  const cases = [
    {
      client: "Clínica Vitalis",
      category: "Salud",
      problem: "50 llamadas perdidas al día y agenda desordenada.",
      solution: "Agente IA con triage médico y agendamiento.",
      metrics: ["+150% Citas", "-40% Ausentismo"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "Ver Demo Clínica",
      ctaLink: "https://wa.me/573024310220?text=Hola%20Twins,%20quiero%20ver%20el%20demo%20para%20Cl%C3%ADnicas",
      icon: <Activity className="w-4 h-4" />
    },
    {
      client: "Restaurante El Asador",
      category: "Gastronomía",
      problem: "Colapso en horas pico y errores en pedidos.",
      solution: "Menú Interactivo IA integrado a cocina.",
      metrics: ["+25% Ticket Promedio", "Rotación 2x Rápida"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "Ver Demo Restaurante",
      ctaLink: "https://wa.me/573024310220?text=Hola%20Twins,%20quiero%20ver%20el%20demo%20para%20Restaurantes",
      icon: <Utensils className="w-4 h-4" />
    },
    {
      client: "Lumina Spa",
      category: "Belleza",
      problem: "Alto índice de inasistencias (No-shows).",
      solution: "Agenda predictiva con cobro de seña automática.",
      metrics: ["0% No-shows", "Agenda Llena 24/7"],
      image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "Ver Demo SPA",
      ctaLink: "https://wa.me/573024310220?text=Hola%20Twins,%20quiero%20ver%20el%20demo%20para%20SPA",
      icon: <Calendar className="w-4 h-4" />
    },
    {
      client: "Barbería King's Cut",
      category: "Barbería",
      problem: "Pérdida de citas por no contestar WhatsApp.",
      solution: "Bot de reservas con catálogo de cortes.",
      metrics: ["+40% Citas Nuevas", "Fidelización VIP"],
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "Ver Demo Barbería",
      ctaLink: "https://wa.me/573024310220?text=Hola%20Twins,%20quiero%20ver%20el%20demo%20para%20Barber%C3%ADas",
      icon: <Scissors className="w-4 h-4" />
    },
    {
      client: "Urban Kicks",
      category: "E-com Moda",
      problem: "Carritos abandonados y dudas de tallas.",
      solution: "Personal Shopper IA + Recuperación Express.",
      metrics: ["+$15k Recuperados", "3x Retención"],
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "Ver Demo Moda",
      ctaLink: "https://wa.me/573024310220?text=Hola%20Twins,%20quiero%20ver%20el%20demo%20para%20Tiendas%20de%20Ropa",
      icon: <ShoppingBag className="w-4 h-4" />
    },
    {
      client: "TechMobile Store",
      category: "E-com Tech",
      problem: "Consultas repetitivas de stock y specs.",
      solution: "Asesor Técnico IA conectado a inventario.",
      metrics: ["Cierre Automático", "-80% Soporte Manual"],
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "Ver Demo Tech",
      ctaLink: "https://wa.me/573024310220?text=Hola%20Twins,%20quiero%20ver%20el%20demo%20para%20Tiendas%20Tech",
      icon: <Smartphone className="w-4 h-4" />
    }
  ];

  return (
    <Section id="portafolio" className="bg-dark/50 relative">
      <div className="container mx-auto px-6">
         <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
               <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Resultados Reales</h2>
               <p className="text-gray-400 max-w-xl">Soluciones probadas en múltiples industrias. Sin teoría, solo facturación.</p>
            </div>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((item, idx) => (
               <div key={idx} className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-300 hover:scale-105 flex flex-col relative">
                  <div className="h-48 overflow-hidden relative">
                     <img src={item.image} alt={item.client} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-90"></div>
                     <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded border border-white/10">
                        {item.category}
                     </span>
                     <span className="absolute bottom-4 left-4 font-display font-bold text-white text-lg">{item.client}</span>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                     <div className="mb-4">
                         <p className="text-xs text-red-400 mb-1 font-mono">PROBLEMA:</p>
                         <p className="text-gray-300 text-sm">{item.problem}</p>
                     </div>
                     <div className="mb-6">
                         <p className="text-xs text-green-400 mb-1 font-mono">SOLUCIÓN TWINS:</p>
                         <p className="text-white font-medium text-sm">{item.solution}</p>
                     </div>
                     
                     <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                        {item.metrics.map((m, i) => (
                           <span key={i} className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1.5 rounded border border-secondary/20">
                              {m}
                           </span>
                        ))}
                     </div>
                     <a 
                        href={item.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-bold text-sm transition-colors ${idx === 0 ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                     >
                        {item.icon} {item.ctaText}
                     </a>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </Section>
  );
};

export default PortfolioSection;