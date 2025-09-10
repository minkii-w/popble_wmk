package com.popble.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable


public class Image {

	
	//파일이름
	private String fileName;
	
	private int ord;
	
	
	//다수의 이미지 중 순서 정하기 필드 (2025/09/09 wmk 수정)
	public void setOrd(int ord) {
		this.ord = ord;
		
	}
}
