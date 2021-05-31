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
        let ici = this;
        scene.physics.add.overlap(
            scene.player,
            this,
            ici.turnOn(light),
            null,
            scene
        );

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
            lamp.setIntensity(2);
            this.on = true;
        }
    }
}