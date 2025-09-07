package com.popble.service;


import com.popble.dto.PageRequestDTO;
import com.popble.dto.PageResponseDTO;
import com.popble.dto.PopupFilterDTO;
import com.popble.dto.PopupStoreDTO;

public interface PopupStoreService {

//	PageResponseDTO<PopupStoreDTO> getList(PageRequestDTO pageRequestDTO);
	
	PageResponseDTO<PopupStoreDTO> getFilteredList(PopupFilterDTO popupFilterDTO);
}
