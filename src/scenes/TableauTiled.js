class TableauTiled extends Tableau{

    preload() {
        super.preload();
        // ------pour TILED-------------
        // nos images
        this.load.image('tiles', ['assets/tilemaps/tableauTiledTileset4.png', 'assets/tilemaps/NormalMap.png']);
        //les données du tableau qu'on a créé dans TILED
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tableauTiled2.json');

        // -----et puis aussi-------------
        this.load.image('traj', 'assets/traj.png');
        this.load.image('plan_brune', 'assets/plan_brune.png');
        this.load.image('plan_verte', 'assets/plan_verte.png');
        this.load.image('sate', 'assets/sate.png');
        this.load.image('gp', 'assets/greenParticle.png');
        this.load.image('caillou', 'assets/caillou.png');
        this.load.image('pxlgr', 'assets/pixelgreen.png');
        this.load.image('logo', ['assets/logo.png','assets/logoNM.png']);
        this.load.image('feu', ['assets/feu.png','assets/feuNM.png']);
        this.load.image('trou', 'assets/anta.png');
        this.load.audio('music', 'assets/sounds/MUSIC.wav');

    }

    create() {
        super.create();
        let ici =this;
        console.log(myGame);

        this.cameras.main.fadeIn(2000,0,0,0);
        this.cameras.main.setZoom(0.8);

        this.minimap = this.cameras.add(50, 20, 150, 200).setZoom(0.2).setName('mini').fadeIn(1000,0,0,0);;
        this.minimap.setBackgroundColor(0x111111);
        this.minimap.scrollX = 1600;
        this.minimap.scrollY = 300;
        this.minimap.startFollow(this.player, true, 1, 1, 0, -300);
        this.minimap.ignore(this.sky);
        this.minimap.visible = false;


        //LIGHT
        this.lights.enable().setAmbientColor(0x202b22);

        //MUSIQUE
        this.music = this.sound.add('music');
        this.music.loop = true;
        this.music.play();
        this.music.volume = 0.5;

        //notre map
        this.map = this.make.tilemap({ key: 'map' });
        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('TableauTiledTileset2', 'tiles');

        //on agrandit le champ de la caméra du coup
        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1, 0, 50);

        //les plateformes simples
        this.calquesTest = this.map.createLayer('calquesTest', this.tileset, 0, 0);
        this.calquesTest.setPipeline('Light2D');


        //SPAWNPOINT
        const spawnPoint = this.map.findObject("point", obj => obj.name === "Player");
        this.player.x = spawnPoint.x;
        this.player.y = spawnPoint.y;

        //LOGO
        const logoObj = this.map.findObject("logo", obj => obj.name === "logoname");
        this.add.sprite(logoObj.x, logoObj.y, 'logo').setDisplaySize(611,200).setDepth(999).setPipeline('Light2D');

        //FEU
        const feu = this.map.findObject("feu", obj => obj.name === "FeuStart");
        this.add.sprite(feu.x, feu.y, 'feu').setDisplaySize(64,64).setDepth(999).setPipeline('Light2D');
        this.lightFire = this.lights.addLight(feu.x, feu.y, 290, 0, 0.5);
        this.lightFire.color.r = 5;
        this.lightFire.color.g = 3;
        this.lightFire.color.b = 1;
        let emmit = new Phaser.Geom.Circle(feu.x+10, feu.y+5, 20);
        let particleFeu = this.add.particles('pxlgr');
        let emmiterFeu = particleFeu.createEmitter({
            frequency: 300,
            lifespan: Phaser.Math.Between(1500,2000),
            quantity: 5,
            gravityX: 0,
            gravityY: -50,
            tint: [  0xff4600, 0xe63f00, 0xcc3800, 0xe60000, 0xff3333 ],
            rotate: { min:0, max:360 },
            radial: true,
            scale: { start: 0.2, end: 0.1 },
            alpha: { start: 1, end: 0 },
            emitZone: { type: 'random', source: emmit },
            blendMode: Phaser.BlendModes.ADD,
            speed: 20
        });

        this.starsFxContainer.add(particleFeu);



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
            let cP = new CheckPoints(
                this,
                checkPointsObject.x,
                checkPointsObject.y,
                'plan_brune',
                checkPointsObject.properties[0].value

            );


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

        //TROU
        this.Blackhole = new Trou(
            this,
            50000,
            this.player.y + 600,
            "trou"
        );

        //DES PARTICULES VOLANTES
        let emitRect = new Phaser.Geom.Rectangle(0, 0, 4500, 3300);

        let particleSpace = this.add.particles('traj');
        let emmiterSpace = particleSpace.createEmitter({
            frequency: 8,
            lifespan: Phaser.Math.Between(300,1100),
            quantity: 25,
            gravityX: 0,
            gravityY: 0,
            tint: 0x888888,
            radial: true,
            scale: 0.2,
            alpha: { start: 0.5, end: 0 },
            emitZone: { type: 'random', source: emitRect },
            blendMode: Phaser.BlendModes.DST_COLOR,
            angle: { min: 0, max: 360 },
            speed : 50,
        });

        this.starsFxContainer.add(particleSpace).setDepth(5);
        this.starsFxContainer.add(particleFeu);

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


        //on définit les z à la fin
        let prof= 1000;

        this.Blackhole.setDepth(prof--);
        for (var i=0; i < this.cPlist.length; i++)
        {
            this.cPlist[i].setDepth(prof);
        }
        prof = prof--;
        for (var i=0; i < this.caillouList.length; i++)
        {
            this.caillouList[i].setDepth(prof);
        }
        prof = prof--;
        for (var i=0; i < this.satList.length; i++)
        {
            this.satList[i].setDepth(prof);
        }
        this.stars.setDepth(prof--);
        this.player.setDepth(prof--);
        this.calquesTest.setDepth(prof--);
        this.sky.setDepth(1);

        this.player.scene.starsFxContainer.setDepth(19);




        this.previousPosition = 0;

    }


    update(time,delta){
        super.update();
        this.player.move(delta);
        this.Blackhole.moveAnta();

        //CHECKPOINT
        for (var i=0; i < this.cPlist.length; i++)
        {
            this.cPlist[i].checkAttract(delta);
            this.cPlist[i].setDepth(21);
        }

        //OPTI
        /*
        let actualPosition=JSON.stringify(this.cameras.main.worldView);
        if(
            !this.previousPosition
            || this.previousPosition !== actualPosition
        ){
            this.previousPosition=actualPosition;
            for (let i=0; i < this.cPlist.length; i++) {
                console.log("boucle update TableauTiled");
                this.optimizeDisplay(this.cPlist[i].gravityParticle, this.cPlist[i].starsFxContainer);
            }
        }
           */

        //LIGHT FOLLOW
        this.player.light.x = this.player.x;
        this.player.light.y = this.player.y;

        this.player.pointLight.x = this.player.x;
        this.player.pointLight.y = this.player.y;

        //VARIALIGHT
        this.variaLight(this.lightFire);

    }






}

