package com.popble.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.popble.repository.PopupRecommendRepository;
import com.popble.service.PopupRecommendService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/popup")
@RequiredArgsConstructor
public class PopupRecommendController {

	private final PopupRecommendService popupRecommendService;

	// 추천 추가
	@PostMapping("/{popupId}/recommend")
	public ResponseEntity<Void> recommend(@RequestParam(name = "userId") Long userId,
			@PathVariable(name = "popupId") Long popupId) {
		popupRecommendService.recommend(userId, popupId);
		return ResponseEntity.ok().build();
	}

	// 추천 취소
	@DeleteMapping("/{popupId}/recommend")
	public ResponseEntity<Void> cancelRecommend(@RequestParam(name = "userId") Long userId,
			@PathVariable(name = "popupId") Long popupId) {
		popupRecommendService.cancelRecommend(userId, popupId);
		return ResponseEntity.ok().build();
	}

	// 추천 여부 확인
	@GetMapping("/{popupId}/recommend")
	public ResponseEntity<Boolean> isRecommended(@RequestParam(name = "userId") Long userId,
			@PathVariable(name = "popupId") Long popupId) {
		popupRecommendService.isRecommended(userId, popupId);
		return ResponseEntity.ok().build();
	}
}
