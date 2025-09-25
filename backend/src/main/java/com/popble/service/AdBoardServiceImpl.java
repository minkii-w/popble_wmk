package com.popble.service;

import com.popble.domain.AdBoard;
import com.popble.domain.BoardImage;
import com.popble.dto.*;
import com.popble.repository.AdBoardRepository;
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
    private final FileStorageService fileStorageService;

    // ===== 등록 (JSON) =====
    @Override
    public Long create(AdCreateRequest req) {
        AdBoard adBoard = AdBoard.builder()
                .title(req.getTitle())
                .content(req.getContent())
                .writer("testUser")   // ✅ 나중에 UserProfile 연동
                .externalUrl(req.getExternalUrl())
                .contact(req.getContact())
                .publishStartDate(req.getPublishStartDate())
                .publishEndDate(req.getPublishEndDate())
                .pinned(req.isPinned())
                .visible(req.isVisible())
                .tags(req.getTags())
                .build();

        AdBoard saved = adBoardRepository.save(adBoard);
        return saved.getId();
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
                .build();

        if (images != null && !images.isEmpty()) {
            images.forEach(file -> {
                FileStorageService.StoredFile stored = fileStorageService.store(file);
                adBoard.addImage(BoardImage.builder()
                        .originalName(stored.originalName())
                        .storedName(stored.storedName())
                        .folder(stored.folder())
                        .url(stored.url())
                        .contentType(stored.contentType())
                        .size(stored.size())
                        .sortOrder(adBoard.getImageList().size())
                        .build());
            });
        }

        AdBoard saved = adBoardRepository.save(adBoard);
        return saved.getId();
    }

    // ===== 단건 조회 =====
    @Override
    public AdResponse getOne(Long id) {
        AdBoard adBoard = adBoardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글 없음"));
        return toResponse(adBoard);
    }

    // ===== 목록 조회 (페이지네이션) =====
    @Override
    public PageResponseDTO<AdResponse> getList(PageRequestDTO pageRequestDTO, String order, String keyword) {
        // ✅ 정렬 설정
        Sort sort = Sort.by(Sort.Direction.DESC, "createTime");
        if ("oldest".equalsIgnoreCase(order)) {
            sort = Sort.by(Sort.Direction.ASC, "createTime");
        } else if ("title".equalsIgnoreCase(order)) {
            sort = Sort.by(Sort.Direction.ASC, "title");
        }

        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), sort);

        Page<AdBoard> result;
        if (keyword != null && !keyword.isBlank()) {
            result = adBoardRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable);
        } else {
            result = adBoardRepository.findAll(pageable);
        }

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

        adBoardRepository.save(adBoard);
    }

    // ===== 수정 (이미지 포함) =====
    @Override
    public void update(Long id, AdUpdateRequest req, List<MultipartFile> images, List<String> keepImages) {
        AdBoard adBoard = adBoardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글 없음"));

        update(id, req);

        adBoard.clearImages();

        if (keepImages != null) {
            keepImages.forEach(url -> {
                if (url.startsWith("/uploads/")) {
                    adBoard.addImage(BoardImage.builder()
                            .url(url)
                            .storedName(url.substring(url.lastIndexOf("/") + 1))
                            .folder("uploads")
                            .originalName(url)
                            .sortOrder(adBoard.getImageList().size())
                            .build());
                }
            });
        }

        if (images != null && !images.isEmpty()) {
            images.forEach(file -> {
                FileStorageService.StoredFile stored = fileStorageService.store(file);
                adBoard.addImage(BoardImage.builder()
                        .originalName(stored.originalName())
                        .storedName(stored.storedName())
                        .folder(stored.folder())
                        .url(stored.url())
                        .contentType(stored.contentType())
                        .size(stored.size())
                        .sortOrder(adBoard.getImageList().size())
                        .build());
            });
        }

        adBoardRepository.save(adBoard);
    }

    // ===== 삭제 =====
    @Override
    public void delete(Long id) {
        adBoardRepository.deleteById(id);
    }

    // ===== 공통 변환 메서드 =====
    private AdResponse toResponse(AdBoard adBoard) {
        return AdResponse.builder()
                .id(adBoard.getId())
                .title(adBoard.getTitle())
                .content(adBoard.getContent())
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
                        .filter(img -> img.getUrl() != null && img.getUrl().startsWith("/uploads/"))
                        .map(img -> AdResponse.ImageDTO.builder()
                                .url(img.getUrl())
                                .folder(img.getFolder())
                                .storedName(img.getStoredName())
                                .originalName(img.getOriginalName())
                                .build())
                        .toList())
                .detailImages(adBoard.getImageList().stream()
                        .filter(img -> img.getUrl() != null && img.getUrl().startsWith("/uploads/"))
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
                .build();
    }
}
