const COOKIE_SIZE = 10;
const FOOD_SIZE = 5;
const SCATTER_TIMEOUT_DECREMENT = 2;
 
  
class Map {

    constructor() {
        this.width = 600;
        this.height = 600;
        this.tileSize = 24;
        this.BLANK = 0;
        this.WALL = 1;
        this.BLOCK = 2;
        this.FOOD = 3;
        this.COOKIE = 4;
        this.DOOR = 5;
        this.BULLET=6;
        this.margin = 0;
        this.TILES = this.getTiles();
        this.leftTeleportTile = {row: 11, col: 0};
        this.rightTeleportTile = {row: 11, col: 24};
        this.hasFoodElements = true;
    }

    getTiles() {
        return [
            [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 14],
            [7, 3, 3, 3, 3, 6, 3, 3, 3, 3, 3, 3, 7, 3, 3, 3, 3, 3, 3, 6, 3, 3, 3, 3, 7],
            [7, 3,13 , 10, 14, 3, 13, 10, 10, 10, 14, 3, 7, 3, 13, 10, 10, 10, 14, 3, 13, 10, 14, 3, 7],
            [7, 4, 16, 10, 15, 3, 16, 10, 10, 10, 15, 3, 9, 3, 16, 10, 10, 10, 15, 3, 16, 10, 15, 4, 7],
            [7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
            [7, 3, 12, 10, 11, 3, 8, 3, 13, 10, 14, 3, 8, 3, 13, 10, 14, 3, 8, 3, 12, 10, 11, 3, 7],
            [7, 3, 3, 3, 3, 3, 7, 3, 16, 10, 15, 3, 7, 3, 16, 10, 15, 3, 7, 3, 3, 3, 3, 3, 7],
            [16, 10, 10, 10, 14, 3, 7, 3, 3, 3, 3, 3, 7, 3, 3, 3, 3, 3, 7, 3, 13, 10, 10, 10, 15],
            [0, 0, 0, 0, 7, 3, 7, 0, 12, 10, 10, 10, 1, 10, 10, 10, 11, 0, 7, 3, 7, 0, 0, 0, 0],
            [0, 0, 0, 0, 7, 3, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 7, 0, 0, 0, 0],
            [10, 10, 10, 10, 15, 3, 9, 0, 13, 10, 10, 5, 5, 5, 10, 10, 14, 0, 9, 3, 16, 10, 10, 10, 10],
            [0, 0, 0, 0, 0, 3, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 3, 0, 0, 0, 0, 0],
            [10, 10, 10, 10, 14, 3, 8, 0, 7, 0, 0, 0, 0, 0, 0, 0, 7, 0, 8, 3, 13, 10, 10, 10, 10],
            [0, 0, 0, 0, 7, 3, 7, 0, 16, 10, 10, 10, 10, 10, 10, 10, 15, 0, 7, 3, 7, 0, 0, 0, 0],
            [0, 0, 0, 0, 7, 3, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 7, 0, 0, 0, 0],
            [13, 10, 10, 10, 15, 3, 9, 0, 12, 10, 10, 10, 2, 10, 10, 10, 11, 0, 9, 3, 16, 10, 10, 10, 14],
            [7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
            [7, 3, 12, 10, 14, 3, 13, 10, 10, 10, 14, 3, 7, 3, 13, 10, 10, 10, 14, 3, 13, 10, 11, 3, 7],
            [7, 4, 3, 3, 7, 3, 16, 10, 10, 10, 15, 3, 9, 3, 16, 10, 10, 10, 15, 3, 7, 3, 3, 4, 7],
            [16, 10, 14, 3, 7, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 7, 3, 13, 10, 15],
            [13, 10, 15, 3, 9, 3, 8, 3, 12, 10, 10, 10, 2, 10, 10, 10, 11, 3, 8, 3, 9, 3, 16, 10, 14],
            [7, 3, 3, 3, 3, 3, 7, 3, 3, 3, 3, 3, 7, 3, 3, 3, 3, 3, 7, 3, 3, 3, 3, 3, 7],
            [7, 3, 12, 10, 10, 10, 1, 10, 10, 10, 11, 3, 9, 3, 12, 10, 10, 10, 1, 10, 10, 10, 11, 3, 7],
            [7, 3, 3, 3, 3, 6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 3, 3, 3, 3, 7],
            [16, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15]
    ]
        
    }

    drawMap(ctx) {
        this.hasFoodElements = false;
         for (let col = 0; col < this.TILES.length; col++) {
            for (let row = 0; row < this.TILES[0].length; row++) {
                var tileType = this.TILES[row][col];
                if (tileType !==3 || tileType!= 4 ||tileType !==5||tileType !==6) {
                    this.drawObstacle(ctx, row, col,tileType);
                }
                if (tileType === this.FOOD) {
                    this.hasFoodElements = true;
                    this.drawFoodElement(ctx, row, col);
                }
                else if (tileType === this.COOKIE) {
                    this.hasFoodElements = true;
                    this.drawCookie(ctx, row, col);
                }else if(tileType === this.DOOR){
                    this.drawDoor(ctx,row,col);
                }
                else if(tileType==6){
                    this.drawBullet(ctx,row,col);
                }
            }
        }
        if (!this.hasFoodElements) {
            if(game.currentLevel === FINAL_GAME_LEVEL){
                debugger;
                game.setGameState(game.gameStates.GAME_WON);
                game.currentLevel = 1;
            }else{
                this.reset();
                game.pacman.resetForNextLevel();
                game.ghosts.forEach(function(ghost){
                        game.movingAgent.dx = 2;
                        game.movingAgent.dy = 2;
                        ghost.reset();
                    }
                )
                 game.movingAgent.dx += 0.5;
                game.movingAgent.dy += 0.5;
                if(game.scatterTimeout>0){
                    game.scatterTimeout -= SCATTER_TIMEOUT_DECREMENT;
                } 
                game.currentLevel++;
                console.log("game level"+game.currentLevel);
                console.log("game speed"+game.movingAgent.dx,game.movingAgent.dy);
            }
            
        }
    }

    drawObstacle(ctx, row, col,tileType) {
        var coordinates = this.getTileCoordinates(row,col);
         switch(tileType){
            case 1:
                ctx.drawImage(SPRITES.wall[8],coordinates.x,coordinates.y,this.tileSize,this.tileSize);
                break;
            case 2:
                ctx.drawImage(SPRITES.wall[5],coordinates.x,coordinates.y,this.tileSize,this.tileSize);
                break;
            case 7:
                ctx.drawImage(SPRITES.wall[0],coordinates.x,coordinates.y,this.tileSize,this.tileSize);
                break;
            case 8:
                ctx.drawImage(SPRITES.wall[3],coordinates.x,coordinates.y,this.tileSize,this.tileSize);
                break;
            case 9:
                ctx.drawImage(SPRITES.wall[13],coordinates.x,coordinates.y,this.tileSize,this.tileSize);
                break;
            case 10:
                ctx.drawImage(SPRITES.wall[10],coordinates.x,coordinates.y,this.tileSize,this.tileSize);
                break;
            case 11:
                ctx.drawImage(SPRITES.wall[4],coordinates.x,coordinates.y,this.tileSize,this.tileSize);
                break;
            case 12:
                ctx.drawImage(SPRITES.wall[9],coordinates.x,coordinates.y,this.tileSize,this.tileSize);
                break;
            case 13:
                ctx.drawImage(SPRITES.wall[2],coordinates.x,coordinates.y,this.tileSize,this.tileSize);
                break;
            case 14:
                ctx.drawImage(SPRITES.wall[1],coordinates.x,coordinates.y,this.tileSize,this.tileSize);
                break;
            case 15:
                ctx.drawImage(SPRITES.wall[11],coordinates.x,coordinates.y,this.tileSize,this.tileSize);
                break;
            case 16:
                ctx.drawImage(SPRITES.wall[12],coordinates.x,coordinates.y,this.tileSize,this.tileSize);
                break;
            default:{
        }
    }
}


             

    drawFoodElement(ctx, row, col){
        ctx.fillStyle = "orange";
        var coordinates = this.getTileCenter(row, col);
        ctx.fillRect(coordinates.x - 1, coordinates.y - 1, FOOD_SIZE, FOOD_SIZE);
    }

    drawBullet(ctx,row,col){
        var coordinates=this.getTileCenter(row,col);
       ctx.drawImage(SPRITES.mystery,coordinates.x-9,coordinates.y-9,18,18);
 
    }

    drawCookie(ctx, row, col) {
        ctx.fillStyle = "orange";
        var coordinates = this.getTileCoordinates(row, col);
        ctx.beginPath();
        const radius = 4;
        ctx.fillRect(coordinates.x+this.tileSize/2-10/2,coordinates.y+this.tileSize/2-10/2,COOKIE_SIZE,COOKIE_SIZE)
        ctx.fill();
        ctx.closePath();
    }

    drawDoor(ctx,row,col){
        var coordinates = this.getTileCoordinates(row,col);
        ctx.beginPath();
        ctx.drawImage(SPRITES.door,coordinates.x,coordinates.y+6,this.tileSize,10);
        ctx.closePath();
    }

    getTileCoordinates(row, col) {
        let x = this.margin + col * this.tileSize;
        let y = this.margin + row * this.tileSize;
        return {x, y};
    }

    getTileCenter(row, col) {
        let x = this.margin + col * this.tileSize + this.tileSize / 2;
        let y = this.margin + row * this.tileSize + this.tileSize / 2;
        return {x, y};
    }

    getTileRowColumn(x, y) {
        if(x < this.margin || x >= this.width + this.margin || y < this.margin || y >= this.height + this.margin) {
            return {row: -1, col: -1};
        }
        const row = Math.floor((y - this.margin) / this.tileSize);
        const col = Math.floor((x - this.margin) / this.tileSize);
        return {row, col};
    }

    canTileBeVisited(row, col) {
        if (this.isTileWithinBounds(row, col)) {
            const tile = this.TILES[row][col];
            if (tile === 0 || tile === 3 | tile === 4||tile===6){
                return true;
            }
        }
        return false;
    }

    isTileWithinBounds(row, col) {
        if(row >= 0 && row < this.TILES.length && col >= 0 && col < this.TILES.length){
            return true;
        }else{
            return false;
        }
    }

    reset() {
        this.TILES = this.getTiles();
        this.hasFoodElements = true;
    }

     

}
