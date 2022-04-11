package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Employee;
@Repository
public interface IEmployeeDao extends JpaRepository<Employee, Integer>{
  Employee findByEmail(String email);
}
