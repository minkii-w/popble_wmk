//
//package com.popble.service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.popble.domain.Bookmark;
//import com.popble.domain.PopupStore;
//import com.popble.domain.UserProfile;
//import com.popble.dto.BookmarkDTO;
//import com.popble.dto.PopupStoreDTO;
//import com.popble.repository.BookmarkRepository;
//import com.popble.repository.PopupStoreRepository;
//import com.popble.repository.UserProfileRepository;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//
//
//@Service
//@Log4j2
//@RequiredArgsConstructor
//@Transactional
//public class BookmarkServiceImpl implements BookmarkService{
//
//	private final BookmarkRepository bookmarkRepository;
//	private final UserProfileRepository userProfileRepository;
//	private final PopupStoreRepository popupStoreRepository;
////	private final ModelMapper modelMapper;
//	
//	//북마크 추가
//	public boolean addBookmark(Long userId, Long popupId) {
//		
//		UserProfile user = userProfileRepository.findById(userId).orElseThrow();
//		
//		PopupStore popup = popupStoreRepository.findById(popupId).orElseThrow();
//		
//		if(bookmarkRepository.findByUserProfileAndPopupStore(user,popup).isEmpty()) {
//			Bookmark bookmark = new Bookmark();
//			bookmark.setUserProfile(user);
//			bookmark.setPopupStore(popup);
//			bookmark.setCreateDate(LocalDateTime.now());
//			bookmarkRepository.save(bookmark);
//			
//			//클릭하면 북마크 수 증가
//			popup.setBookmarkCount(popup.getBookmarkCount() + 1);
//			popupStoreRepository.save(popup);
//			
//			return true;
//		}
//		
//		return false;
//	}
//	
//	//북마크 삭제
//	public boolean deleteBookmark(Long userId, Long popupId) {
//		UserProfile user = userProfileRepository.findById(userId)
//							.orElseThrow();
//		
//		PopupStore popup = popupStoreRepository.findById(popupId)
//							.orElseThrow();
//		
//		Optional<Bookmark> bm = bookmarkRepository.findByUserProfileAndPopupStore(user, popup);
//		
//		if(bm.isPresent()) {
//			Bookmark bookmark = bm.get();
//			bookmarkRepository.delete(bookmark);
//			//북마크 수 감소
//			popup.setBookmarkCount(popup.getBookmarkCount()-1);
//
//			return true;
//		}
//		
//		return false;
//	}
//	
//	@Transactional(readOnly = true)
//	public Page<BookmarkDTO> bookmarkList(Long userId, Pageable pageable){
//		UserProfile user = userProfileRepository.findById(userId).orElseThrow();
//		
//		Page<Bookmark> bookmarks = bookmarkRepository.findByUserProfileOrderByCreateDateDesc(user, pageable);
//		
//		return bookmarks.map(bookmark -> {
//			PopupStore popupStore = bookmark.getPopupStore();
//
//			//BookmarkDTO 만들어서 관리
////			// ModelMapper 대신 PopupStoreDTO 객체를 직접 생성하고 수동으로 매핑
////			PopupStoreDTO dto = PopupStoreDTO.builder()
////					.id(popupStore.getId())
////					.storeName(popupStore.getStoreName())
////					.desc(popupStore.getDesc())
////					.address(popupStore.getAddress())
////					.startDate(popupStore.getStartDate())
////					.endDate(popupStore.getEndDate())
////					.price(popupStore.getPrice())
////					.status(popupStore.getStatus())
////					.view(popupStore.getView())
////					.recommend(popupStore.getRecommend())
////					.maxCount(popupStore.getMaxCount())
//////					.reservationTimes(popupStore.getReservationTimes()) // 복잡한 컬렉션 필드 직접 매핑//안하면 에러나는듯.ㅠ
//////					.reservations(popupStore.getReservations())
////					.latitude(popupStore.getLatitude())
////					.longitude(popupStore.getLongitude())
////					.deleted(popupStore.isDeleted())
////					.categories(popupStore.getCategories()) // 복잡한 컬렉션 필드 직접 매핑 //에러남 ㅠ
////					.bookmarkCount(popupStore.getBookmarkCount())
////					.build();
//			
//			BookmarkDTO dto =  BookmarkDTO.builder()
//								.popupId(popupStore.getId())
//								.storeName(popupStore.getStoreName())
//								.address(popupStore.getAddress())
//								.startDate(popupStore.getStartDate())
//								.endDate(popupStore.getEndDate())
//								.bookmarkCount(popupStore.getBookmarkCount())
//								.status(popupStore.getStatus())
//								.build();
//			
//			List<String> fileNames = popupStore.getImageList().stream()
//									.map(image -> image.getFileName())
//									.collect(Collectors.toList());
//			dto.setImageFileNames(fileNames);
//			
//			return dto;
//		});
//	}
//	//북마크 여부
//	public boolean isBookmark(Long userId, Long popupId) {
//		
//		UserProfile user = userProfileRepository.findById(userId)
//							.orElseThrow();
//		
//		PopupStore popupStore = popupStoreRepository.findById(popupId)
//								.orElseThrow();
//		
//		return bookmarkRepository.existsByUserProfileAndPopupStore(user, popupStore);
//	}
//}
