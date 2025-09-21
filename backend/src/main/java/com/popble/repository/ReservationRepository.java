package com.popble.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.PopupStore;
import com.popble.domain.Reservation;




public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	//특정 유저의 예약 내역
	List<Reservation> findByUserProfileId(Long userProfileId);
	
	
	//특정 팝업스토어의 예약 내역
	List<Reservation> findByPopupStoreId(Long popupstoreId);
	
	
	//예약 날짜 기준으로 조회
	List<Reservation> findByCreateDateTime(LocalDateTime createDateTime);
	
	
	//예약 가능한 날짜 기간찾아오기
	List<Reservation> findByPopupStoreAndReservationDate(PopupStore popupStore, LocalDate reservationDate);
	
	
	//팝업스토어 특정날짜의 모든 예약
	List<Reservation> findByPopupStoreAndReservationTime_Date(PopupStore popupStore, LocalDate date);
	
	
	
	//특정 날짜,시간에 예약조회 -> 예약 가능한 인원수 체크 용도
	List<Reservation> findByReservationTime_DateAndReservationTime_Time(LocalDate date, String time);
	
	//날짜별 예약 현황 확인, 달력에서 예약 가능 여부 표시 용도
	List<Reservation> findByReservationTime_PopupStoreIdAndReservationTime_Date(Long popupStoreId, LocalDate date);
	
	
	//같은시간대 충돌방지 
	List<Reservation> findByPopupStore_IdAndReservationTime_DateAndReservationTime_StartTime(Long popupStoreId, LocalDate date, LocalTime startTime);
	
}
