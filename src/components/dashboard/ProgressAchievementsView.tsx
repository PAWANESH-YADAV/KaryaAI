import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useAuth } from '../../context/AuthContext';
import {
  Award,
  CheckCircle2,
  Trophy,
  Flame,
  Star,
  Download,
  X,
  Share2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const ProgressAchievementsView: React.FC = () => {
  const { currentUser } = useAuth();
  const courses = storageService.getCourses();
  const interviews = storageService.getInterviews();
  const [activeCertificate, setActiveCertificate] = useState<string | null>(null);

  const completedCourses = courses.filter(c => (c.progress || 0) === 100);

  const badges = [
    { title: 'AI Foundations Pioneer', desc: 'Completed initial GenAI diagnostic scan', icon: '🚀', unlocked: true },
    { title: '7-Day Learning Streak', desc: 'Maintained consistent weekly study', icon: '🔥', unlocked: true },
    { title: 'Interview Master (85+)', desc: 'Scored over 85 on technical mock interview', icon: '🎯', unlocked: true },
    { title: 'Verified Credential Holder', desc: 'Earned official KaryaAI course certificate', icon: '📜', unlocked: completedCourses.length > 0 },
    { title: 'Multi-Skilled Explorer', desc: 'Added 5+ verified skills to career profile', icon: '⭐', unlocked: true },
    { title: 'Placement Ready Candidate', desc: 'Achieved 80%+ overall career readiness', icon: '🏆', unlocked: (currentUser?.careerReadinessScore || 0) >= 80 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Milestones & Verification</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Progress & Achievements
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official KaryaAI micro-credentials, learner badges, and certified technical milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-2xl bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>All-Star Learner</span>
          </div>
        </div>
      </div>

      {/* Badges Earned Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900">Career Milestone Badges</h3>
          <span className="text-xs font-semibold text-slate-500">
            {badges.filter(b => b.unlocked).length} of {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {badges.map((b, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${
                b.unlocked
                  ? 'bg-gradient-to-b from-stone-50 to-white border-orange-200/80 shadow-xs'
                  : 'bg-stone-50/50 border-stone-200 opacity-50 grayscale'
              }`}
            >
              <div className="text-3xl mb-2">{b.icon}</div>
              <h4 className="font-bold text-xs text-slate-900 leading-snug mb-1">{b.title}</h4>
              <p className="text-[10px] text-slate-500 leading-tight">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Certificates */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900">Earned KaryaAI Certificates</h3>

        {completedCourses.length === 0 ? (
          <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200">
            <Award className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-600">
              No certificates completed yet. Complete a course to 100% in "Courses & Certifications" to unlock your credential.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedCourses.map(course => (
              <div
                key={course.id}
                className="p-5 rounded-2xl bg-gradient-to-br from-stone-900 to-slate-950 text-white border border-slate-800 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                      Verified Micro-Credential
                    </span>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ID #{course.id.toUpperCase()}-VERIFIED
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-white mb-1">
                    {course.certificateName || course.title}
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Issued to <strong>{currentUser?.name || 'Rahul Sharma'}</strong> • Issued by {course.provider}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">KaryaAI Certified Registry</span>
                  <button
                    onClick={() => setActiveCertificate(course.certificateName || course.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-colors"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Preview Modal */}
      {activeCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#0F172A] border-4 border-amber-500/40 rounded-3xl shadow-2xl p-8 text-center text-white space-y-6">
            <button
              onClick={() => setActiveCertificate(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-[0.25em]">
                Certificate of Competency
              </span>
              <h2 className="font-display text-3xl font-extrabold text-amber-200">
                KaryaAI Career Academy
              </h2>
            </div>

            <p className="text-xs text-slate-400">This official certificate is proudly presented to</p>

            <div className="font-display text-2xl sm:text-3xl font-bold text-white border-b border-amber-500/30 pb-3 max-w-md mx-auto">
              {currentUser?.name || 'Rahul Sharma'}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              For demonstrating verifiable proficiency and successfully completing the comprehensive curriculum in{' '}
              <strong className="text-orange-400">{activeCertificate}</strong>.
            </p>

            <div className="flex items-center justify-around pt-6 border-t border-slate-800 text-xs text-slate-400">
              <div>
                <span className="font-handwriting text-2xl text-amber-200 block">Priya Nair</span>
                <span className="text-[10px] uppercase font-bold tracking-wider">Head of Career Ops</span>
              </div>
              <div className="w-12 h-12 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-slate-300 block">2025-VERIFIED</span>
                <span className="text-[10px] uppercase font-bold tracking-wider">Verification Hash</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download / Print PDF</span>
              </button>
              <button
                onClick={() => setActiveCertificate(null)}
                className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
