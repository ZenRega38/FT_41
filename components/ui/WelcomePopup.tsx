"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useIsPostYudisium } from '@/lib/hooks';

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isPost = useIsPostYudisium();

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    const hasSeenPopup = localStorage.getItem('ft41_welcome_dismissed');
    if (!hasSeenPopup) {
      // Add a slight delay for dramatic effect
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    if (rememberMe) {
      localStorage.setItem('ft41_welcome_dismissed', 'true');
    }
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black-primary/80 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-lg bg-charcoal border border-glass rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden"
          >
            {/* Glowing top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
            
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-gold transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-10 text-center space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-black-soft flex items-center justify-center border border-gold/30 mb-6 overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <Image src={getAsset("/logo.png")} alt="Logo" width={80} height={80} className="object-cover" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-serif text-text-primary">Selamat Datang</h2>
              
              <p className="text-text-muted leading-relaxed">
                Anda sedang memasuki laman resmi <strong>Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan</strong>. Mari rayakan lahirnya 71 {isPost ? 'insinyur' : 'calon insinyur'} yang siap membangun masa depan.
              </p>

              <div className="pt-6 border-t border-glass flex flex-col items-center gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 border border-glass rounded group-hover:border-gold transition-colors bg-black-soft">
                    <input 
                      type="checkbox" 
                      className="opacity-0 absolute inset-0 cursor-pointer"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    {rememberMe && (
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="w-3 h-3 bg-gold rounded-sm"
                      />
                    )}
                  </div>
                  <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">
                    Ingat saya (Jangan tampilkan lagi)
                  </span>
                </label>

                <button 
                  onClick={handleClose}
                  className="w-full py-3 bg-gold text-black-primary font-bold rounded-lg hover:bg-champagne transition-colors mt-2"
                >
                  Masuk ke Laman
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
