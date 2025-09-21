
package com.popble.domain;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reservation_time")
@Data
public class ReservationTime {

	public enum AmPm{
		AM,PM
	}
	
	//아이디
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "reservation_time_id")
	private Long id;
	
	//팝업스토어연결(팝업 한개에서 여러개의 시간대를 가짐)
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "popup_id")
	private PopupStore popupStore;
	
	//오전 오후 선택
	@Enumerated(EnumType.STRING)
	@Column(name = "am_pm")
	private AmPm amPm;
	
	//행사 시작시간
    private LocalTime startTime;
    //행사 종료시간
    private LocalTime endTime;
	
	//예약연결(한시간대에서 여러개의 예약을 가질수 있음)
	@OneToMany(mappedBy = "reservationTime")
	private List<Reservation> reservations = new ArrayList<>();
	
	
	private String time;
	
	//예약 가능 날짜
	private LocalDate date;
	
	//한 타임당 예약 가능한 최대 인원
	private int maxCount;
	
	//현재 예약된 인원수 확인
	private int currentCount;
	
}

