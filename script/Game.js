const CHASE_TIMEOUT = 20;
const SCATTER_TIMEOUT = 7;
const FINAL_GAME_LEVEL = 2;

class Game{
    constructor(canvas,CANVAS_WIDTH,CANVAS_HEIGHT){      //initialization of the constructor
        this.canvas = canvas;
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.ctx = this.canvas.getContext('2d');
        this.drawer = new Drawer(this.ctx);
        this.map = new Map();
        this.movingAgent = new MovingAgent();
        this.gameStates = {
            NEW_GAME: 1,
            STARTING: 2,
            RUNNING: 3,
            LEVEL: 4,
            GAME_WON: 5,
            GAME_LOST: 6,
            PLAYER_ENEMY: 7,
            INSTRUCTION:  8,
            MODE:9
        }

        this.gameLevels = {         //game levels
          EASY: 1,
          MEDIUM: 2,
          HARD: 3
        }

         this.agentSprite = {              //sprite image positions for respective entities
            BLINKY : 0,
            CLYDE: 1,
            PINKY: 2,
            INKY: 3,
            PAC_MAN: 5,
            GHOST_DEATH: 6
        }

        this.pacman = new Pacman(this.map,this.agentSprite.PAC_MAN);                //initialization of game actors
        this.blinky = new Ghost(this.map,'blinky',this.agentSprite.BLINKY);
        this.pinky = new Ghost(this.map,'pinky',this.agentSprite.PINKY);
        this.inky = new Ghost(this.map,'inky',this.agentSprite.INKY);
        this.clyde = new Ghost(this.map,'clyde',this.agentSprite.CLYDE);
        this.ghosts = [this.blinky,this.pinky,this.inky,this.clyde];

        this.score = 0;                                                               //score
        this.highestScore = localStorage.getItem('Highest Score');
        this.gameLevel = 1;
        this.collider = new Collider();
        this.audioPlayer = new AudioPlayer();
        this.controls = new Controls();
        this.gameState = this.gameStates.NEW_GAME;
        this.gameLevel = undefined;
        this.currentLevel = 1;
        this.lastFrameTimestamp = 0;
        this.fps = 60;
        this.startingGameTimer = 0;
        this.tick=0;
        this.chaseScatterTimer = 0;
        this.deathAnimationTimer = 0;
        this.animation;
        this.scatterTimeout = 7;

         this.chaseScatterTimeout = this.scatterTimeout;        //time for chasing and scattering period
        this.isPlayerEnemyMode = false;
    }

    getGameState() {
        return this.gameState;
    }

    setGameState(state) {
        this.gameState = state;
    }

    setGameLevel(level){
      this.gameLevel = level;
    }

    getGameLevel(){
      return this.gameLevel;
    }

    setTick(value) {
        this.tick = value;
    }

    incrementScore(n) {
        this.score += n;
    }

    startNewGame() {
         this.score = 0;
        this.chaseScatterTimer = 0;
        this.map.reset();
        this.pacman.reset();
        for (let ghost of this.ghosts) {        //resets each ghosts(initial position) in the game
            ghost.reset();
        }
    }
    initialScreen(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,canvas.width,canvas.height);
        this.ctx.fill();
        this.ctx.closePath();
        this.map.drawMap(this.ctx);
        this.drawer.drawPacman(this.pacman);
        this.ghosts.forEach(function(ghost,index){
            this.drawer.drawGhost(ghost,this.pacman.chasingMode);       //initial screen
        }.bind(this));
        this.ctx.fill();
        this.ctx.closePath();
    }

    draw() {
        this.animation = requestAnimationFrame(this.draw.bind(this));
         if(game.score> game.highestScore){
            game.highestScore = game.score;
            window.localStorage.setItem("Highest Score",game.highestScore);     //for highscore
        }
  
         switch(this.gameState){                                                //activities occur according to the game mode
            case this.gameStates.NEW_GAME:
                this.drawer.showNewGameScreen();
                break;
            case this.gameStates.STARTING:                                  //displays initial screen
                this.initialScreen();
                this.audioPlayer.startGameSound.play();
                if(this.startingGameTimer >= this.fps*4){
                    this.drawer.drawCountDown("GO");
                    this.setGameState(this.gameStates.RUNNING);
                    this.startingGameTimer = 0;
                }else if(this.startingGameTimer >= this.fps*3){         //displays the timer before game starts
                    this.drawer.drawCountDown(1);
                }else if(this.startingGameTimer >= this.fps*2){
                    this.drawer.drawCountDown(2);
                }else if(this.startingGameTimer >= this.fps*1){
                    this.drawer.drawCountDown(3);
                }
                this.startingGameTimer++;
                break;

            case this.gameStates.RUNNING:

                 if(this.getGameLevel() === this.gameLevels.MEDIUM){                //scatter time according to game level
                  this.scatterTimeout = 5;
                } 
                 if(this.getGameLevel() === this.gameLevels.HARD){
                  this.scatterTimeout = 2;
                }

                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                    this.map.drawMap(this.ctx);
                    this.drawer.drawScore(this.score);
                    this.drawer.drawBulletInfo(this.pacman.info);

                    if (this.pacman.chasingMode) {
                         if (!game.audioPlayer.isPlaying(this.audioPlayer.chasingSound)) {
                            this.audioPlayer.chasingSound.play();
                        }
                         if (this.tick === this.fps * 5) {            //chasing condition
                            this.pacman.chasingMode = false;
                            this.tick = 0;
                            this.audioPlayer.chasingSound.pause();
                        }else {
                            this.tick++;
                        }
                    }
                       if (this.controls.rightPressed && !this.pacman.currentDir.RIGHT) {
                          this.pacman.nextDir = this.pacman.initialDir();
                          this.pacman.nextDir.RIGHT = true;
                      }
                      else if (this.controls.leftPressed && !this.pacman.currentDir.LEFT) {       //movement of pacman
                          this.pacman.nextDir = this.blinky.initialDir();
                          this.pacman.nextDir.LEFT = true;
                      }
                      else if (this.controls.upPressed && !this.pacman.currentDir.UP) {
                          this.pacman.nextDir = this.pacman.initialDir();
                          this.pacman.nextDir.UP = true;
                      }
                      else if (this.controls.downPressed && !this.pacman.currentDir.DOWN) {
                          this.pacman.nextDir = this.pacman.initialDir();
                          this.pacman.nextDir.DOWN = true;
                      }

                       if(this.isPlayerEnemyMode){
                        if (this.controls.dPressed && !this.blinky.currentDir.RIGHT) {
                          this.blinky.nextDir = this.pacman.initialDir();
                          this.blinky.nextDir.RIGHT = true;
                        }
                      else if (this.controls.aPressed && !this.blinky.currentDir.LEFT) {     //movement of BLINKY(ghost) in case of 2 player
                          this.blinky.nextDir = this.blinky.initialDir();
                          this.blinky.nextDir.LEFT = true;
                        }
                      else if (this.controls.wPressed && !this.blinky.currentDir.UP) {
                          this.blinky.nextDir = this.blinky.initialDir();
                          this.blinky.nextDir.UP = true;
                        }
                      else if (this.controls.sPressed && !this.blinky.currentDir.DOWN) {
                          this.blinky.nextDir = this.blinky.initialDir();
                          this.blinky.nextDir.DOWN = true;
                        }
                      }

                    this.pacman.move();
                    for(var ghost of this.ghosts) {                     
                        ghost.move();
                    }
                    var ghostCollision = false;
                    var collidedGhost;
                    this.drawer.drawPacman(this.pacman);
                    for (let ghost of this.ghosts) {
                        if (ghost.alive) {
                            this.drawer.drawGhost(ghost, this.pacman.chasingMode);
                            if (this.collider.pacmanGhostCollision(this.pacman, ghost)) {
                                ghostCollision = true;                                              //checks for collision
                                collidedGhost = ghost;
                            }
                        }
                        else{
                            this.drawer.drawGhost(ghost, this.pacman.chasingMode);
                        }
                    }

                     if(ghostCollision){                                                   //if collision occurs then increases timer
                      this.deathAnimationTimer++;
                    }

                    this.drawer.drawLives(this.pacman.lives);

                    if (ghostCollision && !this.pacman.chasingMode) {                   //animates pacman death if its not in chasing mode
                        this.audioPlayer.stopAllSounds();
                        this.audioPlayer.dieSound.play()
                        this.animatePacmanDeath(this.pacman);
                        this.pacman.die();
                        for(let ghost of this.ghosts) {
                            ghost.reset();
                        }
                        if (this.pacman.lives <= 0) {
                          this.setGameState(this.gameStates.GAME_LOST);
                        }
                    }
                    else if (ghostCollision && this.pacman.chasingMode) {               //kills ghost if pacman is in chasing mode
                        this.audioPlayer.eatGhostSound.play();
                        this.pacman.eatGhost(collidedGhost);
                    } 

                    if(this.chaseScatterTimer > this.fps*this.chaseScatterTimeout){         
                        this.ghosts.forEach(function(ghost){
                            ghost.isChasingTimeOn = !ghost.isChasingTimeOn;
                        })
                        if(this.chaseScatterTimeout == CHASE_TIMEOUT){
                            this.chaseScatterTimeout = SCATTER_TIMEOUT;
                        }else{
                            this.chaseScatterTimeout = CHASE_TIMEOUT;
                        }
                        this.chaseScatterTimer = 0;
                    }
                    this.chaseScatterTimer++;
                break;

            case this.gameStates.LEVEL:
                this.drawer.levelScreen();          
                break;

            case this.gameStates.MODE:
                this.drawer.modeScreen();
                break;

            case this.gameStates.GAME_WON:
                console.log("Game Won");
                this.drawer.showGameWonScreen();
                break;

            case this.gameStates.GAME_LOST:         
                this.audioPlayer.stopAllSounds();
                this.drawer.showLostGameScreen();
                break;
            case this.gameStates.PLAYER_ENEMY:       //multiplayer mode
                this.isPlayerEnemyMode = true;
                this.setGameState(this.gameStates.RUNNING);
                break;
            case this.gameStates.INSTRUCTION:
                this.drawer.instructionScreen();
                break;
        } 
    }
     animatePacmanDeath(pacman){                //animates pacman death incase of ghost collision
      cancelAnimationFrame(this.animation)
      var pacmanXPos = pacman.x;
      var pacmanYPos = pacman.y;
      var counter = 0;
      var timer = setInterval(
        function(){
          game.drawer.drawPacmanDeath(counter,pacmanXPos,pacmanYPos);
          counter++;
        },500);

      setTimeout(function(){
        clearInterval(timer);
        game.animation = requestAnimationFrame(game.draw.bind(game));
      },3000);
    }

    //initial gamme screen updating agent
     init() {
        this.initialScreen();
      setInterval(function(){
            this.pacman.updateAgentMouth();
            for(let ghost of this.ghosts){
                ghost.updateAgentMouth();
            }
        }.bind(this),100);
         this.draw();
    }

}

