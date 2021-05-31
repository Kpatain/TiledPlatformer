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

        this.light = light;
        this.body.allowGravity = false;
        this.setDisplaySize(100, 100);
        this.visible = false;
        this.on = false;

    }

    turnOn(light){
        if (this.on !== true) {
            let lamp = Tableau.current.lightList[light];
            lamp.point.setIntensity(2);
            lamp.setAlpha(1);
            this.on = true;
        }
    }
}