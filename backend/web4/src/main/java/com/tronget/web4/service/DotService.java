package com.tronget.web4.service;

import com.tronget.web4.model.Dot;

import java.util.List;


public interface DotService {
    List<Dot> findAllByUsername(String username);
    Dot saveForUser(Dot newDot, String username);
}
