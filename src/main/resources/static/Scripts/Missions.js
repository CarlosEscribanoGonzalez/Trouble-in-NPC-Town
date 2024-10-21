class Missions extends Phaser.GameObjects.Group
{
    constructor(numMission, player1, scene)
    {
        super({key:"Missions"})
        this.mission = numMission;
        this.player1 = player1;
        this.scene = scene;
        //Mision 1: visitar esquinas
        this.corners = [{name: 'UpLeft', x: 0, y: 0 },{name: 'UpRight', x: game.config.width, y: 0 },{ name: 'DownLeft' ,x: 0, y: game.config.height },{name: 'DownRight', x: game.config.width, y: game.config.height }];
        this.visited = {UpLeft: false, UpRight: false, DownLeft: false, DownRight: false};
        //Misiones 2, 3, 4 y 5: contadores y movimiento
        this.timeLeft = 60000;
        this.timePerforming = 30000; 
        //Misiones 6 y 7: zonas pobladas
        this.crowdMin = this.scene.scene.get("NPCNumber").minNPC/10; //Mínimo de NPCs para considerar que el jugador está en una multitud
        this.timeInCrowd = 30000; //Van a ser 30 segundos
        //Misión 8: stalkeo de NPC
        this.currentTarget;
        this.timeStalked = 30000;
        this.followingDistance = 75;
    }

    CheckMission()
    {
        switch(this.mission)
        {
            case 1:
                this.Mission1();
                break;
            case 2:
                this.Mission2();
                break;
            case 3:
                this.Mission3();
                break;
            case 4:
                this.Mission4();
                break;
            case 5:
                this.Mission5();
                break;
            case 6:
                this.Mission6();
                break;
            case 7:
                this.Mission7();
                break;
            case 8:
                this.Mission8();
                break;
        }
    }

    Mission1() //Si el jugador visita las 4 esquinas del mapa gana
    {
        var allVisited = true;
        this.corners.forEach((corner) => 
        { 
            this.CheckCorner(corner);
            if(!this.visited[corner.name]) allVisited = false;
        });
        
        if(allVisited)
        {
            this.player1.missionAccomplished = true;
        }
    }

    CheckCorner(corner)
    {
        var margen = 200; //Margen para dar pie a que las coordenadas sean correctas 
        if(
            this.player1.body.x >= corner.x - margen &&
            this.player1.body.x <= corner.x + margen &&
            this.player1.body.y >= corner.y - margen &&
            this.player1.body.y <= corner.y + margen
        ) this.visited[corner.name] = true;
    }

    Mission2() //Si el jugador 1 está en movimiento durante un total de un minuto gana
    {
        if (this.player1.direction !== "Quieto") 
        {
            this.timeLeft -= game.loop.delta;
            if(this.timeLeft <= 0) this.player1.missionAccomplished = true;
        } 
        //console.log(this.timeLeft);
    }

    Mission3() //Si el jugador 1 está quieto durante un total de un minuto gana
    {
        if (this.player1.direction === "Quieto") 
        {
            this.timeLeft -= game.loop.delta;
            if(this.timeLeft <= 0) this.player1.missionAccomplished = true;
        }
        //console.log(this.timeLeft);
    }

    Mission4() //Si el jugador se queda quieto durante 30 segundos de seguido sin parar gana
    {
        if(this.player1.direction === "Quieto")
        {
            this.timePerforming -= game.loop.delta;
            if(this.timePerforming <= 0) this.player1.missionAccomplished = true;
        } 
        else this.timePerforming = 30000;
        //console.log(this.timePerforming);
    }

    Mission5() //Si el jugador se mueve durante 30 segundos de seguido sin parar gana
    {
        if(this.player1.direction !== "Quieto")
        {
            this.timePerforming -= game.loop.delta;
            if(this.timePerforming <= 0) this.player1.missionAccomplished = true;
        } 
        else this.timePerforming = 30000;
        //console.log(this.timePerforming);
    }

    Mission6() //Si el jugador permanece en una multitud durante 30 segundos de seguido gana
    {
        let crowd = 0;
        this.scene.npcs.forEach((objeto)=>
        { //Calcula la distancia entre el jugador y cada NPC
            var distanceNPC = Phaser.Math.Distance.Between(this.player1.body.x,this.player1.body.y, objeto.body.x,objeto.body.y)
            if(distanceNPC <= 100)//Si la distancia es menor o igual a 100, se suma 1 a la variable crowd, que representa la aglomeración
            {  
                crowd++;
            }
        })
        if(crowd >= this.crowdMin)
        { 
            if(this.timeInCrowd<=0) this.player1.missionAccomplished = true;    
        } 
        else this.timeInCrowd = 30000; 
        //console.log(this.timeInCrowd);
    }

    Mission7() //Si el jugador se mantiene alejado de cualquier multitud durante 30 segundos de seguido gana
    {
        let crowd = 0;
        this.scene.npcs.forEach((objeto)=>
        { //Calcula la distancia entre el jugador y cada NPC
            var distanceNPC = Phaser.Math.Distance.Between(this.player1.body.x,this.player1.body.y, objeto.body.x,objeto.body.y);
            if(distanceNPC <= 100)
            {  
                crowd++;
            }
        })
        if(crowd < this.crowdMin)
        { //Si el jugador está cerca de 2 o más NPCs, ya se considera aglomeración y comienza la misión (le pongo 2 porque como los movimientos son aleatorios es complicado ya de por sí)
            this.timeInCrowd -= game.loop.delta;
            if(this.timeInCrowd<=0) this.player1.missionAccomplished = true;    
        } 
        else this.timeInCrowd = 30000; 
        //console.log(this.timeInCrowd);
    }

    Mission8() //Si el jugador 1 sigue muy de cerca a un NPC al azar durante más de 30 segundos gana
    {
        if(this.currentTarget === undefined || Phaser.Math.Distance.Between(this.player1.body.x,this.player1.body.y, this.currentTarget.body.x,this.currentTarget.body.y) > this.followingDistance)
        {
            this.timeStalked = 30000;
            this.SetCurrentTarget();
        } 
        else
        {
            this.timeStalked -= game.loop.delta;
            if(this.timeStalked <= 0) this.player1.missionAccomplished = true;
        }
        //console.log(this.timeStalked);
    }

    SetCurrentTarget()
    {
        let minDistance = 10000;
        this.scene.npcs.forEach((npc) =>
        {
            var distanceNPC = Phaser.Math.Distance.Between(this.player1.body.x,this.player1.body.y, npc.body.x,npc.body.y);
            if(distanceNPC < minDistance)
            {
                minDistance = distanceNPC;
                this.currentTarget = npc;
            }
        });
    }
}