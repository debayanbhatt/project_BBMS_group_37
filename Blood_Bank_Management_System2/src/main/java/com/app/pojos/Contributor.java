package com.app.pojos;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "contributors")
public class Contributor extends BaseEntity{

	
	@Column(name="name",nullable = false)
	private String name;
	
	@Column(name="blood_group",nullable = false)
	private String blood_group;
	
	@Column(name = "phone",nullable = false)
	private String phone;
	
	@Column(name = "address",nullable = false)
	private String address;
	
	
	public Contributor() {
		
	}


	public Contributor( String name, String blood_group, String phone, String address) {
		super();
		//this.id = id;
		this.name = name;
		this.blood_group = blood_group;
		this.phone = phone;
		this.address = address;
	}

//
//	public long getId() {
//		return id;
//	}
//
//
//	public void setId(long id) {
//		this.id = id;
//	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getBlood_group() {
		return blood_group;
	}


	public void setBlood_group(String blood_group) {
		this.blood_group = blood_group;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}
	
	
	
	
}
