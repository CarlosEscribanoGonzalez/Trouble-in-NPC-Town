class InfoMenuOnline extends Phaser.Scene
{
    constructor(numHat, numTop, numBot, fakeHint)
    {
        super({key:"InfoMenuOnline"});
        this.numHat = numHat;
        this.numTop = numTop;
        this.numBot = numBot;
        this.fakeHint = fakeHint;
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
        //Hints:
        var hintType = [1,2,3];
        hintType.splice(Math.floor(Math.random()*3),1);
        var firstHint = this.GenerateHint(hintType[0]);
        var secondHint = this.GenerateHint(hintType[1]);
        var falseHint = this.fakeHint;
        this.hints = [firstHint, secondHint, falseHint];
        for(var i=0; i<this.hints.length; i++)
        {
            var rep = this.hints[i];
            var otheri = Math.floor(Math.random()*this.hints.length);
            this.hints[i]= this.hints[otheri]
            this.hints[otheri] = rep;
        }
        this.hint1 = this.add.text(1335,175, "-> " + this.hints[0], textStyle).setVisible(false);
        this.hint2 = this.add.text(1335,250, "-> " + this.hints[1], textStyle).setVisible(false);
        this.hint3 = this.add.text(1335,325, "-> " + this.hints[2], textStyle).setVisible(false);
                
    }

    ToggleInfo()
    {
        this.paperSound.play();
        this.info.setVisible(!this.info.visible);
        this.hint1.setVisible(!this.hint1.visible);
        this.hint2.setVisible(!this.hint2.visible);
        this.hint3.setVisible(!this.hint3.visible);
    }
    
    GenerateHint(hintType){

        const hintHat1 = ["no hat","a wool hat","a cap","a hat"];
        const hintTop1 = ["no shirt","a shirt","a t-shirt","a tank top"];
        const hintBot1 = ["no pants","swim trunks","jeans","a skirt"];
        const hintHat2 = ["no hat","a blue wool hat","a red wool hat","a yellow wool hat","a red cap","a green cap","a blue cap","a brown hat","a black hat","a blue hat"];
        const hintTop2 = ["no shirt","a blue shirt","a white shirt","a red shirt","a green t-shirt","a pink t-shirt","a yellow t-shirt","a red tank top","a blue tank top","a yellow tank top"];
        const hintBot2 = ["no pants","red swim trunks","blue swim trunks","yellow swim trunks","blue jeans","black jeans","red jeans","a red skirt","a green skirt","an orange skirt"];
        
        
        const hintQuality = Math.round(Math.random()); //0 no detail 1 every detail

        var genHint = "somethin"+hintQuality+"__"+hintType;
        if (hintQuality==1){
            switch(hintType){
                case 1:
                    genHint = hintHat2[this.numHat];
                break;
                case 2:
                    genHint = hintTop2[this.numTop];
                break;
                case 3:
                    genHint = hintBot2[this.numBot];
                break;
            }
        }else{
            switch(hintType){
                case 1:
                    genHint = hintHat1[Math.ceil(this.numHat/3.1)];
                break;
                case 2:
                    genHint = hintTop1[Math.ceil(this.numTop/3.1)];
                break;
                case 3:
                    genHint = hintBot1[Math.ceil(this.numBot/3.1)];
                break;
            }
        }
        
        var finalHint;

        switch(Math.floor(Math.random()*4)){
            case 0:
                const firstLetterHint = genHint.charAt(0)
                const firstLetterCap = firstLetterHint.toUpperCase()
                const remainingHint = genHint.slice(1)
                finalHint = firstLetterCap + remainingHint + ", kill them." ;
            break;
            case 1:
                finalHint = "The enemy wears " + genHint + "." ;
            break;
            case 2:
                finalHint = "Your objective has " + genHint + "." ;
            break;
            case 3:
                finalHint = "Look for " + genHint + "." ;
            break;
        }

        return finalHint;
    }
}