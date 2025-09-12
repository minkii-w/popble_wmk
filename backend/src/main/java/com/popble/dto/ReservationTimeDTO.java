package com.popble.dto;



import java.time.LocalTime;

import com.popble.domain.ReservationTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationTimeDTO {
	
	private LocalTime startTime;
	
	private LocalTime endTime;
	
	private ReservationTime.AmPm amPm;
}
