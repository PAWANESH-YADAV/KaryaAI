import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { CareerPath } from '../../types';
import {
  Compass,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Archive,
  X,
  TrendingUp,
  Search
} from 'lucide-react';

export const AdminCareersView: React.FC = () => {
  const { showToast } = useToast();
  const [careers, setCareers] = useState<CareerPath[]>(storageService.getCareers());
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<CareerPath | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState<'Entry' | 'Mid' | 'Senior' | 'Executive'>('Mid');
  const [averageSalary, setAverageSalary] = useState('');
  const [demandGrowth, setDemandGrowth] = useState('+25% YoY');
  const [skillsString, setSkillsString] = useState('');
  const [category, setCategory] = useState('Engineering & AI');

  const filtered = careers.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingCareer(null);
    setTitle('');
    setIndustry('');
    setDescription('');
    setLevel('Mid');
    setAverageSalary('₹14 - ₹26 LPA');
    setDemandGrowth('+30% YoY');
    setSkillsString('Python, Machine Learning, Docker, SQL');
    setCategory('Engineering & AI');
    setIsModalOpen(true);
  };

  const openEditModal = (c: CareerPath) => {
    setEditingCareer(c);
    setTitle(c.title);
    setIndustry(c.industry);
    setDescription(c.description);
    setLevel(c.level);
    setAverageSalary(c.averageSalary);
    setDemandGrowth(c.demandGrowth);
    setSkillsString(c.requiredSkills.join(', '));
    setCategory(c.category);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !industry.trim() || !description.trim()) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }

    const skillsArray = skillsString.split(',').map(s => s.trim()).filter(Boolean);

    const careerObj: CareerPath = {
      id: editingCareer ? editingCareer.id : 'cp-' + Date.now().toString(36),
      title: title.trim(),
      industry: industry.trim(),
      description: description.trim(),
      level,
      averageSalary,
      demandGrowth,
      matchScore: editingCareer?.matchScore || 90,
      requiredSkills: skillsArray,
      recommendedCourses: editingCareer?.recommendedCourses || ['Foundations Masterclass'],
      topCompanies: editingCareer?.topCompanies || ['Google', 'Microsoft', 'Razorpay'],
      status: 'Published',
      category
    };

    storageService.saveCareer(careerObj);
    setCareers(storageService.getCareers());
    setIsModalOpen(false);
    showToast(editingCareer ? 'Career path updated!' : 'New career path published!', 'success');
  };

  const handleDelete = (id: string) => {
    storageService.deleteCareer(id);
    setCareers(storageService.getCareers());
    showToast('Career path removed.', 'info');
  };

  const handleToggleStatus = (career: CareerPath) => {
    const newStatus = career.status === 'Published' ? 'Archived' : 'Published';
    const updated = { ...career, status: newStatus as any };
    storageService.saveCareer(updated);
    setCareers(storageService.getCareers());
    showToast(`Career path set to ${newStatus}.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Curriculum Taxonomy</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Career Path Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish and manage verified career trajectories, skill requirements, and compensation benchmarks.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Career Path</span>
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
            placeholder="Search career paths..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-orange-500 bg-stone-50"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(cp => (
          <div
            key={cp.id}
            className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cp.industry}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  cp.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-slate-600'
                }`}>
                  {cp.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 mb-1">{cp.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">{cp.description}</p>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Compensation:</span>
                  <span className="font-bold text-slate-900">{cp.averageSalary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hiring Growth:</span>
                  <span className="font-bold text-emerald-600">{cp.demandGrowth}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {cp.requiredSkills.slice(0, 4).map((s, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => handleToggleStatus(cp)}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-800"
              >
                {cp.status === 'Published' ? 'Archive' : 'Publish'}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(cp)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-stone-100"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cp.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <form onSubmit={handleSave} className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 bg-[#0F1E36] text-white flex items-center justify-between">
              <h3 className="font-bold text-lg text-white">
                {editingCareer ? 'Edit Career Path' : 'Create New Career Path'}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Career Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. AI & Machine Learning Engineer"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Industry Sector *</label>
                <input
                  type="text"
                  required
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  placeholder="e.g. Artificial Intelligence & Deep Tech"
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
                  placeholder="Detailed breakdown of responsibilities..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={averageSalary}
                    onChange={e => setAverageSalary(e.target.value)}
                    placeholder="₹14 - ₹28 LPA"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Demand Growth</label>
                  <input
                    type="text"
                    value={demandGrowth}
                    onChange={e => setDemandGrowth(e.target.value)}
                    placeholder="+34% YoY"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={skillsString}
                  onChange={e => setSkillsString(e.target.value)}
                  placeholder="Python, PyTorch, Docker, System Design"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-md"
              >
                {editingCareer ? 'Save Changes' : 'Publish Career Path'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
