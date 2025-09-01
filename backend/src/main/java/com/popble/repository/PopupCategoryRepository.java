package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.PopupCategory;

public interface PopupCategoryRepository extends JpaRepository<PopupCategory, Long>{

	//특정 팝업스토어가 포함된 카테고리 리스트
	
	//특정 카테고리에 속한 모든 팝업스토어
}
