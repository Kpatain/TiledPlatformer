class Player3 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "beam")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        console.log("C'est le player 3");

        this.setCollideWorldBounds(true);
        this.setBounce(0.3);

        this.setFriction(1,1);



        this.setBodySize(this.body.width-6,this.body.height-10);

        //this.setSize(32, 32);
        this.body.setCircle(15,15);
        this.setOffset(-this.body.radius/2 +8, -this.body.radius/2 + 8);

        /MOVE/
        this.forceX = 0;
        this.forceY = 0;
        this.oldforceX = 1;
        this.oldforceY = 1;
        this.randomCond = 0;
        this.randomCond2 = 0;
        this.oldX = 0;
        this.oldY = 1;

        //VARIABLE GET VEL
        this.oldCoor = [0,0];
        this.velo =[];
        this.boolean = 0;



        this._directionX=0;
        this._directionY=0;


        //PARTICLES
        scene.starsFxContainer = scene.add.container();
        scene.starsFxContainer.x = 0;
        scene.starsFxContainer.y = 0;

        this.particles = scene.add.particles('traj');


        this.emmiter = this.particles.createEmitter({
            frequency: 200,
            lifespan: 2000,
            quantity: 1,
            gravityX: 0,
            gravityY: 100,
            x: { min: -32, max: 32 },
            y: { min: -32, max: 32 },
            rotate: { min:0, max:360 },
            radial: true,
            scale: { start: 0.1, end: 0.1 },
            alpha: { start: 1, end: 0 },
            speedX : 5,
            speedY : 4,
            angle: 0,

        });

        this.emmiter.startFollow(this);
        scene.starsFxContainer.add(this.particles);
        this.scene.starsFxContainer.setDepth(19);


        console.log("Player3");
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

        this.forceX = ui.pad.circleDrag.x;
        this.forceY = ui.pad.circleDrag.y;

        //si le pad bouge et le joueur est par terre
        if(ui.pad.circleDrag.x + ui.pad.circleDrag.y !== 0 && this.body.deltaY() > 0 && this.body.onFloor() || this.canJump)
        {
            //console.log("le pad bouge")
            //this.particles.;
            if (Math.sqrt(Math.pow(ui.pad.circleDrag.x,2) + Math.pow(ui.pad.circleDrag.y,2)) > 10)
            {
                this.particles.visible = 1;
            }

            this.oldforceX = this.forceX;
            this.oldforceY = this.forceY;
            this.randomCond = 1;


            if (this.oldforceX > 0){
                //console.log("droite");
                this.anims.keyframe = "right";
            }
            else{
                //console.log("gauche");
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
                //console.log("je viens de lacher")
                this.randomCond = 0;
                this.setVelocityX(-this.oldforceX * 8.4);
                this.setVelocityY(-this.oldforceY * 15);
            }

        }


        this.emmiter.speedX.propertyValue = ui.pad.circleDrag.x*-3.5 ;
        this.emmiter.speedY.propertyValue = ui.pad.circleDrag.y*-4.5 ;


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

    //NOT WORKING
    lockPos(bodyA)
    {
        console.log("lock");
        this.x = bodyA.x;
        this.y = bodyA.y;

    }

    orient(body)
    {
        this.angleVel = Phaser.Math.Angle.Between(this.x, this.y, this.x + body.gravXY[0],this.y + body.gravXY[1]);
        this.setRotation(this.angleVel);
    }

    //NOT using
    getVel(){
        this.velo = [this.oldCoor[0] - this.x, this.oldCoor[1] - this.y];
        this.oldCoor = [this.x, this.y];
        return this.velo;
    }

}