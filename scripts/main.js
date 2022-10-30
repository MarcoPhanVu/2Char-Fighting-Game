const display = document.querySelector("#main-display");
const con = display.getContext("2d");
let screenRatio = 0.6;
display.width = 960 * screenRatio;
display.height = 480 * screenRatio;


const charState = document.querySelectorAll("[char-state]");
const charLocation = document.querySelectorAll("[char-location]");
const charExtInfo = document.querySelectorAll("[char-extra-in4]");

const colorDisplayer = document.querySelectorAll(".color-displayer")
colorDisplayer.innerHTML = "hey";

const para = document.createElement("p");



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
con.fillStyle = FeldGrau;
con.fillRect(0, 0, display.width, display.height);
// BACKGROUND END



const player = new Sprite("player", {
    x: 300,
    y: 80
}, Celadon, {x: 0, y: speedY});

const enemy1 = new Sprite("enemy1", {
    x: 560,
    y: 200
}, ParadisePink, {x: 0, y: speedY});

const enemy2 = new Sprite("enemy2", {
    x: 120,
    y: 64
}, FieryRose, {x: 0, y: speedY});

function updateReport(obj, index) {
    let x = Math.round(obj.pos.x);
    let y = Math.round(obj.pos.y);

    charLocation[index].innerHTML = `(${x} - ${y}) ==>> (${x + obj.width}) - ${y + obj.height})`
}

function execute() {
    // charState[0].innerHTML = checkCollision(player.attack, enemy2);
    updateReport(player, 0);
    updateReport(enemy1, 1);
    updateReport(enemy2, 2);

    animate();
}

interval500 = setInterval(execute, 20);