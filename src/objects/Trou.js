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
        this.body.setCircle(2000, -450, 1700);
        this.setDisplaySize(4000, 2000);
        //this.setBodySize(this.body.width - 400, this.body.height - 400);
        this.factor = 1;

        this.inMov = false;
        this.once(MyEvents.ANTA, function(){
            this.inMov = true;
        });


        //Particules
        this.circleEmit = new Phaser.Geom.Rectangle(3000, 9000, 1500, 10);

        this.gravityParticle = scene.add.particles('pxlprpl');
        this.emitter = this.gravityParticle.createEmitter({
            lifespan: 1500,
            quantity: 20,
            gravityY : -200,
            speedY: 400,
            frequency:1,
            alpha: 0.8,
            scale: {start : 0, medium : 0.6, end : 1.1},
            tint : 0xE78FF0 ,
            emitZone: {type: 'random', source: this.circleEmit},
        });

        let ici = this;
        Tableau.current.starsFxContainer2.add(this.gravityParticle);

        this.anta = this.scene.sound.add('anta');
    }

    moveAnta(delta){
        this.x = Tableau.current.player.x;
        let temp = this.y - Tableau.current.player.y;


        // if (this.y - 270 > Tableau.current.player.y) {
        //     this.y = Tableau.current.player.y + 270;
        // }

        if (this.inMov)
        {
            this.y = this.y - this.factor;
        }

        this.circleEmit.x = this.x - 800;
        this.circleEmit.y = this.y - 300;
        this.shake()

        if (temp < 400)
        {
            this.factor = delta/18;
        }
        else
        {
            this.factor = delta/6;
        }


        if(!this.anta.isPlaying) {
            this.anta.play();
            this.anta.loop = true;
            this.anta.volume = 0;
        }

        if (typeof this.anta != "undefined" && temp < 500) {
            this.anta.volume = Math.max(0,((temp - 500) / (-500)) * 0.4);
            //console.log(Math.max(0,((temp - 300) / (-300)) * 0.5));
        }


        /*
        if (typeof this.anta != "undefined" && this.temp < 100) {
            // this.anta.volume = Math.max(0,((this.temp - 500) / (-500)) * 0.4);
            this.anta.volume = 0.4;
            console.log("0.4");
        }
        else if (typeof this.anta != "undefined" && this.temp < 200) {
            this.anta.volume = 0.3;
            console.log("0.3");
        }
        else if (typeof this.anta != "undefined" && this.temp < 300) {
            this.anta.volume = 0.2;
            console.log("0.2");
        }
        else if (typeof this.anta != "undefined" && this.temp < 400) {
            this.anta.volume = 0.1;
            console.log("0.1");
        }
        else if (typeof this.anta != "undefined" && this.temp < 500) {
            this.anta.volume = 0.03;
            console.log("0.03");
        }
         */
    }

    shake() {
        if (Tableau.current.player.y - this.y > -200){

            let temp = Math.abs(Tableau.current.cameras.main.y - this.y)/900000;

            Tableau.current.cameras.main.shake(500, temp);
        }

    }


}

