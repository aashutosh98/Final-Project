function assetsLoadingLoop(callback) {
    loadedPercent=((numAssets-assetsStillLoading)/numAssets)*100;
    console.log(loadedPercent)

    if(assetsStillLoading == 0){
        callback();
        window.cancelAnimationFrame(assetsLoader);
    }else{
        assetsLoader = window.requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    }
}


function loadAssets(callback) {
     function loadSprite(fileName) {
      assetsStillLoading++;
  
      let spriteImage = new Image();
      spriteImage.src = fileName;
  
      spriteImage.onload = function() {
        assetsStillLoading--;
      }

      spriteImage.onerror = function() {
          assetsStillLoading--;
      }
    return spriteImage;
    }

    function loadAudio(fileName){
        assetsStillLoading++;

        let audio = new Audio(fileName);
        audio.oncanplaythrough = function(){
            assetsStillLoading--;
        };
        return audio;
    }

    AUDIOS.startGame = loadAudio("./sound/startGame.mp3");
    AUDIOS.eatFood =loadAudio("./sound/eatFood.mp3");
    AUDIOS.die =loadAudio("./sound/die.mp3");
    AUDIOS.eatCookie =loadAudio("./sound/eatCookie.mp3");
    AUDIOS.chasing =loadAudio("./sound/chasing.mp3");
    AUDIOS.eatGhost =loadAudio("./sound/eatGhost.mp3");
    AUDIOS.ghostDead =loadAudio("./sound/ghostDead.mp3");
    console.log("asdasd");

    for(let i=0;i<14;i++)
    {
        SPRITES.wall[i]=loadSprite("./images/wall/" +i+ ".png");
    }
    SPRITES.door=loadSprite("./images/door.png");
    SPRITES.mystery=loadSprite("./images/gift.png")
    SPRITES.pacManImages = loadSprite('./images/pac.png');
    SPRITES.pacmanLogo = loadSprite('./images/pacman-logo.png');
    SPRITES.gameOverScreen = loadSprite('./images/gameOverFinal1.png');
    SPRITES.pacmanDeath = loadSprite('./images/pacDeath1.png');
    SPRITES.instruction  = loadSprite('./images/instruction.png');
    SPRITES.lives=loadSprite("./images/heart.png");
    numAssets = assetsStillLoading;

    assetsLoadingLoop(callback);
}


let assetsStillLoading = 0;
let assetsLoader;
let numAssets;
let loadedPercent;
const SPRITES = {};
const AUDIOS = {};
const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 600;

 
SPRITES.wall=[];
 


let canvas = document.getElementById('canvas');
var game =  new Game(canvas,CANVAS_WIDTH,CANVAS_HEIGHT);

loadAssets(game.init.bind(game));



