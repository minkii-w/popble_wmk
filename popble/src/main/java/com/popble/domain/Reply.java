package com.popble.domain;

import java.time.LocalDateTime;

public class Reply {

	//댓글 고유키
	private Long id;
	
	//내용
	private String content;
	
	//작성시간
	private LocalDateTime createTime;
	
	//회원번호
	private UserProfile userId;
	
	//게시판 번호
	private Board boardId;
}
