package com.example.budgeter.repository;

import com.example.budgeter.entity.Budget;
import com.example.budgeter.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    Optional<Budget> findById(int id);
    Optional<List<Budget>> findAllByIdUser(User idUser);
}
