"use client";

import { siteConfig } from "@/data/site";
import { OpeningStory } from "@/components/sections/OpeningStory";
import { Stats } from "@/components/sections/Stats";
import { Programs } from "@/components/sections/Programs";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Countdown } from "@/components/sections/Countdown";
import { Agenda } from "@/components/sections/Agenda";
import { Trailer } from "@/components/sections/Trailer";
import { CohortGraph } from "@/components/sections/CohortGraph";
import { FeaturedGraduates } from "@/components/sections/FeaturedGraduates";
import { GraduateWall } from "@/components/graduates/GraduateWall";
import { Timeline } from "@/components/sections/Timeline";
import { Messages } from "@/components/sections/Messages";
import { Guestbook } from "@/components/sections/Guestbook";
import { Closing } from "@/components/sections/Closing";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, Suspense } from "react";
import { section } from "framer-motion/client";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <main className="min-h-screen bg-black-primary text-text-primary">
      {/* Cinematic Hero Section */}
      <section
        ref={heroRef}
        id="home"
        className="relative flex flex-col items-center justify-center min-h-screen overflow-x-clip px-4 bg-black-primary"
      >
        {/* Blueprint Grid Background */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(197, 160, 89, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(197, 160, 89, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(197, 160, 89, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(197, 160, 89, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '160px 160px'
          }}
        />

        <motion.div
          animate={{ scale: [1, 1.05] }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 z-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bg1.jpeg"
            alt="Gedung Rektorat Background"
            className="w-full h-full object-cover opacity-20"
          />
        </motion.div>
        <div className="absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}>
        </div>

        {/* Glowing Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 z-0 w-[120vw] h-[60vh] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_60%)] blur-[100px] opacity-30 pointer-events-none"
        />

        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black-primary/40 via-transparent to-black-primary pointer-events-none"></div>

        <motion.div
          style={{ y, opacity }}
          className="z-10 text-center space-y-8 flex flex-col items-center justify-center w-full mt-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 className="hero-title font-serif text-transparent bg-clip-text bg-gradient-to-b from-champagne via-gold-muted to-gold drop-shadow-sm select-none">
              {siteConfig.stats.chapter}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="space-y-3 uppercase tracking-[0.25em] text-xs md:text-sm text-text-muted font-medium"
          >
            <p className="text-gold tracking-[0.3em] font-mono">[ YUDISIUM KE-{siteConfig.stats.chapter} ]</p>
            <p className="tracking-[0.2em]">{"//"} {siteConfig.institution.faculty}</p>
            <p className="text-text-muted opacity-50 tracking-[0.2em]">{siteConfig.institution.name}</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-text-primary/90 mt-12 font-light leading-relaxed border-l-2 border-gold/30 pl-4 text-left"
          >
            {siteConfig.tagline}
          </motion.p>
        </motion.div>
      </section>

      <Countdown />
      <Agenda />
      <OpeningStory />
      <Trailer />
      <CohortGraph />
      <Stats />
      <Programs />
      <GalleryPreview />
      <FeaturedGraduates />
      <Timeline />
      <Suspense fallback={<div className="h-96 flex items-center justify-center font-mono text-gold tracking-widest uppercase text-sm">Memuat Data Peserta...</div>}>
        <GraduateWall />
      </Suspense>
      <Messages />
      <Guestbook />
      <Closing />
    </main>
  );
}
