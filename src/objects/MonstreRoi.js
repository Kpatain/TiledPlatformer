class MonstreRoi extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {

        super(scene, x, y, "robot");
        this.body.allowGravity=false;

        this.setDisplaySize(128,128);

        //HIT
        this.setBodySize(this.body.width-400,this.body.height-400);
        this.setOffset(150, 250);
        this.setSize(100, 128);
        this.setDepth(3);                       //Profondeur


        // X
        this.originalX=x;
        this.minX=x-200;
        this.maxX=x+600;

        // Y
        this.originalY=y;
        this.minY=y-100;
        this.maxY=y;

        // coord anim
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

    

        //Animation
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
            })
        
    


    }


    start(){
        this.scene.tweens.add({
            targets: this,
            x: {
                from: this.minX,
                to:this.maxX,
                duration: 10*1000,
                ease: 'Quadratic.Out',
                yoyo: -1,
                repeat:-1,
                flipX:true,
            },
            y: {
                from: this.minY,
                to:this.maxY,
                duration: 5000,
                ease: 'Quadratic.Out',
                yoyo: -1,
                repeat:-1
            }
        });
    }


    

}