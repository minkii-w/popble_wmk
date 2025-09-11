package com.popble.controller;


import com.popble.domain.Board;
import com.popble.dto.BoardCreateRequest;
import com.popble.dto.BoardResponse;
import com.popble.dto.BoardUpdateRequest;
import com.popble.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    /** 게시글 생성 */
    @PostMapping
    public ResponseEntity<Long> create(@RequestBody @Valid BoardCreateRequest req) {
        return ResponseEntity.ok(boardService.create(req));
    }

    /** 게시글 단건 조회 */
    @GetMapping("/{id}")
    public ResponseEntity<BoardResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(boardService.get(id));
    }

    /** 게시글 목록 조회 (type 필수, order=latest 기본) */
    @GetMapping
    public ResponseEntity<List<BoardResponse>> list(
            @RequestParam("type") Board.Type type,
            @RequestParam(name = "order", defaultValue = "latest") String order
    ) {
        List<BoardResponse> items =
                "latest".equalsIgnoreCase(order)
                        ? boardService.listLatest(type)
                        : boardService.list(type);
        return ResponseEntity.ok(items);
    }

    /** 게시글 수정 (제목/내용만) */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id,
                                       @RequestBody @Valid BoardUpdateRequest req) {
        boardService.update(id, req);
        return ResponseEntity.noContent().build();
    }

    /** 게시글 삭제 */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boardService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
