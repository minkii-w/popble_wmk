//package com.popble.security;
//
//import java.util.stream.Collectors;
//
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.mysql.cj.log.Log;
//import com.popble.domain.Users;
//import com.popble.dto.UserDTO;
//import com.popble.repository.UserRepository;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//
//@Service
//@Log4j2
//@RequiredArgsConstructor
//public class CustomUserdetailsService implements UserDetailsService {
//	
//	
//	
//	private final UserRepository userRepository;
//	
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		log.info("--------------------------------------------------------------");
//		
//		Users users = userRepository.getwithRoles(username);
//		
//		if(users == null) {
//			throw new UsernameNotFoundException("NOT FOUND");
//		}
//		
//		UserDTO userDTO = new UserDTO(
//			users.getLoginId(),
//			users.getPassword(),
//			users.getName(),
//			users.isSocial(),
//			users.getEmail(),
//			users.getUserRoleList()
//			
//			.stream().map(usersRole -> usersRole.name()).collect(Collectors.toList()));
//		
//		log.info(userDTO);
//		
//		
//		return userDTO;
//	}
//
//}
