import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => {
        let bg = 'bg-white border-slate-200 text-slate-800 shadow-xl';
        let icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;

        if (toast.type === 'success') {
          bg = 'bg-slate-900 border-emerald-500/40 text-white shadow-emerald-950/20 shadow-xl';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        } else if (toast.type === 'error') {
          bg = 'bg-slate-900 border-rose-500/40 text-white shadow-rose-950/20 shadow-xl';
          icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
        } else if (toast.type === 'warning') {
          bg = 'bg-slate-900 border-amber-500/40 text-white shadow-amber-950/20 shadow-xl';
          icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
        } else if (toast.type === 'info') {
          bg = 'bg-slate-900 border-orange-500/40 text-white shadow-orange-950/20 shadow-xl';
          icon = <Info className="w-5 h-5 text-orange-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-top-4 ${bg}`}
          >
            {icon}
            <div className="flex-1 text-sm font-medium leading-snug pt-0.5">
              {toast.message}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors -mr-1 -mt-1"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
