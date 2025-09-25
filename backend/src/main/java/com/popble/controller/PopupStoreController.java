package com.popble.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.popble.dto.PageRequestDTO;
import com.popble.dto.PageResponseDTO;
import com.popble.dto.PopupStoreDTO;
import com.popble.service.PopupStoreService;
import com.popble.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/popup")
public class PopupStoreController {

    private final CustomFileUtil fileUtil;
    private final PopupStoreService popupStoreService;

    // ===== 목록 조회 =====
    @GetMapping("/list")
    public PageResponseDTO<PopupStoreDTO> getList(PageRequestDTO pageRequestDTO) {
        return popupStoreService.getList(pageRequestDTO);
    }

    // ===== 단건 조회 =====
    @GetMapping("/{id}")
    public PopupStoreDTO get(@PathVariable("id") Long id) {
        return popupStoreService.get(id);
    }

    // ===== 등록 =====
    @PostMapping
    public Map<String, String> register(PopupStoreDTO popupStoreDTO) {
        log.info("팝업스토어 등록: {}", popupStoreDTO);

        List<MultipartFile> files = popupStoreDTO.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        popupStoreDTO.setUploadFileNames(uploadFileNames);

        Long id = popupStoreService.register(popupStoreDTO);
        log.info("등록된 팝업 ID: {}", id);

        return Map.of("결과", "성공");
    }

    // ===== 파일 조회 =====
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGet(@PathVariable("fileName") String fileName) {
        return fileUtil.getFile(fileName);
    }

    // ===== 수정 (당장 필요 없다면 주석 처리) =====
    /*
    @PutMapping("/{id}")
    public Map<String, String> modify(@PathVariable("id") Long id, PopupStoreDTO popupStoreDTO) {
        popupStoreDTO.setId(id);

        PopupStoreDTO oldPopupStoreDTO = popupStoreService.get(id);

        List<String> oldFileNames = oldPopupStoreDTO.getUploadFileNames();
        List<MultipartFile> files = popupStoreDTO.getFiles();
        List<String> currentUploadFileNames = fileUtil.saveFiles(files);
        List<String> uploadFileNames = popupStoreDTO.getUploadFileNames();

        if (currentUploadFileNames != null && !currentUploadFileNames.isEmpty()) {
            uploadFileNames.addAll(currentUploadFileNames);
        }

        popupStoreService.modify(popupStoreDTO);

        if (oldFileNames != null && !oldFileNames.isEmpty()) {
            List<String> removeFiles = oldFileNames.stream()
                    .filter(fileName -> uploadFileNames.indexOf(fileName) == -1)
                    .collect(Collectors.toList());

            fileUtil.deleteFile(removeFiles);
        }

        return Map.of("결과", "성공");
    }
    */

    // ===== 삭제 (당장 필요 없다면 주석 처리) =====
    /*
    @DeleteMapping("/{id}")
    public Map<String, String> remove(@PathVariable("id") Long id) {
        List<String> oldFileNames = popupStoreService.get(id).getUploadFileNames();
        popupStoreService.remove(id);
        fileUtil.deleteFile(oldFileNames);
        return Map.of("결과", "성공");
    }
    */
}
