//package com.popble.controller;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.popble.dto.PopupStoreDTO;
//import com.popble.service.PopupStoreService;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//
//@RestController
//@RequiredArgsConstructor
//@Log4j2
//@RequestMapping("/api/popup")
//
//public class ReservationController {
//	
//	private final PopupStoreService popupStoreService;
//	
//	//id로 팝업스토어 정보 가져오기
//	@GetMapping("/reservation/{id}")
//	public PopupStoreDTO get(@PathVariable("id") Long id) {
//		return popupStoreService.get(id);
//	}
//
//}
