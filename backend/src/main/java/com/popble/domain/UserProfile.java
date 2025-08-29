package com.popble.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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

public class UserProfile {

	
	//user에 연결된 아이디(Mapping 하면서 바꿀것)
	//id, column join?
	@OneToOne
	@JoinColumn(name = "user_id")
	private int userId;
	
	
	//닉네임
	@Column(name = "nickname", nullable = false)
	private String nickName;

	//이미지파일(나중에 image타입으로 변환)
	@Column(name = "photo")
	private String profileImg;
}
