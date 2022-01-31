class VirtualJabuti {
    constructor(map) {
        this.map = map;
        this.tileX = 0;
        this.tileY = 0;
        this.orientation = 'left';
        this.randomizePositionAndOrientation();
        this.sizeXPercentage = 50;
        this.sizeYPercentage = 80;
        this.jabutiImage = document.getElementById("jabuti-image");

        this.currentlyMoving = false;
        this.timeMovementBegan = 0;
        this.timeToMove = 1;
        this.timeAfterMove = 0.5;

        this.currentMovement = 'none';

    }
    setPosition(x, y) {
        this.tileX = x;
        this.tileY = y;
    }
    setOrientation(orientation) {
        this.orientation = orientation;
    }
    draw(dt) {

        var ctx = this.map.simulation.canvasHandler.canvas2DCtx;

        var tileSizeX = this.map.getTileSizeX();
        var tileSizeY = this.map.getTileSizeY();

        var sizeX = (tileSizeX * this.sizeXPercentage)/100;
        var sizeY = (tileSizeY * this.sizeYPercentage)/100;

        var jabutiCenterX = this.tileX * tileSizeX + tileSizeX/2;
        var jabutiCenterY = this.tileY * tileSizeY + tileSizeY/2;

        this.animatedMovement(dt, ctx, jabutiCenterX, jabutiCenterY, sizeX, sizeY);

    }

    animatedMovement(dt, ctx, jabutiCenterX, jabutiCenterY, sizeX, sizeY) {

        var angle = this.getProperAngleOfJabutiImage();

        var tileSizeX = this.map.getTileSizeX();
        var tileSizeY = this.map.getTileSizeY();
        

        if(this.currentMovement == 'none' || this.timeElapsedSinceMovementBegan() > this.timeToMove) {
            this.drawJabutiImage(ctx, jabutiCenterX, jabutiCenterY, sizeX, sizeY, angle);
        }
        else if (this.currentMovement == 'forward') {
            switch(this.orientation) {
                case 'right':
                    var imgXPos = jabutiCenterX - tileSizeX + tileSizeX * (this.timeElapsedSinceMovementBegan() / this.timeToMove)
                    this.drawJabutiImage(ctx, imgXPos, jabutiCenterY, sizeX, sizeY, angle);
                    break;
                case 'up':
                    var imgYPos = jabutiCenterY + tileSizeY - tileSizeY * (this.timeElapsedSinceMovementBegan() / this.timeToMove)
                    this.drawJabutiImage(ctx, jabutiCenterX, imgYPos, sizeX, sizeY, angle);
                    break;
                case 'left':
                    var imgXPos = jabutiCenterX + tileSizeX - tileSizeX * (this.timeElapsedSinceMovementBegan() / this.timeToMove)
                    this.drawJabutiImage(ctx, imgXPos, jabutiCenterY, sizeX, sizeY, angle);
                    break;
                case 'down':
                    var imgYPos = jabutiCenterY - tileSizeY + tileSizeY * (this.timeElapsedSinceMovementBegan() / this.timeToMove)
                    this.drawJabutiImage(ctx, jabutiCenterX, imgYPos, sizeX, sizeY, angle);
                    break;
            }
        }
        else if(this.currentMovement == 'left') {
            var percentageOfMovement = this.percentageOfMovementComplete();
            switch(this.orientation) {
                case 'right':
                    var circularParamX = 1 - Math.cos((Math.PI/2) * percentageOfMovement);
                    var circularParamY = Math.sin((Math.PI/2) * percentageOfMovement);
                    var imgXPos = jabutiCenterX - tileSizeX + tileSizeX * circularParamX;
                    var imgYPos = jabutiCenterY - tileSizeY + tileSizeY * circularParamY;
                    this.drawJabutiImage(ctx, imgXPos, imgYPos, sizeX, sizeY, this.getProperAngleOfJabutiImage());
                    break;
                case 'up':
                    var circularParamX = Math.sin((Math.PI/2) * percentageOfMovement);
                    var circularParamY = 1 - Math.cos((Math.PI/2) * percentageOfMovement);
                    var imgXPos = jabutiCenterX - tileSizeX + tileSizeX * circularParamX;
                    var imgYPos = jabutiCenterY + tileSizeY - tileSizeY * circularParamY;
                    this.drawJabutiImage(ctx, imgXPos, imgYPos, sizeX, sizeY, this.getProperAngleOfJabutiImage());
                    break;
                case 'left':
                    var circularParamX = 1 - Math.cos((Math.PI/2) * percentageOfMovement);
                    var circularParamY = Math.sin((Math.PI/2) * percentageOfMovement);
                    var imgXPos = jabutiCenterX + tileSizeX - tileSizeX * circularParamX;
                    var imgYPos = jabutiCenterY + tileSizeY - tileSizeY * circularParamY;
                    this.drawJabutiImage(ctx, imgXPos, imgYPos, sizeX, sizeY, this.getProperAngleOfJabutiImage());
                    break;
                case 'down':
                    var circularParamX = Math.sin((Math.PI/2) * percentageOfMovement);
                    var circularParamY = 1 - Math.cos((Math.PI/2) * percentageOfMovement);
                    var imgXPos = jabutiCenterX + tileSizeX - tileSizeX * circularParamX;
                    var imgYPos = jabutiCenterY - tileSizeY + tileSizeY * circularParamY;
                    this.drawJabutiImage(ctx, imgXPos, imgYPos, sizeX, sizeY, this.getProperAngleOfJabutiImage());
                    break;
            }
        }
        else if(this.currentMovement == 'right') {
            var percentageOfMovement = this.percentageOfMovementComplete();
            switch(this.orientation) {
                case 'right':
                    var circularParamX = 1 - Math.cos((Math.PI/2) * percentageOfMovement);
                    var circularParamY = Math.sin((Math.PI/2) * percentageOfMovement);
                    var imgXPos = jabutiCenterX - tileSizeX + tileSizeX * circularParamX;
                    var imgYPos = jabutiCenterY + tileSizeY - tileSizeY * circularParamY;
                    this.drawJabutiImage(ctx, imgXPos, imgYPos, sizeX, sizeY, this.getProperAngleOfJabutiImage());
                    break;
                case 'up':
                    var circularParamX = Math.sin((Math.PI/2) * percentageOfMovement);
                    var circularParamY = 1 - Math.cos((Math.PI/2) * percentageOfMovement);
                    var imgXPos = jabutiCenterX + tileSizeX - tileSizeX * circularParamX;
                    var imgYPos = jabutiCenterY + tileSizeY - tileSizeY * circularParamY;
                    this.drawJabutiImage(ctx, imgXPos, imgYPos, sizeX, sizeY, this.getProperAngleOfJabutiImage());
                    break;
                case 'left':
                    var circularParamX = 1 - Math.cos((Math.PI/2) * percentageOfMovement);
                    var circularParamY = Math.sin((Math.PI/2) * percentageOfMovement);
                    var imgXPos = jabutiCenterX + tileSizeX - tileSizeX * circularParamX;
                    var imgYPos = jabutiCenterY - tileSizeY + tileSizeY * circularParamY;
                    this.drawJabutiImage(ctx, imgXPos, imgYPos, sizeX, sizeY, this.getProperAngleOfJabutiImage());
                    break;
                case 'down':
                    var circularParamX = Math.sin((Math.PI/2) * percentageOfMovement);
                    var circularParamY = 1 - Math.cos((Math.PI/2) * percentageOfMovement);
                    var imgXPos = jabutiCenterX - tileSizeX + tileSizeX * circularParamX;
                    var imgYPos = jabutiCenterY - tileSizeY + tileSizeY * circularParamY;
                    this.drawJabutiImage(ctx, imgXPos, imgYPos, sizeX, sizeY, this.getProperAngleOfJabutiImage());
                    break;
            }
        }
    
    }

    drawJabutiImage(ctx, jabutiCenterX, jabutiCenterY, sizeX, sizeY, angle) {
        //ctx.rotate(angle);
        var angleToRotateInRadians = -(angle/180)*Math.PI + Math.PI/2;

        ctx.save();
        ctx.translate(jabutiCenterX, jabutiCenterY);
        ctx.rotate(angleToRotateInRadians);
        ctx.translate(-jabutiCenterX,-jabutiCenterY);
        
        ctx.drawImage(this.jabutiImage, jabutiCenterX - sizeX/2, jabutiCenterY - sizeY/2, sizeX, sizeY);
        
        ctx.restore();

        // for edge tiles, draw the jabuti in the opposite side as well
        var tileSizeX = this.map.getTileSizeX();
        var tileSizeY = this.map.getTileSizeY();
        var tilesQuantityX = this.map.tilesQuantityX;
        var tilesQuantityY = this.map.tilesQuantityY;
        var isInEdgeSomehow = false;
        var reflectedJabutiCenterX = jabutiCenterX;
        var reflectedJabutiCenterY = jabutiCenterY;

        if(jabutiCenterX < tileSizeX/2) {
            reflectedJabutiCenterX = jabutiCenterX + (tileSizeX * tilesQuantityX);
            isInEdgeSomehow = true;
        }
        else if(jabutiCenterX > tileSizeX * tilesQuantityX - tileSizeX/2) {
            reflectedJabutiCenterX = jabutiCenterX - (tileSizeX * (tilesQuantityX));
            isInEdgeSomehow = true;
        }
        if(jabutiCenterY < tileSizeY/2) {
            reflectedJabutiCenterY = jabutiCenterY + (tileSizeY * tilesQuantityY);
            isInEdgeSomehow = true;
        }
        else if(jabutiCenterY > tileSizeY * tilesQuantityY - tileSizeY/2) {
            reflectedJabutiCenterY = jabutiCenterY - (tileSizeY * (tilesQuantityY));
            isInEdgeSomehow = true;
        }

        if(isInEdgeSomehow) {
            ctx.save();
            ctx.translate(reflectedJabutiCenterX, reflectedJabutiCenterY);
            ctx.rotate(angleToRotateInRadians);
            ctx.translate(-reflectedJabutiCenterX,-reflectedJabutiCenterY);
            ctx.drawImage(this.jabutiImage, reflectedJabutiCenterX - sizeX/2, reflectedJabutiCenterY - sizeY/2, sizeX, sizeY);
            ctx.restore();
        }

        //ctx.drawImage(image,0,0);
        

        //ctx.drawImage(this.jabutiImage, initialX, initialY, sizeX, sizeY);
        //ctx.rotate(-angle);
    }

    performProperLogicalMovement() {
        if(this.currentMovement == 'none') return;

        this.timeMovementBegan = new Date();

        // adjusting logical position based on movement
        switch(this.orientation) {
            case 'right':
                this.tileX += 1;
                break;
            case 'up':
                this.tileY -= 1;
                break;
            case 'left':
                this.tileX -= 1;
                break;
            case 'down':
                this.tileY += 1;
                break;
        }
        switch(this.currentMovement) {
            case 'left':
                switch(this.orientation) {
                    case 'right':
                        this.tileY -= 1;
                        break;
                    case 'up':
                        this.tileX -= 1;
                        break;
                    case 'left':
                        this.tileY += 1;
                        break;
                    case 'down':
                        this.tileX += 1;
                        break;
                }
                break;
            case 'right':
                switch(this.orientation) {
                    case 'right':
                        this.tileY += 1;
                        break;
                    case 'up':
                        this.tileX += 1;
                        break;
                    case 'left':
                        this.tileY -= 1;
                        break;
                    case 'down':
                        this.tileX -= 1;
                        break;
                }
                break;
        }

        // if exceeded boundaries, we make it so that it appears on the opposite side
        var tilesQuantityX = this.map.tilesQuantityX;
        var tilesQuantityY = this.map.tilesQuantityY;
        
        if(this.tileX < 0) {
            this.tileX = tilesQuantityX - 1;
        }
        else if(this.tileX >= tilesQuantityX) {
            this.tileX = 0;
        }
        if(this.tileY < 0) {
            this.tileY = tilesQuantityY - 1;
        }
        else if(this.tileY >= tilesQuantityY) {
            this.tileY = 0;
        }

        // adjusting orientation based on movement
        if(this.currentMovement == 'left') {
            switch(this.orientation) {
                case 'right':
                    this.orientation = 'up';
                    break;
                case 'up':
                    this.orientation = 'left';
                    break;
                case 'left':
                    this.orientation = 'down';
                    break;
                case 'down':
                    this.orientation = 'right';
                    break;
            }
        }
        else if(this.currentMovement == 'right') {
            switch(this.orientation) {
                case 'right':
                    this.orientation = 'down';
                    break;
                case 'up':
                    this.orientation = 'right';
                    break;
                case 'left':
                    this.orientation = 'up';
                    break;
                case 'down':
                    this.orientation = 'left';
                    break;
            }
        }
    }

    orientationIfTurnedLeft() {
        this.currentMovement = 'left';
        var savedTileX = this.tileX;
        var savedTileY = this.tileY;
        var savedOrientation = this.orientation;
        this.performProperLogicalMovement();
        var orientationIfTurnedLeft = this.orientation;
        this.tileX = savedTileX;
        this.tileY = savedTileY;
        this.orientation = savedOrientation;
        this.currentMovement = 'none';
        return orientationIfTurnedLeft;
    }

    orientationIfTurnedRight() {
        this.currentMovement = 'right';
        var savedTileX = this.tileX;
        var savedTileY = this.tileY;
        var savedOrientation = this.orientation;
        this.performProperLogicalMovement();
        var orientationIfTurnedRight = this.orientation;
        this.tileX = savedTileX;
        this.tileY = savedTileY;
        this.orientation = savedOrientation;
        this.currentMovement = 'none';
        return orientationIfTurnedRight;
    }

    positionIfMovedForward() {
        this.currentMovement = 'forward';
        var savedTileX = this.tileX;
        var savedTileY = this.tileY;
        var savedOrientation = this.orientation;
        this.performProperLogicalMovement();
        var positionIfMovedForward = [this.tileX, this.tileY];
        this.tileX = savedTileX;
        this.tileY = savedTileY;
        this.orientation = savedOrientation;
        this.currentMovement = 'none';
        return positionIfMovedForward;
    }

    getProperAngleOfJabutiImage() {
        if(this.currentMovement == 'none' || this.currentMovement == 'forward') {
            switch(this.orientation) {
                case 'right':
                    return 0;
                case 'up':
                    return 90;
                case 'left':
                    return 180;
                case 'down':
                    return 270;
            }
        }
        else if(this.currentMovement == 'left') {
            switch(this.orientation) {
                case 'right':
                    return 270 + this.percentageOfMovementComplete() * 90;
                case 'up':
                    return 0 + this.percentageOfMovementComplete() * 90;
                case 'left':
                    return 90 + this.percentageOfMovementComplete() * 90;
                case 'down':
                    return 180 + this.percentageOfMovementComplete() * 90;
            }
        }
        else if(this.currentMovement == 'right') {
            switch(this.orientation) {
                case 'right':
                    return 90 - this.percentageOfMovementComplete() * 90;
                case 'up':
                    return 180 - this.percentageOfMovementComplete() * 90;
                case 'left':
                    return 270 - this.percentageOfMovementComplete() * 90;
                case 'down':
                    return 0 - this.percentageOfMovementComplete() * 90;
            }
        }
        return 0;
    }

    percentageOfMovementComplete() {
        var percentageOfMovement = this.timeElapsedSinceMovementBegan() / this.timeToMove;
        if(percentageOfMovement > 1) percentageOfMovement = 1;
        return percentageOfMovement;
    }

    timeElapsedSinceMovementBegan() {
        return (new Date() - this.timeMovementBegan) / 1000;
    }



    move(movementStr, callback_finished) {
        if(this.currentMovement != 'none') return;

        this.currentMovement = movementStr;
        this.performProperLogicalMovement();



        var self = this;
        function finished() {

            self.currentMovement = 'none';
            callback_finished();
        }

        setTimeout(finished, 1000 * (this.timeToMove + this.timeAfterMove));
    }

    randomizePositionAndOrientation() {
        this.randomizePosition();
        this.randomizeOrientation();
    }

    randomizePosition() {
        var newPosX = getRandomIntNotExceeding(this.map.tilesQuantityX);
        var newPosY = getRandomIntNotExceeding(this.map.tilesQuantityY);
        this.setPosition(newPosX, newPosY);
    }
    randomizeOrientation() {
        var orientationId = getRandomIntNotExceeding(4);
        switch(orientationId) {
            case 0:
                this.orientation = 'right';
                break;
            case 1:
                this.orientation = 'up';
                break;
            case 2:
                this.orientation = 'left';
                break;
            case 3:
                this.orientation = 'down';
                break;
        }
    }

}