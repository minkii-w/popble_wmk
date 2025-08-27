package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Board;

public interface BoardReposiotry extends JpaRepository<Board, Long>{

}
