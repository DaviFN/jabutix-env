class Gamification {
    constructor(canvasHandler) {
        this.canvasHandler = canvasHandler;

        this.loopChallengeGoingOn = false;

        this.loopChallengeMapSizeX = 15;
        this.loopChallengeMapSizeY = 15;
        this.loopChallengeOriginX = 0;
        this.loopChallengeOriginY = 0;
        this.loopChallengeInitialOrientation = 'left';
        this.loopChallengeDestinationX = 0;
        this.loopChallengeDestinationY = 0;


        this.conditionalsChallengeGoingOn = false;

        this.conditionalsChallengeMap1 = new Map(this.canvasHandler.simulation, 10, 10);
        this.conditionalsChallengeMap2 = new Map(this.canvasHandler.simulation, 10, 10);


        // these could probably be bundled onto some data structure,
        // but not much harm in doing it like so...
        this.conditionalChallenge1OriginX = 0;
        this.conditionalChallenge1OriginY = 0;
        this.conditionalChallenge1InitialOrientation = 'left';
        this.conditionalChallenge1DestinationX = 0;
        this.conditionalChallenge1DestinationY = 0;
        this.conditionalChallenge1Path = [];

        this.conditionalChallenge2OriginX = 0;
        this.conditionalChallenge2OriginY = 0;
        this.conditionalChallenge2InitialOrientation = 'left';
        this.conditionalChallenge2DestinationX = 0;
        this.conditionalChallenge2DestinationY = 0;
        this.conditionalChallenge2Path = [];

        this.conditionalChallengeFirstTurnRight = true;

        this.whichConditionalsChallengeMapIsItIn = 0;





        // different levels:

        this.levelGoingOn = false;
        this.levelOriginX = 0;
        this.levelOriginY = 0;
        this.levelInitialOrientation = 'left';
        this.levelDestinationX = 0;
        this.levelDestinationY = 0;
        this.levelDifficulty = 0;



    }

    startLoopChallenge() {
        this.loopChallengeGoingOn = true;

        this.canvasHandler.simulation.map.setSize(this.loopChallengeMapSizeX, this.loopChallengeMapSizeY);
        this.determineLoopChallengeDestination();
        this.resetLoopChallenge();
       
        this.canvasHandler.simulation.map.setTileToDestination(this.loopChallengeDestinationX, this.loopChallengeDestinationY);
       
        alert("Bem-vindo ao desafio do loop!\nMova o jabuti para o destino (em verde) com um programa que não exceda 7 blocos para completá-lo.")
    
    }

    stopLoopChallenge() {
        this.loopChallengeGoingOn = false;
        this.canvasHandler.simulation.resetDefaultMapSize();
    }

    determineLoopChallengeDestination() {
        var tempMap = new Map(this.simulation, this.loopChallengeMapSizeX, this.loopChallengeMapSizeY);
        this.loopChallengeOriginX = tempMap.virtualJabuti.tileX;
        this.loopChallengeOriginY = tempMap.virtualJabuti.tileY;
        this.loopChallengeInitialOrientation = tempMap.virtualJabuti.orientation;

        console.log(tempMap.virtualJabuti);

        // logic to create a puzzle impossible to be solved without loops (must use less than 7 blocks)
        var tilAboutHalf = Math.floor((this.loopChallengeMapSizeX - 1)/2);

        // moving forward
        tempMap.virtualJabuti.currentMovement = 'forward';
        for(var i = 0 ; i < tilAboutHalf ; i++) {
            tempMap.virtualJabuti.performProperLogicalMovement();
        }

        // moving to some side once, then all the way forward
        if(getRandomIntNotExceeding(2)) {
            tempMap.virtualJabuti.currentMovement = 'left';
        }
        else {
            tempMap.virtualJabuti.currentMovement = 'right';
        }
        tempMap.virtualJabuti.performProperLogicalMovement();
        tempMap.virtualJabuti.currentMovement = 'forward';
        for(var i = 1 ; i < tilAboutHalf ; i++) {
            tempMap.virtualJabuti.performProperLogicalMovement();
        }

        this.loopChallengeDestinationX = tempMap.virtualJabuti.tileX;
        this.loopChallengeDestinationY = tempMap.virtualJabuti.tileY;

    }

    howManyBlocksAreBeingUsed() {
        return demoWorkspace.getAllBlocks(false).length
    }

    //draw(dt) {
    //    if(this.loopChallengeGoingOn) {
    //        this.canvasHandler.simulation.map.paintTile('#00ff00', this.loopChallengeDestinationX, this.loopChallengeDestinationY);
    //    }
    //}
    
    canExecuteCodeCheck() {
        if(this.loopChallengeGoingOn) {
            if(currentNumberOfBlocksInProgram() > 7) {
                alert("O desafio do loop exige que o programa não ultrapasse 7 blocos");
                return false;
            }
        }
        return true;
    }

    wasLoopChallengePassed() {
        return this.canvasHandler.simulation.map.virtualJabuti.tileX == this.loopChallengeDestinationX
            && this.canvasHandler.simulation.map.virtualJabuti.tileY == this.loopChallengeDestinationY;
    }

    resetLoopChallenge() {
        this.canvasHandler.simulation.map.virtualJabuti.setPosition(this.loopChallengeOriginX, this.loopChallengeOriginY);
        this.canvasHandler.simulation.map.virtualJabuti.orientation = this.loopChallengeInitialOrientation;
    }

    startConditionalsChallenge() {
        this.conditionalsChallengeGoingOn = true;

        this.createConditionalsChallenge();

        this.resetConditionalsChallenge();

        alert("Bem-vindo ao desafio das condicionais!\nCodifique um mesmo programa que mova o jabuti para o destino (em verde) em ambos os mapas do desafio para completá-lo.")
    }

    createConditionalsChallenge() {

        this.conditionalChallenge1Path = [];

        this.conditionalChallengeFirstTurnRight = getRandomIntNotExceeding(2) == 0;

        this.conditionalsChallengeMap1 = new Map(this.canvasHandler.simulation, 8, 8);
        this.conditionalsChallengeMap2 = new Map(this.canvasHandler.simulation, 8, 8);


        this.conditionalChallenge1OriginX = this.conditionalsChallengeMap1.virtualJabuti.tileX;
        this.conditionalChallenge1OriginY = this.conditionalsChallengeMap1.virtualJabuti.tileY;
        this.conditionalChallenge1InitialOrientation = this.conditionalsChallengeMap1.virtualJabuti.orientation;
        
        var arrowsMap1 = [];
        
        var virtualJabuti = this.conditionalsChallengeMap1.virtualJabuti;
        
        virtualJabuti.currentMovement = 'forward';
        //var n = getRandomIntBetween(3, 4);
        var n = 4;
        for(var i = 0 ; i < n ; i++) {
            virtualJabuti.performProperLogicalMovement();
            this.conditionalChallenge1Path.push([virtualJabuti.tileX, virtualJabuti.tileY]);
        }

        var positionIfMovedForward = virtualJabuti.positionIfMovedForward();
        if(this.conditionalChallengeFirstTurnRight) {
            arrowsMap1.push([positionIfMovedForward[0], positionIfMovedForward[1], virtualJabuti.orientationIfTurnedRight()]);
        }
        else {
            arrowsMap1.push([positionIfMovedForward[0], positionIfMovedForward[1], virtualJabuti.orientationIfTurnedLeft()]);
        }
        if(this.conditionalChallengeFirstTurnRight) {
            virtualJabuti.currentMovement = 'right';
            virtualJabuti.performProperLogicalMovement();
        }
        else {
            virtualJabuti.currentMovement = 'left';
            virtualJabuti.performProperLogicalMovement();
        }

        this.conditionalChallenge1Path.push([virtualJabuti.tileX, virtualJabuti.tileY]);

        virtualJabuti.currentMovement = 'forward';
        //n = getRandomIntBetween(3, 4);
        n = 4;
        for(var i = 0 ; i < n ; i++) {
            virtualJabuti.performProperLogicalMovement();
            this.conditionalChallenge1Path.push([virtualJabuti.tileX, virtualJabuti.tileY]);
        }

        positionIfMovedForward = virtualJabuti.positionIfMovedForward();
        if(this.conditionalChallengeFirstTurnRight) {
            arrowsMap1.push([positionIfMovedForward[0], positionIfMovedForward[1], virtualJabuti.orientationIfTurnedLeft()]);
        }
        else {
            arrowsMap1.push([positionIfMovedForward[0], positionIfMovedForward[1], virtualJabuti.orientationIfTurnedRight()]);
        }
        if(this.conditionalChallengeFirstTurnRight) {
            virtualJabuti.currentMovement = 'left';
            virtualJabuti.performProperLogicalMovement();
        }
        else {
            virtualJabuti.currentMovement = 'right';
            virtualJabuti.performProperLogicalMovement();
        }

        this.conditionalChallenge1Path.push([virtualJabuti.tileX, virtualJabuti.tileY]);

        virtualJabuti.currentMovement = 'forward';
        //n = getRandomIntBetween(3, 4);
        n = 4;
        for(var i = 0 ; i < n ; i++) {
            virtualJabuti.performProperLogicalMovement();
            this.conditionalChallenge1Path.push([virtualJabuti.tileX, virtualJabuti.tileY]);
        }

        virtualJabuti.currentMovement = 'none';

        this.conditionalChallenge1DestinationX = virtualJabuti.tileX;
        this.conditionalChallenge1DestinationY = virtualJabuti.tileY;

        virtualJabuti.setPosition(this.conditionalChallenge1OriginX, this.conditionalChallenge1OriginY);
        virtualJabuti.orientation = this.conditionalChallenge1InitialOrientation;

        this.conditionalsChallengeMap1.setAllTilesToWall();
        this.conditionalsChallengeMap1.setTileToNothing(this.conditionalChallenge1OriginX, this.conditionalChallenge1OriginY);
        for(var i = 0 ; i < this.conditionalChallenge1Path.length ; i++) {
            this.conditionalsChallengeMap1.setTileToNothing(this.conditionalChallenge1Path[i][0], this.conditionalChallenge1Path[i][1]);
        }
        for(var i = 0 ; i < arrowsMap1.length ; i++) {
            var arrowsMapElement = arrowsMap1[i];
            this.conditionalsChallengeMap1.setTileToArrow(arrowsMapElement[0], arrowsMapElement[1], arrowsMapElement[2]);
        }



        this.conditionalsChallengeMap1.setTileToDestination(this.conditionalChallenge1DestinationX, this.conditionalChallenge1DestinationY);


        // map 2
        // obs: lots of repetition, I know. could go into a method somehow.

        this.conditionalChallenge2OriginX = this.conditionalsChallengeMap2.virtualJabuti.tileX;
        this.conditionalChallenge2OriginY = this.conditionalsChallengeMap2.virtualJabuti.tileY;
        this.conditionalChallenge2InitialOrientation = this.conditionalsChallengeMap2.virtualJabuti.orientation;
        
        var arrowsMap2 = [];
        
        virtualJabuti = this.conditionalsChallengeMap2.virtualJabuti;
        
        virtualJabuti.currentMovement = 'forward';
        //var n = getRandomIntBetween(3, 4);
        var n = 4;
        for(var i = 0 ; i < n ; i++) {
            virtualJabuti.performProperLogicalMovement();
            this.conditionalChallenge2Path.push([virtualJabuti.tileX, virtualJabuti.tileY]);
        }

        var positionIfMovedForward = virtualJabuti.positionIfMovedForward();
        if(this.conditionalChallengeFirstTurnRight) {
            arrowsMap2.push([positionIfMovedForward[0], positionIfMovedForward[1], virtualJabuti.orientationIfTurnedLeft()]);
        }
        else {
            arrowsMap2.push([positionIfMovedForward[0], positionIfMovedForward[1], virtualJabuti.orientationIfTurnedRight()]);
        }
        if(this.conditionalChallengeFirstTurnRight) {
            virtualJabuti.currentMovement = 'left';
            virtualJabuti.performProperLogicalMovement();
        }
        else {
            virtualJabuti.currentMovement = 'right';
            virtualJabuti.performProperLogicalMovement();
        }

        this.conditionalChallenge2Path.push([virtualJabuti.tileX, virtualJabuti.tileY]);

        virtualJabuti.currentMovement = 'forward';
        //n = getRandomIntBetween(3, 4);
        n = 4;
        for(var i = 0 ; i < n ; i++) {
            virtualJabuti.performProperLogicalMovement();
            this.conditionalChallenge2Path.push([virtualJabuti.tileX, virtualJabuti.tileY]);
        }

        positionIfMovedForward = virtualJabuti.positionIfMovedForward();
        if(this.conditionalChallengeFirstTurnRight) {
            arrowsMap2.push([positionIfMovedForward[0], positionIfMovedForward[1], virtualJabuti.orientationIfTurnedLeft()]);
        }
        else {
            arrowsMap2.push([positionIfMovedForward[0], positionIfMovedForward[1], virtualJabuti.orientationIfTurnedRight()]);
        }
        if(this.conditionalChallengeFirstTurnRight) {
            virtualJabuti.currentMovement = 'left';
            virtualJabuti.performProperLogicalMovement();
        }
        else {
            virtualJabuti.currentMovement = 'right';
            virtualJabuti.performProperLogicalMovement();
        }

        this.conditionalChallenge2Path.push([virtualJabuti.tileX, virtualJabuti.tileY]);

        virtualJabuti.currentMovement = 'forward';
        //n = getRandomIntBetween(3, 5);
        n = 4;
        for(var i = 0 ; i < n ; i++) {
            virtualJabuti.performProperLogicalMovement();
            this.conditionalChallenge2Path.push([virtualJabuti.tileX, virtualJabuti.tileY]);
        }

        virtualJabuti.currentMovement = 'none';

        this.conditionalChallenge2DestinationX = virtualJabuti.tileX;
        this.conditionalChallenge2DestinationY = virtualJabuti.tileY;

        virtualJabuti.setPosition(this.conditionalChallenge2OriginX, this.conditionalChallenge2OriginY);
        virtualJabuti.orientation = this.conditionalChallenge2InitialOrientation;

        this.conditionalsChallengeMap2.setAllTilesToWall();
        this.conditionalsChallengeMap2.setTileToNothing(this.conditionalChallenge2OriginX, this.conditionalChallenge2OriginY);
        for(var i = 0 ; i < this.conditionalChallenge2Path.length ; i++) {
            this.conditionalsChallengeMap2.setTileToNothing(this.conditionalChallenge2Path[i][0], this.conditionalChallenge2Path[i][1]);
        }
        for(var i = 0 ; i < arrowsMap2.length ; i++) {
            var arrowsMapElement = arrowsMap2[i];
            this.conditionalsChallengeMap2.setTileToArrow(arrowsMapElement[0], arrowsMapElement[1], arrowsMapElement[2]);
        }



        this.conditionalsChallengeMap2.setTileToDestination(this.conditionalChallenge2DestinationX, this.conditionalChallenge2DestinationY);
    
    }

    setToSecondMap() {
        this.canvasHandler.simulation.map = this.conditionalsChallengeMap2;
        this.canvasHandler.simulation.map.virtualJabuti.tileX = this.conditionalChallenge2OriginX;
        this.canvasHandler.simulation.map.virtualJabuti.tileY = this.conditionalChallenge2OriginY;
        this.canvasHandler.simulation.map.virtualJabuti.orientation = this.conditionalChallenge2InitialOrientation;
    }

    resetConditionalsChallenge() {
        this.whichConditionalsChallengeMapIsItIn = 0;
        this.canvasHandler.simulation.map = this.conditionalsChallengeMap1;
        this.canvasHandler.simulation.map.virtualJabuti.tileX = this.conditionalChallenge1OriginX;
        this.canvasHandler.simulation.map.virtualJabuti.tileY = this.conditionalChallenge1OriginY;
        this.canvasHandler.simulation.map.virtualJabuti.orientation = this.conditionalChallenge1InitialOrientation;
    }

    checkGameOver() {
        var map = this.canvasHandler.simulation.map;
        if(this.conditionalsChallengeGoingOn) {
            // if the jabuti is on a wall, then it's game over
            if(map.jabutiIsInWall()) {
                //alert("Ops... Você bateu em uma parede!\nInfelizmente essa não é uma solução para o desafio das condicionais... Tente novamente!");
                outputArea.value += '\n<< Game over >>';
                userWantsToStopExecution = true;
                //this.resetConditionalsChallenge();
                setTimeout(finishExecution(), 0);
            }
        }
        else if(this.levelGoingOn) {
            // if the jabuti is on a wall, then it's game over
            if(map.jabutiIsInWall()) {
                //alert("Ops... Você bateu em uma parede!\nInfelizmente essa não é uma solução para o desafio das condicionais... Tente novamente!");
                outputArea.value += '\n<< Game over >>';
                userWantsToStopExecution = true;
                //this.resetConditionalsChallenge();
                setTimeout(finishExecution(), 0);
            }
        }
    }

    wasFirstMapOfConditionalsChallengePassed() {
        return this.canvasHandler.simulation.map.virtualJabuti.tileX == this.conditionalChallenge1DestinationX
            && this.canvasHandler.simulation.map.virtualJabuti.tileY == this.conditionalChallenge1DestinationY;
    }

    wasSecondMapOfConditionalsChallengePassed() {
        return this.canvasHandler.simulation.map.virtualJabuti.tileX == this.conditionalChallenge2DestinationX
            && this.canvasHandler.simulation.map.virtualJabuti.tileY == this.conditionalChallenge2DestinationY;
    }

    initializeLevelChallenge(level) {
        this.levelGoingOn = true;
        this.levelDifficulty = level;
        this.determineLevelChallenge();
        this.resetLevelChallenge();
    }

    finishLevelChallenge() {
        this.levelGoingOn = false;
    }

    determineLevelChallenge() {

        var map = this.canvasHandler.simulation.map;

        if(this.levelDifficulty == 0) {
            this.setMapToProperLevel1(map);
        }
        else if(this.levelDifficulty == 1) {
            this.setMapToProperLevel2(map);
        }
        else if(this.levelDifficulty == 2) {
            this.setMapToProperLevel3(map);
        }
        else if(this.levelDifficulty == 3) {
            this.setMapToProperLevel4(map);
        }
        else if(this.levelDifficulty == 4) {
            this.setMapToProperLevel5(map);
        }
        else /*if(this.levelDifficulty == 5)*/ {
            this.setMapToProperLevel6(map);
        }
    }

    setMapToProperLevel1(map) {
        // criteria for level 1: nothing out of normal, just a destination that isn't in the same
        // tile as the jabuti is, and isn't at a wall

        map.setSize(6, 6);

        map.putWallsOnSurrounding();

        map.virtualJabuti.randomizePositionAndOrientation();
        while(map.jabutiIsInWall() || map.jabutiFacesWall()) {
            map.virtualJabuti.randomizePositionAndOrientation();
        }
        
        var destinationPosition = map.getRandomPosition();
        var rX = destinationPosition[0];
        var rY = destinationPosition[1];

        while(!map.positionIsInEmptyCell(rX, rY) || map.jabutiIsInTile(rX, rY)) {
            destinationPosition = map.getRandomPosition();
            rX = destinationPosition[0];
            rY = destinationPosition[1];
        }

        map.setTileToDestination(rX, rY);

        this.levelOriginX = map.virtualJabuti.tileX;
        this.levelOriginY = map.virtualJabuti.tileY;
    }

    setMapToProperLevel2(map) {
        // criteria for level 2: same as above, but distance of at least 4 between the jabuti and
        // the destination

        map.setSize(8, 8);

        map.putWallsOnSurrounding();

        var destinationPosition = map.getRandomPosition();
        var rX = destinationPosition[0];
        var rY = destinationPosition[1];

        while(!map.positionIsInEmptyCell(rX, rY) || map.jabutiIsInTile(rX, rY) ||
        map.getDistanceFromJabutiToTile(rX, rY) < 4) {

            map.virtualJabuti.randomizePositionAndOrientation();
            while(map.jabutiIsInWall() || map.jabutiFacesWall()) {
                map.virtualJabuti.randomizePositionAndOrientation();
            }

            destinationPosition = map.getRandomPosition();
            rX = destinationPosition[0];
            rY = destinationPosition[1];
        }

        map.setTileToDestination(rX, rY);

        this.levelOriginX = map.virtualJabuti.tileX;
        this.levelOriginY = map.virtualJabuti.tileY;
    }

    setMapToProperLevel3(map) {
        map.setSize(11, 11);

        // criteria for level 3: some walls

        map.putWallsOnSurrounding();

        var i = getRandomIntBetween(3, 4);
        for(var j = 1 ; j < 7 ; j++) {
            map.setTileToWall(i, j);
        }
        i += getRandomIntBetween(3, 3);
        for(var j = 4 ; j < 10 ; j++) {
            map.setTileToWall(i, j);
        }

        var destinationPosition = map.getRandomPosition();
        var rX = destinationPosition[0];
        var rY = destinationPosition[1];

        do {

            map.virtualJabuti.randomizePositionAndOrientation();
            while(map.jabutiIsInWall() || map.jabutiFacesWall()) {
                map.virtualJabuti.randomizePositionAndOrientation();
            }

            destinationPosition = map.getRandomPosition();
            rX = destinationPosition[0];
            rY = destinationPosition[1];
        }
        while(!map.positionIsInEmptyCell(rX, rY) || map.jabutiIsInTile(rX, rY) ||
        map.getDistanceFromJabutiToTile(rX, rY) < 10)

        map.setTileToDestination(rX, rY);

        this.levelOriginX = map.virtualJabuti.tileX;
        this.levelOriginY = map.virtualJabuti.tileY;

    }

    setMapToProperLevel4(map) {
        // criteria for level 4: some more walls

        map.setSize(12, 12);

        map.putWallsOnSurrounding();

        var i = getRandomIntBetween(3, 4);
        for(var j = 1 ; j < 9 ; j++) {
            map.setTileToWall(i, j);
        }
        i += getRandomIntBetween(3, 4);
        for(var j = 3 ; j < 11 ; j++) {
            map.setTileToWall(i, j);
        }

        var destinationPosition = map.getRandomPosition();
        var rX = destinationPosition[0];
        var rY = destinationPosition[1];

        do {

            map.virtualJabuti.randomizePositionAndOrientation();
            while(map.jabutiIsInWall() || map.jabutiFacesWall()) {
                map.virtualJabuti.randomizePositionAndOrientation();
            }

            destinationPosition = map.getRandomPosition();
            rX = destinationPosition[0];
            rY = destinationPosition[1];
        }
        while(!map.positionIsInEmptyCell(rX, rY) || map.jabutiIsInTile(rX, rY) ||
        map.getDistanceFromJabutiToTile(rX, rY) < 10);

        map.setTileToDestination(rX, rY);

        this.levelOriginX = map.virtualJabuti.tileX;
        this.levelOriginY = map.virtualJabuti.tileY;
    }

    setMapToProperLevel5(map) {
    // criteria for level 5: even more walls

    map.setSize(14, 14);

    map.putWallsOnSurrounding();

    var i = getRandomIntBetween(3, 4);
    for(var j = 1 ; j < 12 ; j++) {
        map.setTileToWall(i, j);
    }
    i += getRandomIntBetween(3, 3);
    for(var j = 2 ; j < 13 ; j++) {
        map.setTileToWall(i, j);
    }
    i += getRandomIntBetween(3, 3);
    for(var j = 1 ; j < 12 ; j++) {
        map.setTileToWall(i, j);
    }

    var destinationPosition = map.getRandomPosition();
    var rX = destinationPosition[0];
    var rY = destinationPosition[1];

    do {

        map.virtualJabuti.randomizePositionAndOrientation();
        while(map.jabutiIsInWall() || map.jabutiFacesWall()) {
            map.virtualJabuti.randomizePositionAndOrientation();
        }

        destinationPosition = map.getRandomPosition();
        rX = destinationPosition[0];
        rY = destinationPosition[1];
    }
    while(!map.positionIsInEmptyCell(rX, rY) || map.jabutiIsInTile(rX, rY) ||
    map.getDistanceFromJabutiToTile(rX, rY) < 15)

    map.setTileToDestination(rX, rY);

    this.levelOriginX = map.virtualJabuti.tileX;
    this.levelOriginY = map.virtualJabuti.tileY;

    }

    setMapToProperLevel6(map) {
        // criteria for level 6: randomized walls, quite big, with shortcut
        map.setSize(20, 20);

        do {
            map.virtualJabuti.randomizeOrientation();
        }
        while(map.virtualJabuti.orientation != 'right' && map.virtualJabuti.orientation != 'down');

        map.virtualJabuti.setPosition(1, 1);

        map.setTileToDestination(18, 18);

        for(var i = 4 ; i < 17; i++) {
            for(var j = 3 ; j < 17 ; j++) {
                if(getRandomIntBetween(1, 100) <= 30) {
                    map.setTileToWall(i, j);
                }
            }
        }

        for(var i = 4 ; i < 17; i++) {
            for(var j = 0 ; j < 3 ; j++) {
                if(getRandomIntBetween(1, 100) <= 30) {
                    map.setTileToWall(i, j);
                }
            }
        }

        for(var i = 4 ; i < 17; i++) {
            for(var j = 17 ; j < 20 ; j++) {
                if(getRandomIntBetween(1, 100) <= 30) {
                    map.setTileToWall(i, j);
                }
            }
        }

        for(var i = 0 ; i < 4; i++) {
            for(var j = 4 ; j < 20 ; j++) {
                if(getRandomIntBetween(1, 100) <= 30) {
                    map.setTileToWall(i, j);
                }
            }
        }

        for(var i = 17 ; i < 20; i++) {
            for(var j = 0 ; j < 17 ; j++) {
                if(getRandomIntBetween(1, 100) <= 30) {
                    map.setTileToWall(i, j);
                }
            }
        }

        map.setTileToNothing(0, 19);
        map.setTileToNothing(0, 18);
        map.setTileToNothing(1, 19);
        map.setTileToNothing(1, 18);

        map.setTileToNothing(19, 0);
        map.setTileToNothing(19, 1);
        map.setTileToNothing(18, 0);
        map.setTileToNothing(18, 1);

        this.levelOriginX = map.virtualJabuti.tileX;
        this.levelOriginY = map.virtualJabuti.tileY;

    }

    resetLevelChallenge() {
        this.canvasHandler.simulation.map.virtualJabuti.setPosition(this.levelOriginX, this.levelOriginY);
        this.canvasHandler.simulation.map.virtualJabuti.setOrientation(this.levelInitialOrientation);
    }

    wasLevelPassed() {
        return this.canvasHandler.simulation.map.jabutiIsInDestination();
    }

    endAllGamifications() {
        this.loopChallengeGoingOn = false;
        this.conditionalsChallengeGoingOn = false;
        this.levelGoingOn = false;
    }

}