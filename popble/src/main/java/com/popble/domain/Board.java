package com.popble.domain;

import java.time.LocalDate;

public class Board {

	public enum Type{
		NOTICE, GENERAL, QNA, AD, REVIEW
	}
	
	private Long id;
	
	private Long userId;
	
	private Role role;
	
	private Type type;
	
	private String title;
	
	private String content;
	
	private LocalDate createTime;
	
	private LocalDate modifyTime;
	
	private String writer;
	
	private int view;
}
