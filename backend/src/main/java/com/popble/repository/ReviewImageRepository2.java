package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popble.domain.ReviewImage2;

@Repository
public interface ReviewImageRepository2 extends JpaRepository<ReviewImage2, Long> {

}