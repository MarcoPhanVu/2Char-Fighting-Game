class Sprite {
    constructor(name, position, appearance, velocity = {x: 0, y: 0}) {
        this.name = name;
        this.pos = position;
        this.look = appearance;
        this.velocity = velocity;
// SHIT, I WAS MAKING CHANGES ON AN INCORRECT BRANCHHHHHHH!
// I'll leave this for my future self to fix

// Me - future self: fuck you, past me, still unable to fix this. You should've went to sleep earlier instead of making these changes on the WRONG BRANCH!!!

// Update: Fixed, not so hard, isn't it? took me quite sometime.
// Gotta learn advance git for future cooperating with my colleagues
        this.spriteWidth = 40;
        this.spriteHeight = 80;

        this.attack = {
            ing: true,
            direction: "toRight",
            posX: this.pos.x,
            posY: this.pos.y,
            width: 60,
            height: 20
        }

        // States
        this.inAir = true;
    }


    draw() {
        // Sprite
        con.fillStyle = this.look;
        con.fillRect(this.pos.x, this.pos.y, this.spriteWidth, this.spriteHeight);

        // Attack

        // if (charState[`${this.name}`].attacking == true) { // Dynamic name

        if (this.attack.ing == true) { // Dynamic name
            console.log(`${this.name} is to attack`);
            con.fillStyle = CaribeanGreen;
            
            if (this.attack.direction == "toRight") {
                con.fillRect(this.attack.posX, this.attack.posY, this.attack.width, -this.attack.height);
            } 
            if (this.attack.direction == "toLeft") {
                con.fillRect(this.attack.posX - this.spriteWidth, this.attack.posY, -this.attack.width, -this.attack.height);
            }

            setTimeout(() => {
                this.attack.ing = false; // to stop char from attacking for ever
            }, 200)
            
            // setTimeout(() => {
            //     charState[`${this.name}`].attacking = false; // to stop char from attacking for ever
            // }, 200)
        }
    }


    update() {
        if (this.inAir) {
            this.velocity.y += gravity;
        }

        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
        
        keepInside(this); // has to be above oso that attack won't "bounce"

        this.attack.posX = this.pos.x + this.spriteWidth;
        this.attack.posY = this.pos.y + this.spriteHeight/2;


        this.draw();
    }


    jump() {
        this.velocity.y = -speedY;
        this.inAir = true;
    }
}