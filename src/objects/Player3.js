class Player3 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "beam")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        console.log("C'est le player 3");

        this.setCollideWorldBounds(true);
        this.setBounce(0.3);
        this.setGravity(0, -1000);

        this.setFriction(1,1);

        this.setBodySize(this.body.width+10,this.body.height+10);
        this.displayWidth = 32;
        this.displayHeight = 24;

        //this.setSize(32, 32);
        this.body.setCircle(26,26);
        this.setOffset(-this.body.radius/2, -this.body.radius/2-3);

        //MOVE
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
        console.log(this);
        this.canJump = 0;
        this.preCanJump = 0;

        //LIGHT
        this.light = scene.lights.addLight(0, 0, 500, 0, 1);
        this.light.color.r = 1;
        this.light.color.g = 1;
        this.light.color.b = 1;

        this.pointLight = scene.add.pointlight(this.x, this.y, (0, 0, 0), 60, 0.1, 0.1).setDepth(20);
        this.pointLight.color.r = 255;
        this.pointLight.color.g = 255;
        this.pointLight.color.b = 255;




        this._directionX=0;
        this._directionY=0;


        //PARTICLES
        scene.starsFxContainer = scene.add.container();
        scene.starsFxContainer.x = 0;
        scene.starsFxContainer.y = 0;

        scene.starsFxContainer2 = scene.add.container();
        scene.starsFxContainer2.x = 0;
        scene.starsFxContainer2.y = 0;


        this.particles = scene.add.particles('traj');

        this.emmiter = this.particles.createEmitter({
            frequency: 1,
            lifespan: 500,
            quantity: 1,
            gravityX: 0,
            gravityY: 500,
            x: { min: 0, max: 360 },
            y: { min: 0, max: 360 },
            radial: true,
            scale: { start: 0.5, end: 0.1 },
            alpha: { start: 1, end: 0 },
            speed: 100,
            angle: { min: 0, max: 360 },
        });





        scene.starsFxContainer.add(this.particles);
        this.scene.starsFxContainer.setDepth(19);

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
    move(delta)
    {
        this.forceX = ui.pad.circleDrag.x;
        this.forceY = ui.pad.circleDrag.y;

        //si le pad bouge et le joueur est par terre
        if
        (
            ( ui.pad.circleDrag.x + ui.pad.circleDrag.y !== 0 && this.body.deltaY() > 0
            && this.body.onFloor() )|| (this.canJump && ui.pad.circleDrag.x + ui.pad.circleDrag.y !== 0)
        )
        {
            //console.log("le pad bouge")

            this.oldforceX = this.forceX;
            this.oldforceY = this.forceY;
            this.randomCond = true;

        }
        else
        {

            if((Math.abs(this.forceX - this.oldforceX) === Math.abs(this.oldforceX)
                && Math.abs(this.forceY - this.oldforceY) === Math.abs(this.oldforceY)
                && this.randomCond && this.body.deltaY() > 0 && this.body.onFloor())
            ||(Math.abs(this.forceX - this.oldforceX) === Math.abs(this.oldforceX)
                    && Math.abs(this.forceY - this.oldforceY) === Math.abs(this.oldforceY)
                    && this.randomCond && this.canJump ))
            {
                this.randomCond = false;
                let factor = (30*delta - 40);
                console.log(factor);
                let speedX = -this.oldforceX*factor;
                let speedY = -this.oldforceY*factor;
                this.setVelocityX(speedX);
                this.setVelocityY(speedY);

                console.log("X:", speedX, "Y:", speedY, delta*5);

            }

        }

        if(Math.abs(this.body.velocity.x) < 1 && this.body.velocity.x !==0)
        {
            this.setVelocityX(0);
        }
        else if(Math.abs(this.body.velocity.x) < 2000 && this.body.velocity.x !==0 && this.body.velocity.y < 1)
        {
            this.setVelocityX(this.body.velocity.x*0.99);
        }
        //console.log(Math.abs(this.body.velocity.x));

        this.orient();
        let partbool = 1;
        if(this.x > 2800 && partbool) {
                partbool = 0;
                this.emmiter.startFollow(this);
        }

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

    lockPos(bodyA)
    {
        this.canJump = 1;

        if (this.canJump && !this.preCanJump)
        {
            //pop
            bodyA.emit(MyEvents.POP);
            this.emmiter.on = false;

            this.x = bodyA.x;
            this.y = bodyA.y;
            //this.visible = false;
            this.setAcceleration(0,0);
            this.setVelocity(0,0);
            this.setGravity(0,-2000);
        }
        this.preCanJump = this.canJump;

        let boolAmbiance = true;
        if (boolAmbiance){
            this.lights.setAmbientColor(0x28362b);

        }

    }

    orient()
    {
        this.angleVel = Phaser.Math.Angle.Between(0, 1, this.body.velocity.x,this.body.velocity.y);
        this.setRotation(this.angleVel);
    }

}