package com.popble.repository;

import com.popble.domain.Review2;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository2 extends JpaRepository<Review2, Long> {

    // 특정 팝업스토어의 리뷰 목록을 가져올 때(상세페이지)
     List<Review2> findAllByPopupStore_Id(Long popupStoreId); 
    
    // 특정 사용자의 리뷰 목록을 가져올 때(마이페이지)
     List<Review2> findAllByUserNickname(String userNickname); 
}