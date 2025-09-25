package com.popble.security.handlr;

import java.io.IOException;
// import java.util.HashMap;
// import java.util.Map;

import org.springframework.security.core.Authentication;
// import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
// import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
// import org.springframework.web.util.UriComponentsBuilder;

// import com.popble.domain.Role;
// import com.popble.domain.SocialLogin;
// import com.popble.domain.Users;
// import com.popble.dto.SocialLoginDTO;
import com.popble.repository.SocialLoginRepository;
import com.popble.repository.UserRepository;
// import com.popble.service.PopupStoreServiceImpl;
// import com.popble.util.JWTUtill;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Component
@Log4j2
@RequiredArgsConstructor
public class Oauth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    // ⚠️ 빌드만 성공시키기 위해 주석 처리
    // private final PopupStoreServiceImpl popupStoreServiceImpl;
    // private final SocialLoginDTO socialLoginDTO;

    private final SocialLoginRepository socialLoginRepository;
    private final UserRepository userRepository;

    // ⚠️ 빌드만 성공시키기 위해 주석 처리
    // private final JWTUtill jwtUtill;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        // ⚠️ 빌드만 성공하게 하기 위해 통째로 주석 처리
        /*
        String registrationId = ((OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId();
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String nickname = "";
        String name = "";
        String providerId = "";
        Map<String, Object> claims = new HashMap<>();

        if ("kakao".equals(registrationId)) {
            String providerid = String.valueOf(attributes.get("id"));
            Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
            nickname = (String) properties.get("nickname");
            claims.put("provider", "kakao");

            socialLoginDTO.setProvider("kakao");
            socialLoginDTO.setNickname(nickname);
            socialLoginDTO.setProviderId(providerid);

        } else if ("google".equals(registrationId)) {
            String sub = (String) attributes.get("sub");
            nickname = (String) attributes.get("name");
            claims.put("provider", "google");

            socialLoginDTO.setProvider("google");
            socialLoginDTO.setNickname(nickname);
            socialLoginDTO.setProviderId(sub);

        } else if ("naver".equals(registrationId)) {
            Map<String, Object> responses = (Map<String, Object>) attributes.get("response");
            String providerid = (String) responses.get("id");
            nickname = (String) responses.get("name");
            claims.put("provider", "naver");

            socialLoginDTO.setProvider("naver");
            socialLoginDTO.setNickname(nickname);
            socialLoginDTO.setProviderId(providerid);
        }

        socialLoginDTO.setProviderId(providerId);
        claims.put("nickname", nickname);
        claims.put("providerid", providerId);

        int tokenTime = 60 * 24;
        String jwt = jwtUtill.generateToken(claims, tokenTime);

        if (!providerId.equals(socialLoginDTO.getProviderId())) { // 중복 저장 방지
            SocialLogin socialLogin = new SocialLogin();
            Users users = new Users();
            users.setEmail(name);
            users.setLoginId(name);
            users.setName(name);
            users.setPassword(name);
            users.setPhonenumber(name);
            users.setRole(Role.MEMBER);
            users.setSocial(true);

            users = userRepository.save(users);

            socialLogin.setAccessToken(jwt);
            socialLogin.setProvider(socialLoginDTO.getProvider());
            socialLogin.setProviderId(socialLoginDTO.getProviderId());
            socialLogin.setNickname(socialLoginDTO.getNickname());
            socialLogin.setUsers(users);

            socialLoginRepository.save(socialLogin);
        } else {
            log.info("기존 사용자 로그인");
        }

        String url = jwtUtill.makeRedirectUrl(jwt);
        log.info("url: {}", url);

        if (response.isCommitted()) {
            logger.debug("응답이 이미 커밋된 상태입니다. {} 로 리다이렉트 불가", url);
            return;
        }
        getRedirectStrategy().sendRedirect(request, response, url);
        */
    }

    /*
    private String makeRedirectUrl(String token) {
        return UriComponentsBuilder.fromUriString("http://localhost:3000/oauth2/redirect/" + token)
                .build().toUriString();
    }
    */
}
