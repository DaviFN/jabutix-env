class Map {
    constructor(simulation, tilesQuantityX, tilesQuantityY) {
        this.simulation = simulation;
        this.tilesQuantityX = tilesQuantityX;
        this.tilesQuantityY = tilesQuantityY;
        this.horizontalSeparatorsThickness = 5;
        this.separatorLinesColor = "#000000";
        this.startingTilesColor = "#ff0000";

        this.backgroundColor = "#000000";

        this.virtualJabuti = new VirtualJabuti(this);

        this.tyleType_nothing = 0;
        this.tyleType_destination = 1;
        this.tyleType_wall = 2;
        this.tyleType_arrowRight = 3;
        this.tyleType_arrowUp = 4;
        this.tyleType_arrowLeft = 5;
        this.tyleType_arrowDown = 6;

        this.tyleType_nothing_color = "#ffffff";
        this.tyleType_destination_color = "#00ff00";
        this.tyleType_wall_color = "#000000";
        
        this.rightArrowImage = document.getElementById("right-arrow");
        this.upArrowImage = document.getElementById("up-arrow");
        this.leftArrowImage = document.getElementById("left-arrow");
        this.downArrowImage = document.getElementById("down-arrow");

        this.tileType = matrixOfZeros(this.tilesQuantityX, this.tilesQuantityY);

        //for(var i = 0 ; i < this.tilesQuantityX ; i++) {
        //    for(var j = 0 ; j < this.tilesQuantityY ; j++) {
        //        this.tileType[i][j] = this.tyleType_arrowDown;
        //    }
        //}

    }

    drawArrowImageToTile(arrowImage, i, j) {
        this.paintTile(this.tyleType_nothing_color, i, j);
        var ctx = this.simulation.canvasHandler.canvas2DCtx;
        var imageSpacementX = this.getTileSizeX() * 0;
        var imageSpacementY = this.getTileSizeY() * 0;
        var imageStartX = this.getTileSizeX() * i + imageSpacementX;
        var imageStartY = this.getTileSizeY() * j + imageSpacementY;
        var imageSizeX = this.getTileSizeX() - 2 * imageSpacementX;
        var imageSizeY = this.getTileSizeY() - 2 * imageSpacementY;
        ctx.drawImage(arrowImage, imageStartX, imageStartY, imageSizeX, imageSizeY);
    }

    setSize(sizeX, sizeY) {
        this.tilesQuantityX = sizeX;
        this.tilesQuantityY = sizeY;
        this.tileType = matrixOfZeros(this.tilesQuantityX, this.tilesQuantityY);
    }
    getSizeX() {
        return this.tilesQuantityX;
    }
    getSizeY() {
        return this.tilesQuantityY;
    }
    getTileSizeX() {
        return canvas.width/this.tilesQuantityX;
    }
    getTileSizeY() {
        return canvas.height/this.tilesQuantityY;
    }
    draw(dt) {

        var ctx = canvasHandler.canvas2DCtx;

        var tileSizeX = this.getTileSizeX();
        var tileSizeY = this.getTileSizeY();

        //console.log("canvas.width: " + canvas.width);
        //console.log("this.tilesQuantityX: " + this.tilesQuantityX);
        //console.log("tileSizeX: " + tileSizeX);

        //console.log("canvas.height: " + canvas.height);
        //console.log("this.tilesQuantityY: " + this.tilesQuantityY);
        //console.log("tileSizeY " + tileSizeY);

        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for(var i = 0 ; i < this.tilesQuantityX ; i++) {
            for(var j = 0 ; j < this.tilesQuantityX ; j++) {
                switch(this.tileType[i][j]) {
                    case this.tyleType_nothing:
                        this.paintTile(this.tyleType_nothing_color, i, j);
                        break;
                    case this.tyleType_destination:
                        this.paintTile(this.tyleType_destination_color, i, j);
                        break;
                    case this.tyleType_wall:
                        this.paintTile(this.tyleType_wall_color, i, j);
                        break;
                    case this.tyleType_arrowRight:
                        this.drawArrowImageToTile(this.rightArrowImage, i, j)
                        break;
                    case this.tyleType_arrowUp:
                        this.drawArrowImageToTile(this.upArrowImage, i, j)
                        break;
                    case this.tyleType_arrowLeft:
                        this.drawArrowImageToTile(this.leftArrowImage, i, j)
                        break;
                    case this.tyleType_arrowDown:
                        this.drawArrowImageToTile(this.downArrowImage, i, j)
                        break;
                }
            }
        }



        




        ctx.fillStyle = this.separatorLinesColor;

        //ctx.beginPath();
        //ctx.moveTo(0, tileSizeX);
        //ctx.lineTo(1920, tileSizeX);
        //ctx.stroke();

        // horizontal separators
        var thickness = this.horizontalSeparatorsThickness;
        for(var i = 0 ; i < this.tilesQuantityY + 1 ; i++) {
            ctx.fillRect(0, tileSizeY * i - thickness, canvas.width, 1 + 2 * thickness);
        }
        // vertical separators
        for(var i = 0 ; i < this.tilesQuantityX + 1; i++) {
            ctx.fillRect(tileSizeX * i - thickness, 0, 1 + 2 * thickness, canvas.height);
        }

    }
    getTileXStart(x) {
        return this.getTileSizeX() * x;
    }
    getTileYStart(y) {
        return this.getTileSizeY() * y;
    }
    paintTile(color, x, y) {
        var ctx = this.simulation.canvasHandler.canvas2DCtx;
        ctx.fillStyle = color;
        ctx.fillRect(this.getTileXStart(x) + this.horizontalSeparatorsThickness, this.getTileYStart(y) + this.horizontalSeparatorsThickness, this.getTileSizeX() - this.horizontalSeparatorsThickness * 2, this.getTileSizeY() - this.horizontalSeparatorsThickness * 2);
    }

    setTileToNothing(i, j) {
        this.tileType[i][j] = this.tyleType_nothing;
    }

    setTileToDestination(i, j) {
        this.tileType[i][j] = this.tyleType_destination;
    }

    setTileToWall(i, j) {
        this.tileType[i][j] = this.tyleType_wall;
    }

    setTileToArrow(i, j, arrowStr) {
        switch(arrowStr) {
            case 'right':
                this.tileType[i][j] = this.tyleType_arrowRight;
                break;
            case 'up':
                this.tileType[i][j] = this.tyleType_arrowUp;
                break;
            case 'left':
                this.tileType[i][j] = this.tyleType_arrowLeft;
                break;
            case 'down':
                this.tileType[i][j] = this.tyleType_arrowDown;
                break;
        }
        
    }

    setAllTilesToWall() {
        for(var i = 0 ; i < this.tilesQuantityX ; i++) {
            for(var j = 0 ; j < this.tilesQuantityY ; j++) {
                this.tileType[i][j] = this.tyleType_wall;
            }
        }
    }

    clearDestination() {
        for(var i = 0 ; i < this.tilesQuantityX ; i++) {
            for(var j = 0 ; j < this.tilesQuantityY ; j++) {
                if(this.tileType[i][j] == this.tyleType_destination) {
                    this.tileType[i][j] = this.tyleType_nothing;
                }
            }
        }
        alert("over")
    }

    tileIsWall(i, j) {
        return this.tileType[i][j] == this.tyleType_wall;
    }

    stringOfArrowTileType(arrowTileType) {
        switch(arrowTileType) {
            case this.tyleType_arrowRight:
                return 'right';
            case this.tyleType_arrowUp:
                return 'up';
            case this.tyleType_arrowLeft:
                return 'left';
            case this.tyleType_arrowDown:
                return 'down';
        }
        return 'none';
    }

    jabutiFacesLeftSign() {
        //console.log("on jabutiFacesLeftSign")
        var virtualJabuti = this.virtualJabuti;
        var jabutiPositionIfMovedForward = virtualJabuti.positionIfMovedForward();
        var tileXToConsider = jabutiPositionIfMovedForward[0];
        var tileYToConsider = jabutiPositionIfMovedForward[1];
        //console.log("jabutiPositionIfMovedForward: " + tileXToConsider + " " + tileYToConsider);
        var tileInFrontOfJabuti = this.tileType[tileXToConsider][tileYToConsider];
        //console.log("tileInFrontOfJabuti: " + tileInFrontOfJabuti);
        //console.log("stringOfArrowTileType(tileInFrontOfJabuti): " + this.stringOfArrowTileType(tileInFrontOfJabuti));
        return relativeDirectionOfAbsoluteDirectionBasedOnRelativeDirection(this.stringOfArrowTileType(tileInFrontOfJabuti), virtualJabuti.orientation) == 'left';
    }

    jabutiFacesRightSign() {
        //console.log("on jabutiFacesLeftSign")
        var virtualJabuti = this.virtualJabuti;
        var jabutiPositionIfMovedForward = virtualJabuti.positionIfMovedForward();
        var tileXToConsider = jabutiPositionIfMovedForward[0];
        var tileYToConsider = jabutiPositionIfMovedForward[1];
        //console.log("jabutiPositionIfMovedForward: " + tileXToConsider + " " + tileYToConsider);
        var tileInFrontOfJabuti = this.tileType[tileXToConsider][tileYToConsider];
        //console.log("tileInFrontOfJabuti: " + tileInFrontOfJabuti);
        //console.log("stringOfArrowTileType(tileInFrontOfJabuti): " + this.stringOfArrowTileType(tileInFrontOfJabuti));
        return relativeDirectionOfAbsoluteDirectionBasedOnRelativeDirection(this.stringOfArrowTileType(tileInFrontOfJabuti), virtualJabuti.orientation) == 'right';
    }

    jabutiFacesWall() {
        ///alert("aaa")
        //console.log("on jabutiFacesLeftSign")
        var virtualJabuti = this.virtualJabuti;
        var jabutiPositionIfMovedForward = virtualJabuti.positionIfMovedForward();
        var tileXToConsider = jabutiPositionIfMovedForward[0];
        var tileYToConsider = jabutiPositionIfMovedForward[1];
        //console.log("jabutiPositionIfMovedForward: " + tileXToConsider + " " + tileYToConsider);
        var tileInFrontOfJabuti = this.tileType[tileXToConsider][tileYToConsider];
        if(tileInFrontOfJabuti == this.tyleType_wall) {
            return true;
        }
        //console.log("tileInFrontOfJabuti: " + tileInFrontOfJabuti);
        //console.log("stringOfArrowTileType(tileInFrontOfJabuti): " + this.stringOfArrowTileType(tileInFrontOfJabuti));
        return false;
    }

    putWallsOnSurrounding() {
        for(var i = 0 ; i < this.tilesQuantityX ; i++) {
            this.setTileToWall(i, 0);
            this.setTileToWall(i, this.tilesQuantityY - 1);
        }
        for(var i = 0 ; i < this.tilesQuantityY; i++) {
            this.setTileToWall(0, i);
            this.setTileToWall(this.tilesQuantityX - 1, i);
        }
    }

    jabutiIsInWall() {
        var jabutiPosX = this.virtualJabuti.tileX;
        var jabutiPosY = this.virtualJabuti.tileY;
        if(this.tileType[jabutiPosX][jabutiPosY] == this.tyleType_wall) {
            return true;
        }
        return false;
    }

    hasDestination() {
        for(var i = 0 ; i < this.tilesQuantityX ; i++) {
            for(var j = 0 ; j < this.tilesQuantityY ; j++) {
                if(this.tileType[i][j] == this.tyleType_destination) {
                    return true;
                }
            }
        }
        return false;
    }

    getDestinationPosition() {
        for(var i = 0 ; i < this.tilesQuantityX ; i++) {
            for(var j = 0 ; j < this.tilesQuantityY ; j++) {
                if(this.tileType[i][j] == this.tyleType_destination) {
                    return [i, j];
                }
            }
        }
        return [0, 0]
    }

    getDistanceFromJabutiToDestination() {
        if(this.hasDestination()) {
            return 0;
        }
        var destPosition = this.getDestinationPosition();
        var destPosX = destPosition[0];
        var destPosY = destPosition[1];
        var jabPosX = this.virtualJabuti.tileX;
        var jabPosY = this.virtualJabuti.tileY;
        console.log("distance: " + Math.abs(destPosX - jabPosX) + Math.abs(destPosY - jabPosY))
        return Math.abs(destPosX - jabPosX) + Math.abs(destPosY - jabPosY);
    }

    getDistanceFromJabutiToTile(i, j) {
        var jabPosX = this.virtualJabuti.tileX;
        var jabPosY = this.virtualJabuti.tileY;
        return Math.abs(i - jabPosX) + Math.abs(j - jabPosY);
    }


    jabutiIsInDestination() {
        var jabutiPosX = this.virtualJabuti.tileX;
        var jabutiPosY = this.virtualJabuti.tileY;
        if(this.tileType[jabutiPosX][jabutiPosY] == this.tyleType_destination) {
            return true;
        }
        return false;
    }
    positionIsInEmptyCell(posX, posY) {
        return this.tileType[posX][posY] == this.tyleType_nothing;
    }

    getRandomPosition() {
        var randomPositionX = getRandomIntNotExceeding(this.tilesQuantityX);
        var randomPositionY = getRandomIntNotExceeding(this.tilesQuantityY);
        return [randomPositionX, randomPositionY];

    }

    jabutiIsInTile(posX, posY) {
        return this.virtualJabuti.tileX == posX && this.virtualJabuti.tileY == posY;
    }

}