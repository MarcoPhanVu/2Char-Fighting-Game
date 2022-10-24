const display = document.querySelector("#main-display");

const con = display.getContext("2d");

let screenRatio = 0.6;

display.width = 960 * screenRatio;
display.height = 480 * screenRatio;


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



const player = new Sprite({
    x: 300,
    y: 24
}, Celadon, {x: 0, y: -speedY});

const enemy1 = new Sprite({
    x: 560,
    y: 24
}, ParadisePink, {x: 0, y: -speedY});

const enemy2 = new Sprite({
    x: 120,
    y: 24
}, FieryRose, {x: 0, y: -speedY});




interval500 = setInterval(animate, 20);