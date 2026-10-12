import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { Course } from '../../types';
import { Plus, Search, Edit2, Trash2, X, Star, GraduationCap } from 'lucide-react';

export const AdminCoursesView: React.FC = () => {
  const { showToast } = useToast();
  const [courses, setCourses] = useState<Course[]>(storageService.getCourses());
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [provider, setProvider] = useState('KaryaAI Academy');
  const [category, setCategory] = useState('AI & Machine Learning');
  const [duration, setDuration] = useState('6 Weeks');
  const [difficulty, setDifficulty] = useState<Course['difficulty']>('Intermediate');
  const [certificateName, setCertificateName] = useState('');
  const [description, setDescription] = useState('');

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.provider.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingCourse(null);
    setTitle('');
    setProvider('KaryaAI Academy');
    setCategory('AI & Machine Learning');
    setDuration('6 Weeks');
    setDifficulty('Intermediate');
    setCertificateName('Certified Specialist in AI');
    setDescription('');
    setIsModalOpen(true);
  };

  const openEdit = (c: Course) => {
    setEditingCourse(c);
    setTitle(c.title);
    setProvider(c.provider);
    setCategory(c.category);
    setDuration(c.duration);
    setDifficulty(c.difficulty);
    setCertificateName(c.certificateName || '');
    setDescription(c.description);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Title and description are required.', 'warning');
      return;
    }

    const obj: Course = {
      id: editingCourse ? editingCourse.id : 'crs-' + Date.now().toString(36),
      title: title.trim(),
      provider: provider.trim(),
      category,
      duration,
      difficulty,
      rating: editingCourse?.rating || 4.9,
      enrolledCount: editingCourse?.enrolledCount || 100,
      isCertified: true,
      certificateName: certificateName.trim(),
      progress: editingCourse?.progress || 0,
      description: description.trim(),
      skillsGained: editingCourse?.skillsGained || ['Specialized Expertise', 'Real-World Project'],
      status: 'Published'
    };

    storageService.saveCourse(obj);
    setCourses(storageService.getCourses());
    setIsModalOpen(false);
    showToast(editingCourse ? 'Course updated!' : 'New course published!', 'success');
  };

  const handleTogglePublish = (course: Course) => {
    const newStatus = course.status === 'Published' ? 'Draft' : 'Published';
    const updated = { ...course, status: newStatus as any };
    storageService.saveCourse(updated);
    setCourses(storageService.getCourses());
    showToast(`Course set to ${newStatus}.`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Curriculum Catalog</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Courses & Certifications Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish courses, manage credential titles, and view learner enrollment statistics.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Course</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search courses or providers..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none bg-stone-50"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(c => (
          <div
            key={c.id}
            className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded-md">
                  {c.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  c.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-slate-600'
                }`}>
                  {c.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 mb-1">{c.title}</h3>
              <p className="text-xs text-slate-500 mb-3">{c.provider}</p>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">{c.description}</p>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-bold text-slate-900">{c.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Learners Enrolled:</span>
                  <span className="font-bold text-slate-900">{c.enrolledCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Certificate:</span>
                  <span className="font-bold text-emerald-600 truncate max-w-[140px]">{c.certificateName}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => handleTogglePublish(c)}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-800"
              >
                {c.status === 'Published' ? 'Unpublish' : 'Publish'}
              </button>

              <button
                onClick={() => openEdit(c)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-stone-100"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <form onSubmit={handleSave} className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900">
              {editingCourse ? 'Edit Course' : 'Create Course'}
            </h3>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Course Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Generative AI Systems Engineering"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Provider *</label>
                <input
                  type="text"
                  required
                  value={provider}
                  onChange={e => setProvider(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Duration</label>
                <input
                  type="text"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  placeholder="e.g. 6 Weeks"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Certificate Credential Name</label>
              <input
                type="text"
                value={certificateName}
                onChange={e => setCertificateName(e.target.value)}
                placeholder="e.g. KaryaAI Certified Generative AI Engineer"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Description *</label>
              <textarea
                rows={2}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-bold text-slate-600">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 rounded-full font-bold bg-orange-500 hover:bg-orange-600 text-white">
                Save Course
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
