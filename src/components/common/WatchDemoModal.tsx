import React, { useState } from 'react';
import { X, Play, CheckCircle2, Sparkles, Brain, Briefcase, Award, ArrowRight } from 'lucide-react';

interface WatchDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

export const WatchDemoModal: React.FC<WatchDemoModalProps> = ({ isOpen, onClose, onGetStarted }) => {
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const demoSteps = [
    {
      title: '1. Intelligent Profile Ingestion',
      subtitle: 'AI reads your background, projects, and target career ambitions',
      icon: <Brain className="w-6 h-6 text-orange-400" />,
      preview: {
        badge: 'Profile Match Score: 82%',
        heading: 'Resume & Skill Scan Complete',
        points: ['Detected 6 technical proficiencies', 'Identified potential for High-Growth AI Engineering', 'Benchmarked against 5,000+ top tech job requisitions']
      }
    },
    {
      title: '2. Personalized Career Roadmap',
      subtitle: 'Dynamic roadmaps built for your timeline and target compensation',
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      preview: {
        badge: 'Recommended: AI Systems Engineer',
        heading: 'Curated 6-Month Upskilling Path',
        points: ['Phase 1: Deep Python & PyTorch architectures', 'Phase 2: RAG & Vector Databases with LangChain', 'Phase 3: Production MLOps with Docker & Kubernetes']
      }
    },
    {
      title: '3. AI Mock Interview Simulation',
      subtitle: 'Real-time speech & technical evaluation with instant constructive feedback',
      icon: <Award className="w-6 h-6 text-orange-400" />,
      preview: {
        badge: 'Interview Score: 88/100',
        heading: 'Round 1: System Design & GenAI Evaluation',
        points: ['Technical Depth: 92% (Exceeded benchmark)', 'Communication Clarity: 85%', 'AI Tip: Highlight database sharding and token caching']
      }
    },
    {
      title: '4. Direct Recruiter Matching',
      subtitle: 'Fast-track your application to verified hiring partners',
      icon: <Briefcase className="w-6 h-6 text-amber-400" />,
      preview: {
        badge: '500+ Partner Companies',
        heading: 'Direct Recruiter Introductions',
        points: ['Verified hiring partners: Razorpay, Swiggy, Cred, Google', 'Direct referral status with KaryaAI certified badge', 'Average interview turnaround under 7 days']
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-[#0A1128] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#070D1E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">How KaryaAI Works</h3>
              <p className="text-xs text-slate-300">Interactive platform walkthrough & demonstration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-3 bg-slate-900/80 border-b border-slate-800">
          {demoSteps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-2 p-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                activeStep === idx
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                activeStep === idx ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {idx + 1}
              </span>
              <span className="truncate">{s.title.split('. ')[1]}</span>
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8 flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-orange-400">
              {demoSteps[activeStep].icon}
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">{demoSteps[activeStep].title}</h4>
              <p className="text-sm text-slate-300">{demoSteps[activeStep].subtitle}</p>
            </div>
          </div>

          {/* Interactive Mock Window */}
          <div className="mt-5 rounded-2xl bg-gradient-to-b from-[#070D1E] to-[#101938] border border-slate-800 p-5 shadow-inner">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/15 text-orange-300 border border-orange-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                {demoSteps[activeStep].preview.badge}
              </span>
              <span className="text-xs text-orange-400 font-mono">LIVE AI ENGINE</span>
            </div>

            <h5 className="font-semibold text-slate-100 text-base mb-3">
              {demoSteps[activeStep].preview.heading}
            </h5>

            <div className="space-y-2.5">
              {demoSteps[activeStep].preview.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#070D1E] border-t border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {activeStep > 0 && (
              <button
                onClick={() => setActiveStep(prev => prev - 1)}
                className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Previous
              </button>
            )}
            {activeStep < demoSteps.length - 1 && (
              <button
                onClick={() => setActiveStep(prev => prev + 1)}
                className="px-3.5 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Next Step
              </button>
            )}
          </div>

          <button
            onClick={() => {
              onClose();
              onGetStarted();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all transform active:scale-95"
          >
            <span>Start Your Journey Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
