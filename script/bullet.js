class Bullet{
    constructor(){
        this.released=false;
        this.speed =5;
    }

    fireBullet(pacman){
      
        this.direction=pacman.agentDirection;
        this.drawBullet(this.x,this.y);
        pacman.bullet--;
        
     }

     drawBullet(x,y){
        ctx.fillStyle = "orange";
        var coordinates = this.getTileCenter(row, col);
        ctx.arc(x,y,7,0,2*Math.PI);
        ctx.fill();
     }

     updateBullet(){
         window.addEventListener("keydown",e=>{
             if(e.code=="Space"){
                 this.released=true;
                 this.x=pacman.x;
                 this.y=pacman.y;
                 this.fireBullet(x,y);
              }
         });
          if(this.released){
             if(this.direction==0){
                 x+=this.speed;
             }
             else if(this.direction==32){
                 y+=this.speed;
             }
             else if(direction+=64){
                 x-=this.speed;
             }
             else if(this.direction==96){
                 y-=this.speed;
             }
              game.ghosts.forEach(function(ghost)
                 if(Math.pow(this.x-ghost.x,2)+Math.pow(this.y-ghost.y)<49+Math.pow(ghost.fullRadius,2)){
                    this.audioPlayer.eatGhostSound.play();
                    this.pacman.eatGhost(this.ghost);
                 }
            }  
        }     
    }
}

let bulletarr=[];

const animateBullet=function(){
    

    
}