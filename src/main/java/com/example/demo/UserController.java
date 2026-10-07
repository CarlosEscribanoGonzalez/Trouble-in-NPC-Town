package com.example.demo;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	private Map<String, User> users = new ConcurrentHashMap<>();
	private int currentPlayers = 0;
	
	@SuppressWarnings("unchecked")
	@GetMapping(value = "/LoadUsers")
	public ResponseEntity<Integer> LoadUsers() throws Exception
	{
		try {
			ObjectInputStream ois = new ObjectInputStream(new FileInputStream("users.txt"));
			users = (Map<String, User>) ois.readObject();
			ois.close();
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping(value = "/Login")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<User> Login(@RequestBody User userToLogin)
	{
		 User login = users.get(userToLogin.getUserName());
		 if(login != null && login.getPassword().equals(userToLogin.getPassword())) {
			 currentPlayers++;
			 return new ResponseEntity<>(login, HttpStatus.OK);
		 }
		 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping(value = "/CreateAccount")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<User> newUser(@RequestBody User user)
	{
		if(users.get(user.getUserName()) == null) {
			users.put(user.getUserName(), user);
			currentPlayers++;
			SaveUsers();
			return new ResponseEntity<>(user, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.FORBIDDEN);
	}
	
	@GetMapping(value = "/NumGames/{userName}")
	public ResponseEntity<Integer> TotalGames(@PathVariable String userName)
	{
		User user = users.get(userName);
		if(user != null) return new ResponseEntity<>(user.getNumGames(), HttpStatus.OK);
		else return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/DeleteAccount/{userName}")
	public ResponseEntity<User> DeleteAccount(@PathVariable String userName)
	{
		User user = users.get(userName);
		if(user != null) {
			users.remove(user.getUserName());
			SaveUsers();
			return new ResponseEntity<>(user, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PutMapping(value = "/UpdateNumGames/{userName}")
	public ResponseEntity<Integer> UpdateGames(@PathVariable String userName, @RequestBody int newNumGames)
	{
		User user = users.get(userName);
		if(user != null) {
			user.setNumGames(newNumGames);
			SaveUsers();
			return new ResponseEntity<>(user.getNumGames(), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping(value = "/CurrentPlayers")
	public ResponseEntity<Integer> GetCurrentPlayers()
	{
		return new ResponseEntity<>(this.currentPlayers, HttpStatus.OK);
	}
	
	@GetMapping(value = "/DecreasePlayers")
	public ResponseEntity<Integer> DecreasePlayers()
	{
		this.currentPlayers--;
		return new ResponseEntity<>(this.currentPlayers, HttpStatus.OK);
	}
	
	private void SaveUsers()
	{
		try {
			ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("users.txt"));
			oos.writeObject(users);
			oos.close();
			System.out.println("Lista de usuarios guardada correctamente");
		} catch(IOException e){
			System.out.println("Error al guardar la lista de usuarios");
		}
	}
}
