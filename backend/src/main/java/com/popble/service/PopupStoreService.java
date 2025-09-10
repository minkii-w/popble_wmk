package com.popble.service;


import com.popble.dto.PageResponseDTO;
import com.popble.dto.PopupFilterDTO;
import com.popble.dto.PopupStoreDTO;

public interface PopupStoreService {

	
	PageResponseDTO<PopupStoreDTO> getFilteredList(PopupFilterDTO popupFilterDTO);
	
	PopupStoreDTO get(Long id);

	PageResponseDTO<PopupStoreDTO> getList(PageRequestDTO pageRequestDTO);
	
	//팝업스토어등록
	Long register(PopupStoreDTO popupStoreDTO);
	
	//팝업스토어 정보 가져오기
	PopupStoreDTO get(Long PopupStore);
	
	void modify (PopupStoreDTO popupStoreDTO);
	
	void remove (Long id);

}
