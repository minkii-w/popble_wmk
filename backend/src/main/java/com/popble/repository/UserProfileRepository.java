package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long>{

	//닉네임으로 조회
	
	//이메일로 조회
}
