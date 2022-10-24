class Sprite {
    constructor(position, appearance, velocity = {x: 0, y: 0}) {
        this.pos = position;
        this.look = appearance;
        this.velocity = velocity;
// SHIT, I WAS MAKING CHANGES ON AN INCORRECT BRANCHHHHHHH!
// I'll leave this for my future self to fix

// Me - future self: fuck you, past me, still unable to fix this. You should've went to sleep earlier instead of making these changes on the WRONG BRANCH!!!

        this.spriteWidth = 40;
        this.spriteHeight = 80;

        this.weapon = {
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

        // Weapon
        con.fillStyle = Celadon;
        con.fillRect(this.weapon.posX, this.weapon.posY, this.weapon.width, this.weapon.height);
    }


    update() {
        if (this.inAir) {
            this.velocity.y += gravity;
        }

        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        this.weapon.posX = this.pos.x + this.spriteWidth;
        this.weapon.posY = this.pos.y;

        keepInside(this);

        this.draw();
    }


    jump() {
        this.velocity.y = -speedY;
        this.inAir = true;
    }
}