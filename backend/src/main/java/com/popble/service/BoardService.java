// src/main/java/com/popble/service/BoardService.java
package com.popble.service;

import com.popble.domain.Board;
import com.popble.dto.BoardCreateRequest;
import com.popble.dto.BoardResponse;
import com.popble.dto.BoardUpdateRequest;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public interface BoardService {

    // ===== 생성 =====
    /** JSON 전용 등록 (파일 없음) */
    Long create(BoardCreateRequest req);

    /** 멀티파트(이미지 포함) 등록 */
    Long create(BoardCreateRequest req, List<MultipartFile> images);

    // ===== 단건 조회 =====
    BoardResponse get(Long id);

    // ===== 목록 조회 (타입별) =====
    /** 타입별 최신순(하위 호환) */
    List<BoardResponse> listLatest(Board.Type type);

    /** 타입별 기본 조회(정렬 미지정일 때의 기본 정책) */
    List<BoardResponse> list(Board.Type type);

    /** ✅ 타입별 정렬 지원: order = "latest" | "views" | "likes" */
    List<BoardResponse> listByType(Board.Type type, String order);

    // ===== 전체 목록 조회 =====
    /** 전체 최신순(고정/비고정 섞어서 최신순, 하위 호환) */
    List<BoardResponse> listAllLatest();

    /** ✅ 전체 정렬 지원: order = "latest" | "views" | "likes" */
    List<BoardResponse> listAll(String order);

    // ===== 수정 =====
    /** 본문만 수정 */
    void update(Long id, BoardUpdateRequest req);

    /** 이미지 전용 수정: 유지할 이미지 ID 목록 + 새 이미지 파일들 */
    void updateImages(Long id, List<Long> keepIds, List<MultipartFile> newImages);

    // ===== 고정(공지) =====
    /** 공지 전역 고정/해제 및 만료일 설정 (pinUntil == null 이면 무기한) */
    void setPinned(Long id, boolean pinned, LocalDateTime pinUntil);

    // ===== 삭제 =====
    void delete(Long id);
}
