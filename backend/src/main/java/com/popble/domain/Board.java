package com.popble.domain;

import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
	@OneToOne
	@JoinColumn(name = "user_id")
	private UserProfile userId;
	
	//권한
	@Column(name = "role", nullable = false)
	private Role role;
	
	//게시판 종류
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
	@Column(name = "createTime", nullable = false)
	@CreatedDate
	private LocalDate createTime;
	
	//수정 시간
	@Column(name = "modifyTime", nullable = false)
	@LastModifiedDate
	private LocalDate modifyTime;
	
	
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
