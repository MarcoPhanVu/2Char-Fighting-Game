class Fighter extends Sprite {
    constructor({
        name, 
        position,
        size, 
        imageSrc, 
        scale, 
        framesMax,
        frameCurrent,
        centeringOffset,
        hitpoints = 1000, 
        velocity = {x: 0, y: 0},
    }) {
        super({
            name,
            position,
            size,
            imageSrc,
            scale,
            framesMax,
            frameCurrent,
            centeringOffset
        })


        this.hp = hitpoints;
        this.velocity = velocity;

        this.attack = {
            name: `${this.name}'s attack`,
            ing: false,
            direction: "toRight",
            position: { //don't modify here because this.x/y will be changed a lot
                // and attack.position will not be updated at the start of the game so if modified, shits will looks werid
                x: 0,
                y: 0
            },
            width: 80,
            height: 40,
            availForAttack: true
        }

        // States
        this.inAir = true;
    }
    
    drawAttack() {
        dataExtraInfo[0].innerHTML = "avail: " + this.attack.availForAttack;
        if (this.attack.availForAttack == true) {
            this.attack.position.x = this.position.x + this.width; //start 
            this.attack.position.y = this.position.y + this.height/2;
    

            cvs.fillStyle = SunGlow;


            if (this.attack.direction == "toRight") {
                cvs.fillRect(this.attack.position.x, this.attack.position.y, this.attack.width, -this.attack.height);
            } 
    
            if (this.attack.direction == "toLeft") {
                this.attack.position.x -= this.width + this.attack.width; // Move attack locX to the end of leftside(attack)
                cvs.fillRect(this.attack.position.x, this.attack.position.y, this.attack.width, -this.attack.height);
            }
            if (this == player) {
                console.log(`${this} attacking enemy`);
                checkAttack(this, enemy);
            }

            else if (this == enemy) {
                checkAttack(this, player); 
                console.log(`${this} attacking player`);
            }


            this.attack.availForAttack = false;

            setTimeout(() => {
                this.attack.availForAttack = true;
            }, 200)
        }
    }

    update() {
        if (this.inAir == true) {
            this.velocity.y += gravity;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        cvs.fillStyle = "coral";
        // cvs.fillRect(this.position.x, this.position.y, this.width, this.height);

        
        super.drawSelf();

        ++this.frameElapsed;

        if (this.frameElapsed % this.frameToHold == 0) {
            if (this.framesMax - 1 > this.frameCurrent) {
                this.frameCurrent += 1;
            } else {
                this.frameCurrent = 0;
            } 
        }
        
        if (this.attack.ing == true) {
            this.drawAttack();
        }

        keepInside(this);

        this.attack.ing = false;

    }

    jump() {
        this.velocity.y = -speedY;
        this.inAir = true;
    }
}