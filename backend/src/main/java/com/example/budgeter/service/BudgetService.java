package com.example.budgeter.service;

import com.example.budgeter.dto.budget.*;
import com.example.budgeter.dto.transaction.TransactionDto;
import com.example.budgeter.entity.Budget;
import com.example.budgeter.entity.Transaction;
import com.example.budgeter.entity.User;
import com.example.budgeter.repository.BudgetRepository;
import com.example.budgeter.repository.TransactionRepository;
import com.example.budgeter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {
  private final BudgetRepository budgetRepository;
  private final UserRepository userRepository;
  private final TransactionRepository transactionRepository;

  private BudgetDto toDto(Budget budget) {
    return new BudgetDto(
      budget.getId(),
      budget.getName(),
      budget.getPeriodStart(),
      budget.getPeriodEnd(),
      budget.getTotalLimit()
    );
  }

  private BudgetCategoryDto getCategory(Transaction t) {
    var bc = t.getBudgetCategory();
    return new BudgetCategoryDto(
      bc.getId(),
      bc.getName(),
      bc.getPlannedAmount(),
      bc.getSpentAmount(),
      bc.getLimitAmount(),
      bc.getColor()
    );
  }

  private BudgetWithTransactions appendTransactions(BudgetDto dto) {
    var transactions = transactionRepository
      .findAllByBudgetId(dto.id())
      .orElse(new ArrayList<>())
      .stream()
      .map(t -> new TransactionDto(
          t.getId(),
          t.getAmount(),
          t.getDescription(),
          t.getTransactionDate(),
          t.getType(),
          this.getCategory(t),
          null
        )
      ).toList();
    return new BudgetWithTransactions(dto).appendTransactions(transactions);
  }

  public BudgetWithTransactions getBudget(int id) {
    var budget = budgetRepository
      .findById(id)
      .orElseThrow(() -> new RuntimeException("No such budget"));

    return appendTransactions(this.toDto(budget));
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

  public BudgetDto addBudget(String mail, BudgetRequest request) {
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
    return this.toDto(budget);
  }

  public BudgetDto updateBudget(BudgetUpdateRequest request) {
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
    return this.toDto(budget);
  }

  public void deleteBudget(int id) {
    budgetRepository.deleteById(id);
  }
}
