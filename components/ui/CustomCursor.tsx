"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const hoveredElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Check if it's a touch device, we don't want custom cursor on mobile
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    // Fix ESLint React warning about synchronous setState in effect
    requestAnimationFrame(() => {
      setIsVisible(true);
      document.body.classList.add('hide-cursor');
    });

    const moveCursor = (e: MouseEvent) => {
      const el = hoveredElementRef.current;
      if (el) {
        // Magnetic snap math
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Lock lightly to the center of the hovered element
        cursorX.set(centerX + distanceX * 0.2);
        cursorY.set(centerY + distanceY * 0.2);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, input, [role="button"], [class*="cursor-pointer"], [class*="hover-trigger"]') as HTMLElement;
      
      if (interactiveEl) {
        hoveredElementRef.current = interactiveEl;
        setIsHovering(true);
      } else {
        hoveredElementRef.current = null;
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('hide-cursor');
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-gold pointer-events-none z-[999999] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-gold pointer-events-none z-[999999] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.8 : 0,
          opacity: isHovering ? 1 : 0,
          borderWidth: isHovering ? '1px' : '2px',
          backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </>
  );
}
