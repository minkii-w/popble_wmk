package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Users;
import com.popble.domain.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long>{

}
