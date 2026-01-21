package com.example.budgeter.repository;

import com.example.budgeter.entity.BudgetCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<BudgetCategory, Integer> {
    Optional<BudgetCategory> findById(int id);
}
