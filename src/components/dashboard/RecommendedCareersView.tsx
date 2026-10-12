import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { CareerPath } from '../../types';
import { DashboardTab } from './DashboardLayout';
import {
  Compass,
  TrendingUp,
  Building,
  CheckCircle2,
  X,
  ArrowRight,
  Filter,
  GraduationCap,
  Sparkles
} from 'lucide-react';

interface RecommendedCareersViewProps {
  onSelectTab: (tab: DashboardTab) => void;
}

export const RecommendedCareersView: React.FC<RecommendedCareersViewProps> = ({ onSelectTab }) => {
  const careers = storageService.getCareers();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalCareer, setActiveModalCareer] = useState<CareerPath | null>(null);

  const categories = ['All', 'Engineering & AI', 'Cloud & Infrastructure', 'Product & Business', 'Data & Analytics', 'Security & Cloud'];

  const filteredCareers = careers.filter(c => {
    if (selectedCategory === 'All') return true;
    return c.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Career Explorer</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Recommended Career Paths
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover high-demand careers mapped against verified industry hiring requirements and compensations.
          </p>
        </div>

        <button
          onClick={() => onSelectTab('career-analysis')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>My AI Match Analysis</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-stone-200 text-slate-600 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCareers.map(cp => (
          <div
            key={cp.id}
            className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {cp.industry}
                </span>
                {cp.matchScore && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    {cp.matchScore}% Match
                  </span>
                )}
              </div>

              <h3 className="font-bold text-lg text-slate-900 group-hover:text-orange-600 transition-colors mb-2">
                {cp.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                {cp.description}
              </p>

              {/* Salary & Demand growth */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 mb-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Avg. Salary</span>
                  <span className="font-bold text-slate-900">{cp.averageSalary}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Hiring Demand</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> {cp.demandGrowth}
                  </span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Key Skills Required
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cp.requiredSkills.slice(0, 4).map((sk, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 text-slate-700 font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                  {cp.requiredSkills.length > 4 && (
                    <span className="text-[11px] px-2 py-1 rounded-lg bg-stone-100 text-slate-400">
                      +{cp.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Level: {cp.level}</span>
              <button
                onClick={() => setActiveModalCareer(cp)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline"
              >
                <span>Full Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Career Details Modal */}
      {activeModalCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 bg-[#0F1E36] text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">
                  {activeModalCareer.industry}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeModalCareer.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalCareer(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Salary Range</span>
                  <span className="text-sm font-extrabold text-slate-900">{activeModalCareer.averageSalary.split(' ')[0]} {activeModalCareer.averageSalary.split(' ')[1]}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Market Demand</span>
                  <span className="text-sm font-extrabold text-emerald-600">{activeModalCareer.demandGrowth}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Career Tier</span>
                  <span className="text-sm font-extrabold text-slate-900">{activeModalCareer.level} Level</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Role Overview</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeModalCareer.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Required Core Competencies</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalCareer.requiredSkills.map((sk, i) => (
                    <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-xl bg-orange-50 text-orange-800 border border-orange-200/60">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Recommended Courses on KaryaAI</h4>
                <div className="space-y-2">
                  {activeModalCareer.recommendedCourses.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 text-xs text-slate-800 border border-stone-200">
                      <GraduationCap className="w-4 h-4 text-orange-600" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Top Hiring Companies</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalCareer.topCompanies.map((comp, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => setActiveModalCareer(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveModalCareer(null);
                    onSelectTab('courses');
                  }}
                  className="px-4 py-2.5 rounded-full text-xs font-bold bg-slate-900 text-white hover:bg-slate-800"
                >
                  Start Preparation Courses
                </button>
                <button
                  onClick={() => {
                    setActiveModalCareer(null);
                    onSelectTab('jobs');
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600"
                >
                  Find Open Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
