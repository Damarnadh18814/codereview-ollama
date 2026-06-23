# PROJECT SPEC: codereview-ollama

## Architecture

```
codereview-ollama/
├── src/
│   └── index.js          # Main CLI entry (ponytail: single file)
├── package.json          # NPM package config
├── README.md             # User docs
└── .gitignore
```

## Data Flow

```
User runs: npx codereview-ollama ./src/

1. Parse CLI args (file path or git diff)
2. Read file contents
3. Call Ollama API (localhost:11434)
4. Parse JSON response
5. Output formatted review to terminal
```

## API Contract

Ollama API endpoint:
```
POST http://localhost:11434/api/generate
{
  "model": "codellama",  // or auto-detect available
  "prompt": "Review this code for bugs, performance, security:\n\n<code>",
  "stream": false
}
```

## MVP Features (≤50 lines)

1. **File input**: Accept single file path
2. **Ollama integration**: Call local API
3. **Formatted output**: Pretty print review results
4. **Error handling**: Clear messages if Ollama not running

## Test Cases

1. ✅ File exists → returns review
2. ✅ File doesn't exist → clear error
3. ✅ Ollama not running → helpful setup instructions
4. ✅ Empty file → handles gracefully

## Monetization Hook

**Free**: Single file review  
**Paid** ($5/month): Unlimited files + git diff support + CI integration

Revenue path: GitHub Sponsors, Pay-what-you-want on Gumroad

## Build Estimate

- **Time**: 1-2 hours
- **Lines**: ~50 (ponytail rule: MVP ≤200)
- **Dependencies**: None (use native fetch)