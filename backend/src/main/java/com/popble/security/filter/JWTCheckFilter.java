//package com.popble.security.filter;
//
//import java.io.IOException;
//import java.io.PrintWriter;
//import java.util.List;
//import java.util.Map;
//
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import com.google.gson.Gson;
//import com.popble.dto.UserDTO;
//import com.popble.util.JWTUtill;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.extern.log4j.Log4j2;
//
//@Log4j2
//public class JWTCheckFilter extends OncePerRequestFilter {
//
//<<<<<<< HEAD
//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//
//        // ✅ CORS preflight는 무조건 통과
//        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) { // ← "OPTONS" 오타 수정
//            return true;
//        }
//
//        String path = request.getRequestURI();
//        log.info("check uri...............{}", path);
//
//        // ✅ 인증 없이 접근 허용할 공개 API
//        if (path.startsWith("/api/user")) {
//            return true;
//        }
//
//        // ✅ [개발 편의] boards 전체 통과 (필요 시 POST만/특정 경로만으로 좁혀도 됨)
//        // TODO: 배포 전 제거 또는 범위 축소
//        if (path.startsWith("/api/boards")) {
//            return true;
//        }
//
//        return false;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//
//        log.info("----------------------JWTCheckFilter-------------------------");
//
//        String authHeaderStr = request.getHeader("Authorization");
//
//        try {
//            // ✅ Authorization 헤더 안전 가드 (없거나 형식 불량이면 NPE 방지)
//            if (authHeaderStr == null || !authHeaderStr.startsWith("Bearer ")) {
//                log.warn("Authorization header is missing or invalid. authHeaderStr={}", authHeaderStr);
//
//                // ✅ [개발 편의] 헤더 없으면 그냥 통과시킴 (배포 전엔 401로 바꾸는 걸 권장)
//                // TODO: 배포 전 아래 두 줄을 주석 처리하고 401 반환하도록 변경
//                filterChain.doFilter(request, response);
//                return;
//
//                // 배포 시에는 아래처럼 401 주는 게 일반적입니다.
//                // response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                // writeErrorJson(response, "ERROR_ACCESS_TOKEN");
//                // return;
//            }
//
//            String accessToken = authHeaderStr.substring(7);
//            Map<String, Object> claims = JWTUtill.validateToken(accessToken);
//
//            log.info("JWT claims: {}", claims);
//
//            String loginId = (String) claims.get("email");
//            String password = (String) claims.get("password");
//            String name = (String) claims.get("name");
//            Boolean social = (Boolean) claims.get("social");
//            @SuppressWarnings("unchecked")
//            List<String> roleNames = (List<String>) claims.get("roleNames");
//
//            UserDTO userDTO = new UserDTO(loginId, password, name, social != null && social.booleanValue(), roleNames);
//
//            log.info("-----------------------");
//            log.info(userDTO);
//            log.info(userDTO.getAuthorities());
//
//            UsernamePasswordAuthenticationToken authenticationToken =
//                    new UsernamePasswordAuthenticationToken(userDTO, password, userDTO.getAuthorities());
//            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//
//            filterChain.doFilter(request, response);
//
//        } catch (Exception e) {
//            log.error("JWT Check Error---------------------");
//            log.error(e.getMessage());
//
//            // 개발 중엔 통과시키고 싶다면 여기서도 통과 가능(선택)
//            // TODO: 배포 전 제거
//            // filterChain.doFilter(request, response);
//            // return;
//
//            writeErrorJson(response, "ERROR_ACCESS_TOKEN");
//        }
//    }
//
//    private void writeErrorJson(HttpServletResponse response, String message) throws IOException {
//        Gson gson = new Gson();
//        String msg = gson.toJson(Map.of("error", message));
//        response.setContentType("application/json");
//        PrintWriter printWriter = response.getWriter();
//        printWriter.println(msg);
//        printWriter.close();
//    }
//=======
//	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
//		
//		if(request.getMethod().equals("OPTONS")) {
//			return true;
//		}
//		
//		String path = request.getRequestURI();
//		
//		log.info("check uri..............."+path);
//		
//		if(path.startsWith("/api/user")) {
//			return true;
//		}
//		return false;
//		
//		
//	}
//	
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain )
//	throws ServletException, IOException{
//		
//		log.info("----------------------JWTCheckFilter-------------------------");
//		
//		String authHeaderStr = request.getHeader("Authorization");
//		
//		try {
//			String accessToken = authHeaderStr.substring(7);
//			Map<String, Object> claims = JWTUtill.validateToken(accessToken);
//			
//			log.info("JWT claims:"+claims);
//			
//			String loginId = (String) claims.get("loginId ");
//			String password = (String) claims.get("password");
//			String name = (String) claims.get("name");
//			Boolean social = (Boolean) claims.get("social");
//			String email = (String) claims.get("email");
//			List<String> roleNames = (List<String>) claims.get("roleNames");
//			
//			UserDTO userDTO = new UserDTO(loginId, password, name, social.booleanValue(),email, roleNames);
//			
//			log.info("-----------------------");
//			log.info(userDTO);
//			log.info(userDTO.getAuthorities());
//			
//			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDTO, password, userDTO.getAuthorities());
//			SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//			
//			filterChain.doFilter(request, response);
//		}catch (Exception e) {
//			log.error("JWT Check Error---------------------");
//			log.error(e.getMessage());
//			
//			Gson gson = new Gson();
//			String msg = gson.toJson(Map.of("error","ERROR_ACCESS_TOKEN"));
//			
//			response.setContentType("application/json");
//			PrintWriter printWriter = response.getWriter();
//			printWriter.println(msg);
//			printWriter.close();
//		}
//				
//		
//		
//		
//		
//		
//		
//	}
//	
//	
//>>>>>>> bf0e1f351dff7179cfbaa1096edaf439d55cab5f
//}
