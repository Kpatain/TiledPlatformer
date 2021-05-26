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

        this.bool = true;

    }


    turnOn(light){
        console.log("turnon");
        let lamp = Tableau.current.lightList[light];
        if(this.bool){
            lamp.setIntensity(0.2);
            lamp.setIntensity(lamp.intensity + Phaser.Math.FloatBetween(-0.07, 0.1));
            lamp.intensity = Phaser.Math.Clamp(lamp.intensity, 0.2, 0.1);
        }

        setTimeout(function () {
            console.log("allume");
            lamp.setIntensity(2);
            this.bool = false;
        }, 1000);
    }
}