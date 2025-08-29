package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Bookmark;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long>{

}
