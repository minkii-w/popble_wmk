package com.popble.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "notice_board")
public class NoticeBoard extends Board {
	
//	//JoinColumn??
//	//보드 아이디가 PK가 됨
//	private Board boardId;

	//게시글 고정
	@Column(name = "pin")
	private boolean pin;
	
}
