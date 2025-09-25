package com.popble.controller;

import com.popble.dto.*;
import com.popble.service.AdBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/ad")
@RequiredArgsConstructor
public class AdBoardController {

    private final AdBoardService adBoardService;

    // ===== 목록 조회 (페이지네이션) =====
    @GetMapping("/list")
    public ResponseEntity<PageResponseDTO<AdResponse>> getList(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,   // ✅ 한 페이지 10개
            @RequestParam(name = "order", required = false) String order,
            @RequestParam(name = "keyword", required = false) String keyword
    ) {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(page)
                .size(size)          // ✅ 글은 10개
                .build();

        return ResponseEntity.ok(adBoardService.getList(pageRequestDTO, order, keyword));
    }

    // ===== 단건 조회 =====
    @GetMapping("/{id}")
    public ResponseEntity<AdResponse> getOne(@PathVariable("id") Long id) {
        return ResponseEntity.ok(adBoardService.getOne(id));
    }

    // ===== 등록 (JSON) =====
    @PostMapping
    public ResponseEntity<Long> create(@RequestBody AdCreateRequest req) {
        return ResponseEntity.ok(adBoardService.create(req));
    }

    // ===== 등록 (이미지 포함) =====
    @PostMapping(value = "/with-images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> createWithImages(
            @RequestPart("board") AdCreateRequest req,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        return ResponseEntity.ok(adBoardService.create(req, images));
    }

    // ===== 수정 (JSON) =====
    @PutMapping("/{id}")
    public ResponseEntity<Void> update(
            @PathVariable("id") Long id,
            @RequestBody AdUpdateRequest req) {
        adBoardService.update(id, req);
        return ResponseEntity.ok().build();
    }

    // ===== 수정 (이미지 포함) =====
    @PutMapping(value = "/{id}/with-images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updateWithImages(
            @PathVariable("id") Long id,
            @RequestPart("board") AdUpdateRequest req,
            @RequestPart(value = "images", required = false) List<MultipartFile> images,
            @RequestPart(value = "keepImages", required = false) List<String> keepImages) {
        adBoardService.update(id, req, images, keepImages);
        return ResponseEntity.ok().build();
    }

    // ===== 삭제 =====
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        adBoardService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
