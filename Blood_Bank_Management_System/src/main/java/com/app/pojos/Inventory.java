package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="inventory")

public class Inventory {
	
	@Id
	@GeneratedValue
	private long id;
	
	@Column(name="blood_group")
	private String bloodGroup;
	
	@Column(name="unit")
	private int units;
	
	public Inventory() {
		super();
	}
	public Inventory(long id, String bloodGroup, int units) {
		super();
		this.id = id;
		this.bloodGroup = bloodGroup;
		this.units = units;
	}
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	public int getUnits() {
		return units;
	}
	public void setUnits(int units) {
		this.units = units;
	}
	
}
