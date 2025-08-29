package com.popble.domain;

public class NoticeBoard extends Board {
	
	//JoinColumn??
	//보드 아이디가 PK가 됨
	private Board boardId;
	
	//게시글 고정
	private boolean pin;
	
}
