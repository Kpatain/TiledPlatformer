class Trigger extends ObjetPhysique {

    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     * @param image
     * @param light
     */
    constructor(scene, x, y, image, light) {
        super(scene, x, y, image);
        scene.physics.add.overlap(
            scene.player,
            this,
            scene.turnOn,
            null,
            scene
        );

        this.body.allowGravity = false;
        this.setDisplaySize(100, 100);
        this.visible = false;
        this.on = false;

    }

}