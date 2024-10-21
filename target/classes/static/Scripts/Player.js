class Player extends Phaser.GameObjects.Group
{
    constructor(initialX, initialY, scene, spriteSheet, hat, top, bottom, deadSprite)
    {
        super({key: "Player"});
        //Skin:
        this.body = scene.add.sprite(initialX, initialY, spriteSheet).setScale(0.25); //Imagen del jugador
        if(hat !== undefined) this.hat = scene.add.sprite(initialX, initialY, hat).setScale(0.25);
        else this.hat = undefined;
        if(top !== undefined) this.top = scene.add.sprite(initialX, initialY, top).setScale(0.25);
        else this.top = undefined;
        if(bottom !== undefined) this.bottom = scene.add.sprite(initialX, initialY, bottom).setScale(0.25);
        else this.bottom = undefined;
        //Lógica:
        this.scene = scene;
        this.speed = 45;
        this.direction = "Quieto"; //Dirección en la que camina. Se inicializa con Quieto por el contador.
        this.currentInput; //Input correspondiente a la dirección actual
        this.killed = false; //Si está vivo o no
        this.missionAccomplished = false;
        //Gestión de clicks para ser eliminado:
        this.deadSprite = deadSprite;
        scene.physics.add.existing(this.body);
        scene.physics.world.enable(this.body);
        this.body.setInteractive();
        this.body.on('pointerdown',function(pointer)
        {
            this.KillCharacter();
        }.bind(this));
    }

    ManageInput(scene) //Añade al evento keydown la función de detección de direcciones del jugador
    {
        scene.input.keyboard.on('keydown', function (event)
        {
            if(event.key === 'w' && this.currentInput !== 'w') //Con currentInput se hace que sólo se registre una vez la pulsación
            {
                this.direction = "Arriba";
                this.currentInput = event.key;
                this.body.anims.play("Character_back_walk");
                if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_back_walk");
                if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_back_walk");
                if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_back_walk");
            }
            else if (event.key === 's' && this.currentInput !== 's')
            {
                this.direction = "Abajo";
                this.currentInput = event.key;
                this.body.anims.play("Character_front_walk");
                if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_front_walk");
                if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_front_walk");
                if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_front_walk");
            }
            else if (event.key === 'a' && this.currentInput !== 'a')
            {
                this.direction = "Izquierda";
                this.currentInput = event.key;
                this.body.anims.play("Character_left_walk");
                if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_left_walk");
                if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_left_walk");
                if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_left_walk");
            }
            else if (event.key === 'd' && this.currentInput !== 'd')
            {
                this.direction = "Derecha";
                this.currentInput = event.key;
                this.body.anims.play("Character_right_walk");
                if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_right_walk");
                if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_right_walk");
                if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_right_walk");
            };
        }.bind(this));
    }

    StopMovement(scene) //Añade al eveneto keyup la detención de movimiento del jugador
    {
        scene.input.keyboard.on('keyup', function(event)
        {
            if(this.currentInput === event.key) //Sólo se para si la tecla que ha dejado de pulsarse es la que hacia que se moviese
            {
                this.direction = "Quieto";
                if(this.currentInput === 'w')
                {
                    this.body.anims.play("Character_idle_back");
                    if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_idle_back");
                    if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_idle_back");
                    if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_idle_back");
                } 
                else if(this.currentInput === 'a') 
                {
                    this.body.anims.play("Character_idle_left");
                    if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_idle_left");
                    if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_idle_left");
                    if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_idle_left");
                }
                else if(this.currentInput === 's')
                { 
                    this.body.anims.play("Character_idle_front");
                    if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_idle_front");
                    if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_idle_front");
                    if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_idle_front");
                }
                else if(this.currentInput === 'd') 
                {
                    this.body.anims.play("Character_idle_right");
                    if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_idle_right");
                    if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_idle_right");
                    if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_idle_right");
                }
                this.currentInput = "Sin input";
            }
        }.bind(this))
    }

    UpdatePosition(deltaTime) //Actualiza la posición del jugador
    {
        if (this.direction === 'Arriba' && this.body.y > 0)
        {
            this.body.y-= this.speed * deltaTime/1000;
            if(this.hat !== undefined) this.hat.y-= this.speed * deltaTime/1000;
            if(this.top !== undefined) this.top.y-= this.speed * deltaTime/1000;
            if(this.bottom !== undefined) this.bottom.y-= this.speed * deltaTime/1000;
        }
		else if (this.direction === "Abajo" && this.body.y < game.config.height) 
        {
            this.body.y+= this.speed * deltaTime/1000;
            if(this.hat !== undefined) this.hat.y+= this.speed * deltaTime/1000;
            if(this.top !== undefined) this.top.y+= this.speed * deltaTime/1000;
            if(this.bottom !== undefined) this.bottom.y+= this.speed * deltaTime/1000;
        }
		else if (this.direction === "Izquierda" && this.body.x > 0) 
        {
            this.body.x-= this.speed * deltaTime/1000;
            if(this.hat !== undefined) this.hat.x-= this.speed * deltaTime/1000;
            if(this.top !== undefined) this.top.x-= this.speed * deltaTime/1000;
            if(this.bottom !== undefined) this.bottom.x-= this.speed * deltaTime/1000;
        }
		else if (this.direction === "Derecha" && this.body.x < game.config.width)
        {
            this.body.x+= this.speed * deltaTime/1000;
            if(this.hat !== undefined) this.hat.x+= this.speed * deltaTime/1000;
            if(this.top !== undefined) this.top.x+= this.speed * deltaTime/1000;
            if(this.bottom !== undefined) this.bottom.x+= this.speed * deltaTime/1000;
        }
        this.body.depth = this.body.y; //Cuanto más abajo está mayor nivel de profundidad para que se vea por encima de los que están más arriba
        if(this.hat !== undefined) this.hat.depth = this.body.depth;
        if(this.top !== undefined) this.top.depth = this.body.depth;
        if(this.bottom !== undefined) this.bottom.depth = this.body.depth;
    }

    KillCharacter()
    {
        this.scene.add.sprite(this.body.x, this.body.y, this.deadSprite).setScale(0.25);
        this.killed = true;
        this.body.setVisible(false);
        if(this.hat !== undefined) this.hat.setVisible(false);
        if(this.top !== undefined) this.top.setVisible(false);
        if(this.bottom !== undefined) this.bottom.setVisible(false);
    }
}