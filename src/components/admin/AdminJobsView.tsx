import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { JobListing } from '../../types';
import { Plus, Search, Edit2, Trash2, X, Briefcase, MapPin } from 'lucide-react';

export const AdminJobsView: React.FC = () => {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState<JobListing[]>(storageService.getJobs());
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('Bengaluru (Hybrid)');
  const [type, setType] = useState<JobListing['type']>('Full-time');
  const [experienceLevel, setExperienceLevel] = useState('0 - 2 Years');
  const [salaryRange, setSalaryRange] = useState('₹14 - ₹18 LPA');
  const [skillsString, setSkillsString] = useState('Python, FastAPI, SQL');
  const [description, setDescription] = useState('');

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingJob(null);
    setTitle('');
    setCompany('');
    setLocation('Bengaluru (Hybrid)');
    setType('Full-time');
    setExperienceLevel('0 - 2 Years');
    setSalaryRange('₹14 - ₹18 LPA');
    setSkillsString('Python, FastAPI, SQL');
    setDescription('');
    setIsModalOpen(true);
  };

  const openEdit = (j: JobListing) => {
    setEditingJob(j);
    setTitle(j.title);
    setCompany(j.company);
    setLocation(j.location);
    setType(j.type);
    setExperienceLevel(j.experienceLevel);
    setSalaryRange(j.salaryRange);
    setSkillsString(j.skills.join(', '));
    setDescription(j.description);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim() || !description.trim()) {
      showToast('Please fill all required fields.', 'warning');
      return;
    }

    const obj: JobListing = {
      id: editingJob ? editingJob.id : 'job-' + Date.now().toString(36),
      title: title.trim(),
      company: company.trim(),
      logo: editingJob?.logo || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=120',
      location: location.trim(),
      type,
      experienceLevel,
      salaryRange,
      skills: skillsString.split(',').map(s => s.trim()).filter(Boolean),
      description: description.trim(),
      postedDate: 'Just now',
      status: 'Active',
      applicantsCount: editingJob?.applicantsCount || 0
    };

    storageService.saveJob(obj);
    setJobs(storageService.getJobs());
    setIsModalOpen(false);
    showToast(editingJob ? 'Job updated!' : 'New job posted to partner board!', 'success');
  };

  const handleToggleStatus = (job: JobListing) => {
    const newStatus = job.status === 'Active' ? 'Closed' : 'Active';
    const updated = { ...job, status: newStatus as any };
    storageService.saveJob(updated);
    setJobs(storageService.getJobs());
    showToast(`Job status set to ${newStatus}.`, 'info');
  };

  const handleDelete = (id: string) => {
    storageService.deleteJob(id);
    setJobs(storageService.getJobs());
    showToast('Job listing removed.', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Hiring Pipelines</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Job Listings Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Post and curate job requisitions from partner companies for KaryaAI verified candidates.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job</span>
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
            placeholder="Search job listings by title or enterprise..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none bg-stone-50"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(j => (
          <div
            key={j.id}
            className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">{j.company}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  j.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-slate-600'
                }`}>
                  {j.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 mb-1">{j.title}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                <MapPin className="w-3.5 h-3.5" />
                {j.location} • {j.type}
              </p>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Comp:</span>
                  <span className="font-bold text-slate-900">{j.salaryRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicants:</span>
                  <span className="font-bold text-orange-600">{j.applicantsCount} Candidates</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => handleToggleStatus(j)}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-800"
              >
                {j.status === 'Active' ? 'Close Opening' : 'Activate'}
              </button>

              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(j)} className="p-1.5 rounded-lg text-slate-500 hover:bg-stone-100">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(j.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <form onSubmit={handleSave} className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900">
              {editingJob ? 'Edit Job' : 'Post Partner Job'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Associate AI Engineer"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Company *</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g. Razorpay, Swiggy"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Bengaluru / Remote"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Salary Range</label>
                <input
                  type="text"
                  value={salaryRange}
                  onChange={e => setSalaryRange(e.target.value)}
                  placeholder="₹14 - ₹18 LPA"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Skills (Comma separated)</label>
              <input
                type="text"
                value={skillsString}
                onChange={e => setSkillsString(e.target.value)}
                placeholder="Python, React, SQL"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Role Description *</label>
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
                Save Job
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
