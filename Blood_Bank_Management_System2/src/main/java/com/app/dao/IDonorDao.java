package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Donor;

public interface IDonorDao extends JpaRepository<Donor, Long> {
	Optional<Donor> findById(Integer id);
	
}
