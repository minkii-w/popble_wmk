package com.popble.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "chat_message")
public class ChatMessage {

	//채팅메시지 아이디
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "chat_message_id")
	private Long id;
	
	//채팅방 아이디
	@ManyToOne
	@JoinColumn(name = "chat_room_id")
	private ChatRoom chatRoom;
	
	//회원 번호
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserProfile userProfile;
	
	//메시지 생성시간
	@CreatedDate
	@Column(name = "sent_time")
	private LocalDateTime sentTime;
	
	//메시지 내용(나중에 수정)
	//Column어노테이션에 TEXT가 뭔지 다시 확인
	@Column(name = "content", columnDefinition = "TEXT")
	private String content;
}
