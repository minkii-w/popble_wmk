package com.popble.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "board_image",
       indexes = {
           @Index(name = "idx_boardimage_board", columnList = "board_id"),
           @Index(name = "idx_boardimage_sort", columnList = "board_id, sortOrder")
       })
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BoardImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalName;   // 업로드 당시 파일명
    private String storedName;     // 서버/스토리지 저장 파일명(UUID.ext)
    private String folder;         // yyyy/MM/dd
    private String url;            // /uploads/... 또는 S3 URL
    private String contentType;
    private long size;

    private int sortOrder;         // 0이 대표

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;
}
