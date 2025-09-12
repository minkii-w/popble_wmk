package com.popble.service;

import com.popble.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LocalFileStorageService implements FileStorageService {

    @Value("${file.upload.path:/uploads}") // 절대경로 권장: D:/popble-uploads 같은
    private String uploadRoot;

    @Override
    public StoredFile store(MultipartFile file) {
        try {
            String ext = StringUtils.getFilenameExtension(file.getOriginalFilename());
            String uuid = UUID.randomUUID().toString().replace("-", "");
            String storedName = (ext == null || ext.isBlank()) ? uuid : uuid + "." + ext;

            LocalDate today = LocalDate.now();
            String folder = today.getYear() + "/" +
                    String.format("%02d", today.getMonthValue()) + "/" +
                    String.format("%02d", today.getDayOfMonth());
            Path dir = Paths.get(uploadRoot, folder);
            Files.createDirectories(dir);

            Path target = dir.resolve(storedName);
            file.transferTo(target.toFile());

            String url = "/uploads/" + folder + "/" + storedName; // 정적 매핑 기준

            return new StoredFile(folder, storedName, url,
                    file.getSize(), file.getContentType(), file.getOriginalFilename());
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 실패", e);
        }
    }

    @Override
    public void delete(String folder, String storedName) {
        try {
            Path p = Paths.get(uploadRoot, folder, storedName);
            Files.deleteIfExists(p);
        } catch (IOException e) {
            // 필요 시 로깅
        }
    }
}