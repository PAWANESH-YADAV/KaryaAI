import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  Save,
  Plus,
  X,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Target,
  Sparkles,
  MapPin,
  Building
} from 'lucide-react';

export const CareerProfileView: React.FC = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(currentUser?.name || '');
  const [headline, setHeadline] = useState(currentUser?.headline || '');
  const [education, setEducation] = useState(currentUser?.education || '');
  const [qualification, setQualification] = useState(currentUser?.qualification || 'Bachelor of Technology');
  const [experience, setExperience] = useState(currentUser?.experience || '');
  const [careerGoals, setCareerGoals] = useState(currentUser?.careerGoals || '');

  // Tag arrays
  const [skills, setSkills] = useState<string[]>(currentUser?.skills || ['Python', 'JavaScript', 'React.js', 'SQL']);
  const [newSkill, setNewSkill] = useState('');

  const [interests, setInterests] = useState<string[]>(currentUser?.interests || ['Artificial Intelligence', 'Full Stack Development']);
  const [newInterest, setNewInterest] = useState('');

  const [preferredIndustries, setPreferredIndustries] = useState<string[]>(
    currentUser?.preferredIndustries || ['Information Technology', 'Fintech', 'Artificial Intelligence']
  );
  const [newIndustry, setNewIndustry] = useState('');

  const [preferredLocations, setPreferredLocations] = useState<string[]>(
    currentUser?.preferredLocations || ['Bengaluru', 'Hyderabad', 'Pune', 'Remote']
  );
  const [newLocation, setNewLocation] = useState('');

  const [saving, setSaving] = useState(false);

  // Dynamic profile completion calculation
  const calculateCompletion = () => {
    let score = 0;
    if (name.trim()) score += 10;
    if (headline.trim()) score += 10;
    if (education.trim()) score += 15;
    if (experience.trim()) score += 15;
    if (careerGoals.trim()) score += 15;
    if (skills.length >= 3) score += 15;
    if (interests.length >= 2) score += 10;
    if (preferredLocations.length >= 1) score += 10;
    return Math.min(100, score);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (item: string) => {
    setSkills(skills.filter(s => s !== item));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (item: string) => {
    setInterests(interests.filter(i => i !== item));
  };

  const handleAddIndustry = () => {
    if (newIndustry.trim() && !preferredIndustries.includes(newIndustry.trim())) {
      setPreferredIndustries([...preferredIndustries, newIndustry.trim()]);
      setNewIndustry('');
    }
  };

  const handleRemoveIndustry = (item: string) => {
    setPreferredIndustries(preferredIndustries.filter(i => i !== item));
  };

  const handleAddLocation = () => {
    if (newLocation.trim() && !preferredLocations.includes(newLocation.trim())) {
      setPreferredLocations([...preferredLocations, newLocation.trim()]);
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (item: string) => {
    setPreferredLocations(preferredLocations.filter(l => l !== item));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const completion = calculateCompletion();
    const readiness = Math.min(98, Math.max(50, Math.floor(completion * 0.95) + (skills.length > 5 ? 5 : 0)));

    setTimeout(() => {
      updateCurrentUser({
        name,
        headline,
        education,
        qualification,
        experience,
        careerGoals,
        skills,
        interests,
        preferredIndustries,
        preferredLocations,
        profileCompletion: completion,
        careerReadinessScore: readiness
      });
      setSaving(false);
      showToast('Career profile successfully saved and AI score refreshed!', 'success');
    }, 600);
  };

  const currentCompletion = calculateCompletion();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header & Completion Meter */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Profile Management</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            My Career Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep your credentials up to date. The KaryaAI engine uses this data to calibrate personalized matches.
          </p>
        </div>

        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 min-w-[220px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">Profile Completion</span>
            <span className="text-xs font-extrabold text-orange-600">{currentCompletion}%</span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${currentCompletion}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Higher completion unlocks top tier job matches</span>
          </p>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic & Headline */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-5">
          <h3 className="font-bold text-base text-slate-900 border-b border-stone-100 pb-3">
            1. Personal & Professional Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Highest Qualification
              </label>
              <select
                value={qualification}
                onChange={e => setQualification(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm bg-white"
              >
                <option value="Bachelor of Technology">Bachelor of Technology (B.Tech / B.E)</option>
                <option value="Bachelor of Science">Bachelor of Science (B.Sc)</option>
                <option value="Bachelor of Computer Applications">BCA (Computer Applications)</option>
                <option value="Master of Technology">Master of Technology (M.Tech)</option>
                <option value="Master of Science">Master of Science (M.Sc / MCA)</option>
                <option value="Master of Business Administration">MBA</option>
                <option value="Other Degree">Diploma / Other Certification</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Professional Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={e => setHeadline(e.target.value)}
              placeholder="e.g. Aspiring AI & Full Stack Developer | Final Year CS Student"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Education & Institution Details
            </label>
            <textarea
              rows={2}
              value={education}
              onChange={e => setEducation(e.target.value)}
              placeholder="e.g. B.Tech in Computer Science & Engineering, SRM Institute (CGPA: 8.6, Class of 2025)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Work / Internship Experience
            </label>
            <textarea
              rows={2}
              value={experience}
              onChange={e => setExperience(e.target.value)}
              placeholder="e.g. 4-month Software Intern at TechNova Labs building REST APIs and React frontend."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
            />
          </div>
        </div>

        {/* Existing Skills & Interests */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-5">
          <h3 className="font-bold text-base text-slate-900 border-b border-stone-100 pb-3">
            2. Skills, Goals & Interests
          </h3>

          {/* Skills Tag Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Existing Skills ({skills.length})
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100/80 text-orange-800 border border-orange-200"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Type a skill and press Enter (e.g. Docker, TypeScript)"
                className="flex-1 px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-orange-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-bold"
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Career Goals */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Primary Career Goal & Vision
            </label>
            <textarea
              rows={2}
              value={careerGoals}
              onChange={e => setCareerGoals(e.target.value)}
              placeholder="e.g. Become a High-Impact AI Software Engineer at a premier technology enterprise or high-growth startup."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Career Interests ({interests.length})
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {interests.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-800 border border-blue-200"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(item)}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={e => setNewInterest(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddInterest();
                  }
                }}
                placeholder="Add career interest..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-orange-500"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-bold"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Industry & Location Preferences */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-5">
          <h3 className="font-bold text-base text-slate-900 border-b border-stone-100 pb-3">
            3. Job Preferences & Target Locations
          </h3>

          {/* Preferred Industries */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Preferred Industries ({preferredIndustries.length})
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {preferredIndustries.map((ind, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800 border border-emerald-200"
                >
                  <span>{ind}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveIndustry(ind)}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newIndustry}
                onChange={e => setNewIndustry(e.target.value)}
                placeholder="Add industry (e.g. EdTech, Healthcare, Autonomous Systems)"
                className="flex-1 px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddIndustry}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-bold"
              >
                Add
              </button>
            </div>
          </div>

          {/* Preferred Locations */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Target Locations ({preferredLocations.length})
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {preferredLocations.map((loc, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100/80 text-purple-800 border border-purple-200"
                >
                  <span>{loc}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(loc)}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newLocation}
                onChange={e => setNewLocation(e.target.value)}
                placeholder="Add city or 'Remote'"
                className="flex-1 px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddLocation}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-bold"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all transform active:scale-95 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Career Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
