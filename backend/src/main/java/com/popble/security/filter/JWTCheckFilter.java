package com.popble.security.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.gson.Gson;
import com.popble.dto.UserDTO;
import com.popble.util.JWTUtill;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        // ✅ CORS preflight는 무조건 통과
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String path = request.getRequestURI();
        log.info("check uri...............{}", path);

        // ✅ 인증 없이 접근 허용할 공개 API
        if (path.startsWith("/api/user")) {
            return true;
        }

        // ✅ [개발 편의] boards 전체 통과 (필요 시 POST만/특정 경로만으로 좁혀도 됨)
        // TODO: 배포 전 제거 또는 범위 축소
        if (path.startsWith("/api/boards")) {
            return true;
        }

        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        log.info("----------------------JWTCheckFilter-------------------------");

        String authHeaderStr = request.getHeader("Authorization");

        try {
            if (authHeaderStr == null || !authHeaderStr.startsWith("Bearer ")) {
                log.warn("Authorization header is missing or invalid. authHeaderStr={}", authHeaderStr);

                // ✅ 개발 단계에서는 그냥 통과 (배포 시엔 401로 변경 권장)
                filterChain.doFilter(request, response);
                return;
            }

            String accessToken = authHeaderStr.substring(7);
            Map<String, Object> claims = JWTUtill.validateToken(accessToken);

            log.info("JWT claims: {}", claims);

            String loginId = (String) claims.get("loginId");
            String password = (String) claims.get("password");
            String name = (String) claims.get("name");
            Boolean social = (Boolean) claims.get("social");
            String email = (String) claims.get("email");
            String phonenumber = (String) claims.get("phonenumber");
            @SuppressWarnings("unchecked")
            List<String> roleNames = (List<String>) claims.get("roleNames");

            UserDTO userDTO = new UserDTO(
                loginId,
                password,
                name,
                social != null && social,
                email,
                phonenumber,
                roleNames
            );

            log.info("-----------------------");
            log.info(userDTO);
            log.info(userDTO.getAuthorities());

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userDTO, password, userDTO.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            log.error("JWT Check Error---------------------");
            log.error(e.getMessage());

            writeErrorJson(response, "ERROR_ACCESS_TOKEN");
        }
    }

    private void writeErrorJson(HttpServletResponse response, String message) throws IOException {
        Gson gson = new Gson();
        String msg = gson.toJson(Map.of("error", message));
        response.setContentType("application/json");
        PrintWriter printWriter = response.getWriter();
        printWriter.println(msg);
        printWriter.close();
    }
}
