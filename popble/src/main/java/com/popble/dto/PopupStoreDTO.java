package com.popble.dto;

import java.time.LocalDate;

public class PopupStoreDTO {
	
	//팝업 고유 번호
	private Long id;
	
	//팝업스토어 이름
	private String storeName;
	
	//팝업스토어 상세정보
	private String desc;
	
	//팝업스토어 주소
	private String address;
	
	//시작일
	private LocalDate startDate;
	
	//종료일
	private LocalDate endDate;
	
	//가격
	private int price;
	
	//팝업스토어 상태
	private String status;
	
	//조회수
	private int view;
	
	//추천수
	private int recommend;
}
