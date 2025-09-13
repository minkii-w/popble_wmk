// src/main/java/com/popble/service/BoardServiceImpl.java
package com.popble.service;

import com.popble.domain.AdBoard;
import com.popble.domain.Board;
import com.popble.domain.GeneralBoard;
import com.popble.domain.NoticeBoard;
import com.popble.domain.QnaBoard;
import com.popble.domain.ReviewBoard;
import com.popble.domain.UserProfile;
import com.popble.dto.BoardCreateRequest;
import com.popble.dto.BoardResponse;
import com.popble.dto.BoardUpdateRequest;
import com.popble.repository.BoardRepository;
import com.popble.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final UserProfileRepository userProfileRepository;

    @Override
    public Long create(BoardCreateRequest req) {
        // ===== 필수값 검증 (여기서 막아두면 DB 제약/500 이전에 원인 파악 쉬움) =====
        if (req.getType() == null) {
            throw new IllegalArgumentException("type is required");
        }
        if (req.getTitle() == null || req.getTitle().isBlank()) {
            throw new IllegalArgumentException("title is required");
        }
        if (req.getContent() == null || req.getContent().isBlank()) {
            throw new IllegalArgumentException("content is required");
        }

        // ===== 타입별 자식 엔티티 생성 =====
        Board entity = switch (req.getType()) {
            case GENERAL -> new GeneralBoard();
            case QNA     -> new QnaBoard();
            case REVIEW  -> new ReviewBoard();
            case NOTICE  -> new NoticeBoard();
            case AD      -> new AdBoard();
        };

        // ===== 작성자(UserProfile) 선택적 매핑 =====
        UserProfile profile = null;
        if (req.getWriterId() != null) {
            // 존재하지 않아도 예외 던지지 않도록 Optional 처리
            profile = userProfileRepository.findById(req.getWriterId()).orElse(null);
        }
        entity.setUserProfile(profile);

        // ===== 공통 필드 세팅 =====
        entity.setType(req.getType());      // 자식에서 안 세팅했다면 확실히 박아둠
        entity.setTitle(req.getTitle());
        entity.setContent(req.getContent());

        // writer(String): 표시용. writerId가 있으면 그 값, 없으면 anonymous
        if (req.getWriterId() != null) {
            entity.setWriter(String.valueOf(req.getWriterId()));
        } else {
            entity.setWriter("anonymous");
        }

        // view/recommend는 엔티티 기본값(0) 사용
        // role은 엔티티 @PrePersist에서 기본값(Member) 세팅됨

        return boardRepository.save(entity).getId();
    }

    @Override
    @Transactional(readOnly = true)
    public BoardResponse get(Long id) {
        Board e = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Board not found: " + id));
        return toResponse(e);
    }

    // 최신순 목록 (내림차순)
    @Transactional(readOnly = true)
    public List<BoardResponse> listLatest(Board.Type type) {
        return boardRepository.findByTypeOrderByCreateTimeDesc(type)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // 기본 목록 (정렬 미지정)
    @Transactional(readOnly = true)
    public List<BoardResponse> list(Board.Type type) {
        return boardRepository.findByType(type)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void update(Long id, BoardUpdateRequest req) {
        Board e = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Board not found: " + id));

        if (req.getTitle() != null)   e.setTitle(req.getTitle());
        if (req.getContent() != null) e.setContent(req.getContent());
        // 필요 시 타입별 추가 필드 업데이트 분기
    }

    @Override
    public void delete(Long id) {
        boardRepository.deleteById(id);
    }

    // ====== Mapping ======
    private BoardResponse toResponse(Board e) {
        // 우선순위: userProfile.id -> writer 문자열 숫자 변환
        Long writerId = null;
        if (e.getUserProfile() != null) {
            writerId = e.getUserProfile().getId();
        } else if (e.getWriter() != null) {
            try {
                writerId = Long.valueOf(e.getWriter());
            } catch (NumberFormatException ignore) { /* 표기용 이름일 수 있음 */ }
        }

        return BoardResponse.builder()
                .id(e.getId())
                .type(e.getType())
                .title(e.getTitle())
                .content(e.getContent())
                .writerId(writerId)                 // ★ 중복 세팅 제거
                .createTime(e.getCreateTime())
                .modifyTime(e.getModifyTime())
                .build();
    }
}
