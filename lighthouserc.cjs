module.exports = { ci: {
  collect: { url: ['http://localhost:3000/', 'http://localhost:3000/work'], numberOfRuns: 3, settings: { chromeFlags: '--headless --no-sandbox' } },
  assert: { assertions: {
    'largest-contentful-paint': ['error', { maxNumericValue: 2000 }],
    'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
    'total-blocking-time': ['error', { maxNumericValue: 150 }],
    'categories:accessibility': ['error', { minScore: 1 }],
    'resource-summary:script:size': ['error', { maxNumericValue: 184320 }]
  } }, upload: { target: 'filesystem', outputDir: './docs/lighthouse' }
} };
