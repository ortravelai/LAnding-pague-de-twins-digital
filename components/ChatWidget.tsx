import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User, Minimize2, Loader2, ExternalLink } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

// Configuración del Cerebro del Asistente
const SYSTEM_INSTRUCTION = `
Eres "Twin Bot", el consultor experto en automatización de Twins Digital.IA.
Tu misión es asesorar a los dueños de negocio sobre cómo eliminar tareas manuales y redirigirlos a WhatsApp para cotizar la implementación.

CONOCIMIENTO TÉCNICO INTERNO (Stack que usamos para las soluciones):
1. GoHighLevel (GHL): Para CRM, gestión de leads, embudos y citas.
2. Make / n8n: Para integraciones complejas y lógica backend (conectar apps que no se hablan).
3. WhatsApp API: Para chatbots de atención al cliente 24/7.
4. Gemini / OpenAI: Para análisis de datos y respuestas inteligentes.

TU COMPORTAMIENTO:
1. DIAGNOSTICA: Pregunta o identifica qué proceso manual le quita tiempo al usuario (ventas, soporte, agendamiento, etc.).
2. PROPÓN SOLUCIÓN: Explica brevemente cómo Twins Digital resolvería eso usando nuestro stack. 
   - Ejemplo: "Para eso, podemos implementarte un sistema en Make que conecte tu formulario web directo a WhatsApp y CRM, eliminando el trabajo manual."
3. OBJETIVO DE CONVERSIÓN: NO des precios exactos. Tu objetivo es que vayan a WhatsApp a cotizar.
   - Frase de cierre obligatoria: "Si quieres que implementemos esta solución en tu negocio, haz clic aquí para cotizar en WhatsApp: https://wa.me/573024310220"
4. PERSONALIDAD: Profesional, directo, tecnológico pero empático. Habla en español latino.
5. Si preguntan por precios: "Cada implementación es única. Por favor escríbenos al WhatsApp para evaluar tu caso: https://wa.me/573024310220"

IMPORTANTE: Eres un asesor comercial técnico. Vendes la solución y la implementación. SIEMPRE incluye el enlace https://wa.me/573024310220 cuando invites a contactar.
`;

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '¡Hola! Soy Twin Bot 🤖. Cuéntame, ¿qué tarea repetitiva te gustaría eliminar de tu negocio hoy? Te diré cómo podemos automatizarla.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session
  useEffect(() => {
    const initChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
        setChatSession(chat);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };
    initChat();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || !chatSession) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage({ message: userMsg.text });
      const responseText = result.text;

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "Lo siento, tuve un error de conexión. ¿Podrías repetirlo?"
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Tuve un problema técnico momentáneo. Por favor contáctanos por WhatsApp para atención inmediata: https://wa.me/573024310220"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render text with clickable links
  const renderMessageText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
        if (part.match(urlRegex)) {
            return (
                <a 
                    key={i} 
                    href={part} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary underline hover:text-secondary break-all font-bold"
                >
                    {part}
                </a>
            );
        }
        return part;
    });
  };

  // Floating Button Component
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-16 h-16 bg-primary hover:bg-secondary text-white rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 hover:-translate-y-1 animate-float"
      >
        <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20"></div>
        <Sparkles className="w-8 h-8 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-125" />
        <MessageCircle className="w-8 h-8 group-hover:opacity-0 transition-opacity duration-300" />
        
        {/* Notification Badge */}
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-dark"></span>
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed z-50 transition-all duration-300 ease-in-out ${
      isMinimized 
        ? 'bottom-6 right-6 w-72 h-16 rounded-full cursor-pointer' 
        : 'bottom-6 right-6 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] rounded-2xl'
    }`}>
      <div className="flex flex-col h-full bg-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden rounded-2xl ring-1 ring-white/5">
        
        {/* Header */}
        <div 
          className={`flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-white/5 ${isMinimized ? 'h-full cursor-pointer' : ''}`}
          onClick={isMinimized ? () => setIsMinimized(false) : undefined}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                 <Bot className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm leading-tight">Twin Bot 🤖</h3>
              {!isMinimized && <span className="text-[10px] text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> En línea</span>}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {!isMinimized && (
              <>
                <a 
                    href="https://wa.me/573024310220?text=Hola%20Twins,%20quiero%20cotizar%20una%20automatizaci%C3%B3n" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 bg-[#25D366]/20 hover:bg-[#25D366]/40 text-[#25D366] rounded-lg transition-colors mr-1"
                    title="Cotizar en WhatsApp"
                >
                    <ExternalLink className="w-4 h-4" />
                </a>
                <button 
                    onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    <Minimize2 className="w-4 h-4" />
                </button>
              </>
            )}
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); setIsMinimized(false); }}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        {!isMinimized && (
          <>
            <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-white/10' : 'bg-primary/20'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-primary" />}
                  </div>
                  
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white text-black rounded-tr-none' 
                      : 'bg-[#1a1d24] border border-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {renderMessageText(msg.text)}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                     <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-[#1a1d24] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    <span className="text-xs text-gray-400">Diseñando solución...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-black/40 border-t border-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ej: Pierdo mucho tiempo contestando WhatsApp..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="absolute right-2 p-2 bg-primary hover:bg-primary/80 text-white rounded-lg disabled:opacity-50 disabled:hover:bg-primary transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-500 text-center mt-2">
                Asistente Virtual de Twins Digital.IA
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;