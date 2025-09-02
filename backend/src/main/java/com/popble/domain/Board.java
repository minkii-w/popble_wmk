package com.popble.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
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
		NOTICE, GENERAL, QNA, AD, REVIEW
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
	@Column(name = "role", nullable = false)
	private Role role;
	
	//게시판 종류
	//Nullable할지 말지 고민
	@Column(name = "type", nullable = false)
	@Enumerated(EnumType.STRING)
	private Type type;
	
	//제목 길이 설정
	@Column(name = "title", nullable = false)
	private String title;
	
	//내용 길이 설정
	@Column(name = "content", nullable = false)
	private String content;
	
	
	//작성 시간
	@Column(name = "create_time", nullable = false)
	@CreatedDate
	private LocalDateTime createTime;
	
	//수정 시간
	@Column(name = "modify_time", nullable = false)
	@LastModifiedDate
	private LocalDateTime modifyTime;
	
	
	//작성자(이거 빼던지 확인해야할듯)
	@Column(name = "writer", nullable = false)
	private String writer;
	
	//조회수
	@Column(name = "view", nullable = false)
	private int view;
	
	//추천수
	@Column(name ="recommend", nullable = false)
	private int recommend;
}
