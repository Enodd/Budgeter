package com.example.budgeter.repository;

import com.example.budgeter.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    Optional<Transaction> findById(int id);
    Optional<List<Transaction>> findAllByUserId(int userId);
    Optional<List<Transaction>> findAllByBudgetId(int budgetId);
}
