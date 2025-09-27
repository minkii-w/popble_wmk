package com.popble.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.popble.domain.MapApi;
import com.popble.repository.MapApiRepository;

@RestController
@RequestMapping("/api/popups")
@CrossOrigin(origins = "http://localhost:3000") // 리액트 개발 서버 주소
public class MapController {
	
	private final MapApiRepository mapApiRepository;
	
	public MapController(MapApiRepository mapApiRepository) {
		this.mapApiRepository = mapApiRepository;
	}
	
	@GetMapping
	public List<MapApi> getAll(){
		return mapApiRepository.findAll();
	}
}
