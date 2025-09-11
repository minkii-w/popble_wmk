package com.popble.service;


import java.util.List;

import com.popble.domain.Board;
import com.popble.dto.BoardCreateRequest;
import com.popble.dto.BoardResponse;
import com.popble.dto.BoardUpdateRequest;

public interface BoardService {

	Long create(BoardCreateRequest req);
	
	BoardResponse get(Long id);
	
	List<BoardResponse> listLatest(Board.Type type);
	List<BoardResponse> list(Board.Type type);
	
	void update(Long id, BoardUpdateRequest req);
	void delete(Long id);
	
}
