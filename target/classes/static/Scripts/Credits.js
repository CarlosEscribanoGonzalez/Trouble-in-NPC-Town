class Credits extends Phaser.Scene
{
    constructor()
    {
        super({key:"Credits"});
    }

    preload()
    {
        this.load.image("buttonPlaceholder", "./Sprites/bala.png");
        this.load.image("BackgroundCredits", "./Sprites/credits.png");
        this.load.audio("Click", "./Sounds/click.mp3");
        this.load.audio("Hacker", "./Sounds/hacker.mp3");
    }

    create()
    {
        this.backgroundImage1 = this.add.image(0,0,"BackgroundCredits").setOrigin(0,0);
        this.clickSound = this.sound.add("Click");
        this.hackerSound = this.sound.add("Hacker");
        var scale = 0.4;
        this.backButton = this.add.image(this.game.config.width/2, this.game.config.height/2 + 300, "buttonPlaceholder");
        this.backButton.setScale(scale);
        this.backButton.setInteractive();
        this.add.text(740, 730, "Back", {font: "50px Courier", fill: "#ffffff"});
        this.backButton.on("pointerdown", function(){this.ReturnToMenu();}.bind(this));
        this.backButton.on("pointerover", function(event) 
        {
            this.hackerSound.play();
            this.backButton.setScale(scale * 1.25);
            game.canvas.style.cursor = "pointer";
        }.bind(this));
        this.backButton.on("pointerout", function(event) 
        {
            this.backButton.setScale(scale);
            game.canvas.style.cursor = "auto";
        }.bind(this));
    }

    update()
    {
    }

    ReturnToMenu()
    {
        this.clickSound.play();
        this.scene.stop();
        this.scene.start("MainMenu");
        this.scene.remove()
    }
}