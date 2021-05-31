class Cristaux extends ObjetEnnemiSpike{
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

        this.setDisplaySize(55, 15);
        this.setSize(20, 20)
        this.setOffset(20, 0);

        this.point = this.lights.addLight(this.x, this.y, 120, (255, 255, 255), 0);
        this.point.color.r = 0.2;
        this.point.color.g = 0.3;
        this.point.color.b = 0.25;
    }
}