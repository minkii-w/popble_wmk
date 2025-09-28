//package com.popble.security;
//
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.popble.dto.UserDTO;
//import com.popble.service.UserService;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//
//@RestController
//@RequiredArgsConstructor
//@Log4j2
//@RequestMapping("/api/users")
//public class UserContoroller {
//
//    private final UserService userService;
//
//    @PostMapping("/join")
//    public UserDTO userCreate(@RequestBody UserDTO userDTO) {
//        log.info("회원가입 요청 DTO: {}", userDTO);
//        log.info("-----------Service create-------------------------");
//        return userService.create(userDTO);
//    }
//}
