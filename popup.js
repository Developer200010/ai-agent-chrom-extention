document.getElementById("run").addEventListener("click", () => {
  const query = document.getElementById("query").value.trim();
  if (!query) return;

  chrome.runtime.sendMessage(
    { query, mode: "auto" },
    (response) => {
      if (!response) return;

      const { best_match, trace } = response;

      document.getElementById("best").innerText = best_match.text;
      document.getElementById("score").innerText = `Score: ${best_match.score.toFixed(2)}`;
      document.getElementById("source").innerText = `Source: ${best_match.source}`;

      document.getElementById("trace").textContent = JSON.stringify(trace, null, 2);
    }
  );
});

document.getElementById("toggle-trace").addEventListener("click", () => {
  const traceEl = document.getElementById("trace");
  traceEl.style.display = traceEl.style.display === "none" ? "block" : "none";
});
