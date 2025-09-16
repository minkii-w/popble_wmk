//package com.popble.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebCorsConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**") // 모든 경로에 대해
//                .allowedOrigins("http://localhost:3000") // React 서버
//                .allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS")
//                .allowedHeaders("*")
//                .allowCredentials(false)  // 쿠키/세션 필요없으면 false
//                .maxAge(3600);            // preflight 결과 캐싱 시간 (1시간)
//    }
//}
