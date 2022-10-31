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

function checkCollision(base, target) {
    let verHit = false;
    let horHit = false;

    let startX = (role) => role.pos.x;
    let endX = (role) => role.pos.x + role.width;
    let startY = (role) => role.pos.y;
    let endY = (role) => role.pos.y + role.height;


    // Horizontally
    if ( 
        ( startX(base) >= startX(target) && startX(base) <= endX(target) ) 
    ||
        ( endX(base) >= startX(target) && endX(base) <= endX(target) )
    ||
        ( startX(target) >= startX(base) && startX(target) <= endX(base) )
    ||
        ( endX(base) >= startX(target) && endX(base) <= endX(target) )
    ) {
        horHit = true;
    }

    // Vertically
    if ( 
        ( startY(base) >= startY(target) && startY(base) <= endX(target) ) 
    ||
        ( endY(base) >= startY(target) && endY(base) <= endY(target) )
    ||
        ( startY(target) >= startY(base) && startY(target) <= endY(base) )
    ||
        ( endY(base) >= startY(target) && endY(base) <= endY(target) )
    ) {
        verHit = true;
    }

    // charState[0].innerHTML = `Attack YLoc: ${startY(base)}`;
    // charState[1].innerHTML = `Attack YEnd: ${endY(base)}`;
    // charExtInfo[0].innerHTML = `E YLoc: ${startY(target)}`;
    // charExtInfo[1].innerHTML = `E YEnd: ${endY(target)}`;


    if (horHit && verHit) {
        return `${target.name} hit`;
    }
}


const movementState = {} // Empty Object but will be filled and modified with keyPressed and keyRelease function

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
            player.attack.direction = "toRight";
        }

        if (movementState.a_keyPressed == true) { //Left
            player.velocity.x = -speedX;
            player.attack.direction = "toLeft";
        }

        if (movementState.w_keyPressed == true && player.inAir == false) {
            player.jump();
            movementState.w_keyPressed = false;
        }

        if (movementState.spacebar_keyPressed == true) {
            player.attack.ing = true;
            // console.log("hey");
        }


        // if (movementState.w_keyPressed) {
        //     player.pos.y -= 5;
        // }
        // if (movementState.s_keyPressed) {
        //     player.pos.y += 5;
        // }

    // Enemy Section
        if (movementState.arrowright_keyPressed == true) { //Right
            enemy1.velocity.x = speedX;
            enemy2.velocity.x = speedX;
            enemy1.attack.direction = "toRight";
            enemy2.attack.direction = "toRight";
        }

        if (movementState.arrowleft_keyPressed == true) { //Left
            enemy1.velocity.x = -speedX;
            enemy2.velocity.x = -speedX;
            enemy1.attack.direction = "toLeft";
            enemy2.attack.direction = "toLeft";
        }

        if (movementState.arrowup_keyPressed == true && enemy1.inAir == false && enemy2.inAir == false) {
            enemy1.jump();
            enemy2.jump();
            movementState.arrowup_keyPressed = false;
        }
        if (movementState.shift_keyPressed == true) {
            enemy1.attack.ing = true;
            enemy2.attack.ing = true;
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
}

function keyReleaseHandler(key) {
    let placeholder = key.toLowerCase() + "_keyPressed";
    movementState[`${placeholder}`] = false;
}


// THIS FUNCTION WILL ONLY ADD UNDEFINED CASES, IF THEY'VE EXISTED THEN NOTHING WILL HAPPEN
function dynamicCaseIncrement(obj, _case, func = null) { // Cannot type "case" and "function" because they're built-ins.
    if (obj[_case] == undefined) {
        obj[_case] = func;
    }

    return;
}