const suggestions = [
  "Create a neon-themed fan edit and ask followers to rate it 1-10.",
  "Post a 'most iconic moment' bracket and let comments vote each round.",
  "Launch a duet challenge using your boldest transition idea.",
  "Make a 7-second reaction loop and pin the funniest fan response.",
  "Start a fan streak challenge: one mini-edit posted daily for a week.",
  "Drop a 'hot take' poll and ask fans to defend their answer in comments."
];

const output = document.getElementById("spinner-output");
const button = document.getElementById("spin-btn");

button?.addEventListener("click", () => {
  const pick = suggestions[Math.floor(Math.random() * suggestions.length)];
  output.textContent = pick;
});
