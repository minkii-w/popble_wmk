package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Users;

public interface UserRepository extends JpaRepository<Users, Long>{

}
