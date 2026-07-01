"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function MotionReveal({ 
  children, 
  className, 
  delay = 0, 
  direction = 'up',
  duration = 0.8,
  onClick
}: MotionRevealProps) {
  const getVariants = () => {
    switch (direction) {
      case 'up': return { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
      case 'down': return { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } };
      case 'left': return { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } };
      case 'right': return { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } };
      case 'none': return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
      default: return { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
