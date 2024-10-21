class GameEndedMenu extends Phaser.Scene
{
    constructor()
    {
        super({key: "GameEndedMenu"});
    }

    preload()
    {
        this.load.image("buttonPlaceholder", "./Sprites/bala.png");
        this.load.image("TrozoPapel", "./Sprites/trozopapel.png");
        this.load.audio("Paper","./Sounds/paper.mp3");
    }

    create()
    {
		this.host = window.location.host;
        if(window.userName != null) this.UpdateUser();
        //Jugadores:
        this.player1 = this.scene.get("Game").player;
        this.player2 = this.scene.get("Game").player2;
        //Panel de transición y panel de background:
        this.panel = this.add.rectangle(0,0,this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(100);
        this.panel.alpha = 0;
        this.background = this.add.rectangle(0,0,this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(-1);
        this.background.alpha = 0.25;
        this.mainMenuPressed = false;
        this.playAgainPressed = false;
        //Audio
        this.clickSound = this.scene.get('Game').clickSound;
        this.paperSound = this.sound.add("Paper");
        var scale = 1;
        //Botón de volver a jugar:
        this.playAgainButton = this.add.image(this.game.config.width/2, this.game.config.height/2 - 50, "TrozoPapel");
        this.playAgainButton.setScale(scale);
        this.playAgainButton.setAngle(180);
        this.playAgainButton.setInteractive();
        const playAgainText = this.add.text(this.game.config.width/2, 390, "Play again", {font: "35px cursive", fill: "0#000000"}).setOrigin(0.5,0.5);
        this.playAgainButton.on("pointerdown", function()
        {
            this.playAgainPressed = true;
            this.clickSound.play();
            this.panel.alpha = 0.01;
        }.bind(this));
        this.playAgainButton.on("pointerover", function(event) 
        {
            this.paperSound.play();
            this.playAgainButton.setScale(scale * 1.25);
            playAgainText.setScale(1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.playAgainButton.on("pointerout", function(event) 
        {
            this.playAgainButton.setScale(scale);
            playAgainText.setScale(1);
            game.canvas.style.cursor = "crosshair";
        }.bind(this));
        //Botón de volver al menú:
        this.returnToMenuButton = this.add.image(this.game.config.width/2, this.game.config.height/2 + 150, "TrozoPapel");
        this.returnToMenuButton.setScale(scale);
        this.returnToMenuButton.setRotation(0);
        this.returnToMenuButton.setInteractive();
        const returnToMenuText = this.add.text(this.game.config.width/2, 610, "Main menu", {font: "35px cursive", fill: "0#000000"}).setOrigin(0.5,0.5);
        this.returnToMenuButton.on("pointerdown", function()
        {
            this.mainMenuPressed = true;
            this.clickSound.play();
            this.panel.alpha = 0.01;
        }.bind(this));
        this.returnToMenuButton.on("pointerover", function(event) 
        {
            this.paperSound.play();
            this.returnToMenuButton.setScale(scale * 1.25);
            returnToMenuText.setScale(1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.returnToMenuButton.on("pointerout", function(event) 
        {
            this.returnToMenuButton.setScale(scale);
            returnToMenuText.setScale(1);
            game.canvas.style.cursor = "crosshair";
        }.bind(this));
        //Texto de victoria:
        var victoryText;
        if(!this.scene.get("Game").player.killed) victoryText = "PLAYER 1 WINS";
        else victoryText = "PLAYER 2 WINS";
        this.add.text(this.game.config.width/2, this.game.config.height/8, victoryText, {font: "100px cursive", fill: "#FFFFFF"}).setStroke('#000000', 10).setOrigin(0.5,0.5);
        if(this.player1.killed)
        {
            this.add.text(this.game.config.width/2, this.game.config.height*2/8, "Player 1 was brutally shot", {font: "75px cursive", fill: "#FFFFFF"}).setStroke('#000000', 10).setOrigin(0.5,0.5);
        }
        else if(this.player2.bullets == 0)
        {
            this.add.text(this.game.config.width/2, this.game.config.height*2/8, "Player 2 can't aim properly", {font: "75px cursive", fill: "#FFFFFF"}).setStroke('#000000', 10).setOrigin(0.5,0.5);
        }
        else if(this.player1.missionAccomplished)
        {
            this.add.text(this.game.config.width/2, this.game.config.height*2/8, "Player 1 accomplished his mission", {font: "75px cursive", fill: "#FFFFFF"}).setStroke('#000000', 10).setOrigin(0.5,0.5);
        }
    }

    update()
    {
        if(this.panel.alpha >= 0.01) this.panel.alpha += game.loop.delta/500;
        
        if(this.panel.alpha >= 1 && this.playAgainPressed) this.PlayAgain();
        else if(this.panel.alpha >= 1 && this.mainMenuPressed) this.ReturnToMenu();
    }

    PlayAgain()
    {
        this.scene.run("InfoMenu");
        this.scene.remove("Game");
        this.scene.remove("InfoMenu");
        this.scene.remove("PauseMenu");
        this.scene.start("CustomizationP1Menu");
        this.scene.remove("CustomizationP2Menu");
        this.scene.remove("GameEndedMenu");
    }

    ReturnToMenu()
    {
        this.scene.start("MainMenu");
        this.scene.remove("Game");
        this.scene.remove("CustomizationP1Menu");
        this.scene.remove("CustomizationP2Menu");
        this.scene.remove("InfoMenu");
        this.scene.remove("PauseMenu")
        this.scene.remove();
    }
    
    UpdateUser()
    {
		var newNumGames = window.numGames + 1;
		$.ajax({
			method: "PUT",
			url: "http://" + window.ip + "/UpdateNumGames/" + window.userName,
			data: JSON.stringify(newNumGames),
			processData: false,
			headers: {"Content-type": "application/json"},
			success: function(response) {
                window.numGames = response;
                document.getElementById("NumGames").innerHTML = window.numGames;
            },
            error: function(error) {
                // Manejar errores
                console.error("No se ha podido actualizar el número de partidas", error);
            }
		});
	}
}