package com.popble.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.SocialLogin;

public interface SocialLoginRepository extends JpaRepository<SocialLogin, Long> {
	
	Optional<SocialLogin> findByAccessToken(String accessToken);

}
