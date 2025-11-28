import { runAgent } from "./agent.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { query, mode } = message;

  (async () => {
    const result = await runAgent(query, mode);
    sendResponse(result);
  })();

  return true;
});
