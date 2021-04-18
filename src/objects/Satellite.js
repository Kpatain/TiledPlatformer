class Satellite extends ObjetPhysique{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y, image, angle) {

        super(scene, x, y, image);
        //pas de gravité
        this.body.allowGravity = false;

        this.body.setCircle(28);

        //on réduit un peu la zone de hit
        this.setOffset(0, 0);

        let ici = this;

        this.setAngle(angle);

    }

    testMort(ici)
    {
        Phaser.scenes.scene.physics.add.overlap(
            Tableau.current.player,
            this,
            Tableau.hitSat(scene.player, this, angle),
            null,
            ici
        );
    }



}