// Main Canvas
const display = document.querySelector("#game-display");
const cvs = display.getContext("2d");
let screenRatio = 0.8;
display.width = 1200 * screenRatio;
display.height = 600 * screenRatio;


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
// cvs.fillStyle = Xanadu;
// cvs.fillRect(0, 0, display.width, display.height);
const background = new Sprite ({
    name: "background-main",
    position: {x: 0, y: 0},
    size: {width: display.width, height: display.height + 35, useSelfSize: false},
    imageSrc: '../assets/Chris Courses - Fighting Game/background.png',
    scale: 1,
    framesMax: 1
});

const shop = new Sprite ({
    name: "background-shop",
    position: {x: 580, y: 80},
    size: {width: 180, height: 200, useSelfSize: false},
    imageSrc: '../assets/Chris Courses - Fighting Game/shop.png',
    scale: 1.75,
    framesMax: 6
});



// INITIAL VALUES
let speedX = 5;
let speedY = 20;

let initplayerHP = 750;
let initenemyHP = 900;

let playerHP = 750;
let enemyHP = 900;

let time = 60;
let gameOver = false;

// INITIAL ENTITIES
const player = new Fighter({
    name: "player",
    position: {x: 0, y: 80},
    size: {width: 72, height: 120, useSelfSize: true}, 
    imageSrc: '../assets/Chris Courses - Fighting Game/samuraiMack/Idle.png',
    scale: 2,
    framesMax: 8,
    frameCurrent: 1,
    centeringOffset: {x: 80, y: 62},
    hitpoints: playerHP,
    velocity: {x: 0, y: speedY}
});

const enemy = new Fighter({
    name: "enemy",
    position: {x: 350, y: 60}, 
    size: {width: 72, height: 120, useSelfSize: true}, 
    imageSrc: '../assets/Chris Courses - Fighting Game/kenji/idle.png',
    scale: 2.15,
    framesMax: 4,
    frameCurrent: 1,
    centeringOffset: {x: 88, y: 72},
    hitpoints: enemyHP, 
    velocity: {x: 0, y: speedY}
});



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
    let x = Math.round(obj.position.x);
    let y = Math.round(obj.position.y);

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
    updateStat(player.attack, 1);
    updateStat(enemy, 2);    
    updateStat(enemy.attack, 3);
    // console.log("player atk: ", player.attack.pos);
    animate();
}

decreaseTimer();

interval500 = setInterval(execute, 25);

















const lama = new Fighter({
    name: "lama",
    position: {x: 400, y: 20},
    size: {width: 60 * 4, height: 50}, 
    imageSrc: '../assets/Chris Courses - Fighting Game/kenji/idle.png',
    // imageSrc: '../assets/lama1.jpg                                ',
    scale: 1,
    framesMax: 4,
    frameCurrent: 1,
    centeringOffset: {x: 80, y: 70},
    hitpoints: playerHP,
    velocity: {x: 0, y: speedY}
});

const kama = new Fighter({
    name: " kama",
    position: {x: 400, y: 20},
    size: {width: 50 * 4, height: 50}, 
    // imageSrc: '../assets/Chris Courses - Fighting Game/kenji/idle.png',
    imageSrc: '../assets/lama1.jpg                                ',
    scale: 1,
    framesMax: 4,
    frameCurrent: 1,
    centeringOffset: {x: 70, y: 50},
    hitpoints: playerHP,
    velocity: {x: 0, y: speedY}
});
















