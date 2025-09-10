package com.popble.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.popble.dto.PopupStoreDTO;
import com.popble.service.PopupStoreService;
import com.popble.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/popup")
public class PopupStoreController {
	
	
	private final CustomFileUtil fileUtil;

	private final PopupStoreService popupStoreService;
	
	@GetMapping("/{id}")
	public PopupStoreDTO read(@PathVariable("id") Long id) {
		return popupStoreService.get(id);
	}
	
	@PostMapping("/")
	public Map<String, String> register(PopupStoreDTO popupStoreDTO){
		log.info("팝업스토어등록 :" + popupStoreDTO);
		
		List<MultipartFile> files = popupStoreDTO.getFiles();
		
		List<String> uploadFileNames = fileUtil.saveFiles(files);
		
		popupStoreDTO.setUploadFileNames(uploadFileNames);
		
		log.info(uploadFileNames);
		
		Long id = popupStoreService.register(popupStoreDTO);
		
		return Map.of("결과","성공");
	}
	
	@GetMapping("/view/{fileName}")
	public ResponseEntity<Resource> viewFileGet(@PathVariable("fileName") String fileName){
		
		return fileUtil.getFile(fileName);
	}
	
	@PutMapping("/{id}")
	public Map<String, String> modify(@PathVariable("id") Long id, PopupStoreDTO popupStoreDTO){
		popupStoreDTO.setId(id);
		
		PopupStoreDTO oldPopupStoreDTO = popupStoreService.get(id);
		
		List<String>oldFileNames = oldPopupStoreDTO.getUploadFileNames();
		List<MultipartFile> files = popupStoreDTO.getFiles();
		List<String> currentUploadFileNames = fileUtil.saveFiles(files);
		List<String> uploadFileNames = popupStoreDTO.getUploadFileNames();
		
		if(currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
			uploadFileNames.addAll(currentUploadFileNames);
		}
		
		popupStoreService.modify(popupStoreDTO);
		
		if(oldFileNames != null && oldFileNames.size()> 0 ) {
			
			List<String> removeFiles = oldFileNames
					.stream()
					.filter(fileName -> uploadFileNames.indexOf(fileName) == -1).collect(Collectors.toList());
			
			fileUtil.deleteFile(removeFiles);
		}
		
		return Map.of("결과","성공");
	}
	
	@DeleteMapping("/{id}")
	public Map<String, String> remove(@PathVariable("id")Long id){
		List<String>oldFileNames = popupStoreService.get(id).getUploadFileNames();
		
		popupStoreService.remove(id);
		
		fileUtil.deleteFile(oldFileNames);
		
		return Map.of("결과","성공");
	}
	
	
}
