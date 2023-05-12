class Sprite {
    constructor(name, position, appearance, hitpoints = 1000, velocity = {x: 0, y: 0}) {
        this.name = name;
        this.pos = position;
        this.look = appearance;
        this.hp = hitpoints;
        this.velocity = velocity;

        this.width = 40;
        this.height = 80;

        this.attack = {
            name: `${this.name}'s attack`,
            ing: false,
            direction: "toRight",
            pos: {
                x: this.pos.x,
                y: this.pos.y
            },
            width: 80,
            height: 40,
            availForAttack: true
        }

        // States
        this.inAir = true;
    }


    drawChar() {
        // Sprite
        if (this.inAir) {
            this.velocity.y += gravity;
        }

        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        cvs.fillStyle = this.look;
        cvs.fillRect(this.pos.x, this.pos.y, this.width, this.height);

        // error this so future me can see
        cvs.font = "30px Nunito";
        cvs.fillStyle = this.appearance;
        cvs.fillText(`${this.name}`, this.pos.x - this.width/2, this.pos.y - 15);


        keepInside(this);
    }


    
    drawAttack() {
        
        
        dataExtraInfo[0].innerHTML = "avail: " + this.attack.availForAttack;
        if (this.attack.availForAttack == true) {
            this.attack.pos.x = this.pos.x + this.width; //start 
            this.attack.pos.y = this.pos.y + this.height/2;
    
            cvs.fillStyle = CaribeanGreen;
            if (this.attack.direction == "toRight") {
                cvs.fillRect(this.attack.pos.x, this.attack.pos.y, this.attack.width, -this.attack.height);
            } 
    
            if (this.attack.direction == "toLeft") {
                this.attack.pos.x -= this.width + this.attack.width; // Move attack locX to the end of leftside(attack)
                cvs.fillRect(this.attack.pos.x, this.attack.pos.y, this.attack.width, -this.attack.height);
            }
            if (this == player) {
                checkAttack(this, enemy1);
                checkAttack(this, enemy2);
            }

            else if (this == enemy1) {
                checkAttack(this, player); 
            }

            else if (this == enemy2) {
                checkAttack(this, player); 
            }

            this.attack.availForAttack = false;

            setTimeout(() => {
                this.attack.availForAttack = true;
                console.log("Avail")
            }, 200)
        }
        
        // this.attack.ing = false;

        // setTimeout(() => {
        //     this.attack.ing = true;
        //     console.log("true")
        // }, 750)


            //KEEP THIS, IT'LL BE USEFUL FOR DEBUGGING
            // if (this == player) {
            //     dataState[0].innerHTML = `${checkCollision(this.attack, enemy1)}`; 
            //     dataState[1].innerHTML = `${checkCollision(this.attack, enemy2)}`;
            // }

            // else if (this == enemy1) {
            //     dataState[3].innerHTML = `${checkCollision(enemy1.attack, player)}`; 
            // }

            // else if (this == enemy2) {
            //     dataState[5].innerHTML = `${checkCollision(enemy2.attack, player)}`; 
            // }

    }
    
    // update() {
    //     if (this.inAir) {
    //         this.velocity.y += gravity;
    //     }

    //     this.pos.x += this.velocity.x;
    //     this.pos.y += this.velocity.y;
        
    //     keepInside(this); // has to be above so that attack won't "bounce"

    //     this.attack.pos.x = this.pos.x + this.width;
    //     this.attack.pos.y = this.pos.y + this.height/2;


    //     this.draw();
    //     this.drawAttack();
    // }

    jump() {
        this.velocity.y = -speedY;
        this.inAir = true;
    }
}