package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "employees")
public class Employee extends BaseEntity{

	@Column(name = "employee_name",nullable = false)
	private String empName;
	
	@Column(name = "phone",nullable = false)
	private String phone;
	
	@Column(name = "role",nullable = false)
	private String role;
	
	@Column(name="address",nullable = false)
	private String address;

	@Column(name="email",unique = true,nullable = false)
	private String email;
	
	public Employee() {
		super();
	}

	public Employee(String empName, String phone, String role, String address, String email) {
		super();
		this.empName = empName;
		this.phone = phone;
		this.role = role;
		this.address = address;
		this.email = email;
	}

	

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmpName() {
		return empName;
	}


	public void setEmpName(String empName) {
		this.empName = empName;
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


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "Employee [empName=" + empName + ", phone=" + phone + ", role=" + role + ", address=" + address
				+ ", email=" + email + "]";
	}
	
	
}
