package com.popble.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Users;
import java.util.List;


public interface UserRepository extends JpaRepository<Users, Long>{

	//로그인 아이디로 사용자 찾기
	Optional<Users> findByLoginId(String loginId);
	
	//이메일로 사용자 찾기(중복 확인)
	Optional<Users> findByEmail(String email);
	
	//로그인 아이디 또는 이메일로 사용자 착기
	Optional<Users> findByLoginIdOrEmail(String loginId, String email);
}
