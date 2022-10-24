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

const movementState = {} // Empty Object but will be filled and modified with dynamicCaseIncrement function


let speedX = 8;
let speedY = 20;

function animate() {
    con.clearRect(0, 0, display.width, display.height);
    con.fillStyle = FeldGrau;
    con.fillRect(0, 0, display.width, display.height);

    //Avoid using elseif because we need to use multiple keys at once
    //Player Section
        if (movementState.d_keyPressed == true) {
            player.velocity.x = speedX;
        }

        if (movementState.a_keyPressed == true) {
            player.velocity.x = -speedX;
        }

        if (movementState.w_keyPressed == true && player.inAir == false) {
            player.jump();
            movementState.w_keyPressed = false;
        }

    // Enemy Section
        if (movementState.arrowright_keyPressed == true) {
            enemy1.velocity.x = speedX;
            enemy2.velocity.x = speedX;
        }

        if (movementState.arrowleft_keyPressed == true) {
            enemy1.velocity.x = -speedX;
            enemy2.velocity.x = -speedX;
        }

        if (movementState.arrowup_keyPressed == true && enemy1.inAir == false && enemy2.inAir == false) {
            enemy1.jump();
            enemy2.jump();
            movementState.arrowup_keyPressed = false;
        }


    player.update();
    enemy1.update();
    enemy2.update();

    player.velocity = {x: 0, y: player.velocity.y};
    enemy1.velocity = {x: 0, y: enemy1.velocity.y};
    enemy2.velocity = {x: 0, y: enemy2.velocity.y};
}

let keyStrokes = {}

document.addEventListener("keydown", (event) => {
    console.log(event.key);

    dynamicCaseIncrement(keyStrokes, event.key.toLowerCase(), keyPressed(event.key));

});

document.addEventListener("keyup", (event) => {
    keyReleased(event.key);
});



function keyPressed(key) {
    let placeholder = key.toLowerCase() + "_keyPressed";
    dynamicCaseIncrement(movementState, placeholder, true);
    movementState[`${placeholder}`] = true;
    console.log(`${placeholder}: ` + movementState[`${placeholder}`]);
}

function keyReleased(key) {
    let placeholder = key.toLowerCase() + "_keyPressed";
    movementState[`${placeholder}`] = false;
}



function dynamicCaseIncrement(obj, _case, func = null) { // Cannot type "case" and "function" because  they're built-ins.

    // THIS FUNCTION ONLY ADD UNDEFINED CASES, IF THEY'VE EXISTED THEN NOTHING WILL HAPPEN

    if (obj[_case] == undefined) {
        obj[_case] = func;
        // console.log("Obj " + _case + " = " + obj[_case]);
    }

    return;
}