const suggestions = [
  "Post a midnight loop edit with a 2-second hook and ask for quote reactions.",
  "Launch an era war poll and pin the strongest argument from each side.",
  "Drop a lore thread with three branches and continue only the winning route.",
  "Create a format duel: loop edit vs recap thread, then publish the scoreboard.",
  "Run a 7-night mission streak and post one mini edit every night.",
  "Publish a hot-take bracket and close finals with a 24-hour vote."
];

const storageKey = "fanverse-ops-state";

const output = document.getElementById("spinner-output");
const streakCount = document.getElementById("streak-count");
const loopVotesNode = document.getElementById("loop-votes");
const threadVotesNode = document.getElementById("thread-votes");
const topFormatNode = document.getElementById("top-format");

const defaultState = {
  streak: 0,
  votes: {
    loop: 0,
    thread: 0
  }
};

function loadState() {
  const raw = localStorage.getItem(storageKey);

  if (!raw) {
    return { ...defaultState };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      streak: Number(parsed.streak) || 0,
      votes: {
        loop: Number(parsed.votes?.loop) || 0,
        thread: Number(parsed.votes?.thread) || 0
      }
    };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function updateTopFormat() {
  if (state.votes.loop === state.votes.thread) {
    topFormatNode.textContent = "Tie: loop edit vs lore thread";
    return;
  }

  topFormatNode.textContent =
    state.votes.loop > state.votes.thread ? "Loop edits are dominating" : "Lore threads are dominating";
}

function render() {
  streakCount.textContent = String(state.streak);
  loopVotesNode.textContent = String(state.votes.loop);
  threadVotesNode.textContent = String(state.votes.thread);
  updateTopFormat();
}

function generateChallenge() {
  const pick = suggestions[Math.floor(Math.random() * suggestions.length)];
  output.textContent = pick;
}

const state = loadState();

const spinButton = document.getElementById("spin-btn");
const completeButton = document.getElementById("complete-btn");
const resetButton = document.getElementById("reset-streak");
const voteButtons = document.querySelectorAll(".vote-btn");

spinButton?.addEventListener("click", generateChallenge);

completeButton?.addEventListener("click", () => {
  state.streak += 1;
  saveState();
  render();
});

resetButton?.addEventListener("click", () => {
  state.streak = 0;
  saveState();
  render();
});

voteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const vote = button.getAttribute("data-vote");
    if (vote !== "loop" && vote !== "thread") {
      return;
    }

    state.votes[vote] += 1;
    saveState();
    render();
  });
});

render();
