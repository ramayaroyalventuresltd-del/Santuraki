import React from 'react';
import { User } from '../types';
import { 
  GraduationCap, 
  BookOpen, 
  LayoutDashboard, 
  HelpCircle, 
  Building2, 
  LogOut, 
  Volume2,
  Sun,
  Moon,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { ScreenRecognitionBadge } from './ScreenRecognitionBadge';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentUser: User | null;
  currentView: 'dashboard' | 'exam' | 'learning' | 'browse' | 'directory' | 'admin';
  onNavigate: (view: 'dashboard' | 'learning' | 'browse' | 'directory') => void;
  onLogout: () => void;
  onOpenSettings?: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentView,
  onNavigate,
  onLogout,
  onOpenSettings,
  onOpenAdmin,
}) => {
  const { theme, toggleTheme, isNavyWhite } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-[#07152b] border-b border-blue-900 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div 
            id="portal-brand"
            onClick={() => currentUser && onNavigate('dashboard')} 
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 border border-blue-400/40 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-blue-200 transition-colors">
                  thesanturakiyauri
                </span>
                <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white border border-blue-400/50 shadow-xs">
                  cbtportal
                </span>
              </div>
              <p className="text-xs text-blue-200/80 hidden sm:block">
                FCTA Staff CBT Mock Examination & Learning Hub
              </p>
            </div>
          </div>

          {/* Navigation Links for Logged in Users */}
          {currentUser && currentView !== 'exam' && (
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button
                id="nav-btn-dashboard"
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'bg-white text-blue-950 font-bold shadow-md'
                    : 'text-blue-100 hover:text-white hover:bg-blue-900/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                id="nav-btn-learning"
                onClick={() => onNavigate('learning')}
                className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  currentView === 'learning'
                    ? 'bg-white text-blue-950 font-bold shadow-md'
                    : 'text-blue-100 hover:text-white hover:bg-blue-900/60'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Learn PPA, FR & PSR</span>
              </button>

              <button
                id="nav-btn-browse"
                onClick={() => onNavigate('browse')}
                className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  currentView === 'browse'
                    ? 'bg-white text-blue-950 font-bold shadow-md'
                    : 'text-blue-100 hover:text-white hover:bg-blue-900/60'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Question Bank (3,600)</span>
              </button>

              <button
                id="nav-btn-directory"
                onClick={() => onNavigate('directory')}
                className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  currentView === 'directory'
                    ? 'bg-white text-blue-950 font-bold shadow-md'
                    : 'text-blue-100 hover:text-white hover:bg-blue-900/60'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>FCTA SDAs & GL</span>
              </button>
            </nav>
          )}

          {/* User profile, Theme Toggle, Screen Recognition & action */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Switcher Button */}
            <button
              id="btn-theme-toggle"
              onClick={toggleTheme}
              title={`Switch Theme (Current: ${isNavyWhite ? 'Navy Blue & White' : 'Midnight Navy'})`}
              className="px-2.5 py-1.5 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-blue-100 hover:text-white border border-blue-700/60 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-inner"
            >
              {isNavyWhite ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-300" />
                  <span className="hidden lg:inline text-[11px]">Midnight</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden lg:inline text-[11px]">Navy & White</span>
                </>
              )}
            </button>

            {/* Auto Screen Recognition Badge */}
            <ScreenRecognitionBadge />

            {currentUser ? (
              <>
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-semibold text-white truncate max-w-[160px]">
                    {currentUser.fullName}
                  </span>
                  <span className="text-xs text-blue-300 font-mono">
                    ID: {currentUser.username} • {currentUser.gradeLevel}
                  </span>
                </div>

                <div className="h-9 w-9 rounded-full bg-blue-900 border-2 border-blue-400 flex items-center justify-center font-bold text-white text-sm shadow-md">
                  {currentUser.fullName.charAt(0).toUpperCase()}
                </div>

                {onOpenAdmin && (
                  <button
                    id="btn-nav-admin"
                    onClick={onOpenAdmin}
                    title="Super Administrator Console (sysadmin)"
                    className="p-2 rounded-xl text-blue-200 hover:text-amber-300 hover:bg-blue-900/70 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="hidden xl:inline text-xs font-bold text-amber-300">Admin</span>
                  </button>
                )}

                {onOpenSettings && (
                  <button
                    id="btn-nav-settings"
                    onClick={onOpenSettings}
                    title="Application Settings & Reset"
                    className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/70 transition-colors cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                )}

                <button
                  id="btn-logout"
                  onClick={onLogout}
                  title="Log Out"
                  className="p-2 rounded-xl text-blue-300 hover:text-rose-300 hover:bg-blue-900/70 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                {onOpenAdmin && (
                  <button
                    onClick={onOpenAdmin}
                    title="Super Administrator Console"
                    className="px-3 py-1.5 rounded-xl bg-blue-950/80 hover:bg-blue-900 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin Console</span>
                  </button>
                )}

                {onOpenSettings && (
                  <button
                    onClick={onOpenSettings}
                    title="Application Settings"
                    className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/70 transition-colors cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                )}
                <div className="hidden sm:flex items-center gap-2 text-xs text-blue-200">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-blue-300" />
                    Voice Reader Active
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        {currentUser && currentView !== 'exam' && (
          <div className="md:hidden flex items-center justify-around py-2 border-t border-blue-900/80 text-xs">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`p-1.5 flex flex-col items-center gap-1 ${
                currentView === 'dashboard' ? 'text-white font-bold' : 'text-blue-300'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => onNavigate('learning')}
              className={`p-1.5 flex flex-col items-center gap-1 ${
                currentView === 'learning' ? 'text-white font-bold' : 'text-blue-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Learning</span>
            </button>
            <button
              onClick={() => onNavigate('browse')}
              className={`p-1.5 flex flex-col items-center gap-1 ${
                currentView === 'browse' ? 'text-white font-bold' : 'text-blue-300'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>3,600 Qs</span>
            </button>
            <button
              onClick={() => onNavigate('directory')}
              className={`p-1.5 flex flex-col items-center gap-1 ${
                currentView === 'directory' ? 'text-white font-bold' : 'text-blue-300'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>SDAs & GL</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

