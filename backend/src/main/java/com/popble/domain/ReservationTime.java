package com.popble.domain;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(
    name = "reservation_time",
    // 💡 UNIQUE 제약 조건 추가: 중복 데이터 방지
    uniqueConstraints = @UniqueConstraint(columnNames = {"popup_id", "date", "start_time"})
)
public class ReservationTime {

	// 아이디
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "reservation_time_id")
	private Long id;
	
	// 팝업스토어 연결
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "popup_id")
	private PopupStore popupStore;
	
	// 행사 시작시간 (HH:mm 형식)
	@Column(name = "start_time", columnDefinition = "TIME(0)")
    private LocalTime startTime;
    
    // 행사 종료시간 (HH:mm 형식)
	@Column(name = "end_time", columnDefinition = "TIME(0)")
    private LocalTime endTime;
	
	// 예약 연결
	@JsonManagedReference("reservationTimeRef")
	@OneToMany(mappedBy = "reservationTime", cascade = CascadeType.ALL)
	private List<Reservation> reservations = new ArrayList<>();
	
	// 예약 가능 날짜
	private LocalDate date;
	
	// 한 타임당 예약 가능한 최대 인원
	private int maxCount;
	
	// 현재 예약된 인원수
	private int currentCount;

}