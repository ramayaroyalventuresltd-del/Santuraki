import React, { useState, useMemo } from 'react';
import { Question } from '../types';
import { questionBank } from '../data/questionBank';
import { FCTA_CADRES, FCTA_SDAS, GRADE_LEVELS } from '../data/fctaData';
import { PSR_CHAPTERS, FR_CHAPTERS, PPA_CHAPTERS, FCT_GK_CHAPTERS } from '../data/chaptersCatalog';
import { 
  PortalAnnouncement, 
  getAnnouncements, 
  saveAnnouncement, 
  deleteAnnouncement, 
  toggleAnnouncement,
  getCustomQuestions,
  saveCustomQuestion,
  deleteCustomQuestion,
  getCustomChapterContents,
  saveCustomChapterContent,
  getCustomCadreContents,
  saveCustomCadreContent
} from '../utils/contentStore';
import { useTheme } from '../context/ThemeContext';
import { 
  FileText, 
  HelpCircle, 
  Bell, 
  Layers, 
  BookOpen, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Check, 
  X, 
  Sparkles, 
  ArrowLeft,
  ShieldCheck,
  Building2,
  Lock,
  Award,
  Download,
  Upload
} from 'lucide-react';

interface ContentManagementProps {
  onBackToAdminOverview: () => void;
}

export const ContentManagement: React.FC<ContentManagementProps> = ({ onBackToAdminOverview }) => {
  const { isNavyWhite } = useTheme();
  const [cmsTab, setCmsTab] = useState<'questions' | 'chapters' | 'announcements' | 'cadres'>('questions');

  // Delete Confirmation States (replaces blocking window.confirm)
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [announcementToDelete, setAnnouncementToDelete] = useState<string | null>(null);
  const [importNotification, setImportNotification] = useState<string | null>(null);

  // -------------------------------------------------------------------
  // 1. QUESTIONS CMS STATE
  // -------------------------------------------------------------------
  const [questionSearch, setQuestionSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedTierFilter, setSelectedTierFilter] = useState<number | 'all'>('all');
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Form states for Question
  const [qCategory, setQCategory] = useState('psr');
  const [qTier, setQTier] = useState<1 | 2 | 3 | 4>(2);
  const [qChapterNum, setQChapterNum] = useState(1);
  const [qChapterTitle, setQChapterTitle] = useState('Statutory Civil Service Governance');
  const [qText, setQText] = useState('');
  const [qOptA, setQOptA] = useState('');
  const [qOptB, setQOptB] = useState('');
  const [qOptC, setQOptC] = useState('');
  const [qOptD, setQOptD] = useState('');
  const [qCorrectIdx, setQCorrectIdx] = useState(0);
  const [qReference, setQReference] = useState('');
  const [qExplanation, setQExplanation] = useState('');
  const [qFeedbackMsg, setQFeedbackMsg] = useState('');
  const [customQuestionsList, setCustomQuestionsList] = useState<Question[]>(() => getCustomQuestions());

  // -------------------------------------------------------------------
  // 2. ANNOUNCEMENTS CMS STATE
  // -------------------------------------------------------------------
  const [announcements, setAnnouncements] = useState<PortalAnnouncement[]>(() => getAnnouncements());
  const [isAnnModalOpen, setIsAnnModalOpen] = useState(false);
  const [editingAnn, setEditingAnn] = useState<PortalAnnouncement | null>(null);
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annType, setAnnType] = useState<'info' | 'alert' | 'urgent' | 'success'>('info');
  const [annTargetTiers, setAnnTargetTiers] = useState('All Candidates');

  // -------------------------------------------------------------------
  // 3. CHAPTERS CMS STATE
  // -------------------------------------------------------------------
  const [selectedDomainForChapters, setSelectedDomainForChapters] = useState<'psr' | 'fr' | 'ppa' | 'fct_gk'>('psr');
  const [customChapters, setCustomChapters] = useState(() => getCustomChapterContents());
  const [editingChapterNum, setEditingChapterNum] = useState<number | null>(null);
  const [chEditTitle, setChEditTitle] = useState('');
  const [chEditOverview, setChEditOverview] = useState('');
  const [chEditRef, setChEditRef] = useState('');

  // -------------------------------------------------------------------
  // 4. CADRES CMS STATE
  // -------------------------------------------------------------------
  const [cadresContent, setCadresContent] = useState(() => getCustomCadreContents());
  const [editingCadreId, setEditingCadreId] = useState<string | null>(null);
  const [cadreEditDesc, setCadreEditDesc] = useState('');

  // -------------------------------------------------------------------
  // QUESTIONS COMPUTATION & ACTIONS
  // -------------------------------------------------------------------
  const allBankQuestions = useMemo(() => {
    return questionBank.getAllQuestions();
  }, [customQuestionsList]);

  const filteredQuestions = useMemo(() => {
    return allBankQuestions.filter((q) => {
      const qTextLower = q.questionText.toLowerCase();
      const qRefLower = (q.referenceRule || '').toLowerCase();
      const matchSearch = !questionSearch || qTextLower.includes(questionSearch.toLowerCase()) || qRefLower.includes(questionSearch.toLowerCase());
      const matchCat = selectedCategoryFilter === 'all' || q.category === selectedCategoryFilter;
      const matchTier = selectedTierFilter === 'all' || q.difficultyLevel === selectedTierFilter;
      return matchSearch && matchCat && matchTier;
    });
  }, [allBankQuestions, questionSearch, selectedCategoryFilter, selectedTierFilter]);

  const handleOpenAddQuestion = () => {
    setEditingQuestion(null);
    setQCategory('psr');
    setQTier(2);
    setQChapterNum(1);
    setQChapterTitle('Statutory Code & Civil Service Compliance');
    setQText('');
    setQOptA('');
    setQOptB('');
    setQOptC('');
    setQOptD('');
    setQCorrectIdx(0);
    setQReference('PSR 030302');
    setQExplanation('');
    setQFeedbackMsg('');
    setIsQuestionModalOpen(true);
  };

  const handleOpenEditQuestion = (q: Question) => {
    setEditingQuestion(q);
    setQCategory(q.category);
    setQTier((q.difficultyLevel || 2) as 1 | 2 | 3 | 4);
    setQChapterNum(q.chapterNumber || 1);
    setQChapterTitle(q.chapterTitle || '');
    setQText(q.questionText);
    setQOptA(q.options[0] || '');
    setQOptB(q.options[1] || '');
    setQOptC(q.options[2] || '');
    setQOptD(q.options[3] || '');
    setQCorrectIdx(q.correctOptionIndex);
    setQReference(q.referenceRule || '');
    setQExplanation(q.explanation || '');
    setQFeedbackMsg('');
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !qOptA.trim() || !qOptB.trim()) {
      setQFeedbackMsg('Please enter valid question text and at least options A and B.');
      return;
    }

    const gradeCat =
      qTier === 1 ? 'GL 03 - GL 06' :
      qTier === 2 ? 'GL 07 - GL 10' :
      qTier === 3 ? 'GL 12 - GL 14' :
      'GL 15 - GL 16';

    const questionToSave: Question = {
      id: editingQuestion ? editingQuestion.id : `cms_q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      category: qCategory as any,
      categoryLabel: qCategory.toUpperCase(),
      chapterNumber: qChapterNum,
      chapterTitle: qChapterTitle,
      questionText: qText.trim(),
      options: [qOptA.trim(), qOptB.trim(), qOptC.trim() || 'Not specified', qOptD.trim() || 'None of the above'],
      correctOptionIndex: qCorrectIdx,
      explanation: qExplanation.trim(),
      referenceRule: qReference.trim(),
      difficultyLevel: qTier,
      gradeLevelCategory: gradeCat,
      tierCode: `TIER_${qTier}` as any,
    };

    saveCustomQuestion(questionToSave);
    setCustomQuestionsList(getCustomQuestions());
    setQFeedbackMsg('Question saved successfully into Question Bank!');
    setTimeout(() => {
      setIsQuestionModalOpen(false);
      setQFeedbackMsg('');
    }, 800);
  };

  const confirmDeleteQuestion = () => {
    if (questionToDelete) {
      deleteCustomQuestion(questionToDelete);
      setCustomQuestionsList(getCustomQuestions());
      setQuestionToDelete(null);
    }
  };

  const handleExportQuestionsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(allBankQuestions, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `FCTA_CBT_Questions_Pool_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
  };

  const handleExportQuestionsCSV = () => {
    const headers = ['ID', 'Category', 'Tier', 'GradeLevel', 'ChapterNum', 'ChapterTitle', 'QuestionText', 'OptionA', 'OptionB', 'OptionC', 'OptionD', 'CorrectIndex', 'ReferenceRule', 'Explanation'];
    const rows = allBankQuestions.map((q) => [
      `"${q.id}"`,
      `"${q.category}"`,
      `"${q.difficultyLevel || 2}"`,
      `"${q.gradeLevelCategory || ''}"`,
      `"${q.chapterNumber || ''}"`,
      `"${(q.chapterTitle || '').replace(/"/g, '""')}"`,
      `"${(q.questionText || '').replace(/"/g, '""')}"`,
      `"${(q.options[0] || '').replace(/"/g, '""')}"`,
      `"${(q.options[1] || '').replace(/"/g, '""')}"`,
      `"${(q.options[2] || '').replace(/"/g, '""')}"`,
      `"${(q.options[3] || '').replace(/"/g, '""')}"`,
      `"${q.correctOptionIndex}"`,
      `"${(q.referenceRule || '').replace(/"/g, '""')}"`,
      `"${(q.explanation || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FCTA_CBT_Questions_Bank_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportQuestionsJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          let count = 0;
          imported.forEach((q) => {
            if (q.questionText && Array.isArray(q.options)) {
              saveCustomQuestion({
                id: q.id && q.id.startsWith('cms_') ? q.id : `cms_imp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                category: q.category || 'psr',
                categoryLabel: q.categoryLabel || 'PSR',
                chapterNumber: q.chapterNumber || 1,
                chapterTitle: q.chapterTitle || '',
                questionText: q.questionText,
                options: q.options,
                correctOptionIndex: typeof q.correctOptionIndex === 'number' ? q.correctOptionIndex : 0,
                explanation: q.explanation || '',
                referenceRule: q.referenceRule || '',
                difficultyLevel: q.difficultyLevel || 2,
                gradeLevelCategory: q.gradeLevelCategory || 'GL 07 - GL 10',
                tierCode: q.tierCode || 'TIER_2',
              });
              count++;
            }
          });
          setCustomQuestionsList(getCustomQuestions());
          setImportNotification(`Successfully imported ${count} custom questions into the CMS!`);
          setTimeout(() => setImportNotification(null), 4000);
        }
      } catch (err) {
        console.error('Failed to parse question JSON file', err);
        setImportNotification('Error: Invalid JSON format. Please upload a valid Question array.');
        setTimeout(() => setImportNotification(null), 4000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // -------------------------------------------------------------------
  // ANNOUNCEMENTS ACTIONS
  // -------------------------------------------------------------------
  const handleOpenAddAnnouncement = () => {
    setEditingAnn(null);
    setAnnTitle('');
    setAnnContent('');
    setAnnType('info');
    setAnnTargetTiers('All Candidates');
    setIsAnnModalOpen(true);
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    const annToSave: PortalAnnouncement = {
      id: editingAnn ? editingAnn.id : `ann_${Date.now()}`,
      title: annTitle.trim(),
      content: annContent.trim(),
      type: annType,
      targetTiers: annTargetTiers,
      date: new Date().toISOString().slice(0, 10),
      isActive: true,
      author: 'sysadmin',
    };

    saveAnnouncement(annToSave);
    setAnnouncements(getAnnouncements());
    setIsAnnModalOpen(false);
  };

  const confirmDeleteAnnouncement = () => {
    if (announcementToDelete) {
      deleteAnnouncement(announcementToDelete);
      setAnnouncements(getAnnouncements());
      setAnnouncementToDelete(null);
    }
  };

  const handleToggleAnnouncement = (id: string) => {
    toggleAnnouncement(id);
    setAnnouncements(getAnnouncements());
  };

  // -------------------------------------------------------------------
  // CHAPTERS ACTIONS
  // -------------------------------------------------------------------
  const activeChapterList = useMemo(() => {
    if (selectedDomainForChapters === 'psr') return PSR_CHAPTERS;
    if (selectedDomainForChapters === 'fr') return FR_CHAPTERS;
    if (selectedDomainForChapters === 'ppa') return PPA_CHAPTERS;
    return FCT_GK_CHAPTERS;
  }, [selectedDomainForChapters]);

  const handleStartEditChapter = (ch: typeof PSR_CHAPTERS[0]) => {
    setEditingChapterNum(ch.chapterNumber);
    setChEditTitle(ch.title);
    setChEditOverview(ch.topicSummary);
    setChEditRef(ch.coreRuleOrActRef);
  };

  const handleSaveChapter = (chNum: number) => {
    saveCustomChapterContent({
      category: selectedDomainForChapters,
      chapterNumber: chNum,
      customTitle: chEditTitle,
      customOverview: chEditOverview,
      customReferenceRule: chEditRef,
      updatedAt: new Date().toISOString(),
    });
    setCustomChapters(getCustomChapterContents());
    setEditingChapterNum(null);
  };

  // -------------------------------------------------------------------
  // CADRES ACTIONS
  // -------------------------------------------------------------------
  const handleStartEditCadre = (cadre: typeof FCTA_CADRES[0]) => {
    setEditingCadreId(cadre.id);
    const existing = cadresContent.find((c) => c.cadreId === cadre.id);
    setCadreEditDesc(existing?.customDescription || cadre.description);
  };

  const handleSaveCadre = (cadreId: string) => {
    saveCustomCadreContent({
      cadreId,
      customDescription: cadreEditDesc,
      updatedAt: new Date().toISOString(),
    });
    setCadresContent(getCustomCadreContents());
    setEditingCadreId(null);
  };

  return (
    <div className={`space-y-6 ${isNavyWhite ? 'text-slate-800' : 'text-slate-100'}`}>
      {/* Top Banner & Return Button */}
      <div className={`rounded-3xl p-5 sm:p-6 border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#0b1e3b] border-blue-900'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-950 border border-purple-400 flex items-center justify-center text-white shadow-lg">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-xl sm:text-2xl tracking-tight text-blue-950 dark:text-white">
                Portal Content Management Studio (CMS)
              </h2>
              <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                Admin CMS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-blue-200/80">
              Manage CBT Questions, Statutory Syllabus, Portal Announcements, and 23 Cadres Mandates
            </p>
          </div>
        </div>

        <button
          onClick={onBackToAdminOverview}
          className="px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Overview</span>
        </button>
      </div>

      {/* CMS Module Tabs */}
      <div className={`flex border-b overflow-x-auto pb-px ${isNavyWhite ? 'border-blue-200' : 'border-blue-900'}`}>
        <nav className="flex space-x-2 sm:space-x-4 text-xs sm:text-sm font-semibold">
          {[
            { id: 'questions', label: `Question Bank (${allBankQuestions.length})`, icon: HelpCircle },
            { id: 'announcements', label: `Announcements (${announcements.length})`, icon: Bell },
            { id: 'chapters', label: 'Learning Hub & Syllabus (80 Chapters)', icon: BookOpen },
            { id: 'cadres', label: `Cadres & SDAs (${FCTA_CADRES.length})`, icon: Building2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = cmsTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCmsTab(tab.id as any)}
                className={`py-2.5 px-4 rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? isNavyWhite
                      ? 'bg-white text-blue-950 border-b-2 border-purple-600 shadow-xs'
                      : 'bg-[#0b1e3b] text-white border-b-2 border-purple-400'
                    : isNavyWhite
                    ? 'text-slate-600 hover:text-blue-950 hover:bg-blue-50/60'
                    : 'text-blue-300 hover:text-white hover:bg-blue-950/60'
                }`}
              >
                <Icon className="w-4 h-4 text-purple-500" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ========================================================= */}
      {/* 1. QUESTIONS CMS */}
      {/* ========================================================= */}
      {cmsTab === 'questions' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
            isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#0b1e3b] border-blue-900'
          }`}>
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={questionSearch}
                onChange={(e) => setQuestionSearch(e.target.value)}
                placeholder="Search questions by text or statutory reference..."
                className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                  isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                }`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className={`py-2 px-3 rounded-xl text-xs border focus:outline-none ${
                  isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                }`}
              >
                <option value="all">All Subject Categories</option>
                <option value="psr">Public Service Rules (PSR)</option>
                <option value="fr">Financial Regulations (FR)</option>
                <option value="ppa">Public Procurement Act (PPA)</option>
                <option value="fct_gk">FCT General Knowledge</option>
                {FCTA_CADRES.map((c) => (
                  <option key={c.id} value={c.id}>{c.shortName} Cadre</option>
                ))}
              </select>

              <select
                value={selectedTierFilter}
                onChange={(e) => setSelectedTierFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className={`py-2 px-3 rounded-xl text-xs border focus:outline-none ${
                  isNavyWhite ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                }`}
              >
                <option value="all">All Tiers (1 to 4)</option>
                <option value={1}>Tier 1 (GL 03 - 06)</option>
                <option value={2}>Tier 2 (GL 07 - 10)</option>
                <option value={3}>Tier 3 (GL 12 - 14)</option>
                <option value={4}>Tier 4 (GL 15 - 16)</option>
              </select>

              <button
                onClick={handleOpenAddQuestion}
                className="py-2 px-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Question</span>
              </button>

              <button
                onClick={handleExportQuestionsCSV}
                className="py-2 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                title="Export Questions to CSV"
              >
                <Download className="w-3.5 h-3.5 text-blue-500" />
                <span>CSV</span>
              </button>

              <button
                onClick={handleExportQuestionsJSON}
                className="py-2 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                title="Export Questions to JSON"
              >
                <Download className="w-3.5 h-3.5 text-purple-500" />
                <span>JSON</span>
              </button>

              <label 
                className="py-2 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                title="Import Questions from JSON"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-500" />
                <span>Import</span>
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleImportQuestionsJSON} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          {importNotification && (
            <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-800 dark:text-purple-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span>{importNotification}</span>
            </div>
          )}

          {/* Questions Table */}
          <div className={`rounded-2xl border overflow-hidden shadow-xl ${
            isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#0b1e3b] border-blue-900'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className={`text-[11px] uppercase tracking-wider font-extrabold border-b ${
                  isNavyWhite ? 'bg-purple-50/70 text-purple-950 border-purple-200' : 'bg-purple-950/70 text-purple-200 border-purple-900'
                }`}>
                  <tr>
                    <th className="py-3 px-4">Tier / GL</th>
                    <th className="py-3 px-4">Domain</th>
                    <th className="py-3 px-4">Question Text</th>
                    <th className="py-3 px-4">Statutory Reference</th>
                    <th className="py-3 px-4 text-center">Correct Ans</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-blue-900/60 font-sans">
                  {filteredQuestions.slice(0, 40).map((q) => (
                    <tr key={q.id} className="hover:bg-purple-50/30 dark:hover:bg-purple-950/20 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold">
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs">
                          {q.tierCode || `Tier ${q.difficultyLevel || 2}`}
                        </span>
                      </td>
                      <td className="py-3 px-4 uppercase text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {q.category}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white max-w-md truncate" title={q.questionText}>
                        {q.questionText}
                      </td>
                      <td className="py-3 px-4 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                        {q.referenceRule || 'Civil Service Code'}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-blue-600">
                        Option {String.fromCharCode(65 + q.correctOptionIndex)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditQuestion(q)}
                            className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors cursor-pointer"
                            title="Edit Question"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {q.id.startsWith('cms_') && (
                            <button
                              onClick={() => setQuestionToDelete(q.id)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors cursor-pointer"
                              title="Delete Custom Question"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredQuestions.length > 40 && (
              <div className="p-3 text-center text-xs text-slate-400 border-t border-slate-200 dark:border-blue-900">
                Showing first 40 of {filteredQuestions.length} matched questions. Use filters above to narrow search.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. ANNOUNCEMENTS CMS */}
      {/* ========================================================= */}
      {cmsTab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <Bell className="w-4 h-4 text-purple-600" />
              Candidate Portal Notices & Broadcasts
            </h3>
            <button
              onClick={handleOpenAddAnnouncement}
              className="py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Announcement</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className={`p-5 rounded-2xl border transition-all space-y-3 relative ${
                  isNavyWhite ? 'bg-white border-blue-200 shadow-sm' : 'bg-[#0b1e3b] border-blue-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                    ann.type === 'alert' || ann.type === 'urgent'
                      ? 'bg-rose-500/20 text-rose-700 dark:text-rose-400 border-rose-500/30'
                      : ann.type === 'success'
                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                      : 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30'
                  }`}>
                    {ann.type}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400">
                    {ann.date}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {ann.title}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                  {ann.content}
                </p>

                <div className="pt-2 border-t border-slate-200 dark:border-blue-900 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleToggleAnnouncement(ann.id)}
                    className={`font-semibold cursor-pointer ${
                      ann.isActive ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  >
                    {ann.isActive ? '● Live on Portal' : '○ Hidden (Draft)'}
                  </button>

                  <button
                    onClick={() => setAnnouncementToDelete(ann.id)}
                    className="text-rose-500 hover:text-rose-700 cursor-pointer"
                    title="Delete Announcement"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. CHAPTERS & SYLLABUS CMS */}
      {/* ========================================================= */}
      {cmsTab === 'chapters' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-blue-900 pb-3">
            <div>
              <h3 className="font-extrabold text-base">Civil Service Syllabus & Chapters Catalog</h3>
              <p className="text-xs text-slate-500 dark:text-blue-300">
                Customize codified rule descriptions and statutory references across 80 syllabus chapters.
              </p>
            </div>

            <div className="flex gap-2">
              {[
                { id: 'psr', label: 'PSR (20 Ch)' },
                { id: 'fr', label: 'FR (20 Ch)' },
                { id: 'ppa', label: 'PPA (20 Ch)' },
                { id: 'fct_gk', label: 'FCT GK (20 Ch)' },
              ].map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomainForChapters(domain.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedDomainForChapters === domain.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {domain.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeChapterList.map((ch) => {
              const isEditing = editingChapterNum === ch.chapterNumber;
              const custom = customChapters.find(
                (c) => c.category === selectedDomainForChapters && c.chapterNumber === ch.chapterNumber
              );

              return (
                <div
                  key={ch.chapterNumber}
                  className={`p-4 rounded-2xl border transition-all ${
                    isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#0b1e3b] border-blue-900'
                  }`}
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="font-bold text-xs uppercase text-purple-600">
                        Editing Chapter {ch.chapterNumber}
                      </div>
                      <input
                        type="text"
                        value={chEditTitle}
                        onChange={(e) => setChEditTitle(e.target.value)}
                        placeholder="Chapter Title"
                        className="w-full p-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                      <input
                        type="text"
                        value={chEditRef}
                        onChange={(e) => setChEditRef(e.target.value)}
                        placeholder="Statutory Rule Reference (e.g. PSR 030301)"
                        className="w-full p-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                      />
                      <textarea
                        value={chEditOverview}
                        onChange={(e) => setChEditOverview(e.target.value)}
                        rows={3}
                        placeholder="Chapter Overview / Study Notes"
                        className="w-full p-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingChapterNum(null)}
                          className="px-3 py-1.5 rounded-xl border text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveChapter(ch.chapterNumber)}
                          className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-mono font-bold text-purple-600">
                          Chapter {ch.chapterNumber}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                            {custom?.customReferenceRule || ch.coreRuleOrActRef}
                          </span>
                          <button
                            onClick={() => handleStartEditChapter(ch)}
                            className="p-1 rounded text-slate-400 hover:text-purple-600 cursor-pointer"
                            title="Edit Chapter Notes"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {custom?.customTitle || ch.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-300 mt-1 line-clamp-2">
                        {custom?.customOverview || ch.topicSummary}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. CADRES & SDAS CMS */}
      {/* ========================================================= */}
      {cmsTab === 'cadres' && (
        <div className="space-y-4">
          <div className="border-b border-slate-200 dark:border-blue-900 pb-3">
            <h3 className="font-extrabold text-base">23 FCTA Professional Cadres & Mandates</h3>
            <p className="text-xs text-slate-500 dark:text-blue-300">
              Review and customize cadre descriptions, functional duties, and career scopes for candidate onboarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FCTA_CADRES.map((cadre) => {
              const isEditing = editingCadreId === cadre.id;
              const custom = cadresContent.find((c) => c.cadreId === cadre.id);

              return (
                <div
                  key={cadre.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isNavyWhite ? 'bg-white border-blue-200' : 'bg-[#0b1e3b] border-blue-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-purple-600 uppercase">
                      {cadre.shortName}
                    </span>
                    <button
                      onClick={() => handleStartEditCadre(cadre)}
                      className="p-1 rounded text-slate-400 hover:text-purple-600 cursor-pointer"
                      title="Edit Cadre Information"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                    {cadre.name}
                  </h4>

                  {isEditing ? (
                    <div className="space-y-2 mt-2">
                      <textarea
                        value={cadreEditDesc}
                        onChange={(e) => setCadreEditDesc(e.target.value)}
                        rows={3}
                        className="w-full p-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingCadreId(null)}
                          className="px-3 py-1 rounded-xl border text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveCadre(cadre.id)}
                          className="px-3 py-1 rounded-xl bg-purple-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                      {custom?.customDescription || cadre.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT QUESTION */}
      {/* ========================================================= */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className={`w-full max-w-2xl rounded-3xl p-6 border shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto ${
            isNavyWhite ? 'bg-white border-purple-200 text-slate-900' : 'bg-[#0b1e3b] border-purple-900 text-white'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-blue-900">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-600" />
                {editingQuestion ? 'Edit Question in Repository' : 'Add New Question to Bank'}
              </h3>
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {qFeedbackMsg && (
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 text-purple-800 dark:text-purple-300 text-xs">
                {qFeedbackMsg}
              </div>
            )}

            <form onSubmit={handleSaveQuestion} className="space-y-3.5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Domain Category</label>
                  <select
                    value={qCategory}
                    onChange={(e) => setQCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  >
                    <option value="psr">Public Service Rules (PSR)</option>
                    <option value="fr">Financial Regulations (FR)</option>
                    <option value="ppa">Public Procurement Act (PPA)</option>
                    <option value="fct_gk">FCT General Knowledge</option>
                    {FCTA_CADRES.map((c) => (
                      <option key={c.id} value={c.id}>{c.shortName} Cadre</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Target CBT Promotion Tier</label>
                  <select
                    value={qTier}
                    onChange={(e) => setQTier(Number(e.target.value) as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  >
                    <option value={1}>Tier 1 (GL 03 - GL 06: Junior / Operative)</option>
                    <option value={2}>Tier 2 (GL 07 - GL 10: Intermediate / Executive)</option>
                    <option value={3}>Tier 3 (GL 12 - GL 14: Senior Professional)</option>
                    <option value={4}>Tier 4 (GL 15 - GL 16: Directorate Leadership)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Question Text</label>
                <textarea
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  rows={3}
                  placeholder="Enter the full scenario-based question text..."
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase">
                  Options (Select radio for the correct option)
                </label>
                {[
                  { label: 'Option A', val: qOptA, set: setQOptA, idx: 0 },
                  { label: 'Option B', val: qOptB, set: setQOptB, idx: 1 },
                  { label: 'Option C', val: qOptC, set: setQOptC, idx: 2 },
                  { label: 'Option D', val: qOptD, set: setQOptD, idx: 3 },
                ].map((opt) => (
                  <div key={opt.idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={qCorrectIdx === opt.idx}
                      onChange={() => setQCorrectIdx(opt.idx)}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={opt.val}
                      onChange={(e) => opt.set(e.target.value)}
                      placeholder={`${opt.label} text`}
                      className="flex-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs"
                      required={opt.idx < 2}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Statutory Reference Rule</label>
                  <input
                    type="text"
                    value={qReference}
                    onChange={(e) => setQReference(e.target.value)}
                    placeholder="e.g. PSR 030302 / FR 105 / PPA Sec 16"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Chapter Title</label>
                  <input
                    type="text"
                    value={qChapterTitle}
                    onChange={(e) => setQChapterTitle(e.target.value)}
                    placeholder="e.g. Disciplinary Procedures"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Official Statutory Explanation</label>
                <textarea
                  value={qExplanation}
                  onChange={(e) => setQExplanation(e.target.value)}
                  rows={2}
                  placeholder="Explain why the chosen option is correct per civil service rules..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer shadow-md"
                >
                  Save Question to Repository
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT ANNOUNCEMENT */}
      {/* ========================================================= */}
      {isAnnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl space-y-4 ${
            isNavyWhite ? 'bg-white border-purple-200 text-slate-900' : 'bg-[#0b1e3b] border-purple-900 text-white'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-blue-900">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <Bell className="w-5 h-5 text-purple-600" />
                Create Candidate Announcement
              </h3>
              <button
                onClick={() => setIsAnnModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAnnouncement} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Announcement Title</label>
                <input
                  type="text"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. 2026 FCTA Promotion CBT Examination Timetable"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Notice Type</label>
                  <select
                    value={annType}
                    onChange={(e) => setAnnType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  >
                    <option value="info">Info</option>
                    <option value="alert">Alert (Pass Mark / Rule)</option>
                    <option value="urgent">Urgent</option>
                    <option value="success">Success</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Target Audience</label>
                  <input
                    type="text"
                    value={annTargetTiers}
                    onChange={(e) => setAnnTargetTiers(e.target.value)}
                    placeholder="e.g. All Tiers / GL 07-16"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Message Content</label>
                <textarea
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  rows={4}
                  placeholder="Enter details of the notice displayed to candidates on portal..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAnnModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer shadow-md"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: DELETE QUESTION CONFIRMATION */}
      {/* ========================================================= */}
      {questionToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl space-y-4 ${
            isNavyWhite ? 'bg-white border-rose-200 text-slate-900' : 'bg-[#0b1e3b] border-rose-900 text-white'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-600">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base">Delete Custom Question?</h3>
                <p className="text-xs text-slate-500 dark:text-rose-200">
                  This action will permanently delete this question from the CMS repository.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setQuestionToDelete(null)}
                className="px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteQuestion}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer shadow-md"
              >
                Delete Question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: DELETE ANNOUNCEMENT CONFIRMATION */}
      {/* ========================================================= */}
      {announcementToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl space-y-4 ${
            isNavyWhite ? 'bg-white border-rose-200 text-slate-900' : 'bg-[#0b1e3b] border-rose-900 text-white'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-600">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base">Delete Announcement?</h3>
                <p className="text-xs text-slate-500 dark:text-rose-200">
                  This notice will be removed from candidate announcement boards.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setAnnouncementToDelete(null)}
                className="px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAnnouncement}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer shadow-md"
              >
                Delete Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
