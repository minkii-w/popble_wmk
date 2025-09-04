package com.popble.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.popble.dto.PageRequestDTO;
import com.popble.dto.PageResponseDTO;
import com.popble.dto.PopupStoreDTO;
import com.popble.service.PopupStoreService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/popup")
public class PopupStoreController {

	private final PopupStoreService popupStoreService;
	
	@GetMapping("/list")
	public PageResponseDTO<PopupStoreDTO> getList(PageRequestDTO pageRequestDTO){
		
		return popupStoreService.getList(pageRequestDTO);
	}
	
}
