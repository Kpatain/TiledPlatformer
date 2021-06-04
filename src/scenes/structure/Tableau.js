/**
 * Toutes les fonctions propres à un tableau dans notre jeu.
 * Cette classe n'est pas à utiliser directement, elle doit être extend !
 */
class Tableau extends Phaser.Scene{
    /**
     *
     * @param {String} key identifiant de la scène à jouer
     */
    constructor(key) {
        super(key);

    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('beam',
            'assets/beam.png',
            { frameWidth: 28, frameHeight: 21  }
        );
        this.load.audio('drip', 'assets/sounds/death.mp3');
    }
    create(){

        Tableau.current=this;
        this.sys.scene.scale.lockOrientation("landscape")
        // console.log("On est sur "+this.constructor.name+" / "+this.scene.key);
        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        this.sky=this.add.image(0, 0, 'sky').setOrigin(0,0);
        //this.sky.displayWidth=14*64;
        this.sky.setScrollFactor(0,0);

        /**
         *
         * @type {Player3}
         */
        this.player=new Player3(this,0,0);
        this.player.setMaxVelocity(700,700);


        this.blood=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"blood")
        this.blood.displayWidth=64;
        this.blood.displayHeight=64;
        this.blood.visible=false;

        this.oldDist = 0;
        this.canSnap= 1;

        this.boolReset1 = 1;
        this.boolReset2 = 1;
        this.boolReset3 = 1;
        this.boolReset4 = 1;

    }

    update(time, delta){
        super.update();
    }

    /**
     *
     * @param {Sprite} object Objet qui saigne
     * @param {function} onComplete Fonction à appeler quand l'anim est finie
     */
    saigne(object,onComplete){
        let me=this;
        me.blood.visible=true;
        me.blood.setDepth(12);
        me.blood.rotation = Phaser.Math.Between(0,6);
        me.blood.x=object.x;
        me.blood.y=object.y;
        me.tweens.add({
            targets:me.blood,
            duration:200,
            displayHeight:{
                from:40,
                to:70,
            },
            displayWidth:{
                from:40,
                to:70,
            },
            onComplete: function () {
                me.blood.visible=false;
                onComplete();
            }
        })
    }


    /**
     * 
     * @param {*} player 
     * @param {*} star 
     */
    ramasserEtoile (player, star)
    {

        star.disableBody(true, true);
        ui.gagne();

        //va lister tous les objets de la scène pour trouver les étoies et vérifier si elles sont actives
        let totalActive=0;
        for(let child of this.children.getChildren()){
            if(child.texture && child.texture.key==="star"){
                if(child.active){
                    totalActive++;
                    player.setVelocityY(-250);
                }
            }
        }
        if(totalActive===0){
            this.win();
        }

    }

    /**
     * LE SATELLITE DANS LA FIGURE BAM
     * @param player
     * @param sat
     */
    hitSat (player, sat) {
        this.physics.pause();
        this.cameras.main.fadeOut(2000, 0, 0, 0);
        this.player.setTint(0xff0000);
        this.sound.play('drip');
        console.log('dead');
        let ici = this;
        setTimeout(function () {
            Tableau.current.music.stop();
            Tableau.current.Blackhole.anta.stop();
            ici.scene.restart()
        }, 2000);
    }

    hitCristal(player, cristal)
    {
        let ici = this;
        ici.player.x = cristal.x - 20;
        ici.player.setVelocityX(0);
        ici.player.body.setAllowGravity(false);
        cristal.emit(MyEvents.CRI);

    }

    hitFin()
    {
        let ici = this;
        console.log("gravityInversion");
        this.player.setGravityY(-4000);
        this.player.setDisplaySize(this.player.displayWidth*0.992,this.player.displayHeight*0.992);


        if (this.boolReset2) {
            setTimeout(function () {
                ici.player.emmiter.off = true;
            }, 3000);
            this.boolReset2 = 0;
        }

        if (this.boolReset3) {
            setTimeout(function () {
                ici.Blackhole.inMov = false;
                ici.Blackhole.y = 20000;
                ici.player.emmiter.on = false;
                ici.player.pointLight.intensity = 0;
                ici.tweens.add({
                    targets: ici.player,
                    duration: 1000,
                    ease: 'Power2',
                    alpha:{
                        from:1,
                        to:0,
                    }
                }, ici);
                Tableau.current.cameras.main.stopFollow(ici.player);
                Tableau.current.cameras.main.pan(2000, 8000, 3000, 'Power2');
                Tableau.current.cameras.main.zoomTo(0.06, 1500);
                ici.tweens.add({
                    targets: ui._textfin,
                    duration: 1000,
                    ease: 'Power2',
                    alpha:{
                        from:0,
                        to:1,
                    }
                }, ici);

            }, 2000);
            this.boolReset3 = 0;
        }

        if (this.boolReset1) {
            setTimeout(function () {
                ici.cameras.main.fadeOut(1000,0,0,0);
                ici.tweens.add({
                    targets: ui._textfin,
                    duration: 1000,
                    ease: 'Power2',
                    alpha:{
                        from:1,
                        to:0,
                    }
                }, ici);
            }, 9000);

            this.boolReset1 = 0;
        }

        if (this.boolReset4) {
            setTimeout(function () {
                localStorage.setItem('cP', null);
                ici.player.setDisplaySize(26,39);
                ici.tweens.add({
                    targets: ici.player,
                    alpha: 100,
                    duration: 10,
                    ease: 'Power2'
                }, ici);
                ici.scene.restart();

            }, 11100);
            this.boolReset4 = 0;
        }


    }


    rectRender()
    {
        if (typeof this.rectCam != "undefined") {
            this.rectCam.x = this.player.x - (this.cameras.main.width / this.cameras.main.zoom)/2;
            this.rectCam.y = this.player.y - (this.cameras.main.height / this.cameras.main.zoom)/2 -50;
        }
        else {
            this.rectCam = new Phaser.Geom.Rectangle
            (
                0,
                0,
                this.cameras.main.width / this.cameras.main.zoom,
                this.cameras.main.height / this.cameras.main.zoom
            );
        }
        return this.rectCam;
    }



    /**
     * Quand on touche un monstre
     * si on le touche par en haut on le tue, sinon c'est lui qui nous tue
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster
     */
    hitMonster(player, monster){
        let me=this;
        if(monster.isDead !== true){ //si notre monstre n'est pas déjà mort
            if(
                // si le player descend
                player.body.velocity.y > 0
                // et si le bas du player est plus haut que le monstre
                && player.getBounds().bottom < monster.getBounds().top+30

            ){
                //ui.gagne();
                player.directionY=500;
                player.setVelocityY(-700);
                player.setVelocityX(player.body.velocity.x*2);
                //this.saigne(monster,function(){
                    //à la fin de la petite anim...ben il se passe rien :)
                //})
                
            }
            /**
            else{
                //le joueur est mort
                if(!me.player.isDead){
                    me.player.isDead=true;
                    me.player.visible=false;
                    //ça saigne...
                    me.saigne(me.player,function(){
                        //à la fin de la petite anim, on relance le jeu
                        me.blood.visible=false;
                        me.player.anims.play('turn');
                        me.player.isDead=false;
                        me.scene.restart();
                    })

                }

                me.playerDie();
            }
             */
        }

    }
        /**
     * Tue le player
     * - le rend invisible
     * - fait apparaitre du sang
     * - ressuscite le player
     * - redémarre le tableau
     */
         playerDie(){
            let me=this;
            if(!me.player.isDead) {
                me.player.isDead = true;
                me.player.visible = false;
                //ça saigne...
                me.saigne(me.player, function () {
                    //à la fin de la petite anim, on relance le jeu
                    me.blood.visible = false;
                    me.player.anims.play('turn');
                    me.player.isDead = false;
                    me.scene.restart();
                })
            }
        }
    

    /**
     * Pour reset cette scène proprement
     * @private
     */
    _destroy(){
        this.player.stop();
        this.scene.stop();
    }

    variaLight(light){
        light.setIntensity(light.intensity + Phaser.Math.FloatBetween(-0.08, 0.08));
        light.intensity = Phaser.Math.Clamp(light.intensity, 0.2, 0.4);
    }

    /**
     * Quand on a gagné
     */
    win(){
        Tableau.suivant();
    }

    /**
     * SATELLITE OUI NON
     * @param a
     */


    /**
     * Va au tableau suivant
     */
    static suivant(){
        let ceSeraLaSuivante=false;
        let nextScene=null;
        if(Tableau.current){
            for(let sc of game.scene.scenes){
                if(sc.scene.key !== "ui"){
                    if(!nextScene){
                        if(ceSeraLaSuivante){
                            nextScene=sc;
                        }
                        if(sc.scene.key === Tableau.current.scene.key){
                            ceSeraLaSuivante=true;
                        }
                    }
                }
            }
        }
        if(!nextScene){
            nextScene = game.scene.scenes[0];
        }
        Tableau.goTableau(nextScene);
    }
    static goTableau(tableau){
        if(Tableau.current){
            Tableau.current._destroy();
        }
        game.scene.start(tableau);
    }

    optimizeDisplay(particule, container)
    {
        //return;
        let world = this.cameras.main.worldView; // le rectagle de la caméra, (les coordonnées de la zone visible)

        // on va activer / désactiver les particules de lave
        for (let particule of container.getAll()) { // parcours toutes les particules de lave
            if (Phaser.Geom.Rectangle.Overlaps(world, particule.rectangle)) {
                //si le rectangle de la particule est dans le rectangle de la caméra
                if (!particule.visible) {
                    //on active les particules
                    particule.resume();
                    particule.visible = true;
                    console.log("particle visible");
                }
            } else {
                //si le rectangle de la particule n'est PAS dans le rectangle de la caméra
                if (particule.visible) {
                    //on désactive les particules
                    particule.pause();
                    particule.visible = false;
                    console.log("particle plus visible");
                }
            }
        }

        // ici vous pouvez appliquer le même principe pour des monstres, des étoiles etc...
    }

}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current=null;