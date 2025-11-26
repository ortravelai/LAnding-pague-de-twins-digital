import React, { useState, useRef } from 'react';
import Section from './ui/Section';
import { XCircle, CheckCircle2, Clock, AlertTriangle, Flame, Zap } from 'lucide-react';

const ProblemSection: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation based on mouse position
    // Divide by const to control sensitivity (higher = less sensitive)
    const rotateX = ((y - centerY) / 20) * -1; // Invert X axis for natural feel
    const rotateY = (x - centerX) / 20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <Section id="problema" className="bg-dark relative z-20 overflow-hidden py-24">
      {/* Creative Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            ¿Por qué los cursos genéricos <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">no te dan resultados?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            La diferencia entre "saber usar la herramienta" y <span className="text-white font-semibold">tener un negocio automatizado</span>.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 max-w-7xl mx-auto perspective-1000">
          
          {/* CARD 1: THE PROBLEM (Left) */}
          <div className="w-full lg:w-1/3 bg-[#0f1115] border border-white/5 p-8 rounded-3xl lg:rounded-r-none lg:rounded-l-3xl relative group hover:bg-white/[0.02] transition-all duration-300 z-10 lg:transform lg:translate-x-4 lg:scale-95">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-50"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 group-hover:border-red-500/50 transition-colors">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Cursos</h3>
                <p className="text-xs text-red-400 font-mono uppercase tracking-widest">La Trampa</p>
              </div>
            </div>

            <ul className="space-y-6">
              <li className="flex items-start gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                <XCircle className="w-5 h-5 text-red-500/50 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400">Pasas <span className="text-gray-300 line-through">semanas</span> aprendiendo prompt engineering en lugar de vender.</p>
              </li>
              <li className="flex items-start gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                <XCircle className="w-5 h-5 text-red-500/50 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400">Templates genéricos de "ChatGPT" que alucinan y <span className="text-red-400">queman a tus leads</span>.</p>
              </li>
              <li className="flex items-start gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                <XCircle className="w-5 h-5 text-red-500/50 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400">Cuando la API falla (y fallará), estás <span className="text-white">completamente solo</span>.</p>
              </li>
            </ul>
          </div>

          {/* CARD 2: THE SOLUTION (Center - Hero - 3D ROTATION) */}
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.1, 1.1, 1.1)`,
              transition: isHovering ? 'none' : 'transform 0.5s ease-out',
            }}
            className="w-full lg:w-[38%] bg-dark/90 backdrop-blur-xl border border-primary/50 p-10 rounded-3xl relative z-30 shadow-[0_0_50px_rgba(124,58,237,0.15)] flex flex-col ring-1 ring-white/10 overflow-hidden group cursor-default"
          >
            
            {/* Dynamic Glare/Shine Effect */}
            <div 
              className="absolute inset-0 pointer-events-none z-20 opacity-40 mix-blend-overlay transition-opacity duration-300"
              style={{
                background: `linear-gradient(${115 + rotation.y * 2}deg, transparent 30%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
                opacity: isHovering ? 0.4 : 0
              }}
            ></div>

            {/* Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(124,58,237,1)]"></div>
            
            <div className="absolute -right-12 -top-12 w-24 h-24 bg-secondary/20 rounded-full blur-2xl group-hover:bg-secondary/30 transition-colors"></div>

            <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/30">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Twins Digital.IA</h3>
                    <p className="text-xs text-primary font-mono uppercase tracking-widest font-bold">Partner de Crecimiento</p>
                  </div>
                </div>
                <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg border border-white/20">
                  Done-For-You
                </span>
              </div>

              <div className="space-y-6 mb-2">
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-colors group/item hover:bg-white/10">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-sm text-gray-200 font-medium">Implementación más segura.</p>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-colors group/item hover:bg-white/10">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-sm text-gray-200 font-medium">Facturas desde el Día 1. Nosotros configuramos, tú cobras.</p>
                </div>

                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-colors group/item hover:bg-white/10">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-sm text-gray-200 font-medium">Soporte Técnico VIP directo por WhatsApp con ingenieros.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: THE COST (Right) */}
          <div className="w-full lg:w-1/3 bg-[#0f1115] border border-white/5 p-8 rounded-3xl lg:rounded-l-none lg:rounded-r-3xl relative group hover:bg-white/[0.02] transition-all duration-300 z-10 lg:transform lg:-translate-x-4 lg:scale-95">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent opacity-50"></div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 group-hover:border-yellow-500/50 transition-colors">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Costo de Esperar</h3>
                <p className="text-xs text-yellow-500 font-mono uppercase tracking-widest">La Realidad</p>
              </div>
            </div>

            <ul className="space-y-6">
              <li className="flex items-start gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                <Clock className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400">Sigues perdiendo <span className="text-white font-bold">15+ horas/semana</span> en tareas de "copy-paste".</p>
              </li>
              <li className="flex items-start gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                <Flame className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400">Tu competencia responde en segundos con IA, tú tardas horas.</p>
              </li>
            </ul>

            <div className="mt-8 bg-black/50 rounded-xl p-4 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Dinero dejado en la mesa</span>
                <span className="text-2xl font-mono font-bold text-red-400 drop-shadow-lg">-$20,000 USD/año</span>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default ProblemSection;