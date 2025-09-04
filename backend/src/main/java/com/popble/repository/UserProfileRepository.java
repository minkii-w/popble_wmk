package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.UserProfile;
import java.util.List;


public interface UserProfileRepository extends JpaRepository<UserProfile, Long>{

	//닉네임으로 조회
	List<UserProfile> findByNickname(String nickname);
	
	
}
