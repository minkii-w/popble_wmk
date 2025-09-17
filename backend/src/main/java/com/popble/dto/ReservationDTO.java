package com.popble.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
	
	
	private Long id;
	
	private Long popupStoreId;
	
	private Long userProfileId;
	
	
	private String userName;
	
	private LocalDateTime createDateTime;
	
	private String reservationTime;
	
	private String phonenumber;
	
	private int reservationCount;
	
	private LocalDate reservationDate;
	
	private String startTime;
	
	private String endTime;
	
	
	

}
