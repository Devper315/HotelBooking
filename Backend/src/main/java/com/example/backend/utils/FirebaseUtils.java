package com.example.backend.utils;

import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class FirebaseUtils {
    public static String uploadImage(MultipartFile file, String path){
        Bucket bucket = StorageClient.getInstance().bucket();
        try {
            bucket.create( path, file.getBytes(), file.getContentType());
            return path;
        } catch (IOException e) {
            e.printStackTrace();
            return "Upload failed";
        }
    }
}
