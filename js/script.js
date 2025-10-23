// ===================================
// ⚽ Soccer Manager Mini-Sim Script (AUDIO FIXED WITH DEDICATED BUTTON)
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

// 🎧 AUDIO CONFIG: Define the background track (needed only for reference)
const anthems = {
    "default": "Heat Waves.mp3" 
};


// ====== HTML REFERENCES ======
const teamASelect=document.getElementById("teamA");
const teamBSelect=document.getElementById("teamB");
const playBtn=document.getElementById("playMatch");
const commentary=document.getElementById("commentary");
const stadium=document.getElementById("stadium");
const alertBox=document.getElementById("alert-box");
const countdownEl=document.getElementById("countdown");
const countdownBar=document.getElementById("countdownBar");
const substituteBtn=document.getElementById("substitute-btn");
const explosionMsg=document.getElementById("explosion-message");
const playAgainBtn=document.getElementById("playAgain");
const wins=document.getElementById("wins");
const losses=document.getElementById("losses");
const draws=document.getElementById("draws");
const helpBtn=document.getElementById("help-btn");
const helpModal=document.getElementById("help-modal");
const closeHelp=document.getElementById("close-help");
const anthemPlayer=document.getElementById("anthem-player");

// 🎧 NEW REFERENCE: For the music button
const toggleMusicBtn = document.getElementById("toggleMusic"); 

let winCount=0, lossCount=0, drawCount=0, countdownTimer;
let isMusicPlaying = false; // New state tracker

// 🎧 AUDIO FIX: Configure the player initially
anthemPlayer.src = anthems["default"];
anthemPlayer.loop = true;
anthemPlayer.volume = 0.3; // Low background volume
// We assume the HTML audio tag is present and linked via 'anthem-player'

// ====== MUSIC TOGGLE FUNCTION ======
function toggleBackgroundMusic() {
    if (isMusicPlaying) {
        anthemPlayer.pause();
        toggleMusicBtn.textContent = "▶️ Start Background Music";
        isMusicPlaying = false;
    } else {
        // Crucial step: Set muted=false and volume before playing
        anthemPlayer.muted = false;
        anthemPlayer.volume = 0.3;
        // The .play() call now happens after a direct user click on this button
        anthemPlayer.play().then(() => {
            toggleMusicBtn.textContent = "⏸️ Pause Background Music";
            isMusicPlaying = true;
        }).catch(err => {
            console.error("Audio playback failed:", err);
            toggleMusicBtn.textContent = "❌ Audio Error (Check console/file)";
            isMusicPlaying = false;
        });
    }
}

// 🎧 MUSIC TOGGLE EVENT LISTENER
toggleMusicBtn.addEventListener("click", toggleBackgroundMusic);

// ====== POPULATE TEAMS AND HELP MODAL (Unchanged) ======
Object.keys(teams).forEach(team=>{
  let optA=document.createElement("option"); optA.value=team; optA.textContent=team; teamASelect.appendChild(optA);
  let optB=document.createElement("option"); optB.value=team; optB.textContent=team; teamBSelect.appendChild(optB);
});
teamASelect.selectedIndex=0; teamBSelect.selectedIndex=1;

helpBtn.addEventListener("click",()=>helpModal.style.display="block");
closeHelp.addEventListener("click",()=>helpModal.style.display="none");

// ====== STADIUM ANIMATION (Unchanged) ======
function createCrowdAnimation(){
  for(let i=0;i<40;i++){
    let fan=document.createElement("div");
    fan.classList.add("crowd");
    fan.style.left=(Math.random()*100)+"%";
    fan.style.animationDelay=(Math.random()*0.5)+"s";
    stadium.appendChild(fan);
  }
}

// ====== PLAY MATCH (Music logic removed from here) ======
playBtn.addEventListener("click",()=>{
  const teamA=teamASelect.value, teamB=teamBSelect.value;
  if(teamA===teamB){ commentary.textContent="⚠️ Choose two different teams!"; return; }
  playBtn.disabled=true;
  stadium.style.display="block"; stadium.innerHTML=""; createCrowdAnimation();
  commentary.textContent="🏟️ Match Kickoff!";
  
  // 🎧 Dim music slightly when the match starts
  if (isMusicPlaying) anthemPlayer.volume = 0.2; 
  
  simulateMatch(teamA,teamB);
});


// Match simulation (Unchanged - uses original setTimeout)
function simulateMatch(teamA,teamB){
  const aScore=Math.floor(Math.random()*3);
  const bScore=Math.floor(Math.random()*3);
  setTimeout(()=>commentary.textContent=`${teamA} attacks...`,1000);
  setTimeout(()=>commentary.textContent=`${teamB} defends...`,2500);
  setTimeout(()=>commentary.textContent=`🔥 ${teamA} shoots!`,4000);
  setTimeout(()=>commentary.textContent=`⚽ ${teamB} counters!`,5500);
  // Time Bomb starts the countdown (and dims music)
  setTimeout(()=>startTimeBomb(teamA),3000); 
  // Match ends (and restores music volume)
  setTimeout(()=>endMatch(teamA,teamB,aScore,bScore),8000); 
}

// End match (Restores music volume)
function endMatch(teamA,teamB,aScore,bScore){
  let result, winner=null;
  if(aScore>bScore){ result=`${teamA} Wins! 🏆`; winCount++; wins.textContent=winCount; winner=teamA;}
  else if(bScore>aScore){ result=`${teamB} Wins! ❌`; lossCount++; losses.textContent=lossCount; winner=teamB;}
  else{ result=`Draw 🤝`; drawCount++; draws.textContent=drawCount;}
  commentary.textContent=`🏁 Final Score: ${teamA} ${aScore} - ${bScore} ${teamB}\n${result}`;
  playBtn.disabled=false; playAgainBtn.classList.remove("hidden");
  
  // 🎧 Restore music volume
  if (isMusicPlaying) anthemPlayer.volume = 0.3;
}

// Time Bomb (Volume Ducking)
function startTimeBomb(teamA){
  alertBox.style.display="block"; 
  let time=5; countdownEl.textContent=time; 
  countdownBar.style.width="100%"; countdownBar.style.background="#ffcc00";
  
  // 🎧 Lower volume for alert
  if (isMusicPlaying) anthemPlayer.volume = 0.1;
  
  countdownTimer=setInterval(()=>{
    time--; countdownEl.textContent=time; countdownBar.style.width=(time*20)+"%"; // Changed to 20% for 5s
    if(time<=3) countdownBar.style.background="#ff5733";
    if(time<=0){ 
        clearInterval(countdownTimer); 
        playerExplodes(teamA);
        // 🎧 Restore volume on explosion if playing
        if (isMusicPlaying) anthemPlayer.volume = 0.3; 
    }
  }, 1000);
  
  substituteBtn.onclick=()=>{
    clearInterval(countdownTimer); 
    alertBox.style.display="none"; 
    commentary.textContent=`✅ ${teamA} substituted player safely.`; 
    teams[teamA]-=2;
    // 🎧 Restore volume on substitute if playing
    if (isMusicPlaying) anthemPlayer.volume = 0.3; 
  };
}

// Explosion effect (Unchanged)
function playerExplodes(teamA){
  alertBox.style.display="none";
  explosionMsg.textContent=`💥 ${teamA}'s best player exploded! Team rating -5`;
  explosionMsg.style.display="block"; explosionMsg.classList.add("explosion");
  teams[teamA]-=5;
  setTimeout(()=>explosionMsg.style.display="none",1500);
  commentary.textContent=`😱 ${teamA} lost a key player!`;
}

// Reset (Unchanged)
playAgainBtn.addEventListener("click",()=>{ 
    commentary.textContent="Select two teams and click Play Match again!"; 
    playAgainBtn.classList.add("hidden"); 
    stadium.style.display="none"; 
});