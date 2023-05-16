class Fighter {
    constructor({
        name, 
        position,
        appearance, 
        hitpoints = 1000, 
        velocity = {x: 0, y: 0}
    }) {
        this.name = name;
        this.position = position;
        this.appearance = appearance;
        this.hp = hitpoints;
        this.velocity = velocity;

        this.width = 40;
        this.height = 80;

        this.attack = {
            name: `${this.name}'s attack`,
            ing: false,
            direction: "toRight",
            position: { //don't modify here because this.x/y will be changed a lot
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


    drawSelf() {
        // Sprite
        if (this.inAir) {
            this.velocity.y += gravity;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        cvs.fillStyle = this.appearance;
        cvs.fillRect(this.position.x, this.position.y, this.width, this.height);

        cvs.font = "30px Nunito";
        cvs.fillStyle = "crimson";
        cvs.fillText(`${this.name}`, this.position.x - this.width/2, this.position.y - 15);


        keepInside(this);
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
                checkAttack(this, enemy);
            }

            else if (this == enemy) {
                checkAttack(this, player); 
            }


            this.attack.availForAttack = false;

            setTimeout(() => {
                this.attack.availForAttack = true;
                // console.log("Avail")
            }, 200)
        }
        
        // this.attack.ing = false;

        // setTimeout(() => {
        //     this.attack.ing = true;
        //     console.log("true")
        // }, 750)


            //KEEP THIS, IT'LL BE USEFUL FOR DEBUGGING
            // if (this == player) {
            //     dataState[0].innerHTML = `${checkCollision(this.attack, enemy)}`; 
            // }

            // else if (this == enemy) {
            //     dataState[3].innerHTML = `${checkCollision(enemy.attack, player)}`; 
            // }
    }

    update() {
        this.drawSelf();
        if (this.attack.ing == true) {
            this.drawAttack();
        }
        this.attack.ing = false;
    }

    jump() {
        this.velocity.y = -speedY;
        this.inAir = true;
    }
}


class notFighter extends Sprite {
    constructor({
        name, 
        position,
        size, 
        imageSrc, 
        scale, 
        framesMax,
        frameCurrent,

        hitpoints = 1000, 
        velocity = {x: 0, y: 0}
    }) {
        super({
            name,
            position,
            size,
            imageSrc,
            scale,
            framesMax,
            frameCurrent
        })


        this.hp = hitpoints;
        this.velocity = velocity;

        // this.width = 40;
        // this.height = 80;

        this.attack = {
            name: `${this.name}'s attack`,
            ing: false,
            direction: "toRight",
            position: { //don't modify here because this.x/y will be changed a lot
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


    drawSelf() {
        if (this.inAir == true) {
            this.velocity.y += gravity;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        cvs.drawImage(
            this.image, 
            // image croppping
            this.frameCurrent * (this.image.width / this.framesMax),
            0,
            (this.image.width) / this.framesMax, 
            (this.image.height), 

            // Draw
            this.position.x, 
            this.position.y, 
            this.width / this.framesMax, 
            this.height
        );

        // cvs.fillStyle = this.appearance;
        // cvs.fillRect(this.position.x, this.position.y, this.width, this.height);

        // // error this so future me can see
        // cvs.font = "30px Nunito";
        // cvs.fillStyle = this.appearance;
        // cvs.fillText(`${this.name}`, this.position.x - this.width/2, this.position.y - 15);


        keepInside(this);
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
                checkAttack(this, enemy);
            }

            else if (this == enemy) {
                checkAttack(this, player); 
            }


            this.attack.availForAttack = false;

            setTimeout(() => {
                this.attack.availForAttack = true;
                // console.log("Avail")
            }, 200)
        }
        
        // this.attack.ing = false;

        // setTimeout(() => {
        //     this.attack.ing = true;
        //     console.log("true")
        // }, 750)
    }

    update() {
        this.drawSelf();
        if (this.attack.ing == true) {
            this.drawAttack();
        }
        this.attack.ing = false;
    }

    jump() {
        this.velocity.y = -speedY;
        this.inAir = true;
    }
}