import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function examApiPlugin(): Plugin {
  const sessionCache = new Map<string, any>();

  return {
    name: 'exam-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url || '', `http://${req.headers.host || 'localhost:3000'}`);
        const pathname = url.pathname;

        // GET /api/exam/results/:sessionId
        if (pathname.startsWith('/api/exam/results/') && req.method === 'GET') {
          const sessionId = decodeURIComponent(pathname.replace('/api/exam/results/', ''));
          const cached = sessionCache.get(sessionId);
          res.setHeader('Content-Type', 'application/json');

          if (cached) {
            return res.end(JSON.stringify(cached));
          }

          // Dynamic fallback results for demonstration or initial review
          const fallback = {
            sessionId: sessionId || 'demo_session',
            score: 7,
            total: 10,
            percentage: 70,
            results: [
              {
                text: "Under Public Service Rules (PSR 020810), what is the mandatory retirement age for civil servants in the Federal Capital Territory Administration?",
                userAnswer: "A. 60 years of age or 35 years of pensionable service, whichever is earlier",
                correct: "A. 60 years of age or 35 years of pensionable service, whichever is earlier",
                isCorrect: true
              },
              {
                text: "Under Financial Regulations (FR 415), who holds designated statutory authority as Chief Accounting Officer of an SDA?",
                userAnswer: "C. Director of Finance and Accounts",
                correct: "B. Permanent Secretary / Mandate Secretary",
                isCorrect: false
              },
              {
                text: "Under Public Procurement Act (PPA 2007 Section 16), which organ has the supreme authority to approve public procurement policies in the FCTA?",
                userAnswer: "C. FCTA Tenders Board / Bureau of Public Procurement Guidelines",
                correct: "C. FCTA Tenders Board / Bureau of Public Procurement Guidelines",
                isCorrect: true
              },
              {
                text: "According to the FCT Act, which constitutional organ exercises executive authority over the Federal Capital Territory?",
                userAnswer: "A. The President of the Federal Republic of Nigeria through the Minister of the FCT",
                correct: "A. The President of the Federal Republic of Nigeria through the Minister of the FCT",
                isCorrect: true
              },
              {
                text: "Under PSR 030301, what constitutes 'Serious Misconduct' warranting immediate interdiction and disciplinary trial?",
                userAnswer: "D. Embezzlement, falsification of records, or gross insubordination",
                correct: "D. Embezzlement, falsification of records, or gross insubordination",
                isCorrect: true
              }
            ]
          };
          return res.end(JSON.stringify(fallback));
        }

        // POST /api/exam/results
        if (pathname === '/api/exam/results' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              if (data && data.id) {
                const formatted = {
                  sessionId: data.id,
                  score: data.score ?? 0,
                  total: data.totalQuestions ?? (data.questions ? data.questions.length : 0),
                  percentage: data.percentage ?? 0,
                  results: (data.questions || []).map((q: any, idx: number) => {
                    const userOptionIndex = data.userAnswers ? data.userAnswers[idx] : undefined;
                    const userAnswer = userOptionIndex !== undefined && q.options && q.options[userOptionIndex]
                      ? `${String.fromCharCode(65 + userOptionIndex)}. ${q.options[userOptionIndex]}`
                      : 'None';
                    const correct = q.options && q.options[q.correctOptionIndex]
                      ? `${String.fromCharCode(65 + q.correctOptionIndex)}. ${q.options[q.correctOptionIndex]}`
                      : 'N/A';
                    const isCorrect = userOptionIndex === q.correctOptionIndex;
                    return {
                      text: q.questionText,
                      userAnswer,
                      correct,
                      isCorrect,
                      explanation: q.explanation,
                      ruleReference: q.ruleReference
                    };
                  })
                };
                sessionCache.set(data.id, formatted);
              }
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
          });
          return;
        }

        // POST /api/exam/rewrite
        if (pathname === '/api/exam/rewrite' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            let originalSessionId = '';
            try {
              const parsed = JSON.parse(body);
              originalSessionId = parsed.originalSessionId || '';
            } catch {}
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({
              redirectUrl: `/?action=rewrite&sessionId=${encodeURIComponent(originalSessionId)}`
            }));
          });
          return;
        }

        // POST /api/exam/regenerate
        if (pathname === '/api/exam/regenerate' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            let originalSessionId = '';
            try {
              const parsed = JSON.parse(body);
              originalSessionId = parsed.originalSessionId || '';
            } catch {}
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({
              redirectUrl: `/?action=regenerate&sessionId=${encodeURIComponent(originalSessionId)}`
            }));
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), examApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
