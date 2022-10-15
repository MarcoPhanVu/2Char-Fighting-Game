const display = document.querySelector("#main-display")

const con = display.getContext("2d")

display.width = 800 * 0.8
display.height = 600 * 0.8

con.fillStyle = DarkSlateGray;
con.fillRect(0, 0, display.width, display.height)

class Sprite {
    constructor(position, appearance, role) {
        this.pos = position;
        this.look = appearance
        this.role = role;
    }

    draw() {
        con.fillStyle = this.look;
        con.fillRect(this.pos.x, this.pos.y, 60, 40);
    }
}



const player = new Sprite({
    x: 50,
    y: 60
}, "#F69EC0")

player.draw();

console.log(player);