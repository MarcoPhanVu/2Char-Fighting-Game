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
            width: 60,
            height: 20
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

        // setTimeout(() => {
        //     dataState[`${this.name}`].attacking = false; // to stop char from attacking for ever
        // }, 200)
        
    }


    
    drawAttack() {
        this.attack.pos.x = this.pos.x + this.width; //start 
        this.attack.pos.y = this.pos.y + this.height/2;

        if (this.attack.ing == true) { // Dynamic name
            cvs.fillStyle = CaribeanGreen;
            if (this.attack.direction == "toRight") {
                cvs.fillRect(this.attack.pos.x, this.attack.pos.y, this.attack.width, -this.attack.height);
            } 

            if (this.attack.direction == "toLeft") {
                this.attack.pos.x -= this.width + this.attack.width; // Move attack locX to the end of leftside(attack)
                cvs.fillRect(this.attack.pos.x, this.attack.pos.y, this.attack.width, -this.attack.height);
            }
            
            setTimeout(() => { 
                this.attack.ing = false; // to stop char from attacking for ever
            }, 200)  
            dataState[1].innerHTML = `Enemy1 ${checkCollision(this.attack, enemy1)}`;
            dataState[2].innerHTML = `Enemy2 ${checkCollision(this.attack, enemy2)}`;
        }

    }
    
    // update() {
    //     if (this.inAir) {
    //         this.velocity.y += gravity;
    //     }

    //     this.pos.x += this.velocity.x;
    //     this.pos.y += this.velocity.y;
        
    //     keepInside(this); // has to be above oso that attack won't "bounce"

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