package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Bookmark;
import com.popble.domain.UserProfile;

import java.util.List;
import java.util.Optional;
import com.popble.domain.PopupStore;



public interface BookmarkRepository extends JpaRepository<Bookmark, Long>{

	//유저의 북마크
	List<Bookmark> findByUserId(UserProfile userId);
	
	//유저가 특정 팝업을 북마크했는지 확인(중복 검사)
	Optional<Bookmark> findByUserIdAndPopupId(UserProfile userId, PopupStore popupId);
	
	
}
