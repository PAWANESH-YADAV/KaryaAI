import React from 'react';
import { User, Cpu, BookOpen, Briefcase } from 'lucide-react';

interface HowItWorksProps {
  onStartStep?: (stepIndex: number) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartStep }) => {
  const steps = [
    {
      num: 1,
      numColor: 'bg-orange-500 text-white',
      icon: <User className="w-5 h-5 text-orange-600" />,
      iconBg: 'bg-orange-50',
      title: 'Create Profile',
      desc: 'Share your background, interests and goals.'
    },
    {
      num: 2,
      numColor: 'bg-[#0A1128] text-white',
      icon: <Cpu className="w-5 h-5 text-[#0A1128]" />,
      iconBg: 'bg-slate-100',
      title: 'Get AI Analysis',
      desc: 'Receive personalized career paths & skill gaps.'
    },
    {
      num: 3,
      numColor: 'bg-amber-500 text-white',
      icon: <BookOpen className="w-5 h-5 text-amber-600" />,
      iconBg: 'bg-amber-50',
      title: 'Learn & Practice',
      desc: 'Access courses, certifications & mock interviews.'
    },
    {
      num: 4,
      numColor: 'bg-orange-600 text-white',
      icon: <Briefcase className="w-5 h-5 text-orange-600" />,
      iconBg: 'bg-orange-100/70',
      title: 'Get Hired',
      desc: 'Connect with recruiters and apply for jobs.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.2em] text-orange-700 uppercase bg-orange-100/90 px-3.5 py-1.5 rounded-full border border-orange-200">
            Simple Steps
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1128] tracking-tight">
            How It Works
          </h2>
          <p className="text-base text-slate-600">
            Your journey from confusion to career success in just a few steps.
          </p>
        </div>

        {/* 4 Steps Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => onStartStep?.(idx)}
              className="relative bg-white rounded-3xl p-7 border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-start cursor-pointer group hover:border-orange-400"
            >
              {/* Top Row: Step Number Pill + Icon */}
              <div className="flex items-center justify-between w-full mb-5">
                <div className={`w-8 h-8 rounded-full ${step.numColor} font-bold text-xs flex items-center justify-center shadow-sm`}>
                  {step.num}
                </div>
                <div className={`w-10 h-10 rounded-2xl ${step.iconBg} flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs`}>
                  {step.icon}
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
