//package com.popble.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import com.popble.domain.AdBoard;
//import com.popble.domain.UserProfile;
//
//import java.util.List;
//
//
//public interface AdBoardRepository extends JpaRepository<AdBoard, Long> {
//
//	//기업이 작성한 AD 게시글
//	List<AdBoard> findByUserProfile(UserProfile userProfile);
//}
