import React from 'react';
import { Target, GraduationCap, Monitor, Award, Users, Compass } from 'lucide-react';

interface FeaturesGridProps {
  onSelectFeature?: (feature: string) => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onSelectFeature }) => {
  const features = [
    {
      id: 'guidance',
      icon: <Target className="w-6 h-6 text-orange-600" />,
      title: 'Personalized Guidance',
      desc: 'AI-driven career path recommendations',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'skills',
      icon: <GraduationCap className="w-6 h-6 text-blue-700" />,
      title: 'Skill Recommendations',
      desc: 'Learn in-demand skills for your goals',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'interviews',
      icon: <Monitor className="w-6 h-6 text-indigo-600" />,
      title: 'Mock Interviews',
      desc: 'Practice with AI and get feedback',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'certifications',
      icon: <Award className="w-6 h-6 text-amber-600" />,
      title: 'Certifications',
      desc: 'Get certified and boost your profile',
      bgColor: 'bg-amber-50'
    },
    {
      id: 'recruiters',
      icon: <Users className="w-6 h-6 text-sky-600" />,
      title: 'Recruiter Connections',
      desc: 'Direct access to job opportunities',
      bgColor: 'bg-sky-50'
    },
    {
      id: 'support',
      icon: <Compass className="w-6 h-6 text-orange-600" />,
      title: 'End-to-End Support',
      desc: 'From confusion to career success',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {features.map(f => (
            <div
              key={f.id}
              onClick={() => onSelectFeature?.(f.id)}
              className="group bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs hover:shadow-md hover:border-orange-400 transition-all duration-200 flex flex-col items-center text-center cursor-pointer transform hover:-translate-y-1"
            >
              <div className={`w-13 h-13 rounded-2xl ${f.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs`}>
                {f.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-800 leading-snug mb-1 group-hover:text-orange-600 transition-colors">
                {f.title}
              </h3>
              <p className="text-[12px] text-slate-500 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
