
let width=14*64; //896;
let height=7*64; //448;

let config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100*3},
            debug: 0,

        },
        matter: {
            debug: 0,
            gravity: { y: 0 },
            plugins: {
                attractors: true
            }
        }
    },

    scene: [
        new Ui(),
        new TableauTiled({
            key: 'Tiled test',
            physics: {
                arcade: {
                    debug: 1,
                    gravity: { y: 3000 }
                },
                matter: {
                    debug: 0,
                    gravity: { y: 0 },
                    plugins: {
                        attractors: true
                    }
                }
            }
        })
    ],
    width: width,
    height: height,
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
            width: width*1.5,
            height: height*1.5
        },
        autoCenter:Phaser.Scale.Center.CENTER_BOTH

    },
    autoRound: false
};

let game;
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
    game=new Phaser.Game(config);
    window.addEventListener("resize", resize, false);
    window.addEventListener("scroll", resize, false);
}
