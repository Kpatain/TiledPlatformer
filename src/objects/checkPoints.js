class CheckPoints extends Phaser.Physics.Arcade.Sprite
{

    constructor(scene, x, y, image, value)
    {
        super(scene, x, y, image);
        this.scene=scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.valuePos = value;
        this.body.allowGravity=false;
        this.setDisplaySize(60,60);
        this.body.setCircle(20,20);
        this.setOffset(-this.body.radius/2 + 10, -this.body.radius/2 + 10);
        this.isChange = 0;

        this.gravXY = [0,0];
        this.xlerp = 0;
        this.angleVel = 0;
        this.oldDist =0;

        this.pointLight = scene.add.pointlight(this.x, this.y, (0, 0, 0), 60, 0.1, 0.5).setDepth(994);
        this.pointLight.color.r = 30;
        this.pointLight.color.g = 5;
        this.pointLight.color.b = 42;

        this.light = scene.lights.addLight(this.x, this.y, 500, 0, 0.4);
        this.light.color.r = 4;
        this.light.color.g = 2;
        this.light.color.b = 4;


        let shape1 = new Phaser.Geom.Circle(0, 0, 200);

        this.gravityParticle = scene.add.particles('traj')
        this.emitter0 = this.gravityParticle.createEmitter({
            frequency: 0.1,
            x: this.x,
            y: this.y,
            angle: { min: 0, max: 360 },
            scale: { start: 0.2, end: 0.2 },
            lifespan: 800,
            emitZone: { type: 'random', source: shape1},
            alpha: 0.2,
            moveToX: this.x,
            moveToY:this.y,

        });

        this.emitter0.setAlpha(function (p, k, t) {
            return 1 - 2 * Math.abs(t - 0.5) *2 - 0.5;
        });


        this.greenParticles = scene.add.particles('pxlgr')
        this.emitter1 = this.greenParticles.createEmitter({
            frequency: 2,
            quantity : 50,
            x: this.x,
            y: this.y,
            angle: {
                min: 0,
                max: 360
            },
            scale: { start: 0.8, end: 0 },
            lifespan: 1000,
            alpha: 0.2,
            speed: 200

        });

        this.emitter1.on = false;

        let me = this;
        this.once(MyEvents.POP, function(){
            me.emitter1.on = true;
            scene.starsFxContainer.add(me.greenParticles);
            me.emitter1.startFollow(me);
            setTimeout(function(){me.emitter1.on = false;}, 100);
        });

        //OPTI
        scene.starsFxContainer.add(this.gravityParticle);

        if (this.valuePos < localStorage.getItem('cP')){
            this.changeSprite();
        }
    }

    savePos()
    {
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
            this.isChange = 1;
            this.disableBody(true, true);
            this.scene.add.sprite(this.x, this.y, 'plan_verte').setDisplaySize(60,60).setDepth(997);
            this.pointLight.color.r = 20;
            this.pointLight.color.g = 20;
            this.pointLight.color.b = 70;

            this.light.color.r = 1;
            this.light.color.g = 5;
            this.light.color.b = 3;

        }
    }


    //MA CHERE ET TENDRE FONCTION D4ATTRACTION
    checkAttract(delta)
    {
        //RANGE 20 (for locking)
        if(Phaser.Math.Distance.BetweenPoints(this, Tableau.current.player) < 40)
        {
            //console.log("LOCK POS in", this.valuePos);
            Tableau.current.player.lockPos(this);
            this.savePos();
            Tableau.current.player.visible = 0;
            this.loadPos();
            this.changeSprite();
        }

        //RANGE 200
        else if (Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this) < 150)
        {
            Tableau.current.player.body.setAllowGravity(false);
            Tableau.current.player.preCanJump = 0;
            Tableau.current.player.canJump = 0;
            Tableau.current.player.setGravity(0, -1000);
            this.xlerp = Math.pow(Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this), 2.2)

            this.gravXY[0] = (this.x - Tableau.current.player.x) / this.xlerp * 1000;
            this.gravXY[1] = (this.y - Tableau.current.player.y) / this.xlerp * 1000;

            //let factor = (178*delta-424)/5;
            let factor = (-126*delta - 3125.2)/(-9.7);
            //console.log(factor);
            //ADDING VELOCITY
            Tableau.current.player.setAccelerationX(this.gravXY[0] * factor);
            Tableau.current.player.setAccelerationY(this.gravXY[1] * factor);

            Tableau.current.player.visible = 1;

        }

        //SI ON SORT
        else if (Phaser.Math.Distance.BetweenPoints(this, Tableau.current.player) > 205 && this.oldDist <= 205)
        {
            //console.log("Left ", this.valuePos);
            Tableau.current.player.setAcceleration(0,0);
            Tableau.current.player.setGravity(0, 0);
            Tableau.current.player.body.setAllowGravity(true);


        }
        this.oldDist = Phaser.Math.Distance.BetweenPoints(this, Tableau.current.player);

        //Tableau.current.player.orient(this);

    }




}