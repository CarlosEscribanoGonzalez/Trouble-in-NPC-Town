class NPC2 extends Phaser.GameObjects.Group
{
    constructor(initialX, initialY, scene, character, hat, top, bottom, deadSprite)
    {
        super({key: "NPC2"});
		//Skin:
		this.body = scene.add.sprite(initialX, initialY, character).setScale(0.25); //Imagen del NPC
		if(hat !== undefined) this.hat = scene.add.sprite(initialX, initialY, hat).setScale(0.25);
        else this.hat = undefined;
        if(top !== undefined) this.top = scene.add.sprite(initialX, initialY, top).setScale(0.25);
        else this.top = undefined;
        if(bottom !== undefined) this.bottom = scene.add.sprite(initialX, initialY, bottom).setScale(0.25);
        else this.bottom = undefined;
		//Lógica:
		this.scene = scene;
		this.speed = 45;
		this.anim = true;
        this.nextX = this.body.x; //Próxima posición en x
        this.nextY = this.body.y; //Próxima posición en y
        this.calculatingPosition = false; //Indica si el NPC está quieto calculando cuál va a ser su próxima posición
		//Gestión de clicks para ser eliminados:
		this.deadSprite = deadSprite;
		this.dead = 0;
		scene.physics.add.existing(this.body);
		if (window.player==="Player2"){
			this.body.setInteractive();
		}
     
        this.body.on('pointerdown',function(pointer)
		{
            this.KillCharacter();
        }.bind(this));
    }

    CalculateNextPosition() //Calcula la próxima posición del NPC
    {
        // 0 - arriba; 1 - derecha; 2 - abajo; 3 - izquierda
		//this.direction = Math.floor(Math.random() * 4)
		this.direction = Math.floor(this.scene.randomNumberGenerator() * 4)
		//El NPC se mueve una distancia aleatoria de entre 10 y 200 posiciones en la posición determinada
		//var distance = Math.floor(Math.random() * (200-10+1) + 10);
		var distance = Math.floor(this.scene.randomNumberGenerator() * (200-10+1) + 10);
		//Se determina la siguiente posición:
		if(this.direction === 0) this.nextY = this.body.y - distance; //Hay que recordar que en HTML5 el 0 equivale a la parte superior del canvas
		else if(this.direction === 1) this.nextX = this.body.x + distance;
		else if(this.direction === 2) this.nextY = this.body.y + distance;
		else if(this.direction === 3) this.nextX = this.body.x - distance;
		//Los enemigos ahora han podido salirse de la pantalla si han calculado una posición fuera del canvas.
		//Se invierte su movimiento (si por ejemplo querían salirse hacia arriba caminando 30 pasos ahora caminan 30 pasos hacia abajo)
		if(this.nextX < 0) {this.nextX = this.body.x + distance; this.direction = 1;}
		else if(this.nextX > game.config.width) {this.nextX = this.body.x - distance; this.direction = 3}
		else if(this.nextY < 0) {this.nextY = this.body.y + distance; this.direction = 2}
		else if(this.nextY > game.config.height) {this.nextY = this.body.y - distance; this.direction = 0}
		this.calculatingPosition = false;
		//Se anima:
		if(this.nextY > this.body.y && this.direction === 2) 
		{
			this.body.anims.play("Character_front_walk");
			if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_front_walk");
            if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_front_walk");
            if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_front_walk");
		}
		else if(this.nextY < this.body.y && this.direction === 0) 
		{
			this.body.anims.play("Character_back_walk");
			if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_back_walk");
            if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_back_walk");
            if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_back_walk");
		}
		else if(this.nextX > this.body.x && this.direction === 1) 
		{
			this.body.anims.play("Character_right_walk");
			if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_right_walk");
            if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_right_walk");
            if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_right_walk");
		}
		else if(this.nextX < this.body.x && this.direction === 3) 
		{
			this.body.anims.play("Character_left_walk");
			if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_left_walk");
            if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_left_walk");
            if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_left_walk");
		}
    }

    UpdatePosition(deltaTime) //Actualiza la posición de los enemigos
    {
        if(this.body.x < this.nextX && this.direction === 1)
		{
			this.body.x += this.speed * deltaTime/1000;
			if(this.hat !== undefined) this.hat.x+= this.speed * deltaTime/1000;
            if(this.top !== undefined) this.top.x+= this.speed * deltaTime/1000;
            if(this.bottom !== undefined) this.bottom.x+= this.speed * deltaTime/1000;
		}
		else if(this.body.x > this.nextX && this.direction === 3) 
		{
			this.body.x -= this.speed * deltaTime/1000;
			if(this.hat !== undefined) this.hat.x-= this.speed * deltaTime/1000;
            if(this.top !== undefined) this.top.x-= this.speed * deltaTime/1000;
            if(this.bottom !== undefined) this.bottom.x-= this.speed * deltaTime/1000;
		}
		else if(this.body.y < this.nextY && this.direction === 2) 
		{
			this.body.y+= this.speed * deltaTime/1000;
			if(this.hat !== undefined) this.hat.y+= this.speed * deltaTime/1000;
            if(this.top !== undefined) this.top.y+= this.speed * deltaTime/1000;
            if(this.bottom !== undefined) this.bottom.y+= this.speed * deltaTime/1000;
		}
		else if(this.body.y > this.nextY && this.direction === 0) 
		{
			this.body.y-= this.speed * deltaTime/1000;
			if(this.hat !== undefined) this.hat.y-= this.speed * deltaTime/1000;
            if(this.top !== undefined) this.top.y-= this.speed * deltaTime/1000;
            if(this.bottom !== undefined) this.bottom.y-= this.speed * deltaTime/1000;
		}
		else //Si el NPC ya ha llegado a su destino se esperará un intervalo aleatorio de tiempo (corto) antes de elegir su nueva ruta
		{
			if(!this.calculatingPosition)
			{
				this.calculatingPosition = true;
				//var randomTime = Math.floor(Math.random() * 1500); //Tiempo entre 0 y 1.5 segundos
				var randomTime = Math.floor(this.scene.randomNumberGenerator() * 1500);
				setTimeout(this.CalculateNextPosition.bind(this), randomTime);
				if(this.direction === 0)
				{
					this.body.anims.play("Character_idle_back");
					if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_idle_back");
                    if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_idle_back");
                    if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_idle_back");
				}
				else if(this.direction === 1) 
				{
					this.body.anims.play("Character_idle_right");
					if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_idle_right");
                    if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_idle_right");
                    if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_idle_right");
				}
				else if(this.direction === 2) 
				{
					this.body.anims.play("Character_idle_front");
					if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_idle_front");
                    if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_idle_front");
                    if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_idle_front");
				}
				else if(this.direction === 3) 
				{
					this.body.anims.play("Character_idle_left");
					if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_idle_left");
                    if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_idle_left");
                    if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_idle_left");
				}
			}
		}	
		this.body.depth = this.body.y;
		if(this.hat !== undefined) this.hat.depth = this.body.depth;
        if(this.top !== undefined) this.top.depth = this.body.depth;
        if(this.bottom !== undefined) this.bottom.depth = this.body.depth;	
    }
    
    UpdatePosition3() //Actualiza la posición de los enemigos
    {
			if(this.hat !== undefined) this.hat.x= this.body.x;
            if(this.top !== undefined) this.top.x= this.body.x;
            if(this.bottom !== undefined) this.bottom.x= this.body.x;
            
            if(this.hat !== undefined) this.hat.y= this.body.y;
            if(this.top !== undefined) this.top.y= this.body.y;
            if(this.bottom !== undefined) this.bottom.y= this.body.y;
		
		this.body.depth = this.body.y;
		if(this.hat !== undefined) this.hat.depth = this.body.depth;
        if(this.top !== undefined) this.top.depth = this.body.depth;
        if(this.bottom !== undefined) this.bottom.depth = this.body.depth;	
		
    }
    UpdatePosition2(deltaTime) //Actualiza la posición de los enemigos
    {
		if (this.anim==true){
		if(this.nextY > this.body.y && this.direction === 2) 
		{
			this.body.anims.play("Character_front_walk");
			if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_front_walk");
            if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_front_walk");
            if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_front_walk");
            this.anim=false;
		}
		else if(this.nextY < this.body.y && this.direction === 0) 
		{
			this.body.anims.play("Character_back_walk");
			if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_back_walk");
            if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_back_walk");
            if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_back_walk");
            this.anim=false;
		}
		else if(this.nextX > this.body.x && this.direction === 1) 
		{
			this.body.anims.play("Character_right_walk");
			if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_right_walk");
            if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_right_walk");
            if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_right_walk");
            this.anim=false;
		}
		else if(this.nextX < this.body.x && this.direction === 3) 
		{
			this.body.anims.play("Character_left_walk");
			if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_left_walk");
            if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_left_walk");
            if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_left_walk");
            this.anim=false;
		}
		}
		
        if(this.body.x < this.nextX && this.direction === 1)
		{
			this.body.x += this.speed * deltaTime/1000;
		}
		else if(this.body.x > this.nextX && this.direction === 3) 
		{
			this.body.x -= this.speed * deltaTime/1000;
		}
		else if(this.body.y < this.nextY && this.direction === 2) 
		{
			this.body.y+= this.speed * deltaTime/1000;
		}
		else if(this.body.y > this.nextY && this.direction === 0) 
		{
			this.body.y-= this.speed * deltaTime/1000;
		}
		else //Si el NPC ya ha llegado a su destino se esperará un intervalo aleatorio de tiempo (corto) antes de elegir su nueva ruta
		{
			this.anim=true;
				if(this.direction === 0)
				{
					this.body.anims.play("Character_idle_back");
					if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_idle_back");
                    if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_idle_back");
                    if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_idle_back");
				}
				else if(this.direction === 1) 
				{
					this.body.anims.play("Character_idle_right");
					if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_idle_right");
                    if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_idle_right");
                    if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_idle_right");
				}
				else if(this.direction === 2) 
				{
					this.body.anims.play("Character_idle_front");
					if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_idle_front");
                    if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_idle_front");
                    if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_idle_front");
				}
				else if(this.direction === 3) 
				{
					this.body.anims.play("Character_idle_left");
					if(this.hat !== undefined) this.hat.anims.play(this.hat.texture.key + "_idle_left");
                    if(this.top !== undefined) this.top.anims.play(this.top.texture.key + "_idle_left");
                    if(this.bottom !== undefined) this.bottom.anims.play(this.bottom.texture.key + "_idle_left");
				}
			}
		
			if(this.hat !== undefined) this.hat.x= this.body.x;
            if(this.top !== undefined) this.top.x= this.body.x;
            if(this.bottom !== undefined) this.bottom.x= this.body.x;
		    if(this.hat !== undefined) this.hat.y= this.body.y;
            if(this.top !== undefined) this.top.y= this.body.y;
            if(this.bottom !== undefined) this.bottom.y= this.body.y;
		this.body.depth = this.body.y;
		if(this.hat !== undefined) this.hat.depth = this.body.depth;
        if(this.top !== undefined) this.top.depth = this.body.depth;
        if(this.bottom !== undefined) this.bottom.depth = this.body.depth;	
    }

	KillCharacter()
	{
		this.dead = 1;
		this.scene.add.sprite(this.body.x, this.body.y, this.deadSprite).setScale(0.25);
		this.body.setVisible(false);
		if(this.hat !== undefined) this.hat.setVisible(false);
        if(this.top !== undefined) this.top.setVisible(false);
        if(this.bottom !== undefined) this.bottom.setVisible(false);
	}
	
	GetCurrentX(){
		return this.body.x;
	}
	
	GetCurrentY(){
		return this.body.y;
	}
	
	SetCurrentX(val){
		this.body.x=val;
	}
	
	SetCurrentY(val){
		this.body.y=val;
	}
	
	GetDir(){
		return this.direction;
	}
	
	SetDir(val){
		this.direction=val;
	}
	
	GetNextX(){
		return this.nextX;
	}
	
	SetNextX(val){
		this.nextX=val;
	}
	
	GetNextY(){
		return this.nextY;
	}
	
	SetNextY(val){
		this.nextY=val;
	}
	
	GetDead(){
		return this.dead;
	}
	

}