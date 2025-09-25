package com.popble.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name = "popup_store")
public class PopupStore {

    // ===== 상태 ENUM =====
    public enum Status {
        SCHEDULED, ACTIVE, ENDED, ALL
    }

    // ===== 기본 컬럼 =====
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "popup_id")
    private Long id; // 팝업 고유 번호

    @Column(name = "store_name")
    private String storeName; // 팝업스토어 이름

    @Column(name = "description")
    private String desc; // 상세정보

    @Column(name = "address")
    private String address; // 주소

    @Column(name = "start_date")
    private LocalDate startDate; // 시작일

    @Column(name = "end_date")
    private LocalDate endDate; // 종료일

    @Column(name = "price")
    private int price; // 가격

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status; // 상태

    @Column(name = "view")
    private Integer view;

    @Column(name = "recommend")
    private Integer recommend;

    private Integer maxCount;

    // ===== 생성/수정 시간 (자동 반영) =====
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createTime;

    @UpdateTimestamp
    private LocalDateTime updateTime;

    // ===== 소프트 삭제 =====
    @Column(name = "deleted", nullable = false)
    @Builder.Default
    private boolean deleted = false;

    // ===== 필요 없는 필드 (주석 처리 유지) =====
    /*
    @OneToMany(mappedBy = "popupStore")
    private List<ReservationTime> reservationTimes = new ArrayList<>();

    @OneToMany(mappedBy = "popupStore")
    private List<Reservation> reservations = new ArrayList<>();

    private Double latitude;
    private Double longitude;

    @OneToMany(mappedBy = "popupStore")
    @JsonManagedReference
    private List<PopupCategory> categories = new ArrayList<>();

    @Column(name = "bookmark_count")
    private int bookmarkCount = 0;

    @ManyToOne
    @JoinColumn(name = "userProfile_id")
    private UserProfile owner;
    */

    // ===== 이미지 연관 (BoardImage 기반) =====
    @OneToMany(mappedBy = "popupStore", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<BoardImage> imageList = new ArrayList<>();

    // ===== 편의 메서드 =====
    public void addImage(BoardImage image) {
        image.setPopupStore(this); // 연관관계 설정
        image.setSortOrder(this.imageList.size()); // 0부터 순서 매김
        imageList.add(image);
    }

    public void clearImages() {
        this.imageList.clear();
    }
}
