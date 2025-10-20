// ==============================
// ⚽ Soccer Manager Mini-Sim JS
// ==============================

// --- Teams by Major Leagues ---
const teams = {
  // English Premier League
  "Manchester United": 88,
  "Liverpool": 90,
  "Manchester City": 92,
  "Chelsea": 87,
  "Arsenal": 86,
  "Tottenham Hotspur": 85,
  "Leicester City": 83,
  "West Ham United": 82,
  "Everton": 80,
  "Newcastle United": 84,

  // La Liga (Spain)
  "Real Madrid": 91,
  "Barcelona": 90,
  "Atletico Madrid": 88,
  "Sevilla": 85,
  "Valencia": 82,
  "Real Sociedad": 83,
  "Villarreal": 81,
  "Athletic Bilbao": 80,
  "Betis": 79,
  "Celta Vigo": 78,

  // Serie A (Italy)
  "Juventus": 89,
  "AC Milan": 88,
  "Inter Milan": 90,
  "Napoli": 87,
  "Roma": 85,
  "Lazio": 84,
  "Atalanta": 83,
  "Fiorentina": 81,
  "Torino": 80,
  "Sassuolo": 78,

  // Bundesliga (Germany)
  "Bayern Munich": 92,
  "Borussia Dortmund": 88,
  "RB Leipzig": 85,
  "Bayer Leverkusen": 84,
  "VfL Wolfsburg": 82,
  "Eintracht Frankfurt": 81,
  "Borussia Monchengladbach": 80,
  "FC Cologne": 78,
  "Freiburg": 77,
  "Union Berlin": 79,

  // Ligue 1 (France)
  "Paris Saint-Germain": 92,
  "Marseille": 85,
  "Monaco": 84,
  "Lyon": 83,
  "Rennes": 81,
  "Lille": 82,
  "Nice": 79,
  "Lens": 78,
  "Strasbourg": 77,
  "Montpellier": 76
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
    teams[teamA] -= 2; // slight penalty for substitution
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
