const display = document.querySelector("#main-display");

const con = display.getContext("2d");

let screenRatio = 0.8;

display.width = 800 * screenRatio;
display.height = 400 * screenRatio;


// COLORS START

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
Celadon ="#BAD4AA";

//Pink
ParadisePink = "#EE4266";
FieryRose = "#FB6376";
Melon = "#FCB1A6";
UnbleachedSilk = "#FFDCCC";
FloralWhite = "#FFF9EC"

// COLORS END

let gravity = 1.2;

con.fillStyle = FeldGrau;
con.fillRect(0, 0, display.width, display.height);

function keepInside(obj) {
    // if (obj.pos.y <= 0) { //Top
    //     obj.pos.y = 0;
    // }

    if (obj.pos.y + 80 >= display.height) { //Bottom
        obj.pos.y = display.height - 80;
        obj.inAir = false;
    }


    if (obj.pos.x + 40 >= display.width) { //Right
        obj.pos.x = display.width - 40;
    }
    
    if (obj.pos.x <= 0) { //left
        obj.pos.x = 0;
    }
}

function checkCollision(gameState) {
    
}

class Sprite {
    constructor(position, appearance, velocity = {x: 0, y: 0}) {
        this.pos = position;
        this.look = appearance;
        this.velocity = velocity;
        this.inAir = true;
    }

    draw() {
        con.fillStyle = this.look;
        con.fillRect(this.pos.x, this.pos.y, 40, 80);
    }

    update() {
        this.velocity.y += gravity;
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        keepInside(this);

        this.draw();
    }

    jump() {
        this.velocity.y = -speedY;
        this.inAir = true;
    }
}

const movement = {
    keyDPressed: false,
    keyAPressed: false,
    keyWPressed: false,
    keySPressed: false,
    keyRAPressed: false,
    keyLAPressed: false,
    keyUAPressed: false,
    keyDAPressed: false

}

// let lastKey; //to be more accurate 
let speedX = 8;
let speedY = 20;

const player = new Sprite({
    x: 300,
    y: 00
}, Celadon, {x: 0, y: -speedY});

const enemy1 = new Sprite({
    x: 560,
    y: 00
}, ParadisePink, {x: 0, y: -speedY});

const enemy2 = new Sprite({
    x: 120,
    y: 00
}, FieryRose, {x: 0, y: -speedY});

function animate() {
    con.clearRect(0, 0, display.width, display.height);
    con.fillStyle = FeldGrau;
    con.fillRect(0, 0, display.width, display.height);


    //Avoid using elseif because we need to use multiple keys at once
    //Player Section
        // if (movement.keyDPressed == true && lastKey.toLowerCase() == "d") {
        if (movement.keyDPressed == true) {
            player.velocity.x = speedX;
        }

        // if (movement.keyAPressed == true && lastKey.toLowerCase() == "a") {
        if (movement.keyAPressed == true) {
            player.velocity.x = -speedX;
        }

        if (movement.keyWPressed == true && player.inAir == false) {
            player.jump();
        }

    // Enemy Section
        // if (movement.keyRAPressed == true && lastKey.toLowerCase() == "arrowright") {
        if (movement.keyRAPressed == true) {
            enemy1.velocity.x = speedX;
            enemy2.velocity.x = speedX;
        }

        // if (movement.keyLAPressed == true && lastKey.toLowerCase() == "arrowleft") {
        if (movement.keyLAPressed == true) {
            enemy1.velocity.x = -speedX;
            enemy2.velocity.x = -speedX;
        }

        if (movement.keyUAPressed == true && enemy1.inAir == false && enemy2.inAir == false) {
            enemy1.jump();
            enemy2.jump();
        }


    player.update();
    enemy1.update();
    enemy2.update();

    player.velocity = {x: 0, y: player.velocity.y};
    enemy1.velocity = {x: 0, y: enemy1.velocity.y};
    enemy2.velocity = {x: 0, y: enemy2.velocity.y};
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {

        // Player
        case "a":
            movement.keyAPressed = true;
            // lastKey = "a";
            break;
        case "d":
            movement.keyDPressed = true;
            // lastKey = "d";
            break;
        case "w":
            movement.keyWPressed = true;
            break;
        case "s":
            movement.keySPressed = true;
            // lastKey = "s";
            break;


        // Enemy
        case "ArrowLeft":
            movement.keyLAPressed = true;
            // lastKey = "ArrowLeft";
            break;
        case "ArrowRight":
            movement.keyRAPressed = true;
            // lastKey = "ArrowRight";
            break;
        case "ArrowUp":
            movement.keyUAPressed = true;
            break;
        case "ArrowDown":
            movement.keyDAPressed = true;
            // lastKey = "ArrowDown";
            break;
    }
});

document.addEventListener("keyup", (event) => {
    switch (event.key) {

        // Player
        case "a":
            movement.keyAPressed = false;
            break;
        case "d":
            movement.keyDPressed = false;
            break;
        case "w":
            movement.keyWPressed = false;
            break;
        case "s":
            movement.keySPressed = false;
            break;


        // Enemy
        case "ArrowLeft":
            movement.keyLAPressed = false;
            break;
        case "ArrowRight":
            movement.keyRAPressed = false;
            break;
        case "ArrowUp":
            movement.keyUAPressed = false;
            break;
        case "ArrowDown":
            movement.keyDAPressed = false;
            break;
    }
});





interval500 = setInterval(animate, 20);