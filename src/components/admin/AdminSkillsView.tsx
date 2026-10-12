import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { SkillItem } from '../../types';
import { Plus, Search, Trash2, Edit2, X, AlertTriangle, Database } from 'lucide-react';

export const AdminSkillsView: React.FC = () => {
  const { showToast } = useToast();
  const [skills, setSkills] = useState<SkillItem[]>(storageService.getSkills());
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);

  // Form
  const [name, setName] = useState('');
  const [category, setCategory] = useState<SkillItem['category']>('AI & Data');
  const [level, setLevel] = useState<SkillItem['level']>('Intermediate');
  const [demandLevel, setDemandLevel] = useState<SkillItem['demandLevel']>('Critical');

  const [deleteConfirmSkill, setDeleteConfirmSkill] = useState<SkillItem | null>(null);

  const categories = ['All', 'Technical', 'AI & Data', 'Cloud & DevOps', 'Product & Business', 'Soft Skills'];

  const filtered = skills.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const openAdd = () => {
    setEditingSkill(null);
    setName('');
    setCategory('AI & Data');
    setLevel('Intermediate');
    setDemandLevel('Critical');
    setIsModalOpen(true);
  };

  const openEdit = (s: SkillItem) => {
    setEditingSkill(s);
    setName(s.name);
    setCategory(s.category);
    setLevel(s.level);
    setDemandLevel(s.demandLevel);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Skill name is required.', 'warning');
      return;
    }

    const obj: SkillItem = {
      id: editingSkill ? editingSkill.id : 'sk-' + Date.now().toString(36),
      name: name.trim(),
      category,
      level,
      demandLevel,
      mappedCareers: editingSkill?.mappedCareers || ['cp-01']
    };

    storageService.saveSkill(obj);
    setSkills(storageService.getSkills());
    setIsModalOpen(false);
    showToast(editingSkill ? 'Skill updated!' : 'New skill added to ontology!', 'success');
  };

  const handleDelete = () => {
    if (!deleteConfirmSkill) return;
    storageService.deleteSkill(deleteConfirmSkill.id);
    setSkills(storageService.getSkills());
    showToast(`Skill "${deleteConfirmSkill.name}" deleted.`, 'info');
    setDeleteConfirmSkill(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Skill Taxonomy</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Skills Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Define ontology, proficiency thresholds, and career mapping for AI matching algorithms.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search skills..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none bg-stone-50"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                categoryFilter === c ? 'bg-slate-900 text-white' : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 border-b border-stone-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Skill Name</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Proficiency Level</th>
              <th className="py-3.5 px-4">Industry Demand</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-stone-50/60">
                <td className="py-4 px-6 font-bold text-slate-900">{s.name}</td>
                <td className="py-4 px-4 text-slate-600">{s.category}</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-0.5 rounded-md font-semibold bg-stone-100 text-slate-700">
                    {s.level}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    s.demandLevel === 'Critical'
                      ? 'bg-rose-100 text-rose-800'
                      : s.demandLevel === 'Very High'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {s.demandLevel}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-slate-500 hover:bg-stone-100">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteConfirmSkill(s)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <form onSubmit={handleSave} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h3>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Skill Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. PyTorch, Kubernetes"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm bg-white"
              >
                <option value="Technical">Technical</option>
                <option value="AI & Data">AI & Data</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
                <option value="Product & Business">Product & Business</option>
                <option value="Soft Skills">Soft Skills</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Level</label>
                <select
                  value={level}
                  onChange={e => setLevel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm bg-white"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Demand</label>
                <select
                  value={demandLevel}
                  onChange={e => setDemandLevel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm bg-white"
                >
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-bold text-slate-600">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 rounded-full font-bold bg-orange-500 hover:bg-orange-600 text-white">
                Save Skill
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 text-center space-y-4">
            <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="font-bold text-base text-slate-900">Delete Skill "{deleteConfirmSkill.name}"?</h3>
            <div className="flex justify-center gap-3 pt-2">
              <button onClick={() => setDeleteConfirmSkill(null)} className="px-4 py-2 text-xs font-bold text-slate-600">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-5 py-2 text-xs font-bold bg-rose-600 text-white rounded-xl">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
