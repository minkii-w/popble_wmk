package com.popble.service;

import com.popble.domain.AdBoard;
import com.popble.domain.BoardImage;
import com.popble.domain.PopupStore;
import com.popble.dto.*;
import com.popble.repository.AdBoardRepository;
import com.popble.repository.PopupStoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class AdBoardServiceImpl implements AdBoardService {

    private final AdBoardRepository adBoardRepository;
    private final PopupStoreRepository popupStoreRepository;
    private final FileStorageService fileStorageService;

    // ===== 등록 (JSON) =====
    @Override
    public Long create(AdCreateRequest req) {
        AdBoard adBoard = AdBoard.builder()
                .title(req.getTitle())
                .content(req.getContent())
                .writer("testUser") // TODO: UserProfile 연동
                .externalUrl(req.getExternalUrl())
                .contact(req.getContact())
                .publishStartDate(req.getPublishStartDate())
                .publishEndDate(req.getPublishEndDate())
                .pinned(req.isPinned())
                .visible(req.isVisible())
                .tags(req.getTags())
                .storeName(req.getTitle()) // 필요시 수정
                .address(req.getExternalUrl()) // 필요시 수정
                .description(req.getContent()) // 필요시 수정
                .build();

        // ✅ popupStore 연계
        if (req.getPopupStoreId() != null) {
            PopupStore popup = popupStoreRepository.findById(req.getPopupStoreId())
                    .orElseThrow(() -> new IllegalArgumentException("팝업스토어 없음"));
            adBoard.setPopupStore(popup);
        }

        return adBoardRepository.save(adBoard).getId();
    }

    // ===== 등록 (이미지 포함) =====
    @Override
    public Long create(AdCreateRequest req, List<MultipartFile> images) {
        AdBoard adBoard = AdBoard.builder()
                .title(req.getTitle())
                .content(req.getContent())
                .writer("testUser")
                .externalUrl(req.getExternalUrl())
                .contact(req.getContact())
                .publishStartDate(req.getPublishStartDate())
                .publishEndDate(req.getPublishEndDate())
                .pinned(req.isPinned())
                .visible(req.isVisible())
                .tags(req.getTags())
                .storeName(req.getTitle()) // 필요시 수정
                .address(req.getExternalUrl()) // 필요시 수정
                .description(req.getContent()) // 필요시 수정
                .build();

        // ✅ popupStore 연계
        if (req.getPopupStoreId() != null) {
            PopupStore popup = popupStoreRepository.findById(req.getPopupStoreId())
                    .orElseThrow(() -> new IllegalArgumentException("팝업스토어 없음"));
            adBoard.setPopupStore(popup);
        }

        if (images != null && !images.isEmpty()) {
            int thumbnailIndex = req.getThumbnailIndex() != null ? req.getThumbnailIndex() : 0;

            for (int i = 0; i < images.size(); i++) {
                MultipartFile file = images.get(i);
                FileStorageService.StoredFile stored = fileStorageService.store(file);

                int sortOrder = (i == thumbnailIndex) ? 0 : i + 1;

                adBoard.addImage(BoardImage.builder()
                        .originalName(stored.originalName())
                        .storedName(stored.storedName())
                        .folder(stored.folder())
                        .url(stored.url())
                        .contentType(stored.contentType())
                        .size(stored.size())
                        .sortOrder(sortOrder)
                        .build());
            }
            // ✅ 정렬 보정
            adBoard.getImageList().sort((a, b) -> Integer.compare(a.getSortOrder(), b.getSortOrder()));
        }

        return adBoardRepository.save(adBoard).getId();
    }

    // ===== 단건 조회 =====
    @Override
    public AdResponse getOne(Long id) {
        AdBoard adBoard = adBoardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글 없음"));
        return toResponse(adBoard);
    }

    // ===== 목록 조회 =====
    @Override
    public PageResponseDTO<AdResponse> getList(PageRequestDTO pageRequestDTO, String order, String keyword) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createTime");
        if ("oldest".equalsIgnoreCase(order)) {
            sort = Sort.by(Sort.Direction.ASC, "createTime");
        } else if ("title".equalsIgnoreCase(order)) {
            sort = Sort.by(Sort.Direction.ASC, "title");
        }

        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), sort);

        Page<AdBoard> result = (keyword != null && !keyword.isBlank())
                ? adBoardRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable)
                : adBoardRepository.findAll(pageable);

        List<AdResponse> dtoList = result.getContent().stream()
                .map(this::toResponse)
                .toList();

        return PageResponseDTO.<AdResponse>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();
    }

    // ===== 수정 (JSON만) =====
    @Override
    public void update(Long id, AdUpdateRequest req) {
        AdBoard adBoard = adBoardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글 없음"));

        if (req.getTitle() != null) adBoard.setTitle(req.getTitle());
        if (req.getContent() != null) adBoard.setContent(req.getContent());
        if (req.getExternalUrl() != null) adBoard.setExternalUrl(req.getExternalUrl());
        if (req.getContact() != null) adBoard.setContact(req.getContact());
        if (req.getPublishStartDate() != null) adBoard.setPublishStartDate(req.getPublishStartDate());
        if (req.getPublishEndDate() != null) adBoard.setPublishEndDate(req.getPublishEndDate());
        if (req.getPinned() != null) adBoard.setPinned(req.getPinned());
        if (req.getVisible() != null) adBoard.setVisible(req.getVisible());
        if (req.getTags() != null) adBoard.setTags(req.getTags());
        if (req.getStoreName() != null) adBoard.setStoreName(req.getStoreName());
        if (req.getAddress() != null) adBoard.setAddress(req.getAddress());
        if (req.getDescription() != null) adBoard.setDescription(req.getDescription());

        // ✅ popupStore 갱신
        if (req.getPopupStoreId() != null) {
            PopupStore popup = popupStoreRepository.findById(req.getPopupStoreId())
                    .orElseThrow(() -> new IllegalArgumentException("팝업스토어 없음"));
            adBoard.setPopupStore(popup);
        }

        adBoardRepository.save(adBoard);
    }

    // ===== 수정 (이미지 포함) =====
    @Override
    public void update(Long id, AdUpdateRequest req, List<MultipartFile> images, List<String> keepImages) {
        AdBoard adBoard = adBoardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글 없음"));

        update(id, req);
        adBoard.clearImages();

        // 기존 이미지 유지
        if (keepImages != null) {
            for (int i = 0; i < keepImages.size(); i++) {
                String url = keepImages.get(i);
                adBoard.addImage(BoardImage.builder()
                        .url(url)
                        .storedName(url.substring(url.lastIndexOf("/") + 1))
                        .folder("uploads")
                        .originalName(url)
                        .sortOrder(i + 1)
                        .build());
            }
        }

        // 새 이미지 추가
        if (images != null && !images.isEmpty()) {
            for (int i = 0; i < images.size(); i++) {
                MultipartFile file = images.get(i);
                FileStorageService.StoredFile stored = fileStorageService.store(file);

                adBoard.addImage(BoardImage.builder()
                        .originalName(stored.originalName())
                        .storedName(stored.storedName())
                        .folder(stored.folder())
                        .url(stored.url())
                        .contentType(stored.contentType())
                        .size(stored.size())
                        .sortOrder(adBoard.getImageList().size() + 1)
                        .build());
            }
        }

        // ✅ 썸네일 인덱스 반영
        int thumbnailIndex = req.getThumbnailIndex() != null ? req.getThumbnailIndex() : 0;
        if (!adBoard.getImageList().isEmpty() && thumbnailIndex < adBoard.getImageList().size()) {
            adBoard.getImageList().get(thumbnailIndex).setSortOrder(0);
            int order = 1;
            for (int i = 0; i < adBoard.getImageList().size(); i++) {
                if (i != thumbnailIndex) {
                    adBoard.getImageList().get(i).setSortOrder(order++);
                }
            }
            adBoard.getImageList().sort((a, b) -> Integer.compare(a.getSortOrder(), b.getSortOrder()));
        }

        adBoardRepository.save(adBoard);
    }

    // ===== 삭제 =====
    @Override
    public void delete(Long id) {
        adBoardRepository.deleteById(id);
    }

    // ===== 변환 =====
    private AdResponse toResponse(AdBoard adBoard) {
        return AdResponse.builder()
                .id(adBoard.getId())
                .title(adBoard.getTitle())
                .content(adBoard.getContent())
                .writerId(adBoard.getUserProfile() != null ? adBoard.getUserProfile().getId() : null)
                .writerName(adBoard.getWriter())
                .createTime(adBoard.getCreateTime())
                .updateTime(adBoard.getModifyTime())
                .pinned(Boolean.TRUE.equals(adBoard.getPinned()))
                .visible(Boolean.TRUE.equals(adBoard.getVisible()))
                .publishStartDate(adBoard.getPublishStartDate())
                .publishEndDate(adBoard.getPublishEndDate())
                .tags(adBoard.getTags())
                .externalUrl(adBoard.getExternalUrl())
                .contact(adBoard.getContact())
                .thumbnail(adBoard.getImageList().isEmpty() ? null : adBoard.getImageList().get(0).getUrl())
                .imageList(adBoard.getImageList().stream()
                        .map(img -> AdResponse.ImageDTO.builder()
                                .url(img.getUrl())
                                .folder(img.getFolder())
                                .storedName(img.getStoredName())
                                .originalName(img.getOriginalName())
                                .build())
                        .toList())
                .detailImages(adBoard.getImageList().stream()
                        .map(img -> AdResponse.ImageDetailDTO.builder()
                                .id(img.getId())
                                .boardId(adBoard.getId())
                                .uuid(img.getStoredName())
                                .originalName(img.getOriginalName())
                                .path(img.getFolder())
                                .ord(img.getSortOrder())
                                .contentType(img.getContentType())
                                .size(img.getSize())
                                .createdAt(adBoard.getCreateTime())
                                .build())
                        .toList())
                .storeName(adBoard.getStoreName())
                .address(adBoard.getAddress())
                .description(adBoard.getDescription())

                // ✅ popupStore 연계 매핑
                .popupStoreId(adBoard.getPopupStore() != null ? adBoard.getPopupStore().getId() : null)
                .popupStoreName(adBoard.getPopupStore() != null ? adBoard.getPopupStore().getStoreName() : null)
                .popupAddress(adBoard.getPopupStore() != null ? adBoard.getPopupStore().getAddress() : null)
                .popupStartDate(adBoard.getPopupStore() != null ? adBoard.getPopupStore().getStartDate() : null)
                .popupEndDate(adBoard.getPopupStore() != null ? adBoard.getPopupStore().getEndDate() : null)

                .build();
    }
}
