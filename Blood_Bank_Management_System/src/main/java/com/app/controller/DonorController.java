package com.app.controller;

import java.util.List;

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

import com.app.dao.IDonorDao;
import com.app.exception.ResourceNotFoundException;
import com.app.pojos.Donor;

@RestController
@RequestMapping("/api/donor") 
public class DonorController {
 
	@Autowired
	private IDonorDao DonorDao;
	
	// get all donors
	@GetMapping
	public List<Donor> getAlldonors() {
		return this.DonorDao.findAll();
	}
	
	// get donors by id
	@GetMapping("/{id}")
	public Donor getdonorsById(@PathVariable (value = "id") long donorId) {
	  return this.DonorDao.findById(donorId).orElseThrow(()->new ResourceNotFoundException("Donor not found with id "+donorId));
	}
	
	// create donors
	@PostMapping
	public String createDonors(@RequestBody Donor donor) {
     this.DonorDao.save(donor);
     return donor.getName()+" is registered";
	}
	
	@PutMapping("/{id}") 
	public String updatecontributor(@RequestBody Donor donor, @PathVariable ("id") long donorsId) {
	 Donor existingdonor = this.DonorDao.findById(donorsId)
			.orElseThrow(() -> new ResourceNotFoundException("Donor not found with id :" +donorsId));
		 existingdonor.setName(donor.getName());
//		 existingdonors.setBlood_group(donor.getBlood_group());
		 existingdonor.setPhone(donor.getPhone());
		 existingdonor.setAddress(donor.getAddress());
		 existingdonor.setUnits(donor.getUnits());
		 this.DonorDao.save(existingdonor);
		 return existingdonor.getName()+" is updated";
	}
	
	// delete donors by id
	@DeleteMapping("/{id}")
	public ResponseEntity<Donor> deletedonors(@PathVariable ("id") long donorsId){
		Donor existingdonors = this.DonorDao.findById(donorsId)
						.orElseThrow(() -> new ResourceNotFoundException("User not found with id :" + donorsId));
	 this.DonorDao.delete(existingdonors);
	 return ResponseEntity.ok().build();
	}
}
