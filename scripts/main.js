const display = document.querySelector("#game-display");
const cvs = display.getContext("2d");
let screenRatio = 0.6;
display.width = 1200 * screenRatio;
display.height = 800 * screenRatio;
// Main Canvas

// Extra Information
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
// BACKGROUND END


// INITIAL ENTITIES
const player = new Sprite("player", //Name
    {x: 300, y: 80},                //Position
    Celadon,                        //Appearance
    500,                            //Hitpoints
    {x: 0, y: -speedY});            //Iniita Velocity

const enemy1 = new Sprite("enemy1", 
    {x: 560, y: 200}, 
    ParadisePink, 
    800, 
    {x: 0, y: -speedY});

const enemy2 = new Sprite("enemy2", 
    {x: 120, y: 64}, 
    FieryRose, 
    1000,
    {x: 0, y: -speedY});




    
function updateStat(obj, index) {
    let x = Math.round(obj.pos.x);
    let y = Math.round(obj.pos.y);

    // dataLocation[index].innerHTML = `${obj.name} : ${obj.hp}`;
    // dataLocation[index].innerHTML = `(${x}-${y}) >>> (${x + obj.width})-${y + obj.height})`

    dataLocation[index].innerHTML = `(${x}) - (${x + obj.width})`
}

function execute() {
    updateStat(player, 0);    
    updateStat(player.attack, 01);
    updateStat(enemy1, 2);    
    updateStat(enemy1.attack, 3);
    updateStat(enemy2, 4);    
    updateStat(enemy2.attack, 5);
    // console.log("player atk: ", player.attack.pos);
    animate();
}

interval500 = setInterval(execute, 20);

