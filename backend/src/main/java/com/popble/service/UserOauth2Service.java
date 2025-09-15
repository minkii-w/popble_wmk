package com.popble.service;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.popble.repository.SocialLoginRepository;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
@Log4j2
@RequiredArgsConstructor
@Service
public class UserOauth2Service extends DefaultOAuth2UserService {

	private final HttpSession httpSession;
	
	private final SocialLoginRepository socialLoginRepository;
		
	
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		
		log.info("==================================UserOauth2Service1111111111====================================================");
		
		OAuth2User oAuth2User = super.loadUser(userRequest);
		Map<String, Object> attributes = oAuth2User.getAttributes();
		
		String provider = userRequest.getClientRegistration().getRegistrationId();
		
		httpSession.setAttribute("provider", provider);
		
		
		Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");

		log.info("==================================UserOauth2Service222222222222====================================================");
		Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
		
		String nickname = (String) properties.get("nickname");
		
		
		httpSession.setAttribute("nickname", nickname);
		log.info("==================================UserOauth2Servic2333333333333====================================================");
		
		
		
		
		return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("MEMBER")), attributes, "id");
		
		
		
	}
	
	
	
	
	
	
	
}
