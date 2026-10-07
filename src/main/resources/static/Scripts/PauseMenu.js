class PauseMenu extends Phaser.Scene
{
    constructor()
    {
        super({key:"PauseMenu"});
    }

    preload()
    {
        this.load.image("buttonPlaceholder", "./Sprites/bala.png");
        this.load.image("TrozoPapel", "./Sprites/trozopapel.png");
        this.load.audio("Paper", "./Sounds/paper.mp3");
    }

    create()
    {
        //Panel de transición y panel de background:
        this.panel = this.add.rectangle(0,0,this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(100);
        this.panel.alpha = 0;
        this.background = this.add.rectangle(0,0,this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(-1);
        this.background.alpha = 0.25;
        //Audio de los botones
        this.clickSound = this.scene.get('Game').clickSound;
        this.paperSound = this.sound.add("Paper");
        //Variables de escalado:
        var scale = 1;
        //Texto del menú de pausa:
        this.add.text(this.game.config.width/2, this.game.config.height/6, "Game has been paused", {font: "100px cursive", fill: "#FFFFFF"}).setStroke('#000000', 10).setOrigin(0.5,0.5);
        //Botón de continuar:
        this.continueButton = this.add.image(this.game.config.width/2, this.game.config.height/2 - 100, "TrozoPapel");
        this.continueButton.setScale(scale);
        this.continueButton.setAngle(180);
        this.continueButton.setInteractive();
        const continueText = this.add.text(this.game.config.width/2, 340, "Resume", {font: "50px cursive", fill: "0#000000"}).setOrigin(0.5,0.5);
        this.continueButton.on("pointerdown", this.ContinueGame.bind(this));
        this.continueButton.on("pointerover", function(event) 
        {
            this.paperSound.play();
            this.continueButton.setScale(scale * 1.25);
            continueText.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.continueButton.on("pointerout", function(event) 
        {
            this.continueButton.setScale(scale);
            continueText.setScale(scale);
            game.canvas.style.cursor = "crosshair";
        }.bind(this));
        //Botón de salir:
        this.exitButton = this.add.image(this.game.config.width/2, this.game.config.height/2 + 100, "TrozoPapel");
        this.exitButton.setScale(scale);
        this.exitButton.setAngle(0);
        this.exitButton.setInteractive();
        const exitText = this.add.text(this.game.config.width/2, 560, "Main menu", {font: "50px cursive", fill: "0#000000"}).setOrigin(0.5,0.5);
        this.exitButton.on("pointerdown", function(){this.panel.alpha = 0.01;this.clickSound.play();}.bind(this));
        this.exitButton.on("pointerover", function(event) 
        {
            this.paperSound.play();
            this.exitButton.setScale(scale * 1.25);
            exitText.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.exitButton.on("pointerout", function(event) 
        {
            this.exitButton.setScale(scale);
            exitText.setScale(scale);
            game.canvas.style.cursor = "crosshair";
        }.bind(this));
        //Si se pulsa escape se considera que la acción que se quería hacer era continuar el juego:
        this.input.keyboard.on("keydown", function(event) 
        {
            if(event.key === "Escape") this.ContinueGame();
        }.bind(this));
    }

    update()
    {
        if(this.panel.alpha >= 0.01) 
        {
            this.panel.alpha += game.loop.delta/500;
            if(this.panel.alpha >= 1) this.GoToMainMenu();
        }
    }

    ContinueGame()
    {
        this.clickSound.play();
        this.scene.resume("Game");
        this.scene.get("Game").gameSound.resume();
        game.canvas.style.cursor = "crosshair";
        this.scene.resume("InfoMenu");
        this.scene.stop();
    }

    GoToMainMenu()
    {
        this.scene.start("MainMenu");
        this.scene.remove("Game");
        this.scene.remove("CustomizationP1Menu");
        this.scene.remove("CustomizationP2Menu");
        this.scene.remove("InfoMenu");
        this.scene.remove("PauseMenu")
        this.scene.remove();
    }
}