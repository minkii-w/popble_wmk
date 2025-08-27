package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{

}
