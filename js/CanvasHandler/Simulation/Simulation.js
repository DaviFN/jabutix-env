class Simulation {
    constructor(canvasHandler) {
        this.canvasHandler = canvasHandler;
        this.defaultMapSizeX = 10;
        this.defaultMapSizeY = 10;
        this.map = new Map(this, this.defaultMapSizeX, this.defaultMapSizeY);
    }
    draw(dt) {

        this.map.draw(dt);
        this.map.virtualJabuti.draw(dt);
        
    }

    resetToNormal() {
        this.map.setSize(this.defaultMapSizeX, this.defaultMapSizeY);
        this.map.jabutiVirtual.randomizePositionAndOrientation;
        canvasHandler.gamification.endAllGamifications();
    }
}