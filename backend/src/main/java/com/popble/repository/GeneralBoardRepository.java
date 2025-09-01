package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.GeneralBoard;
import com.popble.domain.UserProfile;

import java.util.List;


public interface GeneralBoardRepository extends JpaRepository<GeneralBoard, Long>{
	List<GeneralBoard> findByUserId(UserProfile userId);
}
