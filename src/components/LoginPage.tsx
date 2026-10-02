import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { FCTA_SDAS, GRADE_LEVELS, FCTA_CADRES, INITIAL_DEMO_USERS } from '../data/fctaData';
import { 
  validateLogin, 
  registerUser, 
  getRemindDetails, 
  saveRemindDetails, 
  clearRemindDetails,
  findStaffIdByNameOrContact 
} from '../utils/userStore';
import { useTheme } from '../context/ThemeContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  UserPlus, 
  LogIn, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  KeyRound, 
  UserCheck,
  Lock,
  ChevronDown,
  ChevronUp,
  Sparkles,
  HelpCircle,
  Award
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onOpenAdminConsole?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onLoginSuccess,
  onOpenAdminConsole 
}) => {
  const { isNavyWhite } = useTheme();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login Form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccessMsg, setLoginSuccessMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Remind My Details state
  const [isRemindDetailsOpen, setIsRemindDetailsOpen] = useState(false);
  const [remindSearchQuery, setRemindSearchQuery] = useState('');
  const [remindResults, setRemindResults] = useState<User[]>([]);
  const [savedDetails, setSavedDetails] = useState<ReturnType<typeof getRemindDetails>>(null);

  // Register Form state
  const [regFullName, setRegFullName] = useState('');
  const [regStaffId, setRegStaffId] = useState('');
  const [regSda, setRegSda] = useState(FCTA_SDAS[0].name);
  const [regCadre, setRegCadre] = useState(FCTA_CADRES[0].name);
  const [regGrade, setRegGrade] = useState('GL 08');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  // Load saved details on mount
  useEffect(() => {
    const saved = getRemindDetails();
    if (saved && saved.staffId) {
      setSavedDetails(saved);
      setLoginUsername(saved.staffId);
      setLoginPassword(saved.staffId);
    }
  }, []);

  // Handle Login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccessMsg('');

    const res = validateLogin(loginUsername, loginPassword);
    if (!res.success) {
      setLoginError(res.message);
      return;
    }

    // Save or clear remembered details
    if (rememberMe) {
      saveRemindDetails(res.user!.username, res.user!.fullName, true);
    } else {
      clearRemindDetails();
    }

    setLoginSuccessMsg(`Welcome, ${res.user!.fullName}! Redirecting to CBT Dashboard...`);
    setTimeout(() => {
      onLoginSuccess(res.user!);
    }, 350);
  };

  // Synchronize username and password
  const handleUsernameChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 6);
    setLoginUsername(cleaned);
    setLoginPassword(cleaned);
  };

  // Handle Register submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    const res = registerUser({
      username: regStaffId,
      fullName: regFullName,
      sda: regSda,
      cadre: regCadre,
      gradeLevel: regGrade,
      email: regEmail,
      phone: regPhone,
    });

    if (!res.success) {
      setRegError(res.message);
      return;
    }

    setRegSuccess(`Registration completed successfully for ${res.user?.fullName}!`);
    setLoginUsername(regStaffId);
    setLoginPassword(regStaffId);
    if (rememberMe) {
      saveRemindDetails(regStaffId, res.user?.fullName, true);
    }
    setTimeout(() => {
      setActiveTab('login');
      setRegSuccess('');
    }, 1200);
  };

  // Remind My Details search
  const handleRemindSearch = (query: string) => {
    setRemindSearchQuery(query);
    if (query.trim().length >= 2) {
      const matches = findStaffIdByNameOrContact(query);
      setRemindResults(matches);
    } else {
      setRemindResults([]);
    }
  };

  // Select searched candidate from Remind Details
  const handleSelectRemindedCandidate = (candidate: User) => {
    setLoginUsername(candidate.username);
    setLoginPassword(candidate.username);
    saveRemindDetails(candidate.username, candidate.fullName, true);
    setSavedDetails({ staffId: candidate.username, fullName: candidate.fullName, savedAt: new Date().toISOString() });
    setIsRemindDetailsOpen(false);
    setRemindSearchQuery('');
    setRemindResults([]);
  };

  // Quick Demo account selector
  const handleQuickDemo = (demoUser: typeof INITIAL_DEMO_USERS[0]) => {
    setLoginUsername(demoUser.username);
    setLoginPassword(demoUser.username);
    setLoginError('');
  };

  return (
    <div className={`min-h-[calc(100vh-4rem)] py-6 px-4 sm:px-6 lg:px-8 transition-colors ${
      isNavyWhite 
        ? 'bg-[#f4f7fb] text-slate-800' 
        : 'bg-gradient-to-b from-[#07152b] via-[#0b1e3b] to-[#07152b] text-slate-100'
    }`}>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Header & Admin Link Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-4 border-slate-200 dark:border-blue-900/60">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${
              isNavyWhite 
                ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                : 'bg-blue-900/60 text-blue-300 border border-blue-700/50'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Federal Capital Territory Administration
            </span>
          </div>

          {/* Admin Console Access Button */}
          {onOpenAdminConsole && (
            <button
              onClick={onOpenAdminConsole}
              className="px-4 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer bg-slate-900 dark:bg-blue-950 text-white border-blue-500/50 hover:bg-blue-800 hover:border-blue-400 shadow-sm"
              title="Super Administrator Access (sysadmin)"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Console</span>
            </button>
          )}
        </div>

        {/* Welcome Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif">
            <span className={isNavyWhite ? 'text-[#07152b]' : 'text-white'}>thesanturakiyauri</span>{' '}
            <span className="text-blue-600">cbtportal</span>
          </h1>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isNavyWhite ? 'text-slate-600' : 'text-blue-200'}`}>
            Staff Promotion CBT Examination & Learning Portal • 4-Tier Career Progression (GL 03 – GL 16) with Unlimited Question Pool
          </p>
        </div>

        {/* Main Authentication Card */}
        <div className={`max-w-xl mx-auto rounded-3xl p-6 sm:p-8 border shadow-xl transition-all ${
          isNavyWhite
            ? 'bg-white border-blue-200/80 shadow-blue-900/5'
            : 'bg-[#0b1e3b] border-blue-900 shadow-2xl'
        }`}>

          {/* Clean Segmented Tab Switcher */}
          <div className="flex rounded-2xl p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-blue-900 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-blue-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Candidate Login</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-blue-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>New Candidate Register</span>
            </button>
          </div>

          {/* TAB 1: LOGIN SECTION */}
          {activeTab === 'login' && (
            <div className="space-y-4">
              {loginError && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div>{loginError}</div>
                </div>
              )}

              {loginSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>{loginSuccessMsg}</div>
                </div>
              )}

              {/* Remind My Details Banner (if saved) */}
              {savedDetails && (
                <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <span className="text-slate-500 dark:text-blue-300">Saved details:</span>{' '}
                      <strong className="text-blue-950 dark:text-white">{savedDetails.fullName || 'Candidate'}</strong>{' '}
                      <span className="font-mono font-bold text-blue-600">({savedDetails.staffId})</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginUsername(savedDetails.staffId);
                      setLoginPassword(savedDetails.staffId);
                    }}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                  >
                    Quick Fill
                  </button>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="login-username" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700 dark:text-blue-200">
                    6-Digit Staff ID Number
                  </label>
                  <div className="relative">
                    <input
                      id="login-username"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={loginUsername}
                      onChange={(e) => handleUsernameChange(e.target.value)}
                      placeholder="e.g. 101010"
                      className={`w-full px-4 py-3 rounded-xl font-mono text-lg tracking-widest border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                        isNavyWhite 
                          ? 'bg-blue-50/40 border-blue-200 text-blue-950' 
                          : 'bg-[#07152b] border-blue-800 text-white'
                      }`}
                      required
                    />
                    <span className="absolute right-3.5 top-3.5 text-xs font-mono text-slate-400">
                      {loginUsername.length}/6 digits
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="login-password" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-blue-200">
                      Password (Same 6 Digits)
                    </label>
                    <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                      Auto-matched to Staff ID
                    </span>
                  </div>
                  <input
                    id="login-password"
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Same 6-digit number"
                    className={`w-full px-4 py-3 rounded-xl font-mono text-lg tracking-widest border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                      isNavyWhite 
                        ? 'bg-blue-50/40 border-blue-200 text-blue-950' 
                        : 'bg-[#07152b] border-blue-800 text-white'
                    }`}
                    required
                  />
                </div>

                {/* Remind My Details & Remember Me Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-slate-600 dark:text-blue-200">
                      Remember my details on this device
                    </span>
                  </label>

                  {/* Expand Remind My Details Finder */}
                  <button
                    type="button"
                    onClick={() => setIsRemindDetailsOpen(!isRemindDetailsOpen)}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Remind my details</span>
                    {isRemindDetailsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Expandable "Remind My Details" Helper Box */}
                {isRemindDetailsOpen && (
                  <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-900/90 border-slate-200 dark:border-blue-900 space-y-3">
                    <div className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-blue-600" />
                      Find your 6-digit Staff ID Number
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Enter your full name, email, or phone number to retrieve your portal ID:
                    </p>
                    <input
                      type="text"
                      value={remindSearchQuery}
                      onChange={(e) => handleRemindSearch(e.target.value)}
                      placeholder="Type your name (e.g. Ibrahim, Danladi, Grace)..."
                      className={`w-full px-3 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        isNavyWhite ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />

                    {/* Results list */}
                    {remindResults.length > 0 && (
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pt-1">
                        {remindResults.map((u) => (
                          <div
                            key={u.id}
                            onClick={() => handleSelectRemindedCandidate(u)}
                            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 cursor-pointer flex items-center justify-between text-xs transition-colors"
                          >
                            <div>
                              <strong className="text-blue-950 dark:text-white">{u.fullName}</strong>
                              <div className="text-[10px] text-slate-400">{u.cadre} • {u.gradeLevel}</div>
                            </div>
                            <span className="font-mono font-bold text-blue-600 text-sm px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50">
                              {u.username}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    {remindSearchQuery.length >= 2 && remindResults.length === 0 && (
                      <div className="text-[11px] text-slate-400 text-center py-1">
                        No candidate found matching &quot;{remindSearchQuery}&quot;. Please click &quot;New Candidate Register&quot; above.
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    id="btn-submit-login"
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Proceed to CBT Examination Dashboard</span>
                  </button>
                </div>
              </form>

              {/* 1-Click Demo Accounts for Rapid Evaluation */}
              <div className="pt-4 border-t border-slate-200 dark:border-blue-900/60 space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-blue-300 flex items-center justify-between">
                  <span>1-Click Test Candidate Accounts:</span>
                  <span className="text-[10px] font-mono text-emerald-500">Instant Fill</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {INITIAL_DEMO_USERS.map((demo) => (
                    <button
                      key={demo.id}
                      type="button"
                      onClick={() => handleQuickDemo(demo)}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        loginUsername === demo.username
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 font-bold'
                          : 'border-slate-200 dark:border-blue-900/60 hover:bg-blue-50/50 dark:hover:bg-blue-950/30'
                      }`}
                    >
                      <div className="font-semibold text-blue-950 dark:text-white truncate">
                        {demo.fullName}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                        <span>{demo.gradeLevel}</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{demo.username}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Console Link Footer on Home Page */}
              <div className="pt-3 text-center">
                {onOpenAdminConsole && (
                  <button
                    type="button"
                    onClick={onOpenAdminConsole}
                    className="text-xs text-slate-500 dark:text-blue-300 hover:text-blue-600 dark:hover:text-white font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Administrator Console Access (sysadmin)</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: REGISTER SECTION */}
          {activeTab === 'register' && (
            <div className="space-y-4">
              {regError && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{regError}</span>
                </div>
              )}
              {regSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{regSuccess}</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    6-Digit Staff / Service Number (Your ID & Password)
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={regStaffId}
                    onChange={(e) => setRegStaffId(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="e.g. 707070"
                    className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-base tracking-widest border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      isNavyWhite ? 'bg-blue-50/40 border-blue-200 text-blue-950' : 'bg-[#07152b] border-blue-800 text-white'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Candidate Full Name</label>
                  <input
                    type="text"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Musa Abdullahi"
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      isNavyWhite ? 'bg-blue-50/40 border-blue-200 text-blue-950' : 'bg-[#07152b] border-blue-800 text-white'
                    }`}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Grade Level</label>
                    <select
                      value={regGrade}
                      onChange={(e) => setRegGrade(e.target.value)}
                      className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none ${
                        isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    >
                      {GRADE_LEVELS.map((g) => (
                        <option key={g.level} value={g.level}>{g.level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Professional Cadre</label>
                    <select
                      value={regCadre}
                      onChange={(e) => setRegCadre(e.target.value)}
                      className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none ${
                        isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    >
                      {FCTA_CADRES.map((c) => (
                        <option key={c.id} value={c.name}>{c.shortName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Secretariat / Department (SDA)</label>
                  <select
                    value={regSda}
                    onChange={(e) => setRegSda(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none ${
                      isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                    }`}
                  >
                    {FCTA_SDAS.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="staff@fcta.gov.ng"
                      className={`w-full px-3 py-2 rounded-xl border focus:outline-none ${
                        isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="08012345678"
                      className={`w-full px-3 py-2 rounded-xl border focus:outline-none ${
                        isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register Candidate & Proceed</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* Simple 4-Tier Promotion Information strip */}
        <div className="max-w-xl mx-auto grid grid-cols-4 gap-2 text-center text-[11px] font-semibold">
          <div className="p-2.5 rounded-xl border bg-white/50 dark:bg-blue-950/30 border-slate-200 dark:border-blue-900">
            <span className="text-emerald-500 font-bold block">Tier 1</span>
            <span className="text-slate-500 dark:text-slate-400 text-[10px]">GL 03–06</span>
          </div>
          <div className="p-2.5 rounded-xl border bg-white/50 dark:bg-blue-950/30 border-slate-200 dark:border-blue-900">
            <span className="text-blue-500 font-bold block">Tier 2</span>
            <span className="text-slate-500 dark:text-slate-400 text-[10px]">GL 07–10</span>
          </div>
          <div className="p-2.5 rounded-xl border bg-white/50 dark:bg-blue-950/30 border-slate-200 dark:border-blue-900">
            <span className="text-indigo-500 font-bold block">Tier 3</span>
            <span className="text-slate-500 dark:text-slate-400 text-[10px]">GL 12–14</span>
          </div>
          <div className="p-2.5 rounded-xl border bg-white/50 dark:bg-blue-950/30 border-slate-200 dark:border-blue-900">
            <span className="text-purple-500 font-bold block">Tier 4</span>
            <span className="text-slate-500 dark:text-slate-400 text-[10px]">GL 15–16</span>
          </div>
        </div>

      </div>
    </div>
  );
};
