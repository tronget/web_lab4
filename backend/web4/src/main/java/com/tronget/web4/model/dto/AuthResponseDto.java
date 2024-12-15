package com.tronget.web4.model.dto;

import lombok.Data;

@Data
public class AuthResponseDto {
    private final String token;
    private final String username;
}
