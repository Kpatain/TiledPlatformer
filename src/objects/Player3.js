class Player3 extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, "pxltc")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // console.log("C'est le player 3");
        this.visible = true;
        this.setAlpha(0);

        scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 9000,
            ease: 'Power2'
        }, scene);

        this.setCollideWorldBounds(true);
        this.setBounce(0.3);
        this.setGravity(0, -1000);

        this.setFriction(1,1);

        this.setBodySize(this.body.width+10,this.body.height+10);
        this.displayWidth = 26;
        this.displayHeight = 39;


        //this.setSize(32, 32);
        this.body.setCircle(25,25);
        this.setOffset(-this.body.radius/2, -this.body.radius/2-3);

        //MOVE
        this.randomCond2 = 0;

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

        this.pointLight = scene.add.pointlight(this.x, this.y, (0, 0, 0), 60, 0.1, 0.1);
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

        this.emiOn = true;
        this.emiOff = false;


        this.particles = scene.add.particles('traj');

        this.emmiter = this.particles.createEmitter({
            frequency: 50,
            lifespan: 1000,
            quantity: 1,
            gravityX: 0,
            gravityY: 0,
            x: { min: 0, max: 360 },
            y: { min: 0, max: 360 },
            radial: true,
            scale: { start: 0.7, end: 0.1 },
            alpha: { start: 0.8, end: 0 },
            speed: 0,
            angle: { min: 0, max: 360 },
        });

        scene.starsFxContainer.add(this.particles);
        scene.starsFxContainer.add(this.pointLight);

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


        if(Math.abs(this.body.velocity.x) < 1 && this.body.velocity.x !==0)
        {
            this.setVelocityX(0);
        }
        else if(Math.abs(this.body.velocity.x) < 2000 && this.body.velocity.x !==0 && this.body.velocity.y < 1)
        {
            this.setVelocityX(this.body.velocity.x*0.99);
        }

        this.orient();

        let velo = Math.abs(this.body.velocity.x) + Math.abs(this.body.velocity.y);

        if (velo > 500 && this.emiOn){
            Tableau.current.player.emmiter.on = true;
            this.emmiter.startFollow(this);
            this.emiOn = false;
            this.emiOff = true;
        }
        else if (velo <= 500 && this.emiOff) {
            Tableau.current.player.emmiter.on = false;
            this.emmiter.stopFollow(this);
            this.emiOff = false;
            this.emiOn = true;
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
            let note = Tableau.current.sons[Phaser.Math.Between(0, 25)];

            this.note = this.scene.sound.add(note);
            if(!this.note.isPlaying) {
                this.note.play();
                this.note.volume = 0.06;
                this.note.detune = 1000;
            }
        }
        this.preCanJump = this.canJump;


        if (this.boolAmbiance){
            Tableau.current.lights.setAmbientColor(0x777777);
            this.boolAmbiance = false;
        }

        if (this.boolAnta){
            Tableau.current.Blackhole.emit(MyEvents.ANTA);
            this.boolAnta = false;
            //Tableau.current.minimap.visible = true;
        }

        if(this.partbool) {
            this.partbool = 0;
            //this.emmiter.startFollow(this);
        }
    }

    orient()
    {
        this.angleVel = Phaser.Math.Angle.Between(0, 1, this.body.velocity.x,this.body.velocity.y);
        this.setRotation(this.angleVel+Math.PI/2);
    }

}