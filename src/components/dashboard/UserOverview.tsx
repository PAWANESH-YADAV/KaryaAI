import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import { DashboardTab } from './DashboardLayout';
import {
  Sparkles,
  ArrowRight,
  Target,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Video,
  Clock,
  Building,
  MapPin,
  ChevronRight,
  Flame
} from 'lucide-react';

interface UserOverviewProps {
  onSelectTab: (tab: DashboardTab) => void;
}

export const UserOverview: React.FC<UserOverviewProps> = ({ onSelectTab }) => {
  const { currentUser } = useAuth();
  const careers = storageService.getCareers().slice(0, 3);
  const courses = storageService.getCourses();
  const activeCourse = courses.find(c => (c.progress || 0) > 0 && (c.progress || 0) < 100) || courses[0];
  const jobs = storageService.getJobs().slice(0, 3);
  const applications = storageService.getApplications();

  const readinessScore = currentUser?.careerReadinessScore || 82;
  const profileCompletion = currentUser?.profileCompletion || 85;

  return (
    <div className="space-y-6">
      {/* Top Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F1E36] via-[#122340] to-[#0B1527] p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Career Co-Pilot Active</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {currentUser?.name || 'Rahul'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your AI career roadmap is currently on track. You are 3 milestones away from qualifying as a top-percentile candidate for senior AI engineering roles.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTab('career-analysis')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Re-run AI Analysis</span>
            </button>
            <button
              onClick={() => onSelectTab('interviews')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <Video className="w-4 h-4 text-orange-400" />
              <span>Practice Mock Interview</span>
            </button>
          </div>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-orange-500/15 filter blur-2xl pointer-events-none" />
      </div>

      {/* Key Metric Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Career Readiness Score */}
        <div
          onClick={() => onSelectTab('career-analysis')}
          className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Career Readiness</span>
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{readinessScore}%</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +8% this month
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{ width: `${readinessScore}%` }} />
          </div>
        </div>

        {/* Profile Completion */}
        <div
          onClick={() => onSelectTab('profile')}
          className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profile Strength</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{profileCompletion}%</span>
            <span className="text-xs font-semibold text-blue-600">All-Star Tier</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${profileCompletion}%` }} />
          </div>
        </div>

        {/* Active Applications */}
        <div
          onClick={() => onSelectTab('applications')}
          className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Applications</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{applications.length}</span>
            <span className="text-xs font-semibold text-purple-600">1 in Interview Round</span>
          </div>
          <p className="mt-3 text-[11px] text-slate-500 truncate">
            Latest: Razorpay (Interview scheduled)
          </p>
        </div>

        {/* Study Streak */}
        <div
          onClick={() => onSelectTab('courses')}
          className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Learning Streak</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">7 Days</span>
            <span className="text-xs font-semibold text-amber-600">On Fire 🔥</span>
          </div>
          <p className="mt-3 text-[11px] text-slate-500 truncate">
            Top 5% learner consistency
          </p>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Recommended Careers & Active Learning */}
        <div className="lg:col-span-8 space-y-6">
          {/* Top Recommended Career Matches */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-base text-slate-900">Top Recommended Careers</h3>
                <p className="text-xs text-slate-500">Based on your skills, degree, and industry preferences</p>
              </div>
              <button
                onClick={() => onSelectTab('careers')}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {careers.map(cp => (
                <div
                  key={cp.id}
                  onClick={() => onSelectTab('careers')}
                  className="p-4 rounded-2xl border border-stone-200 hover:border-orange-300 hover:bg-orange-50/20 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-md">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{cp.title}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        {cp.matchScore}% Fit
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{cp.description}</p>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {cp.requiredSkills.slice(0, 3).map((sk, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-slate-600 font-medium">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100">
                    <span className="text-xs font-bold text-slate-900">{cp.averageSalary.split(' ')[0]} {cp.averageSalary.split(' ')[1]}</span>
                    <span className="text-[11px] text-emerald-600 font-semibold">{cp.demandGrowth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Course & Learning Progress */}
          {activeCourse && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Current Course in Progress</h3>
                    <p className="text-xs text-slate-500">{activeCourse.provider}</p>
                  </div>
                </div>
                <button
                  onClick={() => onSelectTab('courses')}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700"
                >
                  Continue Course →
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{activeCourse.title}</h4>
                  <span className="text-xs font-bold text-orange-600">{activeCourse.progress || 65}%</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all"
                    style={{ width: `${activeCourse.progress || 65}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Duration: {activeCourse.duration}</span>
                  <span className="text-emerald-600 font-medium">Verified KaryaAI Certificate included</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Upcoming Interview & Recommended Jobs */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Interview Card */}
          <div className="bg-gradient-to-br from-[#0F1E36] to-[#0A1224] rounded-3xl p-6 text-white border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                <Video className="w-4 h-4" />
                <span>Upcoming Interview</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                In 2 Days
              </span>
            </div>

            <h4 className="font-bold text-base text-white mb-1">
              Razorpay Round 2: AI Architecture
            </h4>
            <p className="text-xs text-slate-300 mb-4">
              Associate AI Engineer • Scheduled for Thursday at 2:00 PM IST
            </p>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 mb-4 text-xs space-y-1 text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>Format: 45 min Live Technical + System Questions</span>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('interviews')}
              className="w-full py-2.5 rounded-full font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Practice AI Mock Round</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recently Recommended Jobs */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-slate-900">Recommended Jobs</h3>
              <button
                onClick={() => onSelectTab('jobs')}
                className="text-xs font-bold text-orange-600 hover:text-orange-700"
              >
                Browse All
              </button>
            </div>

            <div className="space-y-3">
              {jobs.map(j => (
                <div
                  key={j.id}
                  onClick={() => onSelectTab('jobs')}
                  className="p-3.5 rounded-xl border border-stone-100 hover:border-orange-300 hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h5 className="font-bold text-xs text-slate-900 line-clamp-1">{j.title}</h5>
                    <span className="text-[10px] font-bold text-orange-600 shrink-0">{j.salaryRange.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      {j.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {j.location.split(',')[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{j.type}</span>
                    <span className="text-orange-600 font-semibold">1-Click Apply →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
