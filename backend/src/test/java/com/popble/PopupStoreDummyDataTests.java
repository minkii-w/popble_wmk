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
		stores.add(new PopupStore(null, "더현대 서울", "더현대 서울 지하 1층 팝업스토어", "서울특별시 영등포구 여의대로 108", LocalDate.of(2025, 9, 1), LocalDate.of(2025, 9, 30), 10000, PopupStore.Status.ACTIVE, 500, 25, new ArrayList<>()));
        stores.add(new PopupStore(null, "성수동 S-Factory", "트렌디한 브랜드의 팝업 성지", "서울특별시 성동구 연무장15길 11", LocalDate.of(2025, 10, 5), LocalDate.of(2025, 10, 20), 12000, PopupStore.Status.SCHEDULED, 120, 10, new ArrayList<>()));
        stores.add(new PopupStore(null, "롯데백화점 본점", "브랜드 신제품 런칭 팝업", "서울특별시 중구 남대문로 81", LocalDate.of(2025, 8, 15), LocalDate.of(2025, 8, 30), 8000, PopupStore.Status.ENDED, 800, 40, new ArrayList<>()));
        stores.add(new PopupStore(null, "가로수길 팝업", "패션 브랜드 팝업", "서울특별시 강남구 가로수길 55", LocalDate.of(2025, 9, 10), LocalDate.of(2025, 9, 25), 9500, PopupStore.Status.ACTIVE, 350, 18, new ArrayList<>()));
        stores.add(new PopupStore(null, "한남동 D-Museum", "전시 연계 팝업스토어", "서울특별시 용산구 독서당로29길 5", LocalDate.of(2025, 9, 20), LocalDate.of(2025, 10, 10), 15000, PopupStore.Status.SCHEDULED, 200, 15, new ArrayList<>()));
        stores.add(new PopupStore(null, "코엑스 팝업", "대규모 페스티벌 팝업", "서울특별시 강남구 영동대로 513", LocalDate.of(2025, 7, 1), LocalDate.of(2025, 7, 31), 7000, PopupStore.Status.ENDED, 1000, 60, new ArrayList<>()));
        stores.add(new PopupStore(null, "명동 신세계백화점", "뷰티 브랜드 팝업", "서울특별시 중구 소공로 63", LocalDate.of(2025, 9, 5), LocalDate.of(2025, 9, 18), 11000, PopupStore.Status.ACTIVE, 420, 22, new ArrayList<>()));
        stores.add(new PopupStore(null, "여의도 IFC몰", "라이프스타일 팝업", "서울특별시 영등포구 국제금융로 10", LocalDate.of(2025, 10, 1), LocalDate.of(2025, 10, 31), 9000, PopupStore.Status.SCHEDULED, 90, 5, new ArrayList<>()));
        stores.add(new PopupStore(null, "잠실 롯데월드몰", "캐릭터 팝업스토어", "서울특별시 송파구 올림픽로 300", LocalDate.of(2025, 8, 1), LocalDate.of(2025, 8, 20), 13000, PopupStore.Status.ENDED, 650, 30, new ArrayList<>()));
        stores.add(new PopupStore(null, "홍대 AK&", "인디 브랜드 팝업", "서울특별시 마포구 양화로 188", LocalDate.of(2025, 9, 15), LocalDate.of(2025, 9, 30), 10500, PopupStore.Status.ACTIVE, 300, 16, new ArrayList<>()));
        
        popupStoreRepository.saveAll(stores);
	}
}
