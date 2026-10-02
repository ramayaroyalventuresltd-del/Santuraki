import { Question } from '../types';

// High-Yield Tier 1 (GL 03 - GL 06: Junior / Sub-Clerical & Operative Cadre) Questions
// Focuses on official working hours, registry & filing procedures, basic office etiquette, 
// store handling, petty cash vouchers, FCT Area Councils, and civil service conduct.

export const TIER_1_JUNIOR_QUESTIONS: Question[] = [
  // --- PSR Tier 1 (GL 03 - GL 06) ---
  {
    id: 't1_psr_01',
    category: 'psr',
    categoryLabel: 'Public Service Rules (PSR)',
    chapterNumber: 1,
    chapterTitle: 'Civil Service Conduct, Attendance & Punctuality',
    questionText: '[Tier 1 Junior Cadre: GL 03 - 06] What are the official working hours for civil servants in the Federal Capital Territory and federal ministries on working days (Monday to Friday)?',
    options: [
      '8:00 AM to 4:00 PM',
      '7:00 AM to 3:00 PM',
      '9:00 AM to 5:00 PM',
      '8:30 AM to 3:30 PM'
    ],
    correctOptionIndex: 0,
    explanation: 'Under the Public Service Rules (PSR), standard official office hours in the federal civil service and FCTA are from 8:00 AM to 4:00 PM, Monday through Friday.',
    referenceRule: 'PSR Chapter 1 / OHCSF Guidelines',
    difficultyLevel: 1,
    gradeLevelCategory: 'GL 03 - GL 06',
    tierCode: 'TIER_1'
  },
  {
    id: 't1_psr_02',
    category: 'psr',
    categoryLabel: 'Public Service Rules (PSR)',
    chapterNumber: 1,
    chapterTitle: 'Office Attendance & Registry Records',
    questionText: '[Tier 1 Junior Cadre: GL 03 - 06] What official register must all junior officers sign immediately upon arrival at work each morning and at the close of work?',
    options: [
      'The Staff Attendance / Time-Book Register',
      'The Monthly Pay Voucher',
      'The Stores Requisition Ledger',
      'The Vehicle Logbook'
    ],
    correctOptionIndex: 0,
    explanation: 'All officers are required to sign the Attendance Register (Time-Book) daily upon arrival and departure. Signing for an absent colleague constitutes serious misconduct.',
    referenceRule: 'PSR 030301 / Civil Service Manual',
    difficultyLevel: 1,
    gradeLevelCategory: 'GL 03 - GL 06',
    tierCode: 'TIER_1'
  },
  {
    id: 't1_psr_03',
    category: 'psr',
    categoryLabel: 'Public Service Rules (PSR)',
    chapterNumber: 2,
    chapterTitle: 'Leave Regulations & Casual Absences',
    questionText: '[Tier 1 Junior Cadre: GL 03 - 06] What is the maximum number of days of casual leave that may be granted to an officer in any single calendar year under the Public Service Rules?',
    options: [
      'Seven (7) working days',
      'Fourteen (14) working days',
      'Twenty-one (21) working days',
      'Thirty (30) working days'
    ],
    correctOptionIndex: 0,
    explanation: 'Pursuant to PSR leave guidelines, casual leave is granted for urgent personal circumstances and shall not exceed a cumulative total of seven (7) working days in any single calendar year.',
    referenceRule: 'PSR 100201 / Leave Regulations',
    difficultyLevel: 1,
    gradeLevelCategory: 'GL 03 - GL 06',
    tierCode: 'TIER_1'
  },
  {
    id: 't1_psr_04',
    category: 'psr',
    categoryLabel: 'Public Service Rules (PSR)',
    chapterNumber: 3,
    chapterTitle: 'Discipline & Official Channels of Communication',
    questionText: '[Tier 1 Junior Cadre: GL 03 - 06] If a junior clerical assistant or driver receives an official grievance or request, through which channel must it be formally submitted?',
    options: [
      'Through their immediate sectional supervisor to the Head of Department',
      'Directly to external newspaper journalists',
      'By posting the issue on a personal social media account',
      'Directly to the Honourable Minister of the FCT bypassing all superiors'
    ],
    correctOptionIndex: 0,
    explanation: 'Civil service hierarchy requires that all official representations, grievances, and requests be submitted through the officer’s immediate supervisor. Bypassing official channels is a breach of discipline.',
    referenceRule: 'PSR 090101 / Official Channels',
    difficultyLevel: 1,
    gradeLevelCategory: 'GL 03 - GL 06',
    tierCode: 'TIER_1'
  },
  {
    id: 't1_psr_05',
    category: 'psr',
    categoryLabel: 'Public Service Rules (PSR)',
    chapterNumber: 4,
    chapterTitle: 'Confidentiality & Official Secrets',
    questionText: '[Tier 1 Junior Cadre: GL 03 - 06] What statutory oath must every staff member in the public service subscribe to regarding official documents and classified files?',
    options: [
      'The Oath of Secrecy under the Official Secrets Act',
      'The Oath of Financial Investment',
      'The Oath of Political Affiliation',
      'The Judicial Magistrates Oath'
    ],
    correctOptionIndex: 0,
    explanation: 'Every officer handling government business is bound by the Oath of Secrecy under the Official Secrets Act, prohibiting unauthorized disclosure or reproduction of official records.',
    referenceRule: 'Official Secrets Act / PSR 030403',
    difficultyLevel: 1,
    gradeLevelCategory: 'GL 03 - GL 06',
    tierCode: 'TIER_1'
  },

  // --- FR Tier 1 (GL 03 - GL 06) ---
  {
    id: 't1_fr_01',
    category: 'fr',
    categoryLabel: 'Financial Regulations (FR)',
    chapterNumber: 1,
    chapterTitle: 'Custody of Public Stores & Inventory',
    questionText: '[Tier 1 Junior Cadre: GL 03 - 06] In government office storekeeping, which document is kept alongside goods in store to record every addition and withdrawal of items?',
    options: [
      'Bin Card (Stock Card)',
      'Bank Reconciliation Statement',
      'Treasury Single Account (TSA) Schedule',
      'Council Memorandum'
    ],
    correctOptionIndex: 0,
    explanation: 'Under Financial Regulations (FR Chapter 28), every storekeeper must maintain a Bin Card (Stock Card) attached to shelves or bins to record exact stock quantities received and issued.',
    referenceRule: 'FR 2804 / Storekeeping Regulations',
    difficultyLevel: 1,
    gradeLevelCategory: 'GL 03 - GL 06',
    tierCode: 'TIER_1'
  },
  {
    id: 't1_fr_02',
    category: 'fr',
    categoryLabel: 'Financial Regulations (FR)',
    chapterNumber: 2,
    chapterTitle: 'Petty Cash & Payment Vouchers',
    questionText: '[Tier 1 Junior Cadre: GL 03 - 06] What is the designated official voucher used for minor, urgent office expenditures such as emergency dispatch fares or cleaning supplies?',
    options: [
      'Petty Cash Voucher',
      'Capital Project Certificate',
      'Contract Milestone Valuation Sheet',
      'BPP No-Objection Certificate'
    ],
    correctOptionIndex: 0,
    explanation: 'Petty Cash Vouchers are used to disburse and retire minor cash expenditures from approved departmental standing imprests in strict compliance with FR.',
    referenceRule: 'FR 1007 / Imprest Procedures',
    difficultyLevel: 1,
    gradeLevelCategory: 'GL 03 - GL 06',
    tierCode: 'TIER_1'
  },
  {
    id: 't1_fr_03',
    category: 'fr',
    categoryLabel: 'Financial Regulations (FR)',
    chapterNumber: 3,
    chapterTitle: 'Public Property & Government Vehicles',
    questionText: '[Tier 1 Junior Cadre: GL 03 - 06] What vital record must a government driver enter before and after every official trip in an FCTA departmental pool vehicle?',
    options: [
      'Vehicle Logbook (recording departure time, destination, mileage, and officer authorizing)',
      'The National Gazette',
      'The Departmental Vote Book',
      'The Annual Budget Defense Summary'
    ],
    correctOptionIndex: 0,
    explanation: 'Financial Regulations and Transport Rules mandate that all official vehicles maintain a Vehicle Logbook to record mileage, fuel consumed, destination, and the authorizing officer.',
    referenceRule: 'FR 2101 / Transport Regulations',
    difficultyLevel: 1,
    gradeLevelCategory: 'GL 03 - GL 06',
    tierCode: 'TIER_1'
  },

  // --- PPA Tier 1 (GL 03 - GL 06) ---
  {
    id: 't1_ppa_01',
    category: 'ppa',
    categoryLabel: 'Public Procurement Act (PPA 2007)',
    chapterNumber: 1,
    chapterTitle: 'Procurement Basics & Store Issues',
    questionText: '[Tier 1 Junior Cadre: GL 03 - 06] When an office unit requires stationery or computer paper from the central department store, what formal document must be filled and signed?',
    options: [
      'Store Issue Requisition Voucher (SIV)',
      'Certificate of No Objection',
      'Letters of Credit',
      'Federal Executive Council Memo'
    ],
    correctOptionIndex: 0,
    explanation: 'Office stationery and consumables must be requisitioned using an approved Store Issue Requisition Voucher (SIV) endorsed by the Sectional Head.',
    referenceRule: 'PPA 2007 Stores Guidelines / FR 2901',
    difficultyLevel: 1,
    gradeLevelCategory: 'GL 03 - GL 06',
    tierCode: 'TIER_1'
  },
  {
    id: 't1_ppa_02',
    category: 'ppa',
    categoryLabel: 'Public Procurement Act (PPA 2007)',
    chapterNumber: 2,
    chapterTitle: 'Receipt & Inspection of Goods',
    questionText: '[Tier 1 Junior Cadre: GL 03 - 06] What is the primary duty of junior store officers when goods ordered by FCTA are delivered by an external supplier?',
    options: [
      'Verifying the delivery note against physical quantities and reporting any damaged or missing items to the store supervisor',
      'Reselling excess items immediately to private shopkeepers',
      'Signing payment cheques without inspecting the physical goods',
      'Allowing goods to be unloaded without taking any count'
    ],
    correctOptionIndex: 0,
    explanation: 'Store officers must conduct thorough physical counts and quality checks against the delivery note, raising a Goods Received Note (GRN) before goods are accepted into stock.',
    referenceRule: 'PPA 2007 Sec 60 / Store Receipts',
    difficultyLevel: 1,
    gradeLevelCategory: 'GL 03 - GL 06',
    tierCode: 'TIER_1'
  },

  // --- FCT General Knowledge Tier 1 (GL 03 - GL 06) ---
  {
    id: 't1_fct_01',
    category: 'fct_gk',
    categoryLabel: 'FCT General Knowledge & Governance',
    chapterNumber: 1,
    chapterTitle: 'Creation of Abuja & Historical Background',
    questionText: '[Tier 1 Junior Cadre: GL 03 - 06] In which year was the Federal Capital Territory, Abuja, officially created as Nigeria’s new Federal Capital by the Federal Military Government?',
    options: [
      '1976 (under Decree No. 6 of 1976)',
      '1960',
      '1999',
      '1985'
    ],
    correctOptionIndex: 0,
    explanation: 'Abuja was created on 4th February 1976 by the Federal Military Government led by General Murtala Ramat Muhammed following the recommendations of the Justice Akinola Aguda Panel.',
    referenceRule: 'Decree No. 6 of 1976 / FCT Act Cap F6 LFN',
    difficultyLevel: 1,
    gradeLevelCategory: 'GL 03 - GL 06',
    tierCode: 'TIER_1'
  },
  {
    id: 't1_fct_02',
    category: 'fct_gk',
    categoryLabel: 'FCT General Knowledge & Governance',
    chapterNumber: 2,
    chapterTitle: 'Area Councils of the FCT',
    questionText: '[Tier 1 Junior Cadre: GL 03 - 06] Exactly how many Area Councils make up the Federal Capital Territory (FCT)?',
    options: [
      'Six (6) Area Councils: AMAC, Bwari, Gwagwalada, Kuje, Kwali, and Abaji',
      'Twelve (12) Area Councils',
      'Four (4) Area Councils',
      'Twenty (20) Area Councils'
    ],
    correctOptionIndex: 0,
    explanation: 'The FCT comprises exactly six (6) Area Councils: Abuja Municipal Area Council (AMAC), Bwari, Gwagwalada, Kuje, Kwali, and Abaji.',
    referenceRule: '1999 Constitution Part II 1st Schedule',
    difficultyLevel: 1,
    gradeLevelCategory: 'GL 03 - GL 06',
    tierCode: 'TIER_1'
  },
  {
    id: 't1_fct_03',
    category: 'fct_gk',
    categoryLabel: 'FCT General Knowledge & Governance',
    chapterNumber: 3,
    chapterTitle: 'Abuja Master Plan & Geographic Landmarks',
    questionText: '[Tier 1 Junior Cadre: GL 03 - 06] Which famous natural rock monolith is located in the Central Business District of Abuja, directly behind the Three Arms Zone (Presidential Villa, National Assembly, Supreme Court)?',
    options: [
      'Aso Rock',
      'Zuma Rock',
      'Olumo Rock',
      'Wase Rock'
    ],
    correctOptionIndex: 0,
    explanation: 'Aso Rock is the iconic 400-metre monolith located at the apex of Abuja’s Three Arms Zone in the Central Area of the Federal Capital City.',
    referenceRule: 'Abuja Master Plan / FCTA Landmarks',
    difficultyLevel: 1,
    gradeLevelCategory: 'GL 03 - GL 06',
    tierCode: 'TIER_1'
  }
];
