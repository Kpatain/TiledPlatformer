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
        let ici = scene;
        this.angleSat = angle;

        this.body.setCircle(28);

        //on réduit un peu la zone de hit
        this.setOffset(0, 0);
        this.setAngle(angle);

    }

    testMort(ici)
    {
        Tableau.current.physics.add.overlap(
            Tableau.current.player,
            this,
            Tableau.current.hitSat(ici.player, this, this.angleSat),
            null,
            ici
        );
    }



}