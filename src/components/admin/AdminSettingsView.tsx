import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { Settings, Save, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminSettingsView: React.FC = () => {
  const { showToast } = useToast();
  const initial = storageService.getSystemSettings();

  const [platformName, setPlatformName] = useState(initial.platformName);
  const [supportEmail, setSupportEmail] = useState(initial.supportEmail);
  const [allowRegistration, setAllowRegistration] = useState(initial.allowRegistration);
  const [maintenanceMode, setMaintenanceMode] = useState(initial.maintenanceMode);
  const [aiEngine, setAiEngine] = useState(initial.aiEngine);

  const [confirmModal, setConfirmModal] = useState(false);

  const handleOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmModal(true);
  };

  const handleConfirmSave = () => {
    storageService.saveSystemSettings({
      platformName,
      supportEmail,
      allowRegistration,
      maintenanceMode,
      aiEngine
    });
    setConfirmModal(false);
    showToast('Platform system settings successfully updated!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">System Configuration</span>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Global branding, security rules, and AI diagnostic runtime configuration.
        </p>
      </div>

      <form onSubmit={handleOpenConfirm} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-5">
        <h3 className="font-bold text-base text-slate-900 border-b border-stone-100 pb-3 flex items-center gap-2">
          <Settings className="w-4 h-4 text-orange-600" />
          <span>Core Parameters</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Platform Name
            </label>
            <input
              type="text"
              required
              value={platformName}
              onChange={e => setPlatformName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Support Desk Email
            </label>
            <input
              type="email"
              required
              value={supportEmail}
              onChange={e => setSupportEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
            Active AI Intelligence Engine
          </label>
          <input
            type="text"
            value={aiEngine}
            onChange={e => setAiEngine(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none bg-stone-50"
          />
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Allow Public Learner Registration</span>
              <span className="text-[11px] text-slate-500">Enable new students and professionals to self-register.</span>
            </div>
            <input
              type="checkbox"
              checked={allowRegistration}
              onChange={e => setAllowRegistration(e.target.checked)}
              className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Maintenance Lockdown Mode</span>
              <span className="text-[11px] text-slate-500">Restrict access to administrators only during system updates.</span>
            </div>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={e => setMaintenanceMode(e.target.checked)}
              className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
            />
          </label>
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all"
          >
            <Save className="w-4 h-4 text-orange-400" />
            <span>Save System Changes</span>
          </button>
        </div>
      </form>

      {/* Confirmation Dialog */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Confirm System Updates</h3>
            <p className="text-xs text-slate-600">
              Applying these changes will update platform configuration globally for all users. Do you wish to continue?
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSave}
                className="px-5 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl"
              >
                Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
