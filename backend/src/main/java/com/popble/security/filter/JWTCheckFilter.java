
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

	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
		
		if(request.getMethod().equals("OPTIONS")) {
			return true;
		}
		
		String path = request.getRequestURI();
		
		log.info("check uri..............."+path);
		
		if(path.startsWith("/api/user")) {
			return true;
		}
		if(path.startsWith("/api/search") || path.startsWith("/api/filter")) {
			return true;
		}
		return false;
		
		
	}
	
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain )
	throws ServletException, IOException{
		
		log.info("----------------------JWTCheckFilter-------------------------");
		
		String authHeaderStr = request.getHeader("Authorization");
		
		if (authHeaderStr == null || !authHeaderStr.startsWith("Bearer ")) {
	        log.info("Authorization 헤더가 없거나 Bearer 타입이 아닙니다. 다음 필터로 이동합니다.");
	        filterChain.doFilter(request, response);
	        return; 
	    }
		
		try {
			String accessToken = authHeaderStr.substring(7);
			Map<String, Object> claims = JWTUtill.validateToken(accessToken);
			
			log.info("JWT claims:"+claims);
			
			String loginId = (String) claims.get("loginId");
			String password = (String) claims.get("password");
			String name = (String) claims.get("name");
			Boolean social = (Boolean) claims.get("social");
			String email = (String) claims.get("email");
			String phonenumber =(String) claims.get("phonenumber");
			List<String> roleNames = (List<String>) claims.get("roleNames");
			
			//id못받아와서 따로 추가한부분
			Long id = null;
		    Object idObj = claims.get("id");
		    if (idObj != null) {
		        id = Long.valueOf(String.valueOf(idObj));
		    }
			
			UserDTO userDTO = new UserDTO(loginId, password, name, social.booleanValue(),email,phonenumber, roleNames);
			
			//추가분
			userDTO.setId(id);
			
			log.info("-----------------------");
			log.info(userDTO);
			log.info(userDTO.getAuthorities());
			
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDTO, password, userDTO.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			
			filterChain.doFilter(request, response);
		}catch (Exception e) {
			log.error("JWT Check Error---------------------");
			log.error(e.getMessage());
			
			Gson gson = new Gson();
			String msg = gson.toJson(Map.of("error","ERROR_ACCESS_TOKEN"));
			
			response.setContentType("application/json");
			PrintWriter printWriter = response.getWriter();
			printWriter.println(msg);
			printWriter.close();
		}
				
		
		
		
		
		
		
	}
	
	
}

