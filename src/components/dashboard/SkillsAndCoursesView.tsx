import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { Course } from '../../types';
import {
  GraduationCap,
  Clock,
  Star,
  Award,
  Bookmark,
  CheckCircle2,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const SkillsAndCoursesView: React.FC = () => {
  const { showToast } = useToast();
  const [courses, setCourses] = useState<Course[]>(storageService.getCourses());
  const [skills] = useState(storageService.getSkills());
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  const categories = ['All', 'AI & Machine Learning', 'Full Stack Development', 'Cloud & DevOps', 'Interview Preparation', 'Product Management', 'Data Science'];

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.provider.toLowerCase().includes(search.toLowerCase()) ||
                          c.skillsGained.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleToggleSave = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const isSaved = !c.isSaved;
        showToast(isSaved ? 'Course bookmarked to your learning list.' : 'Course removed from bookmarks.', 'info');
        return { ...c, isSaved };
      }
      return c;
    });
    setCourses(updated);
    storageService.saveCourse(updated.find(c => c.id === courseId)!);
  };

  const handleAdvanceProgress = (courseId: string, delta: number) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const newProgress = Math.min(100, Math.max(0, (c.progress || 0) + delta));
        storageService.updateCourseProgress(courseId, newProgress);
        if (newProgress === 100) {
          showToast(`Congratulations! You earned the certificate for "${c.title}"!`, 'success');
        } else {
          showToast(`Progress updated to ${newProgress}%`, 'info');
        }
        return { ...c, progress: newProgress };
      }
      return c;
    });
    setCourses(updated);
    if (activeCourseModal && activeCourseModal.id === courseId) {
      setActiveCourseModal(updated.find(c => c.id === courseId) || null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Curriculum & Upskilling</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Courses & Certifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Earn verifiable micro-credentials recognized by KaryaAI's network of 500+ hiring partners.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            1 Certificate Earned
          </span>
        </div>
      </div>

      {/* Recommended In-Demand Skills Strip */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 rounded-2xl p-5 border border-orange-200/80">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-orange-800 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-orange-600" />
          <span>High-Demand Skills Recommended For You</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 8).map(sk => (
            <span
              key={sk.id}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-orange-200 text-xs font-semibold text-slate-800 shadow-xs"
            >
              <span>{sk.name}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                sk.demandLevel === 'Critical' ? 'bg-rose-100 text-rose-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {sk.demandLevel}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search courses or skills..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-orange-500 bg-white"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-slate-600 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map(course => {
          const progress = course.progress || 0;
          const isComplete = progress === 100;

          return (
            <div
              key={course.id}
              onClick={() => setActiveCourseModal(course)}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded-md">
                    {course.category}
                  </span>
                  <button
                    onClick={(e) => handleToggleSave(course.id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-orange-500 transition-colors"
                  >
                    <Bookmark className={`w-4 h-4 ${course.isSaved ? 'fill-orange-500 text-orange-500' : ''}`} />
                  </button>
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-orange-600 transition-colors mb-1.5">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3">{course.provider}</p>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {course.description}
                </p>

                {/* Meta Row: Duration, Rating, Difficulty */}
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 pb-3 border-b border-stone-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {course.duration}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {course.rating}
                  </span>
                  <span>•</span>
                  <span className="font-medium text-slate-700">{course.difficulty}</span>
                </div>

                {/* Skills Gained Tags */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Skills Gained
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {course.skillsGained.map((sk, i) => (
                      <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-stone-100 text-slate-700">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress & Action Bottom */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-500 font-medium">Learning Progress</span>
                  <span className={`font-bold ${isComplete ? 'text-emerald-600' : 'text-orange-600'}`}>
                    {progress}% {isComplete && '✓ Completed'}
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden mb-3">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdvanceProgress(course.id, 25);
                    }}
                    className="text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    +25% Progress
                  </button>

                  <span className="text-xs font-bold text-orange-600 group-hover:underline flex items-center gap-1">
                    <span>{progress === 0 ? 'Start Course' : 'Continue'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Detail Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
            <div className="p-6 bg-[#0F1E36] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                  {activeCourseModal.category}
                </span>
                <h3 className="font-display text-xl font-bold text-white mt-1">
                  {activeCourseModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeCourseModal.description}
              </p>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Official Certification:</span>
                  <span className="font-bold text-slate-900">{activeCourseModal.certificateName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Enrolled Candidates:</span>
                  <span className="font-bold text-slate-900">{activeCourseModal.enrolledCount.toLocaleString()} Learners</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Course Rating:</span>
                  <span className="font-bold text-amber-600">★ {activeCourseModal.rating} / 5.0</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700">Course Progress Tracker</span>
                  <span className="font-bold text-orange-600">{activeCourseModal.progress || 0}%</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-2.5 rounded-full"
                    style={{ width: `${activeCourseModal.progress || 0}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAdvanceProgress(activeCourseModal.id, 20)}
                  className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  Mark +20% Complete
                </button>
                <button
                  onClick={() => handleAdvanceProgress(activeCourseModal.id, 100)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                >
                  Complete & Earn Certificate
                </button>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-5 py-2 rounded-full text-xs font-bold bg-slate-900 text-white"
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
