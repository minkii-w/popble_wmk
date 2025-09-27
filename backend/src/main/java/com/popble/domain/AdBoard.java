package com.popble.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ad_board")
public class AdBoard extends Board {

    @Column(length = 500)
    private String externalUrl;

    @Column(length = 100)
    private String contact;

    private LocalDate publishStartDate;
    private LocalDate publishEndDate;

    // 🔹 AdBoard 전용 필드
    private Boolean pinned = false;   // 고정 여부
    private Boolean visible = true;   // 노출 여부

    @ElementCollection
    @CollectionTable(name = "ad_board_tags", joinColumns = @JoinColumn(name = "board_id"))
    @Column(name = "tag", length = 40)
    private List<String> tags = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardImage> imageList = new ArrayList<>();

    // ==== 편의 메서드 ====
    public void addImage(BoardImage image) {
        image.setBoard(this);
        image.setSortOrder(imageList.size());
        imageList.add(image);
    }

    public void clearImages() {
        this.imageList.clear();
    }

    // ==== Builder 지원 (부모 필드 포함) ====
    @Builder
    public AdBoard(String title, String content, UserProfile userProfile, String writer,
                   String externalUrl, String contact,
                   LocalDate publishStartDate, LocalDate publishEndDate,
                   Boolean pinned, Boolean visible, List<String> tags) {

        setTitle(title);
        setContent(content);
        setUserProfile(userProfile);
        setWriter(writer);

        // ✅ type 강제 지정 (null 방지)
        setType(Board.Type.AD);

        this.externalUrl = externalUrl;
        this.contact = contact;
        this.publishStartDate = publishStartDate;
        this.publishEndDate = publishEndDate;
        this.pinned = pinned != null ? pinned : false;
        this.visible = visible != null ? visible : true;
        this.tags = tags != null ? tags : new ArrayList<>();
    }
}
