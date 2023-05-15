class Sprite {
    constructor({name, position, size, imageSrc, scale = 1, framesMax = 1, frameCurrent = 0}) {
        this.name = name;
        this.pos = position;
        this.scale = scale;
        this.width = size.width * this.scale;
        this.height = size.height * this.scale;
        this.image = new Image();
        this.image.src = imageSrc;
        this.framesMax = framesMax;
        this.frameCurrent = 0;
        this.frameElapsed = 0;
        this.frameToHold = 5;
    }

    drawSelf() {
        cvs.drawImage(
            this.image, 
            // imagge croppping
            this.frameCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax, 
            this.image.height, 

            // Draw
            this.pos.x, 
            this.pos.y, 
            this.width / this.framesMax, 
            this.height
        );
        // cvs.drawImage(this.image, this.pos.x, this.pos.y, this.image.width, this.image.height);
    }

    update() {
        this.drawSelf();
        ++this.frameElapsed;

        if (this.frameElapsed % this.frameToHold == 0) {
            if (this.framesMax - 1 > this.frameCurrent) {
                this.frameCurrent += 1;
            } else {
                this.frameCurrent = 0;
            }
        }
    }
}