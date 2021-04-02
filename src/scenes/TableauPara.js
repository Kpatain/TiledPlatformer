class TableauPara extends Tableau{
    /* 
    PROFONDEUR DE CHAMPS
    1er plan: 6
    2e plan: 5
    
    Player: 4
    Monstres : 3
    plateformes et diams: 2

    3e plan: 1 
    4e plan: 0
    **/


    preload() {
        super.preload();
        this.load.image('star', 'assets/jade.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('sky-2', 'assets/sky-2.jpg');
        this.load.image('1', 'assets/1.png');
        this.load.image('2', 'assets/2.png');
        this.load.image('3', 'assets/3.png');
        this.load.image('4', 'assets/4.png');
        this.load.image('piques', 'assets/piques.png');
        this.load.image('boule', 'assets/boule.png');
        this.load.image('robot', 'assets/robot.png');
        this.load.image('pf', 'assets/plateforme.png');
    }
    create() {
        super.create();

        //setup TAB
        let tabL=4000;
        let tabH=600; //la hauteur est identique au cadre du jeu

        
        this.cameras.main.setBounds(0, 0, tabL, tabH);
        this.physics.world.setBounds(0, 0, tabL,  tabH);
        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        
        //  1er plan
        this.sky4=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            '4'
        );
        this.sky4.setScrollFactor(0);
        this.sky4.setOrigin(0,0);
        this.sky4.setDepth(6);

        //2e plan
        this.sky3=this.add.tileSprite(
            0,
            100,
            this.sys.canvas.width,
            this.sys.canvas.height,
            '1'
        );
        this.sky3.setScrollFactor(0);
        this.sky3.setOrigin(0,0);
        this.sky3.setDepth(5);
        
        //3e plan
        this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            '2'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        this.sky2.setDepth(1);

        //4e plan
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            '3'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);
        this.sky.setDepth(0);
        


        
        this.stars=this.physics.add.group();
        this.platforms=this.physics.add.staticGroup();
        this.platforms.create(20, 400, 'pf').setDisplaySize(80,20).refreshBody().setDepth(2);

        //Boucle de création du niveau
        for(let posX=220;posX<tabL;posX+=200){
            let diamsY=Math.random()*100 + 300;

            let star=this.stars.create(posX ,diamsY,"star");                                                        //les diams
            star.body.allowGravity=false;

            if(Math.random()>0.9){                                                                                           //diams sous les plateformes
                let star=this.stars.create(posX, 480,"star");
                star.body.allowGravity=0;
                console.log("etoile ?");
            }
            
            new Piques(this, posX + 100, 570);                                                                      //les piques

            this.platforms.create(posX, diamsY+50, 'pf').setDisplaySize(80,20).refreshBody();                       //les plateformes

        }

        let sol=this.platforms.create(0,558,"ground");
        sol.setVisible(0);
        sol.setDisplaySize(20000,93);
        sol.refreshBody();

        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.player,this.platforms);

        new Boule(this, 800, 340);
        new Boule(this, 1800, 300);

        new MonstreRoi(this, 600, 430);
        new MonstreRoi(this, 1600, 430);
        new MonstreRoi(this, 2700, 430);

        //remise a jour de la profondeur au cas ou
        this.platforms.setDepth(2);
        this.stars.setDepth(2);
        this.player.setDepth(4);

    }

    update(){
        super.update();
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX*0.3;
        this.sky.tilePositionY=this.cameras.main.scrollY*0.1;
        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.6;
        this.sky2.tilePositionY=this.cameras.main.scrollY*0.2;

        this.sky3.tilePositionX=this.cameras.main.scrollX*1.2;
        this.sky3.tilePositionY=this.cameras.main.scrollY*0.4;

        this.sky4.tilePositionX=this.cameras.main.scrollX*2;
        this.sky4.tilePositionY=this.cameras.main.scrollY*0.6;
        
    }



}

