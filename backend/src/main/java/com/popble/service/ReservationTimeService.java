package com.popble.service;

import java.time.LocalDate;
import java.util.List;

import com.popble.dto.ReservationTimeDTO;

public interface ReservationTimeService {
	
	public Long createReservationTime(ReservationTimeDTO reservationTimeDTO);
	
	
	public List<ReservationTimeDTO> getAvailableTimesByDate(Long popupStoreId, LocalDate date);
	

}
