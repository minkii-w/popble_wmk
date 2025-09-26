package com.popble.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "board")
@Getter
@Setter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@EntityListeners(AuditingEntityListener.class)
public abstract class Board {

	public enum Type{
		NOTICE, GENERAL, QNA, AD
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "board_id")
	//게시판 고유id
	private Long id;
	
	
	//프로필 유저 연결
	//Nullable할지 말지 고민
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private UserProfile userProfile;
	
	//권한
	//Nullable할지 말지 고민
	@Enumerated(EnumType.STRING)                  // ★ enum 매핑 추가
	@Column(name = "role", nullable = true)       // 테스트 단계에선 true (prePersist에서 기본값 세팅)
	private Role role;
	
	//게시판 종류
	//Nullable할지 말지 고민
	@Column(name = "type", nullable = false)
	@Enumerated(EnumType.STRING)
	private Type type;
	
	//제목 길이 설정
	@Column(name = "title", nullable = false, length = 200)
	private String title;
	
	//내용 길이 설정
	@Lob                                          // ★ 긴 본문 대비
	@Column(name = "content", nullable = false)
	private String content;
	
	
	//작성 시간
	@Column(name = "create_time", nullable = false, updatable = false) // ★ updatable=false 권장
	@CreatedDate
	private LocalDateTime createTime;
	
	//수정 시간
	@Column(name = "modify_time", nullable = false)
	@LastModifiedDate
	private LocalDateTime modifyTime;
	
	
	//작성자(이거 빼던지 확인해야할듯)
	@Column(name = "writer", nullable = false, length = 50)
	private String writer;
	
	//조회수
	@Column(name = "view", nullable = false)
	private int view = 0;                          // ★ 기본값
	
	//추천수
	@Column(name ="recommend", nullable = false)
	private int recommend = 0;                     // ★ 기본값
	
	
	//이미지
	// Board 클래스 내부에 아래 필드/메서드를 추가하세요.
	// 필드 추가
	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("sortOrder ASC, id ASC")
	private List<BoardImage> images = new ArrayList<>();

	// 편의 메서드 추가
	public void addImage(BoardImage img){
	    images.add(img);
	    img.setBoard(this);
	}
	public void removeImage(BoardImage img){
	    images.remove(img);
	    img.setBoard(null);
	}


	
	// ★ 감사(Auditing) 누락/지연 대비 안전장치
	@PrePersist
	public void prePersist() {
		if (this.createTime == null) this.createTime = LocalDateTime.now();
		if (this.modifyTime == null) this.modifyTime = this.createTime;
		if (this.role == null) this.role = Role.MEMBER; // 기본 권한
	}
	
	@PreUpdate
	public void preUpdate() {
		this.modifyTime = LocalDateTime.now();
	}
}
