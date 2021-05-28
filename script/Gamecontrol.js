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
        }else if(e.keyCode === 38) {
            this.upPressed = true;
        }else if(e.keyCode === 39) {
            this.rightPressed = true;
        }else if(e.keyCode === 40) {
            this.downPressed = true;
        }

        if(e.keyCode === 65){
            this.aPressed = true;
        }else if(e.keyCode === 87){
            this.wPressed = true;
        }else if(e.keyCode === 68){
            this.dPressed = true;
        }else if(e.keyCode === 83){
            this.sPressed = true;
        }
    }

    keyUpHandler(e) {
        if(e.keyCode === 37) {
            this.leftPressed = false;
        }else if(e.keyCode === 38) {
            this.upPressed = false;
        }else if(e.keyCode === 39) {
            this.rightPressed = false;
        }else if(e.keyCode === 40) {
            this.downPressed = false;
        }

        if(e.keyCode === 65){
            this.aPressed = false;
        }else if(e.keyCode === 87){
            this.wPressed = false;
        }else if(e.keyCode === 68){
            this.dPressed = false;
        }else if(e.keyCode === 83){
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