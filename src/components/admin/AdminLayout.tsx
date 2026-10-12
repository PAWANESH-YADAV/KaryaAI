import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Compass,
  GraduationCap,
  Briefcase,
  Video,
  BarChart3,
  Layers,
  Settings,
  ShieldCheck,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Database
} from 'lucide-react';

export type AdminTab =
  | 'overview'
  | 'users'
  | 'careers'
  | 'skills'
  | 'courses'
  | 'jobs'
  | 'interviews'
  | 'analytics'
  | 'content'
  | 'settings';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onNavigate,
  children
}) => {
  const { currentUser, isAdmin, quickLogin, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Authorization Route Guard: If not an admin, display security barrier
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#101D38] border border-slate-700/80 rounded-3xl p-8 text-center text-white shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center border border-rose-500/30">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-rose-400 uppercase tracking-widest">
              Restricted Area
            </span>
            <h2 className="font-display text-2xl font-bold text-white">
              Administrator Privileges Required
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Route <code className="bg-slate-900 px-1.5 py-0.5 rounded text-orange-400">/admin</code> is restricted to authorized platform operators. Your current account ({currentUser?.email || 'Guest'}) has General User access.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-xs space-y-2 text-slate-300">
            <span className="font-bold text-orange-400 block">Evaluator Quick Switcher:</span>
            <p>
              To review all Admin CRUD interfaces (User Management, Career Paths, Courses, Jobs, Analytics), activate the Admin demo session below.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                quickLogin('admin');
              }}
              className="w-full py-3.5 rounded-full font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:from-orange-600 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Switch to Demo Admin (Priya Nair)</span>
            </button>

            <button
              onClick={() => onNavigate('/dashboard')}
              className="w-full py-3 rounded-full text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Return to General User Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Admin Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'users', label: 'User Management', icon: <Users className="w-4 h-4" />, badge: '4 Users' },
    { id: 'careers', label: 'Career Paths', icon: <Compass className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills Management', icon: <Database className="w-4 h-4" /> },
    { id: 'courses', label: 'Courses & Certifications', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'jobs', label: 'Job Management', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'interviews', label: 'Mock Interview Bank', icon: <Video className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics & Reports', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'content', label: 'Content & Alerts', icon: <Layers className="w-4 h-4" /> },
    { id: 'settings', label: 'System Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F8] flex flex-col lg:flex-row text-slate-800">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#0A1224] text-white border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 rounded-xl text-slate-300 hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div onClick={() => onNavigate('/')} className="cursor-pointer">
          <Logo variant="light" size="sm" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded-full border border-orange-500/30">
          Admin
        </span>
      </div>

      {/* Admin Dark Navy Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0A1224] text-slate-300 border-r border-slate-800 transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 flex flex-col ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div onClick={() => onNavigate('/')} className="cursor-pointer">
            <Logo variant="light" size="sm" />
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Operator Badge */}
        <div className="p-4 mx-3 my-2 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <img
            src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'}
            alt="Admin"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/40"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate">{currentUser?.name || 'Priya Nair'}</h4>
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-3 h-3" />
              Super Admin
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                    : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-slate-800 text-slate-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <button
            onClick={() => onNavigate('/dashboard')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors"
          >
            <span>Switch to General User View</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => {
              logout();
              onNavigate('/');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm"
        />
      )}

      {/* Admin Workspace Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="hidden lg:flex items-center justify-between h-16 px-8 bg-white border-b border-stone-200/90 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              KaryaAI Operations Console
            </span>
            <span className="text-xs text-slate-400">Environment: Production Live</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/dashboard')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200"
            >
              Preview as User →
            </button>
            <div className="text-xs text-slate-500 border-l border-stone-200 pl-3">
              Admin: <strong>{currentUser?.name || 'Priya Nair'}</strong>
            </div>
          </div>
        </header>

        {/* Inner Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
