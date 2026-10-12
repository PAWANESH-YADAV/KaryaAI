import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  Settings,
  Bell,
  Lock,
  User,
  Shield,
  Save,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';

export const UserSettingsView: React.FC = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(currentUser?.name || '');
  const [email] = useState(currentUser?.email || '');

  // Notifications toggles
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);

  // Password reset
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Name cannot be empty.', 'warning');
      return;
    }
    updateCurrentUser({ name });
    showToast('Account details updated successfully!', 'success');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword.trim()) {
      showToast('Please enter your current password.', 'warning');
      return;
    }
    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters.', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }

    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password updated successfully!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Account Preferences</span>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Settings & Security
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your personal credentials, communication alerts, and authentication security.
        </p>
      </div>

      {/* Account Info Form */}
      <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-5">
        <h3 className="font-bold text-base text-slate-900 border-b border-stone-100 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-orange-600" />
          <span>Account Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Email Address (Primary)
            </label>
            <input
              type="email"
              disabled
              value={email}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm bg-stone-50 text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-colors"
          >
            Save Account Details
          </button>
        </div>
      </form>

      {/* Notifications Preferences */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 border-b border-stone-100 pb-3 flex items-center gap-2">
          <Bell className="w-4 h-4 text-orange-600" />
          <span>Notification & Alert Preferences</span>
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Recruiter Interview Invites</span>
              <span className="text-[11px] text-slate-500">Get instant alerts when hiring partners schedule an interview.</span>
            </div>
            <input
              type="checkbox"
              checked={interviewReminders}
              onChange={e => setInterviewReminders(e.target.checked)}
              className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">High-Match Job Recommendations</span>
              <span className="text-[11px] text-slate-500">Daily digests when openings match &gt;90% of your career vector.</span>
            </div>
            <input
              type="checkbox"
              checked={jobAlerts}
              onChange={e => setJobAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Course Milestone Updates</span>
              <span className="text-[11px] text-slate-500">Weekly progress summaries and certification reminders.</span>
            </div>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={e => setEmailNotifs(e.target.checked)}
              className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
            />
          </label>
        </div>
      </div>

      {/* Change Password */}
      <form onSubmit={handleUpdatePassword} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 border-b border-stone-100 pb-3 flex items-center gap-2">
          <Lock className="w-4 h-4 text-orange-600" />
          <span>Security & Password</span>
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Confirm New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showPassword ? 'Hide password' : 'Show password'}</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-full font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-colors"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};
