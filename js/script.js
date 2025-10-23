// ===================================
// ⚽ Soccer Manager Mini-Sim Script (HEAT WAVES BACKGROUND ONLY)
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

// =========================================================================
// 🎧 AUDIO FIX: ANTHEM MAPPING (Only includes the one background track)
// =========================================================================
const anthems = {
    "default": "Heat Waves.mp3" 
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
// Note: This must reference the ID of the single audio tag
const anthemPlayer = document.getElementById("anthem-player"); 
// Assuming help modal elements exist for completeness
const helpBtn = document.getElementById("help-btn");
const helpModal = document.getElementById("help-modal");
const closeHelp = document.getElementById("close-help");


// ====== LIVE SCORE DIV ======
const liveScoreDiv = document.createElement("div");
liveScoreDiv.style.fontSize = "1.2rem";
liveScoreDiv.style.fontWeight = "bold";
liveScoreDiv.style.marginTop = "0.5rem";
liveScoreDiv.style.background = "rgba(0,0,0,0.2)";
liveScoreDiv.style.padding = "0.5rem";
liveScoreDiv.style.borderRadius = "8px";
commentary.parentNode.insertBefore(liveScoreDiv, commentary);

// ====== GAME STATE ======
let winCount = 0, lossCount = 0, drawCount = 0;
let countdownTimer, timeElapsed = 0, matchInterval;
let teamAScore = 0, teamBScore = 0;
let isHalftime = false;

// 🎧 AUDIO FIX: Initialize the background audio settings
anthemPlayer.src = anthems["default"]; 
anthemPlayer.loop = true;
anthemPlayer.volume = 0.3; // Low volume for background music


// ====== POPULATE TEAMS ======
Object.keys(teams).forEach(team => {
  let optA = document.createElement("option"); optA.value = team; optA.textContent = team; teamASelect.appendChild(optA);
  let optB = document.createElement("option"); optB.value = team; optB.textContent = team; teamBSelect.appendChild(optB);
});
teamASelect.selectedIndex = 0; teamBSelect.selectedIndex = 1;

// ====== HELP MODAL (Restored logic) ======
if (helpBtn && helpModal && closeHelp) {
    helpBtn.addEventListener("click", () => helpModal.style.display = "block");
    closeHelp.addEventListener("click", () => helpModal.style.display = "none");
}

// ====== STADIUM ANIMATION ======
function createCrowdAnimation() {
  stadium.innerHTML = "";
  for (let i = 0; i < 40; i++) {
    let fan = document.createElement("div");
    fan.classList.add("crowd");
    fan.style.left = Math.random() * 100 + "%";
    fan.style.animationDelay = Math.random() * 0.5 + "s";
    stadium.appendChild(fan);
  }
}

// ====== PLAY MATCH (CRITICAL AUDIO FIX APPLIED HERE) ======
playBtn.addEventListener("click", () => {
  const teamA = teamASelect.value, teamB = teamBSelect.value;
  if (teamA === teamB) { commentary.textContent = "⚠️ Choose two different teams!"; return; }

  // 🎧 FIX: Start background music on the first click (bypasses browser autoplay block)
  anthemPlayer.volume = 0.3; // Ensure volume is quiet
  anthemPlayer.loop = true; // Ensure it loops
  anthemPlayer.play().catch(err => console.warn("Background audio blocked.", err));
    
  clearInterval(matchInterval);

  playBtn.disabled = true;
  stadium.style.display = "block";
  createCrowdAnimation();

  timeElapsed = 0; teamAScore = 0; teamBScore = 0; isHalftime = false;
  commentary.textContent = "🏟️ Match Kickoff!";
  updateLiveScore(); 
  matchInterval = setInterval(() => updateMatch(teamA, teamB), 1000); 
});

// ====== UPDATE MATCH FUNCTION (Restored minute-by-minute loop) ======
function updateMatch(teamA, teamB) {
  if (!isHalftime) timeElapsed++;

  // Halftime at 45'
  if (!isHalftime && timeElapsed === 45) {
    isHalftime = true;
    updateLiveScore();
    commentary.textContent = `🕒 Halftime: ${teamA} ${teamAScore} - ${teamBScore} ${teamB}`;
    setTimeout(() => {
      isHalftime = false;
      commentary.textContent = `🏟️ Second Half Begins!`;
    }, 5000);
    return;
  }

  if (!isHalftime) {
    // Random scoring events
    if (Math.random() < 0.08) { if (Math.random() < 0.5) teamAScore++; else teamBScore++; }

    // Random time bomb
    if (Math.random() < 0.03 && timeElapsed < 80) startTimeBomb(teamA);

    // Update live score
    updateLiveScore();

    // End of match
    if (timeElapsed >= 90) endMatch(teamA, teamB);
  }
}

// ====== LIVE SCORE DISPLAY ======
function updateLiveScore() {
  liveScoreDiv.textContent = `⏱️ Time: ${timeElapsed}' | ${teamASelect.value} ${teamAScore} - ${teamBScore} ${teamBSelect.value}`;
}

// ====== TIME BOMB (Includes volume ducking for alert) ======
function startTimeBomb(teamA) {
  if(alertBox.style.display === "block") return; 

  // 🎧 Lower volume for alert
  anthemPlayer.volume = 0.1;
    
  alertBox.style.display = "block"; 
  let time = 5; countdownEl.textContent = time; countdownBar.style.width = "100%"; countdownBar.style.background = "#ffcc00";
  countdownTimer = setInterval(() => {
    time--; countdownEl.textContent = time; countdownBar.style.width = (time * 20) + "%"; 
    if (time <= 3) countdownBar.style.background = "#ff5733";
    if (time <= 0) { 
        clearInterval(countdownTimer); 
        playerExplodes(teamA); 
        anthemPlayer.volume = 0.3; // 🎧 Restore volume
    }
  }, 1000);

  substituteBtn.onclick = () => {
    clearInterval(countdownTimer);
    alertBox.style.display = "none";
    commentary.textContent = `✅ ${teamA} substituted player safely.`;
    teams[teamA] -= 2;
    anthemPlayer.volume = 0.3; // 🎧 Restore volume
  };
}

// ====== PLAYER EXPLOSION ======
function playerExplodes(teamA) {
  alertBox.style.display = "none";
  explosionMsg.textContent = `💥 ${teamA}'s best player exploded! Team rating -5`;
  explosionMsg.style.display = "block"; explosionMsg.classList.add("explosion");
  teams[teamA] -= 5;
  setTimeout(() => explosionMsg.style.display = "none", 1500);
}

// ====== END MATCH (Ensures music is running quietly and looping) ======
function endMatch(teamA, teamB) {
  clearInterval(matchInterval);
  playBtn.disabled = false;
  let result, winner = null;
  if (teamAScore > teamBScore) { result = `${teamA} Wins! 🏆`; winCount++; wins.textContent = winCount; winner = teamA; }
  else if (teamBScore > teamAScore) { result = `${teamB} Wins! ❌`; lossCount++; losses.textContent = lossCount; winner = teamB; }
  else { result = `Draw 🤝`; drawCount++; draws.textContent = drawCount; }
  commentary.textContent = `🏁 Final Score: ${teamA} ${teamAScore} - ${teamBScore} ${teamB}\n${result}`;

  // 🎧 Ensure volume is restored to the background level after match end
  anthemPlayer.volume = 0.3; 
  anthemPlayer.loop = true; 

  playAgainBtn.classList.remove("hidden");
}

// ====== RESET MATCH (Ensures music is quiet and looping) ======
playAgainBtn.addEventListener("click", () => {
  // 🎧 Ensure music is running quietly and looping
  anthemPlayer.volume = 0.3;
  anthemPlayer.loop = true;
  // No need to call play() again unless the user previously paused it.
  
  commentary.textContent = "Select two teams and click Play Match again!";
  liveScoreDiv.textContent = "";
  playAgainBtn.classList.add("hidden");
  stadium.style.display = "none";
});