package com.popble.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class AdResponse {

    // ── 기본 식별/작성 정보 ──
    private Long id;
    private String title;
    private String content;

    private Long writerId;     // 작성자 ID
    private String writerName; // 작성자 닉네임

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;

    // ── 노출/정책 ──
    private boolean pinned;
    private boolean visible;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate publishStartDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate publishEndDate;

    // ── 통계 ──
    private int view;
    private int recommend;
    private int commentCount;

    // ── 태그/링크/연락 ──
    private List<String> tags;
    private String externalUrl;
    private String contact;

    // ── 이미지 (프론트 기대값) ──
    private List<ImageDTO> imageList;   // 간단 버전 (url, folder, storedName, originalName)
    private List<ImageDetailDTO> detailImages; // 정석 상세 버전 (uuid, path 등)
    private String thumbnail;           // 대표 이미지

    // ── 연계된 PopupStore 요약 ──
    private Long popupStoreId;
    private String popupStoreName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate popupStartDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate popupEndDate;

    private String popupAddress;

    // 🔹 프론트에서 기대하는 간단 이미지 구조
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ImageDTO {
        private String url;
        private String folder;
        private String storedName;
        private String originalName;
    }

    // 🔹 정석 이미지 상세 구조 (ImageDto 붙여서 사용)
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ImageDetailDTO {
        private Long id;               // 이미지 PK
        private Long boardId;          // 소유 게시글 ID

        private String uuid;           // 서버 저장용 파일명 키
        private String originalName;   // 원본 파일명
        private String path;           // 저장 경로 (/2025/09/11 등)

        private Integer ord;           // 정렬 순서
        private String contentType;    // image/png 등
        private Long size;             // 파일 크기(byte)

        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime createdAt;
    }
}
