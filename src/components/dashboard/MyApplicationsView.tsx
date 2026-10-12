import React from 'react';
import { storageService } from '../../services/storageService';
import { ApplicationStatus } from '../../types';
import { DashboardTab } from './DashboardLayout';
import {
  FileCheck2,
  Building,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowRight
} from 'lucide-react';

interface MyApplicationsViewProps {
  onSelectTab: (tab: DashboardTab) => void;
}

export const MyApplicationsView: React.FC<MyApplicationsViewProps> = ({ onSelectTab }) => {
  const applications = storageService.getApplications();

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Selected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Selected / Offer
          </span>
        );
      case 'Interview':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" />
            Interview Round
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <AlertCircle className="w-3.5 h-3.5" />
            Under Review
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            <XCircle className="w-3.5 h-3.5" />
            Not Selected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
            Applied
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Candidate Pipeline</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            My Job Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track real-time candidate status updates, interview schedules, and recruiter feedback notes.
          </p>
        </div>

        <button
          onClick={() => onSelectTab('jobs')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600 transition-all shrink-0"
        >
          <span>Find More Jobs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map(app => (
          <div
            key={app.id}
            className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">{app.jobTitle}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    {app.company}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {app.location}
                  </span>
                  <span>•</span>
                  <span>Applied on {app.appliedDate}</span>
                </div>
              </div>

              <div>{getStatusBadge(app.status)}</div>
            </div>

            {/* Application Pipeline Stepper */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Recruitment Milestone Progression
              </span>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {['Applied', 'Under Review', 'Interview', 'Decision'].map((stage, i) => {
                  const isActive =
                    (i === 0 && app.status !== 'Rejected') ||
                    (i === 1 && (app.status === 'Under Review' || app.status === 'Interview' || app.status === 'Selected')) ||
                    (i === 2 && (app.status === 'Interview' || app.status === 'Selected')) ||
                    (i === 3 && app.status === 'Selected');

                  return (
                    <div key={i} className="space-y-1.5">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                            : 'bg-stone-200'
                        }`}
                      />
                      <span className={`text-[11px] block font-semibold ${
                        isActive ? 'text-slate-900' : 'text-slate-400'
                      }`}>
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recruiter feedback notes */}
            {app.feedbackNotes && (
              <div className="p-3.5 rounded-xl bg-orange-50/50 border border-orange-200/60 text-xs text-slate-700">
                <span className="font-bold text-orange-800 block mb-0.5">Hiring Team Notes:</span>
                <p>{app.feedbackNotes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
