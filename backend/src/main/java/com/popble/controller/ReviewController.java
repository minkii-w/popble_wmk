package com.popble.controller;

import com.popble.dto.ReviewRequest;
import com.popble.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<String> createReview(
        
        @RequestPart("reviewRequest") ReviewRequest reviewRequest,
        
        // 'images' 키로 전송된 파일 리스트를 받음
        @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        
        if (reviewRequest == null) {
            return ResponseEntity.badRequest().body("리뷰 데이터가 누락되었습니다.");
        }
            
        try {
            reviewService.saveReview(reviewRequest, images);
            
            return ResponseEntity.ok("리뷰 등록 완료!");
        } catch (IllegalArgumentException e) {
             // 팝업 ID가 잘못된 경우 등
            return ResponseEntity.badRequest().body("요청 오류: " + e.getMessage());
        } catch (Exception e) {
            // 기타 서버 에러
            return ResponseEntity.status(500).body("리뷰 등록 실패: 서버 내부 에러");
        }
    }
}