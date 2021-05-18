class Trou extends ObjetEnnemiSpike {

    preload() {
        this.load.image('trou', 'assets/trou.png');
    }


    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {

        super(scene, x, y, "trou");
        this.body.allowGravity = false;
        this.setDisplaySize(896, 400);
        this.setBodySize(this.body.width - 400, this.body.height - 400);
        //this.setOffset(150, 250);
        //this.setSize(40, 100);                                                 //Hitbox
        this.setDepth(30);                                                 //Profondeur

    }
}

