package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.PopupStore;

public interface PopupStoreRepository extends JpaRepository<PopupStore, Long>{

	//기업 유저가 등록한 팝업 리스트
	
	//종료일이 1개월 지난 팝업스토어
	
	//특정 카테고리에 속한 팝업스토어 조회
	
	//삭제되지 않은 팝업만 조회
	
	//추천수가 높은 순으로 정렬
}
