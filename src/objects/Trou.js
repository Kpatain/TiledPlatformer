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
        this.circleEmit = new Phaser.Geom.Rectangle(this.x, this.y, 1500, 200);

        this.gravityParticle = scene.add.particles('traj');
        this.emitter = this.gravityParticle.createEmitter({
            frequency: 0.1,
            quantity : 50,
            gravityY : 10,
            speedX : -100,
            scale: { start: 0.1, end: 0.5 },
            lifespan: 800,
            emitZone: { type: 'random', source: this.circleEmit},
            alpha: {min:0, max:0.5},
            angle: { min: 0, max: 360 },
            tint: 0xAE0AA1,
            blendMode: Phaser.BlendModes.SKIP_CHECK,

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

        this.circleEmit.x = this.x-500;
        this.circleEmit.y = this.y-50;

        factor = factor * 1.001;
        //this.setOffset(Tableau.current.cameras.main.x, Tableau.current.cameras.main.y+200);
    }


}

