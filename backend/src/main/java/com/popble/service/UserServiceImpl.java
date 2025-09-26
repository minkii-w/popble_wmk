
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

   public UserDTO create(UserDTO userDTO) {

      log.info("------백앤드 객채 생성----------------------------");
      Users users = Users.builder().name(userDTO.getName()).loginId(userDTO.getLoginId())
            .password(encoder.encode(userDTO.getPassword())).email(userDTO.getEmail())
            .phonenumber(userDTO.getPhonenumber()).role(Role.MEMBER)

            .build();

      this.userRepository.save(users);

      return userDTO;

   }

   //모든 유저목록 불러오기
   public List<UserDTO> getAllUsers(){
      return userRepository.findAll().stream()
            .map(user -> entityToDTO(user))
            .collect(Collectors.toList());
   }
   
   //id로 유저 조회
   public UserDTO getUserById(Long id) {
      Users user = userRepository.findById(id)
               .orElseThrow();
      return entityToDTO(user);
   }
   
   
   public UserDTO updateUser(Long id, UserDTO userDTO) {
      Users user = userRepository.findById(id)
            .orElseThrow();
            
      user.setName(userDTO.getName());
      user.setEmail(userDTO.getEmail());
      user.setPhonenumber(userDTO.getPhonenumber());
      user.setSocial(userDTO.isSocial());
      
      Users updateUser = userRepository.save(user);
      
      if(userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
         user.setPassword(encoder.encode(userDTO.getPassword()));
      }
      
      return entityToDTO(updateUser);
   }

   
   public void deleteUser(Long id) {
      
      Users user = userRepository.findById(id)
            .orElseThrow();
      
      userRepository.delete(user);
      
   }

   public UserDTO entityToDTO(Users user) {
      UserDTO dto = new UserDTO();
//      dto.setId(user.getId());
      dto.setLoginId(user.getLoginId());
      dto.setPassword(user.getPassword());
      dto.setName(user.getName());
      dto.setEmail(user.getEmail());
      dto.setPhonenumber(user.getPhonenumber());
      dto.setSocial(user.isSocial());
      dto.setRoleNames(List.of(user.getRole().name()));
      return dto;
   }



   
   
}
