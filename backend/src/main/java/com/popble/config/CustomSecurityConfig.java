
package com.popble.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.popble.security.filter.JWTCheckFilter;
import com.popble.security.handlr.APILoginFailHandler;
import com.popble.security.handlr.APILoginSussessHandler;
import com.popble.security.handlr.Oauth2AuthenticationSuccessHandler;
import com.popble.service.UserOauth2Service;
import com.popble.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Configuration
@Log4j2
@RequiredArgsConstructor
@EnableMethodSecurity
public class CustomSecurityConfig {

	private final Oauth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler;

	private final UserOauth2Service userOauth2Service;

	private final UserServiceImpl userServiceImpl;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.cors(httpSecurityCorsConfigurer -> {
			httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
		});

		http.sessionManagement(SessionConfig -> SessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.csrf(Config -> Config.disable());

		http.formLogin(config -> {
			config.loginPage("/api/user/login");

			config.successHandler(new APILoginSussessHandler());
			config.failureHandler(new APILoginFailHandler());

		});

// oauth2 -----------------------------	

		http.oauth2Login(
				oauth2 -> oauth2.defaultSuccessUrl("/login/success").successHandler(oauth2AuthenticationSuccessHandler)
						.userInfoEndpoint(userInfo -> userInfo.userService(userOauth2Service)

						));

	http.addFilterBefore(new JWTCheckFilter(),
			 UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.setAllowedOriginPatterns(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}

}
