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
        gravity = 0;
    }
    else {
        gravity = 1.2;
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
        // this.velocity = {x: 0, y: 0};
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

        // console.log(this.pos.x);
        // console.log(this.pos.y);

        this.draw();
    }
}


const player = new Sprite({
    x: 50,
    y: 00
}, Celadon, {x: 0, y: 2.4});

const enemy1 = new Sprite({
    x: 500,
    y: 00
}, ParadisePink, {x: 0, y: 2.4});

interval500 = setInterval(animate, 20)

function animate() {
    con.clearRect(0, 0, display.width, display.height);
    con.fillStyle = FeldGrau;
    con.fillRect(0, 0, display.width, display.height);

    player.update();
    enemy1.update();
}

document.addEventListener("keydown", (event) => {
    // console.log(event.key);
    switch (event.key) {
        case 'a':
            player.velocity.x = -2;
            break;
        case 'd':
            player.velocity.x = 2;
            break;
        case 's':
            player.velocity.y = 2;
            console.log("player ducked");
            break;
        case 'w':
            player.velocity.y = -2;
            console.log("player jumped");
            break;

    }
});

document.addEventListener("keyup", (event) => {
    // console.log();
    switch (event.key) {
        case 'a':
            player.velocity.x = 0;
            break;
        case 'd':
            player.velocity.x = 0;
            break;
        case 's':
            player.velocity.y = 0;
            console.log("player ducked");
            break;
        case 'w':
            player.velocity.y = 0;
            console.log("player jumped");
            break;
    }
});