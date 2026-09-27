import React, { useState } from 'react';
import { LEARNING_MODULES } from '../data/learningData';
import { PSR_CHAPTERS, FR_CHAPTERS, PPA_CHAPTERS } from '../data/chaptersCatalog';
import { voiceReader } from '../utils/speech';
import { 
  BookOpen, 
  Search, 
  Play, 
  Scale, 
  Coins, 
  FileCheck, 
  CheckCircle2, 
  Lightbulb, 
  Volume2,
  Bookmark,
  ChevronRight,
  BookMarked
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LearningHubProps {
  onStartChapterPractice: (subject: 'psr' | 'fr' | 'ppa', chapterNumber: number, title: string) => void;
}

export const LearningHub: React.FC<LearningHubProps> = ({ onStartChapterPractice }) => {
  const { isNavyWhite } = useTheme();
  const [activeSubject, setActiveSubject] = useState<'all' | 'psr' | 'fr' | 'ppa'>('psr');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(LEARNING_MODULES[0].id);

  // Filter modules
  const filteredModules = LEARNING_MODULES.filter((m) => {
    const matchSubject = activeSubject === 'all' || m.subject === activeSubject;
    const query = searchQuery.toLowerCase().trim();
    const matchQuery = 
      !query ||
      m.title.toLowerCase().includes(query) ||
      m.summary.toLowerCase().includes(query) ||
      m.keyProvisions.some((p) => p.rule.toLowerCase().includes(query) || p.heading.toLowerCase().includes(query) || p.content.toLowerCase().includes(query));
    return matchSubject && matchQuery;
  });

  const currentModule = LEARNING_MODULES.find((m) => m.id === selectedModuleId) || filteredModules[0] || LEARNING_MODULES[0];

  // Read out summary via Voice Reader
  const handleReadSummary = () => {
    const textToRead = `${currentModule.subjectTitle}. Chapter ${currentModule.chapterNumber}: ${currentModule.title}. Summary: ${currentModule.summary}. Key provisions: ` +
      currentModule.keyProvisions.map((p) => `${p.rule}, ${p.heading}: ${p.content}`).join('. ');
    voiceReader.speakText(textToRead);
  };

  // Get chapter definitions for the subject to show full 20 chapters syllabus
  const getSubjectChapters = () => {
    if (activeSubject === 'psr') return PSR_CHAPTERS;
    if (activeSubject === 'fr') return FR_CHAPTERS;
    if (activeSubject === 'ppa') return PPA_CHAPTERS;
    return [...PSR_CHAPTERS, ...FR_CHAPTERS, ...PPA_CHAPTERS];
  };

  return (
    <div className={`min-h-[calc(100vh-4rem)] py-4 px-3 sm:py-8 sm:px-6 lg:px-8 transition-colors ${
      isNavyWhite ? 'bg-[#f4f7fb] text-slate-800' : 'bg-[#07152b] text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header Hero */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${
          isNavyWhite ? 'border-blue-200' : 'border-slate-800'
        }`}>
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 ${
              isNavyWhite 
                ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
            }`}>
              <BookOpen className="w-3.5 h-3.5" />
              Civil Service Statutory Learning Center
            </div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold ${isNavyWhite ? 'text-[#07152b]' : 'text-white'}`}>
              Learning Hub: <span className="text-blue-600 dark:text-emerald-400">PPA, FR & PSR</span>
            </h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isNavyWhite ? 'text-slate-600' : 'text-slate-300'}`}>
              Master the foundational legal and regulatory statutes of the Nigerian Public Service. Access chapter notes, key provisions, reference rules, and launch 10-question practice drills.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rule (e.g. PSR 020701, FR 105)..."
              className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isNavyWhite 
                  ? 'bg-white border-blue-200 text-slate-800 placeholder:text-slate-400 shadow-xs' 
                  : 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
              }`}
            />
          </div>
        </div>

        {/* Subject Filter Tabs */}
        <div className={`flex flex-wrap items-center gap-2 border-b pb-3 ${
          isNavyWhite ? 'border-blue-200' : 'border-slate-800'
        }`}>
          <button
            onClick={() => setActiveSubject('psr')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubject === 'psr'
                ? 'bg-blue-600 text-white shadow-md font-bold'
                : isNavyWhite
                ? 'bg-white border border-blue-200 text-slate-700 hover:bg-blue-50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Public Service Rules (PSR - 200 Qs)</span>
          </button>

          <button
            onClick={() => setActiveSubject('fr')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubject === 'fr'
                ? 'bg-blue-600 text-white shadow-md font-bold'
                : isNavyWhite
                ? 'bg-white border border-blue-200 text-slate-700 hover:bg-blue-50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Financial Regulations (FR - 200 Qs)</span>
          </button>

          <button
            onClick={() => setActiveSubject('ppa')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubject === 'ppa'
                ? 'bg-blue-600 text-white shadow-md font-bold'
                : isNavyWhite
                ? 'bg-white border border-blue-200 text-slate-700 hover:bg-blue-50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Public Procurement Act (PPA - 200 Qs)</span>
          </button>

          <button
            onClick={() => setActiveSubject('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubject === 'all'
                ? 'bg-blue-600 text-white shadow-md font-bold'
                : isNavyWhite
                ? 'bg-white border border-blue-200 text-slate-700 hover:bg-blue-50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>All 3 Core Subjects</span>
          </button>
        </div>

        {/* Learning Hub Grid: Sidebar of Modules + Detailed Content Reader */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Module Selector Sidebar */}
          <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-2">
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
              isNavyWhite ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Select Study Module ({filteredModules.length} Available)
            </h3>

            {filteredModules.map((mod) => {
              const isSelected = currentModule.id === mod.id;
              return (
                <div
                  key={mod.id}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? isNavyWhite
                        ? 'bg-blue-50/90 border-blue-600 shadow-md ring-2 ring-blue-500/30 text-blue-950 font-bold'
                        : 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500 text-white'
                      : isNavyWhite
                      ? 'bg-white border-blue-100 hover:border-blue-300 hover:bg-blue-50/40 text-slate-700 shadow-xs'
                      : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      mod.subject === 'psr' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300' 
                        : mod.subject === 'fr' 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                    }`}>
                      {mod.subject.toUpperCase()} • Ch. {mod.chapterNumber}
                    </span>
                    <span className={`text-xs font-mono ${isNavyWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                      10 Questions
                    </span>
                  </div>
                  <h4 className={`font-bold text-sm leading-snug ${isNavyWhite ? 'text-slate-900' : 'text-white'}`}>
                    {mod.title}
                  </h4>
                  <p className={`text-xs line-clamp-2 mt-1 ${isNavyWhite ? 'text-slate-600' : 'text-slate-300'}`}>
                    {mod.summary}
                  </p>
                </div>
              );
            })}

            {/* Complete 20 Chapters Syllabus Directory Accordion */}
            <div className={`pt-4 border-t ${isNavyWhite ? 'border-blue-200' : 'border-slate-800'}`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                isNavyWhite ? 'text-blue-900' : 'text-emerald-400'
              }`}>
                <BookMarked className="w-3.5 h-3.5" />
                Full 20 Chapters Practice Directory (10 Qs Each)
              </h4>
              <p className={`text-[11px] mb-3 ${isNavyWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                Click any chapter to launch a focused 10-question CBT mock practice session:
              </p>
              <div className="space-y-1.5">
                {getSubjectChapters().map((ch) => (
                  <button
                    key={`${ch.subjectId}_${ch.chapterNumber}`}
                    onClick={() => onStartChapterPractice(ch.subjectId as any, ch.chapterNumber, ch.title)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between group transition-colors cursor-pointer ${
                      isNavyWhite
                        ? 'bg-white hover:bg-blue-50 border-blue-100 hover:border-blue-300 text-slate-800 shadow-xs'
                        : 'bg-slate-800/50 hover:bg-emerald-950/30 border-slate-700/60 hover:border-emerald-500/50 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`font-mono font-bold ${isNavyWhite ? 'text-blue-600' : 'text-emerald-400'}`}>
                        Ch.{ch.chapterNumber}
                      </span>
                      <span className={`truncate ${isNavyWhite ? 'text-slate-700 group-hover:text-blue-900' : 'text-slate-200 group-hover:text-white'}`}>
                        {ch.title}
                      </span>
                    </div>
                    <span className={`text-[11px] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold flex-shrink-0 ${
                      isNavyWhite ? 'text-blue-600' : 'text-emerald-400'
                    }`}>
                      Practice <ChevronRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Module Detailed Content Viewer */}
          <div className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 border transition-colors ${
            isNavyWhite 
              ? 'bg-white border-blue-100 shadow-blue-950/5 text-slate-800' 
              : 'bg-slate-800/90 border-slate-700 text-white'
          }`}>
            {/* Header of selected module */}
            <div className={`flex flex-wrap items-start justify-between gap-4 pb-4 border-b ${
              isNavyWhite ? 'border-blue-100' : 'border-slate-700'
            }`}>
              <div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider ${
                  isNavyWhite 
                    ? 'bg-blue-50 text-blue-900 border border-blue-200' 
                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                }`}>
                  {currentModule.subjectTitle} • Chapter {currentModule.chapterNumber}
                </span>
                <h2 className={`text-xl sm:text-2xl font-bold mt-2 ${isNavyWhite ? 'text-slate-900' : 'text-white'}`}>
                  {currentModule.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {/* Voice Reader Button for Study Mode */}
                <button
                  onClick={handleReadSummary}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isNavyWhite 
                      ? 'bg-slate-50 hover:bg-blue-50 border-blue-200 text-blue-900' 
                      : 'bg-slate-900 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                  title="Read module notes out loud"
                >
                  <Volume2 className="w-4 h-4 text-blue-600 dark:text-emerald-400" />
                  <span>Read Notes</span>
                </button>

                {/* Practice Chapter Button */}
                <button
                  id="btn-practice-chapter-10q"
                  onClick={() => onStartChapterPractice(currentModule.subject, currentModule.chapterNumber, currentModule.title)}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Practice 10 Questions</span>
                </button>
              </div>
            </div>

            {/* Summary Box */}
            <div className={`p-4 rounded-xl border space-y-2 ${
              isNavyWhite 
                ? 'bg-blue-50/70 border-blue-100 text-slate-800' 
                : 'bg-slate-900/80 border-slate-700/80 text-slate-200'
            }`}>
              <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isNavyWhite ? 'text-blue-900' : 'text-emerald-400'
              }`}>
                <Bookmark className="w-3.5 h-3.5" />
                Executive Summary & Scope
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isNavyWhite ? 'text-slate-700' : 'text-slate-200'}`}>
                {currentModule.summary}
              </p>
            </div>

            {/* Key Provisions */}
            <div className="space-y-3">
              <h3 className={`text-xs font-bold uppercase tracking-wider ${isNavyWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                Codified Key Provisions & Reference Rules
              </h3>

              <div className="space-y-3">
                {currentModule.keyProvisions.map((prov, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-xl border space-y-1.5 ${
                      isNavyWhite 
                        ? 'bg-slate-50/80 border-blue-100 text-slate-800' 
                        : 'bg-slate-900 border-slate-700/80 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold flex items-center gap-2 ${
                        isNavyWhite ? 'text-slate-900' : 'text-white'
                      }`}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {prov.heading}
                      </h4>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                        isNavyWhite 
                          ? 'bg-white text-blue-900 border-blue-200' 
                          : 'bg-emerald-950 text-emerald-400 border-emerald-800/50'
                      }`}>
                        {prov.rule}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed pl-6 ${isNavyWhite ? 'text-slate-600' : 'text-slate-300'}`}>
                      {prov.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Civil Service Tips */}
            <div className={`p-4 rounded-xl border space-y-2 text-xs ${
              isNavyWhite 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                : 'bg-emerald-950/20 border-emerald-800/40 text-slate-300'
            }`}>
              <h4 className={`font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px] ${
                isNavyWhite ? 'text-emerald-900' : 'text-emerald-300'
              }`}>
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Practical Tips for FCTA Promotion Candidates
              </h4>
              <ul className={`space-y-1 list-disc list-inside ${isNavyWhite ? 'text-emerald-900' : 'text-slate-300'}`}>
                {currentModule.practicalTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Call-to-action bottom */}
            <div className={`pt-4 border-t flex items-center justify-between ${
              isNavyWhite ? 'border-blue-100' : 'border-slate-700'
            }`}>
              <span className={`text-xs ${isNavyWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                Ready to test your mastery of Chapter {currentModule.chapterNumber}?
              </span>
              <button
                onClick={() => onStartChapterPractice(currentModule.subject, currentModule.chapterNumber, currentModule.title)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Chapter {currentModule.chapterNumber} (10 Questions Drill)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
