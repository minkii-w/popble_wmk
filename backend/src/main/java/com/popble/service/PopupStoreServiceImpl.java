//package com.popble.service;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.bind.annotation.ModelAttribute;
//
//import com.popble.domain.Image;
//import com.popble.domain.PopupStore;
//import com.popble.domain.PopupStore.Status;
//import com.popble.domain.SortType;
//import com.popble.dto.PageRequestDTO;
//import com.popble.dto.PageResponseDTO;
//import com.popble.dto.PopupFilterDTO;
//import com.popble.dto.PopupStoreDTO;
//import com.popble.repository.PopupStoreRepository;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//
//@Service
//@Log4j2
//@RequiredArgsConstructor
//@Transactional
//public class PopupStoreServiceImpl implements PopupStoreService {
//	
//	private final PopupStoreRepository popupStoreRepository;
//	private final ModelMapper modelMapper;
//
//	//팝업스토어 리스트
//	public PageResponseDTO<PopupStoreDTO> getFilteredList(@ModelAttribute PopupFilterDTO popupFilterDTO) {
//		
//		// specification 추가(조건에 따라 동적 쿼리 생성)
//		Specification<PopupStore> specification = Specification.where(null);
//		
//		// 진행상테 필터링 조건 추가
//		if(popupFilterDTO.getStatus() != null && popupFilterDTO.getStatus() != Status.ALL) {
//			specification = specification.and((root, query, cb) ->cb.equal(root.get("status"), popupFilterDTO.getStatus()));
//		}
//		//카테고리
//		if(popupFilterDTO.getCategoryType() != null) {
//			specification = specification.and((root,query,cb) -> cb.equal(root.join("categories").get("category").get("type"), popupFilterDTO.getCategoryType()));
//		}
//		if(popupFilterDTO.getCategoryId() != null) {
//			specification = specification.and((root,query,cb) -> cb.equal(root.join("categories").get("category").get("id"), popupFilterDTO.getCategoryId()));
//		}
//		
//		//정렬
//		Sort sort = Sort.by(Sort.Direction.DESC, "id");
//		if(popupFilterDTO.getSort() != null) {
//			if(popupFilterDTO.getSort().equals(SortType.BOOKMARK)) {
//				sort = Sort.by(Sort.Direction.DESC, "bookmarkCount");
//			}else if(popupFilterDTO.getSort().equals(SortType.RECOMMEND)) {
//				sort = Sort.by(Sort.Direction.DESC, "recommend");
//			}else if(popupFilterDTO.getSort().equals(SortType.VIEW)) {
//				sort = Sort.by(Sort.Direction.DESC, "view");
//			}else if(popupFilterDTO.getSort().equals(SortType.END_SOON)) {
//				sort = Sort.by(Sort.Direction.ASC, "endDate");
//			}
//		}
//		
//		//검색 추가
//		if(popupFilterDTO.getKeyword() != null && !popupFilterDTO.getKeyword().isEmpty()) {
//			String keyword = "%" + popupFilterDTO.getKeyword().toLowerCase() + "%";
//			specification = specification.and((root,query,cb) -> cb.or(cb.like(cb.lower(root.get("storeName")),keyword),
//																(cb.like(cb.lower(root.get("address")), keyword)),
//																(cb.like(cb.lower(root.get("desc")), keyword))
//						));
//		}
//		
//		//Pageable 객체 생성(페이징 + 정렬)
//		Pageable pageable = PageRequest.of(popupFilterDTO.getPageRequestDTO().getPage() -1,popupFilterDTO.getPageRequestDTO().getSize(), sort);
//		
//		// Repository 호출
//		Page<PopupStore> result = popupStoreRepository.findAll(specification, pageable);
//		
//		
//		// 결과를 DTO로 변환
//		List<PopupStoreDTO> dtoList = result.getContent().stream()
//				.map(popupStore -> modelMapper.map(popupStore, PopupStoreDTO.class))
//				.collect(Collectors.toList());
//		
//		long totalCount = result.getTotalElements();
//		
//		
//		// PageResponseDTO 생성 및 변환
//		PageResponseDTO<PopupStoreDTO> responseDTO = PageResponseDTO.<PopupStoreDTO>withAll()
//				.dtoList(dtoList)
//				.pageRequestDTO(popupFilterDTO.getPageRequestDTO())
//				.totalCount(totalCount)
//				.build();
//		return responseDTO;
//	}
//
//	
//	public void remove(Long id) {
//		popupStoreRepository.updateToDelete(id, true);
//	}
//	
//	public void modify(PopupStoreDTO popupStoreDTO) {
//		Optional<PopupStore> result = popupStoreRepository.findById(popupStoreDTO.getId());
//		
//		PopupStore popupStore = result.orElseThrow();
//		
//		popupStore.setStoreName(popupStoreDTO.getStoreName());
//		popupStore.setAddress(popupStoreDTO.getAddress());
//		popupStore.setStartDate(popupStoreDTO.getStartDate());
//		popupStore.setEndDate(popupStoreDTO.getEndDate());
//		popupStore.setReservationTimes(popupStoreDTO.getReservationTimes());
//		popupStore.setMaxCount(popupStoreDTO.getMaxCount());
//		popupStore.setDesc(popupStoreDTO.getDesc());
//		popupStore.setPrice(popupStoreDTO.getPrice());
//		
//		popupStore.clearList();
//		
//		List<String> uploadFileNames = popupStoreDTO.getUploadFileNames();
//		
//		if(uploadFileNames != null && uploadFileNames.size() > 0) {
//			uploadFileNames.stream().forEach(uploadName -> {
//				popupStore.addImageString(uploadName);
//			});
//		}
//		
//		popupStoreRepository.save(popupStore);
//	}
//	
//
//	
//	public PopupStoreDTO get(Long id) {
//		Optional<PopupStore> result = popupStoreRepository.findById(id);
//		
//		PopupStore popupStore = result.orElseThrow();
//		
//		PopupStoreDTO dto = modelMapper.map(popupStore, PopupStoreDTO.class);
//		
//		return dto;
//	}
//	
//	private PopupStoreDTO entityToDTO(PopupStore popupStore) {
//		
//		PopupStoreDTO popupStoreDTO = PopupStoreDTO.builder()
//				.id(popupStore.getId())
//				.storeName(popupStore.getStoreName())
//				.address(popupStore.getAddress())
//				.startDate(popupStore.getStartDate())
//				.endDate(popupStore.getEndDate())
//				.reservationTimes(popupStore.getReservationTimes())
//				.maxCount(popupStore.getMaxCount())
//				.desc(popupStore.getDesc())
//				.price(popupStore.getPrice())
//				.build();
//		
//		List<Image> imageList = popupStore.getImageList();
//		
//		if(imageList == null || imageList.size() == 0) {
//			return popupStoreDTO;
//		}
//		
//		List<String> fileNameList = imageList.stream().map(image -> image.getFileName()).toList();
//		
//		popupStoreDTO.setUploadFileNames(fileNameList);
//		
//		return popupStoreDTO;
//	}
//	
//	public Long register(PopupStoreDTO popupStoreDTO) {
//		
//		PopupStore popupStore = dtoEntity(popupStoreDTO);
//		
//		PopupStore result = popupStoreRepository.save(popupStore);
//		
//		return result.getId();
//	}
//	
//	private PopupStore dtoEntity(PopupStoreDTO popupStoreDTO) {
//		
//		PopupStore popupStore = PopupStore.builder()
//				.id(popupStoreDTO.getId())
//				.storeName(popupStoreDTO.getStoreName())
//				.address(popupStoreDTO.getAddress())
//				.startDate(popupStoreDTO.getStartDate())
//				.endDate(popupStoreDTO.getEndDate())
//				.reservationTimes(popupStoreDTO.getReservationTimes())
//				.maxCount(popupStoreDTO.getMaxCount())
//				.desc(popupStoreDTO.getDesc())
//				.price(popupStoreDTO.getPrice())
//				.build();
//		
//		List<String> uploadFileNames = popupStoreDTO.getUploadFileNames();
//		
//		if(uploadFileNames == null) {
//			return popupStore;
//		}
//		
//		uploadFileNames.stream().forEach( uploadName -> {
//			popupStore.addImageString(uploadName);
//		});
//		
//		return popupStore;
//				
//	}
//	
//	public PageResponseDTO<PopupStoreDTO> getList(PageRequestDTO pageRequestDTO){
//		log.info("getList---------------");
//		
//		Pageable pageable = PageRequest.of(
//				pageRequestDTO.getPage() -1,
//				pageRequestDTO.getSize(),
//				Sort.by("id").descending());
//		
//		Page<Object[]> result = popupStoreRepository.selectList(pageable);
//		
//		List<PopupStoreDTO> dtoList = result.get().map( arr -> {
//			
//			PopupStore popupStore = (PopupStore) arr [0];
//			Image image = (Image) arr [1];
//			
//			PopupStoreDTO popupStoreDTO = PopupStoreDTO.builder()
//					.id(popupStore.getId())
//					.storeName(popupStore.getStoreName())
//					.address(popupStore.getAddress())
//					.startDate(popupStore.getStartDate())
//					.endDate(popupStore.getEndDate())
//					.reservationTimes(popupStore.getReservationTimes())
//					.maxCount(popupStore.getMaxCount())
//					.desc(popupStore.getDesc())
//					.price(popupStore.getPrice())
//					.build();
//			
//			String imageStr = image.getFileName();
//			popupStoreDTO.setUploadFileNames(List.of(imageStr));
//			
//			return popupStoreDTO;
//		}).collect(Collectors.toList());
//		
//		long totalCount = result.getTotalElements();
//		
//		return PageResponseDTO.<PopupStoreDTO>withAll()
//				.dtoList(dtoList)
//
//				.totalCount(totalCount)
//				.pageRequestDTO(pageRequestDTO)
//				.build();
//	}
//	
//
//}
