package com.popble.dto;

import java.time.LocalDate;

import com.popble.domain.Role;
import com.popble.domain.UserProfile;

public class BoardDTO {
	
	//게시판 id
	private Long id;
	
	//DTO는 외부 노출이라 보안때문에 넣는게 맞는지 모르겠음 일단 주석처리
	//프로필 유저 연결
//	private UserProfile userId;
	
	//DTO는 외부 노출이라 보안때문에 넣는게 맞는지 모르겠음 일단 주석처리
	//권한
	//private Role role;
	
	//게시판 타입
	private String type;
	
	//제목
	private String title;
	
	//내용
	private String content;
	
	//작성시간
	private LocalDate createTime;
	
	//수정시간
	private LocalDate modifyTime;
	
	//조회수
	private int view;
	
	//추천수
	private int recommend;
}
