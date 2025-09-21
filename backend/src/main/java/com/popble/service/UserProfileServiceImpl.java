package com.popble.service;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.popble.domain.UserProfile;
import com.popble.domain.Users;
import com.popble.dto.UserProfileDTO;
import com.popble.repository.UserProfileRepository;
import com.popble.service.FileStorageService.StoredFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService{
	
	private final UserProfileRepository userProfileRepository;
	
	private final LocalFileStorageService localFileStorageService;
	
	
	
	@Override
	public UserProfileDTO getUserProfile(Long id) {
		UserProfile userProfile = userProfileRepository.findById(id)
				.orElseThrow(()-> new IllegalArgumentException("userProfileId Invalid"));
		
		return UserProfileDTO.builder()
				.id(userProfile.getId())
				.name(userProfile.getUsers().getName())
				.nickname(userProfile.getNickname())
				.profileImg(userProfile.getProfileImg())
				.phonenumber(userProfile.getUsers().getPhonenumber())
				.build();
	}
	
	@Override
    public UserProfileDTO createUserProfile(Users user, String nickname, MultipartFile profileImg) throws IOException {
		
		String profileImgUrl = null;
		
		if (profileImg != null && !profileImg.isEmpty()) {
			StoredFile storedFile = localFileStorageService.store(profileImg);
			profileImgUrl = storedFile.url();
			
	    }
       
        UserProfile userProfile = UserProfile.builder()
                .nickname(nickname)
                .profileImg(profileImgUrl)
                .users(user)
                .build();

        UserProfile saved = userProfileRepository.save(userProfile);

        return UserProfileDTO.builder()
                .id(saved.getId())
                .nickname(saved.getNickname())
                .profileImg(saved.getProfileImg())
                .build();
    }
	
	
	@Override
	public UserProfileDTO updateUserProfile(Long id, UserProfileDTO dto) {
	    UserProfile userProfile = userProfileRepository.findById(id)
	            .orElseThrow(() -> new IllegalArgumentException("userProfileId Invalid"));

	   
	    if (dto.getName() != null) {
	        userProfile.getUsers().setName(dto.getName());
	    }
	    if (dto.getPhonenumber() != null) {
	        userProfile.getUsers().setPhonenumber(dto.getPhonenumber());
	    }

	    userProfileRepository.save(userProfile);

	    return UserProfileDTO.builder()
	            .id(userProfile.getId())
	            .nickname(userProfile.getNickname())
	            .profileImg(userProfile.getProfileImg())
	            .name(userProfile.getUsers().getName())
	            .phonenumber(userProfile.getUsers().getPhonenumber())
	            .build();
	}

}
