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

import com.app.pojos.*;
import com.app.dao.IControllerDao;
import com.app.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api/contributors")
public class ContributorController {

	@Autowired
	private IControllerDao contributorDao;
	
	// get all contributors
		@GetMapping
		public List<Contributor> getAllcontributors() {
			return this.contributorDao.findAll();
		}
		
	// get contributor by id
		@GetMapping("/{id}")
		public Contributor getcontributorById(@PathVariable (value = "id") long contributorId) {
			return this.contributorDao.findById(contributorId).orElseThrow(()->new ResourceNotFoundException("Contributor not found with id "+contributorId));
		}
		
	// create contributors
		@PostMapping
		public String createcontributor(@RequestBody Contributor contributor) {
			 this.contributorDao.save(contributor);
			return contributor.getName()+" you are registered...";
		}	
		
   // update contributors
		@PutMapping("/{id}")
		public String updatecontributor(@RequestBody Contributor contributor, @PathVariable ("id") long contributorId) {
			Contributor existingcontributor = this.contributorDao.findById(contributorId)
				.orElseThrow(() -> new ResourceNotFoundException("Contributor not found with id  :" + contributorId));
			 existingcontributor.setName(contributor.getName());
			 existingcontributor.setBlood_group(contributor.getBlood_group());
			 existingcontributor.setPhone(contributor.getPhone());
			 existingcontributor.setAddress(contributor.getAddress());
			 this.contributorDao.save(existingcontributor);
			 return existingcontributor.getName()+" your details are updated";
		}
		
   // delete contributors by id
		@DeleteMapping("/{id}")
		public ResponseEntity<Contributor> deletecontributor(@PathVariable ("id") long contributorId){
			Contributor existingcontributor = this.contributorDao.findById(contributorId)
						.orElseThrow(() -> new ResourceNotFoundException("User not found with id :" + contributorId));
			 this.contributorDao.delete(existingcontributor);
			 return ResponseEntity.ok().build();
		}
			
			
	
}
