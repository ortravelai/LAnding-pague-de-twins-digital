import React from 'react';
import Section from './ui/Section';
import { Star, Instagram, Facebook, Linkedin, BadgeCheck, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "Automatizalo.ai me enseñó la teoría, pero Twins me ejecutó la práctica. Resultados tangibles en 10 días. El WhatsApp directo con ellos es oro puro.",
      author: "Carlos R.",
      role: "CEO, Startup Tech",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      highlight: "Resultados en 10 días"
    },
    {
      quote: "La implementación se pagó sola en el primer mes. Pasamos de usar hojas de cálculo a tener un CRM que trabaja solo. Increíble atención.",
      author: "Maria L.",
      role: "Fundadora, E-com Latam",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      highlight: "ROI Inmediato"
    },
    {
      quote: "Estaba escéptico con la IA, pero el bot de agendamiento llenó mi calendario en una semana. Ya no pierdo tiempo persiguiendo clientes.",
      author: "Roberto G.",
      role: "Director Inmobiliaria",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      highlight: "Agenda Llena"
    }
  ];

  return (
    <Section id="testimonials" className="bg-dark border-b border-white/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[5%] w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[10%] left-[5%] w-64 h-64 bg-secondary/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs font-bold text-yellow-500 uppercase tracking-widest mb-4">
            <Star className="w-3 h-3 fill-current" />
            <span>Confianza Total</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Latin Power <span className="text-yellow-500">⚡</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            No somos una agencia gringa traducida. Entendemos el mercado latino, sus retos y cómo vender aquí.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
           {testimonials.map((t, i) => (
             <div key={i} className="p-8 rounded-2xl bg-[#0f1115] border border-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 relative group flex flex-col">
                
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-10 h-10 text-primary" />
                </div>

                <div className="flex gap-1 mb-6 text-yellow-400">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>

                <p className="text-gray-300 italic mb-6 leading-relaxed flex-grow">
                   "{t.quote}"
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-4">
                   <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full border-2 border-white/10 group-hover:border-primary transition-colors" />
                   <div>
                      <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{t.author}</h4>
                          <BadgeCheck className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">{t.role}</span>
                   </div>
                </div>

                {/* Highlight Tag */}
                <div className="absolute -top-3 left-8 bg-dark border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest shadow-xl">
                    {t.highlight}
                </div>
             </div>
           ))}
        </div>

        {/* Social Proof Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 p-8 bg-gradient-to-r from-white/5 to-transparent rounded-2xl border border-white/5 max-w-5xl mx-auto backdrop-blur-sm">
            <div>
                <h4 className="text-xl font-bold text-white mb-1">Únete a la comunidad</h4>
                <p className="text-gray-400 text-sm">Más de 3,200 emprendedores automatizando en LATAM.</p>
            </div>
            
            <div className="flex gap-4">
                <a href="https://www.instagram.com/automatizaconlostwins/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 hover:bg-[#E1306C]/20 border border-white/10 hover:border-[#E1306C]/50 transition-all">
                    <Instagram className="w-5 h-5 text-gray-400 group-hover:text-[#E1306C]" />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">Instagram</span>
                </a>
                <a href="https://www.linkedin.com/in/orlando-miguel-pacheco-v%C3%A1squez-771051157/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 hover:bg-[#0077b5]/20 border border-white/10 hover:border-[#0077b5]/50 transition-all">
                    <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-[#0077b5]" />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">LinkedIn</span>
                </a>
            </div>
        </div>
      </div>
    </Section>
  );
};

export default TestimonialsSection;