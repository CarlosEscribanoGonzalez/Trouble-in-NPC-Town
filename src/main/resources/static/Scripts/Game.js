class Game extends Phaser.Scene
{
    constructor(hint1,hint2,hint3)
    {
        super({key: "Game"}); 
        this.hint1 = hint1;
        this.hint2 = hint2;
        this.hint3 = hint3;
    }

    preload()
    {
        //IMÁGENES
        this.load.image("BackgroundP", "./Sprites/fondo.png")
        this.load.image("Bullet", "./Sprites/bala1.png");
        this.load.image("Crosshair", "./Sprites/Mira.png");
        this.load.image("DeadBody", "./Sprites/Sprite_morto.png");
        this.load.spritesheet("Character", "./Sprites/SpriteSheet.png", {frameWidth: 250, frameHeight: 450});
        this.load.spritesheet("Explosion", "./Sprites/explosionspritesheet.png", {frameWidth: 400, frameHeight: 550});
        //AUDIO
        this.load.audio("Crowd","./Sounds/crowd.mp3");
        this.load.audio("Click","./Sounds/click.mp3");
        this.load.audio("Grenade","./Sounds/grenade.mp3");
        this.load.audio("Sniper","./Sounds/sniper.mp3");
    }

    create()
    {
        this.cameras.main.setBackgroundColor('#181818')
        this.backgroundImage1 = this.add.image(0,0,"BackgroundP").setOrigin(0,0).setAlpha(0.4);;
        this.backgroundImage1.depth = -1;

        //Panel de fade in:
        this.panel = this.add.rectangle(0,0,this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(1000);
        //Audio
        this.clickSound = this.sound.add("Click");
        this.gameSound = this.sound.add("Crowd");
        this.gameSound.play({loop: true});
        //Ropa:
        this.hats = this.scene.get("CustomizationP1Menu").spritesheetsHat;
        this.tops = this.scene.get("CustomizationP1Menu").spritesheetsTop;
        this.bottoms = this.scene.get("CustomizationP1Menu").spritesheetsBot;
        //Jugadores:
        this.player;
        this.player2;
        this.InitializePlayer(); //El jugador también tendrá una posición aleatoria
        this.InitializePlayer2();
        //NPCs:
        var minNPC = this.scene.get("NPCNumber").minNPC;
        var maxNPC = this.scene.get("NPCNumber").maxNPC;
        var numberNPC = Math.floor(Math.random() * (maxNPC-minNPC+1) + minNPC); //NPCs son un número aleatorio entre 9 y 15 (de momento)
	    this.npcs = new Array(numberNPC);
        this.InitializeNPCS(); //Se inicializan los NPCs con posiciones aleatorias
        //Animaciones:
        this.GenerateAnimations();
        //Manejo de input:
        this.player.ManageInput(this); //Se añade la gestión del input al ser pulsada una tecla. Se pasa como parámetro la escena del juego.
        this.player2.ManageBullets(); //Se añade la gestión de las balas. Cada vez que se haga click izquierdo, se pierde una bala
        this.player.StopMovement(this); //Gestión del input: cuando deja de pulsarse la tecla de movimiento el jugador se queda quieto
        this.input.keyboard.on("keydown", this.PauseGame.bind(this)); //Si se presiona ESC se pausa el juego
        //Otros:
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        game.canvas.style.cursor = "crosshair"; //A partir de ahora el cursor será una mira (no la nuestra, una por defecto)
        this.scene.run("InfoMenu"); //La información está siempre disponible mientras se juega
        this.gameEndedMenu = new GameEndedMenu(this.player, this.player2);
        //Misiones:
        var numMission = this.scene.get("CustomizationP1Menu").numMission; 
        this.mission = new Missions(numMission, this.player, this);
    }

    update(time, deltaTime)
    { 
        if(this.panel.alpha > 0) this.panel.alpha -= deltaTime/500;
        this.mission.CheckMission();
        this.UpdateCharacters(deltaTime);
        this.CheckGameCondition();
    }

    InitializeNPCS() //Inicializa todos los NPCs en posiciones aleatorias
    {
        for(var i = 0; i < this.npcs.length; i++)
        {
            var randomX = Math.floor(Math.random() * (1550-50+1) + 50);
            var randomY = Math.floor(Math.random() * (850-50+1) + 50);
            var randomHat = Math.floor(Math.random() * this.hats.length);
            var randomTop = Math.floor(Math.random() * this.tops.length);
            var randomBotton = Math.floor(Math.random() * this.bottoms.length);
            this.npcs[i] = new NPC(randomX, randomY, this, "Character", this.hats[randomHat], this.tops[randomTop], this.bottoms[randomBotton], "DeadBody");
        }
    }

    InitializePlayer() //Inicializa al jugador en una posición aleatoria
    {
        var randomX = Math.floor(Math.random() * (1550 - 50 + 1) + 50);
	    var randomY = Math.floor(Math.random() * (850 - 50 + 1) + 50);
        var hatNum = this.scene.get("CustomizationP1Menu").hatNum;
        var topNum = this.scene.get("CustomizationP1Menu").topNum;
        var botNum = this.scene.get("CustomizationP1Menu").botNum;
	    this.player = new Player(randomX, randomY, this, "Character", this.hats[hatNum], this.tops[topNum], this.bottoms[botNum], "DeadBody");
    }

    InitializePlayer2() 
    {
       var weaponT = this.scene.get("CustomizationP2Menu").weaponSelected;
       this.player2 = new Player2(this, weaponT, "Bullet", "Crosshair", this.gameSound, "Explosion"); // Le paso la escena actual. De momento le paso directamente el arma yo, pero después será una variable que vendrá dada por la escena de personalización
       this.input.on('pointermove',this.player2.UpdatePositionP2.bind(this.player2), this); //Cada vez que el ratón se mueve le paso la función para cambiar la posición del jugador 2 (que va a ser la del ratón)
       //le paso el contexto con el último this para que lo haga bien
       this.player2.InitializeBullets();  //Inicializa las balas del jugador según su arma
    }

    UpdateCharacters(deltaTime) //Actualiza posiciones de los jugadores y NPCs
    {
        for(var i = 0; i < this.npcs.length; i++)
        {
            this.npcs[i].UpdatePosition(deltaTime);
        }
        this.player.UpdatePosition(deltaTime);
        //Si el jugador 2 ha disparado se para momentáneamente el sonido del juego con esta función
        this.player2.StopGameSound();
    }

    PauseGame(event)
    {
        if(event.key === "Escape")
        {
            this.clickSound.play();
            this.gameSound.pause();
            this.scene.run("PauseMenu");
            this.scene.pause();
            this.scene.pause("InfoMenu");
        }
    }
    
    CheckGameCondition()
    {
        if(this.player2.bullets == 0 || this.player.killed || this.player.missionAccomplished) 
        {
            this.gameSound.stop();
            this.scene.add("GameEndedMenu",this.gameEndedMenu);
            this.scene.run("GameEndedMenu");
            this.scene.pause();
            this.scene.pause("InfoMenu");
        }
    }

    GenerateAnimations()
    {
        this.GenerateCustomAnimation("Character");
        this.hats.forEach(hat => 
            {
                this.GenerateCustomAnimation(hat);
            });
        this.tops.forEach(top => 
            {
                this.GenerateCustomAnimation(top);
            });
        this.bottoms.forEach(bottom =>
            {
                this.GenerateCustomAnimation(bottom);
            });
    }

    GenerateCustomAnimation(spriteSheet)
    {
        if(spriteSheet !== undefined)
        {   
            var newKey = spriteSheet + "_idle_front";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [0]
                        }),
                    repeat: -1,
                    frameRate: 1
                }
            );
            newKey = spriteSheet + "_idle_back";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [10]
                        }),
                    repeat: -1,
                    frameRate: 1
                }
            );
            newKey = spriteSheet + "_idle_left";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [15]
                        }),
                    repeat: -1,
                    frameRate: 1
                }
            );
            newKey = spriteSheet + "_idle_right";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [1]
                        }),
                    repeat: -1,
                    frameRate: 1
                }
            );
            newKey = spriteSheet + "_front_walk";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [6, 7, 8, 9, 0]
                        }),
                    repeat: -1,
                    frameRate: 6
                }
            );
            newKey = spriteSheet + "_back_walk";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [11, 12, 13, 14, 10]
                        }),
                    repeat: -1,
                    frameRate: 6
                }
            );
            newKey = spriteSheet + "_left_walk";
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [16, 17, 18, 19, 15]
                        }),
                    repeat: -1,
                    frameRate: 6
                }
            );
            newKey = spriteSheet + "_right_walk"
            this.anims.create(
                {
                    key: newKey,
                    frames: this.anims.generateFrameNumbers(spriteSheet, 
                        {
                            frames: [2, 3, 4, 5, 1]
                        }),
                    repeat: -1,
                    frameRate: 6
                }
            );
        }
    }
}

