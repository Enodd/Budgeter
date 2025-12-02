package com.example.budgeter.repository;

import com.example.budgeter.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByMail(String mail);
    boolean existsByMail(String mail);
}
