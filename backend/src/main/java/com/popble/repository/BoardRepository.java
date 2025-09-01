package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Board;
import java.util.List;
import java.time.LocalDateTime;
import com.popble.domain.Board.Type;



public interface BoardRepository extends JpaRepository<Board, Long> {

	//타입별
	List<Board> findByType(Board.Type type);
	//최신순
	List<Board> findByTypeOrderByCreateTime(Board.Type type, LocalDateTime createTime);
	//조회순
	
	//추천순
}
