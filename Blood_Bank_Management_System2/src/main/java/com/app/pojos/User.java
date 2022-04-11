package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User extends BaseEntity{
	
	@Column(name = "username",nullable = false)
	private String userName;
	
	@Column(name = "password",nullable = false)
	private String password;
	
	@Column(name = "phone",nullable = false)
	private String phone;
	
	@Column(name = "role",nullable = false)
	private String role;
	
	@Column(name = "email",nullable = false,unique=true)
	private String email;
	public User() {
		
	}
	
public User(String userName, String password, String phone, String role, String email) {
		super();
		this.userName = userName;
		this.password = password;
		this.phone = phone;
		this.role = role;
		this.email = email;
	}


	public String getUserName() {
		return userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "User [userName=" + userName + ", password=" + password + ", phone=" + phone + ", role=" + role
				+ ", email=" + email + "]";
	}
	
	
}
