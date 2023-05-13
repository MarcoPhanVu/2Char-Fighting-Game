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

function checkAttack(charA, charB) {
    let atkX = charA.attack.pos.x;
    let atkW = charA.attack.pos.x + charA.attack.width;
    let atkY = charA.attack.pos.y;
    let atkH = charA.attack.pos.y - charA.attack.height;
    let charBX = charB.pos.x;
    let charBW = charB.pos.x + charB.width;
    let charBY = charB.pos.y;
    let charBH = charB.pos.y + charB.height;

    // cvs.fillStyle = "red";
    // cvs.fillRect(atkX, atkY, charA.attack.width, -charA.attack.height);
    // debugger;


    if  (
        ((atkX <= charBX && charBX <= atkW) ||
        (atkX <= charBW && charBW <= atkW))
    && 
        (((atkY >= charBY && charBY >= atkH) ||
        (atkY >= charBH && charBH >= atkH))) // atkH < atkY
    ) {
        charB.hp -= 50;
        // debugger;
    }
    
}

function checkCollision(base, target) {
    // if ( 
    //     (base.pos.x >= target.pos.x && base.pos.x <= target.pos.x + target.width) // target on left
    // ||
    //     (base.pos.x + base.width >= target.pos.x && base.pos.x + base.width <= target.pos.x + target.width) // target on right
    // ) {
    //     // console.log(`${base.name} hit ${target.name}`)
    //     return true;
    // }

    if ((base.pos.x <= target.pos.x && target.pos.x <= base.pos.x + base.width) ||
        (base.pos.x <= target.pos.x + target.width && target.pos.x + target.width <= base.pos.x + base.width)) {
        return `${base.name} hit ${target.name} on ${base.direction}`;
    }


    return "no hit";
}


const movementState = {} // Empty Object but will be filled and modified with keyPressed and keyRelease function

function animate() {
    cvs.clearRect(0, 0, display.width, display.height);
    cvs.fillStyle = FeldGrau;
    cvs.fillRect(0, 0, display.width, display.height);

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

        if (movementState.w_keyPressed == true && player.inAir == false) { //Jump
            player.jump();
            movementState.w_keyPressed = false;
        }

        if (movementState.spacebar_keyPressed == true) { // Player attack
            // player.attack.ing = true;
            player.drawAttack();
        }

        if (movementState.k_keyPressed == true) {
            console.log("pressed");
            debugger;
        }

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
            enemy1.drawAttack();
            enemy2.drawAttack();
        }

    player.drawChar();
    enemy1.drawChar();
    enemy2.drawChar();

    // to stop the character from moving horizontally and keep on falling/jumping
    player.velocity = {x: 0, y: player.velocity.y};
    enemy1.velocity = {x: 0, y: enemy1.velocity.y};
    enemy2.velocity = {x: 0, y: enemy2.velocity.y};
}

// let keyStrokes = {}

document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key == " ") {
        key = "spacebar";
    }
    // dynamicCaseIncrement(keyStrokes, key.toLowerCase(), keyPressHandler(key)); //adding new cases whenever there's a new key pressed
    keyPressHandler(key);
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