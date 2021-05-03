class checkPoints extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, image, value)
    {
        super(scene, x, y, image);
        this.scene=scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.valuePos = value;
        this.body.allowGravity=false;
        this.body.setCircle(20,20);
        this.setOffset(-this.body.radius/2 + 10, -this.body.radius/2 + 10);
        this.isChange = 0;

        this.gravXY = [0,0];
        this.xlerp = 0;
        this.angleVel = 0;
        this.oldDist =0;

        this.pointLight = scene.add.pointlight(this.x, this.y, (0, 0, 0), 40, 0.1, 0.2).setDepth(20);
        this.pointLight.color.r = 102;
        this.pointLight.color.g = 53;
        this.pointLight.color.b = 0;

        // this.gravityParticle = scene.add.particles('traj')
        // this.emitter0 = this.gravityParticle.createEmitter({
        //     x: this.x,
        //     y: this.y,
        //     speed: { min: -800, max: 800 },
        //     angle: { min: 0, max: 360 },
        //     scale: { start: 0.1, end: 0.1 },
        //     //blendMode: 'SCREEN',
        //     //active: false,
        //     lifespan: 800,
        //     gravityY: 800
        // });
        //
        // scene.starsFxContainer.add(this.gravityParticle).setDepth(19);


        //range circle
        //let circle = Tableau.current.add.circle(this.x, this.y, 200).setDepth(15);
        //circle.setStrokeStyle(2, 0x1a65ac);


    }

    savePos()
    {
        //console.log(this.valuePos);
        if(localStorage.getItem('cP') > 0) {
            if (localStorage.getItem('cP') < this.valuePos) {
                localStorage.setItem('cP', this.valuePos);
            }
        }else{
            localStorage.setItem('cP', this.valuePos);

        }
    }

    loadPos()
    {
        if (localStorage.getItem('cP') == this.valuePos)
        {
            return{
                x : this.x,
                y : this.y
            }
        }

        return false;
    }

    changeSprite()
    {
        if(!this.isChange) {
            //this.emitter0.explode();
            console.log("change cP", localStorage.getItem('cP'));
            this.isChange = 1;
            this.disableBody(true, true);
            this.scene.add.sprite(this.x, this.y, 'plan_verte').setDepth(21);
            this.pointLight.color.r = 20;
            this.pointLight.color.g = 20;
            this.pointLight.color.b = 70;
            this.pointLight.radius = 50;
            this.pointLight.intensity = 0.1;
            this.pointLight.attenuation = 0.3;
        }
    }


    //MA CHERE ET TENDRE FONCTION D4ATTRACTION
    checkAttract()
    {

        //RANGE 20 (for locking)
        if(Phaser.Math.Distance.BetweenPoints(this, Tableau.current.player) < 40)
        {
            //console.log("LOCK POS in", this.valuePos);
            Tableau.current.player.lockPos(this);
            this.loadPos();
            this.changeSprite();
        }

        //RANGE 200
        else if (Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this) < 200)
        {
            Tableau.current.player.preCanJump = 0;
            Tableau.current.player.canJump = 0;
            //console.log("setVelocity of ", this.valuePos);
            Tableau.current.player.setGravity(0, -2000);
            this.xlerp = Math.pow(Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this), 2)

            this.gravXY[0] = (this.x - Tableau.current.player.x) / this.xlerp * 1000;
            this.gravXY[1] = (this.y - Tableau.current.player.y) / this.xlerp * 1000;


            //ADDING VELOCITY
            Tableau.current.player.setAccelerationX(this.gravXY[0] * 400);
            Tableau.current.player.setAccelerationY(this.gravXY[1] * 400);



        }

        //SI ON SORT
        else if (Phaser.Math.Distance.BetweenPoints(this, Tableau.current.player) > 205 && this.oldDist <= 205)
        {
            //console.log("Left ", this.valuePos);
            Tableau.current.player.setAcceleration(0,0);
            Tableau.current.player.setGravity(0, 0);
        }

        this.oldDist = Phaser.Math.Distance.BetweenPoints(this, Tableau.current.player);

        //Tableau.current.player.orient(this);

    }




}