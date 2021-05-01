class Caillou extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y, image) {

        super(scene, x, y, image);
        //pas de gravité
        this.body.allowGravity=false;

        //gestion de la taille
        this.setDisplaySize(64,64);

        this.setDepth(25);

        //on réduit un peu la zone de hit
        this.setBodySize(this.body.width-5,this.body.height-5);
        this.setOffset(3, 3);

    }


}