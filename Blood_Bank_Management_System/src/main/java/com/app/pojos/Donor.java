package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "donors")
public class Donor {
	
	@Id
	@GeneratedValue
	private long id;
	
	
	@Column(name="units")
	private int units;
	
	@Column(name="name")
	private String name;
	
	@Column(name="blood_group")
	private String blood_group;
	
	@Column(name = "phone")
	private String phone;
	
	@Column(name = "address")
	private String address;
	
	public Donor() {
		
	}

	public Donor(long id, int units, String name, String blood_group, String phone, String address) {
		super();
		this.id = id;
		this.units = units;
		this.name = name;
		this.blood_group = blood_group;
		this.phone = phone;
		this.address = address;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getUnits() {
		return units;
	}

	public void setUnits(int units) {
		this.units = units;
	}

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
