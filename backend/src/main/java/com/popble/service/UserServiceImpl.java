package com.popble.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.popble.domain.Role;
import com.popble.domain.Users;
import com.popble.dto.UserDTO;
import com.popble.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    @Override
    public UserDTO create(UserDTO userDTO) {

        log.info("------백앤드 객체 생성----------------------------");

        Users users = Users.builder()
                .name(userDTO.getName())
                .loginId(userDTO.getLoginId())
                .password(encoder.encode(userDTO.getPassword()))
                .email(userDTO.getEmail())
                .phonenumber(userDTO.getPhonenumber())
                .role(Role.MEMBER) // ✅ 기본 가입 시 MEMBER 권한 부여
                .build();

        this.userRepository.save(users);

        return userDTO;
    }
}
