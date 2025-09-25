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

import com.popble.domain.BoardImage;
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

    // ===== 삭제 (Soft Delete) =====
    @Override
    public void remove(Long id) {
        popupStoreRepository.updateToDelete(id, true);
    }

    // ===== 수정 =====
    @Override
    public void modify(PopupStoreDTO popupStoreDTO) {
        Optional<PopupStore> result = popupStoreRepository.findById(popupStoreDTO.getId());
        PopupStore popupStore = result.orElseThrow();

        popupStore.setStoreName(popupStoreDTO.getStoreName());
        popupStore.setAddress(popupStoreDTO.getAddress());
        popupStore.setStartDate(popupStoreDTO.getStartDate());
        popupStore.setEndDate(popupStoreDTO.getEndDate());
        popupStore.setMaxCount(popupStoreDTO.getMaxCount());
        popupStore.setDesc(popupStoreDTO.getDesc());
        popupStore.setPrice(popupStoreDTO.getPrice());
        popupStore.setDeleted(popupStoreDTO.isDeleted());

        // 기존 이미지 비우고 새로 추가
        popupStore.clearImages();
        List<String> uploadFileUrls = popupStoreDTO.getUploadFileNames();
        if (uploadFileUrls != null && !uploadFileUrls.isEmpty()) {
            uploadFileUrls.forEach(url -> {
                popupStore.addImage(BoardImage.builder()
                        .originalName(url)
                        .storedName(url)
                        .folder("popup")
                        .url(url)
                        .sortOrder(popupStore.getImageList().size())
                        .build());
            });
        }

        popupStoreRepository.save(popupStore);
    }

    // ===== 단건 조회 =====
    @Override
    public PopupStoreDTO get(Long id) {
        Optional<PopupStore> result = popupStoreRepository.findById(id);
        PopupStore popupStore = result.orElseThrow();
        return entityToDTO(popupStore);
    }

    // ===== 엔티티 → DTO 변환 =====
    private PopupStoreDTO entityToDTO(PopupStore popupStore) {
        PopupStoreDTO popupStoreDTO = PopupStoreDTO.builder()
                .id(popupStore.getId())
                .storeName(popupStore.getStoreName())
                .address(popupStore.getAddress())
                .startDate(popupStore.getStartDate())
                .endDate(popupStore.getEndDate())
                .maxCount(popupStore.getMaxCount())
                .desc(popupStore.getDesc())
                .price(popupStore.getPrice())
                .deleted(popupStore.isDeleted())
                .build();

        List<BoardImage> imageList = popupStore.getImageList();
        if (imageList != null && !imageList.isEmpty()) {
            List<String> urlList = imageList.stream()
                    .map(BoardImage::getUrl)
                    .toList();
            popupStoreDTO.setUploadFileNames(urlList);
        }

        return popupStoreDTO;
    }

    // ===== 등록 =====
    @Override
    public Long register(PopupStoreDTO popupStoreDTO) {
        PopupStore popupStore = dtoEntity(popupStoreDTO);
        PopupStore result = popupStoreRepository.save(popupStore);
        return result.getId();
    }

    // DTO → 엔티티 변환
    private PopupStore dtoEntity(PopupStoreDTO popupStoreDTO) {
        PopupStore popupStore = PopupStore.builder()
                .id(popupStoreDTO.getId())
                .storeName(popupStoreDTO.getStoreName())
                .address(popupStoreDTO.getAddress())
                .startDate(popupStoreDTO.getStartDate())
                .endDate(popupStoreDTO.getEndDate())
                .maxCount(popupStoreDTO.getMaxCount())
                .desc(popupStoreDTO.getDesc())
                .price(popupStoreDTO.getPrice())
                .deleted(popupStoreDTO.isDeleted())
                .build();

        List<String> uploadFileUrls = popupStoreDTO.getUploadFileNames();
        if (uploadFileUrls != null) {
            uploadFileUrls.forEach(url -> {
                popupStore.addImage(BoardImage.builder()
                        .originalName(url)
                        .storedName(url)
                        .folder("popup")
                        .url(url)
                        .sortOrder(popupStore.getImageList().size())
                        .build());
            });
        }
        return popupStore;
    }

    // ===== 목록 조회 =====
    @Override
    public PageResponseDTO<PopupStoreDTO> getList(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("id").descending());

        Page<Object[]> result = popupStoreRepository.selectList(pageable);

        List<PopupStoreDTO> dtoList = result.get().map(arr -> {
            PopupStore popupStore = (PopupStore) arr[0];
            BoardImage image = (BoardImage) arr[1];

            PopupStoreDTO popupStoreDTO = entityToDTO(popupStore);

            if (image != null) {
                popupStoreDTO.setUploadFileNames(List.of(image.getUrl())); // ✅ 대표 이미지
            }

            return popupStoreDTO;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<PopupStoreDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }
}
