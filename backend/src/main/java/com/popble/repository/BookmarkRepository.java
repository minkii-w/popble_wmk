package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Bookmark;
import com.popble.domain.UserProfile;

import java.util.List;
import java.util.Optional;
import com.popble.domain.PopupStore;
import java.time.LocalDateTime;




public interface BookmarkRepository extends JpaRepository<Bookmark, Long>{

	//유저의 북마크
	List<Bookmark> findByUserProfile(UserProfile userProfile);
	//북마크한 팝업스토어를 최신순으로
	List<Bookmark> findByUserProfileOrderByCreateDateDesc(UserProfile userProfile);
	//특정 유저가 북마크를 했는지 안했는지 여부
	Optional<Bookmark> findByUserProfileAndPopupStore(UserProfile userProfile, PopupStore popupStore);
	
		
}
