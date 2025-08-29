package com.popble.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "ad_board")
public class AdBoard extends Board {

//	//게시판 번호
//	//상속 @Inheritance(strategy = InheritanceType.JOINED) 필요없음
//	private Board boardId;
	
	//팝업스토어 번호
	@OneToOne
	@JoinColumn(name = "store_id")
	private PopupStore storeId;
	
	
}
