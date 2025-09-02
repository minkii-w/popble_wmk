package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Bookmark;
import com.popble.domain.UserProfile;

import java.util.List;
import java.util.Optional;
import com.popble.domain.PopupStore;



public interface BookmarkRepository extends JpaRepository<Bookmark, Long>{

	//유저의 북마크
	List<Bookmark> findByUserProfile(UserProfile userProfile);
	
	
	Optional<Bookmark> findByUserProfileAndPopupStore(UserProfile userProfile, PopupStore popupStore);
	
	
	
	
}
