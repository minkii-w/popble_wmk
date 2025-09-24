
package com.popble.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.popble.domain.Category;
import com.popble.domain.PopupStore;
import com.popble.domain.SortType;
import com.popble.dto.PageRequestDTO;
import com.popble.dto.PageResponseDTO;
import com.popble.dto.PopupFilterDTO;
import com.popble.dto.PopupStoreDTO;
import com.popble.dto.ReservationTimeDTO;
import com.popble.service.PopupStoreService;
import com.popble.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/popup")
public class PopupStoreController {

	private final CustomFileUtil fileUtil;

	private final PopupStoreService popupStoreService;

	private final ObjectMapper objectMapper;

	// 리스트
	@GetMapping("/list")
	public PageResponseDTO<PopupStoreDTO> getList(
			@RequestParam(required = false, name = "status") PopupStore.Status status,
			@RequestParam(required = false, name = "sort") SortType sort,
			@RequestParam(required = false, name = "categoryType") Category.CategoryType categoryType,
			@RequestParam(required = false, name = "categoryId") Integer categoryId,
			@RequestParam(required = false, name = "keyword") String keyword,
			@RequestParam(defaultValue = "1", name = "page") int page,
			@RequestParam(defaultValue = "10", name = "size") int size) {

		PageRequestDTO pageRequestDTO = PageRequestDTO.builder().page(page).size(size).build();

		PopupFilterDTO popupFilterDTO = PopupFilterDTO.builder().status(status).sort(sort).categoryType(categoryType)
				.categoryId(categoryId).keyword(keyword).pageRequestDTO(pageRequestDTO).build();

		log.info("--------------------------------------------------------------");
		log.info("status={}, sort={}, categoryType={}, categoryId={}, keyword = {}", status, sort, categoryType,
				categoryId, keyword);
		return popupStoreService.getFilteredList(popupFilterDTO);
	}

	// 팝업 상세보기
	@GetMapping("/{id}")
	public PopupStoreDTO get(@PathVariable("id") Long id) {
		return popupStoreService.get(id);
	}

	@PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<PopupStoreDTO> register(@RequestParam("storeName") String storeName,
			@RequestParam("address") String address,
			@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
			@RequestParam("maxCount") Integer maxCount, @RequestParam("desc") String desc,
			@RequestParam("price") Integer price, @RequestParam("reservationTimes") String reservationTimesJson,
			@RequestParam(value = "file", required = false) List<MultipartFile> files) throws Exception {

		System.out.println("reservationTimeJson=" + reservationTimesJson);

		List<ReservationTimeDTO> reservationTimes = objectMapper.readValue(reservationTimesJson,
				new TypeReference<List<ReservationTimeDTO>>() {
				});

		PopupStoreDTO dto = PopupStoreDTO.builder().storeName(storeName).address(address).startDate(startDate)
				.endDate(endDate).maxCount(maxCount).desc(desc).price(price).reservationTimes(reservationTimes)
				.files(files).build();

		List<String> uploadFileNames = fileUtil.saveFiles(files);

		dto.setUploadFileNames(uploadFileNames);

		Long id = popupStoreService.register(dto);

		return ResponseEntity.ok(dto);

	};

	@GetMapping("/view/{fileName}")
	public ResponseEntity<Resource> viewFileGet(@PathVariable("fileName") String fileName) {

		return fileUtil.getFile(fileName);
	}

	@PutMapping("/{id}")
	public Map<String, String> modify(@PathVariable("id") Long id, PopupStoreDTO popupStoreDTO) {
		popupStoreDTO.setId(id);

		PopupStoreDTO oldPopupStoreDTO = popupStoreService.get(id);

		List<String> oldFileNames = oldPopupStoreDTO.getUploadFileNames();
		List<MultipartFile> files = popupStoreDTO.getFiles();
		List<String> currentUploadFileNames = fileUtil.saveFiles(files);
		List<String> uploadFileNames = popupStoreDTO.getUploadFileNames();

		if (currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
			uploadFileNames.addAll(currentUploadFileNames);
		}

		popupStoreService.modify(popupStoreDTO);

		if (oldFileNames != null && oldFileNames.size() > 0) {

			List<String> removeFiles = oldFileNames.stream().filter(fileName -> uploadFileNames.indexOf(fileName) == -1)
					.collect(Collectors.toList());

			fileUtil.deleteFile(removeFiles);
		}

		return Map.of("결과", "성공");
	}

	@DeleteMapping("/{id}")
	public Map<String, String> remove(@PathVariable("id") Long id) {
		List<String> oldFileNames = popupStoreService.get(id).getUploadFileNames();

		popupStoreService.remove(id);

		fileUtil.deleteFile(oldFileNames);

		return Map.of("결과", "성공");
	}

}
