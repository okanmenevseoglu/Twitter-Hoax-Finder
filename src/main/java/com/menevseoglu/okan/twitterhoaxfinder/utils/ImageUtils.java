package com.menevseoglu.okan.twitterhoaxfinder.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.LogRecord;
import java.util.logging.Logger;

@Component
public class ImageUtils {

    private static final Logger LOGGER = Logger.getLogger(ImageUtils.class.getName());

    private static final String UPLOAD_FOLDER = "src/main/resources/img/";

    public String uploadImageAndGetPath(MultipartFile image) {
        String savePath = "";

        try {
            byte[] bytes = image.getBytes();
            Date currentDate = new Date();
            savePath = UPLOAD_FOLDER + currentDate.getTime() + image.getOriginalFilename();
            Path path = Paths.get(savePath);
            Path parentDir = path.getParent();
            createParentDirsIfNotExists(parentDir);
            Files.write(path, bytes);
        } catch (IOException e) {
            LOGGER.log(new LogRecord(Level.SEVERE, e.getMessage()));
        }

        return savePath;
    }

    private void createParentDirsIfNotExists(Path parentDir) throws IOException {
        if (!parentDir.toFile().exists())
            Files.createDirectories(parentDir);
    }
}