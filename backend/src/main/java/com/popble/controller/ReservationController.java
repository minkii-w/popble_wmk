package com.popble.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.popble.domain.ReservationTime;
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
		return ResponseEntity.ok(reservationService.get(id));
	}
	
	//예약등록
	@PostMapping("/reservation")
	public ResponseEntity<ReservationDTO> reservationRegister(@RequestBody ReservationDTO reservationDTO) {
	    // 예약 저장 로직 (service 호출)
	    Long id = reservationService.register(reservationDTO);
	    reservationDTO.setId(id);
	    return ResponseEntity.ok(reservationDTO);
	}
	
	
	//예약조회(팝업스토어기준)
	@GetMapping("/reservation/popupStore/{popupStoreId}")
	public ResponseEntity<List<ReservationDTO>> getReservationByPopupStore(@PathVariable("popupStoreId") Long popupStoreId){
		return ResponseEntity.ok(reservationService.getByPopupStore(popupStoreId));
	}
	
	
	//예약취소하기
	@DeleteMapping("/reservation/{id}")
	public ResponseEntity<String> cancelReservation(@PathVariable("id") Long id){
		reservationService.cancel(id);
		return ResponseEntity.ok("예약취소메세지");
	}
	
	
	//잔여인원조회
	@GetMapping("/remaining")
	public ResponseEntity<Integer> getRemaining(
			@RequestParam Long popupStoreId,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd")LocalDate date,
			@RequestParam @DateTimeFormat(pattern = "HH:mm")LocalTime startTime,
			@RequestParam @DateTimeFormat(pattern = "HH:mm")LocalTime endTime){
		
		int remaining = reservationService.getRemaining(popupStoreId, date, startTime, endTime);
		return ResponseEntity.ok(remaining);
	}
	
	//팝업스토어 해당날짜에만 예약 가능하기 
	@GetMapping("/popup/{popupStoreId}/availableDate/{date}")
	public ResponseEntity<List<ReservationTime>> getAvailableDate(
			@PathVariable("popupStoreId") Long popupStoreId, 
			@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate date){
		
		List<ReservationTime> availableDate = reservationService.getAvailableDate(popupStoreId, date);
		return ResponseEntity.ok(availableDate);
	}

}
