package com.tronget.web4.service;

import com.tronget.web4.model.dto.AuthResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<String> register(String username, String password);
    ResponseEntity<AuthResponseDto> login(String username, String password);
}
