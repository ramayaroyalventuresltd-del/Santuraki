import React, { useState } from 'react';
import { validateAdminLogin, getAdminAuth } from '../utils/userStore';
import { useTheme } from '../context/ThemeContext';
import { ShieldCheck, KeyRound, Lock, AlertCircle, CheckCircle2, UserCheck, X } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { isNavyWhite } = useTheme();
  const [username, setUsername] = useState('sysadmin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = validateAdminLogin(username, password);
    if (!res.success) {
      setError(res.message);
      return;
    }

    setSuccess('Authentication successful. Loading Admin Console...');
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 400);
  };

  const handleFillDefault = () => {
    const auth = getAdminAuth();
    setUsername('sysadmin');
    setPassword(auth.passwordHash); // either 123456 or the newly saved password!
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className={`w-full max-w-md rounded-3xl p-6 sm:p-7 border-2 shadow-2xl space-y-4 transition-all ${
        isNavyWhite 
          ? 'bg-white border-blue-200 text-slate-900 shadow-blue-900/10' 
          : 'bg-[#0b1e3b] border-blue-600 text-white shadow-2xl'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                Super Administrator Authentication
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-blue-300">
                FCTA Civil Service CBT Management Console
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info pill */}
        <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2">
          <KeyRound className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            Default credentials: Username <strong className="font-mono text-blue-700 dark:text-blue-300">sysadmin</strong> • Initial Password <strong className="font-mono text-blue-700 dark:text-blue-300">123456</strong>. (Mandatory password change on first login).
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold uppercase mb-1">
              Admin Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="sysadmin"
              className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-sm border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
              }`}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-sm border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
              }`}
              required
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handleFillDefault}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Fill SysAdmin Credentials</span>
            </button>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Authenticate & Enter Console</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
