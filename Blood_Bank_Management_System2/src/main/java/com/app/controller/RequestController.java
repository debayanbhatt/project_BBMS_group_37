package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.app.pojos.*;
import com.app.exception.*;
import com.app.dao.*;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/requests")

public class RequestController {
	
	@Autowired
	private IRequestDao requestDao;
	
	// get all inventory
	@GetMapping
	public List<Request> getAlldonors() {
		return this.requestDao.findAll();
	}
	
	@GetMapping("/checking")
	public String checking() {
		return "Nothing";
	}

	// get inventory by id
	@GetMapping("/{id}")
	public Request getrequestById(@PathVariable (value = "id") Integer requestId) {
		return this.requestDao.findById(requestId)
				.orElseThrow(() -> new ResourceNotFoundException("Requests not found with id :" + requestId));
	}

	// create inventory
	@PostMapping
	public Request createUser(@RequestBody Request request) {
		return this.requestDao.save(request);
	}
	
	
	
	@PutMapping("/{id}")
	public Request updatecontributor(@RequestBody Request request, @PathVariable ("id") Integer requestId) {
		Request existingrequest = this.requestDao.findById(requestId)
			.orElseThrow(() -> new ResourceNotFoundException("Requests not found with id :" +requestId));
		 existingrequest.setStatus(request.getStatus());
		 existingrequest.setUnits(request.getUnits());
//		 existingrequest.setBlood_group(request.getBlood_group());
//		 existingrequest.setDr_id(request.getDr_id());
		 existingrequest.setApproved_date(request.getApproved_date());
		
		 return this.requestDao.save(existingrequest);
	}
	
	
	// delete inventory by id
	@DeleteMapping("/{id}")
	public ResponseEntity<Request> deletedonors(@PathVariable ("id") Integer requestId){
		Request existingrequest = this.requestDao.findById(requestId)
					.orElseThrow(() -> new ResourceNotFoundException("Requests not found with id :" + requestId));
		 this.requestDao.delete(existingrequest);
		 return ResponseEntity.ok().build();
	}
	
	
}
