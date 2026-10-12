import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CallToActionProps {
  onGetStarted: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onGetStarted }) => {
  return (
    <section className="relative py-20 lg:py-24 bg-[#0A1128] text-white overflow-hidden">
      {/* Background imagery with subtle mountain sunrise */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
          alt="Mountain peak at sunrise"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/95 via-[#0A1128]/85 to-[#16214A]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-block">
          <span className="text-xs font-bold tracking-[0.25em] text-orange-400 uppercase bg-orange-950/60 px-4 py-1.5 rounded-full border border-orange-500/30">
            Ready to Build Your Future?
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FDFCFB] tracking-tight max-w-3xl mx-auto leading-tight">
          Take the First Step Towards <br />
          <span className="text-[#FED7AA] sm:text-orange-300">Your Dream Career</span>
        </h2>

        <div className="pt-2 flex flex-col items-center gap-3">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            Join thousands already building their future with KaryaAI
          </p>
        </div>
      </div>
    </section>
  );
};
