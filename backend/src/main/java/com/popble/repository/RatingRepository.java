package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Rating;

public interface RatingRepository extends JpaRepository<Rating, Long>{

	//특정 팝업에 대한 모든 별점
	
	//특정 팝업의 평균 별점
	
	//유저가 별점을남겼는지
}
