package com.popble;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.popble.domain.PopupStore;
import com.popble.repository.PopupStoreRepository;

@SpringBootTest
public class PopupStoreDummyDataTests {

	@Autowired
	PopupStoreRepository popupStoreRepository;
	
	@Test
	public void popupStoreDummy() {
		
		List<PopupStore> stores = new ArrayList<>();

        stores.add(PopupStore.builder()
                .storeName("더현대 서울")
                .desc("더현대 서울 지하 1층 팝업스토어")
                .address("서울특별시 영등포구 여의대로 108")
                .startDate(LocalDate.of(2025, 9, 1))
                .endDate(LocalDate.of(2025, 9, 30))
                .price(10000)
                .status(PopupStore.Status.ACTIVE)
                .view(500)
                .recommend(25)
                .maxCount(1)
                .deleted(false)
                .categories(new ArrayList<>())
                .reservations(new ArrayList<>())
                .reservationTimes(new ArrayList<>())
                .bookmarkCount(10)
                .build());

        stores.add(PopupStore.builder()
                .storeName("성수동 S-Factory")
                .desc("트렌디한 브랜드의 팝업 성지")
                .address("서울특별시 성동구 연무장15길 11")
                .startDate(LocalDate.of(2025, 10, 5))
                .endDate(LocalDate.of(2025, 10, 20))
                .price(12000)
                .status(PopupStore.Status.SCHEDULED)
                .view(120)
                .recommend(10)
                .maxCount(4)
                .deleted(false)
                .categories(new ArrayList<>())
                .reservations(new ArrayList<>())
                .reservationTimes(new ArrayList<>())
                .bookmarkCount(11)
                .build());

        stores.add(PopupStore.builder()
                .storeName("롯데백화점 본점")
                .desc("브랜드 신제품 런칭 팝업")
                .address("서울특별시 중구 남대문로 81")
                .startDate(LocalDate.of(2025, 8, 15))
                .endDate(LocalDate.of(2025, 8, 30))
                .price(8000)
                .status(PopupStore.Status.ENDED)
                .view(800)
                .recommend(40)
                .maxCount(6)
                .deleted(false)
                .categories(new ArrayList<>())
                .reservations(new ArrayList<>())
                .reservationTimes(new ArrayList<>())
                .bookmarkCount(12)
                .build());

        stores.add(PopupStore.builder()
                .storeName("가로수길 팝업")
                .desc("패션 브랜드 팝업")
                .address("서울특별시 강남구 가로수길 55")
                .startDate(LocalDate.of(2025, 9, 10))
                .endDate(LocalDate.of(2025, 9, 25))
                .price(9500)
                .status(PopupStore.Status.ACTIVE)
                .view(350)
                .recommend(18)
                .maxCount(9)
                .deleted(false)
                .categories(new ArrayList<>())
                .reservations(new ArrayList<>())
                .reservationTimes(new ArrayList<>())
                .bookmarkCount(15)
                .build());

        stores.add(PopupStore.builder()
                .storeName("한남동 D-Museum")
                .desc("전시 연계 팝업스토어")
                .address("서울특별시 용산구 독서당로29길 5")
                .startDate(LocalDate.of(2025, 9, 20))
                .endDate(LocalDate.of(2025, 10, 10))
                .price(15000)
                .status(PopupStore.Status.SCHEDULED)
                .view(200)
                .recommend(15)
                .maxCount(5)
                .deleted(false)
                .categories(new ArrayList<>())
                .reservations(new ArrayList<>())
                .reservationTimes(new ArrayList<>())
                .bookmarkCount(1)
                .build());

        stores.add(PopupStore.builder()
                .storeName("코엑스 팝업")
                .desc("대규모 페스티벌 팝업")
                .address("서울특별시 강남구 영동대로 513")
                .startDate(LocalDate.of(2025, 7, 1))
                .endDate(LocalDate.of(2025, 7, 31))
                .price(7000)
                .status(PopupStore.Status.ENDED)
                .view(1000)
                .recommend(60)
                .maxCount(4)
                .deleted(false)
                .categories(new ArrayList<>())
                .reservations(new ArrayList<>())
                .reservationTimes(new ArrayList<>())
                .bookmarkCount(3)
                .build());

        stores.add(PopupStore.builder()
                .storeName("명동 신세계백화점")
                .desc("뷰티 브랜드 팝업")
                .address("서울특별시 중구 소공로 63")
                .startDate(LocalDate.of(2025, 9, 5))
                .endDate(LocalDate.of(2025, 9, 18))
                .price(11000)
                .status(PopupStore.Status.ACTIVE)
                .view(420)
                .recommend(22)
                .maxCount(3)
                .deleted(false)
                .categories(new ArrayList<>())
                .reservations(new ArrayList<>())
                .reservationTimes(new ArrayList<>())
                .bookmarkCount(5)
                .build());

        stores.add(PopupStore.builder()
                .storeName("여의도 IFC몰")
                .desc("라이프스타일 팝업")
                .address("서울특별시 영등포구 국제금융로 10")
                .startDate(LocalDate.of(2025, 10, 1))
                .endDate(LocalDate.of(2025, 10, 31))
                .price(9000)
                .status(PopupStore.Status.SCHEDULED)
                .view(90)
                .recommend(5)
                .maxCount(2)
                .deleted(false)
                .categories(new ArrayList<>())
                .reservations(new ArrayList<>())
                .reservationTimes(new ArrayList<>())
                .bookmarkCount(3)
                .build());

        stores.add(PopupStore.builder()
                .storeName("잠실 롯데월드몰")
                .desc("캐릭터 팝업스토어")
                .address("서울특별시 송파구 올림픽로 300")
                .startDate(LocalDate.of(2025, 8, 1))
                .endDate(LocalDate.of(2025, 8, 20))
                .price(13000)
                .status(PopupStore.Status.ENDED)
                .view(650)
                .recommend(30)
                .maxCount(1)
                .deleted(false)
                .categories(new ArrayList<>())
                .reservations(new ArrayList<>())
                .reservationTimes(new ArrayList<>())
                .bookmarkCount(2)
                .build());

        stores.add(PopupStore.builder()
                .storeName("홍대 AK&")
                .desc("인디 브랜드 팝업")
                .address("서울특별시 마포구 양화로 188")
                .startDate(LocalDate.of(2025, 9, 15))
                .endDate(LocalDate.of(2025, 9, 30))
                .price(10500)
                .status(PopupStore.Status.ACTIVE)
                .view(300)
                .recommend(16)
                .maxCount(10)
                .deleted(false)
                .categories(new ArrayList<>())
                .reservations(new ArrayList<>())
                .reservationTimes(new ArrayList<>())
                .bookmarkCount(5)
                .build());
        
        popupStoreRepository.saveAll(stores);
		
	}
}
