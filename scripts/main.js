// Main Canvas
const display = document.querySelector("#game-display");
const cvs = display.getContext("2d");
let screenRatio = 0.6;
display.width = 1200 * screenRatio;
display.height = 800 * screenRatio;


// For report
const dataName = document.querySelectorAll("[value-data-name]");
const dataState = document.querySelectorAll("[value-data-state]");
const dataLocation = document.querySelectorAll("[value-data-location]");
const dataExtraInfo = document.querySelectorAll("[value-data-extra-info]");



// const colorDisplayer = document.querySelectorAll(".color-displayer");
// colorDisplayer[0].innerHTML = "Color DIsplayer";

// COLORS START
    // Normal
    GlossyGrape = "#A799B7";
    GlassyGrape = "#9888A5";
    OldLavender = "#776472";
    FeldGrau = "#445552";
    DarkSlateGray = "#294D4A";
    DimSkyBlue = "#83B5D1";
    Rythm = "#726E97";
    SunGlow = "#FFD23F";
    CaribeanGreen = "#3BCEAC";
    GoGreen = "#0EAD69";
    DavysGrey = "#595959";
    Xanadu = "#808F85";
    SunRay = "#EDB458"
    Celadon = "#BAD4AA";

    // Pink Family
    ParadisePink = "#EE4266";
    FieryRose = "#FB6376";
    Melon = "#FCB1A6";
    UnbleachedSilk = "#FFDCCC";
    FloralWhite = "#FFF9EC"
// COLORS END

// BACKGROUND START
cvs.fillStyle = Xanadu;
cvs.fillRect(0, 0, display.width, display.height);


// INITIAL VALUES
let speedX = 8;
let speedY = 20;

let initplayerHP = 750;
let initenemyHP = 900;

let playerHP = 750;
let enemyHP = 900;

let time = 4;
let gameOver = false;

// INITIAL ENTITIES
const player = new Sprite("player", //Name
    {x: 300, y: 80},                //Position
    Celadon,                        //Appearance
    playerHP,                            //Hitpoints
    {x: 0, y: speedY});            //Iniital Velocity

const enemy = new Sprite("enemy", 
    {x: 120, y: 60}, 
    ParadisePink, 
    enemyHP, 
    {x: 0, y: speedY});

const enemy2 = new Sprite("enemy2", 
    {x: 560, y: 200}, 
    FieryRose, 
    enemyHP-500,
    {x: 0, y: speedY});


// User Interface
const timer = document.getElementById("timer");
const playerHealthIndicator = document.getElementById('player-health');
const enemyHealthIndicator = document.getElementById('enemy-health');
const overlay = document.getElementById('overlay');
const gameStat = document.getElementById('game-status');
const nextBtn = document.getElementById('next-btn');

playerHealthIndicator.innerHTML = player.hp;
enemyHealthIndicator.innerHTML = enemy.hp;
timer.innerHTML = time;

function decreaseTimer() {
    setTimeout(decreaseTimer, 1000);
    timer.innerHTML = time;
    if (time >= 0) {
        --time;
    }

    if (time < 0) {
        timer.innerHTML = 0;
        gameOver = true;
    }
}

function displayerGameState() {
    overlay.classList.remove("hidden");
    if (player.hp == enemy.hp) {
        gameStat.innerHTML = "TIE";
    } else if (player.hp > enemy.hp) {
        gameStat.innerHTML = "Player win";
    } else if (player.hp < enemy.hp) {
        gameStat.innerHTML = "Enemy win";
    }
}

function updateStat(obj, index) {
    let x = Math.round(obj.pos.x);
    let y = Math.round(obj.pos.y);

    dataState[index].innerHTML = `${obj.name} : ${obj.hp}HP`;
    // dataLocation[index].innerHTML = `(${x}-${y}) >>> (${x + obj.width})-${y + obj.height})`
    dataLocation[index].innerHTML = `(${x}) - (${x + obj.width})`

    let playerHealth = Math.round((player.hp/playerHP) * 100);
    if (playerHealth <= 0) {
        playerHealth = 0;
    }
    // console.log(playerHealth);
    playerHealthIndicator.style.width = `${playerHealth}%`;
    playerHealthIndicator.innerHTML = `${playerHealth}%`;

    let enemyHealth = Math.round((enemy.hp/enemyHP) * 100);

    if (enemyHealth <= 0) {
        enemyHealth = 0;
    }
    // console.log(enemyHealth);
    enemyHealthIndicator.style.width = `${enemyHealth}%`;
    enemyHealthIndicator.innerHTML = `${enemyHealth}%`;
}

function execute() {
    updateStat(player, 0);    
    updateStat(player.attack, 01);
    updateStat(enemy, 2);    
    updateStat(enemy.attack, 3);
    // console.log("player atk: ", player.attack.pos);
    animate();
}

decreaseTimer();

interval500 = setInterval(execute, 20);


































