class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super({key:"MainMenu", active: true});
    }

    preload()
    {
        this.load.image("buttonPlaceholder", "./Sprites/bala.png");
        this.load.image("Background", "./Sprites/fondohacker.png");
        this.load.image("BackgroundBlack", "./Sprites/fondohackernegro.png");
        this.load.image("Tutorial", "./Sprites/tutorial.png");
        this.load.image("Titulo","./Sprites/titulo.png")
        this.load.audio("Hacker", "./Sounds/hacker.mp3");
        this.load.audio("Click", "./Sounds/click.mp3");

                //Ropa
                this.load.spritesheet("BanadorRojo", "./Sprites/Clothing/banador_rojo.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("BanadorAzul", "./Sprites/Clothing/banador_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("BanadorAmarillo", "./Sprites/Clothing/banador_amarillo.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("VaquerosAzul", "./Sprites/Clothing/vaqueros_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("VaquerosNegros", "./Sprites/Clothing/vaqueros_negros.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("VaquerosRojos", "./Sprites/Clothing/vaqueros_rojos.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("FaldaRoja", "./Sprites/Clothing/falda_roja.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("FaldaNaranja", "./Sprites/Clothing/falda_naranja.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("FaldaVerde", "./Sprites/Clothing/falda_verde.png", {frameWidth: 250, frameHeight: 450});
        
                this.load.spritesheet("GorrolanaAzul", "./Sprites/Clothing/gorrolana_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("GorrolanaRojo", "./Sprites/Clothing/gorrolana_rojo.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("GorrolanaAmarillo", "./Sprites/Clothing/gorrolana_amarillo.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("GorraAzul", "./Sprites/Clothing/gorra_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("GorraRoja", "./Sprites/Clothing/gorra_roja.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("GorraVerde", "./Sprites/Clothing/gorra_verde.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("SombreroMarron", "./Sprites/Clothing/sombrero_marron.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("SombreroAzul", "./Sprites/Clothing/sombrero_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("SombreroNegro", "./Sprites/Clothing/sombrero_negro.png", {frameWidth: 250, frameHeight: 450});
        
                this.load.spritesheet("CamisaAzul", "./Sprites/Clothing/camisa_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("CamisaBlanca", "./Sprites/Clothing/camisa_blanca.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("CamisaRoja", "./Sprites/Clothing/camisa_roja.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("CamisetaRosa", "./Sprites/Clothing/camiseta_rosa.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("CamisetaVerde", "./Sprites/Clothing/camiseta_verde.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("CamisetaAmarilla", "./Sprites/Clothing/camiseta_amarilla.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("TanktopAmarillo", "./Sprites/Clothing/tanktop_amarillo.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("TanktopAzul", "./Sprites/Clothing/tanktop_azul.png", {frameWidth: 250, frameHeight: 450});
                this.load.spritesheet("TanktopRojo", "./Sprites/Clothing/tanktop_rojo.png", {frameWidth: 250, frameHeight: 450});
    }

    create()
    {
		//Arrays con los spritesheets
        this.spritesheetsHat = [undefined,"GorrolanaAzul","GorrolanaRojo","GorrolanaAmarillo","GorraRoja","GorraVerde","GorraAzul","SombreroMarron","SombreroNegro","SombreroAzul"];
        this.spritesheetsTop = [undefined,"CamisaAzul","CamisaBlanca","CamisaRoja","CamisetaVerde","CamisetaRosa","CamisetaAmarilla","TanktopRojo","TanktopAzul","TanktopAmarillo"];
        this.spritesheetsBot = [undefined,"BanadorRojo","BanadorAzul","BanadorAmarillo","VaquerosAzul","VaquerosNegros","VaquerosRojos","FaldaRoja","FaldaVerde","FaldaNaranja"];

        game.canvas.style.cursor = "auto";
        //Background y panel de transición:
        this.panel = this.add.rectangle(0,0,this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(100);
        this.backgroundImage1 = this.add.image(0,0,"Background").setOrigin(0,0);
        this.backgroundImage2 = this.add.image(this.game.config.width,0,"Background").setOrigin(0,0);
        this.backgroundBlack = this.add.image(0,0,"BackgroundBlack").setOrigin(0,0);
        this.title = this.add.image(this.game.config.width/2 - 800 , this.game.config.height/2 - 450,"Titulo").setOrigin(0,0)
        //this.title.setTint(0x9DFF61);
        //Audio de los botones
        this.clickSound = this.sound.add("Click");
        this.hackerSound = this.sound.add("Hacker");
        //Botón para jugar offline:
        var scale = 0.55;
        this.StartButtonOffline = this.add.image(this.game.config.width/2, this.game.config.height/2, "buttonPlaceholder");
        this.StartButtonOffline.setScale(scale);
        this.StartButtonOffline.setInteractive();
        this.add.text(700, 410, "Play\nOffline", {font: "50px Courier", fill: "#ffffff"});
        this.startGameOffline = false;
        this.StartButtonOffline.on("pointerdown", function(){this.startGameOffline = true;this.clickSound.play();}.bind(this));
        this.StartButtonOffline.on("pointerover", function(event) 
        {
            this.hackerSound.play();
            this.StartButtonOffline.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.StartButtonOffline.on("pointerout", function(event) 
        {
            this.StartButtonOffline.setScale(scale);
            game.canvas.style.cursor = "auto";
        }.bind(this));
        //Botón para jugar online:
        this.StartButtonOnline = this.add.image(this.game.config.width/2, this.game.config.height/2 - 150, "buttonPlaceholder");
        this.StartButtonOnline.setScale(scale);
        this.StartButtonOnline.setInteractive();
        this.add.text(700, 260, "Play\nOnline", {font: "50px Courier", fill: "#ffffff"});
        this.startGameOnline = false;
        this.StartButtonOnline.on("pointerdown", function(){this.startGameOnline = true;this.clickSound.play();}.bind(this));
        this.StartButtonOnline.on("pointerover", function(event) 
        {
            this.hackerSound.play();
            this.StartButtonOnline.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.StartButtonOnline.on("pointerout", function(event) 
        {
            this.StartButtonOnline.setScale(scale);
            game.canvas.style.cursor = "auto";
        }.bind(this));
        //Botón para los créditos:
        this.creditsButton = this.add.image(this.game.config.width/2, this.game.config.height/2 + 150, "buttonPlaceholder");
        this.creditsButton.setScale(scale);
        this.creditsButton.setInteractive();
        this.add.text(690, 580, "Credits", {font: "50px Courier", fill: "#ffffff"});
        this.goToCredits = false;
        this.creditsButton.on("pointerdown", function(){this.clickSound.play();this.PlayCredits();}.bind(this));
        this.creditsButton.on("pointerover", function(event) 
        {
            this.hackerSound.play();
            this.creditsButton.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.creditsButton.on("pointerout", function(event) 
        {
            this.creditsButton.setScale(scale);
            game.canvas.style.cursor = "auto";
        }.bind(this));
        //Botón para dificultad:
        this.NPCButton = this.add.image(this.game.config.width/2, this.game.config.height/2 + 300, "buttonPlaceholder");
        this.NPCButton.setScale(scale);

        this.NPCButton.setInteractive();
        this.add.text(685, 730, "NPC Number", {font: "40px Courier", fill: "#ffffff"});
        this.NPCButton.on("pointerdown", function(){this.clickSound.play(); this.GoToNPCNumber();}.bind(this));
        this.NPCButton.on("pointerover", function(event) 
        {
            this.hackerSound.play();
            this.NPCButton.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.NPCButton.on("pointerout", function(event) 
        {
            this.NPCButton.setScale(scale);
            game.canvas.style.cursor = "auto";
        }.bind(this));
        
        //Botón TUTORIAL:
        this.TutorialButton = this.add.image(this.game.config.width/2-650, this.game.config.height/2 + 300+50, "buttonPlaceholder");
        this.TutorialButton.setScale(scale);
        this.TutorialButton.setInteractive();
        this.add.text(688-650, 730+50, "HOW TO PLAY", {font: "36px Courier", fill: "#ffffff"});
        this.TutorialButton.on("pointerover", function(event) 
        {
		this.tutorialImage.setAlpha(1);
        }.bind(this));
        this.TutorialButton.on("pointerout", function(event) 
        {
this.tutorialImage.setAlpha(0);
        }.bind(this));
        this.tutorialImage = this.add.image(0,0,"Tutorial").setOrigin(0,0).setAlpha(0);
        
        //Jugador
      	this.boxText = this.add.rectangle(30,330,450, 170, 0x001F00).setOrigin(0,0).setAlpha(1);
        this.userText = this.add.text(50, 350, "User:"+window.userName, {font: "35px Courier", fill: "#FFFFFF"});
        this.gamesText = this.add.text(50, 400, "Games played: "+window.numGames, {font: "35px Courier", fill: "#FFFFFF"});
        this.playersText = this.add.text(50, 450, "Current players: "+window.numPlayers, {font: "35px Courier", fill: "#FFFFFF"});
        if (window.userName == null)
        {
			this.boxText.setAlpha(0);
			this.userText.text = ""	;
			this.gamesText.text = "" ;	
			this.playersText.text = "" ;	
		}
    }

    update(time, deltaTime)
    {
		if (window.userName == null){
			this.boxText.setAlpha(0);
			this.userText.text = ""	;
			this.gamesText.text = "" ;
			this.playersText.text = "" ;
		}else{
			this.boxText.setAlpha(1);
			this.userText.text = "User: "+window.userName;	
			if (window.numGames == null){
				this.gamesText.text = ""	;
			}else{
				this.gamesText.text = "Games played: "+window.numGames;
			}
			if (window.numPlayers == null){
				this.playersText.text = ""	;
			}else{
				this.playersText.text = "Current players: "+window.numPlayers;
			}
		}
		
		
		
		
        this.backgroundImage1.setPosition(this.backgroundImage1.x-0.05*deltaTime,0)
        this.backgroundImage2.setPosition(this.backgroundImage2.x-0.05*deltaTime,0)
        if (this.backgroundImage1.x<-this.game.config.width){
            this.backgroundImage1.setPosition(this.backgroundImage2.x+this.game.config.width,0)
        }
        if (this.backgroundImage2.x<-this.game.config.width){
            this.backgroundImage2.setPosition(this.backgroundImage1.x+this.game.config.width,0)
        }
        if(!this.startGameOffline && !this.goToCredits && !this.startGameOnline) this.panel.alpha -= deltaTime/500;
        else 
        {
            this.panel.alpha += deltaTime/500;
            if(this.panel.alpha >= 1 && this.startGameOffline) this.StartGameOffline();
            else if(this.panel.alpha >= 1 && this.startGameOnline) {
				this.StartGameOnline();
				this.startGameOnline = false;
				}
            else if(this.panel.apha >= 1 && this.goToCredits) this.PlayCredits();
        }
    }

    StartGameOffline()
    {
        this.scene.get("NPCNumber").ToggleVisibility(false);
        this.scene.pause("NPCNumber");
        this.scene.add("CustomizationP1Menu",new CustomizationP1Menu());
        this.scene.start("CustomizationP1Menu");
    }

    PlayCredits()
    {
        this.scene.stop();
        this.scene.add("Credits", new Credits());
        this.scene.start("Credits");
    }

    GoToNPCNumber()
    {
        this.scene.stop();
        this.scene.get("NPCNumber").ToggleVisibility(true);
        this.scene.resume("NPCNumber");
    }
    
        
    StartGameOnline()
    {
		var mensaje = { type: "assignPlayer" };
    	window.socket.onmessage = (event) => this.LoadScene(event);
    	window.socket.send(JSON.stringify(mensaje));
	}	
	
	LoadScene(event){
		var playerType = event.data;
		this.scene.get("NPCNumber").ToggleVisibility(false);
        this.scene.pause("NPCNumber");
		if(playerType === "Player1") 
		{
			window.player = "Player1";
        	this.scene.add("CustomizationP1MenuOnline",new CustomizationP1MenuOnline());
        	this.scene.start("CustomizationP1MenuOnline");
			console.log("Jugador 1 asignado");
		}
		else if(playerType === "Player2")
		{
			window.player = "Player2";
			this.scene.add("CustomizationP2MenuOnline",new CustomizationP2MenuOnline());
        	this.scene.start("CustomizationP2MenuOnline");
			console.log("Jugador 2 asignado");
		} 
	}
}