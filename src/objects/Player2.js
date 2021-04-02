class Player2 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true);
        this.setBounce(0.3);
        this.setGravityY(700)
        this.setFriction(1,1);



        this.setBodySize(this.body.width-6,this.body.height-10);

        //this.setSize(32, 32);
        this.body.setCircle(15,15);
        this.setOffset(-this.body.radius/2 + 10, -this.body.radius/2 + 10);

        this.forceX = 0;
        this.forceY = 0;
        this.oldforceX = 1;
        this.oldforceY = 1;
        this.randomCond = 0;
        this.randomCond2 = 0;
        this.oldX = 0;
        this.oldY = 1;

        this.anglePrtc=0;
        this.forcePrtc =0;



        this._directionX=0;
        this._directionY=0;

        this.anims.create({
            key: 'right',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'left',
            frames: [ { key: 'player', frame: 7 } ],
            frameRate: 20
        });

        //PARTICLES
        scene.starsFxContainer = scene.add.container();
        scene.starsFxContainer.x = 0;
        scene.starsFxContainer.y = 0;

        this.particles = scene.add.particles('traj');

        this.emmiter = this.particles.createEmitter({
            frequency: 200,
            //delay: 200,
            lifespan: 2000,
            quantity: 1,
            gravityX: 0,
            gravityY: 100,
            x: { min: -32, max: 32 },
            y: { min: -32, max: 32 },
            //tint: [  0xB85901, 0x753901, 0xF57802, 0x361A01, 0xDB6B02 ],
            rotate: { min:0, max:360 },
            radial: true,
            scale: { start: 0.1, end: 0.1 },
            alpha: { start: 1, end: 0 },
            //blendMode: Phaser.BlendModes.,
            speedX : 5,
            speedY : 4,
            angle: 0,
        });

        this.emmiter.startFollow(this);
        scene.starsFxContainer.add(this.particles);
        this.scene.starsFxContainer.setDepth(19);


        console.log("Player2");
    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }



    /**
     * NOUVELLE METHODE SLINGSHOT
     */
    move()
    {
        /**
        this.oldPos();

        if (this.oldY - this.y == 0){

            this.x = this.oldX;
        }
         */

        this.forceX = ui.pad.circleDrag.x;
        this.forceY = ui.pad.circleDrag.y;

        //si le pad bouge et le joueur est par terre
        if(ui.pad.circleDrag.x + ui.pad.circleDrag.y !== 0 && this.body.deltaY() > 0 && this.body.onFloor())
        {
            console.log("le pad bouge")
            //this.particles.;
            if (Math.sqrt(Math.pow(ui.pad.circleDrag.x,2) + Math.pow(ui.pad.circleDrag.y,2)) > 10)
            {
                this.particles.visible = 1;
            }

            this.oldforceX = this.forceX;
            this.oldforceY = this.forceY;
            this.randomCond = 1;


            if (this.oldforceX > 0){
                console.log("droite");
                this.anims.keyframe = "right";
            }
            else{
                console.log("gauche");
                this.anims.keyframe = "left";
            }

        }
        else
        {
            this.particles.visible = 0;

            if(Math.abs(this.forceX - this.oldforceX) == Math.abs(this.oldforceX)
                && Math.abs(this.forceY - this.oldforceY) == Math.abs(this.oldforceY)
                && this.randomCond == 1 && this.body.deltaY() > 0 && this.body.onFloor())
            {
                console.log("je viens de lacher")
                this.randomCond = 0;
                this.setVelocityX(-this.oldforceX * 8.4);
                this.setVelocityY(-this.oldforceY * 15);
            }

        }

        /**
        if (this.forceY==0){
            console.log("rmet force X à 0")
            this.forceX = 0;
        }


        if(this.body.deltaY() > 0 && this.body.onFloor())
        {
            console.log(this.body.deltaY());
            this.setVelocityX(0);


        }
         */


        //this.emitter.setRotation(180 - 180/Math.PI * Phaser.Math.Angle.Between(ui.pad.circleDrag.x,ui.pad.circleDrag.y,1,1));
        //this.forcePrtc = 1.9 * Math.sqrt(Math.pow(ui.pad.circleDrag.x,2) + Math.pow(ui.pad.circleDrag.y,2));
        this.emmiter.speedX.propertyValue = ui.pad.circleDrag.x*-3.5 ;
        this.emmiter.speedY.propertyValue = ui.pad.circleDrag.y*-4.5 ;

        //Phaser.Physics.Arcade.collider(this.emitter);


    }


    /**
     * arrête le joueur
     */
    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }


    oldPos(){
        if(this.randomCond2%2 == 1) {
            this.oldX = this.x;
            this.oldY = this.y;
        }

        this.randomCond2 = Math.abs(this.randomCond2 - 5);

    }

}