# codereview-ollama

> AI code review CLI using local Ollama — privacy-first, zero-cost code reviews

## Install

```bash
npm install -g codereview-ollama
```

Or run directly:
```bash
npx codereview-ollama <file>
```

## Prerequisites

1. Install [Ollama](https://ollama.ai): `curl -fsSL https://ollama.ai/install.sh | sh`
2. Pull codellama: `ollama pull codellama`
3. Start Ollama: `ollama serve`

## Usage

```bash
# Review a single file
codereview-ollama src/index.js

# With custom Ollama host
OLLAMA_HOST=http://localhost:11434 codereview-ollama app.py
```

## Example Output

```
📋 CODE REVIEW:

• Security: Input validation missing on user-provided filepath
• Performance: Consider caching expensive calculations
• Best practices: Function `processData` is 50 lines, consider splitting
• Bugs: Potential null reference on line 23 if user input is empty
```

## Why This?

| Feature | codereview-ollama | GitHub Copilot | Claude API |
|---------|------------------|----------------|------------|
| Cost | Free | $10+/month | $20+/month |
| Privacy | Local only | Cloud | Cloud |
| Offline | ✅ | ❌ | ❌ |
| Setup | 5 min | 5 min | 30 min |

## Monetization

**Free**: Single file review  
**Pro** ($5/month): Unlimited files, git diff, CI integration

Support this project → [GitHub Sponsors](https://github.com/sponsors/sairamgubbala)

## License

MIT