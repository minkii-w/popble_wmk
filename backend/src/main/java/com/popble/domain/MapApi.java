package com.popble.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "map_api")
public class MapApi {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "map_api_id")
	//지도 id
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "popup_id")
	//팝업 id
	private PopupStore popupStore;
	
	@Column(name = "pop_location")
	//팝업 위치
	private String popLocation;
	
	@Column(name = "parking")
	private String parking;
	
	@Column(name = "accomodation")
	private String accomodation;
}
