package com.popble.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.popble.domain.ReservationTime;
import com.popble.dto.PopupStoreDTO;
import com.popble.dto.ReservationDTO;
import com.popble.dto.ReservationTimeDTO;
import com.popble.repository.ReservationTimeRepository;
import com.popble.service.ReservationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/reservation")

public class ReservationController {
	
	
	private final ReservationService reservationService;
	private final ReservationTimeRepository reservationTimeRepository;
	
	
	//예약 조회
		@GetMapping("/{id}")
		public ResponseEntity<ReservationDTO> getReservation(@PathVariable("id") Long id) {
			return ResponseEntity.ok(reservationService.get(id));
		}
		
		//예약등록
		@PostMapping("/register")
		public ResponseEntity<ReservationDTO> reservationRegister(@RequestBody ReservationDTO reservationDTO) {
		    Long id = reservationService.register(reservationDTO);
		    reservationDTO.setId(id);
		    return ResponseEntity.ok(reservationDTO);
		}
		
		//예약조회(팝업스토어기준)
		@GetMapping("/popupStore/{popupStoreId}")
		public ResponseEntity<List<ReservationDTO>> getReservationByPopupStore(@PathVariable("popupStoreId") Long popupStoreId) {
			return ResponseEntity.ok(reservationService.getByPopupStore(popupStoreId));
		}
		
		//예약취소하기
		@DeleteMapping("/{id}")
		public ResponseEntity<String> cancelReservation(@PathVariable("id") Long id) {
			reservationService.cancel(id);
			return ResponseEntity.ok("예약이 성공적으로 취소되었습니다.");
		}
		
		@GetMapping("/remaining")
		public ResponseEntity<Integer> getRemainingSeats(
		        @RequestParam("popupStoreId") Long popupStoreId,
		        @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
		        @RequestParam("startTime") @DateTimeFormat(pattern = "HH:mm") LocalTime startTime, 
		        @RequestParam("endTime") @DateTimeFormat(pattern = "HH:mm") LocalTime endTime) {   
		    
		    int remainingSeats = reservationService.getRemainingSeats(popupStoreId, date, startTime, endTime);
		    
		    return ResponseEntity.ok(remainingSeats);
		}
    
}
	
	
