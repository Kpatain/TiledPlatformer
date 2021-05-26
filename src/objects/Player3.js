class Player3 extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, "beam")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // console.log("C'est le player 3");
        this.visible = true;

        this.setCollideWorldBounds(true);
        this.setBounce(0.3);
        this.setGravity(0, -1000);

        this.setFriction(1,1);

        this.setBodySize(this.body.width+10,this.body.height+10);
        this.displayWidth = 32;
        this.displayHeight = 24;

        //this.setSize(32, 32);
        this.body.setCircle(20,20);
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
        this.canJump = 0;
        this.preCanJump = 0;

        //LIGHT
        this.light = scene.lights.addLight(0, 0, 300, 0, 1);
        this.light.color.r = 1.5;
        this.light.color.g = 1.5;
        this.light.color.b = 1.5;

        this.pointLight = scene.add.pointlight(this.x, this.y, (0, 0, 0), 60, 0.1, 0.1).setDepth(20);
        this.pointLight.color.r = 255;
        this.pointLight.color.g = 255;
        this.pointLight.color.b = 255;

        this.boolAmbiance = true;
        this.boolAnta = true;
        this.partbool = 1;

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

        this.orient();


        //console.log(this.body.velocity.x * this.body.velocity.y);
        if (this.body.velocity.x * this.body.velocity.y > 10){
            Tableau.current.player.emmiter.on = true;
            console.log("on");
        }
        else {
            Tableau.current.player.emmiter.on = false;
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

            this.x = bodyA.x;
            this.y = bodyA.y;
            //this.visible = false;
            this.setAcceleration(0,0);
            this.setVelocity(0,0);
            this.setGravity(0,-2000);
        }
        this.preCanJump = this.canJump;


        if (this.boolAmbiance){
            Tableau.current.lights.setAmbientColor(0x777777);
            this.boolAmbiance = false;
        }

        if (this.boolAnta){
            Tableau.current.Blackhole.emit(MyEvents.ANTA);
            this.boolAnta = false;
            Tableau.current.minimap.visible = true;
        }

        if(this.partbool) {
            this.partbool = 0;
            this.emmiter.startFollow(this);
        }
    }

    orient()
    {
        this.angleVel = Phaser.Math.Angle.Between(0, 1, this.body.velocity.x,this.body.velocity.y);
        this.setRotation(this.angleVel);
    }

}