package com.popble.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	//특정 유저의 예약 내역
	List<Reservation> findByPopupStore_Id(Long popupStoreId);
	//특정 팝업스토어의 예약 내역
	
	//예약 날짜 기준으로 조회
	
	//특정 시간에 예약된 건수
}
