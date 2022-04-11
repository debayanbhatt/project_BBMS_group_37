package com.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.EmailSenderService;
import com.app.dao.IEmployeeDao;
import com.app.dao.IUserDao;
import com.app.exception.ResourceNotFoundException;
import com.app.pojos.Employee;
import com.app.pojos.User;
@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private IUserDao userDao;
	@Autowired
	private IEmployeeDao empDao;
	@Autowired
	EmailSenderService emailSenderService ;
	
	public User login(String username, String password) {
		User user = this.userDao.findByUserNameAndPassword(username, password);
		return user;
	}
	
	public User Signup(String email) {
		User user=this.userDao.findByEmail(email);
		return user;
	}
	
	//user login
	@PostMapping("/login")
	public Map<String, String> loginUser(@RequestBody User user) {
		User authUser = this.login(user.getUserName(), user.getPassword());		
		String status="0";
//		return oauthUser;
		HashMap<String, String> map = new HashMap<String, String>();
		
		if(Objects.nonNull(authUser))//authUser!=null) 
		{	
			 
			 map.put("username",authUser.getUserName());
     		 map.put("id",Long.toString(authUser.getId()));
			 map.put("role",authUser.getRole());
			 map.put("message", "You Are logged in!");
			 System.out.println(map);
			 map.put("status_code", status);
		} else {
			status="1";
			map.put("message",null);
			//map.put("message","Sorry not able to logged in, Please check your username and password");
			System.out.println(map);
			//map.put("status",status);
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
	public User getUserById(@PathVariable (value = "id") Integer userId) {
		return this.userDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id :" + userId));//exception not wrking
	}
	
	

	// create user
	@PostMapping("/create")
	public String createUser(@RequestBody User user) {
		User authUser = this.Signup(user.getEmail());
		Employee emp;
		System.out.println(authUser); 
		if(authUser==null) 
		{	
			emp=this.empDao.findByEmail(user.getEmail());
			System.out.println(emp);
			if(emp==null) {
				System.out.println("hiiii.....");
				return "You are not an employee";
				//throw new ResourceNotFoundException(user.getUserName()+" is not an employee");	
			}
			this.userDao.save(user);
			emailSenderService.sendSimpleEmail(user.getEmail(),
					"You have successfully registered with City Hospital,Blood Bank Management System... You can log with following credentials "
						+" Username: "	+user.getUserName()  + "  Password: " +user.getPassword(),
						"From City Hospital,Blood Bank Management System...!!!");
			return "User has been registered";
			
		} else {
			return "User already Present/not an employee";
		}
	}
	
	// update user
	@PutMapping("/{id}")
	public User updateUser(@RequestBody User user, @PathVariable ("id") Integer userId) {
		 User existingUser = this.userDao.findById(userId)
			.orElseThrow(() -> new ResourceNotFoundException("User not found with id :" + userId));
		 existingUser.setUserName(user.getUserName());
		 existingUser.setPassword(user.getPassword());
		 existingUser.setPhone(user.getPhone());
		 existingUser.setRole(user.getRole());
		 return this.userDao.save(existingUser);
	}
	
	//update password
	@PatchMapping("/{id}")
	public User updatePassword(@RequestBody User user,@PathVariable("id") Integer userId) {
		User existingUser = this.userDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id :" + userId));
			
			 existingUser.setPassword(user.getPassword());
			 return this.userDao.save(existingUser);
	}
	
	// delete user by id
	@DeleteMapping("/{id}")
	public ResponseEntity<User> deleteUser(@PathVariable ("id") Integer userId){
		 User existingUser = this.userDao.findById(userId)
					.orElseThrow(() -> new ResourceNotFoundException("User not found with id :" + userId));
		 this.userDao.delete(existingUser);
		 return ResponseEntity.ok().build();
	}
}
