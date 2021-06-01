class Cristal extends ObjetPhysique {

    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y, image) {
        super(scene, x, y, image);
        scene.physics.add.overlap(
            scene.player,
            this,
            scene.hitCristal,
            null,
            scene
        );

        this.body.allowGravity = false;
        this.setDisplaySize(220, 329);
        this.setSize(90,200);

        this.lightCristal = scene.lights.addLight(this.x, this.y-50, 500, 0, 0.5);
        this.lightCristal.color.r = 2;
        this.lightCristal.color.g = 6;
        this.lightCristal.color.b = 4;

        this.pointLight = scene.add.pointlight(this.x-20, this.y, (0, 0, 0), 200, 0.1, 0.1).setDepth(20);
        this.pointLight.color.r = 114;
        this.pointLight.color.g = 255;
        this.pointLight.color.b = 191;

        let particleCristal = scene.add.particles('pxlwg');
        this.emmiterCristal = particleCristal.createEmitter({
            x: this.x-20,
            y : this.y-20,
            lifespan: 1000,
            quantity: 2,
            frequency:0.1,
            gravityX: 0,
            gravityY: -2000,
            rotate: { min:0,  max:360 },
            radial: true,
            scale: {start : 0.3, end: 0.05},
            speed: 10,
            angle : {min:270-90, max:270+90},
            alpha : {start : 1, end: 0.1},
        });

        scene.starsFxContainer.add(particleCristal);


        this.once(MyEvents.CRI, function(){
            let ici = Tableau.current;
            //ici.Blackhole.y = Tableau.current.player.y + 400;
            setTimeout(function()
            {
                ici.cameras.main.flash(1000,  198, 255, 243 );
                ici.player.setMaxVelocity(1000,1000)
                ici.player.setVelocityY(-10000);
                ici.player.directionY = 500;

                Tableau.current.cameras.main.zoomTo(0.5, 300);

                ici.loch = ici.sound.add('loch');
                if(!ici.loch.isPlaying) {
                    ici.loch.play();
                    ici.loch.volume = 0.6;
                }

                setTimeout(function()
                {
                    ici.player.setMaxVelocity(800,800);
                    Tableau.current.cameras.main.zoomTo(0.7, 700);
                }, 600);

                setTimeout(function()
                {

                    ici.player.setMaxVelocity(700,700);
                }, 3000);
            }, 900);

        });

    }
}