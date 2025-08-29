package com.popble.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "reservation")
public class Reservation {
	
	//예약 고유 번호
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "reservation_id")
	private Long id;
	
	//팝업 번호
	@ManyToOne
	@JoinColumn(name = "popup_id")
	private PopupStore popupId;
	
	//회원 번호
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserProfile userId;
	
	//예약번호(이거 난수로 만들어야함 20250829001)이런식으로
	//그래서 숫자를 +로 합쳐야하니까 Integer, Long보다는 String이 더 적합할것같음
	//필드명 줄일 방법
	@Column(name = "reservation_number")
	private String reservationNumber;
	
	//예약 날짜
	@Column(name = "reservation_date")
	private LocalDateTime reservationDate;
	
	//가격
	@Column(name = "price")
	private int price;
	
	//인원수
	@Column(name = "reservation_count")
	private int reservationCount;
	
	//예약 시간(예약 당시 시간?) 예약 타이밍이라면 String, VARCHAR로 바꾸어야할듯
	private LocalDateTime reservationTime;
	
	
}
