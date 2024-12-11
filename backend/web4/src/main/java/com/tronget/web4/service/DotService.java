package com.tronget.web4.service;

import com.tronget.web4.repository.DotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DotService {
    private DotRepository dotRepository;

    @Autowired
    public DotService(DotRepository dotRepository) {
        this.dotRepository = dotRepository;
    }


}
