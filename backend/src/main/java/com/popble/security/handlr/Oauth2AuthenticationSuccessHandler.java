package com.popble.security.handlr;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.popble.util.JWTUtill;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class Oauth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

		
	@Autowired
	JWTUtill jwtUtill;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response
			,Authentication authentication) throws IOException {
		// login 성공한 사용자 목록
		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
		
		Map<String, Object> kakao_account = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
		String email = (String) kakao_account.get("email");
		Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
		String nickname = (String) properties.get("nickname");
		
		Map<String, Object> claims = new HashMap<>();
		claims.put("provider", "kakao");
		claims.put("email", email);
		claims.put("nickname", nickname);
		
		int tokenTime = 60*24;
		
		String jwt = jwtUtill.generateToken(claims, tokenTime);
		
		String url = jwtUtill.makeRedirectUrl(jwt);
		System.out.println("url:"+url);
		
		if (response.isCommitted()) {
			logger.debug("응답이 이미 커밋된 상태입니다."+url+"로 리다이렉트 하도록 바꿀 수 없습니다.");
			return;
		}
		getRedirectStrategy().sendRedirect(request, response, url);
	}
	
	private String makeRedirectUrl(String token) {
		return UriComponentsBuilder.fromUriString("http://localhost:3000/oauth2/redirect/"+token)
		.build().toUriString();
	}
	
	
}
