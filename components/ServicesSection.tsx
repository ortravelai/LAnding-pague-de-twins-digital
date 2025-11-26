import React from 'react';
import Section from './ui/Section';
import { 
  Workflow, 
  Bot, 
  MessageCircle, 
  Network, 
  Mail, 
  Target, 
  FileText, 
  Lightbulb, 
  Layers, 
  Video 
} from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  videoEmbed?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, tags, gradient, videoEmbed }) => (
  <div className="group relative perspective h-full">
    <div className={`h-full p-8 rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl hover:bg-white/[0.07] relative overflow-hidden flex flex-col`}>
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${gradient}`}></div>
      
      <div className="relative z-10 flex-grow">
        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">{description}</p>

        {videoEmbed && (
          <div className="mb-6 rounded-lg overflow-hidden border border-white/10 w-full relative" style={{ paddingTop: '56.25%' }}>
             <iframe 
               src={videoEmbed}
               className="absolute top-0 left-0 w-full h-full"
               allow="autoplay; encrypted-media"
               loading="lazy"
               title={title}
             ></iframe>
          </div>
        )}
      </div>
      
      <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, i) => (
          <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Workflow className="text-cyan-400" />,
      title: "Automatización de Procesos",
      description: "Diseño y optimización de flujos automatizados para eliminar tareas repetitivas. Integramos ventas, soporte y operaciones.",
      tags: ["n8n", "Make", "Power Automate"],
      gradient: "from-cyan-400 to-blue-600"
    },
    {
      icon: <Bot className="text-purple-400" />,
      title: "Agentes IA Personalizados",
      description: "Creación de cerebros digitales entrenados con tus datos internos para analizar, ejecutar tareas y tomar decisiones complejas.",
      tags: ["RAG", "OpenAI", "Custom Data"],
      gradient: "from-purple-400 to-pink-600"
    },
    {
      icon: <MessageCircle className="text-green-400" />,
      title: "Bots WhatsApp 24/7",
      description: "Asistentes conversacionales que atienden, califican leads, agendan citas y procesan pagos automáticamente en WhatsApp.",
      tags: ["WhatsApp API", "ManyChat", "Booking"],
      gradient: "from-green-400 to-emerald-600"
    },
    {
      icon: <Network className="text-orange-400" />,
      title: "Integraciones & APIs",
      description: "Conectamos plataformas que no se hablan entre sí. Migración de procesos manuales a ecosistemas conectados.",
      tags: ["API Rest", "Webhooks", "Sync"],
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: <Mail className="text-yellow-400" />,
      title: "Marketing Automation",
      description: "Secuencias automáticas de email y mensajería multicanal para nutrición de leads y campañas de reactivación.",
      tags: ["Email", "SMS", "Funnels"],
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Target className="text-blue-500" />,
      title: "Ventas & CRM",
      description: "Optimización de CRM con seguimiento automático de oportunidades. Tu equipo se enfoca en cerrar, la IA en el seguimiento.",
      tags: ["HubSpot", "Salesforce", "Pipedrive"],
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <FileText className="text-gray-200" />,
      title: "Automatización Documental",
      description: "Generación, clasificación y envío automático de contratos, facturas y reportes. Cero error humano.",
      tags: ["DocuSign", "PDF", "Drive"],
      gradient: "from-gray-400 to-slate-600"
    },
    {
      icon: <Lightbulb className="text-indigo-400" />,
      title: "Consultoría Estratégica",
      description: "Diagnóstico de procesos y diseño de arquitectura de automatización. Te decimos exactamente qué y cómo automatizar.",
      tags: ["Auditoría", "Estrategia", "Roadmap"],
      gradient: "from-indigo-400 to-violet-600"
    },
    {
      icon: <Layers className="text-teal-400" />,
      title: "Workflows Complejos",
      description: "Orquestación de procesos de punta a punta con lógica avanzada, manejo de bases de datos y escalabilidad.",
      tags: ["SQL", "Backend", "Logic"],
      gradient: "from-teal-400 to-cyan-500"
    },
    {
      icon: <Video className="text-rose-400" />,
      title: "Video Ads con IA",
      description: "Producción de videos UGC y portavoces virtuales. Guiones, edición y visuales optimizados para ventas.",
      tags: ["HeyGen", "ElevenLabs", "Content"],
      gradient: "from-rose-400 to-red-600",
      videoEmbed: "https://drive.google.com/file/d/1-pS4Tm3TbRxOuPMaToP6HER9NkHA86PK/preview"
    }
  ];

  return (
    <Section id="servicios" className="bg-dark relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-2 block">Nuestro Arsenal</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Soluciones de <br/>
            <span className="text-white">Alto Impacto</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ServicesSection;