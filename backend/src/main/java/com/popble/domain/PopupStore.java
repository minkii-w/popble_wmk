package com.popble.domain;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "popup_store")
public class PopupStore {
	
	//팝업스토어 상태(예정, 진행, 종료)
	public enum Status{
		SCHEDULED, ACTIVE, ENDED
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "popup_id")
	//팝업 고유 번호
	private Long id;
	
	
	//팝업스토어 이름
	@Column(name = "store_name")
	private String storeName;
	
	//팝업스토어 상세정보
	@Column(name = "description")
	private String desc;
	
	//팝업스토어 주소
	@Column(name = "address")
	private String address;
	
	//시작일
	@Column(name = "start_date")
	private LocalDate startDate;
	
	//종료일
	@Column(name = "end_date")
	private LocalDate endDate;
	
	//가격
	@Column(name = "price")
	private int price;
	
	//팝업스토어 상태
	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private Status status;
	
	//조회수
	@Column(name = "view")
	private Integer view;
	
	//추천수
	@Column(name = "recommend")
	private Integer recommend;
}
