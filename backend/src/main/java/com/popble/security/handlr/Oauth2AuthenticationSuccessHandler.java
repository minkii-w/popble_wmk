package com.popble.security.handlr;

import java.io.IOException;
import java.security.Provider;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.nimbusds.openid.connect.sdk.UserInfoRequest;
import com.popble.domain.SocialLogin;
import com.popble.dto.SocialLoginDTO;
import com.popble.dto.UserDTO;
import com.popble.repository.SocialLoginRepository;
import com.popble.service.UserOauth2Service;
import com.popble.util.JWTUtill;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
@Component
@RequiredArgsConstructor
@Log4j2
public class Oauth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

		
	@Autowired
	JWTUtill jwtUtill;
	
	private final SocialLoginRepository socialLoginRepository;
	


	
	
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response
			,Authentication authentication) throws IOException {
		// login 성공한 사용자 목록
		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
		
		log.info("==========================Oauth2AuthenticationSuccessHandler=================================="
				+ "==============================================================================================");
		
	//	Map<String, Object> kakao_account = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
	
		Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttributes().get("properties");

		
		
		String nickname = (String) properties.get("nickname");
		Map<String, Object> claims = new HashMap<>();
		claims.put("provider", "kakao");
	
		claims.put("nickname", nickname);
		
		int tokenTime = 60*24;
		
		String jwt = jwtUtill.generateToken(claims, tokenTime);
		
		
		
	

		
		
		SocialLogin socialLogin = new SocialLogin();
		
String provider = (String) request.getSession().getAttribute("provider");
	socialLogin.setProvider(provider);
	

		
	
	
		
		socialLogin.setProvider(provider);
		socialLogin.setProviderId(String.valueOf(oAuth2User.getAttributes().get("id")));
		socialLogin.setAccessToken(jwt);
		socialLogin.setNickname(nickname);
		
		try{
			
			socialLoginRepository.save(socialLogin);
			
		}catch (DataIntegrityViolationException e) {
			
		}
	
		
		
	
		log.info("========================socialDB 저장===============================================");
		
		String url = makeRedirectUrl(jwt);
		System.out.println("url:"+url);
		log.info("=============================makeRedirectUrl===============================");
		if (response.isCommitted()) {
			logger.debug("응답이 이미 커밋된 상태입니다."+url+"로 리다이렉트 하도록 바꿀 수 없습니다.");
			return;
		}
		getRedirectStrategy().sendRedirect(request, response, url);
		
		
		
		
	}
	
	
	
	
	private String makeRedirectUrl(String token) {
		log.info("===================================makeRedirect Url마지막====================================================");
		return UriComponentsBuilder.fromUriString("http://localhost:3000/oauth2/redirect/"+token)
		.build().toUriString();
	}
	
	
}
