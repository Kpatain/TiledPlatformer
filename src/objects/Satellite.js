class Satellite extends ObjetEnnemiSpike{
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

        this.setDisplaySize(55,15);
        this.setSize(20,20)
        this.setOffset(20, 0);
        this.setAngle(this.angleSat);

        this.b = 0; //j'en ai marre

        // Y
        this.originalY=y;
        this.minY=y-40;
        this.maxY=y+40;

        // on applique les propriété du début de l'animation
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        this.rotate = Math.random()*4-2;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add({
            targets:this,
            duration:1000,
            delay:Math.random()*2000,
            alpha:{
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            },
            onComplete: function () {
                me.start();
            }
        });

    }

    start(){
        this.scene.tweens.add({
            targets: this,

            y: {

                from: this.minY,
                to:this.maxY,
                duration: 2000,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1
            }
        });

    }


}