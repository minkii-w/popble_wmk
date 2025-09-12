package com.popble.dto;

import com.popble.domain.SocialLogin;
import com.popble.domain.Users;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SocialLoginDTO extends SocialLogin {

	//oauth2 id
	private Long id;
	
	private Users users;
	//소셜로그인(회사)
	private String provider;
	//소셜로그인아이디
	private String providerId;
	//토큰번호
	private String accessToken;
	//카카오 프로필 닉네임
	private String nickname;
}
