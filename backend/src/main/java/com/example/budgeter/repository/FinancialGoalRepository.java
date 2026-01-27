package com.example.budgeter.repository;

import com.example.budgeter.entity.FinancialGoal;
import com.example.budgeter.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FinancialGoalRepository extends JpaRepository<FinancialGoal, Integer> {
  Optional<FinancialGoal> findById(int id);
  Optional<List<FinancialGoal>> findAllByUser(User user);
}
