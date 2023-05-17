let gravity = 1.2;

function keepInside(obj) {
    let calcGround = obj.height + 50; // 100 = Ground height

    if (obj.position.y + calcGround + obj.velocity.y >= display.height) { // +obj.VeloY to prevent character from falling out of the wanted screen for a split milisecond(this cause the character to "bounce")
        obj.position.y = display.height - calcGround;
        obj.inAir = false;
        obj.velocity.y = 0; // to prevent weird attack's Y offsets
    }

    if (obj.position.x + 40 >= display.width) { //Right
        obj.position.x = display.width - 40;
    }
    
    if (obj.position.x <= 0) { // left
        obj.position.x = 0;
    }
}

function checkAttack(charA, charB) {
    let atkX = charA.attack.position.x;
    let atkW = charA.attack.position.x + charA.attack.width;
    let atkY = charA.attack.position.y;
    let atkH = charA.attack.position.y - charA.attack.height;
    let charBX = charB.position.x;
    let charBW = charB.position.x + charB.size.width;
    let charBY = charB.position.y;
    let charBH = charB.position.y + charB.size.height;

    // collision box checking
    // cvs.fillStyle = "coral";
    // cvs.fillRect(atkX, atkY, charA.attack.width, -charA.attack.height);

    // cvs.fillStyle = "skyblue";
    // cvs.fillRect(charBX, charBY, charB.size.width, charB.size.height);
    

    if  (
        ((atkX <= charBX && charBX <= atkW) ||
        (atkX <= charBW && charBW <= atkW))
    && 
        (((charBY <= atkH && atkH <= charBH) ||
        (charBY <= atkY && atkY <= charBH))) // atkH < atkY
    ) {
        console.log("reached")
        charB.hp -= 75;
    }
}

const movementState = {} // Empty Object but will be filled and modified with keyPressed and keyRelease function

function animate() {
    if ((player.hp <= 0) || enemy.hp <= 0) {
        gameOver = true;
    }

    if (gameOver == true) {
        displayerGameState();
        return;
    }

    cvs.clearRect(0, 0, display.width, display.height);
    background.update();
    shop.update();


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
            player.attack.ing = true;
        }

        if (movementState.k_keyPressed == true) {
            console.log("pressed");
            debugger;
        }

    // Enemy Section
        if (movementState.arrowright_keyPressed == true) { //Right
            enemy.velocity.x = speedX;
            enemy.attack.direction = "toRight";
        }

        if (movementState.arrowleft_keyPressed == true) { //Left
            enemy.velocity.x = -speedX;
            enemy.attack.direction = "toLeft";
        }

        if (movementState.arrowup_keyPressed == true && enemy.inAir == false) {
            enemy.jump();
            movementState.arrowup_keyPressed = false;
        }
        if (movementState.shift_keyPressed == true) {
            enemy.attack.ing = true;
        }
    
    player.update();
    enemy.update();

    // to stop the character from moving horizontally and keep on flying up
    player.velocity = {x: 0, y: player.velocity.y};
    enemy.velocity = {x: 0, y: enemy.velocity.y};
}






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