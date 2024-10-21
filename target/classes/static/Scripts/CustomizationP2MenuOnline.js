class CustomizationP2MenuOnline extends Phaser.Scene
{
    constructor()
    {
        super({key: "CustomizationP2MenuOnline"});
    }

    preload()
    {
        //Audio:
        this.load.audio("Click", "./Sounds/click.mp3");
        this.load.audio("Error","./Sounds/error.mp3");
        this.load.audio("Paper","./Sounds/paper.mp3");
        //Imágenes:
        this.load.image("StartButton", "./Sprites/startgame.png");
        this.load.image("TrozoPapel", "./Sprites/trozopapel.png");
        this.load.image("Player2Customizes", "./Sprites/player2customizes.png");
        this.load.image("HojaCuaderno", "./Sprites/hojacuaderno.png");
        this.load.image("RandomButton", "./Sprites/dado.png");
        this.load.image("SniperRifle", "./Sprites/rifle_de_francotirador.png");
        this.load.image("GrenadeLauncher", "./Sprites/lanzagranadas.png");
        this.load.image("Wanted", "./Sprites/wanted.png")
    }

    create()
    {
        this.clickSound = this.sound.add("Click");
        this.paperSound = this.sound.add("Paper");
        this.errorSound = this.sound.add("Error");
        this.cameras.main.setBackgroundColor('#FFFFFF')
        this.waigintForP1 = false;
        const hoja = this.add.image(((this.game.config.width*(0.2)/2)),(this.game.config.height*(0.7))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hoja.setScale(1.7).setAngle(30);
        const hoja2 = this.add.image(((this.game.config.width*(1.3)/2)),(this.game.config.height*(1.35))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hoja2.setScale(1.75,1.75).setAngle(-60);
        const hoja4 = this.add.image(((this.game.config.width*(1.35)/2)),(this.game.config.height*(0.35))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hoja4.setScale(1.75,1.75).setAngle(68);
        //const hoja3 = this.add.image(((this.game.config.width*(0.2)/2)),(this.game.config.height*(2.4))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        //hoja3.setScale(1.7).setAngle(-60);
        const hoja3 = this.add.image(((this.game.config.width*(0.6)/2)),(this.game.config.height*(1))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hoja3.setScale(-1.75,1.75).setAngle(-6);
        this.cartel = this.add.image(((this.game.config.width-400)),(this.game.config.height*(1))/2, "Wanted").setScale(0.5);

        //Boton confirmar
        this.goToGame = false;
        const confirmButton = this.add.image(this.game.config.width/2, this.game.config.height*1.75/2, "TrozoPapel").setOrigin(0.5,0.5).setDepth(53).setScale(0.8);
        confirmButton.setInteractive();
        const confirmText = this.add.text(this.game.config.width/2, this.game.config.height*1.78/2, "START GAME", {font: "bold 55px cursive", fill: "0#000000"}).setOrigin(0.5,0.5).setDepth(54).setScale(0.8);
        confirmButton.on("pointerdown", function()
        {
            this.clickSound.play();
            if ( this.weaponSelected!=undefined){
                this.clickSound.play();
                this.goToGame = true;
                } else{
                    this.errorSound.play();
                }
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
        const confirm = this.add.image(((this.game.config.width*(1)/2)),(this.game.config.height*(1+0.8))/2, "StartButton").setDepth(53);
        this.InteractButton(confirm)
        this.goToGame = false;
        confirm.on("pointerdown", function(event) 
        {
            if ( this.weaponSelected!=undefined){
            this.clickSound.play();
            this.goToGame = true;
            } else{
                this.errorSound.play();
            }
        }.bind(this));
        */
        //Armas

        this.weaponSelected;

        const weaponText = this.add.text(((this.game.config.width*(1-0.4)/2)),(this.game.config.height*(1-0.8+0.3))/2, "CHOOSE YOUR WEAPON", { font: '36px cursive', fill: '#ff0000' }).setOrigin(0.5,0.5).setAngle(-4);
        const weapon1box = this.add.rectangle(((this.game.config.width*(1-0.22-0.4)/2)),(this.game.config.height*(1-0.15+0.25))/2,((this.game.config.width*(0.85)/4)),(this.game.config.height*(0.9))/2,0x000000,1).setAlpha(0.001);
        const weapon2box = this.add.rectangle(((this.game.config.width*(1+0.22-0.4)/2)),(this.game.config.height*(1-0.15+0.25))/2,((this.game.config.width*(0.85)/4)),(this.game.config.height*(0.9))/2,0x000000,1).setAlpha(0.001);
        const weapon1img = this.add.image(((this.game.config.width*(1-0.22-0.4)/2)),(this.game.config.height*(1-0.4+0.25))/2, "SniperRifle").setOrigin(0.5,0.5).setScale(0.5);
        const weapon2img = this.add.image(((this.game.config.width*(1+0.22-0.4)/2)),(this.game.config.height*(1-0.4+0.25))/2, "GrenadeLauncher").setOrigin(0.5,0.5).setScale(0.5);
        const weapon1name = this.add.text(((this.game.config.width*(1-0.22-0.4)/2)),(this.game.config.height*(1-0.2+0.3))/2, "SNIPER RIFLE", { font: '30px cursive', fill: '#000000' }).setOrigin(0.5,0.5);
        const weapon2name = this.add.text(((this.game.config.width*(1+0.22-0.4)/2)),(this.game.config.height*(1-0.2+0.3))/2, "GRENADE LAUNCHER", { font: '30px cursive', fill: '#000000' }).setOrigin(0.5,0.5);
        const weapon1desc = this.add.text(((this.game.config.width*(1-0.22-0.4)/2)),(this.game.config.height*(1-0.15+0.3))/2, "This weapon has a five-round magazine. Each shot will kill the character you are aiming at.", { font: '26px cursive', fill: '#000000',wordWrap: { width: 340 },align: 'justify' }).setOrigin(0.5,0);
        const weapon2desc = this.add.text(((this.game.config.width*(1+0.22-0.4)/2)),(this.game.config.height*(1-0.15+0.3))/2, "It has three bullets. A single shot can kill every character in the impact area.", { font: '26px cursive', fill: '#000000',wordWrap: { width: 340 },align: 'justify' }).setOrigin(0.5,0);

        this.InteractButton2(weapon1box)
        weapon1box.on("pointerdown", function(event) 
        {
            this.clickSound.play();
            weapon1box.setFillStyle(0x66cc4d);
            weapon1box.setAlpha(1);
            weapon2box.setFillStyle(0x000000);
            weapon2box.setAlpha(0.001);
            this.weaponSelected="F";
        }.bind(this));

        this.InteractButton2(weapon2box)
        weapon2box.on("pointerdown", function(event) 
        {
            this.clickSound.play();
            weapon2box.setFillStyle(0x66cc4d);
            weapon2box.setAlpha(1);
            weapon1box.setFillStyle(0x000000);
            weapon1box.setAlpha(0.001);
            this.weaponSelected="LG";
        }.bind(this));

        const hojaIzq = this.add.image(((this.game.config.width*(0.6)/2)),(this.game.config.height*(1))/2, "HojaCuaderno").setOrigin(0.5,0.5);
        hojaIzq.setScale(-1.75,1.75).setAngle(-6);
        //hojaDer.setBlendMode(Phaser.BlendModes.MULTIPLY);
        hojaIzq.setBlendMode(Phaser.BlendModes.MULTIPLY);
        //alerta inicial
        this.alertTime = 0;
        this.alertBox = this.add.rectangle(0,0, this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(59);
        const title = this.add.image(((this.game.config.width*(1)/2)),(this.game.config.height*(0.17))/2, "Player2Customizes").setOrigin(0.5,0.5);
        title.setScale(1);
    }

    update()
    {
        
        if (this.alertTime>0) {this.alertTime-=game.loop.delta}
        if (this.alertTime<=0 && !this.waigintForP1){
            if (this.alertBox.alpha>0){this.alertBox.alpha-=game.loop.delta/1500}
        }
        if(this.goToGame)
        {
            this.alertBox.alpha += game.loop.delta/500;
            if(this.alertBox.alpha >= 1 && !this.waigintForP1) 
            {
				this.GoToGame();
				this.waigintForP1 = true;
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

    InteractButton2(button){
        button.setInteractive();
        button.input.alwaysEnabled = true;
        button.on("pointerover", function(event) 
        {
            if(button.fillColor!=0x66cc4d){
                button.setAlpha(0.3);
            }
        }.bind(this));
        button.on("pointerout", function(event) 
        {
            if(button.fillColor!=0x66cc4d){
                button.setAlpha(0.001);
            }
        }.bind(this));
    }

 
    GoToGame()
    {   
		var msg = {type: "InitializeP2", weapon: this.weaponSelected};
        window.socket.send(JSON.stringify(msg));
        this.CheckPlayersReady();
        this.interval = setInterval(() => this.CheckPlayersReady(), 1000);
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
			this.scene.start("GameOnline");
			this.scene.stop("CustomizationP2MenuOnline");
		}
		else
		{
			this.alertText = this.add.text((this.game.config.width*(1)/2), (this.game.config.height*(1))/2 - 50, "WAITING FOR PLAYER 1", { font: '120px cursive', fill: '#ffffff',wordWrap: { width: 880 }}).setOrigin(0.5,0.5).setDepth(60);
       		this.proTip = this.add.text((this.game.config.width*(1)/2), (this.game.config.height*(1))/2 + 200, "Pro tip: look at him dead in the eye (if you aren't in the same room look at the nearest wall and cry)", { font: '40px cursive', fill: '#ffffff',wordWrap: { width: 800 }}).setOrigin(0.5,0.5).setDepth(60);
		}
	}
}