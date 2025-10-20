// ==============================
// ⚽ Soccer Manager Mini-Sim JS
// ==============================

// --- Team data with ratings ---
const teams = {
  Brazil: 90,
  France: 88,
  Spain: 86,
  Argentina: 89,
  Japan: 82,
  USA: 80
};

// --- Scoreboard variables ---
let winCount = 0;
let lossCount = 0;
let drawCount = 0;

// --- Element references ---
const teamASelect = document.getElementById("teamA");
const teamBSelect = document.getElementById("teamB");
const playBtn = document.getElementById("playMatch");
const commentary = document.getElementById("commentary");
const wins = document.getElementById("wins");
const losses = document.getElementById("losses");
const draws = document.getElementById("draws");
const alertBox = document.getElementById("alert-box");
const countdownEl = document.getElementById("countdown");
const substituteBtn = document.getElementById("substitute-btn");
const explosionMessage = document.getElementById("explosion-message");
const playAgainBtn = document.getElementById("playAgain");

// ==============================
// 🧠 MAIN MATCH LOGIC
// ==============================

playBtn.addEventListener("click", () => {
  const teamA = teamASelect.value;
  const teamB = teamBSelect.value;
  if (teamA === teamB) {
    commentary.textContent = "⚠️ Please select two different teams!";
    return;
  }

  playBtn.disabled = true;
  playAgainBtn.classList.add("hidden");
  commentary.textContent = "🏟️ Kickoff!";
  explosionMessage.classList.add("hidden");

  // Simulate match timeline
  simulateMatch(teamA, teamB);
});

function simulateMatch(teamA, teamB) {
  const teamARating = teams[teamA];
  const teamBRating = teams[teamB];

  // Randomize goals (factor in team rating)
  const teamAScore = Math.floor(Math.random() * (teamARating / 25));
  const teamBScore = Math.floor(Math.random() * (teamBRating / 25));

  // Time Bomb triggers after 3 seconds
  setTimeout(() => {
    startTimeBombEvent(teamA);
  }, 3000);

  // Fake live commentary
  setTimeout(() => (commentary.textContent = `${teamA} is attacking...`), 1000);
  setTimeout(() => (commentary.textContent = `${teamB} takes possession...`), 2000);
  setTimeout(() => (commentary.textContent = `🔥 Close shot from ${teamA}!`), 4000);
  setTimeout(() => (commentary.textContent = `⚽ Goal by ${teamB}!`), 6000);
  setTimeout(() => {
    commentary.textContent = `🏁 Final Score: ${teamA} ${teamAScore} - ${teamBScore} ${teamB}`;
    showResult(teamA, teamB, teamAScore, teamBScore);
  }, 9000);
}

function showResult(teamA, teamB, scoreA, scoreB) {
  let result = "";

  if (scoreA > scoreB) {
    result = `🏆 ${teamA} Wins!`;
    winCount++;
    wins.textContent = winCount;
  } else if (scoreB > scoreA) {
    result = `❌ ${teamB} Wins!`;
    lossCount++;
    losses.textContent = lossCount;
  } else {
    result = "🤝 It's a Draw!";
    drawCount++;
    draws.textContent = drawCount;
  }

  commentary.textContent += `\n${result}`;
  playAgainBtn.classList.remove("hidden");
  playBtn.disabled = false;
}

// ==============================
// 💣 TIME BOMB FEATURE
// ==============================
function startTimeBombEvent(teamA) {
  alertBox.classList.remove("hidden");
  let countdown = 10;
  countdownEl.textContent = countdown;
  commentary.textContent = `⚠️ ALERT! ${teamA}'s best player has a TIME BOMB!`;

  const timer = setInterval(() => {
    countdown--;
    countdownEl.textContent = countdown;

    if (countdown <= 0) {
      clearInterval(timer);
      playerExplodes(teamA);
    }
  }, 1000);

  substituteBtn.onclick = () => {
    clearInterval(timer);
    alertBox.classList.add("hidden");
    commentary.textContent = `✅ You substituted your player in time!`;
    teams[teamA] -= 2; // slight penalty
  };
}

function playerExplodes(teamA) {
  alertBox.classList.add("hidden");
  explosionMessage.classList.remove("hidden");
  explosionMessage.textContent = `💥 ${teamA}'s best player exploded! Team rating -5`;
  teams[teamA] -= 5;
  commentary.textContent = `😱 ${teamA} lost their best player!`;
}

// ==============================
// 🔁 Play Again Button
// ==============================
playAgainBtn.addEventListener("click", () => {
  commentary.textContent = "Select your teams to play again.";
  playAgainBtn.classList.add("hidden");
  explosionMessage.classList.add("hidden");
});
