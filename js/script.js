// ===================================
// ⚽ Soccer Manager Mini-Sim Script
// ===================================

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

// ====== ANTHEM SOUNDS ======
const anthems = {
  "Manchester United":"https://actions.google.com/sounds/v1/sports/football_crowd.ogg",
  "Liverpool":"https://actions.google.com/sounds/v1/ambiences/crowd_cheer.ogg",
  "Manchester City":"https://actions.google.com/sounds/v1/sports/football_kick.ogg",
  "Chelsea":"https://actions.google.com/sounds/v1/human_voices/chant_crowd.ogg",
  "Arsenal":"https://actions.google.com/sounds/v1/music/ukulele_strum.ogg",
  "Tottenham Hotspur":"https://actions.google.com/sounds/v1/music/classical_orchestra.ogg",
  "Leicester City":"https://actions.google.com/sounds/v1/human_voices/cheer.ogg",
  "West Ham United":"https://actions.google.com/sounds/v1/human_voices/yell.ogg",
  "Everton":"https://actions.google.com/sounds/v1/ambiences/crowd.ogg",
  "Newcastle United":"https://actions.google.com/sounds/v1/music/tada.ogg"
  // Add more teams if desired...
};

// ====== HTML REFERENCES ======
const teamASelect = document.getElementById("teamA");
const teamBSelect = document.getElementById("teamB");
const resultDisplay = document.getElementById("result");
const playBtn = document.getElementById("playBtn");
const substituteBtn = document.getElementById("subBtn");
const timerDisplay = document.getElementById("timerDisplay");
const stadium = document.getElementById("stadium"); // mini stadium div
const anthemPlayer = new Audio();

// ====== POPULATE TEAM DROPDOWNS ======
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

// ====== GAME STATE ======
let bestPlayerActive = true;
let timeBombActive = false;
let countdown;

// ====== MATCH SIMULATION ======
playBtn.addEventListener("click", () => {
  const teamA = teamASelect.value;
  const teamB = teamBSelect.value;

  if (!teamA || !teamB || teamA === teamB) {
    resultDisplay.textContent = "Please select two different teams.";
    return;
  }

  const teamARating = teams[teamA];
  const teamBRating = teams[teamB];

  // Random score simulation
  const teamAScore = Math.floor(Math.random() * 5 + (teamARating - 75) / 10);
  const teamBScore = Math.floor(Math.random() * 5 + (teamBRating - 75) / 10);

  // Display result
  resultDisplay.textContent = `${teamA} ${teamAScore} - ${teamBScore} ${teamB}`;

  // Animate stadium cheering based on winner
  let winner = null;
  if (teamAScore > teamBScore) winner = teamA;
  else if (teamBScore > teamAScore) winner = teamB;

  if (winner) playStadiumAnimation(winner);

  // Play anthem of winning team
  if (winner && anthems[winner]) {
    anthemPlayer.src = anthems[winner];
    anthemPlayer.play().catch(() => console.log("Autoplay blocked"));
  }

  // Start time bomb event
  startTimeBomb(teamA);
});

// ====== TIME BOMB FEATURE ======
function startTimeBomb(teamName) {
  if (timeBombActive) return;
  timeBombActive = true;

  let timeLeft = 10;
  timerDisplay.textContent = `💣 Sub your best player in ${timeLeft}s or they EXPLODE!`;

  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `💣 Hurry! ${timeLeft}s left...`;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = `💥 ${teamName}'s best player exploded!`;
      removeBestPlayer(teamName);
      timeBombActive = false;
    }
  }, 1000);
}

// ====== SUBSTITUTE FEATURE ======
substituteBtn.addEventListener("click", () => {
  if (!timeBombActive) {
    timerDisplay.textContent = "No active time bomb right now.";
    return;
  }

  clearInterval(countdown);
  timerDisplay.textContent = `✅ You substituted your best player in time! Crisis averted.`;
  bestPlayerActive = false;
  timeBombActive = false;
});

function removeBestPlayer(teamName) {
  bestPlayerActive = false;
  teams[teamName] = Math.max(60, teams[teamName] - 5);
  resultDisplay.textContent += ` ${teamName} loses strength! (New rating: ${teams[teamName]})`;
}

// ====== MINI STADIUM ANIMATION ======
function playStadiumAnimation(winningTeam) {
  stadium.classList.add("cheer");
  setTimeout(() => stadium.classList.remove("cheer"), 3000);
}
