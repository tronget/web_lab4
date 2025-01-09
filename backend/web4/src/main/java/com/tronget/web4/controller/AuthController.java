package com.tronget.web4.controller;

import com.tronget.web4.model.dto.AuthResponseDto;
import com.tronget.web4.model.dto.UserDto;
import com.tronget.web4.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody UserDto userDto) {
        String username = userDto.getUsername();
        String password = userDto.getPassword();
        return authService.register(username, password);
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody UserDto userDto) {
        String username = userDto.getUsername();
        String password = userDto.getPassword();
        return authService.login(username, password);
    }

}
