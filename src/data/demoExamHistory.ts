import { ExamSession, Question } from '../types';
import { questionBank } from './questionBank';

export function generateInitialDemoHistory(userId: string = '101010'): ExamSession[] {
  const psrPool = questionBank.getQuestionsByCategory('psr');
  const frPool = questionBank.getQuestionsByCategory('fr');
  const ppaPool = questionBank.getQuestionsByCategory('ppa');
  const fctPool = questionBank.getQuestionsByCategory('fct_gk');
  const cadrePool = questionBank.getQuestionsByCategory('cadre_admin');

  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  const buildSession = (
    id: string,
    title: string,
    category: string,
    qList: Question[],
    targetPercentage: number,
    daysAgo: number,
    timeLimitMinutes: number
  ): ExamSession => {
    const userAnswers: Record<number, number> = {};
    let correctCount = 0;
    const targetCorrect = Math.round((targetPercentage / 100) * qList.length);

    qList.forEach((q, idx) => {
      // Determine if this question should be correct or incorrect to meet targetPercentage
      const shouldBeCorrect = idx < targetCorrect;
      if (shouldBeCorrect) {
        userAnswers[idx] = q.correctOptionIndex;
        correctCount++;
      } else {
        // Pick an incorrect option
        userAnswers[idx] = (q.correctOptionIndex + 1) % 4;
      }
    });

    const percentage = Math.round((correctCount / qList.length) * 100);
    const timestamp = now - daysAgo * ONE_DAY;

    return {
      id,
      userId,
      title,
      category,
      totalQuestions: qList.length,
      timeLimitMinutes,
      questions: qList,
      userAnswers,
      flaggedQuestions: [2, 7],
      startedAt: timestamp - 35 * 60 * 1000,
      submittedAt: timestamp,
      timeSpentSeconds: 32 * 60,
      score: correctCount,
      percentage,
      isPassed: percentage >= 60,
      status: 'completed',
      mode: 'exam',
    };
  };

  const sessions: ExamSession[] = [];

  // Session 1: Diagnostic Baseline (60 Qs: 15 PSR, 15 FR, 15 PPA, 15 FCT GK)
  if (psrPool.length >= 15 && frPool.length >= 15 && ppaPool.length >= 15 && fctPool.length >= 15) {
    const diagQuestions = [
      ...psrPool.slice(0, 15),
      ...frPool.slice(0, 15),
      ...ppaPool.slice(0, 15),
      ...fctPool.slice(0, 15),
    ];
    sessions.push(
      buildSession(
        `demo-session-1-${userId}`,
        'FCTA Civil Service Baseline Diagnostic Mock Exam',
        'mixed_mock',
        diagQuestions,
        68,
        6,
        60
      )
    );
  }

  // Session 2: PSR Chapter Drill (20 Qs)
  if (psrPool.length >= 35) {
    sessions.push(
      buildSession(
        `demo-session-2-${userId}`,
        'Public Service Rules (PSR) High-Yield Drill',
        'psr',
        psrPool.slice(15, 35),
        85,
        5,
        25
      )
    );
  }

  // Session 3: Financial Regulations (20 Qs)
  if (frPool.length >= 35) {
    sessions.push(
      buildSession(
        `demo-session-3-${userId}`,
        'Financial Regulations (FR) Treasury & Audit Assessment',
        'fr',
        frPool.slice(15, 35),
        75,
        4,
        25
      )
    );
  }

  // Session 4: Public Procurement Act (20 Qs)
  if (ppaPool.length >= 35) {
    sessions.push(
      buildSession(
        `demo-session-4-${userId}`,
        'Public Procurement Act (PPA 2007) Due Process Drill',
        'ppa',
        ppaPool.slice(15, 35),
        80,
        3,
        25
      )
    );
  }

  // Session 5: FCT Administration & General Knowledge (20 Qs)
  if (fctPool.length >= 35) {
    sessions.push(
      buildSession(
        `demo-session-5-${userId}`,
        'FCT General Knowledge & Civil Service Governance Drill',
        'fct_gk',
        fctPool.slice(15, 35),
        90,
        2,
        25
      )
    );
  }

  // Session 6: 100-Question Promotion Mock Exam
  if (psrPool.length >= 55 && frPool.length >= 55 && ppaPool.length >= 55 && fctPool.length >= 55) {
    const fullMockQuestions = [
      ...psrPool.slice(35, 55),
      ...frPool.slice(35, 55),
      ...ppaPool.slice(35, 55),
      ...fctPool.slice(35, 55),
      ...(cadrePool.slice(0, 20).length >= 20 ? cadrePool.slice(0, 20) : psrPool.slice(55, 75)),
    ];
    sessions.push(
      buildSession(
        `demo-session-6-${userId}`,
        'FCTA Standard Promotion Mock Examination (100 Questions)',
        'custom_mock',
        fullMockQuestions,
        84,
        1,
        60
      )
    );
  }

  return sessions;
}
