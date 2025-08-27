package com.popble.dto;

import java.time.LocalDateTime;

import com.popble.domain.PopupStore;

public class ReservationDTO {

	//예약 고유번호
	private Long id;
	
	//팝업번호
	private PopupStore popupId;
	
	//예약 번호
	private Long reservationNumber;
	
	//예약 날짜
	private LocalDateTime reservationDate;
	
	//가격
	private int price;
	
	//인원수
	private int reservationCount;
	
	//예약 시간
	private LocalDateTime reservationTime;
}
