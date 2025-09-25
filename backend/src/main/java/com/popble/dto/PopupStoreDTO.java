package com.popble.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.popble.domain.PopupCategory;
import com.popble.domain.PopupStore.Status;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PopupStoreDTO {

    // 팝업 고유 번호
    private Long id;

    // 팝업스토어 이름
    private String storeName;

    // 팝업스토어 상세정보
    private String desc;

    // 팝업스토어 주소
    private String address;

    // 시작일
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    // 종료일
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    // 가격
    private int price;

    // 팝업스토어 상태
    private Status status;

    // 조회수
    private Integer view;
    
    //주차여부
    private boolean parking;

    // 추천수
    private Integer recommend;

    // 최대 인원수
    private Integer maxCount;

    // 예약 시간대
    private List<ReservationTimeDTO> reservationTimes;

    // 예약 내역
    @Builder.Default
    private List<ReservationDTO> reservations = new ArrayList<>();

    // 카테고리 연결
    @Builder.Default
    private List<PopupCategory> categories = new ArrayList<>();

    // 카카오맵 관련 위도, 경도
    private Double latitude;
    private Double longitude;

    // 소프트 삭제
    private boolean deleted = false;

    // 북마크 수
    private int bookmarkCount = 0;

    // 이미지
    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>();

    @Builder.Default
    private List<String> uploadFileNames = new ArrayList<>();
}
