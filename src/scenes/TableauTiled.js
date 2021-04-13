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
        this.load.image('trou', 'assets/trou.png');

    }

    create() {
        super.create();
        let ici =this;
        console.log(Phaser);

        //notre map
        this.map = this.make.tilemap({ key: 'map' });
        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('tableauTiledTileset', 'tiles');

        //on agrandit le champ de la caméra du coup
        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);

        //les plateformes simples
        this.calquesTest = this.map.createLayer('calquesTest', this.tileset, 0, 0);


        const spawnPoint = this.map.findObject("point", obj => obj.name === "Player");
        this.player.x = spawnPoint.x;
        this.player.y = spawnPoint.y;



        this.calquesTest.setCollisionByProperty({ collides: true });

        /*
        //TEST MATTER
        this.matter.enableAttractorPlugin();

        //LES ASTRES
        this.astre = this.matter.add.image(spawnPoint.x, spawnPoint.y - 500, 'trou',null, {
            shape: {
                type: 'circle',
                radius: 20
            },

            isStatic: 1,

            plugin: {
                attractors: [
                    function (bodyA, bodyB) {
                        return {
                            x: (bodyA.position.x - bodyB.position.x) * 0.0000005,
                            y: (bodyA.position.y - bodyB.position.y) * 0.0000005
                        };
                    }
                ]
            }
        }).setDepth(15);

        //LE PLAYER
        this.playerMatter = this.matter.add.image(spawnPoint.x, spawnPoint.y - 300, null , null, {
            shape: {
                type: 'circle',
                radius: 10
            },

            mass: 1,
            ignorePointer: true
        }).setDepth(15).setVisible(0);

        //RANGE DE SNAP
        /*
        this.range = this.add.circle(this.playerMatter.x, this.playerMatter.y, 200).setDepth(15);
        this.range.setStrokeStyle(2, 0x1a65ac);

        this.matter.add.mouseSpring();
        */



        //----------les étoiles (objets) ---------------------
        this.stars = this.physics.add.group({
            allowGravity: true,
            immovable: false,
            bounceY:1
        });


        //this.starsObjects = this.map.getObjectLayer('stars')['objects'];
        /* On crée des étoiles pour chaque objet rencontré
        this.starsObjects.forEach(starObject => {
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let star = this.stars.create(starObject.x+20, starObject.y+20 , 'star').setOrigin(0, 0);
        });
        **/

        // CHEQUE POINT

        this.checkPoint = this.physics.add.group({
            allowGravity: false,
            immovable:false
        });



        this.checkPointsObjects = this.map.getObjectLayer('checkPoint')['objects'];
        this.checkPointsObjects.forEach(checkPointsObject => {
            console.log(checkPointsObject.properties[0].value);
            this.cP = new checkPoints(
                this,
                checkPointsObject.x,
                checkPointsObject.y,
                'trou',
                checkPointsObject.properties[0].value
            );
            this.physics.add.overlap(this.player, this.cP, function()
            {
                this.cP.savePos();
            });

            let playerPos = this.cP.loadPos();

            if(playerPos)
            {
                ici.player.setPosition(playerPos.x, playerPos.y - 64);
            }
            console.log(playerPos);

        })




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

        //--------- Z order -----------------------

        //on définit les z à la fin
        this.sky.setDepth(5);
        this.calquesTest.setDepth(10);
        //this.player.scene.starsFxContainer.setDepth(19);
        this.player.setDepth(20)
        this.stars.setDepth(22);


        console.log(this);

    }


    update(){
        super.update();
        this.cP.checkAttract();
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX*0.6;
        this.sky.tilePositionY=this.cameras.main.scrollY*0.6;

        //this.followPlayer(this.playerMatter, this.astre, this.player);

        //Phaser.Physics.Arcade.Collider(this.player.emmiter);
        //this.player.particles.setCollideWorldBounds(true);

    }




}
