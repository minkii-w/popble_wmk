package com.popble.service;


import com.popble.dto.PageRequestDTO;
import com.popble.dto.PageResponseDTO;
import com.popble.dto.PopupFilterDTO;
import com.popble.dto.PopupStoreDTO;

public interface PopupStoreService {

	
	PageResponseDTO<PopupStoreDTO> getFilteredList(PopupFilterDTO popupFilterDTO);
	
	//팝업스토어 예약 조회
	PopupStoreDTO get(Long id);

	PageResponseDTO<PopupStoreDTO> getList(PageRequestDTO pageRequestDTO);
	
	//팝업스토어 예약 등록
	Long register(PopupStoreDTO popupStoreDTO);
	
	
	void modify (PopupStoreDTO popupStoreDTO);
	
	void remove (Long id);

}
