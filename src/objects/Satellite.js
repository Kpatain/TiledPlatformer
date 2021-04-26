class Satellite extends ObjetEnnemiSpike{
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

        this.setDisplaySize(38,10);
        this.setSize(20,20)
        this.setOffset(20, 0);
        this.setAngle(this.angleSat);
        this.setDepth(25);

        this.b = 0; //j'en ai marre

    }


}