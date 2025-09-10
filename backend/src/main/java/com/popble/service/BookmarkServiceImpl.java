package com.popble.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.popble.domain.Bookmark;
import com.popble.domain.PopupStore;
import com.popble.domain.UserProfile;
import com.popble.dto.PopupStoreDTO;
import com.popble.repository.BookmarkRepository;
import com.popble.repository.PopupStoreRepository;
import com.popble.repository.UserProfileRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class BookmarkServiceImpl implements BookmarkService{

	private final BookmarkRepository bookmarkRepository;
	private final UserProfileRepository userProfileRepository;
	private final PopupStoreRepository popupStoreRepository;
	private final ModelMapper modelMapper;
	
	//북마크 추가
	public boolean addBookmark(Long userId, Long popupId) {
		
		UserProfile user = userProfileRepository.findById(userId)
								.orElseThrow();
		
		PopupStore popup = popupStoreRepository.findById(popupId)
								.orElseThrow();
		
		if(bookmarkRepository.findByUserProfileAndPopupStore(user,popup).isEmpty()) {
			Bookmark bookmark = new Bookmark();
			bookmark.setUserProfile(user);
			bookmark.setPopupStore(popup);
			bookmark.setCreateDate(LocalDateTime.now());
			bookmarkRepository.save(bookmark);
			
			popup.setBookmarkCount(popup.getBookmarkCount() + 1);
			popupStoreRepository.save(popup);
			
			return true;
		}
		
		return false;
	}
	
	//북마크 삭제
	public boolean deleteBookmark(Long userId, Long popupId) {
		UserProfile user = userProfileRepository.findById(userId)
							.orElseThrow();
		
		PopupStore popup = popupStoreRepository.findById(popupId)
							.orElseThrow();
		
		Optional<Bookmark> bm = bookmarkRepository.findByUserProfileAndPopupStore(user, popup);
		
		if(bm.isPresent()) {
			Bookmark bookmark = bm.get();
			bookmarkRepository.delete(bookmark);
			popup.setBookmarkCount(popup.getBookmarkCount()-1);

			return true;
		}
		
		return false;
	}
	
	//북마크 리스트
	public Page<PopupStoreDTO> bookmarkList(Long userId, Pageable pageable){
		
	
		UserProfile user = userProfileRepository.findById(userId)
							.orElseThrow();
		
		Page<Bookmark> bookmarks = bookmarkRepository.findByUserProfileOrderByCreateDateDesc(user, pageable);
		
		return bookmarks.map(bookmark -> modelMapper.map(bookmark.getPopupStore(), PopupStoreDTO.class));
	}

	//북마크 여부
	public boolean isBookmark(Long userId, Long popupId) {
		
		UserProfile user = userProfileRepository.findById(userId)
							.orElseThrow();
		
		PopupStore popupStore = popupStoreRepository.findById(popupId)
								.orElseThrow();
		
		return bookmarkRepository.existsByUserProfileAndPopupStore(user, popupStore);
	}
}
