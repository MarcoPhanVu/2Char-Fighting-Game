class Sprite {
    constructor({name, position, size, imageSrc, scale = 1, maxFrames = 1, currentFrame = 0}) {
        this.name = name;
        this.pos = position;
        this.scale = scale;
        this.width = size.width * this.scale;
        this.height = size.height * this.scale;
        this.image = new Image();
        this.image.src = imageSrc;
        this.maxFrames = maxFrames;
        this.currentFrame = 0;
    }

    drawSelf() {
        cvs.drawImage(
            this.image, 
            // imagge croppping
            this.currentFrame * (this.image.width / this.maxFrames),
            0,
            this.image.width / this.maxFrames, 
            this.image.height, 

            // Draw
            this.pos.x, 
            this.pos.y, 
            this.width / this.maxFrames, 
            this.height
        );
        // cvs.drawImage(this.image, this.pos.x, this.pos.y, this.image.width, this.image.height);
        if (this.maxFrames - 1 > this.currentFrame) {
            this.currentFrame += 1;
        } else {
            this.currentFrame = 0;
        }
    }
}