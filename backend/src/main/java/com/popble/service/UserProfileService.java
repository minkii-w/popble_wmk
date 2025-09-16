package com.popble.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.popble.domain.Users;
import com.popble.dto.UserProfileDTO;

public interface UserProfileService {
	
	UserProfileDTO getUserProfile(Long id);
	
	UserProfileDTO createUserProfile(Users user, String nickname, MultipartFile profileImg) throws IOException;

}
