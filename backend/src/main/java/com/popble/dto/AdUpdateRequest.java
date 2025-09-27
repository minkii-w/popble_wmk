package com.popble.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class AdUpdateRequest {

    // ── 기본 작성 정보 ──
    @Size(max = 120)
    private String title;   // 광고 제목

    @Size(max = 5000)
    private String content; // 광고 내용

    private Long popupStoreId;        // 연계된 PopupStore (선택)

    private List<String> tags;        // 해시태그/키워드

    @Size(max = 500)
    private String externalUrl;       // 외부 랜딩/구매 링크

    @Size(max = 100)
    private String contact;           // 연락처

    // ── 노출 정책 ──
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate publishStartDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate publishEndDate;

    private Boolean pinned;   // 상단 고정 여부
    private Boolean visible;  // 공개 여부
}
