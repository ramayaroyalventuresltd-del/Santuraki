import React, { useState, useMemo } from 'react';
import { User, ExamSession, Question } from '../types';
import { 
  getStoredUsers, 
  adminUpdateUser, 
  adminDeleteUser, 
  getUserTierProgress,
  adminSetTierOverride,
  getAllSystemExamSessions,
  getAdminAuth,
  changeAdminPassword,
  resetExamHistory,
  factoryResetPortalData
} from '../utils/userStore';
import { FCTA_SDAS, FCTA_CADRES, GRADE_LEVELS } from '../data/fctaData';
import { questionBank } from '../data/questionBank';
import { useTheme } from '../context/ThemeContext';
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  Unlock, 
  Award, 
  FileText, 
  Sparkles, 
  Settings, 
  KeyRound, 
  Search, 
  UserPlus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Layers, 
  Play, 
  Database, 
  RefreshCw, 
  Download, 
  ChevronRight, 
  HelpCircle,
  Eye,
  Sliders,
  BookOpen
} from 'lucide-react';
import { ContentManagement } from './ContentManagement';

interface AdminConsoleProps {
  onExit: () => void;
  onAdminLogout: () => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({ onExit, onAdminLogout }) => {
  const { isNavyWhite } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'tiers' | 'exams' | 'questions' | 'content' | 'settings'>('overview');

  // Load live data
  const [users, setUsers] = useState<User[]>(() => getStoredUsers());
  const [allSessions, setAllSessions] = useState<ExamSession[]>(() => getAllSystemExamSessions());
  const adminAuth = getAdminAuth();

  // Search & filter states for users
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [selectedCadreFilter, setSelectedCadreFilter] = useState('all');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('all');

  // Modal states
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Add user form state
  const [newStaffId, setNewStaffId] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newSda, setNewSda] = useState(FCTA_SDAS[0].name);
  const [newCadre, setNewCadre] = useState(FCTA_CADRES[0].name);
  const [newGradeLevel, setNewGradeLevel] = useState('GL 08');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Password change state
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(adminAuth.mustChangePassword);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');

  // Unlimited Question Simulator State
  const [simCategory, setSimCategory] = useState<'psr' | 'fr' | 'ppa' | 'fct_gk' | 'cadre'>('psr');
  const [simTier, setSimTier] = useState<1 | 2 | 3 | 4>(2);
  const [simSeed, setSimSeed] = useState(1);
  const [simQuestion, setSimQuestion] = useState<Question | null>(null);

  // Reload data helper
  const reloadData = () => {
    setUsers(getStoredUsers());
    setAllSessions(getAllSystemExamSessions());
  };

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = userSearchQuery.toLowerCase();
      const matchQuery = 
        !q || 
        u.fullName.toLowerCase().includes(q) || 
        u.username.includes(q) || 
        u.cadre.toLowerCase().includes(q) || 
        u.sda.toLowerCase().includes(q);
      const matchCadre = selectedCadreFilter === 'all' || u.cadre === selectedCadreFilter;
      const matchGrade = selectedGradeFilter === 'all' || u.gradeLevel === selectedGradeFilter;
      return matchQuery && matchCadre && matchGrade;
    });
  }, [users, userSearchQuery, selectedCadreFilter, selectedGradeFilter]);

  // Handle Add Candidate
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!/^\d{6}$/.test(newStaffId.trim())) {
      setFormError('Staff ID must be exactly a 6-digit number.');
      return;
    }
    if (!newFullName.trim()) {
      setFormError('Full Name is required.');
      return;
    }

    const existing = users.find((u) => u.username === newStaffId.trim());
    if (existing) {
      setFormError(`A candidate with Staff ID ${newStaffId} already exists.`);
      return;
    }

    const created: User = {
      id: newStaffId.trim(),
      username: newStaffId.trim(),
      fullName: newFullName.trim(),
      sda: newSda,
      cadre: newCadre,
      gradeLevel: newGradeLevel,
      email: newEmail.trim() || undefined,
      phone: newPhone.trim() || undefined,
      registeredAt: new Date().toISOString(),
    };

    const ok = adminUpdateUser(created);
    if (ok) {
      setFormSuccess(`Candidate ${created.fullName} (${created.username}) registered successfully!`);
      reloadData();
      setTimeout(() => {
        setIsAddUserModalOpen(false);
        setNewStaffId('');
        setNewFullName('');
        setNewEmail('');
        setNewPhone('');
        setFormSuccess('');
      }, 1000);
    } else {
      setFormError('Failed to save candidate to system database.');
    }
  };

  // Handle Edit Candidate
  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setFormError('');

    const ok = adminUpdateUser(editingUser);
    if (ok) {
      reloadData();
      setEditingUser(null);
    } else {
      setFormError('Failed to update candidate details.');
    }
  };

  // Handle Delete Candidate
  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    adminDeleteUser(userToDelete.id);
    reloadData();
    setUserToDelete(null);
  };

  // Handle Change Password (Mandatory on first login or on demand)
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeSuccess('');

    if (newAdminPassword.length < 6) {
      setPasswordChangeError('Password must be at least 6 characters long.');
      return;
    }
    if (newAdminPassword !== confirmAdminPassword) {
      setPasswordChangeError('Passwords do not match.');
      return;
    }
    if (newAdminPassword === '123456') {
      setPasswordChangeError('Please choose a new password different from the initial default password (123456).');
      return;
    }

    const res = changeAdminPassword(newAdminPassword);
    if (!res.success) {
      setPasswordChangeError(res.message);
      return;
    }

    setPasswordChangeSuccess('Super Administrator password changed and securely saved!');
    setTimeout(() => {
      setIsChangePasswordModalOpen(false);
      setNewAdminPassword('');
      setConfirmAdminPassword('');
      setPasswordChangeSuccess('');
    }, 1200);
  };

  // Toggle Tier Override
  const handleToggleTier = (userId: string, tier: 2 | 3 | 4, currentUnlocked: boolean) => {
    adminSetTierOverride(userId, tier, !currentUnlocked);
    reloadData();
  };

  // Unlimited Question Test Generation
  const handleGenerateSimQuestion = () => {
    const nextSeed = simSeed + 1;
    setSimSeed(nextSeed);
    const cadreObj = FCTA_CADRES[0];
    const cat = simCategory === 'cadre' ? cadreObj.id : simCategory;
    const q = questionBank.generateUnlimitedQuestion(cat, simTier, nextSeed, cadreObj.name);
    setSimQuestion(q);
  };

  // Export Users CSV
  const handleExportUsersCSV = () => {
    const headers = ['Staff_ID', 'Full_Name', 'Grade_Level', 'Cadre', 'SDA', 'Email', 'Phone', 'Registered_At'];
    const rows = users.map((u) => [
      u.username,
      `"${u.fullName}"`,
      u.gradeLevel,
      `"${u.cadre}"`,
      `"${u.sda}"`,
      u.email || '',
      u.phone || '',
      u.registeredAt || '',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fcta_candidates_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Key system stats
  const totalUsers = users.length;
  const totalExams = allSessions.length;
  const passedExams = allSessions.filter((s) => (s.percentage || 0) >= 60).length;
  const avgSystemScore = totalExams > 0 
    ? Math.round(allSessions.reduce((acc, s) => acc + (s.percentage || 0), 0) / totalExams)
    : 0;

  return (
    <div className={`min-h-screen py-6 px-4 sm:px-6 lg:px-8 transition-colors ${
      isNavyWhite ? 'bg-[#f4f7fb] text-slate-800' : 'bg-[#07152b] text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header Bar */}
        <div className={`rounded-3xl p-5 sm:p-6 border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 ${
          isNavyWhite ? 'bg-white border-blue-200 shadow-blue-900/5' : 'bg-[#0b1e3b] border-blue-900 shadow-2xl'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 border border-blue-400 flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-blue-950 dark:text-white">
                  FCTA Super Admin Console
                </span>
                <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  sysadmin
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-blue-200/80">
                User Governance, 4-Tier Unlock Progression Oversight, Unlimited Question Pool & CBT Exam Control
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsChangePasswordModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer bg-blue-50/80 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 hover:bg-blue-100"
            >
              <KeyRound className="w-3.5 h-3.5 text-blue-600" />
              <span>Change Admin Password</span>
            </button>

            <button
              onClick={onExit}
              className="px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
            >
              <span>Back to Portal</span>
            </button>

            <button
              onClick={onAdminLogout}
              className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Admin Logout</span>
            </button>
          </div>
        </div>

        {/* First Login Password Change Alert (if needed) */}
        {adminAuth.mustChangePassword && (
          <div className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <strong className="block text-sm font-bold">First Login Security Setup Required</strong>
                <p className="text-xs text-amber-800 dark:text-amber-300">
                  You are currently using the initial default password (123456). You must set a new secure password to ensure system integrity.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsChangePasswordModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all flex-shrink-0 cursor-pointer shadow-md"
            >
              Change Password Now
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className={`flex border-b overflow-x-auto pb-px ${isNavyWhite ? 'border-blue-200' : 'border-blue-900'}`}>
          <nav className="flex space-x-2 sm:space-x-3 text-xs sm:text-sm font-semibold">
            {[
              { id: 'overview', label: 'System Overview', icon: Layers },
              { id: 'users', label: `Candidates (${totalUsers})`, icon: Users },
              { id: 'tiers', label: 'Tier 60% Unlock Oversight', icon: Lock },
              { id: 'exams', label: `Exam Results (${totalExams})`, icon: FileText },
              { id: 'questions', label: 'Unlimited Question Engine', icon: Sparkles },
              { id: 'content', label: 'Content Management (CMS)', icon: BookOpen },
              { id: 'settings', label: 'Admin Security & Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2.5 px-4 rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? isNavyWhite
                        ? 'bg-white text-blue-950 border-b-2 border-blue-700 shadow-xs'
                        : 'bg-[#0b1e3b] text-white border-b-2 border-blue-400'
                      : isNavyWhite
                      ? 'text-slate-600 hover:text-blue-950 hover:bg-blue-50/60'
                      : 'text-blue-300 hover:text-white hover:bg-blue-950/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-blue-500" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: SYSTEM OVERVIEW */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              <div className={`p-4 rounded-2xl border transition-all ${
                isNavyWhite ? 'bg-white border-blue-100 shadow-sm' : 'bg-[#0b1e3b] border-blue-900'
              }`}>
                <div className="text-[11px] font-bold uppercase text-slate-500 dark:text-blue-300">Registered Candidates</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600 mt-1">{totalUsers}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Across 23 FCTA Cadres</div>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isNavyWhite ? 'bg-white border-blue-100 shadow-sm' : 'bg-[#0b1e3b] border-blue-900'
              }`}>
                <div className="text-[11px] font-bold uppercase text-slate-500 dark:text-blue-300">Exams Completed</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-600 mt-1">{totalExams}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{passedExams} passed (≥ 60%)</div>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isNavyWhite ? 'bg-white border-blue-100 shadow-sm' : 'bg-[#0b1e3b] border-blue-900'
              }`}>
                <div className="text-[11px] font-bold uppercase text-slate-500 dark:text-blue-300">Average Score</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 mt-1">{avgSystemScore}%</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Pass Mark: 60%</div>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isNavyWhite ? 'bg-white border-blue-100 shadow-sm' : 'bg-[#0b1e3b] border-blue-900'
              }`}>
                <div className="text-[11px] font-bold uppercase text-slate-500 dark:text-blue-300">Exam Architecture</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-600 mt-1">4 Tiers</div>
                <div className="text-[10px] text-slate-400 mt-0.5">GL 03 to GL 16</div>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isNavyWhite ? 'bg-white border-blue-100 shadow-sm' : 'bg-[#0b1e3b] border-blue-900'
              }`}>
                <div className="text-[11px] font-bold uppercase text-slate-500 dark:text-blue-300">Tier Exam Length</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-600 mt-1">75 Qs</div>
                <div className="text-[10px] text-slate-400 mt-0.5">0% Cross-Tier Repeat</div>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isNavyWhite ? 'bg-white border-blue-100 shadow-sm' : 'bg-[#0b1e3b] border-blue-900'
              }`}>
                <div className="text-[11px] font-bold uppercase text-slate-500 dark:text-blue-300">Question Pool</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-600 mt-1">∞</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Unlimited Dynamic Synthesizer</div>
              </div>
            </div>

            {/* Quick Action Shortcuts */}
            <div className={`p-6 rounded-3xl border ${
              isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#0b1e3b] border-blue-900'
            }`}>
              <h3 className="font-extrabold text-base mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                Administrative Command Centre
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="p-4 rounded-2xl border text-left hover:scale-[1.01] transition-all cursor-pointer bg-blue-50/60 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800"
                >
                  <div className="p-2.5 rounded-xl bg-blue-600 text-white w-fit mb-3">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-sm text-blue-950 dark:text-white">Register Candidate</div>
                  <div className="text-xs text-slate-500 dark:text-blue-300 mt-0.5">
                    Add new candidate with 6-digit Staff ID, Cadre, and Grade Level
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('tiers')}
                  className="p-4 rounded-2xl border text-left hover:scale-[1.01] transition-all cursor-pointer bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white w-fit mb-3">
                    <Unlock className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-sm text-emerald-950 dark:text-white">Manage Tier Unlocks</div>
                  <div className="text-xs text-slate-500 dark:text-emerald-300 mt-0.5">
                    View 60% pass mark progression & apply manual admin unlock overrides
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('questions')}
                  className="p-4 rounded-2xl border text-left hover:scale-[1.01] transition-all cursor-pointer bg-purple-50/60 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800"
                >
                  <div className="p-2.5 rounded-xl bg-purple-600 text-white w-fit mb-3">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-sm text-purple-950 dark:text-white">Unlimited Question Tester</div>
                  <div className="text-xs text-slate-500 dark:text-purple-300 mt-0.5">
                    Audit real-time dynamic question generation across all 4 tiers
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('content')}
                  className="p-4 rounded-2xl border text-left hover:scale-[1.01] transition-all cursor-pointer bg-blue-50/60 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800"
                >
                  <div className="p-2.5 rounded-xl bg-blue-600 text-white w-fit mb-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-sm text-blue-950 dark:text-white">Content Management (CMS)</div>
                  <div className="text-xs text-slate-500 dark:text-blue-300 mt-0.5">
                    Manage Question Bank, Announcements, Chapters & Cadres
                  </div>
                </button>

                <button
                  onClick={handleExportUsersCSV}
                  className="p-4 rounded-2xl border text-left hover:scale-[1.01] transition-all cursor-pointer bg-amber-50/60 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800"
                >
                  <div className="p-2.5 rounded-xl bg-amber-600 text-white w-fit mb-3">
                    <Download className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-sm text-amber-950 dark:text-white">Export Candidate Roster</div>
                  <div className="text-xs text-slate-500 dark:text-amber-300 mt-0.5">
                    Download full candidate database as CSV for civil service records
                  </div>
                </button>
              </div>
            </div>

            {/* 4-Tier Policy Framework Notice */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-700/60 text-white space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-blue-200 uppercase tracking-wider">
                <Award className="w-4 h-4 text-emerald-400" />
                Statutory Civil Service Promotion Examination Framework
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                Under the FCTA Civil Service Commission guidelines, candidates undergo 4 progressive tiers of CBT exams with strictly <strong>75 questions per tier</strong>. 
                Tier 1 is open to all candidates. <strong>Tiers 2, 3, and 4 remain locked until the candidate scores up to 60%</strong> in the preceding tier. 
                Questions are selected with 0% repetition across the four tiers, backed by the unlimited dynamic question generation engine.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: CANDIDATE / USER MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
              isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#0b1e3b] border-blue-900'
            }`}>
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  placeholder="Search by name, 6-digit Staff ID, cadre or SDA..."
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                />
              </div>

              {/* Filters & Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedCadreFilter}
                  onChange={(e) => setSelectedCadreFilter(e.target.value)}
                  className={`py-2 px-3 rounded-xl text-xs border focus:outline-none ${
                    isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                >
                  <option value="all">All Cadres ({FCTA_CADRES.length})</option>
                  {FCTA_CADRES.map((c) => (
                    <option key={c.id} value={c.name}>{c.shortName}</option>
                  ))}
                </select>

                <select
                  value={selectedGradeFilter}
                  onChange={(e) => setSelectedGradeFilter(e.target.value)}
                  className={`py-2 px-3 rounded-xl text-xs border focus:outline-none ${
                    isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                >
                  <option value="all">All Grade Levels</option>
                  {GRADE_LEVELS.map((g) => (
                    <option key={g.level} value={g.level}>{g.level}</option>
                  ))}
                </select>

                <button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Add Candidate</span>
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className={`rounded-2xl border overflow-hidden shadow-xl ${
              isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#0b1e3b] border-blue-900'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className={`text-[11px] uppercase tracking-wider font-extrabold border-b ${
                    isNavyWhite ? 'bg-blue-50/70 text-blue-950 border-blue-200' : 'bg-blue-950/70 text-blue-200 border-blue-900'
                  }`}>
                    <tr>
                      <th className="py-3 px-4">Staff ID (Username)</th>
                      <th className="py-3 px-4">Candidate Full Name</th>
                      <th className="py-3 px-4">Grade Level</th>
                      <th className="py-3 px-4">Professional Cadre</th>
                      <th className="py-3 px-4">SDA / Department</th>
                      <th className="py-3 px-4 text-center">Tier Progression</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-blue-900/60 font-sans">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-400">
                          No candidates found matching the query.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => {
                        const prog = getUserTierProgress(u.id);
                        return (
                          <tr key={u.id} className="hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                              {u.username}
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                              {u.fullName}
                            </td>
                            <td className="py-3 px-4 font-mono font-bold">
                              <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/70 text-blue-900 dark:text-blue-200 text-xs">
                                {u.gradeLevel}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-xs max-w-[160px] truncate" title={u.cadre}>
                              {u.cadre}
                            </td>
                            <td className="py-3 px-4 text-xs text-slate-500 dark:text-blue-200 max-w-[180px] truncate" title={u.sda}>
                              {u.sda}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="inline-flex items-center gap-1 font-mono text-[10px]">
                                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30" title="Tier 1 (Always open)">
                                  T1
                                </span>
                                <span className={`px-1.5 py-0.5 rounded border ${
                                  prog.tier2 
                                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/30' 
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700'
                                }`} title={`Tier 2: ${prog.tier2 ? 'Unlocked' : 'Locked (Needs ≥60% in T1)'}`}>
                                  T2
                                </span>
                                <span className={`px-1.5 py-0.5 rounded border ${
                                  prog.tier3 
                                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/30' 
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700'
                                }`} title={`Tier 3: ${prog.tier3 ? 'Unlocked' : 'Locked (Needs ≥60% in T2)'}`}>
                                  T3
                                </span>
                                <span className={`px-1.5 py-0.5 rounded border ${
                                  prog.tier4 
                                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/30' 
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700'
                                }`} title={`Tier 4: ${prog.tier4 ? 'Unlocked' : 'Locked (Needs ≥60% in T3)'}`}>
                                  T4
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setEditingUser(u)}
                                  className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
                                  title="Edit Candidate Details"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setUserToDelete(u)}
                                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
                                  title="Delete Candidate"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: TIER 60% UNLOCK OVERSIGHT */}
        {/* ========================================================= */}
        {activeTab === 'tiers' && (
          <div className="space-y-4">
            <div className={`p-5 rounded-2xl border ${
              isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#0b1e3b] border-blue-900'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-blue-900/80 pb-3">
                <div>
                  <h3 className="font-extrabold text-base flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-500" />
                    Tier Lock & 60% Pass Mark Enforcement Matrix
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-blue-300 mt-0.5">
                    Tier 1 is always unlocked. Tiers 2, 3, and 4 unlock automatically when the candidate scores ≥ 60% in the previous tier. 
                    Super Administrators can click below to manually override and unlock or lock any tier.
                  </p>
                </div>
              </div>

              {/* Table of Tier Unlock Matrix */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className={`text-[11px] uppercase tracking-wider font-extrabold border-b ${
                    isNavyWhite ? 'bg-blue-50/70 text-blue-950 border-blue-200' : 'bg-blue-950/70 text-blue-200 border-blue-900'
                  }`}>
                    <tr>
                      <th className="py-3 px-4">Candidate</th>
                      <th className="py-3 px-4">Grade & Cadre</th>
                      <th className="py-3 px-4 text-center">Tier 1 (GL 03-06)</th>
                      <th className="py-3 px-4 text-center">Tier 2 (GL 07-10)</th>
                      <th className="py-3 px-4 text-center">Tier 3 (GL 12-14)</th>
                      <th className="py-3 px-4 text-center">Tier 4 (GL 15-16)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-blue-900/60 font-sans">
                    {users.map((u) => {
                      const prog = getUserTierProgress(u.id);
                      return (
                        <tr key={u.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-950/20">
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900 dark:text-white">{u.fullName}</div>
                            <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400">ID: {u.username}</div>
                          </td>
                          <td className="py-3 px-4 text-xs">
                            <div className="font-semibold text-slate-700 dark:text-slate-300">{u.gradeLevel}</div>
                            <div className="text-[11px] text-slate-400 truncate max-w-[150px]">{u.cadre}</div>
                          </td>

                          {/* Tier 1 Status (Always unlocked) */}
                          <td className="py-3 px-4 text-center">
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                                <Unlock className="w-3 h-3" /> Unlocked
                              </span>
                              <div className="text-[10px] text-slate-400">
                                Best: <strong className={prog.tier1Best >= 60 ? 'text-emerald-500' : 'text-slate-400'}>{prog.tier1Best}%</strong> ({prog.tier1Attempts} att.)
                              </div>
                            </div>
                          </td>

                          {/* Tier 2 Status (Unlocked if T1 >= 60%) */}
                          <td className="py-3 px-4 text-center">
                            <div className="space-y-1">
                              <button
                                onClick={() => handleToggleTier(u.id, 2, prog.tier2)}
                                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border cursor-pointer transition-all ${
                                  prog.tier2 
                                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-rose-500/20 hover:text-rose-500' 
                                    : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30 hover:bg-emerald-500/20 hover:text-emerald-500'
                                }`}
                                title="Click to manually toggle unlock status"
                              >
                                {prog.tier2 ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                <span>{prog.tier2 ? 'Unlocked' : 'Locked'}</span>
                              </button>
                              <div className="text-[10px] text-slate-400">
                                Best: <strong className={prog.tier2Best >= 60 ? 'text-emerald-500' : 'text-slate-400'}>{prog.tier2Best}%</strong>
                              </div>
                            </div>
                          </td>

                          {/* Tier 3 Status (Unlocked if T2 >= 60%) */}
                          <td className="py-3 px-4 text-center">
                            <div className="space-y-1">
                              <button
                                onClick={() => handleToggleTier(u.id, 3, prog.tier3)}
                                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border cursor-pointer transition-all ${
                                  prog.tier3 
                                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-rose-500/20 hover:text-rose-500' 
                                    : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30 hover:bg-emerald-500/20 hover:text-emerald-500'
                                }`}
                                title="Click to manually toggle unlock status"
                              >
                                {prog.tier3 ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                <span>{prog.tier3 ? 'Unlocked' : 'Locked'}</span>
                              </button>
                              <div className="text-[10px] text-slate-400">
                                Best: <strong className={prog.tier3Best >= 60 ? 'text-emerald-500' : 'text-slate-400'}>{prog.tier3Best}%</strong>
                              </div>
                            </div>
                          </td>

                          {/* Tier 4 Status (Unlocked if T3 >= 60%) */}
                          <td className="py-3 px-4 text-center">
                            <div className="space-y-1">
                              <button
                                onClick={() => handleToggleTier(u.id, 4, prog.tier4)}
                                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border cursor-pointer transition-all ${
                                  prog.tier4 
                                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-rose-500/20 hover:text-rose-500' 
                                    : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30 hover:bg-emerald-500/20 hover:text-emerald-500'
                                }`}
                                title="Click to manually toggle unlock status"
                              >
                                {prog.tier4 ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                <span>{prog.tier4 ? 'Unlocked' : 'Locked'}</span>
                              </button>
                              <div className="text-[10px] text-slate-400">
                                Best: <strong className={prog.tier4Best >= 60 ? 'text-emerald-500' : 'text-slate-400'}>{prog.tier4Best}%</strong>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: EXAM RESULTS & AUDIT LOGS */}
        {/* ========================================================= */}
        {activeTab === 'exams' && (
          <div className="space-y-4">
            <div className={`p-5 rounded-2xl border ${
              isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#0b1e3b] border-blue-900'
            }`}>
              <h3 className="font-extrabold text-base mb-2">Portal CBT Examination Session Records</h3>
              <p className="text-xs text-slate-500 dark:text-blue-300 mb-4">
                Real-time records of exams conducted by candidates across all 4 tiers and practice modules.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className={`text-[11px] uppercase tracking-wider font-extrabold border-b ${
                    isNavyWhite ? 'bg-blue-50/70 text-blue-950 border-blue-200' : 'bg-blue-950/70 text-blue-200 border-blue-900'
                  }`}>
                    <tr>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Candidate ID</th>
                      <th className="py-3 px-4">Exam Module</th>
                      <th className="py-3 px-4 text-center">Questions</th>
                      <th className="py-3 px-4 text-center">Score</th>
                      <th className="py-3 px-4 text-center">Percentage</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-blue-900/60 font-sans">
                    {allSessions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-400">
                          No examination sessions recorded in database yet.
                        </td>
                      </tr>
                    ) : (
                      allSessions.slice(0, 50).map((s) => {
                        const pct = s.percentage ?? (s.score && s.totalQuestions ? Math.round((s.score / s.totalQuestions) * 100) : 0);
                        const isPass = pct >= 60;
                        return (
                          <tr key={s.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-950/20">
                            <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                              {new Date(s.startedAt).toLocaleDateString()} {new Date(s.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                              {s.userId}
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white max-w-[200px] truncate" title={s.title}>
                              {s.title}
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold">
                              {s.totalQuestions || s.questions.length} Qs
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold">
                              {s.score !== undefined ? `${s.score}/${s.totalQuestions || s.questions.length}` : '—'}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className={`px-2 py-0.5 rounded-full font-mono font-bold text-xs ${
                                isPass 
                                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                                  : 'bg-rose-500/20 text-rose-700 dark:text-rose-400'
                              }`}>
                                {pct}%
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                isPass 
                                  ? 'bg-emerald-500 text-white' 
                                  : 'bg-slate-400 text-slate-900'
                              }`}>
                                {isPass ? 'PASSED (≥60%)' : 'BELOW 60%'}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: UNLIMITED QUESTION ENGINE */}
        {/* ========================================================= */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border ${
              isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#0b1e3b] border-blue-900'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-blue-900 pb-4">
                <div>
                  <h3 className="font-extrabold text-base flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Dynamic Unlimited Question Pool Synthesizer
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-blue-300 mt-1 max-w-2xl">
                    The portal features an unlimited question synthesis engine that generates authentic statutory questions on the fly for PSR, FR, PPA, FCT Governance, and 23 Professional Cadres across all 4 Tiers.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">
                    Unlimited Active
                  </span>
                </div>
              </div>

              {/* Generator Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Subject Domain</label>
                  <select
                    value={simCategory}
                    onChange={(e) => setSimCategory(e.target.value as any)}
                    className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm font-semibold ${
                      isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                    }`}
                  >
                    <option value="psr">Public Service Rules (PSR)</option>
                    <option value="fr">Financial Regulations (FR)</option>
                    <option value="ppa">Public Procurement Act (PPA 2007)</option>
                    <option value="fct_gk">FCT General Knowledge</option>
                    <option value="cadre">Cadre Technical Questions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Target CBT Tier</label>
                  <select
                    value={simTier}
                    onChange={(e) => setSimTier(Number(e.target.value) as any)}
                    className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm font-semibold ${
                      isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                    }`}
                  >
                    <option value={1}>Tier 1 (GL 03 - GL 06)</option>
                    <option value={2}>Tier 2 (GL 07 - GL 10)</option>
                    <option value={3}>Tier 3 (GL 12 - GL 14)</option>
                    <option value={4}>Tier 4 (GL 15 - GL 16)</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleGenerateSimQuestion}
                    className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Synthesize Fresh Question</span>
                  </button>
                </div>
              </div>

              {/* Live Question Preview Box */}
              {simQuestion ? (
                <div className="p-5 rounded-2xl border-2 border-purple-500/40 bg-purple-500/5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-500/20 pb-3 text-xs">
                    <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                      ID: {simQuestion.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-bold text-[10px]">
                      {simQuestion.tierCode} ({simQuestion.gradeLevelCategory})
                    </span>
                    <span className="text-slate-500 dark:text-slate-300 font-semibold">
                      Ref: {simQuestion.referenceRule}
                    </span>
                  </div>

                  <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {simQuestion.questionText}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {simQuestion.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl border flex items-start gap-2 ${
                          i === simQuestion.correctOptionIndex
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="font-mono font-bold text-xs uppercase px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200">
                    <strong className="block font-bold">Statutory Official Explanation:</strong>
                    {simQuestion.explanation}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 border border-dashed rounded-2xl border-slate-300 dark:border-slate-800">
                  Click <strong>&quot;Synthesize Fresh Question&quot;</strong> above to generate and inspect a question from the unlimited statutory engine.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: CONTENT MANAGEMENT (CMS) */}
        {/* ========================================================= */}
        {activeTab === 'content' && (
          <ContentManagement onBackToAdminOverview={() => setActiveTab('overview')} />
        )}

        {/* ========================================================= */}
        {/* TAB 7: ADMIN SECURITY & SETTINGS */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border ${
              isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#0b1e3b] border-blue-900'
            }`}>
              <h3 className="font-extrabold text-base mb-4 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-blue-600" />
                Super Administrator Security Configuration
              </h3>

              <div className="max-w-md space-y-4">
                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-blue-300">Admin Username:</span>
                    <strong className="font-mono text-blue-950 dark:text-white">sysadmin</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-blue-300">Password Status:</span>
                    <strong className={adminAuth.mustChangePassword ? 'text-amber-500' : 'text-emerald-500'}>
                      {adminAuth.mustChangePassword ? 'Initial Default (Must Change)' : 'Secure Password Configured'}
                    </strong>
                  </div>
                  {adminAuth.lastLogin && (
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-blue-300">Last Login:</span>
                      <span className="font-mono text-slate-400">{new Date(adminAuth.lastLogin).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsChangePasswordModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Update Super Administrator Password</span>
                </button>
              </div>
            </div>

            {/* Benchmark Settings */}
            <div className={`p-6 rounded-3xl border ${
              isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#0b1e3b] border-blue-900'
            }`}>
              <h3 className="font-extrabold text-base mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500" />
                Civil Service Tier Progression Policy
              </h3>
              <p className="text-xs text-slate-500 dark:text-blue-300 mb-4">
                Standard promotion examination requirements configured for the portal:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-blue-900 bg-slate-50/50 dark:bg-blue-950/20">
                  <strong className="block text-slate-900 dark:text-white font-bold mb-1">Pass Mark Benchmark</strong>
                  <span className="text-xl font-black text-emerald-500 font-mono">60%</span>
                  <p className="text-[11px] text-slate-400 mt-1">Required in Tier N to unlock Tier N+1</p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-blue-900 bg-slate-50/50 dark:bg-blue-950/20">
                  <strong className="block text-slate-900 dark:text-white font-bold mb-1">Tier Questions Count</strong>
                  <span className="text-xl font-black text-blue-500 font-mono">75 Questions</span>
                  <p className="text-[11px] text-slate-400 mt-1">Exact distribution across 5 statutory domains</p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-blue-900 bg-slate-50/50 dark:bg-blue-950/20">
                  <strong className="block text-slate-900 dark:text-white font-bold mb-1">Repeat Prevention</strong>
                  <span className="text-xl font-black text-purple-500 font-mono">0% Duplicate</span>
                  <p className="text-[11px] text-slate-400 mt-1">No question repeated across 4 tier exams</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* MODAL: ADD CANDIDATE */}
      {/* ========================================================= */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto ${
            isNavyWhite ? 'bg-white border-blue-200 text-slate-900' : 'bg-[#0b1e3b] border-blue-900 text-white'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-blue-900">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                Register New Candidate Profile
              </h3>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 dark:text-rose-300 text-xs">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 dark:text-emerald-300 text-xs">
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  6-Digit Staff ID / Username (Mandatory)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={newStaffId}
                  onChange={(e) => setNewStaffId(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="e.g. 505050"
                  className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-base tracking-widest border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                  required
                />
                <span className="text-[11px] text-slate-500 mt-0.5 block">Password will be identical to the 6-digit Staff ID.</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Candidate Full Name</label>
                <input
                  type="text"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="e.g. Zainab Ibrahim"
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Grade Level</label>
                  <select
                    value={newGradeLevel}
                    onChange={(e) => setNewGradeLevel(e.target.value)}
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
                    value={newCadre}
                    onChange={(e) => setNewCadre(e.target.value)}
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
                <label className="block text-xs font-bold uppercase mb-1">Secretariat / Department / Agency (SDA)</label>
                <select
                  value={newSda}
                  onChange={(e) => setNewSda(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none ${
                    isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                >
                  {FCTA_SDAS.map((s) => (
                    <option key={s.id} value={s.name}>{s.name} ({s.abbreviation})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="user@fcta.gov.ng"
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none ${
                      isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="08012345678"
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none ${
                      isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                    }`}
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shadow-md"
                >
                  Save Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT CANDIDATE */}
      {/* ========================================================= */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto ${
            isNavyWhite ? 'bg-white border-blue-200 text-slate-900' : 'bg-[#0b1e3b] border-blue-900 text-white'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-blue-900">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-600" />
                Edit Candidate: {editingUser.fullName}
              </h3>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Staff ID (Read Only)</label>
                <input
                  type="text"
                  value={editingUser.username}
                  disabled
                  className="w-full px-3 py-2 rounded-xl font-mono text-slate-400 bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingUser.fullName}
                  onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Grade Level</label>
                  <select
                    value={editingUser.gradeLevel}
                    onChange={(e) => setEditingUser({ ...editingUser, gradeLevel: e.target.value })}
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
                  <label className="block text-xs font-bold uppercase mb-1">Cadre</label>
                  <select
                    value={editingUser.cadre}
                    onChange={(e) => setEditingUser({ ...editingUser, cadre: e.target.value })}
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
                <label className="block text-xs font-bold uppercase mb-1">SDA</label>
                <select
                  value={editingUser.sda}
                  onChange={(e) => setEditingUser({ ...editingUser, sda: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none ${
                    isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                >
                  {FCTA_SDAS.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: DELETE CONFIRMATION */}
      {/* ========================================================= */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl space-y-4 text-center ${
            isNavyWhite ? 'bg-white border-rose-200 text-slate-900' : 'bg-[#0b1e3b] border-rose-900 text-white'
          }`}>
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Delete Candidate Profile?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 mt-1">
                Are you sure you want to delete <strong className="text-rose-600">{userToDelete.fullName}</strong> ({userToDelete.username})? All associated records will be removed.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CHANGE SUPER ADMIN PASSWORD (MANDATORY ON FIRST LOGIN) */}
      {/* ========================================================= */}
      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-3xl p-6 border-2 shadow-2xl space-y-4 ${
            isNavyWhite ? 'bg-white border-blue-300 text-slate-900' : 'bg-[#0b1e3b] border-blue-600 text-white'
          }`}>
            <div className="flex items-center gap-3 border-b pb-3 border-slate-200 dark:border-blue-900">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base">
                  {adminAuth.mustChangePassword ? 'First-Time Login Security Setup' : 'Change Administrator Password'}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-blue-300">Super Administrator: sysadmin</span>
              </div>
            </div>

            {adminAuth.mustChangePassword && (
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-900 dark:text-amber-200 text-xs">
                <strong>Mandatory Requirement:</strong> You logged in with the default password (123456). You must set and save a new secure password before proceeding.
              </div>
            )}

            {passwordChangeError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 dark:text-rose-300 text-xs">
                {passwordChangeError}
              </div>
            )}
            {passwordChangeSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 dark:text-emerald-300 text-xs">
                {passwordChangeSuccess}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">New Secure Password</label>
                <input
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="Min 6 characters (not 123456)"
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmAdminPassword}
                  onChange={(e) => setConfirmAdminPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                {!adminAuth.mustChangePassword && (
                  <button
                    type="button"
                    onClick={() => setIsChangePasswordModalOpen(false)}
                    className="px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shadow-md"
                >
                  Save New Password & Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
