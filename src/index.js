#!/usr/bin/env node
// ponytail: MVP code review CLI using local Ollama
// ~60 lines total

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';

async function getAvailableModel() {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/tags`);
    const data = await response.json();
    if (data.models && data.models.length > 0) {
      // Prefer local models (not :cloud)
      const local = data.models.find(m => !m.name.includes(':cloud'));
      if (local) return local.name;
      return data.models[0].name;
    }
  } catch (e) {}
  return null; // No local model
}

async function reviewFile(filepath) {
  const fs = await import('fs');
  if (!fs.existsSync(filepath)) {
    console.error(`❌ File not found: ${filepath}`);
    process.exit(1);
  }
  
  const code = fs.readFileSync(filepath, 'utf-8');
  const model = await getAvailableModel();
  
  if (!model) {
    console.error('❌ No local Ollama model found.');
    console.error('   Install one: ollama pull qwen2.5-coder');
    console.error('   Or: ollama pull llama3.2');
    process.exit(1);
  }
  
  const prompt = `You are a senior code reviewer. Review this code for:
- Bugs and logic errors
- Security vulnerabilities  
- Performance issues
- Code quality and best practices

Provide concise, actionable feedback. Format as bullet points.

Code to review:
\`\`\`
${code}
\`\`\``;

  try {
    console.log(`🤖 Using model: ${model}`);
    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        options: { temperature: 0.3 }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('\n📋 CODE REVIEW:\n');
    console.log(data.response);
  } catch (err) {
    if (err.message.includes('fetch') || err.code === 'ECONNREFUSED') {
      console.error('❌ Ollama not running. Start it with: ollama serve');
      console.error('   Or set custom host: OLLAMA_HOST=http://localhost:11434 npx codereview-ollama <file>');
      process.exit(1);
    }
    throw err;
  }
}

const filepath = process.argv[2];
if (!filepath) {
  console.log('Usage: npx codereview-ollama <file>');
  console.log('  or: OLLAMA_HOST=http://localhost:11434 npx codereview-ollama <file>');
  process.exit(1);
}

reviewFile(filepath);