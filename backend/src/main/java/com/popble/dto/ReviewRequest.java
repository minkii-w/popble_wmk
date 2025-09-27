package com.popble.dto;

import lombok.Data;

@Data
public class ReviewRequest {

    private Long popupId; 
    private String nickname; 
    private double rating;
    private String content;
}