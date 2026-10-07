## Overview
Asymmetric 2-player browser game made with Phaser, where one player pretends to be an NPC and the other has to find and shoot them. 
The game uses a **Spring Boot** server with a **REST API** for user accounts and **WebSockets** for the real-time game logic.

An offline local multiplayer version of the game that can be played directly from the browser is available on [itch.io](https://karesito.itch.io/trouble-in-npc-town).

## How to play
* **Player 1:** customize your character, receive a mission and write a fake hint about yourself
<p align = "center">
  <img width="708" height="400" alt="Player 1 customization" src="https://github.com/user-attachments/assets/718702ac-c2aa-4f99-ae52-f863d5fc89b5" />
</p>

* **Player 2:** choose a weapon and receive three hints about Player 1, one of them written by Player 1 himself
<p align = "center">
  <img width="708" height="400" alt="Player 2 weapon selection" src="https://github.com/user-attachments/assets/56545bd5-a446-4794-9829-66ca3e0d25c7" />
</p>

* When both players are ready the game starts. Player 1 has to blend in with the many NPCs in the scene, and Player 2 must find them and shoot them dead
* The game ends if Player 2 runs out of bullets, Player 1 is killed or Player 1 completes their mission
* **Controls:** WASD (Player 1) and left click (Player 2)

## Features
**REST API: user accounts**
* Account creation, login and deletion
* User data persisted on the server, including stats such as the number of games played and victories
* Counter of players currently connected

**WebSockets: online multiplayer**
* Automatic assignment of the Player 1 and Player 2 roles to the first two clients that connect
* Both players are synchronized before the match starts, waiting for each other to finish their setup
* Real-time exchange of movement, shots and NPC state between the two players
* The server checks the end conditions and notifies both clients when the game is over

**Gameplay**
* Character customization with hats, tops and bottoms
* Eight different secret missions for Player 1
* Two different weapons for player 2
* Fake hint system that forces Player 2 to deduce which of the 3 received clues has been written by Player 1
* Randomly generated crowd of NPCs on every match, with a configurable amount of them 
<p align = "center">
  <img width="708" height="400" alt="Gameplay" src="https://github.com/user-attachments/assets/656f1d4d-095b-4266-90e2-82f010b95ed8" />
</p>

## Technologies
* JavaScript
* Phaser
* Java
* Spring Boot (REST API and WebSockets)

## How to run the game
1. Open the root folder of the project in a command prompt
2. Run `mvnw.cmd spring-boot:run` and wait for the server to start
3. On the host computer, open `localhost:8080` in the browser
4. On the other player's computer, open `IP:8080` in the browser, where `IP` is the host's IP address (visible with the `ipconfig` command)
