// =================================== 
// ⚽ Soccer Manager Mini-Sim Script
// ===================================

// ====== TEAM RATINGS ======
const teams = {
  "Manchester United": 88, "Liverpool": 90, "Manchester City": 92, "Chelsea": 87,
  "Arsenal": 86, "Tottenham Hotspur": 85, "Leicester City": 83, "West Ham United": 82,
  "Everton": 80, "Newcastle United": 84, "Real Madrid": 91, "Barcelona": 90,
  "Atletico Madrid": 88, "Sevilla": 85, "Valencia": 82, "Real Sociedad": 83,
  "Villarreal": 81, "Athletic Bilbao": 80, "Betis": 79, "Celta Vigo": 78,
  "Juventus": 89, "AC Milan": 88, "Inter Milan": 90, "Napoli": 87, "Roma": 85,
  "Lazio": 84, "Atalanta": 83, "Fiorentina": 81, "Torino": 80, "Sassuolo": 78,
  "Bayern Munich": 92, "Borussia Dortmund": 88, "RB Leipzig": 85, "Bayer Leverkusen": 84,
  "VfL Wolfsburg": 82, "Eintracht Frankfurt": 81, "Borussia Monchengladbach": 80,
  "FC Cologne": 78, "Freiburg": 77, "Union Berlin": 79, "Paris Saint-Germain": 92,
  "Marseille": 85, "Monaco": 84, "Lyon": 83, "Rennes": 81, "Lille": 82,
  "Nice": 79, "Lens": 78, "Strasbourg": 77, "Montpellier": 76
};

// ====== HTML REFERENCES ======
const teamASelect = document.getElementById("teamA");
const teamBSelect = document.getElementById("teamB");
const playBtn = document.getElementById("playMatch");
const commentary = document.getElementById("commentary");
const stadium = document.getElementById("stadium");
const alertBox = document.getElementById("alert-box");
const countdownEl = document.getElementById("countdown");
const countdownBar = document.getElementById("countdownBar");
const substituteBtn = document.getElementById("substitute-btn");
const explosionMsg = document.getElementById("explosion-message");
const playAgainBtn = document.getElementById("playAgain");
const wins = document.getElementById("wins");
const losses = document.getElementById("losses");
const draws = document.getElementById("draws");
const helpBtn = document.getElementById("help-btn");
const helpModal = document.getElementById("help-modal");
const closeHelp = document.getElementById("close-help");
const anthemPlayer = document.getElementById("anthem-player");
const matchTimeDisplay = document.getElementById("matchTime");
const liveScoreDisplay = document.getElementById("liveScore");

let matchTimer, timeElapsed, teamAScore, teamBScore;
let winCount = 0, lossCount = 0, drawCount = 0;
let countdownTimer;

// ====== POPULATE TEAMS ======
for (let team in teams) {
  let optionA = document.createElement("option");
  optionA.value = team;
  optionA.textContent = team;
  teamASelect.appendChild(optionA);

  let optionB = document.createElement("option");
  optionB.value = team;
  optionB.textContent = team;
  teamBSelect.appendChild(optionB);
}
teamASelect.selectedIndex = 0;
teamBSelect.selectedIndex = 1;

// ====== HELP MODAL ======
helpBtn.addEventListener("click", () => helpModal.style.display = "block");
closeHelp.addEventListener("click", () => helpModal.style.display = "none");

// ====== PLAY MATCH ======
playBtn.addEventListener("click", () => {
  const teamA = teamASelect.value;
  const teamB = teamBSelect.value;
  if (teamA === teamB) { commentary.textContent = "⚠️ Choose two different teams!"; return; }

  resetMatchUI();
  playBtn.disabled = true;
  stadium.style.display = "block";
  createCrowdAnimation();

  commentary.textContent = "🏟️ Kickoff! The match begins!";
  teamAScore = 0;
  teamBScore = 0;
  timeElapsed = 0;

  matchTimer = setInterval(() => updateMatch(teamA, teamB), 1000);
});

// ====== CROWD ANIMATION ======
function createCrowdAnimation() {
  stadium.innerHTML = "";
  for (let i = 0; i < 40; i++) {
    let fan = document.createElement("div");
    fan.classList.add("crowd");
    fan.style.left = (Math.random() * 100) + "%";
    fan.style.animationDelay = (Math.random() * 0.5) + "s";
    stadium.appendChild(fan);
  }
}

// ====== MATCH LOOP ======
function updateMatch(teamA, teamB) {
  timeElapsed++;
  matchTimeDisplay.textContent = `⏱️ Time: ${timeElapsed}'`;

  // halftime
  if (timeElapsed === 45) {
    commentary.textContent = "🕒 Halftime break!";
  }

  // Random score event
  if (Math.random() < 0.08) {
    if (Math.random() < 0.5) teamAScore++;
    else teamBScore++;
    liveScoreDisplay.textContent = `⚽ Score: ${teamAScore} - ${teamBScore}`;
    commentary.textContent = `${teamA} ${teamAScore} - ${teamBScore} ${teamB}`;
  }

  // Random time bomb trigger
  if (Math.random() < 0.03 && timeElapsed < 80) startTimeBomb(teamA);

  // Full time (90s)
  if (timeElapsed >= 90) endMatch(teamA, teamB);
}

// ====== END MATCH ======
function endMatch(teamA, teamB) {
  clearInterval(matchTimer);
  playBtn.disabled = false;
  playAgainBtn.classList.remove("hidden");

  let result, winner = null;
  if (teamAScore > teamBScore) { result = `${teamA} Wins! 🏆`; winCount++; wins.textContent = winCount; winner = teamA; }
  else if (teamBScore > teamAScore) { result = `${teamB} Wins! ❌`; lossCount++; losses.textContent = lossCount; winner = teamB; }
  else { result = `Draw 🤝`; drawCount++; draws.textContent = drawCount; }

  commentary.textContent = `🏁 Full Time: ${teamA} ${teamAScore} - ${teamBScore} ${teamB}\n${result}`;

  if (winner) playAnthem(winner);
}

// ====== PLAY ANTHEM ======
function playAnthem(teamName) {
  const anthemPath = `sounds/${teamName.toLowerCase().replace(/\s+/g, "_")}.mp3`;
  anthemPlayer.src = anthemPath;
  anthemPlayer.play().catch(err => console.warn("Autoplay blocked:", err));
}

// ====== TIME BOMB ======
function startTimeBomb(teamA) {
  if (alertBox.style.display === "block") return; // one at a time
  alertBox.style.display = "block";
  let time = 5;
  countdownEl.textContent = time;
  countdownBar.style.width = "100%";

  countdownTimer = setInterval(() => {
    time--;
    countdownEl.textContent = time;
    countdownBar.style.width = (time * 20) + "%";
    if (time <= 0) {
      clearInterval(countdownTimer);
      playerExplodes(teamA);
    }
  }, 1000);

  substituteBtn.onclick = () => {
    clearInterval(countdownTimer);
    alertBox.style.display = "none";
    commentary.textContent = `✅ ${teamA} substituted safely!`;
    teams[teamA] -= 2;
  };
}

// ====== EXPLOSION ======
function playerExplodes(teamA) {
  alertBox.style.display = "none";
  explosionMsg.textContent = `💥 ${teamA}'s best player exploded!`;
  explosionMsg.style.display = "block";
  explosionMsg.classList.add("explosion");
  teams[teamA] -= 5;
  setTimeout(() => explosionMsg.style.display = "none", 1500);
}

// ====== RESET MATCH ======
playAgainBtn.addEventListener("click", () => {
  commentary.textContent = "Select two teams and click Play Match again!";
  playAgainBtn.classList.add("hidden");
  stadium.style.display = "none";
  liveScoreDisplay.textContent = "⚽ Score: 0 - 0";
  matchTimeDisplay.textContent = "⏱️ Time: 0'";
});

function resetMatchUI() {
  commentary.textContent = "";
  liveScoreDisplay.textContent = "⚽ Score: 0 - 0";
  matchTimeDisplay.textContent = "⏱️ Time: 0'";
  alertBox.style.display = "none";
}
