import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { JobListing, JobApplication } from '../../types';
import { DashboardTab } from './DashboardLayout';
import {
  Briefcase,
  Search,
  Filter,
  Bookmark,
  MapPin,
  Building,
  CheckCircle2,
  ArrowRight,
  Send,
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface JobOpportunitiesViewProps {
  onSelectTab: (tab: DashboardTab) => void;
  showOnlySaved?: boolean;
}

export const JobOpportunitiesView: React.FC<JobOpportunitiesViewProps> = ({ onSelectTab, showOnlySaved = false }) => {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState<JobListing[]>(storageService.getJobs());
  const [savedJobIds, setSavedJobIds] = useState<string[]>(storageService.getSavedJobIds());
  const [applications, setApplications] = useState<JobApplication[]>(storageService.getApplications());

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [activeJobModal, setActiveJobModal] = useState<JobListing | null>(null);
  const [applying, setApplying] = useState(false);

  const appliedJobIds = applications.map(a => a.jobId);

  const handleToggleSave = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isSaved = storageService.toggleSaveJob(jobId);
    setSavedJobIds(storageService.getSavedJobIds());
    showToast(isSaved ? 'Job bookmarked to Saved Jobs.' : 'Job removed from Saved Jobs.', 'info');
  };

  const handleApply = (job: JobListing) => {
    if (appliedJobIds.includes(job.id)) {
      showToast('You have already applied for this opening.', 'info');
      return;
    }

    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      const newApp: JobApplication = {
        id: 'app-' + Date.now().toString(36),
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        location: job.location,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'Applied',
        feedbackNotes: 'Application submitted with verified KaryaAI profile score (82%). Direct recruiter delivery confirmed.'
      };
      storageService.addApplication(newApp);
      setApplications(storageService.getApplications());
      setActiveJobModal(null);
      showToast(`Application successfully submitted to ${job.company}!`, 'success');
    }, 800);
  };

  const filteredJobs = jobs.filter(job => {
    if (showOnlySaved && !savedJobIds.includes(job.id)) return false;

    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));

    const matchesType = typeFilter === 'All' || job.type === typeFilter;
    const matchesLoc = locationFilter === 'All' || job.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesType && matchesLoc;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
            {showOnlySaved ? 'Bookmarks' : 'Career Openings'}
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            {showOnlySaved ? 'Saved Job Opportunities' : 'Partner Job Opportunities'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Directly connect with 500+ verified partner enterprises prioritizing KaryaAI credentialed talent.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectTab('applications')}
            className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Track Applications ({applications.length})
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by job title, company name, or skill..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-orange-500 bg-stone-50"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white text-slate-700 focus:outline-none"
          >
            <option value="All">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Internship">Internship</option>
          </select>

          <select
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white text-slate-700 focus:outline-none"
          >
            <option value="All">All Locations</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </div>

      {/* Job Listings Grid */}
      {filteredJobs.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No jobs match your current filters</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the search terms or location criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map(job => {
            const isSaved = savedJobIds.includes(job.id);
            const isApplied = appliedJobIds.includes(job.id);

            return (
              <div
                key={job.id}
                onClick={() => setActiveJobModal(job)}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-11 h-11 rounded-xl object-cover border border-stone-200"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
                          {job.title}
                        </h4>
                        <span className="text-xs text-slate-500">{job.company}</span>
                      </div>
                    </div>
                    <button
                      onClick={e => handleToggleSave(job.id, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-orange-500 transition-colors"
                      title={isSaved ? 'Remove bookmark' : 'Bookmark job'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-orange-500 text-orange-500' : ''}`} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="space-y-1.5 p-3 rounded-2xl bg-stone-50 border border-stone-100 mb-4 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.location}
                      </span>
                      <span className="font-bold text-slate-900">{job.salaryRange}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Experience: {job.experienceLevel}</span>
                      <span className="text-orange-600 font-semibold">{job.type}</span>
                    </div>
                  </div>

                  {/* Skills Required */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.skills.map((sk, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-slate-700">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{job.postedDate}</span>

                  {isApplied ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Applied</span>
                    </span>
                  ) : (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleApply(job);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-xs transition-colors"
                    >
                      <span>1-Click Apply</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Job Details Modal */}
      {activeJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 bg-[#0F1E36] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeJobModal.logo}
                  alt={activeJobModal.company}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {activeJobModal.title}
                  </h3>
                  <span className="text-xs text-orange-400">{activeJobModal.company} • {activeJobModal.location}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveJobModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Compensation</span>
                  <span className="text-sm font-extrabold text-slate-900">{activeJobModal.salaryRange}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Experience Level</span>
                  <span className="text-sm font-extrabold text-slate-900">{activeJobModal.experienceLevel}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Work Mode</span>
                  <span className="text-sm font-extrabold text-orange-600">{activeJobModal.type}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Job Description</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeJobModal.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {activeJobModal.skills.map((s, i) => (
                    <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 leading-relaxed">
                  <strong>KaryaAI Priority Delivery:</strong> Applying through KaryaAI forwards your verified profile completion (85%) and readiness score (82%) directly to the recruiting manager.
                </div>
              </div>
            </div>

            <div className="p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => setActiveJobModal(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>

              {appliedJobIds.includes(activeJobModal.id) ? (
                <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Already Applied</span>
                </span>
              ) : (
                <button
                  onClick={() => handleApply(activeJobModal)}
                  disabled={applying}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600 disabled:opacity-50"
                >
                  {applying ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Apply with KaryaAI Profile</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
