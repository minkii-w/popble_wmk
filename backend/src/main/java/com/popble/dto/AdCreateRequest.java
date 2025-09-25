package com.popble.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class AdCreateRequest {

    // ── 기본 작성 정보 ──
    @NotBlank
    @Size(max = 120)
    private String title;   // 광고 제목

    @NotBlank
    @Size(max = 5000)
    private String content; // 광고 내용

    private Long writerId;  // 작성자 ID (ServiceImpl에서 필요)

    // ── 연계/선택 정보 ──
    private Long popupStoreId;        // 선택: 특정 PopupStore와 연계(딥링크)

    @Builder.Default
    private List<String> tags = List.of(); // 선택: 해시태그/키워드

    @Size(max = 500)
    private String externalUrl;       // 선택: 외부 랜딩/구매 링크

    @Size(max = 100)
    private String contact;           // 선택: 연락처(전화/이메일 등)

    // ── 노출 정책 ──
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate publishStartDate;   // AD 노출 시작일(선택)

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate publishEndDate;     // AD 노출 종료일(선택)

    @Builder.Default
    private boolean pinned = false;   // 선택: 상단 고정 여부

    @Builder.Default
    private boolean visible = true;   // 선택: 공개 여부(초안/비공개 등)
}
