class CustomizationP1MenuOnline extends Phaser.Scene
{
    constructor()
    {
        super({key: "CustomizationP1MenuOnline"}); 
    }

    preload()
    {
        //Audios:
        this.load.audio("Click", "./Sounds/click.mp3");
        this.load.audio("Paper","./Sounds/paper.mp3");
        //UI:
        this.load.image("TrozoPapel", "./Sprites/trozopapel.png");
        this.load.image("Player1Customizes", "./Sprites/player1customizes.png");
        this.load.image("ArrowButton", "./Sprites/flechas.png");
        this.load.image("ConfirmButton", "./Sprites/confirm.png");
        this.load.image("RandomButton", "./Sprites/dado.png");
        this.load.image("PostIt", "./Sprites/postit1.png");
        this.load.image("HojaCuaderno", "./Sprites/hojacuaderno.png");
        this.load.spritesheet("SpriteSheet", "./Sprites/SpriteSheet.png", {frameWidth: 250, frameHeight: 450});
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
        //Audios:
        this.clickSound = this.sound.add("Click");
        this.paperSound = this.sound.add("Paper");
        //Decoración fondo
        this.waitingForP2 = false;
        this.cameras.main.setBackgroundColor('#FFFFFF')
        const hoja2 = this.add.image(((this.game.config.width*(0.2)/2)),(this.game.config.height*(0.3))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hoja2.setScale(1.7).setAngle(30);
        const hoja3 = this.add.image(((this.game.config.width*(1.7)/2)),(this.game.config.height*(0.3))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hoja3.setScale(1.7).setAngle(-10);
        const hoja1 = this.add.image(((this.game.config.width*(1)/2)),(this.game.config.height*(1))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hoja1.setScale(1.7).setFlipX(1).setAngle(-20);
        const hojaIzq1 = this.add.image(((this.game.config.width*(1.6)/2)),(this.game.config.height*(1.5))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hojaIzq1.setScale(1.5).setAngle(-4);
        const hojaDer1 = this.add.image(((this.game.config.width*(0.3)/2)),(this.game.config.height*(1.5))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hojaDer1.setScale(1.7).setAngle(3);
        
        // Crear sprites personaje
        this.spriteChar = this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, 'SpriteSheet')
        this.hatNum = 0;
        this.spriteHat = undefined;
        this.topNum = 0;
        this.spriteTop = undefined;
        this.botNum = 0;
        this.spriteBot = undefined;

        //Arrays con los spritesheets
        this.spritesheetsHat = this.scene.get("MainMenu").spritesheetsHat;
        this.spritesheetsTop = this.scene.get("MainMenu").spritesheetsTop;
        this.spritesheetsBot = this.scene.get("MainMenu").spritesheetsBot;
        //Boton gorro 1
        const changeHat1 = this.add.image(((this.game.config.width*(1+0.3)/2)),(this.game.config.height*(1-0.3))/2, "ArrowButton");
        this.InteractButton(changeHat1)
        changeHat1.on("pointerdown", function(event) 
        {
            this.PartChange(1,false);
        }.bind(this));
        //Boton gorro 2
        const changeHat2 = this.add.image(((this.game.config.width*(1+0.7)/2)),(this.game.config.height*(1-0.3))/2, "ArrowButton");
        changeHat2.setFlipX(1);
        this.InteractButton(changeHat2)
        changeHat2.on("pointerdown", function(event) 
        {
            this.PartChange(1,true);
        }.bind(this));
        //-----------------------------CUERPO
        //Boton cuerpo 1
        const changeTop1 = this.add.image(((this.game.config.width*(1+0.3)/2)),(this.game.config.height*(1-0.1))/2, "ArrowButton");
        this.InteractButton(changeTop1)
        changeTop1.on("pointerdown", function(event) 
        {
            this.PartChange(2,false);
        }.bind(this));
        //Boton cuerpo 2
        const changeTop2 = this.add.image(((this.game.config.width*(1+0.7)/2)),(this.game.config.height*(1-0.1))/2, "ArrowButton");
        changeTop2.setFlipX(1);
        this.InteractButton(changeTop2)
        changeTop2.on("pointerdown", function(event) 
        {
            this.PartChange(2,true);
        }.bind(this));
        //-----------------------------PIERNAS
        //Boton piernas 1
        const changeBot1 = this.add.image(((this.game.config.width*(1+0.3)/2)),(this.game.config.height*(1+0.1))/2, "ArrowButton");
        this.InteractButton(changeBot1)
        changeBot1.on("pointerdown", function(event) 
        {
            this.PartChange(3,false);
        }.bind(this));
        //Boton piernas 2
        const changeBot2 = this.add.image(((this.game.config.width*(1+0.7)/2)),(this.game.config.height*(1+0.1))/2, "ArrowButton");
        changeBot2.setFlipX(1);
        this.InteractButton(changeBot2)
        changeBot2.on("pointerdown", function(event) 
        {
            this.PartChange(3,true);
        }.bind(this));
        //Boton randomizador
        const changeRandom = this.add.image(((this.game.config.width*(1+0.7)/2)),(this.game.config.height*(1+0.4))/2, "RandomButton");
        this.InteractButton(changeRandom)
        changeRandom.on("pointerdown", function(event) 
        {
            this.ChangeRandom();
        }.bind(this));

        
        //Asignar y mostrar mision
        this.numMission = Math.floor(Math.random() * (8-1+1) + 1);
        const missionName = ["Voyager",
        "Hyperactivity",
        "Lazy ass b****",
        "Siesta andaluza",
        "Too much Redbull",
        "Explosion lover",
        "Explosion hater",
        "Stalker"]
        this.textMission = this.add.text((this.game.config.width*(1-0.85)/2), (this.game.config.height*(1+0.20))/2, "YOUR MISSION: " + missionName[this.numMission-1], { font: '30px cursive', fill: '#ff0000' }).setAngle(-2); 
        this.missionDesc = ["Visit every corner of the map.",
        "Keep moving during an entire minute in total.",
        "Stay still during an entire minute in total.",
        "Stay still during thirty seconds straight.",
        "Keep moving during thirty seconds straight.",
        "Be close to a multitude during thirty seconds straight.",
        "Stay away from any multitude during thirty seconds straight.",
        "Choose any NPC and follow it from a extremely close distance during thirty seconds straight."];
        this.missionObjective = this.add.text((this.game.config.width*(1-0.85)/2), (this.game.config.height*(1+0.30))/2, this.missionDesc[this.numMission-1], { font: '32px cursive', fill: '#000000', wordWrap: { width: 500 }}).setAngle(-2);
        
        //Decorar
        const hojaDer = this.add.image(((this.game.config.width*(1.6)/2)),(this.game.config.height*(1.5))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hojaDer.setScale(1.5).setAngle(-4).setDepth(52);
        const hojaIzq = this.add.image(((this.game.config.width*(0.3)/2)),(this.game.config.height*(1.5))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hojaIzq.setScale(1.7).setAngle(3);
        hojaDer.setBlendMode(Phaser.BlendModes.MULTIPLY);
        hojaIzq.setBlendMode(Phaser.BlendModes.MULTIPLY);
        
        //Boton confirmar
        this.goToGame = false;
        const confirmButton = this.add.image(this.game.config.width/2, this.game.config.height*1.75/2, "TrozoPapel").setOrigin(0.5,0.5).setDepth(53).setScale(0.8);
        confirmButton.setInteractive();
        const confirmText = this.add.text(this.game.config.width/2, this.game.config.height*1.78/2, "CONFIRM", {font: "bold 55px cursive", fill: "0#000000"}).setOrigin(0.5,0.5).setDepth(54).setScale(0.8);
        confirmButton.on("pointerdown", function()
        {
            this.clickSound.play();
            this.goToGame = true;
        }.bind(this));
        confirmButton.on("pointerover", function(event) 
        {
            this.paperSound.play();
            confirmButton.setScale(1);
            confirmText.setScale(1);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        confirmButton.on("pointerout", function(event) 
        {
            confirmButton.setScale(0.8);
            confirmText.setScale(0.8);
            game.canvas.style.cursor = "auto";
        }.bind(this));

        /*
        const confirm = this.add.image(((this.game.config.width*(1)/2)),(this.game.config.height*(1+0.8))/2, "ConfirmButton").setDepth(53);
        this.InteractButton(confirm)
        this.GoToGame = false;
        confirm.on("pointerdown", function(event) 
        {
            this.clickSound.play();
            if (this.alertText.alpha<1){
            this.GoToGame = true;
            }
        }.bind(this));
        */
        const postit = this.add.image(((this.game.config.width*(0.43)/2)),(this.game.config.height*(0.70))/2, "PostIt").setOrigin(0.5,0.5);
        postit.setScale(2,2).setAngle(0);

        // Introducir pista falsa
        this.textHint = this.add.text((this.game.config.width*(1-0.75)/2), (this.game.config.height*(1-0.45))/2, "LIE ABOUT YOURSELF :", { font: '24px cursive', fill: '#ff0000' });
        this.textHint.setAngle(2)
        this.writeHint = this.add.text((this.game.config.width*(1-0.81)/2), (this.game.config.height*(1-0.27))/2, "Write a fake hint here...", { font: '24px cursive', fill: '#000000', wordWrap: { width: 400 } }).setAlpha(0.4);
        this.fakeHint = this.add.text((this.game.config.width*(1-0.81)/2), (this.game.config.height*(1-0.27))/2, "", { font: '24px cursive', fill: '#000000', wordWrap: { width: 400 } });
        this.input.keyboard.on('keydown', event =>
        {
            if (event.keyCode === 8 && this.fakeHint.text.length > 0)
            {
                this.fakeHint.text = this.fakeHint.text.slice(0,this.fakeHint.text.length-1)
                if (this.fakeHint.text.length == 0){
                    this.writeHint.setAlpha(0.4);
                }
            }
            else if (event.keyCode === 32 || (event.keyCode >= 188 && event.keyCode <= 192) || (event.keyCode >= 48 && event.keyCode <= 90))
            {
            if (this.fakeHint.width < 380){
                this.fakeHint.text += event.key;
                this.writeHint.setAlpha(0);
            }
            }
        });

        const title = this.add.image(((this.game.config.width*(1)/2)),(this.game.config.height*(0.17))/2, "Player1Customizes").setOrigin(0.5,0.5);
        title.setScale(1);

        //alerta inicial
        this.alertTime = 0;
        this.alertBox = this.add.rectangle(0,0, this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(59);
    }

    update()
    {
        if (this.alertTime>0) {this.alertTime-=game.loop.delta}
        if (this.alertTime<=0){
            if (this.alertBox.alpha>0 && !this.waitingForP2){this.alertBox.alpha-= game.loop.delta/1500}
        }
        if(this.goToGame)
        {
            this.alertBox.alpha += game.loop.delta/500;
            if(this.alertBox.alpha >= 1 && !this.waitingForP2) 
            {
				this.GoToGame();
				this.waitingForP2 = true;
			}
        }
    }

    InteractButton(button){

        button.setInteractive();

        button.on("pointerover", function(event) 
        {
            button.setTint(0xffff1c00);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        button.on("pointerout", function(event) 
        {
            button.clearTint();
            game.canvas.style.cursor = "default";
        }.bind(this));
    }

    ChangeRandom(){
        this.clickSound.play();
        //Hat
        var randomHat = Math.floor(Math.random()*(this.spritesheetsHat.length));
        this.hatNum = randomHat;
        if (this.spriteHat!=undefined){this.spriteHat.destroy();}
        if ((this.hatNum)!=0)
                {
                    var newsprite = this.spritesheetsHat[this.hatNum]
                    this.spriteHat= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite).setDepth(50);
                }

        //Top
        var randomTop = Math.floor(Math.random()*(this.spritesheetsTop.length));
        this.topNum = randomTop;
        if (this.spriteTop!=undefined){this.spriteTop.destroy();}
        if ((this.topNum)!=0)
                {
                    var newsprite2 = this.spritesheetsTop[this.topNum]
                    this.spriteTop= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite2).setDepth(49);
                }
                
        //Bot
        var randomBot = Math.floor(Math.random()*(this.spritesheetsBot.length));
        this.botNum = randomBot;
        if (this.spriteBot!=undefined){this.spriteBot.destroy();}
        if ((this.botNum)!=0)
                {
                    var newsprite3 = this.spritesheetsBot[this.botNum]
                    this.spriteBot= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite3).setDepth(51);
                }
    }

    PartChange(part,add){
        this.clickSound.play();
        switch(part){

            case 1:
                if (add){
                this.hatNum+=1;
                } else { 
                    this.hatNum-=1; 
                    if (this.hatNum<0) {
                        this.hatNum = Math.abs((this.spritesheetsHat.length) + (this.hatNum))
                    }
                }

                this.hatNum = this.hatNum%(this.spritesheetsHat.length)

                if ((this.hatNum)==0)
                {
                    this.spriteHat.destroy();
                }else {
                    
                    var newsprite = this.spritesheetsHat[this.hatNum]
                    if (this.spriteHat!=undefined){this.spriteHat.destroy();}
                    this.spriteHat= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite).setDepth(50);
                }
            break;

            case 2:
                if (add){
                this.topNum+=1;
                } else { 
                    this.topNum-=1; 
                    if (this.topNum<0) {
                        this.topNum = Math.abs((this.spritesheetsTop.length) + (this.topNum))
                    }
                }

                this.topNum = this.topNum%(this.spritesheetsTop.length)

                if ((this.topNum)==0)
                {
                    this.spriteTop.destroy();
                }else {
                    
                    var newsprite = this.spritesheetsTop[this.topNum]
                    if (this.spriteTop!=undefined){this.spriteTop.destroy();}
                    this.spriteTop= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite).setDepth(49);
                }
            break;


            case 3:
                if (add){
                this.botNum+=1;
                } else { 
                    this.botNum-=1; 
                    if (this.botNum<0) {
                        this.botNum = Math.abs((this.spritesheetsBot.length) + (this.botNum))
                    }
                }

                this.botNum = this.botNum%(this.spritesheetsBot.length)

                if ((this.botNum)==0)
                {
                    this.spriteBot.destroy();
                }else {
                    
                    var newsprite = this.spritesheetsBot[this.botNum]
                    if (this.spriteBot!=undefined){this.spriteBot.destroy();}
                    this.spriteBot= this.add.sprite((this.game.config.width*(1+0.5))/2, (this.game.config.height*(1))/2, newsprite).setDepth(51);
                }
            break;
    	}
    }

    GoToGame()
    {
		var minNPC = this.scene.get("NPCNumber").minNPC;
        var maxNPC = this.scene.get("NPCNumber").maxNPC;
		this.numberNPC = Math.floor(Math.random() * (maxNPC-minNPC+1) + minNPC);
		this.seed=Math.random()*1000000;
		var msg = {type: "InitializeP1", mission: this.numMission, hat: this.hatNum, top: this.topNum, bot: this.botNum, hint: this.fakeHint.text, numNPC: this.numberNPC, seed: this.seed};
        window.socket.send(JSON.stringify(msg));
        this.CheckPlayersReady();
        this.interval = setInterval(() => this.CheckPlayersReady(), 100);
    }
    
    CheckPlayersReady()
    {
		var msg = {type: "PlayersReady"};
		window.socket.onmessage = (event) => this.StartGame(event);
		window.socket.send(JSON.stringify(msg));
	}
	
	StartGame(event)
	{
		var isReady = event.data;
		if(isReady == "true")
		{
			clearInterval(this.interval);
			this.scene.add("GameOnline", new GameOnline());
			this.scene.add("InfoMenuP1Online", new InfoMenuP1Online(this.missionDesc[this.numMission - 1]));
			this.scene.start("GameOnline");
			this.scene.stop("CustomizationP1MenuOnline");
		} 
		else
		{
			this.alertText = this.add.text((this.game.config.width*(1)/2), (this.game.config.height*(1))/2, "WAITING FOR PLAYER 2", { font: '120px cursive', fill: '#ffffff',wordWrap: { width: 880 }}).setOrigin(0.5,0.5).setDepth(60);
        	this.proTip = this.add.text((this.game.config.width*(1)/2) - 93, (this.game.config.height*(1))/2 + 200, "Pro tip: there's nothing you can do", { font: '40px cursive', fill: '#ffffff',wordWrap: { width: 800 }}).setOrigin(0.5,0.5).setDepth(60);
		}
	}
}