package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "requests")
public class Request {
	@Id
	@GeneratedValue
	private long id;
	
	@Column(name="blood_group")
	private String blood_group;
	
	@Column(name="units")
	private int units;
	
	
	@Column(name="status")
	private String status;
	
	@Column(name="dr_id")
	private Long dr_id;
	
	@Column(name="approved_date")
	private LocalDate approved_date;
	public Request() {
		
	}

	public Request(long id, String blood_group, int units, String status, Long dr_id, LocalDate approved_date) {
		super();
		this.id = id;
		this.blood_group = blood_group;
		this.units = units;
		this.status = status;
		this.dr_id = dr_id;
		this.approved_date = approved_date;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getBlood_group() {
		return blood_group;
	}

	public void setBlood_group(String blood_group) {
		this.blood_group = blood_group;
	}

	public int getUnits() {
		return units;
	}

	public void setUnits(int units) {
		this.units = units;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getDr_id() {
		return dr_id;
	}

	public void setDr_id(Long dr_id) {
		this.dr_id = dr_id;
	}

	public LocalDate getApproved_date() {
		return approved_date;
	}

	public void setApproved_date(LocalDate approved_date) {
		this.approved_date = approved_date;
	}
	
	
	
}
