import { DOCUMENTS } from "./data.js";
import { buildVocabulary, textToVector, cosineSimilarity } from "./utils.js";

const vocab = buildVocabulary(DOCUMENTS);

function semanticSearch(query) {
  const qVec = textToVector(query, vocab);
  const results = DOCUMENTS.map((doc) => {
    const dVec = textToVector(doc, vocab);
    const score = cosineSimilarity(qVec, dVec);
    return { text: doc, score };
  });

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 3);
}

function keywordSearch(query) {
  const qWords = query.toLowerCase().split(/\W+/).filter(Boolean);
  const results = DOCUMENTS.map((doc) => {
    const dWords = doc.toLowerCase().split(/\W+/).filter(Boolean);
    let count = 0;
    qWords.forEach(word => {
      if (dWords.includes(word)) count++;
    });
    return { text: doc, raw: count };
  });

  const max = Math.max(...results.map(r => r.raw)) || 1;
  results.forEach(r => r.score = r.raw / max);

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 3);
}

function chooseTool(query, semanticTop, keywordTop) {
  const wc = query.split(/\s+/).length;

  if (wc > 5) return "semantic_search";

  if (keywordTop[0] && keywordTop[0].score > 0) return "keyword_search";

  return "hybrid";
}

export async function runAgent(query) {
  const start = Date.now();

  const sem = semanticSearch(query);
  const key = keywordSearch(query);

  const decision = chooseTool(query, sem, key);

  let best =
    decision === "semantic_search"
      ? sem[0]
      : decision === "keyword_search"
      ? key[0]
      : [...sem, ...key].sort((a, b) => b.score - a.score)[0];

  let fallback = false;
  let source = "local";

  if (!best || best.score < 0.75) {
    fallback = true;
    source = "pinecone"; // pretend
  }

  return {
    planner_decision: decision,
    used_fallback_tool: fallback,
    best_match: {
      text: best ? best.text : "",
      score: best ? best.score : 0,
      source
    },
    trace: {
      reasoning: `Planner chose ${decision} based on query: "${query}"`,
      semantic_top_k_scores: sem,
      keyword_top_k_scores: key,
      latency_ms: Date.now() - start
    }
  };
}
