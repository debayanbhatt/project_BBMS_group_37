package com.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.IUserDao;
import com.app.exception.ResourceNotFoundException;
import com.app.pojos.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private IUserDao userDao;
	
	
	public User login(String username, String password) {
		User user = this.userDao.findByUserNameAndPassword(username, password);
		return user;
	}
	
	public User Signup(String username) {
		User user = this.userDao.findByUserName(username);
		return user;
	}
	
	//user login
	@PostMapping("/login")
	public Map<String, String> loginUser(@RequestBody User user) {
		User authUser = this.login(user.getUserName(), user.getPassword());		
		String status="0";
//		return oauthUser;
		HashMap<String, String> map = new HashMap<String, String>();
		
		if(authUser!=null) 
		{	
			 
			 map.put("username",authUser.getUserName());
//			 map.put("id",Long.toString(authUser.getId()));
//			 map.put("role",authUser.getRole());
			 map.put("message", "Your Are logged in!");
			 map.put("status_code", status);
		} else {
			status="1";
			map.put("Message","Sorry not able to logged in, Please check your username and password");
			map.put("status",status);
		}
		
		return map;
	}

	
	

	// get all users
	@GetMapping("/allUser")
	public List<User> getAllUsers() {
		return this.userDao.findAll();
	}
	
	
	
	@PostMapping("/checking")
	public String checking(@RequestBody User user) {

		User authUser = this.Signup(user.getUserName());
    	
		
		   //System.out.println(authUser);
			if(authUser!=null) 
			{	 
				 return "User has been registed";
			} else {
				return "User already Present";
			}
	}
	
	
	
	// get user by id 
	@GetMapping("/{id}")
	public User getUserById(@PathVariable (value = "id") long userId) {
		return this.userDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id :" + userId));//exception not wrking
	}
	
	

	// create user
	@PostMapping("/create")
	public String createUser(@RequestBody User user) {
		User authUser = this.Signup(user.getUserName());
		if(authUser==null) 
		{	
			 this.userDao.save(user);
			 return "User has been registed";
		} else {
			return "User already Present";
		}
	}
	
	// update user
	@PutMapping("/{id}")
	public User updateUser(@RequestBody User user, @PathVariable ("id") long userId) {
		 User existingUser = this.userDao.findById(userId)
			.orElseThrow(() -> new ResourceNotFoundException("User not found with id :" + userId));
		 existingUser.setUserName(user.getUserName());
		 existingUser.setPassword(user.getPassword());
		 existingUser.setPhone(user.getPhone());
		 existingUser.setRole(user.getRole());
		 return this.userDao.save(existingUser);
	}
	
	// delete user by id
	@DeleteMapping("/{id}")
	public ResponseEntity<User> deleteUser(@PathVariable ("id") long userId){
		 User existingUser = this.userDao.findById(userId)
					.orElseThrow(() -> new ResourceNotFoundException("User not found with id :" + userId));
		 this.userDao.delete(existingUser);
		 return ResponseEntity.ok().build();
	}
}
