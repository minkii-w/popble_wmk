package com.popble.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.PopupStore;
import com.popble.domain.ReservationTime;

public interface ReservationTimeRepository extends JpaRepository<ReservationTime, Long>{
	
	
	//팝업스토어의 모든 예약 시간 정보 조회 가능
	List<ReservationTime> findAllByPopupStoreId(Long popupStoreId);
	
	
	//같은 시간대여도 중복방지(팝업스토어id로 중복방지해결가능)
	Optional<ReservationTime> findByPopupStoreIdAndDateAndStartTimeAndEndTime(Long popupStoreId, LocalDate date, LocalTime startTime, LocalTime endTime);
	
	
	
	
	
	//메소드 확인해보기 
	//예약이 가능한 날짜 기간
	List<ReservationTime> findByPopupStore(PopupStore popupStore);

}
