// ===================================
// ⚽ Soccer Manager Mini-Sim Script (with halves)
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

// ====== ANTHEM PATHS ======
const anthems = {
  "Manchester United": "sounds/man_united.mp3",
  "Liverpool": "sounds/liverpool.mp3",
  "Manchester City": "sounds/man_city.mp3",
  "Chelsea": "sounds/chelsea.mp3",
  "Arsenal": "sounds/arsenal.mp3",
  "Tottenham Hotspur": "sounds/tottenham.mp3",
  "Leicester City": "sounds/leicester.mp3",
  "West Ham United": "sounds/west_ham.mp3",
  "Everton": "sounds/everton.mp3",
  "Newcastle United": "sounds/newcastle.mp3",
  "Real Madrid": "sounds/real_madrid.mp3",
  "Barcelona": "sounds/barcelona.mp3",
  "Atletico Madrid": "sounds/atletico.mp3",
  "Sevilla": "sounds/sevilla.mp3",
  "Valencia": "sounds/valencia.mp3",
  "Real Sociedad": "sounds/real_sociedad.mp3",
  "Villarreal": "sounds/villarreal.mp3",
  "Athletic Bilbao": "sounds/athletic_bilbao.mp3",
  "Betis": "sounds/betis.mp3",
  "Celta Vigo": "sounds/celta_vigo.mp3",
  "Juventus": "sounds/juventus.mp3",
  "AC Milan": "sounds/ac_milan.mp3",
  "Inter Milan": "sounds/inter_milan.mp3",
  "Napoli": "sounds/napoli.mp3",
  "Roma": "sounds/roma.mp3",
  "Lazio": "sounds/lazio.mp3",
  "Atalanta": "sounds/atalanta.mp3",
  "Fiorentina": "sounds/fiorentina.mp3",
  "Torino": "sounds/torino.mp3",
  "Sassuolo": "sounds/sassuolo.mp3",
  "Bayern Munich": "sounds/bayern.mp3",
  "Borussia Dortmund": "sounds/dortmund.mp3",
  "RB Leipzig": "sounds/leipzig.mp3",
  "Bayer Leverkusen": "sounds/leverkusen.mp3",
  "VfL Wolfsburg": "sounds/wolfsburg.mp3",
  "Eintracht Frankfurt": "sounds/frankfurt.mp3",
  "Borussia Monchengladbach": "sounds/monchengladbach.mp3",
  "FC Cologne": "sounds/cologne.mp3",
  "Freiburg": "sounds/freiburg.mp3",
  "Union Berlin": "sounds/union_berlin.mp3",
  "Paris Saint-Germain": "sounds/psg.mp3",
  "Marseille": "sounds/marseille.mp3",
  "Monaco": "sounds/monaco.mp3",
  "Lyon": "sounds/lyon.mp3",
  "Rennes": "sounds/rennes.mp3",
  "Lille": "sounds/lille.mp3",
  "Nice": "sounds/nice.mp3",
  "Lens": "sounds/lens.mp3",
  "Strasbourg": "sounds/strasbourg.mp3",
  "Montpellier": "sounds/montpellier.mp3"
};

// ====== HTML ELEMENTS ======
const teamASelect = document.getElementById("teamA");
const teamBSelect = document.getElementById("teamB");
const resultDisplay = document.getElementById("result");
const playBtn = document.getElementById("playBtn");
const substituteBtn = document.getElementById("subBtn");
const timerDisplay = document.getElementById("timerDisplay");
const stadium = document.getElementById("stadium");
const anthemPlayer = document.getElementById("anthemPlayer");

// ====== SETUP ======
for (let team in teams) {
  [teamASelect, teamBSelect].forEach(select => {
    const opt = document.createElement("option");
    opt.value = team;
    opt.textContent = team;
    select.appendChild(opt);
  });
}

let matchDuration = 90;  // seconds = 90 "minutes"
let bestPlayerActive = true;
let timeBombActive = false;
let countdown, matchTimer;

// ====== MATCH LOGIC ======
playBtn.addEventListener("click", () => {
  const teamA = teamASelect.value;
  const teamB = teamBSelect.value;
  if (!teamA || !teamB || teamA === teamB) {
    resultDisplay.textContent = "Please select two different teams.";
    return;
  }

  playBtn.disabled = true;
  let timeLeft = matchDuration;
  timerDisplay.textContent = `⏱ Kick-off! 1st Half – ${timeLeft}s remaining`;

  matchTimer = setInterval(() => {
    timeLeft--;

    // Show halftime message at 45 seconds
    if (timeLeft === 45) {
      timerDisplay.textContent = `⏸️ Half-Time! 45s remaining until 2nd Half`;
      setTimeout(() => {
        timerDisplay.textContent = `⚽ 2nd Half underway! ${timeLeft}s left`;
      }, 3000);
    } else {
      timerDisplay.textContent = `⏱ Match time: ${timeLeft}s`;
    }

    if (timeLeft <= 0) {
      clearInterval(matchTimer);
      playBtn.disabled = false;
      timerDisplay.textContent = "🏁 Full-Time!";
      playMatchResult(teamA, teamB);
    }
  }, 1000);
});

function playMatchResult(teamA, teamB) {
  const teamARating = teams[teamA];
  const teamBRating = teams[teamB];
  const teamAScore = Math.floor(Math.random() * 5 + (teamARating - 75) / 10);
  const teamBScore = Math.floor(Math.random() * 5 + (teamBRating - 75) / 10);

  resultDisplay.textContent = `${teamA} ${teamAScore} - ${teamBScore} ${teamB}`;

  let winner = null;
  if (teamAScore > teamBScore) winner = teamA;
  else if (teamBScore > teamAScore) winner = teamB;

  if (winner) playStadiumAnimation(winner);

  // 🎵 Play anthem
  if (winner && anthems[winner]) {
    anthemPlayer.src = anthems[winner];
    anthemPlayer.play().catch(err => console.warn("Autoplay blocked:", err));
  }

  // 💣 Trigger time bomb after match
  startTimeBomb(teamA);
}

// ====== TIME BOMB ======
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

// ====== SUBSTITUTE BUTTON ======
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

// ====== STADIUM ANIMATION ======
function playStadiumAnimation(winningTeam) {
  stadium.classList.add("cheer");
  setTimeout(() => stadium.classList.remove("cheer"), 3000);
}
