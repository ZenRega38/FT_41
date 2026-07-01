"use client";

import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Download, Loader2, Share2, X, Image as ImageIcon } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { StoryCard } from './StoryCard';
import { Participant } from '@/types/site';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  participant: Participant;
  motto?: string | null;
  ipk?: string;
  thesisTitle?: string | null; // Passed from parent page
}

export function StoryCardModal({ participant, motto, ipk, thesisTitle }: Props) {
  const exportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinchStartRef = useRef<{ distance: number; scale: number } | null>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isShareSupported, setIsShareSupported] = useState(false);
  
  // Display mode state: 'motto' or 'thesis'
  const [displayMode, setDisplayMode] = useState<'motto' | 'thesis'>('motto');
  
  // Interactive gesture values
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [imageScale, setImageScale] = useState(1.1); // Start with minor zoom so they can drag instantly
  
  // Track image natural dimensions to strictly enforce boundaries
  const [imageAspectRatio, setImageAspectRatio] = useState(850 / 750); // Default to container aspect ratio
  
  // Drag handling state
  const isDragging = useRef(false);
  const startPointer = useRef({ x: 0, y: 0 });
  const startTranslation = useRef({ x: 0, y: 0 });
  
  // Live scaling factor for preview rendering
  const [scale, setScale] = useState(0.3);

  // Check if participant has motto / thesis
  const hasMotto = Boolean(motto && motto !== "[N/A]" && motto.trim() !== "");
  const hasThesis = Boolean(thesisTitle && thesisTitle !== "[N/A]" && thesisTitle.trim() !== "");

  useEffect(() => {
    // Check Web Share API
    if (typeof window !== 'undefined' && navigator.share && navigator.canShare) {
      setIsShareSupported(true);
    }
  }, []);

  // Fetch the image natural aspect ratio (fix cached onload bug by setting onload BEFORE src)
  useEffect(() => {
    if (!participant.photo) return;
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setImageAspectRatio(img.naturalWidth / img.naturalHeight);
      }
    };
    img.src = participant.photo;
  }, [participant.photo]);

  useEffect(() => {
    if (!isOpen) return;

    const calculateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        setScale(containerWidth / 1080);
      }
    };

    const timer = setTimeout(calculateScale, 100);
    window.addEventListener('resize', calculateScale);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateScale);
    };
  }, [isOpen]);

  // Helper to clamp drag coordinates and keep image edges within the photo container bounds
  const getClampedTranslation = (x: number, y: number, scaleVal: number) => {
    const Rc = 850 / 750; // Aspect ratio of container (1.13)
    let wRendered = 850;
    let hRendered = 750;
    
    if (imageAspectRatio > Rc) {
      // Image is wider than container
      hRendered = 750;
      wRendered = 750 * imageAspectRatio;
    } else {
      // Image is taller than container (standard portrait)
      wRendered = 850;
      hRendered = 850 / imageAspectRatio;
    }

    const maxTx = Math.max(0, (wRendered * scaleVal - 850) / 2);
    const maxTy = Math.max(0, (hRendered * scaleVal - 750) / 2);

    return {
      x: Math.max(-maxTx, Math.min(maxTx, x)),
      y: Math.max(-maxTy, Math.min(maxTy, y))
    };
  };

  const generateImage = async () => {
    if (!exportRef.current) return null;
    try {
      await new Promise(r => setTimeout(r, 100));
      const dataUrl = await htmlToImage.toPng(exportRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        cacheBust: true,
      });
      return dataUrl;
    } catch (err) {
      console.error('Failed to render image', err);
      alert("Gagal memproses gambar. Coba lagi.");
      return null;
    }
  };

  const handleDownload = async () => {
    setIsExporting(true);
    const dataUrl = await generateImage();
    setIsExporting(false);
    if (!dataUrl) return;

    const link = document.createElement('a');
    link.download = `yudisium-${participant.slug}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleShare = async () => {
    setIsExporting(true);
    const dataUrl = await generateImage();
    setIsExporting(false);
    if (!dataUrl) return;

    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `yudisium-${participant.slug}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `Kartu Yudisium - ${participant.name}`,
          text: `Kartu Yudisium Ke-41 Fakultas Teknik UBT - ${participant.name}`,
          files: [file]
        });
      } else {
        alert("Perangkat tidak mendukung bagikan gambar langsung. Silakan gunakan tombol unduh.");
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  };

  // Drag handlers
  const dragStart = (clientX: number, clientY: number) => {
    isDragging.current = true;
    startPointer.current = { x: clientX, y: clientY };
    startTranslation.current = { x: translateX, y: translateY };
  };

  const dragMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    const deltaX = clientX - startPointer.current.x;
    const deltaY = clientY - startPointer.current.y;
    
    // Map screen movement back to card layout space and apply strict boundary clamps
    const rawX = startTranslation.current.x + deltaX / scale;
    const rawY = startTranslation.current.y + deltaY / scale;
    
    const clamped = getClampedTranslation(rawX, rawY, imageScale);
    setTranslateX(clamped.x);
    setTranslateY(clamped.y);
  };

  const dragEnd = () => {
    isDragging.current = false;
  };

  // Event handlers for the gesture overlay
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStart(e.clientX, e.clientY);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    dragMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    dragEnd();
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      dragStart(touch.clientX, touch.clientY);
    } else if (e.touches.length === 2) {
      isDragging.current = false;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const distance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      pinchStartRef.current = {
        distance,
        scale: imageScale
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging.current) {
      const touch = e.touches[0];
      dragMove(touch.clientX, touch.clientY);
    } else if (e.touches.length === 2 && pinchStartRef.current) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const distance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const factor = distance / pinchStartRef.current.distance;
      const newScale = Math.max(1, Math.min(4, pinchStartRef.current.scale * factor));
      
      // Clamp coordinates instantly on scale change
      const clamped = getClampedTranslation(translateX, translateY, newScale);
      setImageScale(newScale);
      setTranslateX(clamped.x);
      setTranslateY(clamped.y);
    }
  };

  const handleTouchEnd = () => {
    dragEnd();
    pinchStartRef.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomIntensity = 0.05;
    const factor = e.deltaY < 0 ? (1 + zoomIntensity) : (1 - zoomIntensity);
    const newScale = Math.max(1, Math.min(4, imageScale * factor));
    
    // Clamp coordinates instantly on scale change
    const clamped = getClampedTranslation(translateX, translateY, newScale);
    setImageScale(newScale);
    setTranslateX(clamped.x);
    setTranslateY(clamped.y);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-black-primary font-bold hover:bg-gold-muted transition-colors"
      >
        <ImageIcon size={20} />
        <span>Bagikan Kartu IG Story</span>
      </button>

      {/* Off-screen/Hidden high-res container for exporting */}
      <div className="fixed top-0 left-[-9999px] opacity-0 pointer-events-none">
        <div ref={exportRef}>
          <StoryCard 
            participant={participant} 
            motto={motto} 
            thesis={thesisTitle}
            displayMode={displayMode}
            translateX={translateX}
            translateY={translateY}
            imageScale={imageScale}
            imageAspectRatio={imageAspectRatio}
            isExporting={true} // Hides missing placeholders and links in download PNG
          />
        </div>
      </div>

      {/* Preview & Action Modal */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isExporting) { setIsOpen(false); } }}
              className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-4 bg-black/85 backdrop-blur-sm cursor-zoom-out overflow-y-auto"
            >
              {/* Close Button */}
              <div className="absolute top-6 right-6 z-10">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                  disabled={isExporting}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors disabled:opacity-50"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Main Content Box */}
              <div 
                className="w-full max-w-sm flex flex-col items-center gap-6 cursor-default py-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Live scaled preview container */}
                <div 
                  ref={containerRef}
                  className="w-full aspect-[9/16] bg-[#050505] rounded-2xl border border-white/20 overflow-hidden relative shadow-2xl"
                >
                  {/* 
                    Live Render at Custom Scale. 
                    We remove pointer-events-none here to make links inside the card clickable!
                  */}
                  <div 
                    style={{
                      width: '1080px',
                      height: '1920px',
                      transform: `scale(${scale})`,
                      transformOrigin: 'top left',
                    }}
                    className="absolute top-0 left-0 select-none"
                  >
                    <StoryCard 
                      participant={participant} 
                      motto={motto} 
                      thesis={thesisTitle}
                      displayMode={displayMode}
                      translateX={translateX}
                      translateY={translateY}
                      imageScale={imageScale}
                      imageAspectRatio={imageAspectRatio}
                      isExporting={false} // Renders missing placeholders and form links on screen
                    />
                  </div>

                  {/* Gesture Overlay Target for Photo Region */}
                  <div 
                    style={{
                      position: 'absolute',
                      left: `${115 * scale}px`,
                      top: `${390 * scale}px`,
                      width: `${850 * scale}px`,
                      height: `${750 * scale}px`,
                      cursor: isDragging.current ? 'grabbing' : 'grab',
                      zIndex: 30,
                    }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onWheel={handleWheel}
                    className="group rounded-[1.2rem] overflow-hidden"
                  >
                    {/* Help tooltip showing on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none text-white text-center p-4">
                      <p className="font-mono text-[10px] uppercase tracking-widest font-bold mb-1 text-gold">Navigasi Crop</p>
                      <p className="text-[10px] text-white/80 font-light leading-normal max-w-[150px]">
                        Seret foto untuk menggeser. Scroll/Cubit layar untuk zoom.
                      </p>
                    </div>
                  </div>

                  {/* Rendering loader overlay */}
                  {isExporting && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-gold z-40 pointer-events-none">
                      <Loader2 size={40} className="animate-spin mb-4" />
                      <p className="font-mono text-sm uppercase tracking-widest text-text-muted">Membuat Kartu...</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons (Share, Download, and Labeled Segmented Slider) */}
                <div className="flex gap-4 justify-center items-center mt-2 flex-wrap">
                  {isShareSupported && (
                    <button
                      onClick={handleShare}
                      disabled={isExporting}
                      title="Bagikan ke IG Story"
                      className="w-14 h-14 flex items-center justify-center rounded-full border border-gold text-gold hover:bg-gold hover:text-black-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Share2 size={24} />
                    </button>
                  )}
                  
                  <button
                    onClick={handleDownload}
                    disabled={isExporting}
                    title="Unduh Gambar"
                    className="w-14 h-14 flex items-center justify-center rounded-full border border-gold text-gold hover:bg-gold hover:text-black-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download size={24} />
                  </button>

                  {/* Labeled Segmented Slider with Gold highlight and text overlays */}
                  <div 
                    onClick={() => {
                      if (!isExporting) {
                        setDisplayMode(prev => prev === 'motto' ? 'thesis' : 'motto');
                      }
                    }}
                    className="relative w-[22rem] h-14 bg-black/40 border border-gold/30 rounded-full flex items-center p-1 cursor-pointer select-none"
                  >
                    {/* Sliding active gold bubble */}
                    <div 
                      className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gold rounded-full transition-transform duration-300 ease-out ${
                        displayMode === 'thesis' ? 'translate-x-full' : 'translate-x-0'
                      }`}
                      style={{
                        left: '2px',
                        width: 'calc(50% - 2px)'
                      }}
                    />
                    
                    {/* Motto label overlay */}
                    <span className={`w-1/2 z-10 text-center font-mono text-sm uppercase tracking-wider font-extrabold transition-colors duration-300 ${
                      displayMode === 'motto' ? 'text-black-primary' : 'text-gold'
                    }`}>
                      Motto Hidup
                    </span>

                    {/* Thesis label overlay */}
                    <span className={`w-1/2 z-10 text-center font-mono text-sm uppercase tracking-wider font-extrabold transition-colors duration-300 ${
                      displayMode === 'thesis' ? 'text-black-primary' : 'text-gold'
                    }`}>
                      Judul Skripsi
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
export { ImageIcon };
