const display = document.querySelector("#main-display")

const con = display.getContext("2d")

display.width = 800 * 0.8
display.height = 600 * 0.8


// COLORS START

GlossyGrape = "#A799B7";
GlassyGrape = "#9888A5";
OldLavender = "#776472";
FeldGrau = "#445552";
DarkSlateGray = "#294D4A";
DimSkyBlue = "#83B5D1";
Rythm = "#726E97";
ParadisePink = "#EE4266";
SunGlow = "#FFD23F";
CaribeanGreen = "#3BCEAC";
GoGreen = "#0EAD69";
DavysGrey = "#595959";
Xanadu = "#808F85";
SunRay = "#EDB458"
Celadon ="#BAD4AA";

// COLORS END


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