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
        this.circleEmit = new Phaser.Geom.Ellipse(3000, 7000, 1500, 400);

        this.gravityParticle = scene.add.particles('pxlprpl');
        this.emitter = this.gravityParticle.createEmitter({
            lifespan: 1000,
            quantity: 100,
            frequency:5,
            gravityX: 0,
            gravityY: 10,
            tint: { min: 0x450040, medium : 0x9A4B94, max: 0xFFFFFF },
            rotate: { min:0,  max:360 },
            scale: {start : 0, end : 2},
            alpha: { start: 0, end: 1 },
            emitZone: {type: 'edge', source: this.circleEmit},
            speedX: 250,
            angle : {min:270-20, max:270+20},
            blendMode : Phaser.BlendModes.ADD,
        });

        Tableau.current.starsFxContainer.add(this.gravityParticle).setDepth(1000);
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

        this.circleEmit.x = this.x - 80;
        this.circleEmit.y = this.y+ 190;

        this.emitter.setEmitZone({ type: 'edge', source: this.circleEmit, quantity: 50});

        factor = factor * 1.001;
        //this.setOffset(Tableau.current.cameras.main.x, Tableau.current.cameras.main.y+200);
    }


}

