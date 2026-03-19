import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Cpu } from 'lucide-react';
import { API_COLLECTION } from '@/data/apis';
import { ApiCard } from '@/components/ApiCard';

// Using the generated image from requirements.yaml
const HERO_BG = `${import.meta.env.BASE_URL}images/hero-bg.png`;

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background Hero Image with Overlay */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" />
        <img 
          src={HERO_BG} 
          alt="Abstract dark aesthetic background" 
          className="w-full h-full object-cover opacity-50 mix-blend-screen"
        />
      </div>

      <div className="relative z-10">
        {/* Navigation / Header */}
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">API<span className="text-primary">Explorer</span></span>
            </div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <main>
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-accent mb-8"
            >
              <Cpu className="w-4 h-4" />
              12 Public APIs · No Keys Required
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white mb-6 tracking-tight leading-tight"
            >
              The Open Web <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-fuchsia-400">At Your Fingertips</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              A curated portfolio of live API integrations. Explore diverse data sources instantly—from space tracking to weather forecasting. Click any card below to fire a live network request.
            </motion.p>
          </section>

          {/* Cards Grid Section */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-32">
            <motion.div 
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
            >
              {API_COLLECTION.map((config) => (
                <ApiCard key={config.id} config={config} />
              ))}
            </motion.div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-black/20 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Code2 className="w-4 h-4" />
              <p className="text-sm">Built with React, Tailwind v4, and public APIs.</p>
            </div>
            <div className="text-sm text-muted-foreground/60">
              © {new Date().getFullYear()} API Explorer.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
