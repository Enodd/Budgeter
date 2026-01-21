package com.example.budgeter.service;

import com.example.budgeter.dto.budget.BudgetRequest;
import com.example.budgeter.dto.budget.BudgetUpdateRequest;
import com.example.budgeter.entity.Budget;
import com.example.budgeter.entity.User;
import com.example.budgeter.repository.BudgetRepository;
import com.example.budgeter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {
    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    public Budget getBudget(int id) {
        return budgetRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));
    }

    public List<Budget> getAllBudgets(String email) {
        User user = userRepository
                .findByMail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return budgetRepository
                .findAllByIdUser(user)
                .orElse(Collections.emptyList());
    }

    public void addBudget(String mail, BudgetRequest request) {
        User user = userRepository
                .findByMail(mail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Budget budget = new Budget();
        budget.setName(request.name());
        budget.setPeriodStart(request.periodStart());
        budget.setTotalLimit(request.totalLimit());

        if (request.periodEnd() != null) {
            budget.setPeriodEnd(request.periodEnd());
        }

        budget.setIdUser(user);
        budgetRepository.save(budget);
    }

    public void updateBudget(BudgetUpdateRequest request) {
        Budget budget = budgetRepository
                .findById(request.id())
                .orElseThrow(() -> new RuntimeException("No budget found with given id"));

        if (request.name() != null) {
            budget.setName(request.name());
        }

        if (request.periodStart() != null) {
            budget.setPeriodStart(request.periodStart());
        }

        if (request.periodEnd() != null) {
            budget.setPeriodEnd(request.periodEnd());
        }

        if (request.totalLimit() != null) {
            budget.setTotalLimit(request.totalLimit());
        }
        budgetRepository.save(budget);
    }

    public void deleteBudget(int id) {
        budgetRepository.deleteById(id);
    }
}
