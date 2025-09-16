// src/main/java/com/popble/service/BoardServiceImpl.java
package com.popble.service;

import com.popble.domain.AdBoard;
import com.popble.domain.Board;
import com.popble.domain.BoardImage;
import com.popble.domain.GeneralBoard;
import com.popble.domain.NoticeBoard;
import com.popble.domain.QnaBoard;
import com.popble.domain.ReviewBoard;
import com.popble.domain.UserProfile;
import com.popble.dto.BoardCreateRequest;
import com.popble.dto.BoardResponse;
import com.popble.dto.BoardUpdateRequest;
import com.popble.repository.BoardImageRepository;
import com.popble.repository.BoardRepository;
import com.popble.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final UserProfileRepository userProfileRepository;
    private final BoardImageRepository boardImageRepository;
    private final FileStorageService fileStorageService;

    // ==========================
    // 정렬 유틸
    // ==========================
    private Sort resolveSort(String order) {
        if (order == null) order = "date";
        String key = order.trim().toLowerCase();

        return switch (key) {
            // ✅ 과거순(오래된순) 추가
            case "oldest", "asc", "오래된순", "과거순" ->
                    Sort.by(Sort.Order.asc("createTime"), Sort.Order.asc("id"));

            case "view", "views", "조회수" ->
                    Sort.by(Sort.Order.desc("view"), Sort.Order.desc("id"));
            case "rec", "recommend", "recommends", "추천" ->
                    Sort.by(Sort.Order.desc("recommend"), Sort.Order.desc("id"));
            case "latest", "date", "time", "일자", "날짜", "created" ->
                    Sort.by(Sort.Order.desc("createTime"), Sort.Order.desc("id"));
            default ->
                    Sort.by(Sort.Order.desc("createTime"), Sort.Order.desc("id"));
        };
    }

    // ==========================
    // 생성
    // ==========================
    @Override
    public Long create(BoardCreateRequest req) {
        if (req.getType() == null) throw new IllegalArgumentException("type is required");
        if (req.getTitle() == null || req.getTitle().isBlank()) throw new IllegalArgumentException("title is required");
        if (req.getContent() == null || req.getContent().isBlank()) throw new IllegalArgumentException("content is required");

        Board entity = switch (req.getType()) {
            case GENERAL -> new GeneralBoard();
            case QNA     -> new QnaBoard();
            case REVIEW  -> new ReviewBoard();
            case NOTICE  -> new NoticeBoard();
            case AD      -> new AdBoard();
        };

        UserProfile profile = null;
        if (req.getWriterId() != null) {
            profile = userProfileRepository.findById(req.getWriterId()).orElse(null);
        }
        entity.setUserProfile(profile);

        entity.setType(req.getType());
        entity.setTitle(req.getTitle());
        entity.setContent(req.getContent());
        entity.setWriter(req.getWriterId() != null ? String.valueOf(req.getWriterId()) : "anonymous");

        // 핀(pinned*) 값은 전용 API(/{id}/pin)에서만 변경
        return boardRepository.save(entity).getId();
    }

    @Override
    public Long create(BoardCreateRequest req, List<MultipartFile> images) {
        Long id = create(req);
        if (images == null || images.isEmpty()) return id;
        Board board = boardRepository.getReferenceById(id);
        saveImages(board, images);
        return id;
    }

    // ==========================
    // 조회 / 목록
    // ==========================
    @Override
    @Transactional(readOnly = true)
    public BoardResponse get(Long id) {
        Board e = boardRepository.findWithImagesById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found: " + id));
        return toResponse(e);
    }

    // (하위호환) 타입별 최신순
    @Override
    @Transactional(readOnly = true)
    public List<BoardResponse> listLatest(Board.Type type) {
        return boardRepository.findByTypeOrderByCreateTimeDesc(type)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // (하위호환) 타입별 기본 조회
    @Override
    @Transactional(readOnly = true)
    public List<BoardResponse> list(Board.Type type) {
        return boardRepository.findByType(type)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // ✅ 타입별 정렬 목록
    @Override
    @Transactional(readOnly = true)
    public List<BoardResponse> listByType(Board.Type type, String order) {
        Sort sort = resolveSort(order);
        return boardRepository.findByType(type, sort)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // (하위호환) 전체 최신순: pinned 최상단 + 나머지 최신
    @Override
    @Transactional(readOnly = true)
    public List<BoardResponse> listAllLatest() {
        return listAll("latest");
    }

    // ✅ 전체 목록 정렬 (고정 공지는 항상 최상단 + pinnedAt 내림차순)
    @Override
    @Transactional(readOnly = true)
    public List<BoardResponse> listAll(String order) {
        var now = java.time.LocalDateTime.now();

        // pinned: pinnedAt desc, 그다음 createTime desc
        Sort pinnedSort = Sort.by(
                Sort.Order.desc("pinnedAt"),
                Sort.Order.desc("createTime"),
                Sort.Order.desc("id")
        );
        var pinned = boardRepository.findPinnedNotices(now, pinnedSort);

        // 나머지는 요청 정렬
        Sort restSort = resolveSort(order);
        var rest = boardRepository.findRestForAll(now, restSort);

        var result = new java.util.ArrayList<BoardResponse>(pinned.size() + rest.size());
        pinned.stream().map(this::toResponse).forEach(result::add);
        rest.stream().map(this::toResponse).forEach(result::add);
        return result;
    }

    // ✅ 간단 전체 정렬(핀 무시, 레거시/간편용)
    //    -> 네가 준 getAll(String order) 로직을 그대로 통합
    @Transactional(readOnly = true)
    public List<BoardResponse> getAll(String order) {
        Sort sort = resolveSort(order);
        return boardRepository.findAll(sort)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ==========================
    // 수정
    // ==========================
    @Override
    public void update(Long id, BoardUpdateRequest req) {
        Board e = boardRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found: " + id));

        if (req.getTitle() != null)   e.setTitle(req.getTitle());
        if (req.getContent() != null) e.setContent(req.getContent());
        // 핀(pinned*) 값은 전용 API에서만 변경
    }

    @Override
    public void updateImages(Long id, List<Long> keepIds, List<MultipartFile> newImages) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found: " + id));

        if (board.getImages() != null) {
            var snapshot = new ArrayList<>(board.getImages());
            for (BoardImage img : snapshot) {
                boolean keep = (keepIds != null && keepIds.contains(img.getId()));
                if (!keep) {
                    fileStorageService.delete(img.getFolder(), img.getStoredName());
                    board.getImages().remove(img);
                    boardImageRepository.delete(img);
                }
            }
        }

        if (newImages != null && !newImages.isEmpty()) {
            int nextOrder = (board.getImages() == null) ? 0 : board.getImages().size();
            for (MultipartFile file : newImages) {
                if (file == null || file.isEmpty()) continue;

                var sf = fileStorageService.store(file);
                BoardImage img = BoardImage.builder()
                        .board(board)
                        .originalName(sf.originalName())
                        .storedName(sf.storedName())
                        .folder(sf.folder())
                        .url(sf.url())
                        .contentType(sf.contentType())
                        .size(sf.size())
                        .sortOrder(nextOrder++)
                        .build();

                boardImageRepository.save(img);
                if (board.getImages() != null) {
                    board.getImages().add(img);
                }
            }
        }
    }

    // 공지 전역 고정/해제
    @Override
    public void setPinned(Long id, boolean pinned, java.time.LocalDateTime pinUntil) {
        Board e = boardRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found: " + id));

        if (e.getType() != Board.Type.NOTICE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only NOTICE can be pinned globally");
        }

        e.setPinnedGlobal(pinned);
        if (pinned) {
            e.setPinnedAt(java.time.LocalDateTime.now());
            e.setPinUntil(pinUntil); // null이면 무기한
        } else {
            e.setPinUntil(null);
            e.setPinnedAt(null);
        }
    }

    // ==========================
    // 삭제
    // ==========================
    @Override
    public void delete(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found: " + id));

        if (board.getImages() != null) {
            for (BoardImage img : new ArrayList<>(board.getImages())) {
                fileStorageService.delete(img.getFolder(), img.getStoredName());
                board.getImages().remove(img);
                boardImageRepository.delete(img);
            }
        }
        boardRepository.delete(board);
    }

    // ==========================
    // 매핑 (이미지 + 핀 포함)
    // ==========================
    private BoardResponse toResponse(Board e) {
        Long writerId = null;
        if (e.getUserProfile() != null) {
            writerId = e.getUserProfile().getId();
        } else if (e.getWriter() != null) {
            try { writerId = Long.valueOf(e.getWriter()); } catch (NumberFormatException ignore) {}
        }

        List<BoardResponse.ImageDto> imageDtos =
                (e.getImages() == null) ? List.of()
                        : e.getImages().stream()
                        .sorted(java.util.Comparator.comparing(
                                BoardImage::getSortOrder,
                                java.util.Comparator.nullsLast(Integer::compareTo)))
                        .map(img -> new BoardResponse.ImageDto(
                                img.getId(),
                                publicUrl(img),
                                img.getSortOrder()))
                        .toList();

        return BoardResponse.builder()
                .id(e.getId())
                .type(e.getType())
                .title(e.getTitle())
                .content(e.getContent())
                .writerId(writerId)
                .createTime(e.getCreateTime())
                .modifyTime(e.getModifyTime())
                .pinnedGlobal(e.isPinnedGlobal())
                .pinUntil(e.getPinUntil())
                .pinnedAt(e.getPinnedAt())
                .images(imageDtos)
                .build();
    }

    private String publicUrl(BoardImage img) {
        if (img.getUrl() != null && !img.getUrl().isBlank()) {
            return img.getUrl();
        }
        String folder = (img.getFolder() == null) ? "" : img.getFolder().replace("\\", "/");
        if (!folder.isEmpty() && !folder.endsWith("/")) {
            folder = folder + "/";
        }
        return "/files/" + folder + img.getStoredName();
    }

    private void saveImages(Board board, List<MultipartFile> images) {
        int order = (board.getImages() == null) ? 0 : board.getImages().size();
        for (MultipartFile file : images) {
            if (file == null || file.isEmpty()) continue;

            var sf = fileStorageService.store(file);
            BoardImage img = BoardImage.builder()
                    .board(board)
                    .originalName(sf.originalName())
                    .storedName(sf.storedName())
                    .folder(sf.folder())
                    .url(sf.url())
                    .contentType(sf.contentType())
                    .size(sf.size())
                    .sortOrder(order++)
                    .build();

            boardImageRepository.save(img);
            if (board.getImages() != null) {
                board.getImages().add(img);
            }
        }
    }
}
