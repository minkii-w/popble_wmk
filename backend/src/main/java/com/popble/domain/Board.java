package com.popble.domain;

import java.time.LocalDate;

public abstract class Board {

	public enum Type{
		NOTICE, GENERAL, QNA, AD, REVIEW
	}
	
	//게시판 고유id
	private Long id;
	
	
	//프로필 유저 연결
	private UserProfile userId;
	
	//권한
	private Role role;
	
	//게시판 타입
	private Type type;
	
	//제목
	private String title;
	
	//내용
	private String content;
	
	
	//작성 시간
	private LocalDate createTime;
	
	//수정 시간
	private LocalDate modifyTime;
	
	//작성자(이거 빼던지 확인해야할듯)
	private String writer;
	
	//조회수
	private int view;
	
	//추천수
	private int recommend;
}
