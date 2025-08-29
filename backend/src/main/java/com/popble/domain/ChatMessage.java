package com.popble.domain;

import java.time.LocalDateTime;

public class ChatMessage {

	//채팅메시지 아이디
	private Long id;
	
	//채팅방 아이디
	private ChatRoom chatRoomId;
	
	//회원 번호
	private UserProfile userId;
	
	//메시지 생성시간
	private LocalDateTime sentTime;
	
	//메시지 내용(나중에 수정)
	//Column어노테이션에 TEXT가 뭔지 다시 확인
	private String content;
}
