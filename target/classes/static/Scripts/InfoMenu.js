class InfoMenu extends Phaser.Scene
{
    constructor()
    {
        super({key:"InfoMenu"});
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
            game.canvas.style.cursor = "crosshair";
        });
        //Texto:
        var textStyle = 
        {
            fontFamily: "cursive",
            color: "#000000",
            wordWrap: {width: 220, height: 50, useAdvancedWrap: true}
        }
        var hint1Text = "-> " + this.scene.get('Game').hint1.text;
        this.hint1 = this.add.text(1335,175, hint1Text, textStyle).setVisible(false);
        var hint2Text = "-> " + this.scene.get('Game').hint2.text;
        this.hint2 = this.add.text(1335,250, hint2Text, textStyle).setVisible(false);
        var hint3Text = "-> " + this.scene.get('Game').hint3.text;
        this.hint3 = this.add.text(1335,325, hint3Text, textStyle).setVisible(false);
    }

    update()
    {
        
    }

    ToggleInfo()
    {
        this.paperSound.play();
        this.info.setVisible(!this.info.visible);
        this.hint1.setVisible(!this.hint1.visible);
        this.hint2.setVisible(!this.hint2.visible);
        this.hint3.setVisible(!this.hint3.visible);
        
    }
}