package com.popble.domain;

import java.time.LocalDateTime;

public class Reservation {

	//예약 고유 번호
	private Long id;
	
	//팝업 번호
	private PopupStore popupId;
	
	//회원 번호
	private UserProfile userId;
	
	//예약번호(이거 난수로 만들어야함)
	//필드명 줄일 방법
	private Long reservationNumber;
	
	//예약 날짜
	private LocalDateTime reservationDate;
	
	//가격
	private int price;
	
	//인원수
	private int reservationCount;
	
	//예약 시간(예약 당시 시간?) 예약 타이밍이라면 String, VARCHAR로 바꾸어야할듯
	private LocalDateTime reservationTime;
	
	
}
