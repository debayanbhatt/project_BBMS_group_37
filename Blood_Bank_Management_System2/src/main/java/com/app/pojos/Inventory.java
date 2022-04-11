package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="inventory")

public class Inventory extends BaseEntity{
	
	
	@Column(name="blood_group",nullable = false)
	private String bloodGroup;
	
	@Column(name="unit",nullable = false)
	private int units;
	
	public Inventory() {
		super();
	}
	public Inventory(long id, String bloodGroup, int units) {
		super();
//		this.id = id;
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
