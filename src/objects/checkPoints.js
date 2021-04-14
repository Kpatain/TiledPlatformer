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

    }

    savePos()
    {
        console.log(this.valuePos);
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
        //speed evolutive vers le centre
        let speed = Math.abs(Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this) - 200);

        //console.log(Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this));

        if (Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this) < 200 && !Tableau.current.player.canJump)
        {
            Tableau.current.player.setGravity(0,-2000);

            this.gravXY[0] = (this.x - Tableau.current.player.x) / Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this);
            this.gravXY[1] = (this.y - Tableau.current.player.y) / Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this);

            console.log(this.gravXY[0],this.gravXY[1]);

            Tableau.current.player.setAccelerationX(this.gravXY[0] * 1300);
            Tableau.current.player.setAccelerationY(this.gravXY[1] * 1300);

        }


    }

}