package com.example.budgeter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.budgeter.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByMail(String mail);
    boolean existsByMail(String mail);
}
