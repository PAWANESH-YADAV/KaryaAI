import React from 'react';
import { ArrowRight, GraduationCap, Briefcase, Landmark, Building2 } from 'lucide-react';

interface MarketOpportunityProps {
  onExplore: () => void;
}

export const MarketOpportunity: React.FC<MarketOpportunityProps> = ({ onExplore }) => {
  const segments = [
    {
      title: 'Students (18–25)',
      desc: 'Build skills, explore careers, and get job-ready.',
      icon: <GraduationCap className="w-6 h-6 text-orange-400" />,
      tag: 'Tier 1 to 3 Colleges'
    },
    {
      title: 'Professionals (25–35)',
      desc: 'Upskill, switch careers, and unlock better opportunities.',
      icon: <Briefcase className="w-6 h-6 text-amber-400" />,
      tag: 'Early to Mid Career'
    },
    {
      title: 'Colleges & Institutes',
      desc: 'Enhance learning outcomes with AI-driven solutions.',
      icon: <Landmark className="w-6 h-6 text-orange-300" />,
      tag: 'Placement & Curriculum'
    },
    {
      title: 'Training & Corporates',
      desc: 'Get skilled talent and build future-ready teams.',
      icon: <Building2 className="w-6 h-6 text-amber-300" />,
      tag: 'Recruiter Pipelines'
    }
  ];

  return (
    <section id="market" className="py-20 lg:py-28 bg-[#0A1128] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block">
              <span className="text-xs font-bold tracking-[0.2em] text-orange-400 uppercase bg-orange-950/60 px-3.5 py-1.5 rounded-full border border-orange-500/30">
                Market Opportunity
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FDFCFB] tracking-tight leading-[1.16]">
              Huge Opportunity, <br className="hidden sm:inline" />
              Real Impact
            </h2>

            <p className="text-base text-slate-300 font-normal leading-relaxed">
              India's EdTech & upskilling market is growing rapidly, with 20%+ YoY growth. KaryaAI is built to serve students, professionals, and institutions in this massive and evolving ecosystem.
            </p>

            <div className="pt-2">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Market</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Segment Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {segments.map((seg, idx) => (
              <div
                key={idx}
                className="bg-[#101938]/90 hover:bg-[#16234D] border border-slate-800/80 hover:border-orange-500/50 rounded-3xl p-6 transition-all duration-200 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#18234B] border border-slate-700/80 flex items-center justify-center mb-4">
                    {seg.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {seg.title}
                  </h3>
                  <p className="text-sm text-slate-300/80 leading-relaxed">
                    {seg.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>{seg.tag}</span>
                  <span className="text-orange-400 font-semibold">Active Hub →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
