package com.tronget.web4.controller;

import com.tronget.web4.service.DotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DotController {

    private DotService dotService;

    @Autowired
    public DotController(DotService dotService) {
        this.dotService = dotService;
    }


}
