export function buildVocabulary(texts) {
  const vocabSet = new Set();
  texts.forEach(t => {
    t.toLowerCase().split(/\W+/).filter(Boolean).forEach(w => vocabSet.add(w));
  });
  return Array.from(vocabSet);
}

export function textToVector(text, vocab) {
  const v = new Array(vocab.length).fill(0);
  const words = text.toLowerCase().split(/\W+/).filter(Boolean);

  words.forEach(w => {
    const idx = vocab.indexOf(w);
    if (idx !== -1) v[idx] += 1;
  });

  return v;
}

export function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
