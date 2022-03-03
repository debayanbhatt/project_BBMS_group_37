package com.app.dao;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.*;

public interface IControllerDao extends JpaRepository<Contributor, Long>{
   List<Contributor> findAll();
   Optional<Contributor> findById(long id);
}
