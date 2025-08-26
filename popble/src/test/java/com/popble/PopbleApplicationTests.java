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
			    .userId(1)
			    .role(Role.MEMBER)
			    .loginId("testuser")
			    .password("1234")
			    .email("test@example.com")
			    .name("홍길동")
			    .phonenumber("010-1111-2222")
			    .build();
		 

	     userRepository.save(user); 
	}

}
