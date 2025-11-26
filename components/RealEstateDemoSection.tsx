import React, { useState, useRef } from 'react';
import Section from './ui/Section';
import { Upload, Image as ImageIcon, Sparkles, Trash2, Wand2, Check, RefreshCw, Copy, ChevronLeft, ChevronRight, AlertCircle, Download } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

type ImageAction = 'staging' | 'empty' | 'none';
type AdAudience = 'family' | 'investor' | 'single';
type AdLength = 'short' | 'medium' | 'long';
type AdTone = 'professional' | 'emotional' | 'luxury';
type FurnitureStyle = 'nordic' | 'modern' | 'industrial';

interface UploadedImage {
  id: string;
  url: string; // Original Data URL
  base64Data?: string; // Raw base64 for API
  mimeType?: string;
  action: ImageAction;
  isSample?: boolean;
  generatedUrl?: string | null; // The result from Gemini
  status?: 'pending' | 'processing' | 'done' | 'error';
}

const RealEstateDemoSection: React.FC = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [audience, setAudience] = useState<AdAudience>('family');
  const [length, setLength] = useState<AdLength>('medium');
  const [tone, setTone] = useState<AdTone>('emotional');
  const [furnitureStyle, setFurnitureStyle] = useState<FurnitureStyle>('nordic');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [activeResultIndex, setActiveResultIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files) as File[];
      
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const resultStr = event.target.result as string;
            // Extract raw base64 and mime type
            const base64Data = resultStr.split(',')[1];
            const mimeType = resultStr.split(';')[0].split(':')[1];

            setImages(prev => {
              return [...prev, {
                id: `user-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                url: resultStr,
                base64Data: base64Data,
                mimeType: mimeType,
                action: 'staging',
                isSample: false,
                status: 'pending'
              }];
            });
            setShowResult(false);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    if (e.target) e.target.value = '';
  };

  // Helper to load sample image and convert to base64 for the API
  const handleLoadSample = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    try {
        const sampleUrl = 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        const response = await fetch(sampleUrl);
        const blob = await response.blob();
        
        const reader = new FileReader();
        reader.onloadend = () => {
            const resultStr = reader.result as string;
            const base64Data = resultStr.split(',')[1];
            const mimeType = resultStr.split(';')[0].split(':')[1];

            const sample: UploadedImage = {
                id: `sample-${Date.now()}`,
                url: resultStr,
                base64Data: base64Data,
                mimeType: mimeType,
                action: 'staging',
                isSample: true,
                status: 'pending'
            };
            setImages(prev => [...prev, sample]);
            setShowResult(false);
        };
        reader.readAsDataURL(blob);
    } catch (err) {
        console.error("Error loading sample:", err);
    }
  };

  const handleActionChange = (id: string, action: ImageAction) => {
    setImages(images.map(img => img.id === id ? { ...img, action, status: 'pending', generatedUrl: null } : img));
  };

  const handleRemoveImage = (id: string) => {
    setImages(prev => {
      const newImages = prev.filter(img => img.id !== id);
      if (activeResultIndex >= newImages.length) {
        setActiveResultIndex(Math.max(0, newImages.length - 1));
      }
      return newImages;
    });
  };

  const handleDownload = () => {
    if (images.length === 0) return;
    const currentImg = images[activeResultIndex];
    const url = currentImg.generatedUrl || currentImg.url;
    const link = document.createElement('a');
    link.href = url;
    link.download = `twins-ai-real-estate-${activeResultIndex + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateAd = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);
    setErrorMsg(null);
    setActiveResultIndex(0); 

    try {
        // 1. Generate Copy (Simulated locally for speed, or could be API)
        const text = generateMockText(audience, tone, length);
        setGeneratedText(text);

        // 2. Process Images with Gemini API
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const newImagesState = [...images];

        for (let i = 0; i < newImagesState.length; i++) {
            const img = newImagesState[i];

            // Skip if no action required or already done
            if (img.action === 'none' || !img.base64Data) {
                img.status = 'done';
                continue;
            }

            img.status = 'processing';
            setImages([...newImagesState]); // Update UI to show processing

            try {
                let prompt = "";
                if (img.action === 'staging') {
                    const stylePrompt = furnitureStyle === 'nordic' ? 'Modern Nordic IKEA style, light wood, white fabrics, cozy' 
                                    : furnitureStyle === 'modern' ? 'Ultra modern minimalist style, sleek, black and white' 
                                    : 'Industrial loft style, leather, metal, brick';
                    
                    prompt = `Professional virtual staging. Furnish this empty room with high-end ${stylePrompt} furniture. 
                              CRITICAL: Keep the exact same floor, windows, walls, and perspective. Do not change the structure of the room.
                              Render in 8k resolution, photorealistic real estate photography style. Natural lighting. Ensure the furniture looks realistic and correctly scaled.`;
                } else if (img.action === 'empty') {
                    prompt = `Virtual decluttering. Remove all furniture and objects from this room. 
                              CRITICAL: Keep the exact same floor, windows, walls, and perspective. Reconstruct the floor where objects were.
                              Render in 8k resolution, photorealistic real estate photography style. Empty room, bright and clean.`;
                }

                // Gemini 2.5 Flash Image Call
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-image',
                    contents: {
                        parts: [
                            {
                                inlineData: {
                                    mimeType: img.mimeType || 'image/jpeg',
                                    data: img.base64Data
                                }
                            },
                            { text: prompt }
                        ]
                    }
                });

                // Extract Image
                let foundImage = false;
                if (response.candidates?.[0]?.content?.parts) {
                    for (const part of response.candidates[0].content.parts) {
                        if (part.inlineData) {
                            img.generatedUrl = `data:image/png;base64,${part.inlineData.data}`;
                            foundImage = true;
                            break;
                        }
                    }
                }

                if (!foundImage) {
                    console.warn("No image found in response for image", i);
                    img.status = 'error'; // Fallback
                } else {
                    img.status = 'done';
                }

            } catch (err) {
                console.error(`Error generating image ${i}:`, err);
                img.status = 'error';
            }
            
            setImages([...newImagesState]); // Update state after each image
        }

        setShowResult(true);

    } catch (err) {
        console.error("Global generation error:", err);
        setErrorMsg("Hubo un error conectando con la IA. Por favor verifica tu conexión.");
    } finally {
        setIsGenerating(false);
    }
  };

  const generateMockText = (aud: AdAudience, t: AdTone, l: AdLength) => {
    const styleNames = {
        nordic: "estilo Nórdico",
        modern: "estilo Moderno",
        industrial: "estilo Industrial"
    };

    const tones = {
      professional: "Presentamos esta exclusiva oportunidad inmobiliaria.",
      emotional: "¿Te imaginas despertar aquí cada mañana? Un hogar lleno de luz y vida.",
      luxury: "Sofisticación, elegancia y diseño se unen en esta propiedad única."
    };

    const audiences = {
      family: "Ideal para familias que buscan espacio y seguridad.",
      investor: "Alta rentabilidad asegurada. Una joya para su portafolio.",
      single: "El espacio perfecto para tu estilo de vida dinámico y moderno."
    };

    const contents = `La propiedad cuenta con una distribución optimizada que maximiza la luz natural. Los acabados son de primera calidad y la ubicación es inmejorable.`;

    const endings = {
        short: "Contáctanos hoy.",
        medium: "No pierdas esta oportunidad única. Agenda tu visita hoy mismo y déjate enamorar.",
        long: "Cada rincón ha sido pensado para el confort. Cerca de colegios, parques y centros comerciales, esta propiedad no es solo un metro cuadrado, es el escenario de tus próximos mejores recuerdos. No dejes pasar esta oportunidad de inversión y vida. Agenda tu visita privada hoy mismo."
    };

    return `${tones[t]} ${audiences[aud]} ${contents} ${endings[l]}`;
  };

  const nextResult = () => {
    if (activeResultIndex < images.length - 1) setActiveResultIndex(prev => prev + 1);
  };

  const prevResult = () => {
    if (activeResultIndex > 0) setActiveResultIndex(prev => prev - 1);
  };

  return (
    <Section id="demo-ia" className="bg-dark border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest mb-4 animate-pulse">
            <Sparkles className="w-3 h-3" />
            <span>Demo Interactiva Real</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Crea Anuncios Inmobiliarios <br />
            <span className="text-white">En Segundos</span>
          </h2>
          <p className="text-gray-400">
            Prueba nuestra IA: Sube fotos, elige el estilo y obtén <span className="text-white font-bold">imágenes nuevas generadas por IA</span>.
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-[#0f1115] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[650px]">
          
          {/* LEFT PANEL: Configuration */}
          <div className="w-full md:w-5/12 p-6 md:p-8 border-r border-white/10 flex flex-col max-h-[800px] overflow-y-auto custom-scrollbar bg-dark/50">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              1. Configuración Visual
            </h3>

            {/* Image Upload Area */}
            <div className="mb-8">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
                multiple 
              />

              {images.length === 0 ? (
                <div 
                  onClick={triggerFileUpload}
                  className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-all group relative"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-primary" />
                  </div>
                  <p className="text-gray-300 font-medium text-sm">Haz clic para subir fotos</p>
                  <p className="text-xs text-gray-500 mt-2">Soporta múltiples archivos</p>

                  <button 
                    onClick={handleLoadSample}
                    className="mt-4 text-xs text-primary hover:text-white underline z-10 relative block mx-auto"
                  >
                    O usa un ejemplo
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {images.map((img, idx) => (
                    <div key={img.id} className="bg-white/5 rounded-xl p-4 border border-white/10 transition-colors hover:border-white/20">
                      <div className="flex items-start gap-4 mb-4">
                        <img src={img.url} alt="Thumbnail" className="w-20 h-20 object-cover rounded-lg bg-gray-800" />
                        <div className="flex-grow overflow-hidden">
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-mono text-gray-400 mb-2 block truncate">
                                    {img.isSample ? "Sample_Image.jpg" : `Foto ${idx + 1}`}
                                </span>
                                <button onClick={() => handleRemoveImage(img.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-xs text-gray-300 font-medium">¿Qué debe hacer la IA?</p>
                        </div>
                      </div>
                      
                      {/* Action Checkboxes */}
                      <div className="grid grid-cols-3 gap-2">
                        <label className={`cursor-pointer border rounded-lg p-2 flex flex-col items-center gap-2 transition-all ${img.action === 'staging' ? 'bg-primary/20 border-primary text-white shadow-[0_0_10px_rgba(124,58,237,0.2)]' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                            <input type="radio" name={`action-${img.id}`} checked={img.action === 'staging'} onChange={() => handleActionChange(img.id, 'staging')} className="hidden" />
                            <Wand2 className="w-4 h-4" />
                            <span className="text-[9px] font-bold uppercase text-center">Amueblar</span>
                        </label>
                        <label className={`cursor-pointer border rounded-lg p-2 flex flex-col items-center gap-2 transition-all ${img.action === 'empty' ? 'bg-primary/20 border-primary text-white shadow-[0_0_10px_rgba(124,58,237,0.2)]' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                            <input type="radio" name={`action-${img.id}`} checked={img.action === 'empty'} onChange={() => handleActionChange(img.id, 'empty')} className="hidden" />
                            <RefreshCw className="w-4 h-4" />
                            <span className="text-[9px] font-bold uppercase text-center">Vaciar</span>
                        </label>
                        <label className={`cursor-pointer border rounded-lg p-2 flex flex-col items-center gap-2 transition-all ${img.action === 'none' ? 'bg-primary/20 border-primary text-white shadow-[0_0_10px_rgba(124,58,237,0.2)]' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                            <input type="radio" name={`action-${img.id}`} checked={img.action === 'none'} onChange={() => handleActionChange(img.id, 'none')} className="hidden" />
                            <ImageIcon className="w-4 h-4" />
                            <span className="text-[9px] font-bold uppercase text-center">Nada</span>
                        </label>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={triggerFileUpload}
                    className="w-full py-3 border border-dashed border-white/10 rounded-xl text-gray-400 text-sm hover:border-primary/50 hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" /> Subir más fotos
                  </button>
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              2. Configuración del Anuncio
            </h3>

            <div className="space-y-4 mb-8">
                {/* Furniture Style Dropdown */}
                <div>
                    <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Estilo de Muebles</label>
                    <select 
                        value={furnitureStyle} 
                        onChange={(e) => setFurnitureStyle(e.target.value as FurnitureStyle)}
                        className="w-full bg-[#1a1d24] border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none text-sm"
                    >
                        <option value="nordic">Nórdico / IKEA (Madera y Blanco)</option>
                        <option value="modern">Moderno Minimalista (Lujo)</option>
                        <option value="industrial">Industrial Urbano (Loft)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Público Objetivo</label>
                    <select 
                        value={audience} 
                        onChange={(e) => setAudience(e.target.value as AdAudience)}
                        className="w-full bg-[#1a1d24] border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none text-sm"
                    >
                        <option value="family">Familia</option>
                        <option value="single">Joven Profesional</option>
                        <option value="investor">Inversionista</option>
                    </select>
                </div>
            </div>

            <button 
                onClick={generateAd}
                disabled={images.length === 0 || isGenerating}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
                    images.length === 0 ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 
                    isGenerating ? 'bg-primary/50 cursor-wait text-white' : 'bg-primary hover:bg-primary/80 text-white hover:scale-[1.02]'
                }`}
            >
                {isGenerating ? (
                    <>
                        <RefreshCw className="w-5 h-5 animate-spin" /> Generando con IA...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5" /> Transformar Fotos
                    </>
                )}
            </button>
            <p className="text-[10px] text-gray-500 text-center mt-3">
                *Este proceso usa Google Gemini y puede tardar 10-15 segundos por foto.
            </p>

          </div>

          {/* RIGHT PANEL: Results */}
          <div className="w-full md:w-7/12 bg-black/20 p-6 md:p-8 flex flex-col justify-center">
             {!showResult && !isGenerating && (
                 <div className="h-full flex flex-col items-center justify-center text-center opacity-40 min-h-[400px]">
                     <Wand2 className="w-16 h-16 mb-4 text-white" />
                     <h3 className="text-xl font-bold text-white">Esperando input...</h3>
                     <p className="text-sm text-gray-400 mt-2">Sube fotos y haz clic en "Transformar" para ver la magia.</p>
                 </div>
             )}

             {isGenerating && (
                 <div className="h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                     <div className="relative w-24 h-24 mb-8">
                         <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                         <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                         </div>
                     </div>
                     <h3 className="text-xl font-bold text-white animate-pulse">IA Regenerando Píxeles...</h3>
                     <p className="text-sm text-gray-400 mt-2 max-w-xs">Nuestros motores están analizando la geometría de tu espacio para insertar muebles realistas.</p>
                 </div>
             )}

             {errorMsg && (
                 <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl text-red-200 text-center mb-4 flex items-center justify-center gap-2">
                     <AlertCircle className="w-5 h-5" /> {errorMsg}
                 </div>
             )}

             {showResult && !isGenerating && images.length > 0 && (
                 <div className="animate-fade-in-up flex flex-col h-full">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-green-400 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                            <Check className="w-4 h-4" /> Imagen Generada
                        </h3>
                        {images.length > 1 && (
                            <div className="flex items-center gap-2 bg-black/40 rounded-lg p-1 border border-white/10">
                                <button onClick={prevResult} disabled={activeResultIndex === 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-30 text-white">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-xs font-mono text-gray-300 px-2 min-w-[50px] text-center">
                                    {activeResultIndex + 1} / {images.length}
                                </span>
                                <button onClick={nextResult} disabled={activeResultIndex === images.length - 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-30 text-white">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                     </div>
                     
                     {/* Visual Result Container */}
                     <div className="mb-6 bg-dark rounded-xl border border-white/10 overflow-hidden relative group shadow-2xl aspect-video">
                         
                         {/* Status Badge & Download */}
                         <div className="absolute top-3 right-3 z-20 flex gap-2">
                            {/* Status Badge */}
                            {images[activeResultIndex].status === 'processing' ? (
                                <span className="bg-yellow-500/90 text-black text-[10px] px-3 py-1.5 rounded-full font-bold flex items-center gap-2 animate-pulse">
                                    <RefreshCw className="w-3 h-3 animate-spin" /> PROCESANDO...
                                </span>
                            ) : images[activeResultIndex].status === 'error' ? (
                                <span className="bg-red-500/90 text-white text-[10px] px-3 py-1.5 rounded-full font-bold flex items-center gap-2">
                                    ERROR IA
                                </span>
                            ) : (
                                <span className="bg-primary/90 text-white text-[10px] px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 font-bold shadow-lg flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" />
                                    {images[activeResultIndex].action === 'staging' ? 'VIRTUAL STAGING' : 
                                     images[activeResultIndex].action === 'empty' ? 'LIMPIEZA IA' : 'ORIGINAL'}
                                </span>
                            )}

                            {/* Download Button */}
                            {(images[activeResultIndex].generatedUrl || images[activeResultIndex].url) && (
                                <button 
                                    onClick={handleDownload}
                                    className="bg-black/50 hover:bg-black/80 text-white p-1.5 rounded-full backdrop-blur-md border border-white/20 transition-colors"
                                    title="Descargar imagen"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                            )}
                         </div>

                         {/* THE IMAGE */}
                         <img 
                            src={images[activeResultIndex].generatedUrl || images[activeResultIndex].url}
                            alt="Result" 
                            className="w-full h-full object-cover"
                         />
                         
                         <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12 backdrop-blur-[1px]">
                             <p className="text-xs text-gray-200 font-medium flex items-center gap-2">
                                <Check className="w-3 h-3 text-green-400" />
                                {images[activeResultIndex].status === 'done' && images[activeResultIndex].generatedUrl 
                                    ? 'Imagen generada exitosamente con Gemini Vision.' 
                                    : 'Visualizando imagen original.'}
                             </p>
                         </div>
                     </div>

                     {/* Text Result */}
                     <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-bold text-sm flex items-center gap-2">
                            <Copy className="w-4 h-4 text-primary" /> Copy Sugerido
                        </h4>
                        <button 
                            onClick={() => navigator.clipboard.writeText(generatedText)}
                            className="text-xs text-gray-400 hover:text-white transition-colors"
                        >
                            Copiar texto
                        </button>
                     </div>
                     <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-gray-300 text-sm leading-relaxed font-mono flex-grow overflow-y-auto custom-scrollbar shadow-inner max-h-[150px]">
                         {generatedText}
                     </div>

                     <div className="mt-4 pt-4 border-t border-white/10 text-center">
                         <a href="https://wa.me/573024310220?text=Quiero%20implementar%20la%20IA%20inmobiliaria" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary font-bold hover:text-white transition-colors text-sm">
                             Implementar ahora <ChevronRight className="w-4 h-4" />
                         </a>
                     </div>
                 </div>
             )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default RealEstateDemoSection;