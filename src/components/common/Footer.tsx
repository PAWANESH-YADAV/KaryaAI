import React from 'react';
import { Logo } from './Logo';
import { Linkedin, Instagram, Twitter, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  const scrollTo = (id: string) => {
    onNavigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#070D1E] text-slate-300 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-800/80">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo variant="light" size="md" />
            <p className="mt-3 text-xs text-slate-400 max-w-sm">
              Empowering students, professionals, and colleges with personalized AI career intelligence, curated skill roadmaps, and direct recruiter pathways.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-300">
            <button onClick={() => scrollTo('hero')} className="hover:text-orange-400 transition-colors">
              Home
            </button>
            <button onClick={() => scrollTo('about')} className="hover:text-orange-400 transition-colors">
              About Us
            </button>
            <button onClick={() => scrollTo('features')} className="hover:text-orange-400 transition-colors">
              Features
            </button>
            <button onClick={() => scrollTo('how-it-works')} className="hover:text-orange-400 transition-colors">
              For Users
            </button>
            <button onClick={() => scrollTo('market')} className="hover:text-orange-400 transition-colors">
              Market
            </button>
            <button onClick={onOpenContact} className="hover:text-orange-400 transition-colors">
              Contact
            </button>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-slate-900/90 hover:bg-orange-500 hover:text-white flex items-center justify-center text-slate-300 transition-all border border-slate-800"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-slate-900/90 hover:bg-orange-500 hover:text-white flex items-center justify-center text-slate-300 transition-all border border-slate-800"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-slate-900/90 hover:bg-orange-500 hover:text-white flex items-center justify-center text-slate-300 transition-all border border-slate-800"
              aria-label="Twitter X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-slate-900/90 hover:bg-orange-500 hover:text-white flex items-center justify-center text-slate-300 transition-all border border-slate-800"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2025 KaryaAI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenContact} className="hover:text-orange-400 transition-colors">
              Privacy Policy
            </button>
            <span className="text-slate-700">|</span>
            <button onClick={onOpenContact} className="hover:text-orange-400 transition-colors">
              Terms of Service
            </button>
            <span className="text-slate-700">|</span>
            <span className="text-orange-400 font-medium">Your Career. Our AI.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
