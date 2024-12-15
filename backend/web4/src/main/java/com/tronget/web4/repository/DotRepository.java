package com.tronget.web4.repository;

import com.tronget.web4.model.Dot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DotRepository extends JpaRepository<Dot, Long> {
    List<Dot> findAllByAppUser_Id(Long id);
}
