package com.popble.domain;

import java.time.LocalDateTime;

public class Payments {

	public enum Status{
		PENDING, COMPLETED, FAILED, CANCELED, REFUNDED
	}
	
	//결제 고유 번호
	private Long id;
	
	//결제 금액
	private int amount;
	
	//결제 방식
	private String method;
	
	private Status status;
	
	private LocalDateTime payTime;
	
	//예약 번호
	private Reservation reservationId;
}
