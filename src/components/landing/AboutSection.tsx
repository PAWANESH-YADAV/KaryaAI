import React from 'react';
import { Compass, GraduationCap, Award, Briefcase } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with floating modern HUD tags */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative accent glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/20 to-amber-500/20 rounded-3xl filter blur-xl opacity-75" />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 bg-[#0A1128] aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
                  alt="Young female professional analyzing career pathways on laptop"
                  className="w-full h-full object-cover object-center filter brightness-95"
                />

                {/* Floating HUD tags */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                  {/* Top floating badges */}
                  <div className="flex flex-col gap-2.5 items-end">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1128]/90 backdrop-blur-md border border-orange-400/60 text-orange-300 text-xs font-semibold shadow-lg animate-pulse">
                      <Compass className="w-3.5 h-3.5 text-orange-400" />
                      <span>Career Paths</span>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1128]/90 backdrop-blur-md border border-amber-400/60 text-amber-300 text-xs font-semibold shadow-lg">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Skill Development</span>
                    </div>
                  </div>

                  {/* Bottom floating badges */}
                  <div className="flex flex-col gap-2.5 items-end">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1128]/90 backdrop-blur-md border border-orange-400/60 text-orange-200 text-xs font-semibold shadow-lg">
                      <Award className="w-3.5 h-3.5 text-orange-300" />
                      <span>Certifications</span>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1128]/90 backdrop-blur-md border border-amber-300/60 text-amber-200 text-xs font-semibold shadow-lg">
                      <Briefcase className="w-3.5 h-3.5 text-amber-300" />
                      <span>Job Opportunities</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Platform Metrics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block">
              <span className="text-xs font-bold tracking-[0.2em] text-orange-700 uppercase bg-orange-100/90 px-3.5 py-1.5 rounded-full border border-orange-200">
                About KaryaAI
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1128] tracking-tight leading-[1.18]">
              Your AI-Powered <br className="hidden sm:inline" />
              Career Co-Pilot
            </h2>

            <p className="text-base text-slate-600 font-normal leading-relaxed">
              KaryaAI analyzes your background, interests, and existing skills to create a personalized career roadmap. We help you learn the right skills, get certified, prepare with mock interviews, and connect with recruiters — so you can achieve your dreams with confidence.
            </p>

            {/* 4 Stat Metric Columns */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-stone-200/80">
              <div className="space-y-1">
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-orange-600">
                  10+
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Career Paths
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-orange-600">
                  100%
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Personalized Recommendations
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-orange-600">
                  500+
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Partner Companies
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-orange-600">
                  24/7
                </div>
                <div className="text-xs font-medium text-slate-500">
                  AI Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
