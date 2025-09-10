package com.popble.dto;

import java.time.LocalDateTime;

import com.popble.domain.Board;

import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class BoardResponse {

	private Long id;					// 글 번호
		
	private Board.Type type;			// 게시판 종류
	
	private String title;				// 제목
	
	private String content;				// 내용
	
	private Long writerId;			// 작성자 ID
	
	private Long userID;
	
	private LocalDateTime createTime;	// 작성일
	
	private LocalDateTime modifyTime;	// 수정일
	
}
