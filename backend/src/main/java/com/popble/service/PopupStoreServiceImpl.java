package com.popble.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.popble.domain.Image;
import com.popble.domain.PopupStore;
import com.popble.domain.PopupStore.Status;
import com.popble.domain.ReservationTime;
import com.popble.domain.SortType;
import com.popble.dto.PageRequestDTO;
import com.popble.dto.PageResponseDTO;
import com.popble.dto.PopupFilterDTO;
import com.popble.dto.PopupStoreDTO;
import com.popble.dto.ReservationTimeDTO;
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

	public PageResponseDTO<PopupStoreDTO> getFilteredList(@ModelAttribute PopupFilterDTO popupFilterDTO) {
		Specification<PopupStore> specification = Specification.where(null);
		
		if(popupFilterDTO.getStatus() != null && popupFilterDTO.getStatus() != Status.ALL) {
			specification = specification.and((root, query, cb) ->cb.equal(root.get("status"), popupFilterDTO.getStatus()));
		}
		if(popupFilterDTO.getCategoryType() != null) {
			specification = specification.and((root,query,cb) -> cb.equal(root.join("categories").get("category").get("type"), popupFilterDTO.getCategoryType()));
		}
		if(popupFilterDTO.getCategoryId() != null) {
			specification = specification.and((root,query,cb) -> cb.equal(root.join("categories").get("category").get("id"), popupFilterDTO.getCategoryId()));
		}
		
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		if(popupFilterDTO.getSort() != null) {
			if(popupFilterDTO.getSort().equals(SortType.BOOKMARK)) {
				sort = Sort.by(Sort.Direction.DESC, "bookmarkCount");
			}else if(popupFilterDTO.getSort().equals(SortType.RECOMMEND)) {
				sort = Sort.by(Sort.Direction.DESC, "recommend");
			}else if(popupFilterDTO.getSort().equals(SortType.VIEW)) {
				sort = Sort.by(Sort.Direction.DESC, "view");
			}else if(popupFilterDTO.getSort().equals(SortType.END_SOON)) {
				sort = Sort.by(Sort.Direction.ASC, "endDate");
			}
		}
		
		if(popupFilterDTO.getKeyword() != null && !popupFilterDTO.getKeyword().isEmpty()) {
			String keyword = "%" + popupFilterDTO.getKeyword().toLowerCase() + "%";
			specification = specification.and((root,query,cb) -> cb.or(cb.like(cb.lower(root.get("storeName")),keyword),
																(cb.like(cb.lower(root.get("address")), keyword)),
																(cb.like(cb.lower(root.get("desc")), keyword))
						));
		}
		
		Pageable pageable = PageRequest.of(popupFilterDTO.getPageRequestDTO().getPage() -1,popupFilterDTO.getPageRequestDTO().getSize(), sort);
		
		Page<PopupStore> result = popupStoreRepository.findAll(specification, pageable);
		
		List<PopupStoreDTO> dtoList = result.getContent().stream()
				.map(popupStore ->{
					PopupStoreDTO dto = modelMapper.map(popupStore, PopupStoreDTO.class);
					List<String> fileNames = popupStore.getImageList().stream()
											.map(image->image.getFileName())
											.collect(Collectors.toList());
					dto.setUploadFileNames(fileNames);
					return dto;
				})
				.collect(Collectors.toList());
		
		long totalCount = result.getTotalElements();
		
		PageResponseDTO<PopupStoreDTO> responseDTO = PageResponseDTO.<PopupStoreDTO>withAll()
				.dtoList(dtoList)
				.pageRequestDTO(popupFilterDTO.getPageRequestDTO())
				.totalCount(totalCount)
				.build();
		return responseDTO;
	}
	
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
//
//			PopupStoreDTO popupStoreDTO = PopupStoreDTO.builder()
//					.id(popupStore.getId())
//					.storeName(popupStore.getStoreName())
//					.address(popupStore.getAddress())
//					.startDate(popupStore.getStartDate())
//					.endDate(popupStore.getEndDate())
//					.desc(popupStore.getDesc())
//					.price(String.valueOf(popupStore.getPrice())) // int -> String 변환
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
//				.totalCount(totalCount)
//				.pageRequestDTO(pageRequestDTO)
//				.build();
//	}

	public void modify(PopupStoreDTO popupStoreDTO) {
        Optional<PopupStore> result = popupStoreRepository.findById(popupStoreDTO.getId());
        
        PopupStore popupStore = result.orElseThrow();
        
        popupStore.setStoreName(popupStoreDTO.getStoreName());
        popupStore.setAddress(popupStoreDTO.getAddress());
        popupStore.setStartDate(popupStoreDTO.getStartDate());
        popupStore.setEndDate(popupStoreDTO.getEndDate());
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
		
		Optional<PopupStore> result = popupStoreRepository.findById(id);
		PopupStore popupStore = result.orElse(null);
		if(popupStore == null) {
			return null;
		}
		return entityToDTO(popupStore);
	}
	
	
	
	private PopupStoreDTO entityToDTO(PopupStore popupStore) {

		PopupStoreDTO popupStoreDTO = PopupStoreDTO.builder()
		    .id(popupStore.getId())
		    .storeName(popupStore.getStoreName())
		    .address(popupStore.getAddress())
		    .startDate(popupStore.getStartDate())
		    .endDate(popupStore.getEndDate())
		    .desc(popupStore.getDesc())
		    .price(popupStore.getPrice())
		    .parking(popupStore.isParking())
		    .build();

		List<Image> imageList = popupStore.getImageList();
		if (imageList != null && !imageList.isEmpty()) {
			List<String> fileNameList = imageList.stream()
			        .map(Image::getFileName)
			        .toList();
			popupStoreDTO.setUploadFileNames(fileNameList);
		}

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
                .desc(popupStoreDTO.getDesc())
                .price(popupStoreDTO.getPrice())
                .parking(popupStoreDTO.isParking())
                .build();
        
        
        List<String> uploadFileNames = popupStoreDTO.getUploadFileNames();
        if(uploadFileNames != null) {
            uploadFileNames.stream().forEach( uploadName -> {
                popupStore.addImageString(uploadName);
            });
        }
        
        return popupStore; 
    }
	
	
	
	public void remove(Long id) {
	    popupStoreRepository.updateToDelete(id, true);
	}
}