let gravity = 1.2;

function keepInside(obj) {
    // if (obj.pos.y <= 0) { //Top
    //     obj.pos.y = 0;
    // }

    if (obj.pos.y + 80 >= display.height) { // Ground
        obj.pos.y = display.height - 80;
        obj.inAir = false;
        obj.velocity.y = 0; // to prevent weird Y offsets
    }


    if (obj.pos.x + 40 >= display.width) { //R ight
        obj.pos.x = display.width - 40;
    }
    
    if (obj.pos.x <= 0) { // left
        obj.pos.x = 0;
    }
}

function checkCollision(gameState) {
    
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

let speedX = 8;
let speedY = 20;

function animate() {
    con.clearRect(0, 0, display.width, display.height);
    con.fillStyle = FeldGrau;
    con.fillRect(0, 0, display.width, display.height);

    //Avoid using elseif because we need to use multiple keys at once
    //Player Section
        if (movement.keyDPressed == true) {
            player.velocity.x = speedX;
        }

        if (movement.keyAPressed == true) {
            player.velocity.x = -speedX;
        }

        if (movement.keyWPressed == true && player.inAir == false) {
            player.jump();
            movement.keyWPressed = false;
        }

    // Enemy Section
        if (movement.keyRAPressed == true) {
            enemy1.velocity.x = speedX;
            enemy2.velocity.x = speedX;
        }

        if (movement.keyLAPressed == true) {
            enemy1.velocity.x = -speedX;
            enemy2.velocity.x = -speedX;
        }

        if (movement.keyUAPressed == true && enemy1.inAir == false && enemy2.inAir == false) {
            enemy1.jump();
            enemy2.jump();
            movement.keyUAPressed = false;
        }


    player.update();
    enemy1.update();
    enemy2.update();

    player.velocity = {x: 0, y: player.velocity.y};
    enemy1.velocity = {x: 0, y: enemy1.velocity.y};
    enemy2.velocity = {x: 0, y: enemy2.velocity.y};
}



document.addEventListener("keydown", (event) => {
    console.log(event.key);

    let keyStrokes = {}

    // switch (event.key) {
    //     // Player
    //     case "a":
    //         movement.keyAPressed = true;
    //         break;
    //     case "d":
    //         movement.keyDPressed = true;
    //         break;
    //     case "w":
    //         movement.keyWPressed = true;
    //         break;
    //     case "s":
    //         movement.keySPressed = true;
    //         break;


    //     // Enemy
    //     case "ArrowLeft":
    //         movement.keyLAPressed = true;
    //         break;
    //     case "ArrowRight":
    //         movement.keyRAPressed = true;
    //         break;
    //     case "ArrowUp":
    //         movement.keyUAPressed = true;
    //         break;
    //     case "ArrowDown":
    //         movement.keyDAPressed = true;
    //         break;
//     }
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



function dealCase(obj, _case, func) { // Cannot type "case" and "function" because  they're built-ins.
    if (obj[_case] == undefined) {
        obj[_case] = func;
        // console.log("Obj " + _case + " = " + obj[_case]);
    }

    return;
}

let sample = {
    test1: "1st",
    test2: "2nd",
    test3: "3rd"
}

console.log(sample);
console.log(sample["test2"]);
sample["test4"] = 42
console.log(sample["test4"]);