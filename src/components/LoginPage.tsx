import React, { useState } from 'react';
import { User } from '../types';
import { FCTA_SDAS, GRADE_LEVELS, FCTA_CADRES, INITIAL_DEMO_USERS } from '../data/fctaData';
import { validateLogin, registerUser } from '../utils/userStore';
import { useTheme } from '../context/ThemeContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  Building2, 
  Layers, 
  UserPlus, 
  LogIn, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  ExternalLink,
  Volume2,
  FileText,
  KeyRound,
  UserCheck
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { isNavyWhite } = useTheme();
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'sdas' | 'grades'>('login');
  
  // Login Form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccessMsg, setLoginSuccessMsg] = useState('');
  
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

  // Directory filter state
  const [sdaFilterType, setSdaFilterType] = useState<string>('all');
  const [sdaSearchQuery, setSdaSearchQuery] = useState('');

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

    setLoginSuccessMsg(`Welcome, ${res.user!.fullName}! Redirecting to your CBT Dashboard...`);
    setTimeout(() => {
      onLoginSuccess(res.user!);
    }, 400);
  };

  // Synchronize password when user types username if auto-sync is on
  const handleUsernameChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 6);
    setLoginUsername(cleaned);
    setLoginPassword(cleaned); // Same 6-digit number as requested!
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

    setRegSuccess(`Registration completed successfully for ${res.user?.fullName}! You can now login with your 6-digit ID: ${regStaffId}`);
    setLoginUsername(regStaffId);
    setLoginPassword(regStaffId);
    // Switch to login tab after brief delay
    setTimeout(() => {
      setActiveTab('login');
    }, 1500);
  };

  // Quick Demo account selector
  const handleQuickDemo = (demoUser: typeof INITIAL_DEMO_USERS[0]) => {
    setLoginUsername(demoUser.username);
    setLoginPassword(demoUser.username);
    setLoginError('');
  };

  // Filtered SDAs
  const filteredSdas = FCTA_SDAS.filter((sda) => {
    const matchType = sdaFilterType === 'all' || sda.category === sdaFilterType;
    const matchQuery = 
      sda.name.toLowerCase().includes(sdaSearchQuery.toLowerCase()) ||
      sda.abbreviation.toLowerCase().includes(sdaSearchQuery.toLowerCase()) ||
      sda.mandate.toLowerCase().includes(sdaSearchQuery.toLowerCase());
    return matchType && matchQuery;
  });

  return (
    <div className={`min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8 transition-colors ${
      isNavyWhite 
        ? 'bg-[#f4f7fb] text-slate-800' 
        : 'bg-gradient-to-b from-[#07152b] via-[#0b1e3b] to-[#07152b] text-slate-100'
    }`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Banner Section */}
        <div className="text-center space-y-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase shadow-xs ${
            isNavyWhite 
              ? 'bg-blue-100/90 text-blue-900 border border-blue-300' 
              : 'bg-blue-900/50 text-blue-300 border border-blue-700/50'
          }`}>
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            Federal Capital Territory Administration (FCTA)
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
            <span className={isNavyWhite ? 'text-[#07152b]' : 'text-white'}>thesanturakiyauri</span>{' '}
            <span className="text-blue-600">cbtportal</span>
          </h1>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base ${
            isNavyWhite ? 'text-slate-600' : 'text-blue-200'
          }`}>
            Official FCTA Staff Computer-Based Test (CBT) Mock Examination Portal. Featuring{' '}
            <strong className={`font-semibold ${isNavyWhite ? 'text-blue-900' : 'text-white'}`}>
              3,600 curated questions
            </strong>{' '}
            across PSR, FR, PPA, FCT General Knowledge, and 13 Professional Cadres.
          </p>
          <div className={`flex flex-wrap items-center justify-center gap-4 text-xs pt-1 ${
            isNavyWhite ? 'text-slate-500' : 'text-blue-200/80'
          }`}>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              GL 07 to GL 16 Syllabus
            </span>
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-blue-600" />
              Integrated Voice Question Reader
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              Dedicated PPA, FR & PSR Learning Hub
            </span>
          </div>
        </div>

        {/* Navigation Tabs on Login Page */}
        <div className={`flex justify-center border-b ${isNavyWhite ? 'border-blue-200' : 'border-blue-900'}`}>
          <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-px" aria-label="Tabs">
            <button
              id="tab-login-btn"
              onClick={() => setActiveTab('login')}
              className={`py-2.5 px-4 font-semibold text-sm rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'login'
                  ? isNavyWhite 
                    ? 'bg-white text-blue-950 border-b-2 border-blue-700 shadow-xs'
                    : 'bg-blue-900 text-white border-b-2 border-blue-400'
                  : isNavyWhite
                    ? 'text-slate-600 hover:text-blue-950 hover:bg-blue-50/70'
                    : 'text-blue-200 hover:text-white hover:bg-blue-950'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Staff Login</span>
            </button>

            <button
              id="tab-register-btn"
              onClick={() => setActiveTab('register')}
              className={`py-2.5 px-4 font-semibold text-sm rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'register'
                  ? isNavyWhite 
                    ? 'bg-white text-blue-950 border-b-2 border-blue-700 shadow-xs'
                    : 'bg-blue-900 text-white border-b-2 border-blue-400'
                  : isNavyWhite
                    ? 'text-slate-600 hover:text-blue-950 hover:bg-blue-50/70'
                    : 'text-blue-200 hover:text-white hover:bg-blue-950'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Register New User</span>
            </button>

            <button
              id="tab-sdas-btn"
              onClick={() => setActiveTab('sdas')}
              className={`py-2.5 px-4 font-semibold text-sm rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'sdas'
                  ? isNavyWhite 
                    ? 'bg-white text-blue-950 border-b-2 border-blue-700 shadow-xs'
                    : 'bg-blue-900 text-white border-b-2 border-blue-400'
                  : isNavyWhite
                    ? 'text-slate-600 hover:text-blue-950 hover:bg-blue-50/70'
                    : 'text-blue-200 hover:text-white hover:bg-blue-950'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>FCTA SDAs & Agencies ({FCTA_SDAS.length})</span>
            </button>

            <button
              id="tab-grades-btn"
              onClick={() => setActiveTab('grades')}
              className={`py-2.5 px-4 font-semibold text-sm rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'grades'
                  ? isNavyWhite 
                    ? 'bg-white text-blue-950 border-b-2 border-blue-700 shadow-xs'
                    : 'bg-blue-900 text-white border-b-2 border-blue-400'
                  : isNavyWhite
                    ? 'text-slate-600 hover:text-blue-950 hover:bg-blue-50/70'
                    : 'text-blue-200 hover:text-white hover:bg-blue-950'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Grade Levels (GL 07 - 16)</span>
            </button>
          </nav>
        </div>

        {/* Tab 1: Staff Login */}
        {activeTab === 'login' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Login Form Box */}
            <div className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 shadow-xl transition-all ${
              isNavyWhite
                ? 'bg-white border-2 border-blue-100 text-slate-800 shadow-blue-950/5'
                : 'bg-[#0b1e3b] border border-blue-900 text-white shadow-2xl'
            }`}>
              <div className="mb-6">
                <h2 className={`text-xl font-bold flex items-center gap-2 ${
                  isNavyWhite ? 'text-[#07152b]' : 'text-white'
                }`}>
                  <KeyRound className="w-5 h-5 text-blue-600" />
                  Candidate Authentication
                </h2>
                <p className={`text-xs mt-1 ${isNavyWhite ? 'text-slate-600' : 'text-blue-200/80'}`}>
                  Enter your <strong className={`font-semibold ${isNavyWhite ? 'text-blue-900' : 'text-white'}`}>6-digit Staff ID Number</strong>. Per portal regulation, your password is the <strong className={`font-semibold ${isNavyWhite ? 'text-blue-900' : 'text-white'}`}>exact same 6-digit number</strong>.
                </p>
              </div>

              {loginError && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div>{loginError}</div>
                </div>
              )}

              {loginSuccessMsg && (
                <div className="mb-5 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>{loginSuccessMsg}</div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="login-username" className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    isNavyWhite ? 'text-blue-950' : 'text-blue-200'
                  }`}>
                    Username (6-Digit Staff / Service Number)
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
                      placeholder="e.g. 123456"
                      className={`w-full px-4 py-3 rounded-xl font-mono text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all ${
                        isNavyWhite 
                          ? 'bg-blue-50/50 border border-blue-200 text-blue-950 placeholder:text-slate-400' 
                          : 'bg-[#07152b] border border-blue-800 text-white placeholder:text-blue-300/40'
                      }`}
                      required
                    />
                    <span className={`absolute right-3.5 top-3.5 text-xs font-mono ${
                      isNavyWhite ? 'text-slate-400' : 'text-blue-300'
                    }`}>
                      {loginUsername.length}/6 digits
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="login-password" className={`block text-xs font-bold uppercase tracking-wider ${
                      isNavyWhite ? 'text-blue-950' : 'text-blue-200'
                    }`}>
                      Password (Same 6-Digit Number)
                    </label>
                    <span className="text-xs text-blue-600 font-semibold">
                      Matched to Username
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
                    className={`w-full px-4 py-3 rounded-xl font-mono text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all ${
                      isNavyWhite 
                        ? 'bg-blue-50/50 border border-blue-200 text-blue-950 placeholder:text-slate-400' 
                        : 'bg-[#07152b] border border-blue-800 text-white placeholder:text-blue-300/40'
                    }`}
                    required
                  />
                  <p className={`text-[11px] mt-1 ${isNavyWhite ? 'text-slate-500' : 'text-blue-300/70'}`}>
                    Rule: Username and Password must be identical 6-digit numbers.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    id="btn-submit-login"
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-blue-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Proceed to CBT Examination Dashboard</span>
                  </button>
                </div>
              </form>

              {/* Quick Switch / Registration Prompt */}
              <div className={`mt-6 pt-4 border-t text-center text-xs ${
                isNavyWhite ? 'border-slate-100 text-slate-500' : 'border-blue-900 text-blue-200'
              }`}>
                New candidate not yet in database?{' '}
                <button
                  onClick={() => setActiveTab('register')}
                  className="text-blue-700 hover:text-blue-900 font-bold underline underline-offset-2 ml-1 cursor-pointer"
                >
                  Register New User Profile
                </button>
              </div>
            </div>

            {/* Quick Demo Credentials & Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <div className={`rounded-3xl p-6 shadow-xl transition-all ${
                isNavyWhite
                  ? 'bg-white border-2 border-blue-100 text-slate-800'
                  : 'bg-[#0b1e3b] border border-blue-900 text-white'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                  <h3 className={`font-bold text-sm ${isNavyWhite ? 'text-[#07152b]' : 'text-white'}`}>
                    Quick Demo Credentials (1-Click Fill)
                  </h3>
                </div>
                <p className={`text-xs mb-4 ${isNavyWhite ? 'text-slate-500' : 'text-blue-200/80'}`}>
                  Select a pre-registered candidate to test the CBT exam immediately:
                </p>
                <div className="space-y-2">
                  {INITIAL_DEMO_USERS.map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => handleQuickDemo(demo)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between cursor-pointer ${
                        loginUsername === demo.username
                          ? isNavyWhite 
                            ? 'bg-blue-50 border-2 border-blue-600 text-blue-950 font-bold shadow-xs'
                            : 'bg-blue-900/60 border-2 border-blue-400 text-white font-bold'
                          : isNavyWhite
                            ? 'bg-slate-50/80 border-slate-200 hover:bg-blue-50/50 text-slate-700'
                            : 'bg-[#07152b] border-blue-900/80 hover:bg-blue-950 text-blue-100'
                      }`}
                    >
                      <div>
                        <div className={`font-bold ${isNavyWhite ? 'text-blue-950' : 'text-white'}`}>
                          {demo.fullName}
                        </div>
                        <div className={`text-[11px] ${isNavyWhite ? 'text-slate-500' : 'text-blue-300'}`}>
                          {demo.cadre} • {demo.gradeLevel}
                        </div>
                      </div>
                      <div className="text-right font-mono text-blue-600 font-extrabold text-sm">
                        {demo.username}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Examination Structure Overview */}
              <div className="bg-gradient-to-br from-[#07152b] to-[#1e3a8a] border border-blue-900 rounded-3xl p-5 text-xs text-white space-y-3 shadow-xl">
                <div className="font-extrabold uppercase tracking-wider text-[11px] text-blue-200 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Total Question Bank: 3,600 Questions
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xs">
                    <span className="font-bold text-white block">200 PSR Qs</span>
                    <p className="text-blue-200 text-[10px]">10 Qs / 20 Chapters</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xs">
                    <span className="font-bold text-white block">200 FR Qs</span>
                    <p className="text-blue-200 text-[10px]">10 Qs / 20 Chapters</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xs">
                    <span className="font-bold text-white block">200 PPA Qs</span>
                    <p className="text-blue-200 text-[10px]">10 Qs / 20 Chapters</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xs">
                    <span className="font-bold text-white block">200 FCT GK Qs</span>
                    <p className="text-blue-200 text-[10px]">10 Qs / 20 Chapters</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-900/60 border border-blue-700/60 text-[11px] text-blue-100">
                  <strong className="text-white">2,800 Cadre Questions</strong>: 200 Questions tailored for each of the {FCTA_CADRES.length} FCTA Cadres (including Commercial & Trade Officers, 10 Qs per module).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Register New User */}
        {activeTab === 'register' && (
          <div className={`max-w-3xl mx-auto rounded-3xl p-6 sm:p-8 shadow-2xl transition-all ${
            isNavyWhite
              ? 'bg-white border-2 border-blue-100 text-slate-800'
              : 'bg-[#0b1e3b] border border-blue-900 text-white'
          }`}>
            <div className="mb-6">
              <h2 className={`text-xl font-bold flex items-center gap-2 ${
                isNavyWhite ? 'text-[#07152b]' : 'text-white'
              }`}>
                <UserPlus className="w-5 h-5 text-blue-600" />
                Register New Candidate Profile
              </h2>
              <p className={`text-xs mt-1 ${isNavyWhite ? 'text-slate-600' : 'text-blue-200/80'}`}>
                Fill in your candidate details. Your 6-digit Staff ID will automatically serve as both your Username and Password.
              </p>
            </div>

            {regError && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                <div>{regError}</div>
              </div>
            )}

            {regSuccess && (
              <div className="mb-5 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>{regSuccess}</div>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* User Name / Full Name Column */}
                <div className="sm:col-span-2">
                  <label htmlFor="reg-fullname" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                    isNavyWhite ? 'text-blue-950' : 'text-blue-200'
                  }`}>
                    User Name (Full Name: Surname First) *
                  </label>
                  <input
                    id="reg-fullname"
                    type="text"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Danladi Ibrahim Mohammed"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                      isNavyWhite 
                        ? 'bg-blue-50/40 border border-blue-200 text-slate-900 placeholder:text-slate-400' 
                        : 'bg-[#07152b] border border-blue-800 text-white placeholder:text-blue-300/40'
                    }`}
                    required
                  />
                </div>

                {/* 6-Digit Staff ID */}
                <div>
                  <label htmlFor="reg-staffid" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                    isNavyWhite ? 'text-blue-950' : 'text-blue-200'
                  }`}>
                    6-Digit Staff / Service Number *
                  </label>
                  <input
                    id="reg-staffid"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={regStaffId}
                    onChange={(e) => setRegStaffId(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="e.g. 987654"
                    className={`w-full px-4 py-2.5 rounded-xl font-mono text-sm tracking-widest focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                      isNavyWhite 
                        ? 'bg-blue-50/40 border border-blue-200 text-slate-900 placeholder:text-slate-400' 
                        : 'bg-[#07152b] border border-blue-800 text-white placeholder:text-blue-300/40'
                    }`}
                    required
                  />
                  <span className={`text-[11px] ${isNavyWhite ? 'text-slate-500' : 'text-blue-300/70'}`}>
                    Will be your 6-digit login username & password.
                  </span>
                </div>

                {/* Grade Level (GL 07 to GL 16) */}
                <div>
                  <label htmlFor="reg-grade" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                    isNavyWhite ? 'text-blue-950' : 'text-blue-200'
                  }`}>
                    Grade Level (GL 07 to GL 16) *
                  </label>
                  <select
                    id="reg-grade"
                    value={regGrade}
                    onChange={(e) => setRegGrade(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                      isNavyWhite 
                        ? 'bg-blue-50/40 border border-blue-200 text-slate-900' 
                        : 'bg-[#07152b] border border-blue-800 text-white'
                    }`}
                    required
                  >
                    {GRADE_LEVELS.map((gl) => (
                      <option key={gl.level} value={gl.level}>
                        {gl.level} - {gl.designation}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Secretariat / Department / Agency (SDA) */}
                <div className="sm:col-span-2">
                  <label htmlFor="reg-sda" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                    isNavyWhite ? 'text-blue-950' : 'text-blue-200'
                  }`}>
                    Secretariat, Department or Agency (SDA) *
                  </label>
                  <select
                    id="reg-sda"
                    value={regSda}
                    onChange={(e) => setRegSda(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                      isNavyWhite 
                        ? 'bg-blue-50/40 border border-blue-200 text-slate-900' 
                        : 'bg-[#07152b] border border-blue-800 text-white'
                    }`}
                    required
                  >
                    {FCTA_SDAS.map((sda) => (
                      <option key={sda.id} value={sda.name}>
                        [{sda.category.toUpperCase()}] {sda.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cadre Selection */}
                <div className="sm:col-span-2">
                  <label htmlFor="reg-cadre" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                    isNavyWhite ? 'text-blue-950' : 'text-blue-200'
                  }`}>
                    Professional Cadre (1 of {FCTA_CADRES.length} FCTA Cadres) *
                  </label>
                  <select
                    id="reg-cadre"
                    value={regCadre}
                    onChange={(e) => setRegCadre(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                      isNavyWhite 
                        ? 'bg-blue-50/40 border border-blue-200 text-slate-900' 
                        : 'bg-[#07152b] border border-blue-800 text-white'
                    }`}
                    required
                  >
                    {FCTA_CADRES.map((cadre) => (
                      <option key={cadre.id} value={cadre.name}>
                        {cadre.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label htmlFor="reg-email" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                    isNavyWhite ? 'text-blue-950' : 'text-blue-200'
                  }`}>
                    Official Email (Optional)
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@fcta.gov.ng"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                      isNavyWhite 
                        ? 'bg-blue-50/40 border border-blue-200 text-slate-900 placeholder:text-slate-400' 
                        : 'bg-[#07152b] border border-blue-800 text-white placeholder:text-blue-300/40'
                    }`}
                  />
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label htmlFor="reg-phone" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                    isNavyWhite ? 'text-blue-950' : 'text-blue-200'
                  }`}>
                    Phone Number (Optional)
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="080XXXXXXXX"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                      isNavyWhite 
                        ? 'bg-blue-50/40 border border-blue-200 text-slate-900 placeholder:text-slate-400' 
                        : 'bg-[#07152b] border border-blue-800 text-white placeholder:text-blue-300/40'
                    }`}
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                    isNavyWhite 
                      ? 'border-slate-300 text-slate-600 hover:bg-slate-100' 
                      : 'border-blue-800 text-blue-200 hover:bg-blue-900'
                  }`}
                >
                  Cancel
                </button>
                <button
                  id="btn-submit-register"
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-blue-900/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register & Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: List of all SDAs, Departments & Agencies under FCTA */}
        {activeTab === 'sdas' && (
          <div className={`rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 transition-all ${
            isNavyWhite
              ? 'bg-white border-2 border-blue-100 text-slate-800'
              : 'bg-[#0b1e3b] border border-blue-900 text-white'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className={`text-xl font-bold flex items-center gap-2 ${
                  isNavyWhite ? 'text-[#07152b]' : 'text-white'
                }`}>
                  <Building2 className="w-5 h-5 text-blue-600" />
                  List of all SDAs, Departments & Agencies under FCTA
                </h2>
                <p className={`text-xs mt-1 ${isNavyWhite ? 'text-slate-600' : 'text-blue-200/80'}`}>
                  Directory of all Mandate Secretariats, Common Services Departments, Extra-Ministerial Agencies, Boards, and Area Councils.
                </p>
              </div>

              {/* Search & Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={sdaSearchQuery}
                    onChange={(e) => setSdaSearchQuery(e.target.value)}
                    placeholder="Search SDA name, mandate..."
                    className={`pl-9 pr-4 py-2 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 w-56 ${
                      isNavyWhite
                        ? 'bg-blue-50/50 border border-blue-200 text-slate-800 placeholder:text-slate-400'
                        : 'bg-[#07152b] border border-blue-850 text-white placeholder:text-blue-300/40'
                    }`}
                  />
                </div>

                <select
                  value={sdaFilterType}
                  onChange={(e) => setSdaFilterType(e.target.value)}
                  className={`px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    isNavyWhite
                      ? 'bg-blue-50/50 border border-blue-200 text-slate-800'
                      : 'bg-[#07152b] border border-blue-850 text-white'
                  }`}
                >
                  <option value="all">All Categories ({FCTA_SDAS.length})</option>
                  <option value="secretariat">Mandate Secretariats</option>
                  <option value="department">Departments</option>
                  <option value="agency">Agencies & Parastatals</option>
                  <option value="board">Boards</option>
                  <option value="area_council">Area Councils (6)</option>
                </select>
              </div>
            </div>

            {/* SDA Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSdas.map((sda) => (
                <div 
                  key={sda.id} 
                  className={`p-4 rounded-2xl transition-all flex flex-col justify-between ${
                    isNavyWhite
                      ? 'bg-blue-50/30 border border-blue-100 hover:border-blue-400 hover:bg-white hover:shadow-md'
                      : 'bg-[#07152b] border border-blue-900/80 hover:border-blue-500'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        sda.category === 'secretariat' 
                          ? isNavyWhite ? 'bg-blue-100 text-blue-900 border border-blue-300' : 'bg-blue-950 text-blue-300 border border-blue-800'
                          : sda.category === 'department' 
                            ? isNavyWhite ? 'bg-indigo-100 text-indigo-900 border border-indigo-300' : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                            : sda.category === 'area_council' 
                              ? isNavyWhite ? 'bg-sky-100 text-sky-900 border border-sky-300' : 'bg-sky-950 text-sky-300 border border-sky-800'
                              : isNavyWhite ? 'bg-slate-100 text-slate-800 border border-slate-300' : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        {sda.category.replace('_', ' ')}
                      </span>
                      <span className={`text-xs font-mono font-bold ${
                        isNavyWhite ? 'text-blue-700' : 'text-blue-300'
                      }`}>
                        {sda.abbreviation}
                      </span>
                    </div>

                    <h3 className={`font-bold text-sm leading-snug mb-2 ${
                      isNavyWhite ? 'text-[#07152b]' : 'text-white'
                    }`}>
                      {sda.name}
                    </h3>
                    <p className={`text-xs line-clamp-3 mb-3 ${
                      isNavyWhite ? 'text-slate-600' : 'text-slate-300'
                    }`}>
                      {sda.mandate}
                    </p>
                  </div>

                  <div className={`text-[11px] pt-2 border-t flex items-center justify-between ${
                    isNavyWhite ? 'border-blue-100 text-slate-500' : 'border-blue-900/60 text-blue-300/70'
                  }`}>
                    <span className="truncate">Leadership: {sda.leadOffice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: List of all Grade Levels from GL 07 to GL 16 */}
        {activeTab === 'grades' && (
          <div className={`rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 transition-all ${
            isNavyWhite
              ? 'bg-white border-2 border-blue-100 text-slate-800'
              : 'bg-[#0b1e3b] border border-blue-900 text-white'
          }`}>
            <div>
              <h2 className={`text-xl font-bold flex items-center gap-2 ${
                isNavyWhite ? 'text-[#07152b]' : 'text-white'
              }`}>
                <Layers className="w-5 h-5 text-blue-600" />
                List of all Grade Levels (GL 07 to GL 16)
              </h2>
              <p className={`text-xs mt-1 ${isNavyWhite ? 'text-slate-600' : 'text-blue-200/80'}`}>
                Statutory progression hierarchy, rank titles, minimum maturity period in rank, and operational responsibilities in the FCTA Civil Service.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className={`border-b uppercase tracking-wider font-bold ${
                    isNavyWhite ? 'border-blue-100 text-blue-950 bg-blue-50/50' : 'border-blue-900 text-blue-200 bg-[#07152b]'
                  }`}>
                    <th className="py-3 px-4">Grade Level</th>
                    <th className="py-3 px-4">Official Designation</th>
                    <th className="py-3 px-4">Cadre Rank Category</th>
                    <th className="py-3 px-4 text-center">Maturity (Years in Rank)</th>
                    <th className="py-3 px-4">Core Responsibilities</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isNavyWhite ? 'divide-slate-100' : 'divide-blue-900/60'}`}>
                  {GRADE_LEVELS.map((gl) => (
                    <tr 
                      key={gl.level} 
                      className={`transition-colors ${
                        isNavyWhite ? 'hover:bg-blue-50/60' : 'hover:bg-blue-950/60'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-700 text-sm whitespace-nowrap">
                        {gl.level}
                      </td>
                      <td className={`py-3.5 px-4 font-bold whitespace-nowrap ${
                        isNavyWhite ? 'text-blue-950' : 'text-white'
                      }`}>
                        {gl.designation}
                      </td>
                      <td className={`py-3.5 px-4 ${isNavyWhite ? 'text-slate-700' : 'text-slate-200'}`}>
                        {gl.cadreRank}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-600 text-center whitespace-nowrap">
                        {gl.yearsToNextPromotion} Years
                      </td>
                      <td className={`py-3.5 px-4 max-w-md ${isNavyWhite ? 'text-slate-600' : 'text-slate-300'}`}>
                        {gl.responsibilities}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`p-4 rounded-2xl border text-xs space-y-1 ${
              isNavyWhite 
                ? 'bg-blue-50/60 border-blue-200 text-slate-700' 
                : 'bg-[#07152b] border-blue-900 text-blue-200'
            }`}>
              <strong className={isNavyWhite ? 'text-blue-950 font-bold' : 'text-white font-bold'}>Promotion Eligibility Rule (PSR 020701):</strong>
              <p>
                Officers on GL 07 to GL 14 must spend a statutory minimum of 3 years in rank; Officers on GL 15 to GL 17 must spend 4 years in rank before being eligible for the annual FCTA promotion examinations and oral assessments.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
