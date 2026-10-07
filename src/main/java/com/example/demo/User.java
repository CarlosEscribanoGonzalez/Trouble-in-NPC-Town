package com.example.demo;

import java.io.Serializable;

public class User implements Serializable{
	private String userName;
	private String password;
	private int victoriesP1;
	private int victoriesP2;
	private int totalVictories;
	private int numGames;
	
	public User(String name, String password) {
		this.userName = name;
		this.password = password;
		this.victoriesP1 = 0;
		this.victoriesP2 = 0;
		this.totalVictories = 0;
		this.numGames = 0;
	}
	
	public String getUserName(){
		return this.userName;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public int getVictoriesP1(){
		return this.victoriesP1;
	}
	
	public int getVictoriesP2(){
		return this.victoriesP2;
	}
	
	public int getTotalVictories(){
		return this.totalVictories;
	}
	
	public int getNumGames() {
		return this.numGames;
	}
	
	public void addVictoryP1() {
		this.victoriesP1++;
		this.totalVictories++;
	}
	
	public void addVictoryP2() {
		this.victoriesP2++;
		this.totalVictories++;
	}
	
	public void setNumGames(int newNumGames) {
		this.numGames = newNumGames;
	}
}
