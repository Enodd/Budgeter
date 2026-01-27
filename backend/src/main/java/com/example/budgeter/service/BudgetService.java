package com.example.budgeter.service;

import com.example.budgeter.dto.budget.BudgetDto;
import com.example.budgeter.dto.budget.BudgetRequest;
import com.example.budgeter.dto.budget.BudgetUpdateRequest;
import com.example.budgeter.entity.Budget;
import com.example.budgeter.entity.User;
import com.example.budgeter.repository.BudgetRepository;
import com.example.budgeter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {
  private final BudgetRepository budgetRepository;
  private final UserRepository userRepository;

  private BudgetDto toDto(Budget budget) {
    return new BudgetDto(
      budget.getId(),
      budget.getName(),
      budget.getPeriodStart(),
      budget.getPeriodEnd(),
      budget.getTotalLimit()
    );
  }

  public BudgetDto getBudget(int id) {
    var budget = budgetRepository
      .findById(id)
      .orElseThrow(() -> new RuntimeException("No such budget"));

    return this.toDto(budget);
  }

  public List<BudgetDto> getAllBudgets(String email) {
    User user = userRepository
      .findByMail(email)
      .orElseThrow(() -> new RuntimeException("User not found"));

    return budgetRepository
      .findAllByIdUser(user)
      .orElseThrow(() -> new RuntimeException("No such budgets"))
      .stream()
      .map(this::toDto)
      .toList();
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
