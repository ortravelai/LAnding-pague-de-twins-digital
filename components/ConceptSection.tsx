import React, { useEffect, useState } from 'react';
import Section from './ui/Section';
import { Bot, MessageCircle, Zap, TrendingUp } from 'lucide-react';

const ConceptSection: React.FC = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter1(prev => (prev < 200 ? prev + 5 : 200));
      setCounter2(prev => (prev < 85 ? prev + 1 : 85));
      setCounter3(prev => (prev < 2 ? prev + 0.1 : 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="motor" className="bg-dark border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
             Cómo Nuestra IA Twin <br/>
             <span className="text-secondary">Clona tu Mejor Ejecutivo</span>
           </h2>
           <div className="flex justify-center flex-wrap gap-4 mt-8">
              {/* GoHighLevel */}
              <span className="px-3 py-1 rounded bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/20 text-sm font-bold hover:scale-110 transition-transform cursor-default">GoHighLevel</span>
              {/* N8N */}
              <span className="px-3 py-1 rounded bg-[#EA4B71]/10 text-[#EA4B71] border border-[#EA4B71]/20 text-sm font-bold hover:scale-110 transition-transform cursor-default">N8N</span>
              {/* Make */}
              <span className="px-3 py-1 rounded bg-[#6f42c1]/10 text-[#6f42c1] border border-[#6f42c1]/20 text-sm font-bold hover:scale-110 transition-transform cursor-default">Make</span>
              {/* WhatsApp */}
              <span className="px-3 py-1 rounded bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 text-sm font-bold hover:scale-110 transition-transform cursor-default">WhatsApp API</span>
           </div>
        </div>

        {/* Animated Diagram */}
        <div className="max-w-6xl mx-auto mb-20">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative items-center">
              
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-gray-700 via-primary to-green-500 -z-10 opacity-30 -translate-y-1/2"></div>
              
              {/* Step 1 */}
              <div className="bg-dark border border-white/10 p-6 rounded-2xl flex flex-col items-center z-10 hover:-translate-y-2 transition-transform duration-300">
                 <div className="bg-white/5 p-4 rounded-full mb-4 border border-white/10">
                    <MessageCircle className="w-6 h-6 text-gray-300" />
                 </div>
                 <span className="font-bold text-white text-center">Entrada</span>
                 <span className="text-xs text-gray-500 text-center mt-1">WhatsApp / Email / API</span>
              </div>

              {/* Step 2 */}
              <div className="bg-dark border border-primary p-6 rounded-2xl flex flex-col items-center z-10 shadow-[0_0_30px_rgba(124,58,237,0.3)] scale-110">
                 <div className="bg-primary/20 p-4 rounded-full mb-4 animate-pulse">
                    <Bot className="w-8 h-8 text-primary" />
                 </div>
                 <span className="font-bold text-white text-center">Twin Engine IA</span>
                 <span className="text-xs text-primary/70 text-center mt-1">Cerebro Digital</span>
              </div>

               {/* Step 3 */}
               <div className="bg-dark border border-secondary/50 p-6 rounded-2xl flex flex-col items-center z-10 hover:-translate-y-2 transition-transform duration-300">
                 <div className="bg-secondary/20 p-4 rounded-full mb-4">
                    <Zap className="w-6 h-6 text-secondary" />
                 </div>
                 <span className="font-bold text-white text-center">Automatización</span>
                 <span className="text-xs text-gray-500 text-center mt-1">Ejecución 24/7</span>
              </div>

              {/* Step 4 */}
              <div className="bg-dark border border-green-500/50 p-6 rounded-2xl flex flex-col items-center z-10 hover:-translate-y-2 transition-transform duration-300">
                 <div className="bg-green-500/20 p-4 rounded-full mb-4">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                 </div>
                 <span className="font-bold text-white text-center">Dashboard ROI</span>
                 <span className="text-xs text-gray-500 text-center mt-1">Ventas & Ahorro</span>
              </div>

           </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
           <div className="text-center">
             <span className="block text-5xl font-display font-bold text-white mb-2">+{counter1}</span>
             <span className="text-sm text-primary uppercase tracking-widest">Procesos Automatizados</span>
           </div>
           <div className="text-center">
             <span className="block text-5xl font-display font-bold text-white mb-2">{counter2}%</span>
             <span className="text-sm text-secondary uppercase tracking-widest">Reducción Tiempo Operativo</span>
           </div>
           <div className="text-center">
             <span className="block text-5xl font-display font-bold text-white mb-2">+${counter3.toFixed(1)}M</span>
             <span className="text-sm text-green-400 uppercase tracking-widest">Ahorrados a Clientes</span>
           </div>
        </div>

      </div>
    </Section>
  );
};

export default ConceptSection;