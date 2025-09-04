package com.popble.service;


import com.popble.dto.PageRequestDTO;
import com.popble.dto.PageResponseDTO;
import com.popble.dto.PopupStoreDTO;

public interface PopupStoreService {

	PageResponseDTO<PopupStoreDTO> getList(PageRequestDTO pageRequestDTO);
}
