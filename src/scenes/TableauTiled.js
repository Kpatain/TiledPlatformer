class TableauTiled extends Tableau{

    preload() {
        super.preload();
        // ------pour TILED-------------
        // nos images
        this.load.image('tiles', 'assets/tilemaps/tableauTiledTileset.png');
        //les données du tableau qu'on a créé dans TILED
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tableauTiled.json');

        // -----et puis aussi-------------
        this.load.image('star', 'assets/jade.png');


        this.load.image('traj', 'assets/traj.png');
        this.load.image('plan_brune', 'assets/plan_brune.png');
        this.load.image('plan_verte', 'assets/plan_verte.png');
        this.load.image('sate', 'assets/sate.png');
        this.load.image('gp', 'assets/greenParticle.png');
        this.load.image('caillou', 'assets/caillou.png');

    }

    create() {
        super.create();
        let ici =this;
        console.log(Phaser);
        this.physics.world.setFPS(60)

        this.cameras.main.fadeIn(4000,0,0,0);

        //notre map
        this.map = this.make.tilemap({ key: 'map' });
        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('tableauTiledTileset', 'tiles');

        //on agrandit le champ de la caméra du coup
        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1, 0, 50);

        //les plateformes simples
        this.calquesTest = this.map.createLayer('calquesTest', this.tileset, 0, 0);


        const spawnPoint = this.map.findObject("point", obj => obj.name === "Player");
        this.player.x = spawnPoint.x;
        this.player.y = spawnPoint.y;



        this.calquesTest.setCollisionByProperty({ collides: true });



        //----------les étoiles (objets) ---------------------
        this.stars = this.physics.add.group({
            allowGravity: true,
            immovable: false,
            bounceY:1
        });


        // CHEQUE POINT

        this.cPlist = [];

        this.checkPointsObjects = this.map.getObjectLayer('checkPoint')['objects'];
        this.checkPointsObjects.forEach(checkPointsObject => {
            let cP = new checkPoints(
                this,
                checkPointsObject.x,
                checkPointsObject.y,
                'plan_brune',
                checkPointsObject.properties[0].value

            );

            this.physics.add.overlap(this.player, cP, function()
            {
                cP.savePos();
            });

            let playerPos = cP.loadPos();

            if(playerPos)
            {
                ici.player.setPosition(playerPos.x, playerPos.y);
            }


            this.cPlist.push(cP);

        })


        //LES SATELLITES
        this.satList = [];

        this.satObjects = this.map.getObjectLayer('sat')['objects'];
        this.satObjects.forEach(satObject => {
            let sat = new Satellite(
                this,
                satObject.x,
                satObject.y,
                'sate',
                Math.random(0, 360)*360
            );

            this.satList.push(sat);

        })

        //LES ASTEROIDES
        this.caillouList = [];

        this.caillouObjects = this.map.getObjectLayer('caillou')['objects'];
        this.caillouObjects.forEach(caillouObject => {
            let Aste = new Caillou(
                this,
                caillouObject.x,
                caillouObject.y,
                'caillou',
                Math.random(0, 360)*360
            );

            this.caillouList.push(Aste);

        })

        //PAR CP
        // for (var i = 0; i < this.cPlist.length; i ++)
        // {
        //     let satList2 = [];
        //     //NOMBRE DE SAT PAS CP
        //     for (var j = 0; j < + Phaser.Math.Between(2, 4); j ++)
        //     {
        //
        //         posX = this.cPlist[i].x + Phaser.Math.Between(50, 150);
        //         posY = this.cPlist[i].y + Phaser.Math.Between(-120, 120);
        //         angle = Math.abs(360 * Phaser.Math.Angle.Between(0, 1, posX - this.cPlist[i].x, posY - this.cPlist[i].y)) -90;
        //
        //         let sat = new Satellite(this, posX, posY, 'sate', angle).setDepth(0);
        //         satList2.push(sat);
        //         console.log("sat");
        //     }
        //
        //     this.satList.push(satList2);
        // }


        //----------débug---------------------

        //pour débugger les collisions sur chaque layer
        let debug=this.add.graphics().setAlpha(this.game.config.physics.arcade.debug?0.75:0);
        if(this.game.config.physics.arcade.debug === false){
            debug.visible=false;
        }


        //----------collisions---------------------

        //quoi collide avec quoi?
        this.physics.add.collider(this.player, this.calquesTest);
        this.physics.add.collider(this.stars, this.calquesTest);
        //si le joueur touche une étoile dans le groupe...
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        //quand on touche la lave, on meurt
        this.physics.add.collider(this.player, this.lave,this.playerDie,null,this);


        //on définit les z à la fin
        this.sky.setDepth(5);
        this.calquesTest.setDepth(10);
        //this.player.scene.starsFxContainer.setDepth(19);
        this.player.setDepth(20)
        this.stars.setDepth(22);

    }


    update(){
        super.update();
        
        for (var i=0; i < this.cPlist.length; i++)
        {
            this.cPlist[i].checkAttract();
            this.cPlist[i].setDepth(21);
        }

        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX*0.6;
        this.sky.tilePositionY=this.cameras.main.scrollY*0.6;
    }




}
