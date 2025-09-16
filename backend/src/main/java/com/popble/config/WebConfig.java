// src/main/java/com/popble/config/WebConfig.java
package com.popble.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.annotation.PostConstruct;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // 설정이 없으면 기본값으로 사용자 홈 디렉터리 아래 uploads 사용
    // 예) Windows: C:/Users/계정/uploads, Linux/Mac: /home/계정/uploads
    @Value("${app.upload-root:${user.home}/uploads}")
    private String uploadRoot;

    @PostConstruct
    void ensureUploadDir() {
        try {
            Path p = Paths.get(uploadRoot).toAbsolutePath();
            Files.createDirectories(p); // 폴더 없으면 생성 (선택이지만 유용)
        } catch (Exception ignore) {}
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // "file:/C:/uploads/" 또는 "file:/var/www/uploads/" 형태로 변환
        String location = Paths.get(uploadRoot).toAbsolutePath().toUri().toString();
        if (!location.endsWith("/")) location += "/";

        registry.addResourceHandler("/files/**")
                .addResourceLocations(location)
                .setCacheControl(CacheControl.maxAge(Duration.ofDays(7)).cachePublic()); // 캐시(선택)
    }

    // 이미지 태그로 불러오면 대체로 CORS 불필요하지만, 개발 환경에서 안전하게 허용(선택)
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/files/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET");
    }
}
