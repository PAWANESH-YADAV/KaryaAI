import React, { useState } from 'react';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';
import { User as UserIcon, LogOut, LayoutDashboard, ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (route: string) => void;
  onOpenContact: () => void;
  currentRoute: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenContact, currentRoute }) => {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentRoute !== '/') {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            onClick={() => onNavigate('/')}
            className="cursor-pointer transition-transform hover:scale-[1.01]"
          >
            <Logo variant="dark" size="md" />
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-8 text-sm font-medium text-slate-700">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              For Users
            </button>
            <button
              onClick={() => scrollToSection('market')}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Market
            </button>
            <button
              onClick={onOpenContact}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Button (Orange Pill "Get Started" or User Session) */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-2.5">
                {isAdmin ? (
                  <button
                    onClick={() => onNavigate('/admin')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#0A1128] text-white hover:bg-[#16214A] shadow-sm transition-all"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                    <span>Admin Panel</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('/dashboard')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#0A1128] text-white hover:bg-[#16214A] shadow-sm transition-all"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-orange-400" />
                    <span>My Dashboard</span>
                  </button>
                )}

                <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500/40"
                  />
                  <button
                    onClick={logout}
                    title="Log Out"
                    className="p-1.5 rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('/auth')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all transform active:scale-95"
              >
                <UserIcon className="w-4 h-4" />
                <span>Get Started</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-orange-50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-stone-200 px-5 pt-3 pb-6 space-y-3 animate-in fade-in">
          <div className="flex flex-col space-y-2 text-base font-medium text-slate-800">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left py-2 px-3 rounded-lg hover:bg-orange-50"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 px-3 rounded-lg hover:bg-orange-50"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left py-2 px-3 rounded-lg hover:bg-orange-50"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-2 px-3 rounded-lg hover:bg-orange-50"
            >
              For Users
            </button>
            <button
              onClick={() => scrollToSection('market')}
              className="text-left py-2 px-3 rounded-lg hover:bg-orange-50"
            >
              Market
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-orange-50"
            >
              Contact
            </button>
          </div>

          <div className="pt-3 border-t border-stone-200">
            {isAuthenticated && currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(isAdmin ? '/admin' : '/dashboard');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0A1128] text-white font-medium text-sm"
                >
                  <LayoutDashboard className="w-4 h-4 text-orange-400" />
                  <span>Go to {isAdmin ? 'Admin Console' : 'My Dashboard'}</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-2 text-center text-sm text-rose-600 font-medium"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/auth');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 text-white font-semibold text-sm shadow-md"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
