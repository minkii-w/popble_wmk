package com.popble.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.popble.domain.Users;
import com.popble.dto.ReservationDTO;
import com.popble.dto.UserProfileDTO;
import com.popble.repository.UserProfileRepository;
import com.popble.repository.UserRepository;
import com.popble.service.ReservationService;
import com.popble.service.UserProfileService;
import com.popble.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/userProfile")
public class UserProfileController2 {
	
	private final ReservationService reservationServie;
	
	private final UserProfileService userProfileService;
	
	private final UserProfileRepository userProfileRepository;
	
	private final UserRepository userRepository;
	
	private final CustomFileUtil fileUtil;
	
	
	
	
	//유저프로필조회
	@GetMapping("/{id}")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Long id) {
        return userProfileRepository.findById(id)
                .map(user -> UserProfileDTO.builder()
                        .id(user.getId())
                        .nickname(user.getNickname())
                        .profileImg(user.getProfileImg())
                        .build())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
	
	
	//프로필로 예약내역조회
	@GetMapping("/{id}/reservations")
	public List<ReservationDTO> getReservationsByUserProfile(@PathVariable Long id){
		return reservationServie.getByUserProfile(id);
	}
	
	
	
	//유저프로필 만들기(+이미지사진)
	@PostMapping(value="/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<UserProfileDTO> createUserProfile(
			@RequestParam("userId")Long userId,
			@RequestParam("nickname")String nickname,
			@RequestParam(value="profileImg", required = false)MultipartFile profileImg) 
					throws IOException{
		
//		
//		UserProfileDTO userProfileDTO = UserProfileDTO.builder()
//										.nickname(nickname)
//										.build();
//		
//		
//		userProfileDTO.setNickname(nickname);
//		
//		UserProfile userProfile = UserProfile.builder()
//				.nickname(userProfileDTO.getNickname())
//				.profileImg(userProfileDTO.getProfileImg())
//				.build();
//		
//	
//		UserProfile saved = userProfileRepository.save(userProfile);
		Users user = userRepository.findById(userId)
				.orElseThrow(() -> new IllegalArgumentException("Invalid userId"));
		
		
		
		UserProfileDTO response = userProfileService.createUserProfile(user ,nickname, profileImg);
		
		return ResponseEntity.ok(response);
	}
	

}
