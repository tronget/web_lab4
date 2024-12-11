package com.tronget.web4.repository;

import com.tronget.web4.model.Dot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DotRepository extends JpaRepository<Dot, Long> {

}
