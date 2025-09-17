package com.popble.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.popble.dto.PopupStoreDTO;
import com.popble.service.BookmarkService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


//여기 있는 내용 전부 나중에 Principal로 바꿔야함
@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/bookmark")
public class BookmarkController {

	private final BookmarkService bookmarkService;
	
	//북마크 추가
	@PostMapping("/{userId}/{popupId}")
	public boolean addBookmark(@PathVariable("userId") Long userId,@PathVariable("popupId") Long popupId) {
		log.info("북마크 추가 요청 userId={}, popupId={}", userId, popupId);
		return bookmarkService.addBookmark(userId, popupId);
	}
	
	//북마크 삭제
	@DeleteMapping("/{userId}/{popupId}")
	public boolean deleteBookmark(@PathVariable("userId") Long userId, @PathVariable("popupId") Long popupId) {
		log.info("북마크 삭제 요청 userId={}, popupId={}", userId, popupId);
		return bookmarkService.deleteBookmark(userId, popupId);
	}
	
	//북마크 여부 확인
	@GetMapping("/check/{userId}/{popupId}")
	public boolean isBookmark(@PathVariable("userId") Long userId, @PathVariable("popupId") Long popupId) {
		return bookmarkService.isBookmark(userId, popupId);
	}
	
	//내 북마크 목록
	@GetMapping("list/{userId}")
	public Page<PopupStoreDTO> getBookmarkList(@PathVariable("userId")Long userId, Pageable pageable){
		return bookmarkService.bookmarkList(userId, pageable);
	}
}
