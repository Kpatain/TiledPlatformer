class Trou extends ObjetEnnemiSpike {

    preload() {

    }

    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y, image) {

        super(scene, x, y, image);
        this.body.allowGravity = false;
        this.body.setCircle(2700, -1160, 1940);
        this.setDisplaySize(2000, 1000);
        //this.setBodySize(this.body.width - 400, this.body.height - 400);

        this.inMov = false;
        this.once(MyEvents.ANTA, function(){
            this.inMov = true;
        });
    }

    moveAnta(){
        this.x = Tableau.current.player.x;
        let temp = this.y + (Tableau.current.player.y - this.y);
        let factor = 1;

        // if (this.y - 270 > Tableau.current.player.y) {
        //     this.y = Tableau.current.player.y + 270;
        // }

        if (this.inMov)
        {
            this.y = this.y - factor;
        }

        factor = factor * 1.001;


        //this.setOffset(Tableau.current.cameras.main.x, Tableau.current.cameras.main.y+200);
    }


}

