package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
	//유저가 참가한 채팅방 리스트
	
	//유저와 관리자의 채팅방이 있는지
}
