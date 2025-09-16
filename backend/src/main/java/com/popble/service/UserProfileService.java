package com.popble.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.popble.dto.UserProfileDTO;

public interface UserProfileService {
	
	UserProfileDTO getUserProfile(Long id);
	
	UserProfileDTO createUserProfile(String nickname, MultipartFile profileImg) throws IOException;

}
