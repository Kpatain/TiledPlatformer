class Ui extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'ui', active: true });
        window.ui=this;
    }
    preload(){
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
        this.load.image('zoomout', 'assets/zoomout.png');
        this.load.image('joystick', 'assets/joystick.png');
    }
    create (){

        this._textfin = this.add.text(this.sys.canvas.width/2.5, this.sys.canvas.height/5, ' ', {
            font:'24px "Odibee Sans"',
            align: 'center',
            fill: '#E3FFF2',
        }).setAlpha(0);

        this._textfin.setInteractive();
        this._textfin.on('pointerdown', function () {
            window.open("https://github.com/RedDarkS/Platformer-organisation/blob/main/team.md",'_blank');
        })

        //met l'ui au dessus du tableau
        this.scene.bringToTop();
        //lance le tableau
        this.scene.launch(this.game.scene.scenes[0].scene.key);


        let me=this;
        setTimeout(function(){
            me.tableau="Hello World";
            //me.gagne(0)
        },100)



        this.pad=new GamePad(this,0,0, 120);
        this.pad.x=this.sys.canvas.width-this.pad.size-64;
        this.pad.y=this.sys.canvas.height/2;



        let btFs=this.add.image(0,0,'ui/full-screen-icon');
        btFs.setInteractive();
        btFs.on('pointerup', function () {

            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }

        }, this);
        btFs.setOrigin(1,1)
        btFs.setDisplaySize(48,48)
        btFs.x=this.sys.canvas.width;
        btFs.y=this.sys.canvas.height - this.sys.canvas.height*0.88;

    }

    /**
    gagne(points=10)
    {
        this.score+=points;
        this._scoreText.setText('Score: ' + this.score);
    }
     */

    update(){
        this._textfin.setText(
            " Merci d'avoir joué à HEY BEAM! \n" +
            " Vous venez de finir le premier niveau.\n" +
            " Envie de continuer ? \n" +
            " Cliquez ici !  \n" +
            "\n" +
            "\n" +
            " Merci à l'équipe pédagogique\n" +
            "et aux professeurs de l'ETPA.\n" +
            " Merci à mes camarades et amis\n" +
            "pour les nombreux conseils et tests.\n" +
            " - Juin 2021 - ");
    }
}
