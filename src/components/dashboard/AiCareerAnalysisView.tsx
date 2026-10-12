import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { DashboardTab } from './DashboardLayout';
import {
  Sparkles,
  RefreshCw,
  Target,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

interface AiCareerAnalysisViewProps {
  onSelectTab: (tab: DashboardTab) => void;
}

export const AiCareerAnalysisView: React.FC<AiCareerAnalysisViewProps> = ({ onSelectTab }) => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisTimestamp, setAnalysisTimestamp] = useState('Today at 10:15 AM');

  const handleRunAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisTimestamp('Just now');
      showToast('AI Career Co-Pilot analysis calibrated and refreshed!', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0F1E36] via-[#122340] to-[#0A1224] rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>KaryaAI Intelligence Engine v2.5</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            AI Career Diagnostic & Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Synthesized against your education, projects, and target industry trajectory. Calibrated {analysisTimestamp}.
          </p>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={analyzing}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all transform active:scale-95 disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
          <span>{analyzing ? 'Evaluating Skill Vector...' : 'Re-Run AI Analysis'}</span>
        </button>
      </div>

      {/* Top 3 Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Compatibility Score */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Top Match Compatibility</span>
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900">94%</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Strong Fit
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            AI & Machine Learning Engineer role
          </p>
        </div>

        {/* Career Readiness Index */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interview Readiness</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900">82%</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Tier-1 Ready
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Solid foundations in Python and web APIs
          </p>
        </div>

        {/* Skill Gap Velocity */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Skills Gap Target</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900">3 Skills</span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              ~6 Weeks To Close
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            PyTorch, RAG Pipelines, Docker MLOps
          </p>
        </div>
      </div>

      {/* Recommended Career Paths Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">Recommended Career Trajectories</h3>
            <p className="text-xs text-slate-500">Ranked by current compatibility and future earnings potential</p>
          </div>
          <button
            onClick={() => onSelectTab('careers')}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>Explore All 10+ Paths</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-orange-50/40 border-2 border-orange-400/50 space-y-3 relative overflow-hidden">
            <span className="absolute top-3 right-3 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-500 text-white shadow-sm">
              94% Match
            </span>
            <h4 className="font-bold text-base text-slate-900">AI & Machine Learning Engineer</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Design, train, and deploy generative models, LLM agents, and neural pipelines.
            </p>
            <div className="text-xs font-semibold text-slate-800">
              Avg. Compensation: <span className="text-orange-600 font-bold">₹14 - ₹28 LPA</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-stone-200 text-slate-700">
                91% Match
              </span>
            </div>
            <h4 className="font-bold text-base text-slate-900">Full Stack Web & AI Developer</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Build modern full-stack web applications with React, TypeScript, FastAPI, and embedded AI.
            </p>
            <div className="text-xs font-semibold text-slate-800">
              Avg. Compensation: <span className="text-orange-600 font-bold">₹10 - ₹20 LPA</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-stone-200 text-slate-700">
                86% Match
              </span>
            </div>
            <h4 className="font-bold text-base text-slate-900">Cloud & DevOps Architect</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Engineer containerized infrastructure, automated CI/CD pipelines, and cloud reliability.
            </p>
            <div className="text-xs font-semibold text-slate-800">
              Avg. Compensation: <span className="text-orange-600 font-bold">₹16 - ₹32 LPA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Gap Analysis Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-5">
        <div>
          <h3 className="font-bold text-base text-slate-900">Skills Gap Analysis Matrix</h3>
          <p className="text-xs text-slate-500">
            Comparing your verified competencies against industry hiring benchmarks for AI & Software roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Acquired Skills */}
          <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Competencies You Already Possess (Matched)</span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Python Programming', level: '85% Proficiency', note: 'Strong OOP & scripting fundamentals' },
                { name: 'React.js & Frontend', level: '80% Proficiency', note: 'Hands-on component state & UI design' },
                { name: 'SQL & Relational DBs', level: '78% Proficiency', note: 'Joins, aggregations, query tuning' },
                { name: 'RESTful API Engineering', level: '82% Proficiency', note: 'FastAPI / Express route development' },
              ].map((sk, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-emerald-100 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{sk.name}</span>
                    <span className="text-[11px] text-slate-500">{sk.note}</span>
                  </div>
                  <span className="font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md text-[10px]">
                    {sk.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing / High-Priority Gap Skills */}
          <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Critical Gaps to Bridge for 98% Candidate Tier</span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'PyTorch & Neural Networks', gap: 'High Priority', action: 'Take Module 2 in GenAI Masterclass' },
                { name: 'RAG Architecture & Vector DBs', gap: 'Critical Gap', action: 'Practice with Pinecone & LangChain' },
                { name: 'Docker & MLOps Pipelines', gap: 'Medium Priority', action: 'Complete Cloud DevOps primer' },
                { name: 'System Design Scaling', gap: 'High Priority', action: 'Review rate limiters and caching' },
              ].map((gap, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-amber-100 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{gap.name}</span>
                    <span className="text-[11px] text-orange-600 font-medium">{gap.action}</span>
                  </div>
                  <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md text-[10px]">
                    {gap.gap}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended 3-Phase Learning Roadmap */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-base text-slate-900">Personalized 90-Day Learning Roadmap</h3>
          <p className="text-xs text-slate-500">Structured progression towards target roles and ₹20+ LPA packages</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Phase 1 (Weeks 1 - 4)</span>
            <h4 className="font-bold text-sm text-slate-900">LLM & Deep Learning Foundations</h4>
            <p className="text-xs text-slate-600">
              Dive into Transformer attention mechanics, prompt chaining, vector embeddings, and semantic search.
            </p>
            <div className="pt-2 text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 65% Completed
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-2">
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Phase 2 (Weeks 5 - 8)</span>
            <h4 className="font-bold text-sm text-slate-900">Production RAG & MLOps</h4>
            <p className="text-xs text-slate-600">
              Build resilient retrieval augmented pipelines, containerize inference servers, and set up CI/CD.
            </p>
            <div className="pt-2 text-[11px] text-orange-600 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Next in Queue
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Phase 3 (Weeks 9 - 12)</span>
            <h4 className="font-bold text-sm text-slate-900">Mock Interviews & Recruiter Fast-Track</h4>
            <p className="text-xs text-slate-600">
              Clear 5+ AI mock interview simulations, fine-tune portfolio case studies, and apply via KaryaAI direct partner referrals.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 font-semibold">
              Unlocks at 90% Readiness
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Certifications & Action Triggers */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Recommended Next Action</span>
          </div>
          <h4 className="font-bold text-base text-slate-900">
            Earn the "KaryaAI Certified Generative AI Engineer" Credential
          </h4>
          <p className="text-xs text-slate-500 max-w-lg">
            Candidates with verified KaryaAI certifications receive 3.4x more interview requests from partner recruiters like Swiggy, Cred, and Razorpay.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('courses')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all"
          >
            <GraduationCap className="w-4 h-4 text-orange-400" />
            <span>Go to Courses</span>
          </button>
          <button
            onClick={() => onSelectTab('jobs')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600 transition-all"
          >
            <span>View Matching Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
