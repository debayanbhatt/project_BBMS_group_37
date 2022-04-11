package com.app.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Request;

@Repository
public interface IRequestDao  extends JpaRepository<Request, Integer> {

}
