package com.tronget.web4.service;

import com.tronget.web4.model.AppUser;
import com.tronget.web4.model.Dot;
import com.tronget.web4.repository.DotRepository;
import com.tronget.web4.repository.UserRepository;
import com.tronget.web4.util.DotChecker;
import com.tronget.web4.util.DotValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DotServiceImpl implements DotService {

    private final DotRepository dotRepository;
    private final UserRepository userRepository;
    private final DotValidator dotValidator;
    private final DotChecker dotChecker;

    @Autowired
    public DotServiceImpl(DotRepository dotRepository, UserRepository userRepository, DotValidator dotValidator, DotChecker dotChecker) {
        this.dotRepository = dotRepository;
        this.userRepository = userRepository;
        this.dotValidator = dotValidator;
        this.dotChecker = dotChecker;
    }


    @Override
    public List<Dot> findAllByUsername(String username) {
        System.out.println(username);
        Long userId = userRepository.findIdByUsername(username);
        List<Dot> dots = dotRepository.findAllByAppUser_Id(userId);
        if (dots == null) {
            return new ArrayList<>();
        }
        return dots;
    }

    @Override
    public Dot saveForUser(Dot newDot, String username) {

        AppUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found."));

        if (!dotValidator.isValid(newDot)) {
            return null;
        }
        boolean isHit = dotChecker.check(newDot);
        newDot.setHit(isHit);
        newDot.setAppUser(user);
        return dotRepository.save(newDot);
    }
}
