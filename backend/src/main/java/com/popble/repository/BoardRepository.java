// src/main/java/com/popble/repository/BoardRepository.java
package com.popble.repository;

import com.popble.domain.Board;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    // ===== 기본 조회 =====
    List<Board> findByType(Board.Type type);                          // 타입별
    List<Board> findByTypeOrderByCreateTimeDesc(Board.Type type);     // 타입별 최신순
    List<Board> findAllByOrderByCreateTimeDesc();                     // 전체 최신순

    // ===== 동적 정렬 지원 =====
    List<Board> findByType(Board.Type type, Sort sort);               // 타입별 동적 정렬
    List<Board> findAll(Sort sort);                                   // 전체 동적 정렬

    // ===== 상세 조회 (이미지/작성자 fetch join) =====
    @Query("""
           select distinct b
           from Board b
           left join fetch b.images
           left join fetch b.userProfile
           where b.id = :id
           """)
    Optional<Board> findWithImagesById(@Param("id") Long id);

    // ===== 전체 목록 fetch join (주의: 페이징 부적합) =====
    @Query("""
           select distinct b
           from Board b
           left join fetch b.userProfile
           left join fetch b.images
           order by b.createTime desc
           """)
    List<Board> findAllWithImagesOrderByCreateTimeDesc();

    // ===== 전역 고정 공지 & 나머지 분리 조회 (동적 정렬) =====
    @Query("""
           select distinct b
           from Board b
           left join fetch b.userProfile
           left join fetch b.images
           where b.type = 'NOTICE'
             and b.pinnedGlobal = true
             and (b.pinUntil is null or b.pinUntil > :now)
           """)
    List<Board> findPinnedNotices(@Param("now") LocalDateTime now, Sort sort);

    @Query("""
           select distinct b
           from Board b
           left join fetch b.userProfile
           left join fetch b.images
           where not (
                b.type = 'NOTICE'
            and b.pinnedGlobal = true
            and (b.pinUntil is null or b.pinUntil > :now)
           )
           """)
    List<Board> findRestForAll(@Param("now") LocalDateTime now, Sort sort);
}
