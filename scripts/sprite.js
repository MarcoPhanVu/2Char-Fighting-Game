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
            posX: this.pos.x + this.spriteWidth,
            posY: this.pos.y + this.spriteHeight,
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
        if (charState[`${this.name}`].attacking == true) { // Dynamic name
            console.log(`${this.name} is to attack`);
            con.fillStyle = Celadon;
            con.fillRect(this.attack.posX, this.attack.posY, this.attack.width, this.attack.height);
            setTimeout(() => {
                charState[`${this.name}`].attacking = false;
            }, 300)
            
        }
    }


    update() {
        if (this.inAir) {
            this.velocity.y += gravity;
        }

        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        this.attack.posX = this.pos.x + this.spriteWidth;
        this.attack.posY = this.pos.y;

        keepInside(this);

        this.draw();
    }


    jump() {
        this.velocity.y = -speedY;
        this.inAir = true;
    }
}