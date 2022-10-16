const display = document.querySelector("#main-display");

const con = display.getContext("2d");

let screenRatio = 0.8;

display.width = 800 * screenRatio;
display.height = 600 * screenRatio;


// COLORS START

GlossyGrape = "#A799B7";
GlassyGrape = "#9888A5";
OldLavender = "#776472";
FeldGrau = "#445552";
DarkSlateGray = "#294D4A";
DimSkyBlue = "#83B5D1";
Rythm = "#726E97";
ParadisePink = "#EE4266";
SunGlow = "#FFD23F";
CaribeanGreen = "#3BCEAC";
GoGreen = "#0EAD69";
DavysGrey = "#595959";
Xanadu = "#808F85";
SunRay = "#EDB458"
Celadon ="#BAD4AA";

// COLORS END

let gravity = 1.2;

con.fillStyle = FeldGrau;
con.fillRect(0, 0, display.width, display.height);

function keepInside(obj) {
    if (obj.pos.y <= 0) { //Top
        obj.pos.y = display.height;
    }

    if (obj.pos.y + 80 >= display.height) { //Bottom
        obj.pos.y = display.height - 80;
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

function bounce(gameState) {

}

class Sprite {
    constructor(position, appearance, velocity={x: 0, y: 0}) {
        this.pos = position;
        this.look = appearance;
        this.velocity = velocity;
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
}

const movement = {
    keyDPressed: false,
    keyAPressed: false,
    keyWPressed: false,
    keySPressed: false

}

let lastKey; //to be more accurate 
let speedX = 2.4;
let speedY = 2.4;

const player = new Sprite({
    x: 50,
    y: 00
}, Celadon, {x: 0, y: 2.4});

const enemy1 = new Sprite({
    x: 500,
    y: 00
}, ParadisePink, {x: 0, y: 2.4});

function animate() {
    con.clearRect(0, 0, display.width, display.height);
    con.fillStyle = FeldGrau;
    con.fillRect(0, 0, display.width, display.height);

    //Avoid using elseif because we need to use multiple keys at once
    if (movement.keyDPressed == true && lastKey.toLowerCase() == "d") {
        player.velocity.x = speedX;
    }

    if (movement.keyAPressed == true && lastKey.toLowerCase() == "a") {
        player.velocity.x = -speedX;
    }

    if (movement.keyWPressed == true) {
        console.log("got this?")
        player.velocity.y = -10;
    }

    player.update();
    enemy1.update();

    player.velocity = {x: 0, y: player.velocity.y};
}

document.addEventListener("keydown", (event) => {
    console.log(event.key);
    switch (event.key) {
        case "a":
        // case "ArrowLeft":
            movement.keyAPressed = true;
            lastKey = "a";
            break;
        case "d":
        // case "ArrowRight":
            movement.keyDPressed = true;
            lastKey = "d";
            break;
        case "w":
        // case "ArrowUp":
            movement.keyWPressed = true;
            break;
        case "s":
        // case "ArrowDown":
            movement.keySPressed = true;
            lastKey = "s";
            break;
    }
});

document.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "a":
        case "ArrowLeft":
            movement.keyAPressed = false;
            break;
        case "d":
        case "ArrowRight":
            movement.keyDPressed = false;
            break;
        case "w":
        case "ArrowUp":
            movement.keyWPressed = false;
            break;
        case "s":
        case "ArrowDown":
            movement.keySPressed = false;
            break;
    }
    console.log(movement)
});





interval500 = setInterval(animate, 20)