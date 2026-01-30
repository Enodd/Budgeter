package com.example.budgeter.dto.transaction;

import com.example.budgeter.dto.budget.BudgetCategoryDto;
import com.example.budgeter.dto.budget.BudgetDto;
import jakarta.annotation.Nullable;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionDto(
  Integer id,
  BigDecimal amount,
  @Nullable String description,
  LocalDate transactionDate,
  String type,
  @Nullable BudgetCategoryDto budgetCategory,
  @Nullable BudgetDto budget
) {
}
