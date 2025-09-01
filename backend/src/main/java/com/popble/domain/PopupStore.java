package com.popble.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
	
	//최대 인원수
	private Integer maxCount;
	
	//예약시간 오전/오후 기업이 나눌수 있게
	@OneToMany(mappedBy = "popupStore")
	private List<ReservationTime> reservationTimes = new ArrayList<>();
	
	//예약
	@OneToMany(mappedBy = "popupStore")
	private List<Reservation> reservations = new ArrayList<>();
	
	//지점 추가?
	
	//소프트 삭제(1달? 3달 6달? 팝업 소프트삭제)
	@Column(name = "deleted", nullable = false)
	private boolean deleted = false;
	
	//카테고리연결
	@OneToMany(mappedBy = "popupStore")
	private List<PopupCategory> categories = new ArrayList<>();
	
	//
	
	//UserProfile과 연결해야할지 말지 고민...
}
