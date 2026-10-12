import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { Video, Plus, Edit2, Trash2, X, Sparkles, CheckCircle2 } from 'lucide-react';

export const AdminInterviewsView: React.FC = () => {
  const { showToast } = useToast();
  const [interviews] = useState(storageService.getInterviews());
  const [questions, setQuestions] = useState([
    { id: 'q1', role: 'AI & Machine Learning Engineer', category: 'AI Architecture', question: 'Explain how Retrieval Augmented Generation (RAG) overcomes hallucination in LLMs.', difficulty: 'Medium' },
    { id: 'q2', role: 'AI & Machine Learning Engineer', category: 'Deep Learning', question: 'How do you mitigate catastrophic forgetting when fine-tuning transformer models?', difficulty: 'Hard' },
    { id: 'q3', role: 'Full Stack React & Node Developer', category: 'Frontend', question: 'What are the architectural benefits and trade-offs of React Server Components (RSC)?', difficulty: 'Medium' },
    { id: 'q4', role: 'Cloud DevOps & SRE', category: 'Infrastructure', question: 'How do you design a zero-downtime canary deployment pipeline in Kubernetes with Istio?', difficulty: 'Hard' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRole, setNewRole] = useState('AI & Machine Learning Engineer');
  const [newCat, setNewCat] = useState('System Design');
  const [newQ, setNewQ] = useState('');
  const [newDiff, setNewDiff] = useState('Medium');

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQ.trim()) {
      showToast('Question content is required.', 'warning');
      return;
    }
    const qObj = {
      id: 'q-' + Date.now().toString(36),
      role: newRole,
      category: newCat,
      question: newQ.trim(),
      difficulty: newDiff
    };
    setQuestions([...questions, qObj]);
    setIsModalOpen(false);
    setNewQ('');
    showToast('Question successfully added to AI Mock Interview bank!', 'success');
  };

  const handleDeleteQ = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    showToast('Question removed from active bank.', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Evaluation Engine</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Mock Interview Question Bank
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure technical challenges, behavioral prompts, and AI scoring rubrics for learner practice rounds.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Interview Question</span>
        </button>
      </div>

      {/* Questions Table */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 border-b border-stone-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Question / Prompt</th>
              <th className="py-3.5 px-4">Role Focus</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Difficulty</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {questions.map(q => (
              <tr key={q.id} className="hover:bg-stone-50/60">
                <td className="py-4 px-6 font-semibold text-slate-900 max-w-md">{q.question}</td>
                <td className="py-4 px-4 text-slate-600">{q.role}</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 text-slate-700 font-medium">
                    {q.category}
                  </span>
                </td>
                <td className="py-4 px-4 font-bold text-orange-600">{q.difficulty}</td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => handleDeleteQ(q.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <form onSubmit={handleAddQuestion} className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900">Add Interview Prompt</h3>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Target Role</label>
              <select
                value={newRole}
                onChange={e => setNewRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm bg-white"
              >
                <option value="AI & Machine Learning Engineer">AI & Machine Learning Engineer</option>
                <option value="Full Stack React & Node Developer">Full Stack React & Node Developer</option>
                <option value="Cloud DevOps & SRE">Cloud DevOps & SRE</option>
                <option value="AI Product Manager">AI Product Manager</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Category</label>
                <input
                  type="text"
                  value={newCat}
                  onChange={e => setNewCat(e.target.value)}
                  placeholder="e.g. System Design"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Difficulty</label>
                <select
                  value={newDiff}
                  onChange={e => setNewDiff(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm bg-white"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Question Prompt *</label>
              <textarea
                rows={3}
                required
                value={newQ}
                onChange={e => setNewQ(e.target.value)}
                placeholder="Type the exact question asked by the AI interviewer..."
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-bold text-slate-600">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 rounded-full font-bold bg-orange-500 hover:bg-orange-600 text-white">
                Add to Bank
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
