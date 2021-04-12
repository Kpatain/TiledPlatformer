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
        this.setBodySize(this.body.width-400,this.body.height-400);
        this.setOffset(150, 250);


    }

}