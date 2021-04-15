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
        this.setDepth(11);
        console.log(this.valuePos);
        this.body.setCircle(20,20);
        this.setOffset(-this.body.radius/2 + 10, -this.body.radius/2 + 10);

        this.gravXY = [0,0];
        this.xlerp = 0;

        //range circle
        let circle = Tableau.current.add.circle(this.x, this.y, 200).setDepth(15);
        circle.setStrokeStyle(2, 0x1a65ac);

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

    checkAttract()
    {

        //RANGE 200
        if (Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this) < 200)
        {
            //RANGE 20 (for locking) /////  NOT WORKING
            if(Phaser.Math.Distance.BetweenPoints(this, Tableau.current.player) < 20 && 0)
            {
                Tableau.current.player.lockPos(this);
            }

            else
            {
                Tableau.current.player.setGravity(0, -2000);
                this.xlerp = Math.pow(Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this), 2)

                this.gravXY[0] = (this.x - Tableau.current.player.x) / Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this);
                this.gravXY[1] = (this.y - Tableau.current.player.y) / Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this);

                //LERPING //////  y = y1 + ((x – x1) / (x2 – x1)) * (y2 – y1)
                console.log
                (
                    "disatance = ", Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this),
                    "modif = ", (this.xlerp / 40000) * 200
                );

                //ADDING VELOCITY
                Tableau.current.player.setAccelerationX(this.gravXY[0] * 1300);
                Tableau.current.player.setAccelerationY(this.gravXY[1] * 1300);
            }

        }



    }

}