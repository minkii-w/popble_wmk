package com.popble.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.popble.domain.PopupCategory;
import com.popble.domain.Reservation;
import com.popble.domain.ReservationTime;
import com.popble.domain.PopupStore.Status;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PopupStoreDTO {

	//팝업 고유 번호
	private Long id;
	
	
	//팝업스토어 이름
	private String storeName;
	
	//팝업스토어 상세정보
	private String desc;
	
	//팝업스토어 주소
	private String address;
	
	//시작일
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate startDate;
	
	//종료일
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate endDate;
	
	//가격
	private int price;
	
	//팝업스토어 상태
	private Status status;
	
	//조회수
	private Integer view;
	
	//추천수
	private Integer recommend;
	
	//최대 인원수
	private Integer maxCount;
	
	//예약시간 오전/오후 기업이 나눌수 있게
	@Builder.Default
	private List<ReservationTime> reservationTimes = new ArrayList<>();

	//예약
	//미사용시 삭제할것(reservation에서 popupstore로 조회가능)
	@Builder.Default
	private List<Reservation> reservations = new ArrayList<>();
	
	//카카오맵 관련 위도,경도
	//위도
	private Double latitude;
	
	//경도
	private Double longitude;
	
	//소프트 삭제(1달? 3달 6달? 팝업 소프트삭제)
	private boolean deleted = false;
	
	//카테고리연결
	@Builder.Default
	private List<PopupCategory> categories = new ArrayList<>();
	
	//북마크수
	private int bookmarkCount = 0;
	
	
	//2025-09-09 wmk 수정
	//이미지
	@Builder.Default
	private List<MultipartFile>files = new ArrayList<>();
	
	@Builder.Default
	private List<String>uploadFileNames = new ArrayList<>();

	
	}
