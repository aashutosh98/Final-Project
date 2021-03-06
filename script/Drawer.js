const SPRITE_CLIPPING_WIDTH = 32;
const SPRITE_CLIPPING_HEIGHT = 32;

class Drawer {
    constructor(ctx) {
        this.ctx = ctx;
    }
    //draws pacman from sprite
    drawPacman(pacman) {
        this.ctx.beginPath();
        this.ctx.drawImage(SPRITES.pacManImages,pacman.agentMouth,pacman.agentDirection,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,pacman.x-pacman.fullRadius-2,pacman.y-pacman.fullRadius-2,2*pacman.radius,2*pacman.radius);
        this.ctx.closePath();
    }

    
    drawBulletInfo( pacman){                    //displays mystery box info at bottom
        this.ctx.font = "20px Calibri";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign="center";
        this.ctx.fillText( pacman, 300, 615);
        
   }

    drawPacmanDeath(mouth,pacmanX,pacmanY){        //draws death of pacman rom respective sprite
        this.ctx.beginPath();
        this.ctx.fillStyle = "BLACK";
        this.ctx.arc(pacmanX+1,pacmanY+1,13,0,2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.drawImage(SPRITES.pacmanDeath,mouth*32,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,pacmanX-12-4,pacmanY-12-2,30,30);
    }

    drawGhost(ghost, chasingMode) {             //displays ghosts
        this.ctx.beginPath();
        if(ghost.alive){
            if(chasingMode){                //displays vulnurable ghosts
                ghost.agentMouth = game.agentSprite.GHOST_DEATH*SPRITE_CLIPPING_WIDTH*2;
                ghost.agentDirection = ghost.agentDirection == 0 ? SPRITE_CLIPPING_HEIGHT : 0;
                this.ctx.drawImage(SPRITES.pacManImages,ghost.agentMouth,ghost.agentDirection,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,ghost.x-ghost.fullRadius-2,ghost.y-ghost.fullRadius-2,2*ghost.radius,2*ghost.radius);
            }else{
                //displays dead ghosts
                this.ctx.drawImage(SPRITES.pacManImages,ghost.agentMouth,ghost.agentDirection,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,ghost.x-ghost.fullRadius-2,ghost.y-ghost.fullRadius-2,2*ghost.radius,2*ghost.radius);
            }
        }else{
            this.ctx.drawImage(SPRITES.pacManImages,416,64,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,ghost.x-ghost.fullRadius-2,ghost.y-ghost.fullRadius-2,2*ghost.radius,2*ghost.radius);
        }
        this.ctx.closePath();
    }

    drawScore(score) {                          //displays scores
        this.ctx.font = "20px Calibri";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Score: " + score, 80, 615);
    }

    drawLives(lives) {
        let x=500;
        for(let i=0;i<lives;i++){
            this.ctx.drawImage(SPRITES.lives,x,600,20,20);
            x+=25;
        }
    }

    showNewGameScreen(){
        document.getElementById("play").innerHTML = " START! !"
        this.ctx.beginPath();
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.drawImage(SPRITES.pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(SPRITES.pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.closePath();
    }

    drawCountDown(number){
        this.ctx.beginPath();
        this.ctx.font = "30px Calibri";
        this.ctx.fillText(number,game.canvas.width/2,game.canvas.height/2);
        this.ctx.closePath();
    }

    modeScreen(){            
          this.ctx.beginPath();   
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fill();
        this.ctx.drawImage(SPRITES.pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(SPRITES.pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.fillStyle = "white";
         this.ctx.textAlign = "center";
        this.ctx.fillText("Choose Game Mode",game.canvas.width/2,game.canvas.height*2/3-60);
        this.ctx.font = "20px Calibri";
        this.ctx.fill();
        this.ctx.closePath();

    }

    levelScreen(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fill();
        this.ctx.drawImage(SPRITES.pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(SPRITES.pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.fillStyle = "white";
         this.ctx.textAlign = "center";
        this.ctx.fillText("Choose Difficulty",game.canvas.width/2,game.canvas.height*2/3-60);
        this.ctx.font = "20px Calibri";
        this.ctx.fill();
        this.ctx.closePath();
    }

    showGameWonScreen(){
        document.getElementById("play").innerHTML = "Play Again";
        document.getElementById("play").style.display=  "Block"
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fill();
        this.ctx.drawImage(SPRITES.pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(SPRITES.pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.fillStyle = "black";
         this.ctx.textAlign = "center";
        this.ctx.fillText("Winner Congratulations!!",game.canvas.width/2,game.canvas.height*2/3-60);
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Calibri";
        this.ctx.fillText("GameScore: "+game.score,game.canvas.width/2,game.canvas.height*2/3-20);
        this.ctx.fillText("Highest Score: "+window.localStorage.getItem("Highest Score"),game.canvas.width/2,game.canvas.height*2/3);
        this.ctx.fill();
        this.ctx.closePath();
    }

    showLostGameScreen(){
        document.getElementById("play").innerHTML = "Try Again!";
        document.getElementById("play").style.display=  "Block";
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fill();
        this.ctx.drawImage(SPRITES.pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(SPRITES.pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.fillStyle = "black";
        this.ctx.font = "30px Calibri"
        this.ctx.textAlign = "center";
        this.ctx.fillText("Try Again!!",game.canvas.width/2,game.canvas.height*2/3-60);
        this.ctx.fillStyle = "white";   
        this.ctx.font = "20px Calibri";
        this.ctx.fillText("Your Score: "+game.score,game.canvas.width/2,game.canvas.height*2/3-30);
        this.ctx.fillText("Highest Score: "+window.localStorage.getItem("Highest Score"),game.canvas.width/2,game.canvas.height*2/3);
        this.ctx.fill();
        this.ctx.closePath();
    }

    instructionScreen(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fill();
        this.ctx.drawImage(SPRITES.pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(SPRITES.pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.drawImage(SPRITES.instruction,0,0,400,201,100,canvas.height/2,400,201);
        this.ctx.font = "20px Calibri";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Enemy Player Control",170,325);
        this.ctx.fillText("Pacman Player Control",450,325);
        this.ctx.fill();
        this.ctx.closePath();
    }

}