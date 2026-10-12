import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  onStartJourney: () => void;
  onWatchDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartJourney, onWatchDemo }) => {
  return (
    <section id="hero" className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#0A1128] text-white">
      {/* Background with dramatic mountain sunrise/summit silhouette with deep navy and warm sunrise glow */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000"
          alt="Climber reaching mountain summit at golden sunrise"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter contrast-125"
        />
        {/* Rich dark navy overlay glow with warm horizon */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128] via-[#0E1738]/90 to-[#1A2550]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-[#0A1128]/80" />
        {/* Soft golden amber sunrise aura */}
        <div className="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-orange-500/15 filter blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 max-w-2xl space-y-6">
            {/* Pill Subtitle */}
            <div className="inline-block">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-orange-400 uppercase bg-orange-950/60 px-3.5 py-1.5 rounded-full border border-orange-500/30">
                AI-Powered Career Co-Pilot
              </span>
            </div>

            {/* Serif Main Heading */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#FDFCFB] tracking-tight leading-[1.12]">
              Find Your <br className="hidden sm:inline" />
              <span className="text-[#FED7AA] sm:text-orange-300">Perfect Career Path</span>
            </h1>

            {/* Subtitle text */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              KaryaAI helps students and professionals discover the right career, build in-demand skills, get certified, and connect with top opportunities — all powered by AI.
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-5">
              <button
                onClick={onStartJourney}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base bg-gradient-to-r from-orange-500 via-[#FF6B35] to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onWatchDemo}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base bg-[#131C38] hover:bg-[#1C284E] text-stone-100 hover:text-white border border-slate-700/80 hover:border-orange-500/50 transition-all transform hover:-translate-y-0.5"
              >
                <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch How It Works</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hand-drawn script font accent */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
            <div className="relative pl-6 lg:pl-0 text-left lg:text-right">
              <span className="font-handwriting text-3xl sm:text-4xl lg:text-5xl text-[#FDBA74] leading-tight block transform -rotate-3 select-none">
                Better Skills<br />
                Bigger Dreams<br />
                Brighter Future
              </span>
              <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-300 justify-start lg:justify-end">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                <span>Over 14,000+ Careers Launched</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
