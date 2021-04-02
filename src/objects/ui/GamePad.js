/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GamePad extends Phaser.GameObjects.Container{
    constructor(scene, x, y,size=100) {
        super(scene, x, y)
        scene.add.existing(this);

        this.size=size;
        let w=this.size;
        let dragW=this.size/2;
        let pad2=scene.add.container();

        let circle=scene.add.circle(0,0,this.size/2,0xffffff,0.1)
        this.circleDrag=scene.add.circle(0,0,dragW/2,0xffffff,0.3)
        this.add(pad2);
        pad2.add(circle);
        pad2.add(this.circleDrag);
        pad2.x=w/2;
        pad2.y=w/2;

        this.circleDrag.setInteractive();
        scene.input.setDraggable(this.circleDrag, true);

        this.cursors = scene.input.keyboard.createCursorKeys();

        scene.input.keyboard.on('keydown', function(kevent){
            switch (kevent.key){
                case "ArrowRight":
                    Tableau.current.player.directionX=1;
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
            this.circleDrag.x = dragX
            this.circleDrag.y = dragY
            this.circleDrag.x=Phaser.Math.Clamp(dragX,-w/2 ,w/2);
            this.circleDrag.y=Phaser.Math.Clamp(dragY,-w/2,w/2);
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

    }



}