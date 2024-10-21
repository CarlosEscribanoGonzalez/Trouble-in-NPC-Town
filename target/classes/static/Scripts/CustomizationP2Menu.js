class CustomizationP2Menu extends Phaser.Scene
{
    constructor(numMission,numHat,numTop,numBot,fakeHint)
    {
        super({key: "CustomizationP2Menu"});
        this.numMission = numMission;
        this.numHat = numHat;
        this.numTop = numTop;
        this.numBot = numBot;
        this.fakeHint = fakeHint;
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
    }

    create()
    {
        this.clickSound = this.sound.add("Click");
        this.paperSound = this.sound.add("Paper");
        this.errorSound = this.sound.add("Error");
        this.cameras.main.setBackgroundColor('#FFFFFF')
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


        //Generar pistas
        var hintType = [1,2,3];
        hintType.splice(Math.floor(Math.random()*3),1);



        //Pistas

        const hintText = this.add.text(((this.game.config.width*(1.4)/2)),(this.game.config.height*(1-0.8+0.25))/2, "INFO ABOUT YOUR OBJECTIVE", { font: '36px cursive', fill: '#ff0000', wordWrap: { width: 400 } }).setOrigin(0.5,0.5).setAngle(3);

        const postit3 = this.add.image(((this.game.config.width*(1.7)/2)),(this.game.config.height*(1.6))/2, "PostIt").setOrigin(0.5,0.5);
        postit3.setScale(1.8).setAngle(0);
        const postit2 = this.add.image(((this.game.config.width*(1.45)/2)),(this.game.config.height*(1.2))/2, "PostIt").setOrigin(0.5,0.5);
        postit2.setScale(1.8).setAngle(0);
        const postit1 = this.add.image(((this.game.config.width*(1.7)/2)),(this.game.config.height*(0.8))/2, "PostIt").setOrigin(0.5,0.5);
        postit1.setScale(1.8).setAngle(0);


        const firstHint = this.GenerateHint(hintType[0]);
        const secondHint = this.GenerateHint(hintType[1]);
        const falseHint = this.fakeHint;

        this.hints = [firstHint, secondHint, falseHint]

        ///Random orden
        for(var i=0; i<this.hints.length; i++){
            var rep = this.hints[i];
            var otheri = Math.floor(Math.random()*this.hints.length);
            this.hints[i]= this.hints[otheri]
            this.hints[otheri] = rep;
        }
        this.hint1 = this.add.text(((this.game.config.width*(1.7-0.22)/2)),(this.game.config.height*(1.6+0.03))/2, this.hints[0], { font: '21px cursive', fill: '#000000', wordWrap: { width: 500 }  })//*setScale(1.8/2);
        this.hint2 = this.add.text(((this.game.config.width*(1.45-0.22)/2)),(this.game.config.height*(1.2+0.03))/2, this.hints[1], { font: '21px cursive', fill: '#000000', wordWrap: { width: 500 }  })//*setScale(1.8/2);
        this.hint3 = this.add.text(((this.game.config.width*(1.7-0.22)/2)),(this.game.config.height*(0.8+0.03))/2, this.hints[2], { font: '21px cursive', fill: '#000000', wordWrap: { width: 500 }  })//*setScale(1.8/2);

        //alerta inicial
        this.alertTime = 1500;
        this.alertBox = this.add.rectangle(0,0, this.game.config.width*2, this.game.config.height*2, 0x000000).setDepth(59);
        this.alertText = this.add.text((this.game.config.width*(1)/2), (this.game.config.height*(1))/2, "PLAYER 1 DON'T LOOK", { font: '120px cursive', fill: '#ffffff',wordWrap: { width: 800 }}).setOrigin(0.5,0.5).setDepth(60);
        this.proTip = this.add.text((this.game.config.width*(1)/2 + 20), (this.game.config.height*(1))/2 + 200, "Pro tip: close only one eye so you can see player 2 election", { font: '40px cursive', fill: '#ffffff',wordWrap: { width: 800 }}).setOrigin(0.5,0.5).setDepth(60);
   
        const title = this.add.image(((this.game.config.width*(1)/2)),(this.game.config.height*(0.17))/2, "Player2Customizes").setOrigin(0.5,0.5);
        title.setScale(1);
    }

    update()
    {
        if (this.alertTime>0) {this.alertTime-=game.loop.delta}
        if (this.alertTime<=0){
            if (this.alertBox.alpha>0){this.alertBox.alpha-=game.loop.delta/1500}
            if (this.alertText.alpha>0){this.alertText.alpha-=game.loop.delta/1000}
            if (this.proTip.alpha > 0){this.proTip.alpha -= game.loop.delta/1000}
        }
        if(this.goToGame)
        {
            this.alertBox.alpha += game.loop.delta/500;
            if(this.alertBox.alpha >= 1) this.GoToGame();
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

    GoToGame()
    {   
        this.scene.add("Game", new Game(this.hint1,this.hint2,this.hint3));
        this.scene.add("Info", new InfoMenu);
        this.scene.add("Pause", new PauseMenu);
        this.scene.stop("CustomizationP2Menu");
        this.scene.start("Game");
        //this.scene.remove("CustomizationP2Menu");
    }

}