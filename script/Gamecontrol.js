class Controls {

    constructor() {
        this.leftPressed = false;
        this.upPressed = false;
        this.rightPressed = false;
        this.downPressed = false;

        this.aPressed = false;
        this.wPressed = false;
        this.dPressed = false;
        this.sPressed = false;

        this.leftKey = 37;
        this.upKey = 38;
        this.rightKey = 39;
        this.downKey = 40;

        this.aKey = 65;
        this.wKey = 87;
        this.dKey = 68;
        this.sKey = 83; 

        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
        document.getElementById('enemyComputer').addEventListener("click",this.onclickEventHandler.bind(this));
        document.getElementById('play').addEventListener("click",this.onclickEventHandler.bind(this));
        document.getElementById('easy').addEventListener('click',this.easyMode.bind(this));
        document.getElementById('medium').addEventListener('click',this.mediumMode.bind(this));
        document.getElementById('hard').addEventListener('click',this.hardMode.bind(this));
        document.getElementById("enemyPlayer").addEventListener('click',this.playerEnemyMode.bind(this));

    }

    keyDownHandler(e) {
        if(e.keyCode === 37) {
            this.leftPressed = true;
        }else if(e.keyCode === this.upKey) {
            this.upPressed = true;
        }else if(e.keyCode === this.rightKey) {
            this.rightPressed = true;
        }else if(e.keyCode === this.downKey) {
            this.downPressed = true;
        }

        if(e.keyCode === this.aKey){
            this.aPressed = true;
        }else if(e.keyCode === this.wKey){
            this.wPressed = true;
        }else if(e.keyCode === this.dKey){
            this.dPressed = true;
        }else if(e.keyCode === this.sKey){
            this.sPressed = true;
        }
    }

    keyUpHandler(e) {
        if(e.keyCode === this.leftKey) {
            this.leftPressed = false;
        }else if(e.keyCode === this.upKey) {
            this.upPressed = false;
        }else if(e.keyCode === this.rightKey) {
            this.rightPressed = false;
        }else if(e.keyCode === this.downKey) {
            this.downPressed = false;
        }

        if(e.keyCode === this.aKey){
            this.aPressed = false;
        }else if(e.keyCode === this.wKey){
            this.wPressed = false;
        }else if(e.keyCode === this.dKey){
            this.dPressed = false;
        }else if(e.keyCode === this.sKey){
            this.sPressed = false;
        }
    }

    onclickEventHandler(e){
        if(game.getGameState() === game.gameStates.NEW_GAME){
            game.setGameState(game.gameStates.MODE);
            document.getElementById("play").style.display ="none";
            document.getElementById("easy").style.display ="none";
            document.getElementById("medium").style.display ="none";
            document.getElementById("hard").style.display ="none";
            document.getElementById("enemyComputer").style.display="block";
            document.getElementById("enemyPlayer").style.display = "block";

        }
        else if (game.getGameState() === game.gameStates.MODE){
            game.isPlayerEnemyMode = false;
            game.setGameState(game.gameStates.LEVEL);
             document.getElementById("play").style.display = "none";
            document.getElementById("easy").style.display ="block";
            document.getElementById("medium").style.display ="block";
            document.getElementById("hard").style.display ="block";
            document.getElementById("enemyComputer").style.display="none";
            document.getElementById("enemyPlayer").style.display = "none";
 

        }else if (game.getGameState() === game.gameStates.GAME_LOST){
            game.isPlayerEnemyMode = false;
            game.setGameState(game.gameStates.MODE);
            game.pacman.lives=3;
            document.getElementById("play").style.display = "none";
            document.getElementById("easy").style.display ="none";
            document.getElementById("medium").style.display ="none";
            document.getElementById("hard").style.display ="none";
            document.getElementById("enemyPlayer").style.display = "block";
            document.getElementById("enemyComputer").style.display="block";
            game.startNewGame();

 

        }
        else if(game.getGameState() === game.gameStates.GAME_WON){
            game.setGameState(game.gameStates.MODE);
            game.isPlayerEnemyMode = false;
 
            document.getElementById("play").style.display ="none";
            document.getElementById("easy").style.display ="none";
            document.getElementById("medium").style.display ="none";
            document.getElementById("hard").style.display ="none";
            document.getElementById("enemyPlayer").style.display = "block";
            document.getElementById("enemyComputer").style.display="block";
         }
}

    easyMode(){
        this.levelMode(game.gameLevels.EASY);
    }

    mediumMode(){
        this.levelMode(game.gameLevels.MEDIUM);
    }

    hardMode(){
        this.levelMode(game.gameLevels.HARD);
    }

    levelMode(gameLevel){
        if(game.getGameState() === game.gameStates.LEVEL){
            game.setGameState(game.gameStates.STARTING);
            game.setGameLevel(gameLevel);
            document.getElementById("easy").style.display ="none";
            document.getElementById("medium").style.display ="none";
            document.getElementById("hard").style.display ="none";
            document.getElementById("enemyPlayer").style.display = "none";
        }
    }

    playerEnemyMode(){
            if(game.getGameState() === game.gameStates.MODE){
                game.isPlayerEnemyMode = true;
                game.setGameState(game.gameStates.INSTRUCTION);
                document.getElementById('play').style.display = "none";
                document.getElementById('easy').style.display ="none";
                document.getElementById('medium').style.display ="none";
                document.getElementById('hard').style.display ="none";
                document.getElementById('enemyPlayer').style.display = "block";
                document.getElementById("enemyComputer").style.display="none";
                 document.getElementById('enemyPlayer').innerHTML = "Lets GO!!"
            }
            else if(game.getGameState() === game.gameStates.INSTRUCTION){
                 game.setGameState(game.gameStates.STARTING);
                document.getElementById('play').style.display = "none";
                document.getElementById('easy').style.display ="none";
                document.getElementById('medium').style.display ="none";
                document.getElementById('hard').style.display ="none";
                document.getElementById("enemyComputer").style.display="none";
                document.getElementById('enemyPlayer').style.display = "none";

            }


        

    }


}