package com.popble.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.popble.domain.PopupStore;
import com.popble.domain.SortType;
import com.popble.dto.PageRequestDTO;
import com.popble.dto.PageResponseDTO;
import com.popble.dto.PopupFilterDTO;
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

	public PageResponseDTO<PopupStoreDTO> getFilteredList(PopupFilterDTO popupFilterDTO) {
		
		// specification 추가(조건에 따라 동적 쿼리 생성)
		Specification<PopupStore> specification = Specification.where(null);
		
		// 진행상테 필터링 조건 추가
		if(popupFilterDTO.getStatus() != null) {
			specification = specification.and((root, query, cb) ->cb.equal(root.get("status"), popupFilterDTO.getStatus()));
		}
		//카테고리
		if(popupFilterDTO.getCategoryType() != null) {
			specification = specification.and((root,query,cb) -> cb.equal(root.join("categories").get("category").get("type"), popupFilterDTO.getCategoryType()));
		}
		
		//정렬
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		if(popupFilterDTO.getSort() != null) {
			if(popupFilterDTO.getSort().equals(SortType.BOOKMARK)) {
				sort = Sort.by(Sort.Direction.DESC, "bookmarkCount");
			}else if(popupFilterDTO.getSort().equals(SortType.RECOMMEND)) {
				sort = Sort.by(Sort.Direction.DESC, "recommend");
			}else if(popupFilterDTO.getSort().equals(SortType.VIEW)) {
				sort = Sort.by(Sort.Direction.DESC, "view");
			}else if(popupFilterDTO.getSort().equals(SortType.END_SOON)) {
				sort = Sort.by(Sort.Direction.DESC, "endDate");
			}
		}
		
		//Pageable 객체 생성(페이징 + 정렬)
		Pageable pageable = PageRequest.of(popupFilterDTO.getPageRequestDTO().getPage() -1,popupFilterDTO.getPageRequestDTO().getSize(), sort);
		
		// Repository 호출
		Page<PopupStore> result = popupStoreRepository.findAll(specification, pageable);
		
		
		// 결과를 DTO로 변환
		List<PopupStoreDTO> dtoList = result.getContent().stream()
				.map(popupStore -> modelMapper.map(popupStore, PopupStoreDTO.class))
				.collect(Collectors.toList());
		
		long totalCount = result.getTotalElements();
		
		
		// PageResponseDTO 생성 및 변환
		PageResponseDTO<PopupStoreDTO> responseDTO = PageResponseDTO.<PopupStoreDTO>withAll()
				.dtoList(dtoList)
				.pageRequestDTO(popupFilterDTO.getPageRequestDTO())
				.totalCount(totalCount)
				.build();
		
		return responseDTO;
	}

//	@Override
//	public PageResponseDTO<PopupStoreDTO> getList(PageRequestDTO pageRequestDTO) {
//		// TODO Auto-generated method stub
//		return null;
//	}



}
