export interface ChapterDefinition {
  subjectId: string;
  chapterNumber: number;
  title: string;
  topicSummary: string;
  coreRuleOrActRef: string;
}

// 20 Chapters for PSR (Public Service Rules)
export const PSR_CHAPTERS: ChapterDefinition[] = [
  { subjectId: 'psr', chapterNumber: 1, title: 'Introduction & Application of Public Service Rules', topicSummary: 'Scope, definitions, authorities and applicability across MDAs and parastatals.', coreRuleOrActRef: 'PSR 010101 - 010108' },
  { subjectId: 'psr', chapterNumber: 2, title: 'Appointments, Recruitments & Confirmations', topicSummary: 'Eligibility, probationary period, gazetting, and appointment guidelines.', coreRuleOrActRef: 'PSR 020101 - 020211' },
  { subjectId: 'psr', chapterNumber: 3, title: 'Promotions, Transfers & Secondments', topicSummary: 'Eligibility intervals (GL 07-14: 3 yrs, GL 15-17: 4 yrs), merit quotas, and transfer terms.', coreRuleOrActRef: 'PSR 020701 - 020807' },
  { subjectId: 'psr', chapterNumber: 4, title: 'Discipline, Misconduct & Serious Misconduct', topicSummary: 'Definitions of misconduct, serious misconduct, queries, and representation timelines.', coreRuleOrActRef: 'PSR 030301 - 030444' },
  { subjectId: 'psr', chapterNumber: 5, title: 'Interdiction, Suspension & Withholding of Emoluments', topicSummary: 'Conditions for interdiction on half salary, formal suspension, and reinstatement.', coreRuleOrActRef: 'PSR 030404 - 030406' },
  { subjectId: 'psr', chapterNumber: 6, title: 'Termination, Dismissal & Compulsory Retirement', topicSummary: 'Grounds for termination, dismissal implications, loss of benefits, and retirement triggers.', coreRuleOrActRef: 'PSR 030407 - 030420' },
  { subjectId: 'psr', chapterNumber: 7, title: 'Salaries, Increments & Emoluments', topicSummary: 'Salary steps, annual increments, withholding of increment, and salary structures.', coreRuleOrActRef: 'PSR 040101 - 040206' },
  { subjectId: 'psr', chapterNumber: 8, title: 'Annual Leave & Casual Leave Provisions', topicSummary: 'Annual leave entitlements by grade level (30, 28, 21 days), leave grant, and casual leave limits.', coreRuleOrActRef: 'PSR 100101 - 100215' },
  { subjectId: 'psr', chapterNumber: 9, title: 'Maternity, Paternity, Sick & Compassionate Leave', topicSummary: '16 weeks maternity leave, 14 days paternity leave, medical board rules, and sick leave limits.', coreRuleOrActRef: 'PSR 100216 - 100235' },
  { subjectId: 'psr', chapterNumber: 10, title: 'Study Leave (With & Without Pay)', topicSummary: 'Eligibility requirements, bond execution, duration limits, and study leave guidelines.', coreRuleOrActRef: 'PSR 100236 - 100248' },
  { subjectId: 'psr', chapterNumber: 11, title: 'Allowances: Duty Tour, Estacode & Relocation', topicSummary: 'Duty Tour Allowance (DTA) rates, estacode provisions, local transfer and warm clothing allowances.', coreRuleOrActRef: 'PSR 130101 - 130125' },
  { subjectId: 'psr', chapterNumber: 12, title: 'Medical Treatment, Welfare & Hospitalization', topicSummary: 'Government medical facilities, refund of medical bills, referral overseas, and NHIA guidelines.', coreRuleOrActRef: 'PSR 070101 - 070208' },
  { subjectId: 'psr', chapterNumber: 13, title: 'Official Communications, Records & Secrecy', topicSummary: 'Official Secret Acts, handling classified files (Secret/Top Secret), and unauthorized disclosure.', coreRuleOrActRef: 'PSR 030403 & Oaths Act' },
  { subjectId: 'psr', chapterNumber: 14, title: 'Private Practice, External Employment & Business', topicSummary: 'Prohibition of private employment, farming exemption, and Code of Conduct compliance.', coreRuleOrActRef: 'PSR 030422 & 5th Schedule CFRN' },
  { subjectId: 'psr', chapterNumber: 15, title: 'Petitions, Appeals & Redress Procedures', topicSummary: 'Channels of submission, proper address, frivolous petitions, and escalating to Head of Service.', coreRuleOrActRef: 'PSR 090101 - 090207' },
  { subjectId: 'psr', chapterNumber: 16, title: 'Performance Appraisal (APER) & PMS Transition', topicSummary: 'Annual Performance Evaluation Report parameters, moderation, and the Performance Management System.', coreRuleOrActRef: 'PSR 050101 - 050209' },
  { subjectId: 'psr', chapterNumber: 17, title: 'Staff Training, Manpower Development & Induction', topicSummary: 'Continuous professional education, mandatory training days, and training institutions (ASCON/PSIN).', coreRuleOrActRef: 'PSR 060101 - 060205' },
  { subjectId: 'psr', chapterNumber: 18, title: 'Tenure Policy for Directors & Permanent Secretaries', topicSummary: 'Revised tenure policies, 4-year renewable term for directors, and retirement criteria.', coreRuleOrActRef: 'PSR 020908 - Revised Edition' },
  { subjectId: 'psr', chapterNumber: 19, title: 'Statutory Retirement Age & Length of Service', topicSummary: '60 years of age or 35 years of pensionable service (whichever is earlier), and transition notice.', coreRuleOrActRef: 'PSR 020908 & Pension Reform Act' },
  { subjectId: 'psr', chapterNumber: 20, title: 'Code of Ethics, Gifts, Bribery & Corrupt Practices', topicSummary: 'Accepting customary gifts, conflict of interest, declarations of assets, and ICPC/EFCC synergy.', coreRuleOrActRef: 'PSR 030402 & Code of Conduct' },
];

// 20 Chapters for FR (Financial Regulations)
export const FR_CHAPTERS: ChapterDefinition[] = [
  { subjectId: 'fr', chapterNumber: 1, title: 'Authorities for Expenditure & Financial Powers', topicSummary: 'Constitutional bases of public expenditure, warrants, and fiscal responsibility.', coreRuleOrActRef: 'FR 101 - 120' },
  { subjectId: 'fr', chapterNumber: 2, title: 'Duties of Accounting Officers & Chief Executives', topicSummary: 'Pecuniary responsibility of Permanent Secretaries, accounting officers, and section heads.', coreRuleOrActRef: 'FR 105 - 118' },
  { subjectId: 'fr', chapterNumber: 3, title: 'Duties of Internal Audit & Inspectorate Division', topicSummary: 'Pre-payment audit verification, internal checks, independence, and monthly audit reports.', coreRuleOrActRef: 'FR 1701 - 1720' },
  { subjectId: 'fr', chapterNumber: 4, title: 'Revenue Collection, Receipts & Bank Lodgments', topicSummary: 'Classification of government revenues, issuance of Treasury Book 6, and daily bank lodgments.', coreRuleOrActRef: 'FR 201 - 240' },
  { subjectId: 'fr', chapterNumber: 5, title: 'Treasury Single Account (TSA) Operations & Remita', topicSummary: 'Consolidated Revenue Fund, e-collection guidelines, sub-accounts, and TSA reconciliation.', coreRuleOrActRef: 'FR (Revised TSA Manual)' },
  { subjectId: 'fr', chapterNumber: 6, title: 'Vote Books, Commitment Control & Budget Codes', topicSummary: 'Maintenance of Treasury Form 46, liabilities recording, and prevention of extra-budgetary spend.', coreRuleOrActRef: 'FR 401 - 425' },
  { subjectId: 'fr', chapterNumber: 7, title: 'Virement of Funds & Budget Variations', topicSummary: 'Rules governing virement between sub-heads, prohibition of personnel-to-capital virement, and approvals.', coreRuleOrActRef: 'FR 417 - 421' },
  { subjectId: 'fr', chapterNumber: 8, title: 'Payment Vouchers Preparation & Supporting Docs', topicSummary: 'Mandatory attachments, certification, verification, and payment voucher numbering.', coreRuleOrActRef: 'FR 601 - 635' },
  { subjectId: 'fr', chapterNumber: 9, title: 'E-Payment Procedures & Direct Bank Credits', topicSummary: 'Abolition of cheque payments to contractors/staff, mandate validation, and electronic scheduling.', coreRuleOrActRef: 'FR 636 - 650' },
  { subjectId: 'fr', chapterNumber: 10, title: 'Standing & Special Imprests Accounting', topicSummary: 'Standing imprests, special purpose imprests, retirement deadlines (31st Dec), and replenishment.', coreRuleOrActRef: 'FR 1001 - 1025' },
  { subjectId: 'fr', chapterNumber: 11, title: 'Advances to Public Officers (Salary & Travel)', topicSummary: 'Non-personal advances, touring advances, deduction schedules, and eligibility rules.', coreRuleOrActRef: 'FR 1401 - 1435' },
  { subjectId: 'fr', chapterNumber: 12, title: 'Custody of Public Money, Safes & Strongrooms', topicSummary: 'Key holding regulations, combination locks, cash limits, and Treasury cash inspections.', coreRuleOrActRef: 'FR 1101 - 1130' },
  { subjectId: 'fr', chapterNumber: 13, title: 'Losses of Public Funds & Valuation of Losses', topicSummary: 'Classification of losses, immediate reporting to Accountant-General & Auditor-General, and surcharges.', coreRuleOrActRef: 'FR 2401 - 2420' },
  { subjectId: 'fr', chapterNumber: 14, title: 'Board of Survey on Cash, Stamps & Accounts', topicSummary: 'Annual boards of survey, surprise surveys, composition of boards, and survey report forms.', coreRuleOrActRef: 'FR 2501 - 2530' },
  { subjectId: 'fr', chapterNumber: 15, title: 'Stores Classification, Receipt & Issue Procedures', topicSummary: 'Allocated vs unallocated stores, Store Receipt Vouchers (SRV), Store Issue Vouchers (SIV).', coreRuleOrActRef: 'FR 2801 - 2840' },
  { subjectId: 'fr', chapterNumber: 16, title: 'Board of Survey on Unserviceable Stores & Assets', topicSummary: 'Condemning unserviceable plant/equipment, write-offs, public auction rules, and reserve prices.', coreRuleOrActRef: 'FR 2901 - 2930' },
  { subjectId: 'fr', chapterNumber: 17, title: 'Tenders Boards & Financial Thresholds in FR', topicSummary: 'Ministerial Tenders Board (MTB), Parastatal Tenders Board (PTB), and statutory award limits.', coreRuleOrActRef: 'FR 2901 - 2950' },
  { subjectId: 'fr', chapterNumber: 18, title: 'External Audit Queries & Public Accounts Committee', topicSummary: 'Responding to Auditor-General inspection queries within 21 days and appearance before PAC.', coreRuleOrActRef: 'FR 3101 - 3130' },
  { subjectId: 'fr', chapterNumber: 19, title: 'Retention Fees, Mobilization Fees & Contract Security', topicSummary: 'Maximum mobilization fee (15%), advance payment guarantees, and release of retention money.', coreRuleOrActRef: 'FR 2931 - 2945' },
  { subjectId: 'fr', chapterNumber: 20, title: 'Financial Sanctions, Surcharges & Fiscal Offences', topicSummary: 'Withholding salaries, surcharging negligent officers, reporting criminal defalcation to police/EFCC.', coreRuleOrActRef: 'FR 3101 - 3140' },
];

// 20 Chapters for PPA (Public Procurement Act 2007)
export const PPA_CHAPTERS: ChapterDefinition[] = [
  { subjectId: 'ppa', chapterNumber: 1, title: 'Establishment of National Council on Public Procurement (NCPP)', topicSummary: 'Structure, membership, advisory role to Federal Government, and overarching procurement policies.', coreRuleOrActRef: 'PPA 2007 Part I (Sec 1-2)' },
  { subjectId: 'ppa', chapterNumber: 2, title: 'Establishment of Bureau of Public Procurement (BPP)', topicSummary: 'Objectives of BPP, regulatory functions, monitoring, database of federal contractors, and pricing standards.', coreRuleOrActRef: 'PPA 2007 Part II (Sec 3-6)' },
  { subjectId: 'ppa', chapterNumber: 3, title: 'Scope of Application & Fundamental Principles', topicSummary: 'Application to all procurement using public funds; principles of economy, efficiency, transparency, and equal access.', coreRuleOrActRef: 'PPA 2007 Part III (Sec 15-16)' },
  { subjectId: 'ppa', chapterNumber: 4, title: 'Eligibility Criteria & Qualification of Bidders', topicSummary: 'Statutory qualifications: CAC registration, PENCOM compliance, ITF, NSITF, Tax Clearance Certificate (TCC).', coreRuleOrActRef: 'PPA 2007 Sec 16(6)-(8)' },
  { subjectId: 'ppa', chapterNumber: 5, title: 'Organization of Procurement & Procuring Entities', topicSummary: 'Role of Accounting Officer, Procurement Planning Committee (PPC), and user department obligations.', coreRuleOrActRef: 'PPA 2007 Part IV (Sec 17-21)' },
  { subjectId: 'ppa', chapterNumber: 6, title: 'Procurement Planning Committee (PPC) Functions', topicSummary: 'Needs assessment, market survey, preparation of Annual Procurement Plan (APP), and aggregation of needs.', coreRuleOrActRef: 'PPA 2007 Sec 18 & 21' },
  { subjectId: 'ppa', chapterNumber: 7, title: 'Tenders Boards: Ministerial & Parastatal Tenders Boards', topicSummary: 'Composition, quorum, duties of MTB/PTB, approval limits, and non-voting status of procurement secretary.', coreRuleOrActRef: 'PPA 2007 Sec 22' },
  { subjectId: 'ppa', chapterNumber: 8, title: 'Technical Evaluation Sub-Committee (Tenders Board)', topicSummary: 'Detailed examination of bids, technical scoring criteria, responsiveness check, and evaluation reporting.', coreRuleOrActRef: 'PPA 2007 Sec 23' },
  { subjectId: 'ppa', chapterNumber: 9, title: 'Open Competitive Bidding as the Default Method', topicSummary: 'Mandatory standard method, international competitive bidding triggers, and advertisement standards.', coreRuleOrActRef: 'PPA 2007 Part V (Sec 24)' },
  { subjectId: 'ppa', chapterNumber: 10, title: 'Advertisement Guidelines & Mandatory Periods', topicSummary: 'Publication in 2 national dailies and Federal Tenders Journal; minimum 6 weeks submission window.', coreRuleOrActRef: 'PPA 2007 Sec 25' },
  { subjectId: 'ppa', chapterNumber: 11, title: 'Bid Security, Bank Guarantees & Validity Periods', topicSummary: 'Bid security requirements (2% of bid sum for large contracts), validity duration, and forfeiture terms.', coreRuleOrActRef: 'PPA 2007 Sec 26' },
  { subjectId: 'ppa', chapterNumber: 12, title: 'Bid Opening Procedures & Public Witnessing', topicSummary: 'Immediate public opening upon deadline expiry, calling out bidder names, tender sums, and attendance of CSOs.', coreRuleOrActRef: 'PPA 2007 Sec 30' },
  { subjectId: 'ppa', chapterNumber: 13, title: 'Examination & Evaluation of Bids', topicSummary: 'Lowest evaluated responsive bid criterion, post-qualification verification, and rejection of unrealistic prices.', coreRuleOrActRef: 'PPA 2007 Sec 31 - 32' },
  { subjectId: 'ppa', chapterNumber: 14, title: 'Special & Restricted Procurement Methods', topicSummary: 'Two-stage tendering, selective/restricted tendering, pre-qualification, and threshold justifications.', coreRuleOrActRef: 'PPA 2007 Part VI (Sec 39 - 41)' },
  { subjectId: 'ppa', chapterNumber: 15, title: 'Direct Contracting & Emergency Procurement', topicSummary: 'Sole-source conditions (patents/monopolies), disaster response emergency procurement, and BPP notification.', coreRuleOrActRef: 'PPA 2007 Sec 42 - 43' },
  { subjectId: 'ppa', chapterNumber: 16, title: 'Procurement of Consultant Services', topicSummary: 'Expressions of Interest (EOI), Request for Proposals (RFP), Quality & Cost Based Selection (QCBS).', coreRuleOrActRef: 'PPA 2007 Part VII (Sec 44 - 52)' },
  { subjectId: 'ppa', chapterNumber: 17, title: 'Disposal of Public Property & Assets', topicSummary: 'Disposal methods: trade-in, transfer, public auction, sealed competitive bids, and destruction.', coreRuleOrActRef: 'PPA 2007 Part VIII (Sec 55 - 56)' },
  { subjectId: 'ppa', chapterNumber: 18, title: 'Administrative Review & Complaints Mechanism', topicSummary: 'Contractor protest channels: Accounting Officer (15 days), appeal to BPP, and Federal High Court.', coreRuleOrActRef: 'PPA 2007 Part IX (Sec 53 - 54)' },
  { subjectId: 'ppa', chapterNumber: 19, title: 'Certificate of "No Objection" & FEC Approvals', topicSummary: 'Prior review thresholds, BPP due diligence certificate, and contracts requiring Federal Executive Council ratifications.', coreRuleOrActRef: 'PPA 2007 Sec 16(1) & Threshold Circulars' },
  { subjectId: 'ppa', chapterNumber: 20, title: 'Procurement Offences, Penalties & Blacklisting', topicSummary: 'Bid rigging, splitting contracts, conflict of interest; 5-10 yrs imprisonment, debarment, and corporate fines.', coreRuleOrActRef: 'PPA 2007 Part XI (Sec 58)' },
];

// 20 Chapters for FCT General Knowledge
export const FCT_GK_CHAPTERS: ChapterDefinition[] = [
  { subjectId: 'fct_gk', chapterNumber: 1, title: 'Creation & Legal Framework of FCT (Decree No. 6 of 1976)', topicSummary: 'Justice Timothy Akinola Aguda Panel recommendations, proclamation on Feb 5 1976, and Section 297-304 of 1999 CFRN.', coreRuleOrActRef: 'FCT Act 1976 & CFRN 1999' },
  { subjectId: 'fct_gk', chapterNumber: 2, title: 'Geography, Borders & Topography of FCT', topicSummary: '8,000 sq km land area, central Nigeria location, bordering Kaduna, Nasarawa, Kogi, and Niger States.', coreRuleOrActRef: 'FCTA Geographical Survey' },
  { subjectId: 'fct_gk', chapterNumber: 3, title: 'Abuja Master Plan & International Planning Associates (IPA)', topicSummary: 'Kenzo Tange, IPA design, curved crescent linear city concept, central axis, and green wedges.', coreRuleOrActRef: 'FCDA Master Plan 1979' },
  { subjectId: 'fct_gk', chapterNumber: 4, title: 'Phasing & Development Sectors of Abuja Federal Capital City', topicSummary: 'Phase 1 (Central Area, Garki, Wuse, Maitama, Asokoro), Phase 2 (Utako, Jabi, Gudu), Phase 3 & 4.', coreRuleOrActRef: 'FCDA Cadastral System' },
  { subjectId: 'fct_gk', chapterNumber: 5, title: 'Federal Capital Development Authority (FCDA) Role & Mandate', topicSummary: 'Engineering infrastructure, bridge construction, water dam reservoirs, and public building projects.', coreRuleOrActRef: 'FCDA Statutory Act' },
  { subjectId: 'fct_gk', chapterNumber: 6, title: 'Ministerial Leadership & Historical Ministers of the FCT', topicSummary: 'Mobolaji Ajose-Adeogun, John Kadiya, Mamman Vatsa, Gado Nasko, Nasir El-Rufai, to contemporary administration.', coreRuleOrActRef: 'FCTA Historical Registry' },
  { subjectId: 'fct_gk', chapterNumber: 7, title: 'FCTA Administrative Structure: Mandate Secretariats', topicSummary: 'Creation of Secretariats under Order 1 of 2004, mimicking state ministries with Mandate Secretaries.', coreRuleOrActRef: 'Order 1 of 2004 & Reforms' },
  { subjectId: 'fct_gk', chapterNumber: 8, title: 'The Six Area Councils: Creation, Boundaries & Administration', topicSummary: 'AMAC, Abaji, Bwari, Gwagwalada, Kuje, Kwali; local governance and council elections.', coreRuleOrActRef: 'FCT Area Councils Act' },
  { subjectId: 'fct_gk', chapterNumber: 9, title: 'Indigenous Peoples & Cultural Heritage of FCT', topicSummary: 'Gbagyi (Gwari), Bassa, Gwandara, Koro, Ganagana, Ebira-Koto, Afo tribes, traditions, and festivals.', coreRuleOrActRef: 'FCTA Social Development Registry' },
  { subjectId: 'fct_gk', chapterNumber: 10, title: 'Traditional Rulers & Council of Chiefs of FCT', topicSummary: 'Ona of Abaji, Esu of Bwari, Sarkin Bwari, Agora of Zuba, Kpop Gwargwada, and grading of royal stools.', coreRuleOrActRef: 'FCT Chieftaincy Law' },
  { subjectId: 'fct_gk', chapterNumber: 11, title: 'Abuja Geographic Information Systems (AGIS) & Land Cadastre', topicSummary: 'Digital land records, computerization of C of O, R of O processing, and Accelerated Title Re-issuance.', coreRuleOrActRef: 'AGIS Guidelines' },
  { subjectId: 'fct_gk', chapterNumber: 12, title: 'Development Control Guidelines & Building Regulations', topicSummary: 'Setbacks, building height restrictions, contravention notices, stop-work orders, and demolition policies.', coreRuleOrActRef: 'Abuja Urban Planning Regulations' },
  { subjectId: 'fct_gk', chapterNumber: 13, title: 'FCT Environmental Regulations & AEPB Mandate', topicSummary: 'Waste disposal bins, open grazing bans, environmental mobile courts, and street trading prohibitions.', coreRuleOrActRef: 'AEPB Act 1997' },
  { subjectId: 'fct_gk', chapterNumber: 14, title: 'Water Supply Infrastructure: Lower Usuma Dam & Gurara Transfer', topicSummary: 'Lower Usuma Dam treatment plant, Gurara Water Transfer pipeline, and regional water supply phases.', coreRuleOrActRef: 'FCT Water Board Technical Profile' },
  { subjectId: 'fct_gk', chapterNumber: 15, title: 'FCT Transportation System, Light Rail & Bus Terminals', topicSummary: 'Abuja Rail Mass Transit (ARMT) Metro station to Airport line, Lot 1A & Lot 3, and high-capacity buses.', coreRuleOrActRef: 'FCTA Transportation Masterplan' },
  { subjectId: 'fct_gk', chapterNumber: 16, title: 'National Monuments, Landmarks & Institutional HQs in FCT', topicSummary: 'Aso Rock, Zuma Rock, National Assembly Complex, Supreme Court, National Mosque, National Ecumenical Centre.', coreRuleOrActRef: 'FCTA Heritage Sites' },
  { subjectId: 'fct_gk', chapterNumber: 17, title: 'FCT Internal Revenue Service (FCT-IRS) & Revenue Architecture', topicSummary: 'Section 8 of FCT-IRS Act 2015, administration of personal income tax, and collection agreements.', coreRuleOrActRef: 'FCT-IRS Act 2015' },
  { subjectId: 'fct_gk', chapterNumber: 18, title: 'Resettlement & Compensation Policies in the FCT', topicSummary: 'Apo Resettlement, Shere-Galuwyi scheme, integration vs resettlement debates, and economic tree compensation.', coreRuleOrActRef: 'FCTA Resettlement Policy' },
  { subjectId: 'fct_gk', chapterNumber: 19, title: 'FCT Civil Service Commission (Establishment & Reforms)', topicSummary: 'Passage and signing of the FCT Civil Service Commission Act, enabling career progression to Head of Service.', coreRuleOrActRef: 'FCT Civil Service Commission Act' },
  { subjectId: 'fct_gk', chapterNumber: 20, title: 'FCT Security Architecture & Emergency Operations', topicSummary: 'FEMA operations, Joint Task Force, emergency toll-free numbers (112), and security surveillance systems.', coreRuleOrActRef: 'FCTA Emergency Protocols' },
];

// Generates 20 chapter definitions for any of the 13 Cadres
export function getCadreChapters(cadreId: string, cadreName: string): ChapterDefinition[] {
  const topicsMap: Record<string, { title: string; summary: string; ref: string }[]> = {
    cadre_admin: [
      { title: 'Public Administration Theories & Nigerian Civil Service Structure', summary: 'Classical, bureaucratic, and modern public management frameworks in MDAs.', ref: 'Public Admin Practice' },
      { title: 'Civil Service Rules & Public Policy Formulation Cycle', summary: 'Agenda setting, policy drafting, stakeholder consultations, and policy whitepapers.', ref: 'FCTA Policy Guidelines' },
      { title: 'Registry Operations, File Movement & Classification Systems', summary: 'Secret, Confidential, and Open registries; indexing, weeding, and archiving.', ref: 'National Archives & FCTA Registry' },
      { title: 'Committee Management, Secretariat Duties & Minute Writing', summary: 'Executive summaries, actionable resolutions, matters arising, and drafting minutes.', ref: 'Administrative Manual' },
      { title: 'Council / Executive Memoranda Preparation', summary: 'Format, prayer, financial implications, background justification, and cabinet approvals.', ref: 'FEC / FCTA Cabinet Guidelines' },
      { title: 'Disciplinary Tribunals & Senior Staff Committee Proceedings', summary: 'Due process, natural justice, audio-alteram partem, and staff committee recommendations.', ref: 'PSR Chapter 3 & DHRM' },
      { title: 'Performance Management System (PMS) Implementation in FCTA', summary: 'Transitioning from APER to KPI-driven performance contracts and quarterly reviews.', ref: 'Office of Head of Service PMS' },
      { title: 'Manpower Planning, Establishment Budgets & Nominal Rolls', summary: 'Staff audits, organizational charts, career progression, and nominal roll reconciliation.', ref: 'Establishment Circulars' },
      { title: 'Labour Relations, Trade Unions & Dispute Negotiation in FCTA', summary: 'Collective bargaining, Trade Dispute Act, Joint Negotiating Council (JNC), and strike management.', ref: 'Trade Dispute Act & FCTA' },
      { title: 'Public Sector Reforms, SERVICOM & Charter Compliance', summary: 'Citizen service compacts, feedback mechanisms, complaint desks, and service delivery benchmarking.', ref: 'SERVICOM Principles' },
      { title: 'Official Secret Act, Data Protection & Information Governance', summary: 'Classified documents, security vetting of officers, and Nigeria Data Protection Act compliance.', ref: 'Official Secrets Act' },
      { title: 'Inter-governmental Relations & Inter-Secretariat Synergy', summary: 'Horizontal coordination between FCTA Secretariats, Area Councils, and Federal Ministries.', ref: 'FCTA Governance Structure' },
      { title: 'Code of Conduct Bureau Rules & Assets Declaration Compliance', summary: 'Fifth schedule constitutional guidelines, biennial declarations, and tribunal sanctions.', ref: 'CFRN 5th Schedule' },
      { title: 'Crisis Management, Public Protocol & Official Ceremonies', summary: 'State protocol, precedence hierarchy, ministerial escort, and diplomatic handling.', ref: 'Protocol Handbook' },
      { title: 'Records Automation & Electronic Document Management (EDMS)', summary: 'Digital archiving, workflow management, metadata tagging, and electronic mail tracking.', ref: 'e-Government Masterplan' },
      { title: 'Gender Mainstreaming, Inclusion & Social Welfare in Public Service', summary: 'National Gender Policy, affirmative action, disability rights act compliance in workplaces.', ref: 'FCTA Gender Guidelines' },
      { title: 'Anti-Corruption Transparency Units (ACTU) in Administration', summary: 'ICPC mandate in MDAs, corruption vulnerability assessments, and whistleblower protections.', ref: 'ICPC ACTU Guidelines' },
      { title: 'Pension Administration (Contributory Pension Scheme) for FCTA Staff', summary: 'PRA 2014, PenCom guidelines, employer/employee deductions (10%/8%), and retirement processing.', ref: 'Pension Reform Act 2014' },
      { title: 'Budget Execution, Vote Coordination & Administrative Approvals', summary: 'Administrative concurrence, expenditure justification, and departmental vote tracking.', ref: 'Financial Regulations' },
      { title: 'Leadership Ethics, Strategic Vision & Change Management', summary: 'Public service ethos, transformational leadership, overcoming resistance, and institutional legacy.', ref: 'Administrative Leadership Manual' },
    ],
    cadre_commerce: [
      { title: 'National Trade Policy & Domestic Commerce Architecture in FCTA', summary: 'Internal trade facilitation, inter-state commerce corridors, commodity distribution, and FCTA commerce guidelines.', ref: 'National Trade Policy' },
      { title: 'Weights and Measures Act & Legal Metrology Inspection Protocols', summary: 'Cap W3 LFN statutory provisions, inspector entry and search powers, calibration of commercial scales, and fuel dispensing meter tests.', ref: 'Weights & Measures Act Cap W3 LFN' },
      { title: 'Federal Competition & Consumer Protection Act (FCCPC 2018)', summary: 'Consumer rights protection, anti-collusion regulations, deceptive marketing prohibition, and consumer complaint adjudication.', ref: 'FCCPC Act 2018' },
      { title: 'African Continental Free Trade Area (AfCFTA) & Regional Integration', summary: 'AfCFTA protocol implementation in FCTA, Rules of Origin criteria, tariff phasedowns, and ECOWAS Trade Liberalization Scheme (ETLS).', ref: 'AfCFTA Agreement & NAC' },
      { title: 'MSME Development, Enterprise Support & Abuja Enterprise Agency (AEA)', summary: 'National Policy on MSMEs, incubation centers, business support clinics, micro-credit access, and enterprise cluster development.', ref: 'SMEDAN Act & AEA Charter' },
      { title: 'Non-Oil Export Promotion & NEPC Regulatory Procedures', summary: 'Export procedures, Form NXP processing via authorized dealer banks, Export Expansion Grant (EEG), and agricultural produce zero-reject guidelines.', ref: 'NEPC Act Cap N108 LFN' },
      { title: 'Modern Market Administration & FCTA Commercial Facility Operations', summary: 'Wuse, Garki, Utako, and Dei-Dei market management; stall allocation procedures, sanitation bylaws, and revenue audit controls.', ref: 'FCTA Markets Management Byelaws' },
      { title: 'Business Premises Registration Law & Commercial Licensing in FCT', summary: 'Mandatory commercial registration, categorization of commercial premises, statutory fees, renewal verification, and revenue compliance.', ref: 'FCT Business Premises Act' },
      { title: 'Intellectual Property, Trademarks, Patents & Anti-Counterfeiting', summary: 'Trademarks Act Cap T13 LFN, trade descriptions, merchandise marks enforcement, and brand protection in commercial markets.', ref: 'Trademarks Act Cap T13 LFN' },
      { title: 'Commodity Price Surveillance, Market Intelligence & Anti-Hoarding', summary: 'Market survey methodologies, price monitoring indexes, supply chain stabilization, and detecting artificial commodity scarcity.', ref: 'FMITI Market Surveillance Manual' },
      { title: 'Multilateral Trade Governance (WTO, UNCTAD & Bilateral Treaties)', summary: 'Most-Favoured-Nation (MFN) principle, National Treatment under GATT, Technical Barriers to Trade (TBT), and trade remedies.', ref: 'WTO Agreements & Trade Treaties' },
      { title: 'Import-Export Documentation, Form M, Form NXP & Customs Tariffs', summary: 'Single-Window Trade Portal, Pre-Arrival Assessment Report (PAAR), Central Bank of Nigeria trade circulars, and HS tariff codes.', ref: 'CBN Trade & Exchange Manual' },
      { title: 'Investment Promotion, Ease of Doing Business & NIPC Act', summary: 'NIPC Act provisions, Pioneer Status tax incentives, One-Stop Investment Centre (OSIC), and PEBEC business climate reforms in Abuja.', ref: 'NIPC Act Cap N117 LFN' },
      { title: 'Trade Fairs, International Expos & Made-in-Abuja Exhibitions', summary: 'Planning commercial trade missions, staging the Abuja International Trade Fair with ABUCCIMA, pavilion management, and B2B linkages.', ref: 'FCTA Trade Mission Guidelines' },
      { title: 'Informal Sector Formalization & Cooperative Trade Societies', summary: 'Nigeria Cooperative Societies Act, transition of informal traders into structured cooperatives, thrift associations, and credit access.', ref: 'Nigeria Cooperative Societies Act' },
      { title: 'E-Commerce Regulation, Digital Marketplaces & Consumer Cyber-Safety', summary: 'Electronic commerce frameworks, online consumer dispute resolution, digital invoicing, merchant verification, and cyber-consumer rights.', ref: 'FCCPC Online Trade Guidelines' },
      { title: 'Standards Organisation of Nigeria (SON) Conformity & MANCAP/SONCAP', summary: 'SON Act 2015 enforcement, Mandatory Conformity Assessment Programme (MANCAP) for local goods, and SONCAP import certification.', ref: 'SON Act 2015' },
      { title: 'NAFDAC Regulatory Compliance in Commercial Consumer Distribution', summary: 'NAFDAC Act Cap N1 LFN, marketing authorization, storage and retailing of regulated packaged food, beverages, and cosmetics in markets.', ref: 'NAFDAC Act Cap N1 LFN' },
      { title: 'Commercial Arbitration, Trade Dispute Settlement & Mediation', summary: 'Arbitration and Mediation Act 2023, multi-door courthouse dispute resolution, tenant-shopowner dispute settlement, and trade mediation.', ref: 'Arbitration & Mediation Act 2023' },
      { title: 'Strategic Leadership & Scheme of Service in Commerce & Trade', summary: 'Career progression from Commercial Officer II (GL 08) to Director of Commerce (GL 17), policy drafting, and ministerial memo defence.', ref: 'Federal Scheme of Service' },
    ],
  };

  // Base generic template for cadres to ensure rich professional coverage across all 20 chapters
  const genericCadreChapters = [
    { title: `Core Regulatory Frameworks for ${cadreName}`, summary: 'Governing statutory instruments, professional council acts, and FCTA mandates.', ref: 'Professional Code & Act' },
    { title: 'Professional Ethics, Codes of Conduct & Accountability', summary: 'Standards of practice, conflict of interest, and fiduciary duties in public service.', ref: 'Code of Ethics' },
    { title: 'Public Service Rules Integration in Cadre Operations', summary: 'Operational compliance with appointments, reporting lines, queries, and promotions.', ref: 'PSR 2021 Edition' },
    { title: 'Financial Regulations & Resource Management in the Cadre', summary: 'Budget inputs, vote handling, payment requisitions, and audit compliance.', ref: 'Financial Regulations' },
    { title: 'Public Procurement Act Compliance in Professional Execution', summary: 'Drafting specifications, procurement requisitions, tender review, and contract monitoring.', ref: 'PPA 2007' },
    { title: 'Abuja Master Plan & FCTA Strategic Objectives Alignment', summary: 'How cadre functions align with the vision, development, and maintenance of FCT.', ref: 'Abuja Master Plan' },
    { title: 'Technical Standards, Quality Control & Quality Assurance', summary: 'Verification checklists, testing protocols, benchmarking, and error elimination.', ref: 'Standard Operating Procedures' },
    { title: 'Records Keeping, Professional Documentation & Filing', summary: 'Technical registers, case records, logbooks, and statutory documentation archives.', ref: 'Registry & Technical Records' },
    { title: 'Information & Digital Technology Integration in Cadre Duties', summary: 'Specialized software tools, digital registers, automation, and data security.', ref: 'e-Government Architecture' },
    { title: 'Supervision, Mentorship & Subordinate Staff Appraisal', summary: 'Delegation, team motivation, on-the-job training, and objective APER/PMS grading.', ref: 'Leadership Guidelines' },
    { title: 'Health, Safety & Environmental Compliance (HSE) on Duty', summary: 'Occupational safety standards, protective gear, hazard mitigation, and AEPB rules.', ref: 'Occupational Safety Act' },
    { title: 'Inter-Departmental Collaboration & Teamwork in FCTA', summary: 'Synergy between Mandate Secretariats, Boards, and Area Council field offices.', ref: 'FCTA Operational Manual' },
    { title: 'Customer Service Excellence, SERVICOM & Citizen Engagement', summary: 'Treating residents with promptness, transparency, courtesy, and complaints resolution.', ref: 'SERVICOM Principles' },
    { title: 'Field Operations, Site Inspections & Investigative Surveys', summary: 'Methodology of fieldwork, observation logs, evidence gathering, and field reports.', ref: 'Inspection Manual' },
    { title: 'Technical Report Writing, Data Presentation & Briefs', summary: 'Executive summaries, analytical graphs, findings, recommendations, and action matrices.', ref: 'Report Writing Standards' },
    { title: 'Emergency Response, Contingency Planning & Risk Management', summary: 'Risk registers, crisis intervention, disaster drills, and FEMA coordination.', ref: 'Emergency Protocols' },
    { title: 'Community Relations, Public Consultation & Area Council Outreach', summary: 'Engaging traditional rulers, grassroots associations, youth leaders, and civil society.', ref: 'Community Engagement Manual' },
    { title: 'Contract Management, Milestone Verification & Certifications', summary: 'Interim payment certificates, job completion certificates, and defect liability.', ref: 'Project Delivery Protocols' },
    { title: 'Anti-Corruption, Due Diligence & Transparency Safeguards', summary: 'Preventing kickbacks, fraud identification, red flags, and reporting to ACTU/ICPC.', ref: 'Anti-Corruption Manual' },
    { title: 'Future Trends, Modern Innovations & Professional Development', summary: 'Emerging global standards, continuous professional development (CPD), and career growth.', ref: 'Career Progression Manual' },
  ];

  const specific = topicsMap[cadreId] || genericCadreChapters;
  return specific.map((item, idx) => ({
    subjectId: cadreId,
    chapterNumber: idx + 1,
    title: item.title,
    topicSummary: item.summary,
    coreRuleOrActRef: item.ref,
  }));
}
