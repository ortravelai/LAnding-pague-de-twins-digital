import React from 'react';
import Section from './ui/Section';
import { Check } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <Section id="contact" className="bg-dark py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row bg-gradient-to-br from-[#1a1f35] to-dark rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          
          {/* Left Side: Value Prop */}
          <div className="lg:w-5/12 p-10 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 bg-white/[0.02]">
             <h2 className="text-4xl font-display font-bold mb-6">
               ¿Listo para <br/>
               <span className="text-primary">Automatizar?</span>
             </h2>
             <p className="text-gray-400 mb-8 leading-relaxed">
               Agenda tu diagnóstico de automatización gratuito. Te entregaremos un roadmap claro de cómo ahorrar tiempo y dinero en 7 días.
             </p>

             <ul className="space-y-6 mb-8">
               <li className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-500" />
                 </div>
                 <span className="text-base text-gray-200">Diagnóstico IA de tu negocio en 48h</span>
               </li>
               <li className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-500" />
                 </div>
                 <span className="text-base text-gray-200">Demo personalizada por WhatsApp</span>
               </li>
               <li className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-500" />
                 </div>
                 <span className="text-base text-gray-200">Plan de implementación 100% gratis</span>
               </li>
             </ul>
          </div>

          {/* Right Side: The Form */}
          <div className="lg:w-7/12 bg-white p-4 md:p-8 flex items-center justify-center">
             <div className="w-full relative bg-white rounded-xl overflow-hidden">
                <iframe 
                    src="https://api.leadconnectorhq.com/widget/form/iHf7I37YHEIJNvomTjhA" 
                    style={{ width: '100%', height: '518px', border: 'none', borderRadius: '12px' }}
                    id="popup-iHf7I37YHEIJNvomTjhA" 
                    title="Web- Cliente potencial OR"
                ></iframe>
             </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;