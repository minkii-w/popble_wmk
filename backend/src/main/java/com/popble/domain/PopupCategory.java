package com.popble.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//팝업 스토어 카테고리 연결
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "popup_category")
public class PopupCategory {

	//카테고리 번호
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category categoryId;
	
	//스토어 번호
	@ManyToOne
	@JoinColumn(name = "popup_id")
	private PopupStore popupId;
}
