class Player2 extends Phaser.GameObjects.Group
{
    constructor(scene, weapon, bulletsImg, crosshairImg, gameSound, explosion){
        super({key: "Player2"});
        this.scene = scene;
        this.bulletsImg = bulletsImg;
        this.weapon = weapon;
        this.crosshair = this.scene.add.image(100, 100, crosshairImg).setScale(0.25);
        this.crosshair.depth = 1000;
        this.bullets;
        this.explosion = explosion;
        this.CreateExplosionAnimation();
        //Audio:
        this.granadeSound = this.scene.sound.add("Grenade");
        this.sniperSound = this.scene.sound.add("Sniper");
        this.gameSound = gameSound;
        this.stopGameSound = false;
        this.soundTimer = 3000; //Tiempo que se callan los NPCs (3 segundos de momento)
    }

    //Hacer función que gestione que dependiendo del tipo de bala tenga X balas
    InitializeBullets()
    {
        if(this.weapon == "LG")
        {
            this.bullets = new Array(3);
            
        } 
        else if(this.weapon == "F")
        { 
            this.bullets = new Array(5);
        }

        for(var i = 0; i<this.bullets.length; i++)
        {
            this.bullets[i] = this.scene.add.sprite(1450 - (i*30),50, this.bulletsImg).setScale(0.20) //Aparecen las imágenes una tras otra siguiendo una distancia x+20
            this.bullets[i].depth = 1000;
        }
    }

    AreaShot(){ //Saber si se va a cambiar la mira al final
        var distanceP1 = Phaser.Math.Distance.Between(this.crosshair.x,this.crosshair.y, this.scene.player.body.x,this.scene.player.body.y) //Calcula la distancia entre el jugador y la mira
        this.scene.npcs.forEach((objeto)=>{ //Calcula la distancia por cada npc
	        var distanceNPC = Phaser.Math.Distance.Between(this.crosshair.x,this.crosshair.y, objeto.body.x,objeto.body.y)
	        if(distanceNPC < 100)//Si es menor que 100, se vuelve invisible (muere)
	        { 
	            objeto.KillCharacter();
	        }
        })
        if(distanceP1 < 100)//Si el jugador está en área, entonces muere y por tanto gana la partida
        { 
            this.scene.player.KillCharacter();
        }
        var newExplosion = this.scene.add.sprite(this.crosshair.x, this.crosshair.y-69, this.explosion).setOrigin(0.5,0.5).setScale(0.4);
        newExplosion.depth = 1000;
        newExplosion.anims.play("explosion");
        newExplosion.on("animationcomplete", function(animation, frame)
        {
            newExplosion.destroy();
        }.bind(this));
    }
   
    UpdatePositionP2(pointer) //Se le pasa directamente el puntero activo
    { 
        this.crosshair.x = pointer.x;
        this.crosshair.y = pointer.y;
        game.canvas.style.cursor = "crosshair"; //A partir de ahora el cursor será una mira (no la nuestra, una por defecto)
    }

    ManageBullets() //Función que hace que se elimine una bala cada vez que se pulsa el botón izquierdo del ratón
    { 
        this.scene.input.on('pointerdown', function(pointer)
        {
            if(pointer.leftButtonDown())
            {
                if(this.bullets.length > 0)
                {
                    const bullet = this.bullets.pop() //Elige la última bala del array 
                    bullet.destroy(); //destruye su sprite
                    if(this.weapon === "LG"){
                        this.granadeSound.play()
                        this.AreaShot();
                    } 
                    else this.sniperSound.play()
                }
                this.gameSound.stop();
                this.stopGameSound = true;
            }
        }.bind(this));
    }

    StopGameSound()
    {
        if(this.stopGameSound)
        {
            if(this.soundTimer >= 0) this.soundTimer -= game.loop.delta;
            else 
            {
                this.stopGameSound = false;
                this.gameSound.play();
                this.soundTimer = 3000;
            }
        }
    }

    CreateExplosionAnimation()
    {
        this.scene.anims.create(
            {
                key: "explosion",
                frames: this.scene.anims.generateFrameNumbers(this.explosion, 
                    {
                        frames: [0, 1, 2, 3, 4, 5, 6, 7]
                    }),
                repeat: 0,
                frameRate: 10
            }
        );
    }
}
