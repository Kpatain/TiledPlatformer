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

        // X
        this.originalX=x;
        this.minX=x-50;
        this.maxX=x+50;

        // Y
        this.originalY=y;
        this.minY=y-50;
        this.maxY=y+50;

        // on applique les propriété du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add({
            targets:this,
            duration:200,
            delay:Math.random()*1000,
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
            startDelay:500,
            x: {

                from: this.minX,
                to:this.maxX,
                duration: 1000,
                ease: 'Circ.easeInOut',
                yoyo: -1,
                repeat:-1,
                flipX:true,
            },
            y: {

                from: this.minY,
                to:this.maxY,
                duration: 1000,
                ease: 'Circ.easeInOut',
                yoyo: -1,
                repeat:-1
            }
        });
    }


}