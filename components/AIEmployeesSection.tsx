import React from 'react';
import Section from './ui/Section';
import { Bot, MessageSquare, Brain, Database, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface EmployeeCardProps {
  role: string;
  name: string;
  description: string;
  skills: string[];
  color: string;
  icon: React.ReactNode;
  salaryComparison: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ role, name, description, skills, color, icon, salaryComparison }) => (
  <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-1 overflow-hidden hover:scale-105 transition-all duration-300 h-full flex flex-col">
    {/* Glow Effect */}
    <div className={`absolute inset-0 bg-gradient-to-b ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
    
    <div className="bg-dark/90 rounded-xl p-6 h-full flex flex-col relative z-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white/10 text-white border border-white/10 uppercase tracking-wider`}>
              {role}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-[10px] text-green-400 font-mono bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                ONLINE
            </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-6 leading-relaxed min-h-[60px]">
        {description}
      </p>

      {/* Skills */}
      <div className="space-y-3 mb-8 flex-grow">
        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Capacidades:</p>
        {skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm text-gray-300 group-hover:text-white transition-colors">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>{skill}</span>
          </div>
        ))}
      </div>

      {/* Footer / Salary */}
      <div className="mt-auto border-t border-white/10 pt-4">
        <div className="flex justify-between items-center text-xs mb-4">
            <span className="text-gray-500">Costo Humano Promedio:</span>
            <span className="text-red-400 line-through decoration-red-500/50">{salaryComparison}/mes</span>
        </div>
        <a 
            href={`https://wa.me/573024310220?text=${encodeURIComponent(`Hola Twins, estoy interesado en contratar a ${name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white font-medium transition-all flex items-center justify-center gap-2 group-hover:bg-primary group-hover:border-primary"
        >
            Contratar a {name.split(' ')[0]} <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
);

const AIEmployeesSection: React.FC = () => {
  const employees = [
    {
      name: "Twin Sales",
      role: "Representante de Ventas",
      description: "Nunca duerme. Califica leads entrantes en segundos, hace seguimiento por WhatsApp y agenda citas en tu calendario automáticamente.",
      skills: ["Respuesta Instantánea 24/7", "Calificación de Leads", "Agendamiento Automático", "Seguimiento por WhatsApp"],
      color: "from-green-500 to-emerald-700",
      icon: <MessageSquare className="w-7 h-7 text-white" />,
      salaryComparison: "$1,200 USD"
    },
    {
      name: "Twin Support",
      role: "Agente de Soporte",
      description: "Resuelve dudas frecuentes, gestiona reclamos y escala problemas complejos. Reduce el volumen de tickets en un 80%.",
      skills: ["Resolución de FAQs", "Triage de Tickets", "Consulta de Base de Conocimiento", "Empatía Configurable"],
      color: "from-blue-500 to-cyan-700",
      icon: <Bot className="w-7 h-7 text-white" />,
      salaryComparison: "$900 USD"
    },
    {
      name: "Twin Marketing",
      role: "Creador de Contenido",
      description: "Tu estratega creativo. Redacta emails, crea guiones para videos, postea en redes sociales y optimiza tus copys para conversión.",
      skills: ["Redacción SEO", "Email Marketing", "Guiones de Video", "Gestión de Redes"],
      color: "from-purple-500 to-pink-700",
      icon: <Sparkles className="w-7 h-7 text-white" />,
      salaryComparison: "$1,500 USD"
    },
    {
      name: "Twin Ops",
      role: "Gerente de Operaciones",
      description: "El cerebro administrativo. Gestiona facturas, actualiza el CRM, envía contratos y conecta todas tus herramientas.",
      skills: ["Gestión de CRM", "Emisión de Facturas", "Onboarding de Clientes", "Reportes Automáticos"],
      color: "from-orange-500 to-red-700",
      icon: <Database className="w-7 h-7 text-white" />,
      salaryComparison: "$1,800 USD"
    }
  ];

  return (
    <Section id="equipo" className="bg-dark relative py-24 border-t border-white/5">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-primary/20 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[20%] right-[20%] w-72 h-72 bg-secondary/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-secondary mb-4">
            <Brain className="w-3 h-3" />
            <span>STAFF DIGITAL ON-DEMAND</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Contrata a tu Nuevo <br />
            <span className="text-white">Equipo Digital</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Olvídate de las cargas sociales, las vacaciones y las bajas médicas. 
            Nuestros empleados IA trabajan 24/7, aprenden de tu negocio y escalan infinitamente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {employees.map((emp, idx) => (
            <EmployeeCard key={idx} {...emp} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AIEmployeesSection;