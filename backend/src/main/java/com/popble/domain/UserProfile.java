package com.popble.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_profile")
@Builder
public class UserProfile {

	
	//user에 연결된 아이디(Mapping 하면서 바꿀것)
	//id, column join?
//  에러남..
	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@MapsId
	@JoinColumn(name = "user_id")
	private Users users;
	
	
	//닉네임
	@Column(name = "nickname", nullable = false)
	private String nickname;

	//이미지파일(나중에 image타입으로 변환)
	@Column(name = "photo")
	private String profileImg;
}
