package com.popble.domain;

import java.time.LocalDateTime;

public class Bookmark {

	//북마크 아이디
	private Long id;
	
	//스토어 번호
	private PopupStore popupId;
	
	//회원번호
	private UserProfile userId;
	
	//북마크 시간
	private LocalDateTime createDate;
}
