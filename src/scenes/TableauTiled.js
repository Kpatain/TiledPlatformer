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
        this.load.image('pxlred', 'assets/pixelred.png');
        this.load.image('pxlprpl', 'assets/pixelprpl.png');
        this.load.image('logo', ['assets/logo.png','assets/logoNM.png']);
        this.load.image('feu', ['assets/feu.png','assets/feuNM.png']);
        this.load.image('trou', 'assets/anta.png');
        this.load.image('cristal', 'assets/cristal.png');
        this.load.audio('music', 'assets/sounds/MUSIC.wav');

    }

    create() {
        super.create();
        let ici =this;
        console.log(myGame);

        this.cameras.main.fadeIn(2000,0,0,0);
        this.cameras.main.setZoom(0.7);


        //MINIMAP
        this.minimap = this.cameras.add(50, 20, 150, 200).setZoom(0.2).setName('mini').fadeIn(1000,0,0,0);;
        this.minimap.setBackgroundColor(0x162614);
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
        let emmit = new Phaser.Geom.Circle(feu.x+5, feu.y+15, 10);
        let particleFeu = this.add.particles('pxlred');
        this.emmiterFeu = particleFeu.createEmitter({
            lifespan: 450,
            quantity: 1,
            frequency:0.1,
            gravityX: 0,
            gravityY: -50,
            tint: { start: 0xFFFFFF, medium : 0xFFE5CF, end: 0xFF500E },
            rotate: { min:0,  max:360 },
            radial: true,
            scale: { start: 0.6, medium : 0.1, end: 0 },
            alpha: { start: 1, end: 0 },
            emitZone: { type: 'random', source: emmit },
            speed: 250,
            angle : {min:270-20, max:270+20},
            blendMode : Phaser.BlendModes.ADD,
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

        //LE CRISTAL
        const cristalObj = this.map.findObject("cristal", obj => obj.name === "cristalName");
        this.cristal = new Cristal(this, cristalObj.x, cristalObj.y + 80, 'cristal');

        //DES PARTICULES VOLANTES
        let emitRect = new Phaser.Geom.Rectangle(0, 0, 4500, 3300);

        let particleSpace = this.add.particles('traj');
        this.emmiterSpace = particleSpace.createEmitter({
            frequency: 8,
            lifespan: Phaser.Math.Between(300,1100),
            quantity: 25,
            gravityX: 0,
            gravityY: 0,
            tint: 0x888888,
            radial: true,
            scale: 0.1,
            alpha: { start: 0.5, end: 0 },
            emitZone: { type: 'random', source: emitRect },
            blendMode: Phaser.BlendModes.DST_COLOR,
            angle: { min: 0, max: 360 },
            speed : 50,
        });

        this.starsFxContainer.add(particleSpace).setDepth(5);
        this.starsFxContainer.add(particleFeu);

        this.minimap.ignore(this.starsFxContainer);
        this.minimap.ignore(this.starsFxContainer2);

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
        this.cristal.setDepth(prof--);
        this.player.setDepth(prof--);
        this.calquesTest.setDepth(prof--);
        this.sky.setDepth(0);

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
            this.cPlist[i].emitter0.setDeathZone({ type: 'onLeave', source: Tableau.current.rectRender() });
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

        //DEATHZONE OPTI
        this.Blackhole.emitter.setDeathZone({ type: 'onLeave', source: Tableau.current.rectRender() });
        this.emmiterFeu.setDeathZone({ type: 'onLeave', source: Tableau.current.rectRender() });
        this.emmiterSpace.setDeathZone({ type: 'onLeave', source: Tableau.current.rectRender() });


    }






}

