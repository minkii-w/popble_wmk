package com.popble.service;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.popble.domain.UserProfile;
import com.popble.dto.UserProfileDTO;
import com.popble.repository.UserProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService{
	
	private final UserProfileRepository userProfileRepository;
	
	
	
	@Override
	public UserProfileDTO getUserProfile(Long id) {
		UserProfile userProfile = userProfileRepository.findById(id)
				.orElseThrow(()-> new IllegalArgumentException("userProfileId Invalid"));
		
		return UserProfileDTO.builder()
				.id(userProfile.getId())
				.nickname(userProfile.getNickname())
				.profileImg(userProfile.getProfileImg())
				.build();
	}
	
	@Override
    public UserProfileDTO createUserProfile(String nickname, MultipartFile profileImg) throws IOException {
		
		String profileImgPath = null;
		
		if (profileImg != null && !profileImg.isEmpty()) {
	        String filename = System.currentTimeMillis() + "_" + profileImg.getOriginalFilename();
	        File dest = new File("uploads/" + filename);
	        dest.getParentFile().mkdirs(); 
	        profileImg.transferTo(dest);

	        profileImgPath = dest.getPath();
	    }
       
        UserProfile userProfile = UserProfile.builder()
                .nickname(nickname)
                .profileImg(profileImgPath) 
                .build();

        UserProfile saved = userProfileRepository.save(userProfile);

        return UserProfileDTO.builder()
                .id(saved.getId())
                .nickname(saved.getNickname())
                .profileImg(saved.getProfileImg())
                .build();
    }

}
