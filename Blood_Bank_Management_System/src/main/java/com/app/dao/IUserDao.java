package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.*;

@Repository
public interface IUserDao extends JpaRepository<User, Long>{
	User findByUserNameAndPassword(String userName, String password);
	User findByUserName(String user);
}
