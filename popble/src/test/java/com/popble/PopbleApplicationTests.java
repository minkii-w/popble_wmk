package com.popble;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.popble.domain.Role;
import com.popble.domain.User;
import com.popble.repository.UserRepository;

@SpringBootTest
class PopbleApplicationTests {
	@Autowired
	private UserRepository userRepository;
	@Test
	void contextLoads() {
		
		User user = User.builder()
			    .id(2)
			    .role(Role.COMPANY)
			    .loginId("testuser3")
			    .password("12345")
			    .email("tes3t@example.com")
			    .name("기업1")
			    .phonenumber("011-1111-2222")
			    .build();
		 

	     userRepository.save(user); 
	}

}
