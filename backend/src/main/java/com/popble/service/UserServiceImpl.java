package com.popble.service;

import java.util.List;
import java.util.stream.Collectors;

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
                .role(Role.MEMBER) // 기본 가입 시 MEMBER 권한 부여
                .build();

        this.userRepository.save(users);

        return userDTO;
    }

    // 모든 유저목록 불러오기
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    // id로 유저 조회
    public UserDTO getUserById(Long id) {
        Users user = userRepository.findById(id)
                .orElseThrow();
        return entityToDTO(user);
    }

    // 유저 정보 수정
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        Users user = userRepository.findById(id)
                .orElseThrow();

        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPhonenumber(userDTO.getPhonenumber());
        user.setSocial(userDTO.isSocial());

        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            user.setPassword(encoder.encode(userDTO.getPassword()));
        }

        Users updateUser = userRepository.save(user);
        return entityToDTO(updateUser);
    }

    // 유저 삭제
    public void deleteUser(Long id) {
        Users user = userRepository.findById(id)
                .orElseThrow();
        userRepository.delete(user);
    }

    // 엔티티 -> DTO 변환
    private UserDTO entityToDTO(Users user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setLoginId(user.getLoginId());
        dto.setPassword(user.getPassword());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhonenumber(formatPhoneNumber(user.getPhonenumber()));
        dto.setSocial(user.isSocial());
        dto.setRoleNames(List.of(user.getRole().name()));
        return dto;
    }

    // 핸드폰번호 자동 포맷팅
    private String formatPhoneNumber(String number) {
        if (number == null) return null;
        number = number.replaceAll("\\D", "");
        if (number.length() == 11) {
            return number.substring(0, 3) + "-"
                    + number.substring(3, 7) + "-"
                    + number.substring(7);
        } else if (number.length() == 10) {
            return number.substring(0, 3) + "-"
                    + number.substring(3, 6) + "-"
                    + number.substring(6);
        }
        return number;
    }
}
