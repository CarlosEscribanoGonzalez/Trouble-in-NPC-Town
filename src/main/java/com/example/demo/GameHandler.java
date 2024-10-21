package com.example.demo;
import java.io.IOException;
import java.util.Random;

import org.json.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class GameHandler extends TextWebSocketHandler {
	//Asignación de jugadores:
	boolean p1Assigned = false;
	boolean p2Assigned = false;
	//Inicialización de jugadores:
	int mission;
	int hat;
	int top;
	int bot;
	int numNPC;
	int seed;
	String hint;
	float initialX;
	float initialY;
	//int numNPC;
	String weapon;
	//Jugadores preparados:
	boolean p1Ready = false;
	boolean p2Ready = false;
	boolean prueba = true;
	//Input de P1:
	String inputP1;
	String inputType;
	//Input de P2:
	float xPosP2;
	float yPosP2;
	boolean hasShot = false;
	//Game Condition:
	boolean playerKilled = false;
	boolean p1MissionAcomplished = false;
	boolean p2NoBullets = false;

	//NPC
	String npcinfo;
	String npcdead;

	//EndedMenu Conditions:
	boolean P1MM = false;
	boolean P2MM = false;

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());
		JSONObject json = new JSONObject(message.getPayload());
		String requestType = "";
		if(json.has("type")) { requestType = json.getString("type");}
		switch (requestType) 
		{
			case "assignPlayer":
				AssignPlayer(session);
				break;
			case "playerAvailable":
				PlayerAvailable(json);
				break;
			case "InitializeP1":
				InitializeP1(json);
				break;
			case "InitializeP2":
				InitializeP2(json);
				break;
			case "PlayersReady":
				StartGame(session);
				break;
			case "GetP1Info":
				GetP1Info(session);
				break;
			case "GetP2Info":
				GetP2Info(session);
				break;
			case "MoveP1":
				MoveP1(session, json);
				break;
			case "ObtainP1Input":
				ObtainP1Input(session);
				break;
			case "MoveP2":
				MoveP2(session, json);
				break;
			case "Shoot":
				Shoot(session, json);
				break;
			case "ObtainP2Input":
				ObtainP2Input(session);
				break;
			case "MissionAcomplished":
				MissionAcomplished(session, json);
				break;
			case "NoBullets":
				NoBullets(session,json);
				break;
			case "checkGame":
				CheckGame(session);
				break;
			case "RestoreValues":
				RestoreValues(json);
				break;
			case "UpdateNPC":
				UpdateNPC(session, json);
				break;
			case "GetNPC":
				GetNPC(session, json);
				break;
			case "UpdateNPCStart":
				UpdateNPCStart(json);
				break;
			case "GetNPCStart":
				GetNPCStart(json);
				break;
		}
	}
	
	private void AssignPlayer(WebSocketSession session) throws IOException 
	{
		String msg = "";
		if(!p1Assigned) {
			p1Assigned = true;
			msg = "Player1";
		}
		else if (!p2Assigned){
			p2Assigned = true;
			msg = "Player2";
		}
		session.sendMessage(new TextMessage(msg));
	}
	
	private void PlayerAvailable(JSONObject json) throws IOException 
	{
		String player = json.getString("player");
		if(player.equals("Player1")) 
		{
			p1Assigned = false;
			p1Ready = false;
		}
		else if(player.equals("Player2"))
		{
			p2Assigned = false;
			p2Ready = false;
		}
	}
	
	private void InitializeP1(JSONObject json)
	{
		mission = json.getInt("mission");
		hat = json.getInt("hat");
		top = json.getInt("top");
		bot = json.getInt("bot");
		hint = json.getString("hint");
		Random rand = new Random();
		initialX = rand.nextInt(1550) + 50;
		initialY = rand.nextInt(850) + 50;
		numNPC = json.getInt("numNPC");
		seed = json.getInt("seed");
		//numNPC = json.getInt("numNPC");
		p1Ready = true;
		p1Assigned = true;
	}
	
	private void InitializeP2(JSONObject json)
	{
		weapon = json.getString("weapon");
		p2Ready = true;
		p2Assigned = true;
	}
	
	private void StartGame(WebSocketSession session) throws IOException
	{
		String msg = "false";
		if(p1Ready && p2Ready) 
		{
			msg = "true";
		}
		session.sendMessage(new TextMessage(msg));
	}
	
	private void GetP1Info(WebSocketSession session) throws IOException
	{
		String msg = "p1;" + mission + ";" + hat + ";" + top + ";" + bot + ";" + initialX + ";" + initialY + ";" + hint + ";" + numNPC + ";" + seed;
		session.sendMessage(new TextMessage(msg));
	}
	
	private void GetP2Info(WebSocketSession session) throws IOException
	{
		String msg = "p2;" + weapon + ";" + hint;
		session.sendMessage(new TextMessage(msg));
	}
	
	private void MoveP1(WebSocketSession session, JSONObject json) throws IOException
	{
		inputP1 = json.getString("key");
		inputType = json.getString("inputType");
	}
	
	private void ObtainP1Input(WebSocketSession session) throws IOException
	{
		String msg = "movePlayer;" + this.inputP1 + ";" + this.inputType;
		if(this.inputP1 != null) session.sendMessage(new TextMessage(msg));
	}
	
	private void MoveP2(WebSocketSession session, JSONObject json) throws IOException
	{
		xPosP2 = json.getInt("x");
		yPosP2 = json.getInt("y");
	}
	
	private void Shoot(WebSocketSession session, JSONObject json) throws IOException
	{
		hasShot = true;
		playerKilled = json.getBoolean("playerKilled");
	}
	
	private void ObtainP2Input(WebSocketSession session) throws IOException
	{
		String msg = "movePlayer2;" + xPosP2 + ";" + yPosP2 + ";" + hasShot + ";" + playerKilled;
		if(hasShot) hasShot = false;
		session.sendMessage(new TextMessage(msg));
	}
	
	private void MissionAcomplished(WebSocketSession session, JSONObject json)throws IOException { //Para comprobar si se ha pasado la misión
		p1MissionAcomplished = json.getBoolean("p1MissionAcomplished");
	}
	
	private void NoBullets(WebSocketSession session, JSONObject json)throws IOException {
		
		    if(json.getInt("numBullets") <= 0) {
			p2NoBullets = true;
		    }
	}
	
	private void CheckGame(WebSocketSession session) throws IOException{
		String msg = "checkGame;" + playerKilled + ";" + p1MissionAcomplished + ";" + p2NoBullets;
		session.sendMessage(new TextMessage(msg));
	}
	
	private void RestoreValues(JSONObject json) throws IOException{
		p1MissionAcomplished = false;
		playerKilled = false;
		p2NoBullets = false;
		if(prueba) {
			p1Ready = false;
			p2Ready = false;
		}
		prueba = !prueba;
	}
	
	private void UpdateNPCStart(JSONObject json) throws IOException
	{
		npcinfo=json.getString("npcinfo");
	}
	private void GetNPCStart(JSONObject json) throws IOException
	{
		npcdead=json.getString("npcdead");
	}
	
	private void UpdateNPC(WebSocketSession session, JSONObject json) throws IOException
	{
		npcinfo=json.getString("npcinfo");
		
		String msg = "npcdead;" + npcdead;
		session.sendMessage(new TextMessage(msg));
		
	}
	private void GetNPC(WebSocketSession session, JSONObject json) throws IOException
	{
		npcdead=json.getString("npcdead");
		String msg = "npcinfo;" + npcinfo;
		session.sendMessage(new TextMessage(msg));
	}

	//private void Options()
	//private void checkSameOption(WebSocketSession session) throws IOException{}
		
	
;}
