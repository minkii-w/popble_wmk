package com.popble.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.popble.domain.PopupStore;
import com.popble.dto.PageRequestDTO;
import com.popble.dto.PageResponseDTO;
import com.popble.dto.PopupStoreDTO;
import com.popble.repository.PopupStoreRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class PopupStoreServiceImpl implements PopupStoreService {
	
	private final PopupStoreRepository popupStoreRepository;
	private final ModelMapper modelMapper;


	public PageResponseDTO<PopupStoreDTO> getList(PageRequestDTO pageRequestDTO) {
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() -1, pageRequestDTO.getSize(), Sort.by("id").descending());
		
		Page<PopupStore> result = popupStoreRepository.findAll(pageable);
		
		List<PopupStoreDTO> dtoList = result.getContent().stream()
				.map(popupStore -> modelMapper.map(popupStore, PopupStoreDTO.class))
				.collect(Collectors.toList());
		
		long totalCount = result.getTotalElements();
		
		PageResponseDTO<PopupStoreDTO> responseDTO = PageResponseDTO.<PopupStoreDTO>withAll()
				.dtoList(dtoList)
				.pageRequestDTO(pageRequestDTO)
				.totalCount(totalCount)
				.build();
		
		return responseDTO;
		
	}
	
	//팝업스토어 등록하기
	public Long register(PopupStoreDTO popupStoreDTO) {
		log.info("---------register-----------");
		PopupStore popupStore = modelMapper.map(popupStoreDTO, PopupStore.class);
		
		PopupStore savedPopupStore = popupStoreRepository.save(popupStore);
		
		return savedPopupStore.getId();
	}
	
	//팝업스토어 정보 가져오기
	public PopupStoreDTO get(Long id) {
		Optional<PopupStore> result = popupStoreRepository.findById(id);
		
		PopupStore popupStore = result.orElseThrow();
		
		PopupStoreDTO popupStoreDTO = modelMapper.map(popupStore, PopupStoreDTO.class);
		
		return popupStoreDTO;
	}

}
