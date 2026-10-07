class InfoMenuP1Online extends Phaser.Scene
{
    constructor(missionText)
    {
        super({key:"InfoMenuP1Online"});
        this.missionText = missionText;
    }

    preload()
    {
        this.load.image("Info", "./Sprites/diario.png");
        this.load.image("Paper", "./Sprites/hoja2.png");
        this.load.audio("Paper","./Sounds/paper.mp3");
    }

    create()
    {
        //Audio
        this.paperSound = this.sound.add("Paper");
        //Botones
        this.infoButton = this.add.image(1535, 60, "Info").setScale(0.12).setInteractive(); //Botón de pistas del jugador
        this.info = this.add.image(1445, 175, "Paper").setScale(0.35);
        this.info.alpha = 0.85;
        this.info.setVisible(false);
        this.infoButton.on("pointerdown", this.ToggleInfo.bind(this));
        this.infoButton.on("pointerover", function(pointer)
        {
            game.canvas.style.cursor = "pointer";
        });
        this.infoButton.on("pointerout", function(pointer)
        {
            game.canvas.style.cursor = "default";
        });
        //Texto:
        var textStyle = 
        {
            fontFamily: "cursive",
            color: "#000000",
            wordWrap: {width: 220, height: 50, useAdvancedWrap: true}
        }
        this.text = this.add.text(1340,145, "Mission #1: Don't die (optional)", textStyle).setVisible(false);
    	this.text2 = this.add.text(1340,220, "Mission #2: Buy bread", textStyle).setVisible(false);
    	this.text3 = this.add.text(1340,295, "Mission #3: " + this.missionText, textStyle).setVisible(false);
    }

    ToggleInfo()
    {
        this.paperSound.play();
        this.info.setVisible(!this.info.visible);
        this.text.setVisible(!this.text.visible);
        this.text2.setVisible(!this.text2.visible);
        this.text3.setVisible(!this.text3.visible);
    }
}