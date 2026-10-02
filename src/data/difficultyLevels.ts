// Four-Tier Civil Service Promotion & CBT Examination Framework (GL 03 to GL 16)
// Aligned with the Federal Civil Service Commission (FCSC) & FCTA Civil Service Commission guidelines

export interface DifficultyTierInfo {
  level: number; // 1, 2, 3, or 4
  code: 'TIER_1' | 'TIER_2' | 'TIER_3' | 'TIER_4' | 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LEVEL_4';
  tierNumber: 1 | 2 | 3 | 4;
  title: string;
  badgeLabel: string;
  shortBadge: string;
  gradeLevels: string; // e.g. "GL 03 - GL 06"
  targetRanks: string; // e.g. "Clerical Assistants, Office Assistants, Drivers, Artisans"
  cognitiveFocus: string;
  statutoryScope: string;
  questionArchetypes: string[];
  passingRequirement: string;
  description: string;
  colorScheme: {
    primary: string;
    border: string;
    bg: string;
    text: string;
    badge: string;
  };
}

export const DIFFICULTY_TIERS: DifficultyTierInfo[] = [
  {
    level: 1,
    tierNumber: 1,
    code: 'TIER_1',
    title: 'Tier 1: Junior / Sub-Clerical & Operative Cadre',
    badgeLabel: 'Tier 1: Junior Cadre (GL 03 - 06)',
    shortBadge: 'Tier 1 (GL 03-06)',
    gradeLevels: 'GL 03 - GL 06',
    targetRanks: 'Clerical Assistants, Office Assistants, Drivers, Messengers, Artisans, Executive Assistants II/III',
    cognitiveFocus: 'Basic office routines, record handling, official etiquette, core civil service conduct, working hours, casual leave entitlement, workplace safety, and basic FCT administrative knowledge.',
    statutoryScope: 'PSR Fundamental Rules (attendance, conduct, dress code, official channels, casual leaves), Basic Storekeeping & Petty Cash Vouchers (FR basics), Basic Procurement requisition concepts (PPA basics), FCT Area Councils and historical creation.',
    questionArchetypes: [
      'Basic rule recall: official office working hours (8:00 AM - 4:00 PM), dress code, and identity badge rules',
      'Registry & filing operations: inwards/outwards mail book, file transit registers, confidential jacket handling',
      'Leave regulations for junior staff: casual leave ceilings, public holiday provisions, sick leave certification',
      'Fundamental FCT geography: the 6 Area Councils (AMAC, Bwari, Gwagwalada, Kuje, Kwali, Abaji) and creation year (1976)'
    ],
    passingRequirement: '50% statutory threshold (60%+ for competitive merit list elevation)',
    description: 'Designed for junior and operational cadre staff establishing mastery of civil service discipline, office hygiene, administrative procedures, and frontline responsibilities.',
    colorScheme: {
      primary: 'emerald-600',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    }
  },
  {
    level: 2,
    tierNumber: 2,
    code: 'TIER_2',
    title: 'Tier 2: Intermediate / Officer II & Executive Cadre',
    badgeLabel: 'Tier 2: Officer & Executive (GL 07 - 10)',
    shortBadge: 'Tier 2 (GL 07-10)',
    gradeLevels: 'GL 07 - GL 10',
    targetRanks: 'Officer II (GL 07), Officer I (GL 08), Senior Officer (GL 09), Principal Officer (GL 10) / Higher Executive Officers (COMPRO Candidates)',
    cognitiveFocus: 'Codified PSR rules comprehension, confirmation exam (COMPRO) standards, disciplinary queries & timelines (72 hours rule), vote book maintenance, financial accounting vouchers, introductory procurement procedures, departmental operations, and FCTA organogram.',
    statutoryScope: 'PSR Chapters 1-8 (probation, confirmation, discipline, petitions, annual leave), Financial Regulations (vote books, payment vouchers, TSA operations, revenue collectors), PPA 2007 (thresholds, bid evaluation, tender notices), FCTA Mandate Secretariats & Departments.',
    questionArchetypes: [
      'Direct rule application: probationary tenure, 72-hour disciplinary query rules, misconduct classifications',
      'Financial compliance: verification of payment vouchers, loss of public funds reporting, imprest retirement',
      'Procurement basics: Departmental Tenders Board composition, bid receipt, non-discrimination in bidding',
      'FCTA governance: mandates of Health, Education, ARDS, and Transportation Secretariats'
    ],
    passingRequirement: '60% statutory threshold for confirmation & promotion',
    description: 'Calibrated for junior-to-mid career professional officers and executive officers mastering statutory regulations, operational execution, and departmental procedures.',
    colorScheme: {
      primary: 'blue-600',
      border: 'border-blue-500/40',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    }
  },
  {
    level: 3,
    tierNumber: 3,
    code: 'TIER_3',
    title: 'Tier 3: Senior Supervisory & Management Cadre',
    badgeLabel: 'Tier 3: Senior & Management (GL 12 - 14)',
    shortBadge: 'Tier 3 (GL 12-14)',
    gradeLevels: 'GL 12 - GL 14',
    targetRanks: 'Assistant Chief Officer (GL 12), Chief Officer (GL 13), Assistant Director / Chief Executive Officer (GL 14) / Sectional & Branch Heads',
    cognitiveFocus: 'Supervisory administration, committee leadership, inter-departmental synergy, formal disciplinary tribunal inquiries, audit query resolution, Ministerial Tenders Board thresholds, budget preparation, performance management (PMS/APER), and project delivery.',
    statutoryScope: 'PSR Disciplinary & Petitions Framework (interdiction, withholding of increments, termination), FR Expenditure Controls (Internal Audit queries, virement protocols, e-payment guidelines), PPA 2007 (tender splitting sanctions, BPP No-Objection requests, margin of preference), FCTA Master Plan enforcement & AGIS land titling.',
    questionArchetypes: [
      'Disciplinary tribunals: rules of natural justice, handling serious misconduct appeals, interdiction salary rules',
      'Financial governance: handling external audit queries from Auditor-General, special inquiries, capital vote retirement',
      'Procurement management: Ministerial Tenders Board evaluation criteria, bid security validity, bid opening formalities',
      'Master Plan compliance: Development Control demolition procedures, land use conversions, inter-agency taskforces'
    ],
    passingRequirement: '60% statutory minimum (65%+ recommended for competitive promotion quotas)',
    description: 'Calibrated for sectional heads, senior program managers, and division chiefs responsible for supervisory oversight, quality control, and regulatory compliance.',
    colorScheme: {
      primary: 'purple-600',
      border: 'border-purple-500/40',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    }
  },
  {
    level: 4,
    tierNumber: 4,
    code: 'TIER_4',
    title: 'Tier 4: Directorate & Executive Leadership Cadre',
    badgeLabel: 'Tier 4: Directorate (GL 15 - 16)',
    shortBadge: 'Tier 4 (GL 15-16)',
    gradeLevels: 'GL 15 - GL 16',
    targetRanks: 'Deputy Director (GL 15), Director (GL 16) / Senior Directorate & Executive Management',
    cognitiveFocus: 'High-level policy formulation, Cabinet / Council memoranda drafting, strategic inter-secretariat conflict resolution, Federal Executive Council (FEC) procurement approvals, constitutional authority under Sections 299 & 302 CFRN 1999, FCTA Civil Service Commission Act, Land Use Act stewardship, senior administrative jurisprudence.',
    statutoryScope: 'Directorate-level PSR (tenure policy, public interest retirement, executive disciplinary referrals), Fiscal Responsibility Act vs. FR harmonization, PPA Section 58 penal liability & national procurement thresholds, FCTA Civil Service Commission Act 2018/2023, Land Use Act 1978 ministerial powers.',
    questionArchetypes: [
      'Constitutional jurisprudence: FCTA executive governance under 1999 Constitution Sections 299, 301 & 302',
      'Strategic procurement: high-threshold FEC approvals, BPP Certificate of "No Objection", emergency procurement justification',
      'Council Memoranda drafting: Cabinet secretariat format, financial implications justification, inter-ministerial concurrence',
      'Senior administrative law: ultra vires actions, statutory appeals, judicial review protections, executive leadership ethics'
    ],
    passingRequirement: '60% statutory pass mark (70%+ required for substantive Director elevation)',
    description: 'Calibrated specifically for Directorate-rank candidates facing promotional examinations, complex scenario analysis, and executive leadership boards.',
    colorScheme: {
      primary: 'amber-600',
      border: 'border-amber-500/40',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    }
  }
];

export function getDifficultyTier(level: number = 3): DifficultyTierInfo {
  return DIFFICULTY_TIERS.find((t) => t.level === level) || DIFFICULTY_TIERS[1];
}

export function getDifficultyForGradeLevel(gradeLevel: string): DifficultyTierInfo {
  const glClean = gradeLevel.toUpperCase().replace(/\s+/g, '');
  const num = parseInt(glClean.replace('GL', ''), 10);

  if (isNaN(num)) return DIFFICULTY_TIERS[1]; // Default to Tier 2 (GL 07 - 10)

  if (num <= 6) return DIFFICULTY_TIERS[0]; // Tier 1: GL 03 - 06
  if (num <= 10) return DIFFICULTY_TIERS[1]; // Tier 2: GL 07 - 10
  if (num <= 14) return DIFFICULTY_TIERS[2]; // Tier 3: GL 12 - 14
  return DIFFICULTY_TIERS[3]; // Tier 4: GL 15 - 16
}

// Backward-compatibility exports
export const LEVEL_3_DIRECTORATE_TIER = DIFFICULTY_TIERS[3]; // Tier 4
