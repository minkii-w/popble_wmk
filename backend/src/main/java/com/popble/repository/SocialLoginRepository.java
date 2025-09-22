package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.SocialLogin;

public interface SocialLoginRepository extends JpaRepository<SocialLogin, Long> {

}
