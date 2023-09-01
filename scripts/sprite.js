class Sprite {
	constructor({
		name, 
		position, 
		size, 
		imageSrc, 
		scale = 1, 
		framesMax = 1, 
		frameCurrent = 0,
		centeringOffset = {x: 0, y: 0}

	}) {
		this.name = name;
		this.position = position;
		this.scale = scale;
		this.size = size;
		this.width = size.width;
		this.height = size.height;
		this.image = new Image();
		this.image.src = imageSrc;
		this.centeringOffset = centeringOffset;
		this.framesMax = framesMax;
		this.frameCurrent = 0;
		this.frameElapsed = 0;
		this.frameToHold = 5;
	}

	drawSelf() {
		if (this.size.useSelfSize == true) {
			cvs.drawImage(
				this.image, 
				// image croppping
				this.frameCurrent * (this.image.width / this.framesMax) + this.centeringOffset.x,
				this.centeringOffset.y,
				this.width, 
				this.height, 
	
				// Draw
				this.position.x, 
				this.position.y, 
				// (this.image.width * this.scale) / this.framesMax, 
				// (this.image.height * this.scale),
				this.width * this.scale, 
				this.height * this.scale
			);
		} else {
			cvs.drawImage(
				this.image, 
				// image croppping
				this.frameCurrent * (this.image.width / this.framesMax) + this.centeringOffset.x,
				this.centeringOffset.y,
				(this.image.width / this.framesMax), 
				this.image.height, 
	
				// Draw
				this.position.x, 
				this.position.y, 
				this.width * this.scale, 
				this.height * this.scale
			);
		}
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