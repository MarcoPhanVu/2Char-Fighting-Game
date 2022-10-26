let gravity = 1.2;

function keepInside(obj) {
    if (obj.pos.y + 80 >= display.height) { // Ground
        obj.pos.y = display.height - 80;
        obj.inAir = false;
        obj.velocity.y = 0; // to prevent weird attack's Y offsets
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

const movementState = {} // Empty Object but will be filled and modified with keyPressed and keyRelease function

const charState = {
    player: {
        attacking: false,
        lookLeft: false
    },
    enemy1: {
        attacking: false,
        lookLeft: false
    },
    enemy2: {
        attacking: false,
        lookLeft: false
    }
}

let speedX = 8;
let speedY = 20;

function animate() {
    con.clearRect(0, 0, display.width, display.height);
    con.fillStyle = FeldGrau;
    con.fillRect(0, 0, display.width, display.height);


// Movement
    //Avoid using elseif because we need to be able to use multiple keys at once
    //Player Section
        if (movementState.d_keyPressed == true) { //Right
            player.velocity.x = speedX;
            charState.player.lookLeft = false;
        }

        if (movementState.a_keyPressed == true) { //Left
            player.velocity.x = -speedX;
            charState.player.lookLeft = true;
        }

        if (movementState.w_keyPressed == true && player.inAir == false) {
            player.jump();
            movementState.w_keyPressed = false;
        }
        if (movementState.spacebar_keyPressed == true) {
            charState[`${player.name}`].attacking = true;
        }

    // Enemy Section
        if (movementState.arrowright_keyPressed == true) { //Right
            enemy1.velocity.x = speedX;
            enemy2.velocity.x = speedX;
            charState.enemy1.lookLeft = false;
            charState.enemy2.lookLeft = false;
        }

        if (movementState.arrowleft_keyPressed == true) { //Left
            enemy1.velocity.x = -speedX;
            enemy2.velocity.x = -speedX;
            charState.enemy1.lookLeft = true;
            charState.enemy2.lookLeft = true;
        }

        if (movementState.arrowup_keyPressed == true && enemy1.inAir == false && enemy2.inAir == false) {
            enemy1.jump();
            enemy2.jump();
            movementState.arrowup_keyPressed = false;
        }
        if (movementState.shift_keyPressed == true) {
            charState[`${enemy1.name}`].attacking = true;
            charState[`${enemy2.name}`].attacking = true;
        }

    player.update();
    enemy1.update();
    enemy2.update();

    // to stop the character from moving
    player.velocity = {x: 0, y: player.velocity.y};
    enemy1.velocity = {x: 0, y: enemy1.velocity.y};
    enemy2.velocity = {x: 0, y: enemy2.velocity.y};
}

let keyStrokes = {}

document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key == " ") {
        key = "spacebar";
    }
    dynamicCaseIncrement(keyStrokes, key.toLowerCase(), keyPressHandler(key)); //adding new cases whenever there's a new key pressed
});

document.addEventListener("keyup", (event) => {
    let key = event.key;
    if (key == " ") {
        key = "spacebar"; // Have to add this so that the player can retrieve their attack
    }
    keyReleaseHandler(key);
});



function keyPressHandler(key) {
    let placeholder = key.toLowerCase() + "_keyPressed";
    dynamicCaseIncrement(movementState, placeholder, true);
    movementState[`${placeholder}`] = true;
    console.log(`${placeholder}: ` + movementState[`${placeholder}`]);
}

function keyReleaseHandler(key) {
    let placeholder = key.toLowerCase() + "_keyPressed";
    movementState[`${placeholder}`] = false;
}


// THIS FUNCTION WILL ONLY ADD UNDEFINED CASES, IF THEY'VE EXISTED THEN NOTHING WILL HAPPEN
function dynamicCaseIncrement(obj, _case, func = null) { // Cannot type "case" and "function" because  they're built-ins.
    if (obj[_case] == undefined) {
        obj[_case] = func;
        // console.log("Obj " + _case + " = " + obj[_case]);
    }

    return;
}