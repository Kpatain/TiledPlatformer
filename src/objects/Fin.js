class Fin extends ObjetPhysique {

    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y, image) {
        super(scene, x, y, image);
        let ici = this;
        scene.physics.add.overlap(
            scene.player,
            this,
            function(){ici.emit(MyEvents.FIN)},
            null,
            scene
        );

        this.once(MyEvents.FIN, function(){
            scene.hitFin;
            console.log("pouet");
        });

        this.body.allowGravity = false;
        this.setDisplaySize(2000, 500);

        this.lightCristal = scene.lights.addLight(this.x, this.y-50, 1000, 0, 0.5);
        this.lightCristal.color.r = 10;
        this.lightCristal.color.g = 10;
        this.lightCristal.color.b = 10;

        // let particleCristal = scene.add.particles('pxlwg');
        // this.emmiterCristal = particleCristal.createEmitter({
        //     x: this.x-20,
        //     y : this.y-20,
        //     lifespan: 1000,
        //     quantity: 2,
        //     frequency:0.1,
        //     gravityX: 0,
        //     gravityY: -2000,
        //     rotate: { min:0,  max:360 },
        //     radial: true,
        //     scale: {start : 0.5, end: 0.1},
        //     speed: 50,
        //     angle : {min:270-90, max:270+90},
        //     alpha : {start : 1, end: 0.1},
        //     blendMode : Phaser.BlendModes.ADD,
        // });
        //
        // scene.starsFxContainer.add(particleCristal);
    }
}