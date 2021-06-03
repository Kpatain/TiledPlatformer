class Cristaux extends ObjetEnnemiSpike{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     * @param image
     * @param angle
     * @param value
     */
    constructor(scene, x, y, image, angle) {

        super(scene, x, y, image);
        //pas de gravité
        this.body.allowGravity = false;
        let ici = scene;
        this.angleSat = angle;

        this.setDisplaySize(100, 100);
        this.setSize(20, 20)
        this.setOffset(20, 0);
        this.setAngle(Math.random()*360);

        this.point = scene.lights.addLight(this.x, this.y, 300, (255, 255, 255), 0);
        this.point.color.r = 0.35;
        this.point.color.g = 0.65;
        this.point.color.b = 0.55;

    }
}