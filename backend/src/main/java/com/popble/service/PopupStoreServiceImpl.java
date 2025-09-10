package com.popble.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.popble.domain.Image;
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

	
	public void remove(Long id) {
		popupStoreRepository.updateToDelete(id, true);
	}
	
	public void modify(PopupStoreDTO popupStoreDTO) {
		Optional<PopupStore> result = popupStoreRepository.findById(popupStoreDTO.getId());
		
		PopupStore popupStore = result.orElseThrow();
		
		popupStore.setStoreName(popupStoreDTO.getStoreName());
		popupStore.setAddress(popupStoreDTO.getAddress());
		popupStore.setStartDate(popupStoreDTO.getStartDate());
		popupStore.setEndDate(popupStoreDTO.getEndDate());
		popupStore.setReservationTimes(popupStoreDTO.getReservationTimes());
		popupStore.setMaxCount(popupStoreDTO.getMaxCount());
		popupStore.setDesc(popupStoreDTO.getDesc());
		popupStore.setPrice(popupStoreDTO.getPrice());
		
		popupStore.clearList();
		
		List<String> uploadFileNames = popupStoreDTO.getUploadFileNames();
		
		if(uploadFileNames != null && uploadFileNames.size() > 0) {
			uploadFileNames.stream().forEach(uploadName -> {
				popupStore.addImageString(uploadName);
			});
		}
		
		popupStoreRepository.save(popupStore);
	}
	
	public PopupStoreDTO get(Long id) {
		Optional<PopupStore> result = popupStoreRepository.selectOne(id);
		
		PopupStore popupStore = result.orElseThrow();
		
		PopupStoreDTO popupStoreDTO = entityToDTO(popupStore);
		
		return popupStoreDTO;
	}
	
	private PopupStoreDTO entityToDTO(PopupStore popupStore) {
		
		PopupStoreDTO popupStoreDTO = PopupStoreDTO.builder()
				.id(popupStore.getId())
				.storeName(popupStore.getStoreName())
				.address(popupStore.getAddress())
				.startDate(popupStore.getStartDate())
				.endDate(popupStore.getEndDate())
				.reservationTimes(popupStore.getReservationTimes())
				.maxCount(popupStore.getMaxCount())
				.desc(popupStore.getDesc())
				.price(popupStore.getPrice())
				.build();
		
		List<Image> imageList = popupStore.getImageList();
		
		if(imageList == null || imageList.size() == 0) {
			return popupStoreDTO;
		}
		
		List<String> fileNameList = imageList.stream().map(image -> image.getFileName()).toList();
		
		popupStoreDTO.setUploadFileNames(fileNameList);
		
		return popupStoreDTO;
	}
	
	public Long register(PopupStoreDTO popupStoreDTO) {
		
		PopupStore popupStore = dtoEntity(popupStoreDTO);
		
		PopupStore result = popupStoreRepository.save(popupStore);
		
		return result.getId();
	}
	
	private PopupStore dtoEntity(PopupStoreDTO popupStoreDTO) {
		
		PopupStore popupStore = PopupStore.builder()
				.id(popupStoreDTO.getId())
				.storeName(popupStoreDTO.getStoreName())
				.address(popupStoreDTO.getAddress())
				.startDate(popupStoreDTO.getStartDate())
				.endDate(popupStoreDTO.getEndDate())
				.reservationTimes(popupStoreDTO.getReservationTimes())
				.maxCount(popupStoreDTO.getMaxCount())
				.desc(popupStoreDTO.getDesc())
				.price(popupStoreDTO.getPrice())
				.build();
		
		List<String> uploadFileNames = popupStoreDTO.getUploadFileNames();
		
		if(uploadFileNames == null) {
			return popupStore;
		}
		
		uploadFileNames.stream().forEach( uploadName -> {
			popupStore.addImageString(uploadName);
		});
		
		return popupStore;
				
	}
	
	public PageResponseDTO<PopupStoreDTO> getList(PageRequestDTO pageRequestDTO){
		log.info("getList---------------");
		
		Pageable pageable = PageRequest.of(
				pageRequestDTO.getPage() -1,
				pageRequestDTO.getSize(),
				Sort.by("id").descending());
		
		Page<Object[]> result = popupStoreRepository.selectList(pageable);
		
		List<PopupStoreDTO> dtoList = result.get().map( arr -> {
			
			PopupStore popupStore = (PopupStore) arr [0];
			Image image = (Image) arr [1];
			
			PopupStoreDTO popupStoreDTO = PopupStoreDTO.builder()
					.id(popupStore.getId())
					.storeName(popupStore.getStoreName())
					.address(popupStore.getAddress())
					.startDate(popupStore.getStartDate())
					.endDate(popupStore.getEndDate())
					.reservationTimes(popupStore.getReservationTimes())
					.maxCount(popupStore.getMaxCount())
					.desc(popupStore.getDesc())
					.price(popupStore.getPrice())
					.build();
			
			String imageStr = image.getFileName();
			popupStoreDTO.setUploadFileNames(List.of(imageStr));
			
			return popupStoreDTO;
		}).collect(Collectors.toList());
		
		long totalCount = result.getTotalElements();
		
		return PageResponseDTO.<PopupStoreDTO>withAll()
				.dtoList(dtoList)
				.totalCount(totalCount)
				.pageRequestDTO(pageRequestDTO)
				.build();
	}
	
	

	
	

	//재형쓰
//	public PageResponseDTO<PopupStoreDTO> getList(PageRequestDTO pageRequestDTO) {
//		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() -1, pageRequestDTO.getSize(), Sort.by("id").descending());
//		
//		Page<PopupStore> result = popupStoreRepository.findAll(pageable);
//		
//		List<PopupStoreDTO> dtoList = result.getContent().stream()
//				.map(popupStore -> modelMapper.map(popupStore, PopupStoreDTO.class))
//				.collect(Collectors.toList());
//		
//		long totalCount = result.getTotalElements();
//		
//		PageResponseDTO<PopupStoreDTO> responseDTO = PageResponseDTO.<PopupStoreDTO>withAll()
//				.dtoList(dtoList)
//				.pageRequestDTO(pageRequestDTO)
//				.totalCount(totalCount)
//				.build();
//		
//		return responseDTO;
//		
//	}
	
	
//	//팝업스토어 등록하기
//	public Long register(PopupStoreDTO popupStoreDTO) {
//		log.info("---------register-----------");
//		PopupStore popupStore = modelMapper.map(popupStoreDTO, PopupStore.class);
//		
//		PopupStore savedPopupStore = popupStoreRepository.save(popupStore);
//		
//		return savedPopupStore.getId();
//	}
//	
//	//팝업스토어 정보 가져오기
//	public PopupStoreDTO get(Long id) {
//		Optional<PopupStore> result = popupStoreRepository.findById(id);
//		
//		PopupStore popupStore = result.orElseThrow();
//		
//		PopupStoreDTO popupStoreDTO = modelMapper.map(popupStore, PopupStoreDTO.class);
//		
//		return popupStoreDTO;
//	}
//	

}
