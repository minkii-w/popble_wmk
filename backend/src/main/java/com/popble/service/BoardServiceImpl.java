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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final UserProfileRepository userProfileRepository;

    @Override
    public Long create(BoardCreateRequest req) {
        // 작성자(UserProfile) 로드: writerId == UserProfile.id 로 사용
        UserProfile profile = userProfileRepository.getReferenceById(req.getWriterId());

        // 타입별 자식 엔티티 생성 (enum 그대로 사용)
        Board entity = switch (req.getType()) {
            case GENERAL -> new GeneralBoard();
            case QNA     -> new QnaBoard();
            case REVIEW  -> new ReviewBoard();
            case NOTICE  -> new NoticeBoard();
            case AD      -> new AdBoard();
        };

        // 공통 필드 세팅
        entity.setUserProfile(profile);
        entity.setTitle(req.getTitle());
        entity.setContent(req.getContent());

        // writer(String)에 작성자 ID를 문자열로 저장
        entity.setWriter(String.valueOf(req.getWriterId()));

        // 자식 생성자에서 type을 세팅하지 않았다면 보정
        if (entity.getType() == null) {
            entity.setType(req.getType());
        }

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
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // 기본 목록 (정렬 미지정)
    @Transactional(readOnly = true)
    public List<BoardResponse> list(Board.Type type) {
        return boardRepository.findByType(type)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public void update(Long id, BoardUpdateRequest req) {
        Board e = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Board not found: " + id));

        if (req.getTitle() != null)   e.setTitle(req.getTitle());
        if (req.getContent() != null) e.setContent(req.getContent());
        // pin/role 없음, 타입별 추가 필드 업데이트 필요 시 여기 분기
    }

    @Override
    public void delete(Long id) {
        boardRepository.deleteById(id);
    }

    // ====== Mapping ======
    private BoardResponse toResponse(Board e) {
        Long userId = (e.getUserProfile() != null ? e.getUserProfile().getId() : null);
        Long writerId = null;
        try {
            writerId = (e.getWriter() != null) ? Long.valueOf(e.getWriter()) : null;
        } catch (NumberFormatException ignore) { }

        return BoardResponse.builder()
                .id(e.getId())
                .type(e.getType())
                .title(e.getTitle())
                .content(e.getContent())
                .writerId(userId)
                .writerId(writerId)
                .createTime(e.getCreateTime())
                .modifyTime(e.getModifyTime())
                .build();
        
    }
}
