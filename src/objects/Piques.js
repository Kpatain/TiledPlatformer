class Piques extends ObjetEnnemiSpike{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {

        super(scene, x, y, "piques");
        this.body.allowGravity=false;


        this.setDisplaySize(40,100);
        this.setBodySize(this.body.width-400,this.body.height-400);
        this.setOffset(150, 250);
        this.setSize(40, 100);                                                 //Hitbox
        this.setDepth(3);                                                 //Profondeur                                                        



        // X
        this.originalX=x;
        this.minX=x-200;
        this.maxX=x+300;

        // Y
        this.originalY=y;
        this.minY=y-100;
        this.maxY=y;


        this.x=this.minX;                   // coord d'anim
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        //Animation
        scene.tweens.add({
                targets:this,
                duration:200,
                delay:Math.random()*3000,
                alpha:{
                    startDelay:Math.random()*5000,
                    from:0,
                    to:1,
                },
                onComplete: function () {
                    me.start();
                }
            })

    }

    start()
    {
        this.scene.tweens.add({
            targets: this,
            y: {
                from: this.minY,
                to:this.maxY,
                duration: 2000,
                ease: 'Linear',
                yoyo: -1,
                repeat:-1
            }
        });
    }

}