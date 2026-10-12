import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Eye, EyeOff, Lock, Mail, User, ShieldAlert, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface AuthPageProps {
  onNavigate: (route: string) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate, initialMode = 'signin' }) => {
  const { login, signup, quickLogin } = useAuth();
  const { showToast } = useToast();

  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState<'user' | 'admin'>('user');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('Please enter your email and password.', 'warning');
      return;
    }
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      if (email.toLowerCase().includes('admin')) {
        onNavigate('/admin');
      } else {
        onNavigate('/dashboard');
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }
    if (password.length < 6) {
      showToast('Password should be at least 6 characters long.', 'warning');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match. Please re-enter.', 'error');
      return;
    }
    if (!agreedTerms) {
      showToast('Please accept the Terms and Conditions to proceed.', 'warning');
      return;
    }

    if (accountType === 'admin') {
      showToast('Notice: Public registration creates a General User account. Admin roles must be authorized via administrator access.', 'info');
    }

    setLoading(true);
    const success = await signup(name, email, password);
    setLoading(false);
    if (success) {
      onNavigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* Top Logo */}
      <div className="mb-8 cursor-pointer text-center" onClick={() => onNavigate('/')}>
        <Logo variant="dark" size="lg" />
        <p className="mt-2 text-xs text-orange-700 font-medium">
          Your AI Career Co-Pilot Platform
        </p>
      </div>

      <div className="w-full max-w-xl">
        {/* Quick Demo Credentials Bar for fast evaluation */}
        <div className="mb-6 p-4 rounded-3xl bg-[#0A1128] text-white border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-orange-400">
              <Sparkles className="w-3.5 h-3.5" />
              Instant Evaluator Access
            </span>
            <span className="text-[11px] text-slate-400">Click to test instant roles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                quickLogin('user');
                onNavigate('/dashboard');
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              <User className="w-4 h-4 text-orange-400" />
              <span>Log in as General User</span>
            </button>
            <button
              onClick={() => {
                quickLogin('admin');
                onNavigate('/admin');
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Log in as Administrator</span>
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-200/80">
          {/* Tab Selector */}
          <div className="flex p-1 bg-stone-100 rounded-2xl mb-8">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
                mode === 'signin'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Sign In Form */}
          {mode === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. user@karyaai.com or admin@karyaai.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => onNavigate('/forgot-password')}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 absolute right-3.5 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all transform active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In to KaryaAI</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-3 text-xs text-slate-500">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-orange-600 hover:underline"
                >
                  Create Account
                </button>
              </div>
            </form>
          ) : (
            /* Sign Up Form */
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Re-type password"
                      className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAccountType('user')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      accountType === 'user'
                        ? 'border-orange-500 bg-orange-50/70 ring-1 ring-orange-500'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">General User</span>
                      <CheckCircle2 className={`w-4 h-4 ${accountType === 'user' ? 'text-orange-500' : 'text-slate-300'}`} />
                    </div>
                    <p className="text-[11px] text-slate-500">Student, Graduate, or Professional</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType('admin')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      accountType === 'admin'
                        ? 'border-slate-800 bg-slate-900/10 ring-1 ring-slate-800'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">Admin Request</span>
                      <ShieldAlert className={`w-4 h-4 ${accountType === 'admin' ? 'text-slate-900' : 'text-slate-300'}`} />
                    </div>
                    <p className="text-[11px] text-slate-500">Subject to organization verification</p>
                  </button>
                </div>
              </div>

              {/* Terms checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 leading-normal">
                  <input
                    type="checkbox"
                    required
                    checked={agreedTerms}
                    onChange={e => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span>
                    I agree to the <span className="font-semibold text-slate-900">Terms of Service</span> and <span className="font-semibold text-slate-900">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all transform active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2 text-xs text-slate-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="font-bold text-orange-600 hover:underline"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-semibold text-orange-700 hover:text-orange-900 transition-colors"
          >
            ← Back to KaryaAI Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
