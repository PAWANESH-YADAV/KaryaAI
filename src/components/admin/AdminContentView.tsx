import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { Layers, Bell, Send, CheckCircle2, Megaphone } from 'lucide-react';

export const AdminContentView: React.FC = () => {
  const { showToast } = useToast();
  const [announcementText, setAnnouncementText] = useState('🎓 Winter Cohort 2025 Admissions Open: 500+ Partner Companies Hiring Now!');
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);

  // Broadcast
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Homepage announcement banner updated!', 'success');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) {
      showToast('Please provide both title and notification message.', 'warning');
      return;
    }

    storageService.addNotification({
      id: 'notif-' + Date.now().toString(36),
      title: broadcastTitle.trim(),
      message: broadcastMessage.trim(),
      timestamp: 'Just now',
      read: false,
      type: 'system'
    });

    setBroadcastTitle('');
    setBroadcastMessage('');
    showToast('Broadcast notification pushed to all active platform users!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">CMS & Communications</span>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Content & Notifications
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage announcements, informational banners, and platform-wide user alerts.
        </p>
      </div>

      {/* Homepage Banner */}
      <form onSubmit={handleSaveBanner} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-orange-600" />
          <span>Homepage Top Announcement Bar</span>
        </h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Banner Content</label>
          <input
            type="text"
            value={announcementText}
            onChange={e => setAnnouncementText(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={announcementEnabled}
              onChange={e => setAnnouncementEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
            />
            <span>Enable Announcement Banner Globally</span>
          </label>

          <button
            type="submit"
            className="px-6 py-2 rounded-full font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
          >
            Save Banner
          </button>
        </div>
      </form>

      {/* Push Broadcast Notification */}
      <form onSubmit={handleSendBroadcast} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-orange-600" />
          <span>Send Broadcast Notification to All Users</span>
        </h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Notification Title *</label>
          <input
            type="text"
            required
            value={broadcastTitle}
            onChange={e => setBroadcastTitle(e.target.value)}
            placeholder="e.g. New AI Job Openings at Swiggy"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message Body *</label>
          <textarea
            rows={3}
            required
            value={broadcastMessage}
            onChange={e => setBroadcastMessage(e.target.value)}
            placeholder="Describe the opportunity or update..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Broadcast Alert</span>
          </button>
        </div>
      </form>
    </div>
  );
};
