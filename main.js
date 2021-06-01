
let width=14*64; //896;
let height=7*64; //448;

window.MyEvents = {
    POP : "pop",
    ANTA : "anta",
    FIN : "fin",
    CRI : "cri"
}


let config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2000},
            debug: 0,

        }
    },

    scene: [
        new Ui(),
        new TableauTiled({
            key: ' ',
        })
    ],
    width: width,
    height: height,
    roundPixels : true,
    scale: {
        mode: Phaser.Scale.FIT,
        orientation:Phaser.Scale.LANDSCAPE,
        width: width,
        height: height,
        min: {
            width: 0,
            height: 0
        },
        max: {
            width: width*2.5,
            height: height*2.5
        },
        autoCenter:Phaser.Scale.Center.CENTER_BOTH

    },
    autoRound: false,
};

let myGame;

function resize() {
    /*
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowWidth<width || windowHeight<height){
        if(windowRatio < gameRatio){
            canvas.style.width = windowWidth + "px";
            canvas.style.height = (windowWidth / gameRatio) + "px";
        }
        else {
            canvas.style.width = (windowHeight * gameRatio) + "px";
            canvas.style.height = windowHeight + "px";
        }
    }else{
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
    }

     */

}


window.onload = function() {
    myGame=new Phaser.Game(config);
    window.addEventListener("resize", resize, false);
    window.addEventListener("scroll", resize, false);
}
