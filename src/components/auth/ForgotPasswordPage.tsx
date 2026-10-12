import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { useToast } from '../../context/ToastContext';
import { Mail, ArrowRight, CheckCircle2, Lock, ArrowLeft, KeyRound } from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (route: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [step, setStep] = useState<'email' | 'otp' | 'newPassword' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Please enter your email address.', 'warning');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      showToast(`A 6-digit recovery OTP has been sent to ${email}`, 'success');
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      showToast('Please enter the OTP.', 'warning');
      return;
    }
    setStep('newPassword');
    showToast('Code verified. Set your new password.', 'success');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters.', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      showToast('Your password has been reset successfully!', 'success');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="mb-8 cursor-pointer text-center" onClick={() => onNavigate('/')}>
        <Logo variant="dark" size="lg" />
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-stone-200/80">
        {step === 'email' && (
          <form onSubmit={handleSendReset} className="space-y-5">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 mx-auto flex items-center justify-center mb-3">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Forgot Password?</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your registered email address and we'll send you a recovery code.
              </p>
            </div>

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
                  placeholder="e.g. user@karyaai.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Sending Code...' : 'Send Recovery Code'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Enter OTP Code</h2>
              <p className="text-xs text-slate-500 mt-1">
                Sent to <strong>{email}</strong> (Hint: Use <strong>123456</strong> for demo)
              </p>
            </div>

            <div>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full text-center tracking-widest text-2xl font-mono py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 text-white shadow-lg flex items-center justify-center gap-2"
            >
              Verify Code
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {step === 'newPassword' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Set New Password</h2>
              <p className="text-xs text-slate-500 mt-1">
                Choose a strong password with at least 6 characters.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 text-white shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? 'Updating...' : 'Update Password'}
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Password Changed!</h3>
            <p className="text-xs text-slate-500">
              Your password has been successfully updated. You can now sign in with your new credentials.
            </p>
            <button
              onClick={() => onNavigate('/auth')}
              className="w-full py-3 rounded-full font-bold text-sm bg-[#0A1128] hover:bg-[#152044] text-white shadow-md"
            >
              Back to Sign In
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <button
            onClick={() => onNavigate('/auth')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};
