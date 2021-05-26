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
        let lamp = Tableau.current.lightList[light][0];
        if(this.bool){
            lamp.setIntensity(lamp.intensity + Phaser.Math.FloatBetween(-0.08, 0.08));
            lamp.intensity = Phaser.Math.Clamp(lamp.intensity, 0.6, 0.9);
        }

        setTimeout(function () {
            console.log("allume");
            lamp.setIntensity(1);
            this.bool = false;
        }, 2000);
    }
}