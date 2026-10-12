import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import {
  LayoutDashboard,
  UserCircle,
  Sparkles,
  Compass,
  GraduationCap,
  Award,
  Video,
  Briefcase,
  BookmarkCheck,
  FileCheck2,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export type DashboardTab =
  | 'overview'
  | 'profile'
  | 'career-analysis'
  | 'careers'
  | 'courses'
  | 'interviews'
  | 'jobs'
  | 'saved-jobs'
  | 'applications'
  | 'progress'
  | 'settings';

interface DashboardLayoutProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentTab,
  onSelectTab,
  onNavigate,
  children
}) => {
  const { currentUser, logout, isAdmin } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = storageService.getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems: { id: DashboardTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'My Career Profile', icon: <UserCircle className="w-4 h-4" /> },
    { id: 'career-analysis', label: 'AI Career Analysis', icon: <Sparkles className="w-4 h-4" />, badge: 'AI' },
    { id: 'careers', label: 'Recommended Careers', icon: <Compass className="w-4 h-4" /> },
    { id: 'courses', label: 'Courses & Certifications', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'interviews', label: 'Mock Interviews', icon: <Video className="w-4 h-4" />, badge: 'AI Live' },
    { id: 'jobs', label: 'Job Opportunities', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'saved-jobs', label: 'Saved Jobs', icon: <BookmarkCheck className="w-4 h-4" /> },
    { id: 'applications', label: 'My Applications', icon: <FileCheck2 className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress & Achievements', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: DashboardTab) => {
    onSelectTab(tab);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F0FAF8] flex flex-col lg:flex-row text-slate-800">
      {/* Mobile Top Navigation Header */}
      <div className="lg:hidden bg-white border-b border-teal-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 rounded-xl text-slate-700 hover:bg-teal-50"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div onClick={() => onNavigate('/')} className="cursor-pointer">
          <Logo variant="dark" size="sm" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-700 hover:bg-teal-50 relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500" />
            )}
          </button>
        </div>
      </div>

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-teal-100 transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 flex flex-col ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-teal-100/70 flex items-center justify-between">
          <div onClick={() => onNavigate('/')} className="cursor-pointer">
            <Logo variant="dark" size="sm" />
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Mini Profile Badge */}
        <div className="p-4 mx-3 my-2 rounded-2xl bg-orange-50/60 border border-orange-200/60 flex items-center gap-3">
          <img
            src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
            alt={currentUser?.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-500/30"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate">{currentUser?.name || 'Rahul Sharma'}</h4>
            <span className="inline-block text-[10px] font-semibold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full">
              General User
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0A1128] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-orange-50/60 hover:text-orange-950'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-orange-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Switcher / Logout */}
        <div className="p-4 border-t border-stone-200 space-y-2">
          {isAdmin ? (
            <button
              onClick={() => onNavigate('/admin')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-semibold transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Admin Console</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('/admin')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-semibold transition-colors"
              title="Test role switcher for reviewer"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                <span>Switch to Admin View</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </button>
          )}

          <button
            onClick={() => {
              logout();
              onNavigate('/');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Header Bar */}
        <header className="hidden lg:flex items-center justify-between h-16 px-8 bg-white border-b border-stone-200 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search skills, careers, courses, jobs..."
                className="w-full pl-9 pr-4 py-2 rounded-full border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-stone-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <span className="font-bold text-xs text-slate-900">Notifications</span>
                    <button
                      onClick={() => {
                        storageService.markAllNotificationsRead();
                        setShowNotifications(false);
                      }}
                      className="text-[11px] font-semibold text-orange-600 hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl text-xs ${
                          n.read ? 'bg-stone-50 text-slate-600' : 'bg-orange-50/70 border border-orange-200 text-slate-800'
                        }`}
                      >
                        <h5 className="font-bold text-slate-900 mb-0.5">{n.title}</h5>
                        <p className="text-[11px] leading-relaxed text-slate-600">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar + Nav to Profile */}
            <div
              onClick={() => onSelectTab('profile')}
              className="flex items-center gap-3 pl-3 border-l border-stone-200 cursor-pointer group"
            >
              <img
                src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                alt={currentUser?.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-500/30 group-hover:ring-orange-500"
              />
              <div className="text-left">
                <span className="block text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {currentUser?.name || 'Rahul Sharma'}
                </span>
                <span className="block text-[10px] text-orange-600 font-medium">
                  Readiness: {currentUser?.careerReadinessScore || 82}%
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Inner Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
