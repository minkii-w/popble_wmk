// src/main/java/com/popble/controller/BoardController.java
package com.popble.controller;

import com.popble.domain.Board;
import com.popble.dto.BoardCreateRequest;
import com.popble.dto.BoardResponse;
import com.popble.dto.BoardUpdateRequest;
import com.popble.service.BoardService;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // 필요 없으면 제거 가능
public class BoardController {

    private final BoardService boardService;

    // ===== 요청 바디용 DTO (핀 토글) =====
    @Data
    static class PinRequest {
        private boolean pinned;               // true=고정, false=해제
        private LocalDateTime pinUntil;       // optional (null=무기한)
    }

    // ===== 생성 =====

    /** ✅ 게시글 생성 (JSON 전용) */
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Long> createJson(@RequestBody @Valid BoardCreateRequest req) {
        return ResponseEntity.ok(boardService.create(req));
    }

    /** ✅ 게시글 생성 (이미지 포함, multipart/form-data) */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> createMultipart(
            @RequestPart("board") @Valid BoardCreateRequest req,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {
        Long id = boardService.create(req, images);
        return ResponseEntity.ok(id);
    }

    // ===== 조회 =====

    /** 게시글 단건 조회 */
    @GetMapping("/{id}")
    public ResponseEntity<BoardResponse> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok(boardService.get(id));
    }

    /** ✅ 게시글 목록 조회 (type 필수, order 기본값 = "date") */
    @GetMapping
    public ResponseEntity<List<BoardResponse>> list(
            @RequestParam("type") Board.Type type,
            @RequestParam(name = "order", defaultValue = "date") String order
    ) {
        return ResponseEntity.ok(boardService.listByType(type, order));
    }

    /** ✅ 전체 목록 (공지 고정 먼저 + 나머지 정렬, order 기본값 = "date") */
    @GetMapping("/all")
    public ResponseEntity<List<BoardResponse>> listAll(
            @RequestParam(name = "order", defaultValue = "date") String order
    ) {
        return ResponseEntity.ok(boardService.listAll(order));
    }

    // ===== 수정 =====

    /** 게시글 수정 (본문만, JSON) */
    @PatchMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> update(@PathVariable("id") Long id,
                                       @RequestBody @Valid BoardUpdateRequest req) {
        boardService.update(id, req);
        return ResponseEntity.noContent().build();
    }

    /** ✅ 게시글 이미지 수정 (이미지만 교체/추가/삭제) */
    @PatchMapping(value = "/{id}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updateImages(
            @PathVariable("id") Long id,
            // keepIds는 multipart에서 여러 키로 올 수 있음: keepIds=1&keepIds=2...
            @RequestPart(value = "keepIds", required = false) List<Long> keepIds,
            @RequestPart(value = "newImages", required = false) List<MultipartFile> newImages
    ) {
        boardService.updateImages(id, keepIds, newImages);
        return ResponseEntity.noContent().build();
    }

    // ===== 고정(공지) =====

    /** ✅ 공지 전역 고정/해제 */
    @PatchMapping(value = "/{id}/pin", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> pinToggle(@PathVariable("id") Long id,
                                          @RequestBody PinRequest req) {
        boardService.setPinned(id, req.isPinned(), req.getPinUntil());
        return ResponseEntity.noContent().build();
    }

    // ===== 삭제 =====

    /** 게시글 삭제 */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        boardService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
