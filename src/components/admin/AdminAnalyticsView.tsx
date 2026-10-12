import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { BarChart3, Download, Calendar, TrendingUp, Users, Award, Briefcase, FileSpreadsheet } from 'lucide-react';

export const AdminAnalyticsView: React.FC = () => {
  const { showToast } = useToast();
  const [timeRange, setTimeRange] = useState('30d');

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Metric,Value,GrowthRate,Period\n" +
      "Registered Users,14820,+18.4%,Last 30 Days\n" +
      "Active Learners,9430,+12.1%,Last 30 Days\n" +
      "Course Enrollments,8940,+22.0%,Last 30 Days\n" +
      "Mock Interviews Cleared,6210,+15.8%,Last 30 Days\n" +
      "Job Applications Dispatched,4830,+29.4%,Last 30 Days\n" +
      "Verified Hires,1240,+34.2%,Last 30 Days\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `karyaai_analytics_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Analytics summary exported as CSV file!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Telemetry & Intelligence</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Analytics & Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Aggregate student engagement metrics, course completions, and recruiter conversion funnels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-stone-100 rounded-full p-1 text-xs font-semibold">
            {['7d', '30d', '90d', '1y'].map(r => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  timeRange === r ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-orange-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-5">
        <h3 className="font-bold text-base text-slate-900">Career Acceleration Funnel</h3>

        <div className="space-y-3">
          {[
            { label: 'Registered Learners', count: '14,820', rate: '100%', color: 'bg-slate-900' },
            { label: 'AI Profile & Diagnostic Scans', count: '12,410', rate: '83.7%', color: 'bg-blue-600' },
            { label: 'Active Upskilling Course Enrollments', count: '8,940', rate: '60.3%', color: 'bg-purple-600' },
            { label: 'AI Mock Interviews Completed', count: '6,210', rate: '41.9%', color: 'bg-amber-500' },
            { label: 'Direct Partner Job Applications', count: '4,830', rate: '32.5%', color: 'bg-orange-500' },
            { label: 'Verified Placements & Offers', count: '1,240', rate: '8.3%', color: 'bg-emerald-500' },
          ].map((stage, i) => (
            <div key={i} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{stage.label}</span>
                <span className="font-mono font-bold text-slate-700">{stage.count} ({stage.rate})</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                <div className={`${stage.color} h-2.5 rounded-full transition-all`} style={{ width: stage.rate }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recruiter Placement Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Top Hiring Partner</span>
          <div className="text-2xl font-extrabold text-slate-900">Razorpay</div>
          <p className="text-xs text-slate-500">142 candidates hired across AI & backend tracks this quarter.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Median Starting CTC</span>
          <div className="text-2xl font-extrabold text-emerald-600">₹16.4 LPA</div>
          <p className="text-xs text-slate-500">+42% premium compared to non-certified campus averages.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interview Clear Rate</span>
          <div className="text-2xl font-extrabold text-orange-600">76.8%</div>
          <p className="text-xs text-slate-500">For students completing 3+ AI mock interview simulations.</p>
        </div>
      </div>
    </div>
  );
};
