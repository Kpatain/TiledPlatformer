class Boule extends ObjetEnnemiSpike{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {

        super(scene, x, y, "boule");
        this.body.allowGravity=false;

        this.setDisplaySize(64,256);

        //les Hit
        this.setBodySize(this.body.width-400,this.body.height-400);
        this.setOffset(150, 250);
        this.setSize(64, 256);
        this.setDepth(3);

        //coordonnees

        // X
        this.originalX=x;
        this.minX=x-200;
        this.maxX=x+500;

        // Y
        this.originalY=y;
        this.minY=y-200;
        this.maxY=y;

        // coord anim
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

    

        //anim
        
        scene.tweens.add({
                targets:this,
                duration:200,
                delay:Math.random()*4000,
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

    start(){
        this.scene.tweens.add({
            targets: this,
            x: {
                from: this.minX,
                to:this.maxX,
                duration: 7000,
                ease: 'Back.easeInOut',
                yoyo: -1,
                repeat:-1,
                flipX:true,
            }
        });
    }
}