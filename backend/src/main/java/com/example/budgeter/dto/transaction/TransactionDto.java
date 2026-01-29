package com.example.budgeter.dto.transaction;

import com.example.budgeter.dto.budget.BudgetCategoryDto;
import com.example.budgeter.entity.BudgetCategory;
import jakarta.annotation.Nullable;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionDto(
  Integer id,
  BigDecimal amount,
  @Nullable String description,
  LocalDate transactionDate,
  String type,
  BudgetCategoryDto budgetCategoryId
) {
}
