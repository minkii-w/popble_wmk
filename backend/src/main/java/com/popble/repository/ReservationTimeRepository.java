package com.popble.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.ReservationTime;

public interface ReservationTimeRepository extends JpaRepository<ReservationTime, Long>{
	
	Optional<ReservationTime> findByTime(String time);

}
