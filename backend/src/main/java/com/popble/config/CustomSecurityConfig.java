//package com.popble.config;
//
//import java.util.Arrays;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import com.popble.security.filter.JWTCheckFilter;
//import com.popble.security.handlr.APILoginFailHandler;
//import com.popble.security.handlr.APILoginSussessHandler;
//import com.popble.service.UserServiceImpl;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//
//@Configuration
//@Log4j2
//@RequiredArgsConstructor
//@EnableMethodSecurity
//public class CustomSecurityConfig {
//
//    private final UserServiceImpl userServiceImpl;
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//        http.cors(c -> c.configurationSource(corsConfigurationSource()));
//        http.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//        http.csrf(csrf -> csrf.disable());
//
//        // 🔓 리소스 접근 정책
//        http.authorizeHttpRequests(auth -> auth
//                // 업로드 파일 정적 제공 경로는 전체 허용 (이미지 표시용)
//                .requestMatchers(HttpMethod.GET, "/files/**").permitAll()
//                // 정적 리소스들
//                .requestMatchers("/", "/index.html", "/favicon.ico",
//                                 "/static/**", "/webjars/**", "/css/**", "/js/**", "/images/**").permitAll()
//                // 로그인, 에러
//                .requestMatchers("/api/user/login", "/error").permitAll()
//                // 개발 단계: 나머지 전부 허용 (필요시 authenticated로 변경)
//                .anyRequest().permitAll()
//        );
//
//        // 폼 로그인 (사용 중이면 유지)
//        http.formLogin(config -> {
//            config.loginPage("/api/user/login");
//            config.successHandler(new APILoginSussessHandler());
//            config.failureHandler(new APILoginFailHandler());
//        });
//
//        // 소셜 로그인 쓰면 유지
//        http.oauth2Login();
//
//        // JWT 필터 사용 시 주석 해제
//        // http.addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        // 프론트(3000)에서 백엔드(8080)로 호출 허용
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"));
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
//        configuration.setExposedHeaders(Arrays.asList("Authorization"));
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//}
