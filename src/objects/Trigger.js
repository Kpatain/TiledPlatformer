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
        console.log("function");
        if (this.on !== true) {
            console.log("turnon");
            let lamp = Tableau.current.lightList[light];
            console.log("allume");
            lamp.point.setIntensity(4);
            this.on = true;
        }
    }
}