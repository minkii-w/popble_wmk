package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

	//채팅방 안에 있는 메시지들 시간순으로 정렬
	
	//최근 메시지
}
