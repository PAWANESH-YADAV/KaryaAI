import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark', size = 'md' }) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* KaryaAI stylized emblem: Graduation cap with orange growth arrow */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} rounded-xl bg-gradient-to-br from-[#0A1128] via-[#121B3B] to-[#1C284E] border border-orange-500/30 shadow-sm flex-shrink-0`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6 text-white"
        >
          {/* Mortarboard cap top */}
          <path
            d="M16 4L3 11L16 18L29 11L16 4Z"
            fill="currentColor"
            className="opacity-95"
          />
          {/* Cap base */}
          <path
            d="M7 13.5V20.5C7 24 11 26.5 16 26.5C21 26.5 25 24 25 20.5V13.5L16 18.5L7 13.5Z"
            fill="currentColor"
            className="opacity-60"
          />
          {/* Dynamic orange AI trajectory swoosh */}
          <path
            d="M5 25C9 20 18 19 27 15"
            stroke="#F97316"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M23 14L28 15L25 19"
            stroke="#F97316"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-[#0A1128] animate-pulse" />
      </div>

      <div className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-tight ${textSizes[size]} ${isLight ? 'text-white' : 'text-[#0A1128]'}`}>
          Karya<span className="text-orange-500">AI</span>
        </span>
        <span className={`font-medium tracking-wide mt-0.5 ${subSizes[size]} ${isLight ? 'text-amber-200/80' : 'text-slate-500'}`}>
          Your Career. Our AI.
        </span>
      </div>
    </div>
  );
};
