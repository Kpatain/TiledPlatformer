class Ui extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'ui', active: true });
        window.ui=this;
    }
    preload(){
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
    }
    create (){
        console.log("create Ui")

        // this.score=0;
        // /**
        //  * Le champ texte du score
        //  * @type {Phaser.GameObjects.Text}
        //  * @private
        //  */
        // this._scoreText = this.add.text(16, 16, '...', {
        //     font:'32px "Arial Black"',
        //     fill: '#7edfc1'
        // });
        //
        // /**
        //  * Le champ texte avec la clé du tableau
        //  * @type {Phaser.GameObjects.Text}
        //  * @private
        //  */
        // this._tableauText = this.add.text(this.sys.canvas.width-16, 16, '...', {
        //     font:'32px "Arial Black"',
        //     align: 'right',
        //     fill: '#7edfc1'
        // })
        //
        // /**
        //  * Le champ texte avec la classe du tableau
        //  * @type {Phaser.GameObjects.Text}
        //  * @private
        //  */
        // this._tableauTextClass = this.add.text(this.sys.canvas.width-16, 16+32, '...', {
        //     font:'24px "Arial Black"',
        //     align: 'right',
        //     fill: '#317a65',
        // }).setAlpha(0.5)
        //
        // this._tableauText.originX=1;
        // this._tableauTextClass.originX=1;
        //
        // this._tableauText.setInteractive();
        // this._tableauText.on('pointerdown', function () {
        //     Tableau.suivant();
        // })

        //met l'ui au dessus du tableau
        this.scene.bringToTop();
        //lance le tableau
        this.scene.launch(this.game.scene.scenes[0].scene.key);


        let me=this;
        setTimeout(function(){
            me.tableau="Hello World";
            me.gagne(0)
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
        btFs.x=0;
        btFs.y=this.sys.canvas.height;

    }

    gagne(points=10)
    {
        this.score+=points;
        //this._scoreText.setText('Score: ' + this.score);
    }

    update(){
        if(Tableau.current){
            //this._tableauText.setText(Tableau.current.scene.key);
            //this._tableauTextClass.setText(Tableau.current.constructor.name)
        }



    }
}
