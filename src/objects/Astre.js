class Astre extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y){
        super(scene, x, y, "trou");
        //pas de gravité
        this.body.allowGravity=false;

        //gestion de la taille
        this.setDisplaySize(64,64);

        //on réduit un peu la zone de hit
        this.body.setCircle(20,20);
        this.setBodySize(this.body.width-400,this.body.height-400);
        this.setOffset(150, 250);

        //range circle
        let circle = Tableau.current.add.circle(this.x, this.y, 100).setDepth(15);
        circle.setStrokeStyle(2, 0x1a65ac);

        this.setDepth(15);
    }


    checkAttract()
    {
        //On attribue une cible
        let closest;
        if (Tableau.current.physics.closest(this) == this)
        {
            closest = Tableau.current.physics.closest(this);
        }

        //speed evolutive vers le centre
        let speed = 2*Math.abs(Math.sqrt(Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this)) - 50);

        console.log(Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this));

        if (Phaser.Math.Distance.BetweenPoints(Tableau.current.player, this) < 50)
        {
            console.log("in", this.valuePos);
            Tableau.current.physics.moveToObject(Tableau.current.player, this, speed, 300);
            this.tint = 0x00ff00;
        }
    }

}