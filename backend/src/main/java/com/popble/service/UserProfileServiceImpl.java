package com.popble.service;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.popble.BackendApplication;
import com.popble.domain.UserProfile;
import com.popble.domain.Users;
import com.popble.dto.UserProfileDTO;
import com.popble.repository.UserProfileRepository;
import com.popble.service.FileStorageService.StoredFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService{

    private final BackendApplication backendApplication;
	
	private final UserProfileRepository userProfileRepository;
	
	private final LocalFileStorageService localFileStorageService;
	
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
	public UserProfileDTO updateUserProfile(Long userId, String nickname, MultipartFile profileImg) {

		UserProfile userProfile = userProfileRepository.findById(userId).orElseThrow();
		
		if(nickname != null && !nickname.isBlank()) {
			userProfile.setNickname(nickname);
		}
		
		if(profileImg != null && !profileImg.isEmpty()) {
			if(userProfile.getProfileImg() != null && !userProfile.getProfileImg().isEmpty()) {
				String[] parts = userProfile.getProfileImg().replace("/uploads/", "").split("/");
				if(parts.length >= 4) {
					String folder = parts[0] + "/" + parts[1] + "/" + parts[2];
					String storedName = parts[3];
					localFileStorageService.delete(folder, storedName);
				}
			}
			
			StoredFile storedFile = localFileStorageService.store(profileImg);
			userProfile.setProfileImg(storedFile.url());
		}
		
		UserProfile updated = userProfileRepository.save(userProfile);
		
		return UserProfileDTO.builder()
				.id(updated.getId())
				.nickname(updated.getNickname())
				.profileImg(updated.getProfileImg())
				.build();
	}

}
