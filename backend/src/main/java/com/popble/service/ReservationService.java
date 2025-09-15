package com.popble.service;

import java.util.List;

import com.popble.dto.ReservationDTO;

public interface ReservationService {
	
	
	//예약등록
	Long register(ReservationDTO reservationDTO);
	
	//예약 조회
	ReservationDTO get(Long id);
	
	//예약 목록 조회
	List<ReservationDTO>getByPopupStore(Long popupStore);
	
	//예약 취소
	void cancel(Long id);

}
