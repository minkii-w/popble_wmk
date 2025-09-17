package com.popble.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.ReservationTime;

public interface ReservationTimeRepository extends JpaRepository<ReservationTime, Long>{
	
	List<ReservationTime> findAllByTime(String time);
	
	Optional<ReservationTime> findByDateAndStartTimeAndEndTime(LocalDate date, LocalTime startTime, LocalTime endTime);

}
