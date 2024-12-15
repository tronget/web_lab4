package com.tronget.web4.repository;

import com.tronget.web4.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);

    Boolean existsByUsername(String username);

    @Query("SELECT u.id FROM AppUser u WHERE u.username = :username")
    Long findIdByUsername(@Param("username") String username);
}
