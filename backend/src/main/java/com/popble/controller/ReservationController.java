package com.popble.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.popble.dto.PopupStoreDTO;
import com.popble.dto.ReservationDTO;
import com.popble.service.PopupStoreService;
import com.popble.service.ReservationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/popup")

public class ReservationController {
	
	private final PopupStoreService popupStoreService;
	
	private final ReservationService reservationService;
	
	//id로 팝업스토어 정보 가져오기
	@GetMapping("/reservation/{id}")
	public ResponseEntity<PopupStoreDTO> getReservation(@PathVariable("id") Long id) {
		PopupStoreDTO popupstore = popupStoreService.get(id);
		return ResponseEntity.ok(popupstore);
	}
	
	
	@PostMapping("/reservation")
	public ResponseEntity<ReservationDTO> reserve(@RequestBody ReservationDTO reservationDTO) {
	    // 예약 저장 로직 (service 호출)
	    Long id = reservationService.register(reservationDTO);
	    reservationDTO.setId(id);
	    return ResponseEntity.ok(reservationDTO);
	}

}
