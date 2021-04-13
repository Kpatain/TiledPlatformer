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
        //console.log(Math.sqrt(Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this)));

        let speed = 2*Math.abs(Math.sqrt(Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this)) - 50);
        console.log(speed);

        if (Math.sqrt(Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this)) < 40)
        {
            Tableau.current.physics.accelerateToObject(Tableau.current.player, this, 100, 300, 300);
        }

    }

}