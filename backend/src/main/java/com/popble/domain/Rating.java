package com.popble.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Rating {
	
	//별점 아이디
	@Id
	@Column(name = "rating_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	//스토어 번호
	private PopupStore popupId;
	
	@ManyToOne
	//회원번호
	private UserProfile userId;
	
	@Column(name = "score")
	//별점 점수
	private Integer score;
}
