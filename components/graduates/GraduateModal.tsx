import React, { useEffect } from 'react';
import { Participant } from '@/types/site';
import { X, ExternalLink, Mail } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface GraduateModalProps {
  participant: Participant | null;
  onClose: () => void;
}

export function GraduateModal({ participant, onClose }: GraduateModalProps) {
  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (participant) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [participant]);

  if (!participant) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black-primary/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl bg-charcoal border border-glass rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black-soft/50 hover:bg-black-soft text-text-muted hover:text-gold rounded-full transition-colors backdrop-blur-md"
          aria-label="Tutup modal"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-auto md:h-auto bg-black-soft relative">
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-charcoal to-black-primary">
             <div className="text-7xl md:text-9xl font-serif text-gold/20">
               {participant.name.charAt(0).toUpperCase()}
             </div>
           </div>
           
           {/* Uncomment when images are ready */}
           {/* <Image
             src={participant.photo}
             alt={participant.photoAlt}
             fill
             className="object-cover object-top z-10"
             sizes="(max-width: 768px) 100vw, 50vw"
             priority
           /> */}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-center overflow-y-auto">
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <span className="text-sm font-semibold tracking-wider uppercase text-gold">
                {participant.program}
              </span>
              <h2 id="modal-title" className="text-3xl md:text-4xl font-serif text-text-primary mt-2 mb-1">
                {participant.name}
              </h2>
              {participant.nim && (
                <p className="text-text-muted text-sm font-mono">{participant.nim}</p>
              )}
            </div>

            {/* Quote */}
            {participant.quote && (
              <div className="py-6 border-y border-glass relative">
                <span className="absolute top-4 left-0 text-4xl text-gold/20 font-serif leading-none select-none">&quot;</span>
                <p className="text-lg text-text-primary italic font-serif leading-relaxed relative z-10">
                  {participant.quote}
                </p>
              </div>
            )}

            {/* Academic Info */}
            <div className="grid grid-cols-2 gap-6 pt-2">
              {(participant.gpa || participant.predicate) && (
                <div className="col-span-2 md:col-span-1 space-y-1">
                  <p className="text-xs uppercase tracking-widest text-text-muted">Akademik</p>
                  {participant.predicate && <p className="text-text-primary font-medium">{participant.predicate}</p>}
                  {participant.gpa && <p className="text-gold font-mono text-sm">IPK: {participant.gpa}</p>}
                </div>
              )}

              {participant.advisor && (
                <div className="col-span-2 md:col-span-1 space-y-1">
                  <p className="text-xs uppercase tracking-widest text-text-muted">Pembimbing</p>
                  <p className="text-text-primary text-sm leading-relaxed">{participant.advisor}</p>
                </div>
              )}

              {participant.thesisTitle && (
                <div className="col-span-2 space-y-1">
                  <p className="text-xs uppercase tracking-widest text-text-muted">Judul Skripsi</p>
                  <p className="text-text-primary text-sm leading-relaxed">{participant.thesisTitle}</p>
                </div>
              )}
            </div>

            {/* Social Links */}
            {(participant.social?.instagram || participant.social?.linkedin || participant.social?.email) && (
              <div className="pt-4 flex flex-wrap items-center gap-4">
                {participant.social.instagram && (
                  <a href={`https://instagram.com/${participant.social.instagram}`} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-gold transition-colors inline-flex items-center gap-2 text-sm">
                    Instagram <ExternalLink size={14} />
                  </a>
                )}
                {participant.social.email && (
                  <a href={`mailto:${participant.social.email}`} className="text-text-muted hover:text-gold transition-colors inline-flex items-center gap-2 text-sm">
                    Email <Mail size={14} />
                  </a>
                )}
                {participant.social.linkedin && (
                  <a href={participant.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-gold transition-colors inline-flex items-center gap-2 text-sm">
                    LinkedIn <ExternalLink size={14} />
                  </a>
                )}
              </div>
            )}

          </div>
        </div>
      </motion.div>
    </div>
  );
}
