package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Rating;

public interface RatingRepository extends JpaRepository<Rating, Long>{

}
