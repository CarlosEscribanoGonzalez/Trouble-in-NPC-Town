class GameOnline extends Phaser.Scene
{
    constructor()
    {
        super({key: "GameOnline"}); 
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
        this.hats = this.scene.get("MainMenu").spritesheetsHat;
        this.tops = this.scene.get("MainMenu").spritesheetsTop;
        this.bottoms = this.scene.get("MainMenu").spritesheetsBot;
        //Jugadores:
        this.player;
        this.player2;
        this.npcs;
        
		window.socket.onmessage = (event) => {
			var content = event.data.split(";");
			if(content[0] === "p1") this.InitializePlayer(event);
			else if(content[0] === "p2") this.InitializePlayer2(event);
			else if(content[0] === "movePlayer")
			{
				if(content[2] == "move") this.player.MovePlayer(content[1]);
				else this.player.StopPlayer(content[1]);
			}
			else if(content[0] === "movePlayer2")
			{
				this.player2.UpdatePositionP2(parseInt(content[1]), parseInt(content[2]));
				if(content[3] === "true"){
					this.player2.Shoot();
				}
				if(content[4] === "true") this.player.KillCharacter();
                
			} else if (content[0] === "checkGame" ){
                if(content[1]=== "true"){
					this.condition = "K"
					 this.GoToEnding();
				} else if (content[2] === "true"){
					this.condition = "MA"
					 this.GoToEnding();
				}
				else if(content[3] === "true"){
					this.condition = "NB"
                    this.GoToEnding();
            }
		}else if(content[0] === "npcinfo")
			{
				this.UpdateNPCOnline(content);
			}else if(content[0] === "npcdead")
			{
				this.UpdateNPCOnline(content);
			}
		}
		var msg = {type: "GetP1Info"};
		window.socket.send(JSON.stringify(msg));
		var msg = {type: "GetP2Info"};
		window.socket.send(JSON.stringify(msg));

        /*/NPCs:
        var minNPC = this.scene.get("NPCNumber").minNPC;
        var maxNPC = this.scene.get("NPCNumber").maxNPC;
        var numberNPC = Math.floor(Math.random() * (maxNPC-minNPC+1) + minNPC); //NPCs son un número aleatorio entre 9 y 15 (de momento)
	    this.npcs = new Array(numberNPC);
        //this.InitializeNPCS(); //Se inicializan los NPCs con posiciones aleatorias*/
        this.seed;
        this.randomizr;
        //Animaciones:
        this.GenerateAnimations();
       	//Otros:
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        if(window.player === "Player1") game.canvas.style.cursor = "default"; //A partir de ahora el cursor será una mira (no la nuestra, una por defecto)
        else game.canvas.style.cursor = "crosshair";
        this.gameEndedMenu = new GameEndedMenuOnline(this.player, this.player2);

        //this.interval = setInterval(() => this.UpdateNPCFix(), 10);
    }

    update(time, deltaTime)
    { 
        if(this.panel.alpha > 0) this.panel.alpha -= deltaTime/500;
        if(window.player === "Player1" && this.mission !== undefined) this.mission.CheckMission();
        this.UpdateCharacters(deltaTime);
        this.CheckGameCondition();
    }

    InitializeNPCS() //Inicializa todos los NPCs en posiciones aleatorias
    {
        for(var i = 0; i < this.npcs.length; i++)
        {
            var randomX = Math.floor(this.randomizr.call() * (1550-50+1) + 50);
            var randomY = Math.floor(this.randomizr.call() * (850-50+1) + 50);
            var randomHat = Math.floor(this.randomizr.call() * this.hats.length);
            var randomTop = Math.floor(this.randomizr.call() * this.tops.length);
            var randomBotton = Math.floor(this.randomizr.call() * this.bottoms.length);
            this.npcs[i] = new NPC2(randomX, randomY, this, "Character", this.hats[randomHat], this.tops[randomTop], this.bottoms[randomBotton], "DeadBody");
        }
        
			var npcinfostring;
			
			if (this.npcs!=null){
	        	for(var i = 0; i < this.npcs.length; i++)
		        {
		            npcinfostring+=this.npcs[i].GetCurrentX();
		            npcinfostring+=";";
		            npcinfostring+=this.npcs[i].GetCurrentY();
		            if((i+1)<this.npcs.length){
						npcinfostring+=";";
					}
		        }
       		}
       		
       		var msg = {type: "UpdateNPCStart" , npcinfo: npcinfostring};
			window.socket.send(JSON.stringify(msg));
			
			
			var npcinfostring2;
			
			if (this.npcs!=null){
	        	for(var i = 0; i < this.npcs.length; i++)
		        {
		            npcinfostring+=this.npcs[i].GetDead();
		            //if((i+1)<this.npcs.length){
						npcinfostring2+=";";
					//}
		        }
       		}
			
			var msg = {type: "GetNPCStart", npcdead: npcinfostring2};
			window.socket.send(JSON.stringify(msg));
			
    }
    

    InitializePlayer(event) //Inicializa al jugador en una posición aleatoria
    {
	    var components = event.data.split(";");
        var hatNum = parseInt(components[2]);
        var topNum = parseInt(components[3]);
        var botNum = parseInt(components[4]);
        var initialX = parseInt(components[5]);
        var initialY = parseInt(components[6]);
	    this.player = new PlayerOnline(initialX, initialY, this, "Character", this.hats[hatNum], this.tops[topNum], this.bottoms[botNum], "DeadBody");
    	var numMission = parseInt(components[1]);
        this.mission = new MissionsOnline(numMission, this.player, this);
        var numNPC = parseInt(components[8]);
       	this.npcs = new Array(numNPC);
       	var seedWord = components[9];
       	this.seed = this.cyrb128(seedWord);
        this.randomizr = this.splitmix32(this.seed[0]);
        this.InitializeNPCS();
        this.interval = setInterval(() => this.WorkNPC(), 50);
        console.log(this.mission);
        if(window.player === "Player1") {
			this.player.ManageInput(this); //Se añade la gestión del input al ser pulsada una tecla. Se pasa como parámetro la escena del juego.
        	this.player.StopMovement(this); //Gestión del input: cuando deja de pulsarse la tecla de movimiento el jugador se queda quieto
        	this.scene.run("InfoMenuP1Online");
        	console.log("Jugador 1 inicializado");
        }
        else{
        	this.scene.add("InfoMenuOnline", new InfoMenuOnline(hatNum, topNum, botNum, components[7]));
        	this.scene.run("InfoMenuOnline"); //La información está siempre disponible mientras se juega
		}
    }

    InitializePlayer2(event) 
    {
       var components = event.data.split(";");
       var weaponT = components[1];
       this.player2 = new Player2Online(this, weaponT, "Bullet", "Crosshair", this.gameSound, "Explosion");
       this.player2.InitializeBullets();  //Inicializa las balas del jugador según su arma
       if(window.player === "Player2")
       {
		   this.player2.ManageBullets();
		   this.player2.ManageMousePosition(); 
		   console.log("Jugador 2 inicializado");
	   }  //Se añade la gestión de las balas. Cada vez que se haga click izquierdo, se pierde una bala
    }

    UpdateCharacters(deltaTime) //Actualiza posiciones de los jugadores y NPCs
    {
		var msg;
        if(this.player !== undefined) this.player.UpdatePosition(deltaTime);
        if(window.player === "Player2"){
			
			if (this.npcs!=null){
	        	for(var i = 0; i < this.npcs.length; i++)
		        {
		            this.npcs[i].UpdatePosition2(deltaTime);
		            /*
		            npcinfostring+=this.npcs[i].GetCurrentX();
		            npcinfostring+=";";
		            npcinfostring+=this.npcs[i].GetCurrentY();
		            if((i+1)<this.npcs.length){
						npcinfostring+=";";
					}
					*/
		        }
       		}
			/*
			msg = {type: "GetNPC"};
			window.socket.send(JSON.stringify(msg));
			*/
			msg = {type: "ObtainP1Input"}
			window.socket.send(JSON.stringify(msg));
		} 
		else if(window.player === "Player1"){
			
			var npcinfostring;
			
			if (this.npcs!=null){
	        	for(var i = 0; i < this.npcs.length; i++)
		        {
		            this.npcs[i].UpdatePosition(deltaTime);
		            /*
		            npcinfostring+=this.npcs[i].GetCurrentX();
		            npcinfostring+=";";
		            npcinfostring+=this.npcs[i].GetCurrentY();
		            if((i+1)<this.npcs.length){
						npcinfostring+=";";
					}
					*/
		        }
       		}
       		/*
       		msg = {type: "UpdateNPC" , npcinfo: npcinfostring};
			window.socket.send(JSON.stringify(msg));
			*/
			msg = {type: "ObtainP2Input"}
			window.socket.send(JSON.stringify(msg));
		}
        //Si el jugador 2 ha disparado se para momentáneamente el sonido del juego con esta función
        if(this.player2 !== undefined) {
			this.player2.StopGameSound();
			this.player2.NoBullets();
			}
    }
    
    WorkNPC(){
		if(window.player === "Player2"){
			
			var npcinfostring;
			
			if (this.npcs!=null){
	        	for(var i = 0; i < this.npcs.length; i++)
		        {
		            npcinfostring+=this.npcs[i].GetDead();
		            //if((i+1)<this.npcs.length){
						npcinfostring+=";";
					//}
		        }
       		}
			
			var msg = {type: "GetNPC", npcdead: npcinfostring};
			
			//var msg = {type: "GetNPC"};
			window.socket.send(JSON.stringify(msg));

		} 
		else if(window.player === "Player1"){
			
			var npcinfostring;
			
			if (this.npcs!=null){
	        	for(var i = 0; i < this.npcs.length; i++)
		        {
		            npcinfostring+=this.npcs[i].GetCurrentX();
		            npcinfostring+=";";
		            npcinfostring+=this.npcs[i].GetCurrentY();
		            npcinfostring+=";";
		            npcinfostring+=this.npcs[i].GetNextX();
		            npcinfostring+=";";
		            npcinfostring+=this.npcs[i].GetNextY();
		            npcinfostring+=";";
		            npcinfostring+=this.npcs[i].GetDir();
		            //if((i+1)<this.npcs.length){
						npcinfostring+=";";
					//}
		        }
       		}
       		
       		var msg = {type: "UpdateNPC" , npcinfo: npcinfostring};
			window.socket.send(JSON.stringify(msg));
			
		}
	}
    
    UpdateNPCOnline(component){
		
		if(component[0] === "npcinfo"){
				if (this.npcs!=null){
	        	for(var i = 0; i < this.npcs.length; i++)
		        {
		            this.npcs[i].SetCurrentX(parseFloat(component[1+i*5]));
		            this.npcs[i].SetCurrentY(parseFloat(component[2+i*5]));
		            this.npcs[i].SetNextX(parseFloat(component[3+i*5]));
		            this.npcs[i].SetNextY(parseFloat(component[4+i*5]));
		            this.npcs[i].SetDir(Math.floor(parseFloat(component[5+i*5])));
		        }
       		}
       	}else if(component[0] === "npcdead"){
				if (this.npcs!=null){
	        	for(var i = 0; i < this.npcs.length; i++)
		        {
		            if((this.npcs[i].GetDead()==0)&&(component[1+i])==="1"){
						this.npcs[i].KillCharacter();
					}
		        }
			   }
	}
    }
    
    CheckGameCondition(){
		var msg = {type: "checkGame"};
		window.socket.send(JSON.stringify(msg));
	}

    GoToEnding()
    {
		if (!this.scene.isActive("GameEndedMenuOnline")) {
			clearInterval(this.interval);
        this.gameSound.stop();
        this.scene.add("GameEndedMenuOnline", this.gameEndedMenu);
        this.scene.run("GameEndedMenuOnline");
        this.scene.pause();
        this.scene.remove("InfoMenuOnline");
        this.scene.remove("InfoMenuP1Online");
        
    }
    }
    
    randomNumberGenerator(){
		return this.randomizr.call();
	}


	splitmix32(a) {
	    return function() {
	      a |= 0; a = a + 0x9e3779b9 | 0;
	      var t = a ^ a >>> 16; t = Math.imul(t, 0x21f0aaad);
	          t = t ^ t >>> 15; t = Math.imul(t, 0x735a2d97);
	      return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
	    }
	}
	
    
	cyrb128(str) {
	    let h1 = 1779033703, h2 = 3144134277,
	        h3 = 1013904242, h4 = 2773480762;
	    for (let i = 0, k; i < str.length; i++) {
	        k = str.charCodeAt(i);
	        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
	        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
	        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
	        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
	    }
	    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
	    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
	    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
	    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
	    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
	    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
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

