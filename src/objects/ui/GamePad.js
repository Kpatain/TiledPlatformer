/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GamePad extends Phaser.GameObjects.Container{
    constructor(scene, x, y,size) {
        super(scene, x, y)
        scene.add.existing(this);

        this.size=size;
        this.scene = scene;
        let w=this.size;
        let dragW=this.size/2;
        let pad2=scene.add.container();

        this.circleBase=scene.add.circle(0,0,this.size/1.5,0xffffff,0.1);
        this.circleDrag=scene.add.sprite(this.x, this.y, 'joystick').setDisplaySize(70,70).setAlpha(0.6);
        this.add(pad2);
        pad2.add(this.circleBase);
        pad2.add(this.circleDrag);
        pad2.x=w/2;
        pad2.y=w/2;
        this.xDrag = w;
        this.yDrag = w;

        //MOVE
        this.forceX = 0;
        this.forceY = 0;
        this.oldforceX = 1;
        this.oldforceY = 1;
        this.randomCond = 0;



        this.circleDrag.setInteractive();
        scene.input.setDraggable(this.circleDrag, true);

        this.cursors = scene.input.keyboard.createCursorKeys();


        scene.input.keyboard.on('keydown', function(kevent){
            switch (kevent.key){
                case " ":
                    Tableau.current.cameras.main.zoomTo(0.3, 700);
                    setTimeout(function(){
                        Tableau.current.cameras.main.zoomTo(0.7, 700);
                    }, 3000);
                    break;

                case "ArrowLeft":
                    Tableau.current.player.directionX=-1;
                    break;

                case "ArrowUp":
                    Tableau.current.player.directionY=-1;
                    break;

                case "ArrowDown":
                    Tableau.current.player.directionY=1;
                    break;


            }
        });
        scene.input.keyboard.on('keyup', function(kevent){
            switch (kevent.key){
                case "ArrowRight":
                    Tableau.current.player.directionX=0;
                    break;

                case "ArrowLeft":
                    Tableau.current.player.directionX=0;
                    break;

                case "ArrowUp":
                    Tableau.current.player.directionY=0;
                    break;

                case "ArrowDown":
                    Tableau.current.player.directionY=0;
                    break;

            }
        });

        this.circleDrag.on('drag', (pointer, dragX, dragY) => {
            this.circleDrag.x = dragX;
            this.circleDrag.y = dragY;

            if(Phaser.Math.Distance.BetweenPoints(this.circleBase, this.circleDrag) < dragW)
            {
                this.xDrag = this.circleDrag.x;
                this.yDrag = this.circleDrag.y;
            }
            else if (Phaser.Math.Distance.BetweenPoints(this.circleBase, this.circleDrag) > dragW){
                this.circleDrag.x = this.xDrag;
                this.circleDrag.y = this.yDrag;
            }


            if(dragX < -w / 4){
                Tableau.current.player.directionX=-1;
            }else if(dragX > w / 4){
                Tableau.current.player.directionX=1;
            }else{
                Tableau.current.player.directionX=0;
            }
            if(dragY < -w / 4){
                Tableau.current.player.directionY=-1;
            }else if(dragY > w / 4){
                Tableau.current.player.directionY=1;
            }else{
                Tableau.current.player.directionY=0;
            }

        });
        this.circleDrag.on('dragend', (pointer, dragX, dragY) => {
            this.circleDrag.x = 0;
            this.circleDrag.y = 0;
            Tableau.current.player.directionX=0;
            Tableau.current.player.directionY=0;
        });




        if(this.scene.sys.game.device.os.desktop !== true && this.scene.sys.game.device.os.linux !== true && this.scene.sys.game.device.os.macOS !== true)
        {

            let btnLEFT = scene.add.sprite(this.x, this.y, 'zoomout').setDisplaySize(70,70).setInteractive();
            this.add(btnLEFT);

            btnLEFT.x = -w*5;

            btnLEFT.y = w/2;

            btnLEFT.on('pointerdown',function()
            {

                Tableau.current.cameras.main.zoomTo(0.3, 700);
                btnLEFT.setDisplaySize(65,65);
                setTimeout(function(){
                    btnLEFT.setDisplaySize(70,70);
                }, 200);
                setTimeout(function(){
                    Tableau.current.cameras.main.zoomTo(0.7, 700);
                }, 5000);
            });

            btnLEFT.on('pointerup',function()
            {
                Tableau.current.cameras.main.zoomTo(0.7, 700);
            });
        }


    }

    gamepad(delta){
        let player = Tableau.current.player;
        this.forceX = this.circleDrag.x;
        this.forceY = this.circleDrag.y;

        //si le pad bouge et le joueur est par terre
        if
        (
            ( this.circleDrag.x + this.circleDrag.y !== 0 && player.body.deltaY() > 0
                && player.body.onFloor() )|| (player.canJump && this.circleDrag.x + this.circleDrag.y !== 0)
        )
        {
            //console.log("le pad bouge")

            this.oldforceX = this.forceX;
            this.oldforceY = this.forceY;
            this.randomCond = true;

            if(this.circleDrag.x + this.circleDrag.y > this.size/1.5){
                this.circleDrag.setInteractive(false);
                this.circleDrag.x = (this.size/1.5) / Phaser.Math.Distance.BetweenPoints(this.circleBase, ui.mousePointer) *  ui.mousePointer.y;
                this.circleDrag.y = (this.size/1.5) / Phaser.Math.Distance.BetweenPoints(this.circleBase, ui.mousePointer) *  ui.mousePointer.x;

            }
            else{
                this.circleDrag.setInteractive();
            }


        }
        else
        {

            if((Math.abs(this.forceX - this.oldforceX) === Math.abs(this.oldforceX)
                && Math.abs(this.forceY - this.oldforceY) === Math.abs(this.oldforceY)
                && this.randomCond && player.body.deltaY() > 0 && player.body.onFloor())
                ||(Math.abs(this.forceX - this.oldforceX) === Math.abs(this.oldforceX)
                    && Math.abs(this.forceY - this.oldforceY) === Math.abs(this.oldforceY)
                    && this.randomCond && player.canJump ))
            {
                this.randomCond = false;
                let factor = (30*delta - 40);
                let speedX = -this.oldforceX*factor;
                let speedY = -this.oldforceY*factor;
                player.setVelocityX(speedX);
                player.setVelocityY(speedY);

            }

        }
    }



}