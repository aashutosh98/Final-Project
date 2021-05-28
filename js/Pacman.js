const PACMAN_XTILE = 19;
const PACMAN_YTILE = 12;
class Pacman extends MovingAgent {

    constructor(map,agentSpriteIndex) {
        super(map,agentSpriteIndex);
        var startCoords = this.map.getTileCenter(PACMAN_XTILE,PACMAN_YTILE);
        this.x = startCoords.x;
        this.y = startCoords.y;
        this.lives = 3;
        this.info="";
        this.color = "yellow";
        this.chasingMode = false;
        this.ispacmanAlive = true;
    }

    move() {
        super.move();
        this.eatFood();
        this.eatCookie();
        this.eatBullet();
    }   
    

    eatFood() {
        var currentTile = this.map.getTileRowColumn(this.x, this.y);
        if (this.map.isTileWithinBounds(currentTile.row, currentTile.col) &&
            this.map.TILES[currentTile.row][currentTile.col] === this.map.FOOD) {
                game.audioPlayer.eatingSound.play();
            game.incrementScore(10);
            this.map.TILES[currentTile.row][currentTile.col] = this.map.BLANK;

        }
    }
    eatBullet(){
        var currentTile = this.map.getTileRowColumn(this.x, this.y);
        let x=Math.floor(Math.random()*4);
        if (this.map.isTileWithinBounds(currentTile.row, currentTile.col) &&
            this.map.TILES[currentTile.row][currentTile.col] === this.map.BULLET) {
                if(x==0){
                       // game.audioPlayer.eatGhost.play();
                        game.incrementScore(25);
                        this.info="All ghost Killed";
                         game.ghosts.forEach(function(ghost){
                        ghost.alive=false;});
                        game.score+=500;
                    }
                    else if(x==1){
                        game.ghosts.forEach(function(ghost){
                            this.info="Chasing Mode activated!";
                            ghost.alive=true;
                            ghost.isChasingTimeOn=true;
                        });
                        
                    }
                    else if(x==2){
                        this.lives++;
                        this.info="+1 life";
                        game.audioPlayer.eatCookieSound.play();

                    }
                    else{
                        this.lives--;
                        this.info="-life";
                        game.audioPlayer.dieSound.play();


                    }
                    this.map.TILES[currentTile.row][currentTile.col] = this.map.BLANK;
        }

    }

    eatCookie() {
        var currentTile = this.map.getTileRowColumn(this.x, this.y);
        if (this.map.isTileWithinBounds(currentTile.row, currentTile.col) &&
            this.map.TILES[currentTile.row][currentTile.col] === this.map.COOKIE) {
            game.audioPlayer.eatCookieSound.play();
            game.setTick(0);
            this.chasingMode = true;
            game.incrementScore(50);
            this.map.TILES[currentTile.row][currentTile.col] = this.map.BLANK;
        }
    }

    //pacman life decreseas by one;
    die() {
        this.lives -= 1;
        game.drawer.drawLives(this.lives);
        this.resetPosition();
        this.agentDirection = 0;
    }

    reset() {
        this.lives = 3;
        this.chasingMode = false;
        this.resetPosition();
    }

    resetForNextLevel(){
        this.chasingMode = false;
        this.resetPosition();
    }

    resetPosition() {
        const startCoords = this.map.getTileCenter(PACMAN_XTILE,PACMAN_YTILE);
        this.x = startCoords.x;
        this.y = startCoords.y;
        this.resetDirs();
    }

    eatGhost(ghost) {
        game.incrementScore(100);
        ghost.die();
    }

}