package com.popble;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.popble.domain.PopupStore;
import com.popble.repository.PopupStoreRepository;

@SpringBootTest
public class PopupStoreRepositoryTest {
	
	@Autowired
	PopupStoreRepository popupStoreRepository;

	@Test
	void contextLoads() {
		
		List<PopupStore> bookmark = 
		popupStoreRepository.findAllByOrderByBookmarkCountDesc();

		
		List<PopupStore> recommend = 
		popupStoreRepository.findAllByOrderByRecommendDesc();
		
		List<PopupStore> view = 
		popupStoreRepository.findAllByOrderByViewDesc();
		
		List<PopupStore> endDate = 
		popupStoreRepository.findAllByEndDateAfterOrderByEndDateAsc(LocalDate.now());
		
		for(PopupStore b:bookmark) {
			System.out.println("북마크수:" + b.getBookmarkCount() + "스토어이름:" + b.getStoreName());
		}
		for(PopupStore v:view) {
			System.out.println("조회수:" + v.getView() + "스토어이름:" + v.getStoreName());
		}
		for(PopupStore r:recommend) {
			System.out.println("추천수:" + r.getRecommend() + "스토어이름:" + r.getStoreName());
		}
		for(PopupStore e:endDate) {
			System.out.println("종료임박순:" + e.getEndDate() + "스토어이름:" + e.getStoreName());
		}
		
	}
}
