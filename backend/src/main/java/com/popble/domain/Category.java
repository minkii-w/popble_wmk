//package com.popble.domain;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.EnumType;
//import jakarta.persistence.Enumerated;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "category")
//public class Category {
//
//	public enum CategoryType {
//		MAIN, LOCALE, THEME
//	}
//	
//	//카테고리 번호
//	@Id
//	//1-100 카테고리 101-200 지역 201-300 테마? 이런식은 어떤지
////	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "category_id")
//	private Integer id;
//	
//	//카테고리 이름
//	@Column(name = "name")
//	private String name;
//	
//	@Enumerated(EnumType.STRING)
//	@Column(name = "type")
//	private CategoryType type;
//	
//	@OneToMany(mappedBy = "category")
//	@JsonManagedReference
//	private List<PopupCategory> categories = new ArrayList<>();
//}
