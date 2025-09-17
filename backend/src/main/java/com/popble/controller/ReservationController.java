package com.popble.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.popble.dto.PopupStoreDTO;
import com.popble.dto.ReservationDTO;
import com.popble.service.ReservationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/popup")

public class ReservationController {
	
	
	private final ReservationService reservationService;
	
	//예약 조회
	@GetMapping("/reservation/{id}")
	public ResponseEntity<ReservationDTO> getReservation(@PathVariable("id") Long id) {
		ReservationDTO reservation = reservationService.get(id);
		return ResponseEntity.ok(reservation);
	}
	
	//예약등록
	@PostMapping("/reservation")
	public ResponseEntity<ReservationDTO> reserve(@RequestBody ReservationDTO reservationDTO) {
	    // 예약 저장 로직 (service 호출)
	    Long id = reservationService.register(reservationDTO);
	    reservationDTO.setId(id);
	    return ResponseEntity.ok(reservationDTO);
	}
	
	//예약조회(유저프로필기준) -> 매핑 다시 확인!
	@GetMapping("/reservation/user/{userProfileId}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByUser(@PathVariable Long userProfileId) {
        List<ReservationDTO> reservations = reservationService.getByUserProfile(userProfileId);
        return ResponseEntity.ok(reservations);
    }
	

}
