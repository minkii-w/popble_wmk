package com.popble.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.popble.domain.UserProfile;
import com.popble.dto.BookmarkDTO;
import com.popble.dto.PopupStoreDTO;

public interface BookmarkService{

	//북마크 추가(팝업스토어의 bookmark count증가)
	boolean addBookmark(Long userId, Long popupId);
	
	//북마크 삭제(팝업스토어의 bookmark count감소)
	boolean deleteBookmark(Long userId, Long popupId);
	
	//북마크 여부
	boolean isBookmark(Long userId, Long popupId);
	
	//User의 북마크
	Page<BookmarkDTO> bookmarkList(Long userId, Pageable pageable);
	
}
