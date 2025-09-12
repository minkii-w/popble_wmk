//package com.popble.repository;
//
//import java.time.LocalDate;
//import java.util.List;
//import java.util.Optional;
//
//
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.EntityGraph;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//
//import com.popble.domain.PopupStore;
//
//public interface PopupStoreRepository extends JpaRepository<PopupStore, Long>, JpaSpecificationExecutor<PopupStore>{
//
//	//기업 유저가 등록한 팝업 리스트
//	List<PopupStore> findByOwner_Id(Long ownerId);
//	//종료일이 1개월 지난 팝업스토어
//	
//	//특정 카테고리에 속한 팝업스토어 조회
//	
//	//삭제되지 않은 팝업만 조회
//	List<PopupStore> findAllByDeleted(boolean deleted);
//	//추천수가 높은 순으로 정렬
//	List<PopupStore> findAllByOrderByRecommendDesc();
//	//특정 주소에 위치한 팝업스토어 찾기
//	
//	//북마크 많은 순으로 정렬
//	List<PopupStore> findAllByOrderByBookmarkCountDesc();
//	//조회순으로 정렬
//	List<PopupStore> findAllByOrderByViewDesc();
//	//종료 임박순
//	List<PopupStore> findAllByEndDateAfterOrderByEndDateAsc(LocalDate endDate);
//	
//	
//	//이미지
//	@EntityGraph(attributePaths = "imageList")
//	@Query("select p from PopupStore p where p.id = :id")
//	Optional<PopupStore> selectOne(@Param("id") Long id);
//	
//	@Modifying
//	@Query("update PopupStore p set p.deleted = :flag where p.id = :id")
//	void updateToDelete(@Param("id") Long id, @Param("flag") boolean flag);
//	
//	@Query("select p, pi from PopupStore p left join p.imageList pi where pi.ord = 0 and p.deleted = false")
//	Page<Object[]> selectList(Pageable pageable);
//	
//
//}
