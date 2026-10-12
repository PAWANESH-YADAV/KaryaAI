import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { MockInterviewSession } from '../../types';
import {
  Video,
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Award,
  ChevronRight,
  TrendingUp,
  Clock,
  Send
} from 'lucide-react';

export const MockInterviewView: React.FC = () => {
  const { showToast } = useToast();
  const [sessions, setSessions] = useState<MockInterviewSession[]>(storageService.getInterviews());

  // Active Simulator State
  const [activeRole, setActiveRole] = useState('AI & Machine Learning Engineer');
  const [inSession, setInSession] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<any | null>(null);

  const interviewRoles = [
    {
      role: 'AI & Machine Learning Engineer',
      questions: [
        {
          question: 'Explain how Retrieval Augmented Generation (RAG) overcomes hallucination and knowledge freshness limits in LLMs.',
          sampleAnswer: 'RAG dynamically retrieves authoritative documents from a vector database (e.g., Pinecone/Milvus) matching query embeddings and injects them into the model context before prompt generation, grounding answers in verifiable facts.',
          category: 'AI Architecture & Generative AI'
        },
        {
          question: 'How do you mitigate catastrophic forgetting when fine-tuning transformer models on domain-specific datasets?',
          sampleAnswer: 'Employ Parameter-Efficient Fine-Tuning (PEFT) techniques like LoRA (Low-Rank Adaptation) or QLoRA, freeze base foundation weights, and mix a percentage of original pre-training data during gradient steps.',
          category: 'Deep Learning & Fine-Tuning'
        },
        {
          question: 'Describe your approach to serving real-time LLM inference at scale with sub-500ms P99 latency.',
          sampleAnswer: 'Utilize vLLM or TensorRT-LLM with PagedAttention, continuous batching, quantized weights (FP8/INT4), and speculative decoding alongside distributed GPU cache layers.',
          category: 'Systems & Inference Optimization'
        }
      ]
    },
    {
      role: 'Full Stack React & Node Developer',
      questions: [
        {
          question: 'What are the architectural benefits and trade-offs of React Server Components (RSC)?',
          sampleAnswer: 'RSCs reduce client bundle weight by keeping backend libraries and database calls on the server, streaming pre-rendered HTML to the client while preserving full interactivity for client components.',
          category: 'Frontend Architecture'
        },
        {
          question: 'How do you prevent SQL injection and NoSQL operator injection in high-throughput Express APIs?',
          sampleAnswer: 'Always use parameterized queries or trusted ORMs (Prisma, Drizzle), sanitize inputs with strict schema validators like Zod, and enforce least-privilege database connection roles.',
          category: 'Application Security'
        }
      ]
    },
    {
      role: 'Cloud DevOps & SRE',
      questions: [
        {
          question: 'How do you design a zero-downtime canary deployment pipeline in Kubernetes with Istio?',
          sampleAnswer: 'Use Istio VirtualServices to route 5% of incoming traffic to the new canary pod deployment, monitor Prometheus error rates and latencies, and automatically increment traffic weights if SLOs hold.',
          category: 'Cloud & Infrastructure'
        }
      ]
    }
  ];

  const currentRoleData = interviewRoles.find(r => r.role === activeRole) || interviewRoles[0];

  const handleStartInterview = () => {
    setInSession(true);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setCurrentFeedback(null);
    showToast(`Mock Interview started for ${activeRole}!`, 'info');
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      showToast('Microphone recording simulated. Speak your answer or type below.', 'info');
      // Simulate speech to text insertion
      if (!userAnswer) {
        setUserAnswer('In our architecture, we mitigate hallucination by grounding the LLM with dense embeddings retrieved from our vector database...');
      }
    } else {
      setIsRecording(false);
      showToast('Recording paused.', 'info');
    }
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      showToast('Please provide an answer (speech or text) before submitting.', 'warning');
      return;
    }

    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      const feedback = {
        score: Math.floor(84 + Math.random() * 12),
        technicalScore: 92,
        communicationScore: 88,
        problemSolvingScore: 90,
        strengths: [
          'Directly addressed the core architectural concept',
          'Good technical terminology (embeddings, vector database, context window)',
          'Clear logical flow without rambling'
        ],
        improvements: [
          'Quantify token efficiency and caching strategies',
          'Mention fallback protocols if vector search returns low semantic confidence'
        ]
      };
      setCurrentFeedback(feedback);

      // Save session
      const newSession: MockInterviewSession = {
        id: 'mock-' + Date.now().toString(36),
        role: activeRole,
        difficulty: 'Medium',
        score: feedback.score,
        completedAt: 'Just now',
        questions: currentRoleData.questions,
        userFeedback: feedback
      };
      storageService.addInterview(newSession);
      setSessions([newSession, ...sessions]);
      showToast('AI analysis completed! Review your feedback below.', 'success');
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentRoleData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setCurrentFeedback(null);
    } else {
      setInSession(false);
      showToast('Great job! You completed all questions in this mock interview round.', 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">AI Practice Studio</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            AI Mock Interviews
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simulate realistic technical and behavioral rounds. Get instant score breakdowns, strengths, and areas to improve.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            AI Evaluator Active
          </span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
        {!inSession ? (
          /* Role Selection & Start Screen */
          <div className="p-6 sm:p-10 space-y-6 max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-3xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-inner">
              <Video className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Select Your Target Interview Round
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Choose the role you want to practice for today. Questions are calibrated against real hiring loops.
              </p>
            </div>

            {/* Role Options */}
            <div className="space-y-2 text-left">
              {interviewRoles.map((r, i) => (
                <div
                  key={i}
                  onClick={() => setActiveRole(r.role)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    activeRole === r.role
                      ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{r.role}</h4>
                    <p className="text-xs text-slate-500">{r.questions.length} Core Questions • Technical & Architecture</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    activeRole === r.role ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300'
                  }`}>
                    {activeRole === r.role && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleStartInterview}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch AI Mock Interview</span>
            </button>
          </div>
        ) : (
          /* Active Interview Simulation */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header in session */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  {activeRole} • Question {currentQuestionIndex + 1} of {currentRoleData.questions.length}
                </span>
              </div>
              <button
                onClick={() => setInSession(false)}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Exit Session
              </button>
            </div>

            {/* Current Question */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                {currentRoleData.questions[currentQuestionIndex].category}
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                "{currentRoleData.questions[currentQuestionIndex].question}"
              </h3>
            </div>

            {/* Answer Input Box & Audio Toggle */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Your Response (Speak or Type)
                </label>
                <button
                  type="button"
                  onClick={handleToggleRecord}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isRecording
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                  }`}
                >
                  {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-orange-600" />}
                  <span>{isRecording ? 'Listening (Live)...' : 'Use Microphone'}</span>
                </button>
              </div>

              <textarea
                rows={4}
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                placeholder="Type your structured explanation here, or click 'Use Microphone' to speak..."
                className="w-full p-4 rounded-2xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-400">
                  Tip: Use the STAR method (Situation, Task, Action, Result) for best evaluation score.
                </span>

                <button
                  onClick={handleSubmitAnswer}
                  disabled={evaluating}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600 disabled:opacity-50"
                >
                  {evaluating ? (
                    <span>Evaluating with AI...</span>
                  ) : (
                    <>
                      <span>Submit Answer</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Feedback Card */}
            {currentFeedback && (
              <div className="p-6 rounded-2xl bg-gradient-to-b from-orange-50/60 to-white border-2 border-orange-200 space-y-5 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-orange-200/60">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                      AI Feedback Analysis
                    </span>
                    <h4 className="font-bold text-base text-slate-900 mt-0.5">
                      Overall Question Score: <span className="text-orange-600 font-extrabold">{currentFeedback.score}/100</span>
                    </h4>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                      Technical: {currentFeedback.technicalScore}%
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800">
                      Clarity: {currentFeedback.communicationScore}%
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800">
                      Problem Solving: {currentFeedback.problemSolvingScore}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Strengths Identified
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {currentFeedback.strengths.map((str: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Recommendations to Polish
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {currentFeedback.improvements.map((imp: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sample Answer Toggle / Preview */}
                <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-1.5">
                  <span className="font-bold text-orange-400 uppercase tracking-wider text-[10px] block">
                    Model Benchmark Answer
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {currentRoleData.questions[currentQuestionIndex].sampleAnswer}
                  </p>
                </div>

                {/* Proceed Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                  >
                    <span>
                      {currentQuestionIndex < currentRoleData.questions.length - 1 ? 'Proceed to Next Question' : 'Complete Interview Round'}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Past Mock Interview Sessions History */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">Your Practice History</h3>
            <p className="text-xs text-slate-500">Track score improvement and interview readiness across sessions</p>
          </div>
          <span className="text-xs font-bold text-slate-500">{sessions.length} Recorded Rounds</span>
        </div>

        <div className="space-y-3">
          {sessions.map(sess => (
            <div
              key={sess.id}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900">{sess.role}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-slate-700">
                    {sess.difficulty}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Completed {sess.completedAt} • {sess.questions.length} Questions Evaluated
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Overall Score</span>
                  <span className="text-xl font-extrabold text-orange-600">{sess.score || 85}/100</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
