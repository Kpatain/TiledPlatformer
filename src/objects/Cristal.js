class Cristal extends ObjetPhysique {

    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y, image) {
        super(scene, x, y, image);
        scene.physics.add.overlap(
            scene.player,
            this,
            scene.hitCristal,
            null,
            scene
        );

        this.body.allowGravity = false;
        this.setDisplaySize(220, 329);

        this.lightCristal = scene.lights.addLight(this.x, this.y-50, 500, 0, 0.5);
        this.lightCristal.color.r = 2;
        this.lightCristal.color.g = 6;
        this.lightCristal.color.b = 4;

        this.pointLight = scene.add.pointlight(this.x-20, this.y, (0, 0, 0), 200, 0.1, 0.1).setDepth(20);
        this.pointLight.color.r = 114;
        this.pointLight.color.g = 255;
        this.pointLight.color.b = 191;

        let particleCristal = scene.add.particles('pxlgr');
        this.emmiterCristal = particleCristal.createEmitter({
            x: this.x-20,
            y : this.y+20,
            lifespan: 1000,
            quantity: 1,
            frequency:0.1,
            gravityX: 0,
            gravityY: -1000,
            tint: { start: 0xFFFFFF, end: 0x8AFFF8 },
            rotate: { min:0,  max:360 },
            radial: true,
            scale: { start: 0.6, medium : 0.1, end: 0 },
            alpha: { start: 1, end: 0 },
            speed: 50,
            angle : {min:270-90, max:270+90},
            blendMode : Phaser.BlendModes.ADD,
        });

        scene.starsFxContainer.add(particleCristal);

    }
}