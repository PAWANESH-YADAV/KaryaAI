import React from 'react';
import { storageService } from '../../services/storageService';
import { AdminTab } from './AdminLayout';
import {
  Users,
  Compass,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Activity,
  Award,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  BarChart2
} from 'lucide-react';

interface AdminOverviewProps {
  onSelectTab: (tab: AdminTab) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onSelectTab }) => {
  const users = storageService.getUsers();
  const careers = storageService.getCareers();
  const courses = storageService.getCourses();
  const jobs = storageService.getJobs();

  const metrics = [
    { title: 'Total Registered Users', value: '14,820', change: '+18.4% MoM', icon: <Users className="w-5 h-5 text-blue-600" />, tab: 'users' as AdminTab },
    { title: 'Active Monthly Learners', value: '9,430', change: '+12.1% MoM', icon: <Activity className="w-5 h-5 text-emerald-600" />, tab: 'users' as AdminTab },
    { title: 'Curated Career Paths', value: `${careers.length}`, change: '100% Verified', icon: <Compass className="w-5 h-5 text-orange-600" />, tab: 'careers' as AdminTab },
    { title: 'Published Courses', value: `${courses.length}`, change: '4 New This Month', icon: <GraduationCap className="w-5 h-5 text-purple-600" />, tab: 'courses' as AdminTab },
    { title: 'Active Partner Jobs', value: `${jobs.length}`, change: '500+ Partner Corps', icon: <Briefcase className="w-5 h-5 text-amber-600" />, tab: 'jobs' as AdminTab },
    { title: 'Course Completion Rate', value: '78.2%', change: '+5.4% Retention', icon: <Award className="w-5 h-5 text-rose-600" />, tab: 'courses' as AdminTab },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0F1E36] via-[#122340] to-[#0A1224] rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            Operational Dashboard
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Platform Health & Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time telemetry across student enrollments, recruiter job feeds, and AI mock evaluations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Inference Engine 99.98% SLA</span>
          </span>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            onClick={() => onSelectTab(m.tab)}
            className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{m.title}</span>
              <div className="w-10 h-10 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                {m.icon}
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900">{m.value}</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {m.change}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Manage module</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:text-orange-600 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* User Registration Trends */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">User Registrations Growth</h3>
              <p className="text-xs text-slate-500">Monthly new student & professional onboardings (2025)</p>
            </div>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
              +18.4% YoY
            </span>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-52 w-full flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { month: 'Oct', users: 540, height: '40%' },
              { month: 'Nov', users: 780, height: '55%' },
              { month: 'Dec', users: 920, height: '65%' },
              { month: 'Jan', users: 1250, height: '80%' },
              { month: 'Feb', users: 1420, height: '90%' },
              { month: 'Mar', users: 1680, height: '100%' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.users}
                </span>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-orange-500 to-amber-400 group-hover:from-orange-600 group-hover:to-amber-500 transition-all shadow-sm"
                  style={{ height: bar.height }}
                />
                <span className="text-xs font-semibold text-slate-500">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Career Paths Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Top In-Demand Careers</h3>
            <button
              onClick={() => onSelectTab('careers')}
              className="text-xs font-bold text-orange-600 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {[
              { name: 'AI & ML Software Engineer', share: '38%', color: 'bg-orange-500' },
              { name: 'Full Stack & AI Web Developer', share: '28%', color: 'bg-blue-500' },
              { name: 'Cloud & DevOps Architect', share: '18%', color: 'bg-emerald-500' },
              { name: 'AI Product Manager', share: '16%', color: 'bg-purple-500' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800">{item.name}</span>
                  <span className="text-slate-500">{item.share}</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: item.share }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-slate-600 flex items-center justify-between">
            <span>Verified Hiring Partners</span>
            <span className="font-bold text-slate-900">500+ Active Corps</span>
          </div>
        </div>
      </div>
    </div>
  );
};
