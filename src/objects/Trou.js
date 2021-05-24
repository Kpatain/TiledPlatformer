class Trou extends ObjetEnnemiSpike {

    preload() {

    }

    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y, image) {

        super(scene, x, y, image);
        this.body.allowGravity = false;
        this.body.setCircle(2000, -450, 1700);
        this.setDisplaySize(4000, 2000);
        //this.setBodySize(this.body.width - 400, this.body.height - 400);

        this.inMov = false;
        this.once(MyEvents.ANTA, function(){
            this.inMov = true;
        });


        //Particules
        this.circleEmit = new Phaser.Geom.Rectangle(3000, 7000, 1500, 10);

        this.gravityParticle = scene.add.particles('pxlprpl');
        this.emitter = this.gravityParticle.createEmitter({
            lifespan: 1000,
            quantity: 20,
            gravityY : -200,
            speedY: 400,
            frequency:1,
            scale: {start : 0, medium : 0.8, end : 1.3},
            tint : 0xE78FFF,
            emitZone: {type: 'random', source: this.circleEmit},
            blendMode : Phaser.BlendModes.NORMAL,
        });

        let ici = this;
        Tableau.current.starsFxContainer2.add(this.gravityParticle).setDepth(999);
    }

    moveAnta(){
        this.x = Tableau.current.player.x;
        let temp = this.y + (Tableau.current.player.y - this.y);
        let factor = 1;

        // if (this.y - 270 > Tableau.current.player.y) {
        //     this.y = Tableau.current.player.y + 270;
        // }

        if (this.inMov)
        {
            this.y = this.y - factor;
        }

        this.circleEmit.x = this.x - 800;
        this.circleEmit.y = this.y - 250;
        this.shake()
        factor = factor * 1.001;
        //this.setOffset(Tableau.current.cameras.main.x, Tableau.current.cameras.main.y+200);
    }

    shake() {
        if (Tableau.current.player.y - this.y > -200){

            let temp = Math.abs(Tableau.current.cameras.main.y - this.y)/1000000;

            Tableau.current.cameras.main.shake(500, temp);
        }

    }


}

