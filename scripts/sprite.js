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
        con.fillStyle = this.look;
        con.fillRect(this.pos.x, this.pos.y, this.width, this.height);

        // Attack

        // if (charState[`${this.name}`].attacking == true) { // Dynamic name

        if (this.attack.ing == true) { // Dynamic name
            con.fillStyle = CaribeanGreen;
            // debugger
            if (this.attack.direction == "toRight") {
                con.fillRect(this.attack.pos.x, this.attack.pos.y, this.attack.width, -this.attack.height);
            } 
            if (this.attack.direction == "toLeft") {
                this.attack.pos.x -= this.width + this.attack.width; // Move attack locX to the end of leftside(attack)
                con.fillRect(this.attack.pos.x, this.attack.pos.y, this.attack.width, -this.attack.height);
                charState
            }

            charState[1].innerHTML = `Enemy1 ${checkCollision(this.attack, enemy1)}`;
            charState[2].innerHTML = `Enemy2 ${checkCollision(this.attack, enemy2)}`;

            setTimeout(() => { 
                this.attack.ing = false; // to stop char from attacking for ever
            }, 200)

            // setTimeout(() => {
            //     let i = 0;
            //     charState[1].innerHTML = "nothing yet";
            // }, 1000)
            

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

        this.attack.pos.x = this.pos.x + this.width;
        this.attack.pos.y = this.pos.y + this.height/2;


        this.draw();
    }


    jump() {
        this.velocity.y = -speedY;
        this.inAir = true;
    }
}