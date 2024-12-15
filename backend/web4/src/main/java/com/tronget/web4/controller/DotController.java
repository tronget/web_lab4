package com.tronget.web4.controller;

import com.tronget.web4.model.Dot;
import com.tronget.web4.model.dto.DotRequestDto;
import com.tronget.web4.model.dto.DotResponseDto;
import com.tronget.web4.service.DotService;
import com.tronget.web4.service.DotServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dot")
public class DotController {

    private final DotService dotService;

    @Autowired
    public DotController(DotServiceImpl dotService) {
        this.dotService = dotService;
    }

    @GetMapping
    public ResponseEntity<List<DotResponseDto>> loadUserDots(Authentication authentication) {
        String username = authentication.getName();
        List<Dot> dots = dotService.findAllByUsername(username);
        List<DotResponseDto> dotResponseDtos = dots.stream().map(DotResponseDto::new).toList();
        return ResponseEntity.ok(dotResponseDtos);
    }

    @PostMapping
    public ResponseEntity<DotResponseDto> save(@RequestBody DotRequestDto dotRequestDto, Authentication authentication) {
        Dot newDot = new Dot(dotRequestDto);
        String username = authentication.getName();
        Dot savedDot = dotService.saveForUser(newDot, username);
        if (savedDot == null) {
            return ResponseEntity.badRequest().body(null);
        }
        DotResponseDto responseDto = new DotResponseDto(savedDot);
        return ResponseEntity.ok(responseDto);
    }

}
