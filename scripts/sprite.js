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


    draw() {
        // Sprite
        if (this.inAir) {
            this.velocity.y += gravity;
        }

        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        con.fillStyle = this.look;
        con.fillRect(this.pos.x, this.pos.y, this.width, this.height);

        keepInside(this);

        // setTimeout(() => {
        //     charState[`${this.name}`].attacking = false; // to stop char from attacking for ever
        // }, 200)
        
    }


    
    attacking() {
        this.attack.pos.x = this.pos.x + this.width;
        this.attack.pos.y = this.pos.y + this.height/2;

        if (this.attack.ing == true) { // Dynamic name
            con.fillStyle = CaribeanGreen;
            if (this.attack.direction == "toRight") {
                con.fillRect(this.attack.pos.x, this.attack.pos.y, this.attack.width, -this.attack.height);
            } 

            if (this.attack.direction == "toLeft") {
                this.attack.pos.x -= this.width + this.attack.width; // Move attack locX to the end of leftside(attack)
                con.fillRect(this.attack.pos.x, this.attack.pos.y, this.attack.width, -this.attack.height);
                charState
            }
            
            setTimeout(() => { 
                this.attack.ing = false; // to stop char from attacking for ever
            }, 200)  
        }

        charState[1].innerHTML = `Enemy1 ${checkCollision(this.attack, enemy1)}`;
        charState[2].innerHTML = `Enemy2 ${checkCollision(this.attack, enemy2)}`;
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
    //     this.attacking();
    // }

    jump() {
        this.velocity.y = -speedY;
        this.inAir = true;
    }
}