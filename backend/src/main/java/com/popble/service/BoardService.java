package com.popble.service;

import com.popble.domain.Board;
import com.popble.dto.BoardCreateRequest;
import com.popble.dto.BoardResponse;
import com.popble.dto.BoardUpdateRequest;
import com.popble.dto.PageRequestDTO;
import com.popble.dto.PageResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public interface BoardService {

    // ===== 생성 =====
    Long create(BoardCreateRequest req);
    Long create(BoardCreateRequest req, List<MultipartFile> images);

    // ===== 단건 조회 =====
    BoardResponse get(Long id);

    // ===== 목록 조회 (타입별) =====
    List<BoardResponse> listLatest(Board.Type type);
    List<BoardResponse> list(Board.Type type);
    List<BoardResponse> listByType(Board.Type type, String order);

    // ===== 전체 목록 조회 =====
    List<BoardResponse> listAllLatest();                // 하위 호환
    List<BoardResponse> listAll(String order);          // 하위 호환
    PageResponseDTO<BoardResponse> listAll(PageRequestDTO pageRequestDTO, String order); // ✅ 신규 (페이지네이션)

    // ===== 수정 =====
    void update(Long id, BoardUpdateRequest req);
    void updateImages(Long id, List<Long> keepIds, List<MultipartFile> newImages);

    // ===== 고정(공지) =====
    void setPinned(Long id, boolean pinned, LocalDateTime pinUntil);

    // ===== 삭제 =====
    void delete(Long id);
}
